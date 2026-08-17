/**
 * Shared script-loading primitive for embed-style blocks.
 *
 * Design constraints (see docs/component-library/DESIGN-CONTRACT.md §1):
 * - SSR-safe: no `document` access at module scope; during SSR every function
 *   returns a forever-pending promise (blocks only call these inside effects).
 * - Realm-global promise dedupe keyed by URL (or an explicit key): the dt-cms
 *   builder preview runs React StrictMode double-mount, and SPA navigation
 *   unmounts/remounts blocks without a page load. Loaded scripts are never
 *   removed from the DOM on unmount — the dedupe map is what prevents
 *   double-initialization.
 * - A failed load deletes its dedupe entry and removes the element so a retry
 *   starts clean. Synchronous setup failures (bad options, empty URL) are never
 *   cached at all.
 * - Optional document.write/writeln interception for legacy embeds that write
 *   markup beside their own <script> tag: written <script> nodes are re-created
 *   (template-parsed scripts are inert) and routed to <head>; all other written
 *   nodes go to the WRITING script's own write target (resolved through
 *   `document.currentScript`), falling back to the most recent live
 *   interception when there is no executing-script identity.
 *
 * Public API is FROZEN — `integrations/*` blocks code against these signatures.
 * `releaseWriteInterception` is an ADDITION (no existing signature changed):
 * blocks need a way to tear the patch down when they unmount mid-load.
 */

export interface LoadScriptOptions {
  /**
   * Dedupe key. Defaults to the URL for loadScript/loadStylesheet.
   * REQUIRED for runInlineScript (inline code has no natural identity).
   */
  key?: string;
  /** Where to append the <script>. Default "head". "container" requires `container`. */
  target?: "head" | "body" | "container";
  /** Host element used when target is "container". */
  container?: HTMLElement | null;
  /** Extra attributes set on the element. `async` defaults to "true" for URL scripts. */
  attributes?: Record<string, string>;
  /** Patch document.write/writeln for the lifetime of this script's load (legacy embeds). */
  interceptDocumentWrite?: boolean;
  /** Receives non-script nodes written via document.write. Defaults to `container`. */
  writeTarget?: HTMLElement | null;
}

/* -------------------------------------------------------------------------- */
/* Realm-global singleton state                                                */
/* -------------------------------------------------------------------------- */

/**
 * Every correctness guarantee in this module (promise dedupe, the reference-
 * counted document.write interception stack) depends on there being exactly ONE
 * copy of this state per document.
 *
 * Plain module-level `const`/`let` does NOT give us that. tsup builds with
 * `splitting: false`, so this file is inlined independently into
 * `dist/script-loader.js`, `dist/script-embed.js`, `dist/tripleseat-form.js` and
 * `dist/registry.js`. A host that imports per subpath (the advertised
 * tree-shakable pattern) therefore gets several private copies:
 *  - dedupe breaks unconditionally — the same third-party URL requested from two
 *    bundles is injected and executed twice (double widget init);
 *  - the write interception leaks — copy T patches first, copy S patches on top,
 *    T's identity guard then fails so it never restores, and S restores T's
 *    patch permanently with an empty target stack, sending every later
 *    document.write to <body> forever.
 *
 * Anchoring the state on `globalThis` makes all copies share one instance. The
 * key carries a state-shape version so a future incompatible shape cannot be
 * silently adopted by an older/newer copy on the same page.
 */
interface ScriptLoaderRealmState {
  scriptPromises: Map<string, Promise<void>>;
  stylesheetPromises: Map<string, Promise<void>>;
  interceptions: InterceptionRecord[];
  patchedWrite: typeof document.write | null;
  patchedWriteln: typeof document.writeln | null;
  originalWrite: typeof document.write | null;
  originalWriteln: typeof document.writeln | null;
}

type ScriptLoaderGlobal = typeof globalThis & {
  __opensiteScriptLoaderStateV1?: ScriptLoaderRealmState;
};

function realmState(): ScriptLoaderRealmState {
  const scope = globalThis as ScriptLoaderGlobal;
  let state = scope.__opensiteScriptLoaderStateV1;
  if (!state) {
    state = {
      scriptPromises: new Map<string, Promise<void>>(),
      stylesheetPromises: new Map<string, Promise<void>>(),
      interceptions: [],
      patchedWrite: null,
      patchedWriteln: null,
      originalWrite: null,
      originalWriteln: null,
    };
    scope.__opensiteScriptLoaderStateV1 = state;
  }
  return state;
}

const isBrowser = (): boolean => typeof document !== "undefined";

/** Promise that never settles — the SSR return value; effects re-run on the client. */
const pendingForever = (): Promise<void> => new Promise<void>(() => {});

function resolveParent(options?: LoadScriptOptions): HTMLElement {
  if (options?.target === "container") {
    if (!options.container) {
      throw new Error(
        '[script-loader] target "container" requires a container element',
      );
    }
    return options.container;
  }
  if (options?.target === "body") return document.body;
  return document.head;
}

/**
 * `async` / `defer` are boolean HTML attributes: `setAttribute("async", "false")`
 * still makes the script async. Map those two onto the DOM property so callers
 * can actually turn them off; everything else is a plain attribute.
 */
function applyScriptAttributes(
  script: HTMLScriptElement,
  attributes?: Record<string, string>,
): void {
  if (!attributes) return;
  for (const [name, value] of Object.entries(attributes)) {
    if (name === "async" || name === "defer") {
      script[name] = value !== "false";
      continue;
    }
    script.setAttribute(name, value);
  }
}

/* -------------------------------------------------------------------------- */
/* document.write interception                                                 */
/* -------------------------------------------------------------------------- */

interface WriteInterception {
  restore: () => void;
}

interface InterceptionRecord {
  /** Where non-script nodes written by THIS script land. */
  target: HTMLElement;
  /** The script element whose synchronous execution owns these writes. */
  owner: HTMLScriptElement | null;
  /** Watchdog timer — a hung host fires neither load nor error. */
  timer: ReturnType<typeof setTimeout> | null;
  /** Wall-clock ceiling: the last-resort guard against an immortal patch. */
  expiresAt: number;
  released: boolean;
}

/**
 * How often the backstop re-checks whether an unsettled interception still has
 * a live owner. It is a POLL, not a deadline: releasing on the clock alone
 * silently destroys the markup it exists to capture, because `loadScript` marks
 * every script `async` and dynamically inserts it, and the browser discards a
 * dynamically-inserted async script's `document.write` once the real
 * implementation is back ("It isn't possible to write into a document from an
 * asynchronously-loaded external script"). A slow legacy embed on a mobile
 * connection is precisely the case interception exists to serve.
 *
 * The primary teardown is load/error (`interception.restore()`) and unmount
 * (`releaseWriteInterception`). This watchdog only catches the leak those two
 * miss: a block that went away without releasing while its host still hangs.
 */
const WRITE_INTERCEPTION_WATCHDOG_MS = 30_000;

/**
 * Absolute ceiling on one interception, however live it looks. Without it a
 * write target that is never detached (`document.body` when a block supplies no
 * container) plus a host that never settles would hold the patch — and the
 * watchdog timer — for the rest of the page's life.
 */
const WRITE_INTERCEPTION_HARD_MAX_MS = 600_000;

/**
 * Interception is reference-counted rather than a bare save/restore pair. Two
 * concurrently-loading legacy embeds would otherwise leak: the first to finish
 * fails its identity guard (the second patch is on top), and the second
 * restores the *first* patch instead of the original, so `document.write` stays
 * hijacked for the rest of the page's life.
 *
 * Each record also carries the script element it belongs to, so a write is
 * attributed to the script that is actually executing instead of to whichever
 * load happened to start most recently (two legacy embeds on one page would
 * otherwise cross-write into each other's containers).
 */
// State lives on the realm-global singleton (see `realmState`), NOT at module
// scope — this file is inlined into several dist bundles.

function currentWriteTarget(): HTMLElement {
  const { interceptions } = realmState();
  // `document.currentScript` is the browser's own answer to "who is writing?".
  const executing = document.currentScript;
  if (executing) {
    for (let index = interceptions.length - 1; index >= 0; index -= 1) {
      if (interceptions[index].owner === executing) {
        return interceptions[index].target;
      }
    }
    // A script the vendor injected itself (not one we created): attribute it to
    // the innermost live target that contains it.
    for (let index = interceptions.length - 1; index >= 0; index -= 1) {
      if (interceptions[index].target.contains(executing)) {
        return interceptions[index].target;
      }
    }
  }
  // No executing-script identity (writes from timers/callbacks, or jsdom):
  // fall back to the most recent live interception. An empty list means our
  // patch outlived its owners — <body> is still strictly better than letting a
  // real document.write blow the parsed document away.
  return interceptions[interceptions.length - 1]?.target ?? document.body;
}

function appendWrittenMarkup(markup: string): void {
  const writeTarget = currentWriteTarget();
  const template = document.createElement("template");
  template.innerHTML = markup;

  for (const node of Array.from(template.content.childNodes)) {
    if (node instanceof HTMLScriptElement) {
      // Template-parsed <script> nodes are inert; re-create so they execute.
      const script = document.createElement("script");
      for (const attribute of Array.from(node.attributes)) {
        script.setAttribute(attribute.name, attribute.value);
      }
      script.text = node.text;
      document.head.appendChild(script);
    } else {
      writeTarget.appendChild(node);
    }
  }
}

function restoreDocumentWrite(): void {
  const state = realmState();
  // Identity-guarded: never clobber a patch someone else installed after us.
  if (
    state.patchedWrite &&
    state.originalWrite &&
    document.write === state.patchedWrite
  ) {
    document.write = state.originalWrite;
  }
  if (
    state.patchedWriteln &&
    state.originalWriteln &&
    document.writeln === state.patchedWriteln
  ) {
    document.writeln = state.originalWriteln;
  }
  state.patchedWrite = null;
  state.patchedWriteln = null;
  state.originalWrite = null;
  state.originalWriteln = null;
}

/**
 * Redirect document.write/writeln while a legacy embed script loads. Written
 * <script> nodes must be re-created before they execute; everything else lands
 * in the write target so the embed's markup renders where the block wants it.
 */
function releaseInterception(record: InterceptionRecord): void {
  if (record.released) return;
  record.released = true;
  if (record.timer !== null) {
    clearTimeout(record.timer);
    record.timer = null;
  }
  const { interceptions } = realmState();
  const index = interceptions.lastIndexOf(record);
  if (index !== -1) interceptions.splice(index, 1);
  if (interceptions.length === 0) restoreDocumentWrite();
}

/**
 * Tear down every interception bound to `target`. Blocks call this from their
 * effect cleanup: a script whose host hangs never fires load or error, so
 * without it an unmounted block leaves `document.write` patched and pointing at
 * a container React has already detached. Safe to call when nothing is
 * installed, and safe to call before the script eventually settles.
 */
export function releaseWriteInterception(
  target: HTMLElement | null | undefined,
): void {
  if (!target) return;
  for (const record of [...realmState().interceptions]) {
    if (record.target === target) releaseInterception(record);
  }
}

/**
 * Is this interception still worth holding the patch for? "Live" means the
 * block is still on the page (its write target is still in the document) and
 * the owning script is still there to execute. Once either is gone nothing can
 * legitimately write again, so the patch is pure leak.
 */
function interceptionIsLive(record: InterceptionRecord): boolean {
  if (!record.target.isConnected) return false;
  if (record.owner && !record.owner.isConnected) return false;
  return true;
}

function armWatchdog(record: InterceptionRecord): void {
  record.timer = setTimeout(() => {
    record.timer = null;
    if (record.released) return;

    if (interceptionIsLive(record) && Date.now() < record.expiresAt) {
      // Still mounted, still downloading. Restoring here would hand the
      // vendor's eventual document.write to a browser that drops it on the
      // floor, so keep watching instead of guessing on a clock.
      armWatchdog(record);
      return;
    }

    // Loud on purpose: a dropped embed is otherwise indistinguishable from a
    // widget that simply rendered nothing.
    console.warn(
      "[script-loader] force-released a document.write interception; its " +
        "owner is gone or hung, so any markup written from now on is lost",
    );
    releaseInterception(record);
  }, WRITE_INTERCEPTION_WATCHDOG_MS);
}

function installWriteInterception(
  writeTarget: HTMLElement,
  owner: HTMLScriptElement | null,
): WriteInterception {
  const state = realmState();
  const record: InterceptionRecord = {
    target: writeTarget,
    owner,
    timer: null,
    expiresAt: Date.now() + WRITE_INTERCEPTION_HARD_MAX_MS,
    released: false,
  };
  state.interceptions.push(record);

  if (!state.patchedWrite) {
    // Store the raw property values, NOT `.bind(document)` copies: restoring a
    // bound copy changes `document.write`'s identity, which defeats every other
    // library's identity guard and stacks a new bind layer on each cycle.
    state.originalWrite = document.write;
    state.originalWriteln = document.writeln;

    state.patchedWrite = ((...chunks: string[]): void => {
      appendWrittenMarkup(chunks.join(""));
    }) as typeof document.write;
    state.patchedWriteln = ((...chunks: string[]): void => {
      appendWrittenMarkup(`${chunks.join("")}\n`);
    }) as typeof document.writeln;

    document.write = state.patchedWrite;
    document.writeln = state.patchedWriteln;
  }

  armWatchdog(record);

  return { restore: () => releaseInterception(record) };
}

function maybeInterceptWrites(
  options: LoadScriptOptions | undefined,
  owner: HTMLScriptElement | null,
): WriteInterception | null {
  if (!options?.interceptDocumentWrite) return null;
  const target = options.writeTarget ?? options.container ?? document.body;
  return installWriteInterception(target, owner);
}

/* -------------------------------------------------------------------------- */
/* Loaders                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Load an external script once per page load (per dedupe key). Resolves on the
 * script's load event; rejects (and cleans up for retry) on error.
 */
export function loadScript(
  url: string,
  options?: LoadScriptOptions,
): Promise<void> {
  if (!isBrowser()) return pendingForever();
  // Trim FIRST: the HTML src attribute is stripped before URL parsing, so a
  // whitespace-only value would sail past an `!url` guard and re-request the
  // current document. Trimming also keeps "x.js" and "x.js " on one dedupe key.
  const href = typeof url === "string" ? url.trim() : "";
  if (!href) {
    // An empty src re-requests the current document — never cache this.
    return Promise.reject(new Error("[script-loader] loadScript requires a url"));
  }

  const { scriptPromises } = realmState();
  const key = options?.key ?? href;
  const existing = scriptPromises.get(key);
  if (existing) return existing;

  // Resolve the parent BEFORE creating the cached promise: a synchronous
  // options error must not poison the dedupe map with a permanent rejection.
  let parent: HTMLElement;
  try {
    parent = resolveParent(options);
  } catch (error) {
    return Promise.reject(error);
  }

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = href;
    script.async = true;
    applyScriptAttributes(script, options?.attributes);

    // The script element is the identity `document.currentScript` reports while
    // this script executes, so the interception is bound to it.
    const interception = maybeInterceptWrites(options, script);

    script.addEventListener("load", () => {
      interception?.restore();
      resolve();
    });
    script.addEventListener("error", () => {
      interception?.restore();
      scriptPromises.delete(key);
      script.remove();
      reject(new Error(`[script-loader] failed to load ${href}`));
    });

    parent.appendChild(script);
  });

  scriptPromises.set(key, promise);
  return promise;
}

/**
 * Execute inline JS once per page load (per explicit key). Resolves after the
 * script element is appended — execution is synchronous. Runtime errors thrown
 * by the inline code surface as window errors, not as rejections.
 */
export function runInlineScript(
  code: string,
  options: LoadScriptOptions & { key: string },
): Promise<void> {
  if (!isBrowser()) return pendingForever();
  if (!options?.key) {
    return Promise.reject(
      new Error("[script-loader] runInlineScript requires a key"),
    );
  }

  const { scriptPromises } = realmState();
  const existing = scriptPromises.get(options.key);
  if (existing) return existing;

  let parent: HTMLElement;
  try {
    parent = resolveParent(options);
  } catch (error) {
    return Promise.reject(error);
  }

  // Inline execution is synchronous on append, so the interception window is
  // exactly the append call.
  let interception: WriteInterception | null = null;
  try {
    const script = document.createElement("script");
    applyScriptAttributes(script, options.attributes);
    script.text = code;
    // Bind the interception to the element before it can execute.
    interception = maybeInterceptWrites(options, script);
    parent.appendChild(script);
  } finally {
    interception?.restore();
  }

  const promise = Promise.resolve();
  scriptPromises.set(options.key, promise);
  return promise;
}

/** Load a stylesheet once per page load (per dedupe key). */
export function loadStylesheet(
  url: string,
  options?: Pick<LoadScriptOptions, "key">,
): Promise<void> {
  if (!isBrowser()) return pendingForever();
  // Same trim-first rule as loadScript: `<link href=" ">` resolves to the
  // current document.
  const href = typeof url === "string" ? url.trim() : "";
  if (!href) {
    return Promise.reject(
      new Error("[script-loader] loadStylesheet requires a url"),
    );
  }

  const { stylesheetPromises } = realmState();
  const key = options?.key ?? href;
  const existing = stylesheetPromises.get(key);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.addEventListener("load", () => resolve());
    link.addEventListener("error", () => {
      stylesheetPromises.delete(key);
      link.remove();
      reject(new Error(`[script-loader] failed to load stylesheet ${href}`));
    });
    document.head.appendChild(link);
  });

  stylesheetPromises.set(key, promise);
  return promise;
}

/**
 * Load a chain of scripts strictly sequentially: item N+1 waits for item N's
 * load event. Inline items require a `key`.
 */
export async function loadScriptSequence(
  items: Array<{ url?: string; inline?: string; key?: string }>,
  options?: LoadScriptOptions,
): Promise<void> {
  if (!isBrowser()) return pendingForever();

  for (const item of items) {
    if (item.url) {
      // Trim the derived key too, so a stray trailing space cannot split one
      // widget script across two dedupe entries.
      await loadScript(item.url, {
        ...options,
        key: item.key ?? item.url.trim(),
      });
    } else if (item.inline) {
      if (!item.key) {
        throw new Error("[script-loader] inline sequence items require a key");
      }
      await runInlineScript(item.inline, { ...options, key: item.key });
    }
  }
}

/** Test-only: clears the realm-global dedupe maps and interception stack. */
export function __resetScriptLoaderForTests(): void {
  const state = realmState();
  state.scriptPromises.clear();
  state.stylesheetPromises.clear();
  for (const record of [...state.interceptions]) {
    if (record.timer !== null) clearTimeout(record.timer);
    record.timer = null;
    record.released = true;
  }
  state.interceptions.length = 0;
  if (typeof document !== "undefined") restoreDocumentWrite();
}
