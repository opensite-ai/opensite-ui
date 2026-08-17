import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  __resetScriptLoaderForTests,
  loadScript,
  loadScriptSequence,
  loadStylesheet,
  releaseWriteInterception,
  runInlineScript,
} from "../script-loader";

/* -------------------------------------------------------------------------- */
/* Harness                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * jsdom in this project runs with script execution disabled, so "did it run?"
 * is proven structurally: every element append is recorded synchronously and
 * load/error events are fired by hand. That makes ordering assertions exact
 * rather than timing-dependent.
 */
let appendedScripts: HTMLScriptElement[] = [];
let appendedLinks: HTMLLinkElement[] = [];

const originalAppendChild = Node.prototype.appendChild;

function fire(element: Element, type: "load" | "error"): void {
  element.dispatchEvent(new Event(type));
}

/** Let queued microtasks (awaited promise continuations) drain. */
const flush = (): Promise<void> => Promise.resolve().then(() => undefined);

/**
 * Stand in for the browser's `document.currentScript`. jsdom does not execute
 * external scripts, so the identity of the "currently executing script" has to
 * be supplied by hand to exercise per-script write attribution.
 */
function withCurrentScript(script: Element | null, fn: () => void): void {
  Object.defineProperty(document, "currentScript", {
    value: script,
    configurable: true,
  });
  try {
    fn();
  } finally {
    delete (document as unknown as { currentScript?: unknown }).currentScript;
  }
}

/** Resolve to "pending" when a promise has not settled within a macrotask. */
async function settlement(promise: Promise<unknown>): Promise<string> {
  return Promise.race([
    promise.then(
      () => "resolved",
      () => "rejected",
    ),
    new Promise<string>((resolve) => setTimeout(() => resolve("pending"), 10)),
  ]);
}

beforeEach(() => {
  appendedScripts = [];
  appendedLinks = [];
  Node.prototype.appendChild = function <T extends Node>(
    this: Node,
    node: T,
  ): T {
    if (node instanceof HTMLScriptElement) appendedScripts.push(node);
    if (node instanceof HTMLLinkElement) appendedLinks.push(node);
    return originalAppendChild.call(this, node) as T;
  };
});

afterEach(() => {
  // Unstub first: the SSR suite replaces `document` with undefined.
  vi.unstubAllGlobals();
  vi.useRealTimers();
  Node.prototype.appendChild = originalAppendChild;
  __resetScriptLoaderForTests();
  document.head.querySelectorAll("script, link").forEach((el) => el.remove());
  document.body.innerHTML = "";
});

/* -------------------------------------------------------------------------- */
/* Dedupe                                                                       */
/* -------------------------------------------------------------------------- */

describe("script-loader dedupe map", () => {
  it("appends one element and hands back the same promise for a repeated url", () => {
    const first = loadScript("https://cdn.example.com/a.js");
    const second = loadScript("https://cdn.example.com/a.js");

    expect(first).toBe(second);
    expect(appendedScripts).toHaveLength(1);
    void first.catch(() => undefined);
  });

  it("is safe under a StrictMode-style double mount (effect runs twice)", async () => {
    // Mount pass 1 + immediate remount pass 2, before the first load settles.
    const mountOne = loadScript("https://cdn.example.com/widget.js");
    const mountTwo = loadScript("https://cdn.example.com/widget.js");
    expect(appendedScripts).toHaveLength(1);

    fire(appendedScripts[0], "load");
    await expect(mountOne).resolves.toBeUndefined();
    await expect(mountTwo).resolves.toBeUndefined();

    // A later SPA remount must NOT re-inject or re-initialize the widget.
    await loadScript("https://cdn.example.com/widget.js");
    expect(appendedScripts).toHaveLength(1);
  });

  it("dedupes on an explicit key even when the urls differ", () => {
    void loadScript("https://cdn.example.com/v1.js", { key: "shared" }).catch(
      () => undefined,
    );
    void loadScript("https://cdn.example.com/v2.js", { key: "shared" }).catch(
      () => undefined,
    );

    expect(appendedScripts).toHaveLength(1);
    expect(appendedScripts[0].src).toContain("v1.js");
  });

  it("shares one dedupe namespace between url scripts and inline scripts", async () => {
    await runInlineScript("window.x = 1;", { key: "shared-key" });
    const again = loadScript("https://cdn.example.com/a.js", {
      key: "shared-key",
    });

    await expect(again).resolves.toBeUndefined();
    expect(appendedScripts).toHaveLength(1);
  });
});

/* -------------------------------------------------------------------------- */
/* Sequential ordering                                                          */
/* -------------------------------------------------------------------------- */

describe("loadScriptSequence ordering", () => {
  it("does not append item N+1 until item N fires load", async () => {
    const sequence = loadScriptSequence([
      { url: "https://cdn.example.com/one.js" },
      { url: "https://cdn.example.com/two.js" },
      { url: "https://cdn.example.com/three.js" },
    ]);

    expect(appendedScripts.map((s) => s.src)).toEqual([
      "https://cdn.example.com/one.js",
    ]);

    fire(appendedScripts[0], "load");
    await flush();
    expect(appendedScripts.map((s) => s.src)).toEqual([
      "https://cdn.example.com/one.js",
      "https://cdn.example.com/two.js",
    ]);

    fire(appendedScripts[1], "load");
    await flush();
    expect(appendedScripts.map((s) => s.src)).toEqual([
      "https://cdn.example.com/one.js",
      "https://cdn.example.com/two.js",
      "https://cdn.example.com/three.js",
    ]);

    fire(appendedScripts[2], "load");
    await expect(sequence).resolves.toBeUndefined();
  });

  it("runs an inline item only after the preceding url script loads", async () => {
    const inlineCode = "window.__inlineRan = true;";
    const sequence = loadScriptSequence([
      { url: "https://cdn.example.com/lib.js" },
      { inline: inlineCode, key: "init" },
    ]);

    expect(appendedScripts).toHaveLength(1);
    expect(appendedScripts[0].text).toBe("");

    fire(appendedScripts[0], "load");
    await expect(sequence).resolves.toBeUndefined();

    expect(appendedScripts).toHaveLength(2);
    expect(appendedScripts[1].text).toBe(inlineCode);
  });

  it("aborts the chain when an earlier item fails", async () => {
    const sequence = loadScriptSequence([
      { url: "https://cdn.example.com/broken.js" },
      { url: "https://cdn.example.com/never.js" },
    ]);

    fire(appendedScripts[0], "error");
    await expect(sequence).rejects.toThrow(/failed to load/);
    expect(appendedScripts).toHaveLength(1);
  });

  it("rejects when an inline sequence item omits its key", async () => {
    await expect(
      loadScriptSequence([{ inline: "window.init();" }]),
    ).rejects.toThrow(/inline sequence items require a key/);
  });
});

/* -------------------------------------------------------------------------- */
/* Failure + retry                                                              */
/* -------------------------------------------------------------------------- */

describe("script-loader failure handling", () => {
  it("rejects, removes the failed element, and allows a clean retry", async () => {
    const first = loadScript("https://cdn.example.com/flaky.js");
    const failed = appendedScripts[0];

    fire(failed, "error");
    await expect(first).rejects.toThrow(
      "[script-loader] failed to load https://cdn.example.com/flaky.js",
    );
    expect(failed.isConnected).toBe(false);

    const retry = loadScript("https://cdn.example.com/flaky.js");
    expect(appendedScripts).toHaveLength(2);
    expect(appendedScripts[1]).not.toBe(failed);

    fire(appendedScripts[1], "load");
    await expect(retry).resolves.toBeUndefined();
  });

  it("never caches a synchronous options failure", async () => {
    await expect(
      loadScript("https://cdn.example.com/a.js", { target: "container" }),
    ).rejects.toThrow(/requires a container element/);
    expect(appendedScripts).toHaveLength(0);

    // Same key, valid options: must not be poisoned by the earlier rejection.
    const retry = loadScript("https://cdn.example.com/a.js");
    expect(appendedScripts).toHaveLength(1);
    fire(appendedScripts[0], "load");
    await expect(retry).resolves.toBeUndefined();
  });

  it("rejects an empty url instead of injecting a self-referencing script", async () => {
    await expect(loadScript("")).rejects.toThrow(/requires a url/);
    expect(appendedScripts).toHaveLength(0);
  });

  it("rejects a whitespace-only url in both loaders", async () => {
    // `<script src=" ">` is stripped before URL parsing, so it re-requests the
    // current document — exactly what the empty-url guard exists to prevent.
    await expect(loadScript("   ")).rejects.toThrow(/requires a url/);
    await expect(loadStylesheet(" \n ")).rejects.toThrow(/requires a url/);
    expect(appendedScripts).toHaveLength(0);
    expect(appendedLinks).toHaveLength(0);
  });

  it("dedupes urls that differ only by surrounding whitespace", () => {
    const first = loadScript("https://cdn.example.com/trim.js");
    const second = loadScript("  https://cdn.example.com/trim.js  ");

    expect(first).toBe(second);
    expect(appendedScripts).toHaveLength(1);
    expect(appendedScripts[0].getAttribute("src")).toBe(
      "https://cdn.example.com/trim.js",
    );
    void first.catch(() => undefined);
  });

  it("rejects runInlineScript without a key", async () => {
    await expect(
      runInlineScript("window.x = 1;", { key: "" }),
    ).rejects.toThrow(/requires a key/);
    expect(appendedScripts).toHaveLength(0);
  });
});

/* -------------------------------------------------------------------------- */
/* Targets + attributes                                                         */
/* -------------------------------------------------------------------------- */

describe("script-loader placement and attributes", () => {
  it("appends to head by default, and to a container when asked", () => {
    void loadScript("https://cdn.example.com/head.js").catch(() => undefined);
    expect(appendedScripts[0].parentElement).toBe(document.head);

    const container = document.createElement("div");
    document.body.appendChild(container);
    void loadScript("https://cdn.example.com/in-container.js", {
      target: "container",
      container,
    }).catch(() => undefined);
    expect(appendedScripts[1].parentElement).toBe(container);
  });

  it("defaults url scripts to async and lets attributes turn it off", () => {
    void loadScript("https://cdn.example.com/a.js").catch(() => undefined);
    expect(appendedScripts[0].async).toBe(true);

    void loadScript("https://cdn.example.com/b.js", {
      attributes: { async: "false", defer: "true", "data-widget": "42" },
    }).catch(() => undefined);

    // setAttribute("async", "false") would still be truthy — the loader maps
    // async/defer onto the DOM property so "false" actually means false.
    expect(appendedScripts[1].async).toBe(false);
    expect(appendedScripts[1].defer).toBe(true);
    expect(appendedScripts[1].getAttribute("data-widget")).toBe("42");
  });
});

/* -------------------------------------------------------------------------- */
/* document.write interception                                                  */
/* -------------------------------------------------------------------------- */

describe("script-loader document.write interception", () => {
  it("routes written markup to the write target and written scripts to head", () => {
    const container = document.createElement("div");
    const writeTarget = document.createElement("div");
    document.body.append(container, writeTarget);

    void loadScript("https://legacy.example.com/embed.js", {
      target: "container",
      container,
      interceptDocumentWrite: true,
      writeTarget,
    }).catch(() => undefined);

    document.write(
      '<p id="written">hello</p><script src="https://legacy.example.com/second.js"><\/script>',
    );

    expect(writeTarget.querySelector("#written")?.textContent).toBe("hello");
    expect(writeTarget.querySelector("script")).toBeNull();

    const relocated = document.head.querySelector(
      'script[src="https://legacy.example.com/second.js"]',
    );
    expect(relocated).not.toBeNull();
  });

  it("re-creates written script nodes so they are not inert template nodes", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    void loadScript("https://legacy.example.com/embed.js", {
      interceptDocumentWrite: true,
      writeTarget: container,
    }).catch(() => undefined);

    document.write('<script>window.legacy = 1;<\/script>');

    // The recorded append proves a *fresh* script element reached the document
    // (a template-parsed script would be appended as-is and never execute).
    const inline = appendedScripts.filter(
      (s) => s.text === "window.legacy = 1;",
    );
    expect(inline).toHaveLength(1);
    expect(inline[0].parentElement).toBe(document.head);
  });

  it("falls back to the container when no explicit writeTarget is given", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    void loadScript("https://legacy.example.com/embed.js", {
      target: "container",
      container,
      interceptDocumentWrite: true,
    }).catch(() => undefined);

    document.writeln("<span>fallback</span>");
    expect(container.querySelector("span")?.textContent).toBe("fallback");
  });

  it("restores document.write on load and on error", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const original = document.write;

    const ok = loadScript("https://legacy.example.com/ok.js", {
      interceptDocumentWrite: true,
      writeTarget: container,
    });
    expect(document.write).not.toBe(original);
    fire(appendedScripts[0], "load");
    await expect(ok).resolves.toBeUndefined();
    expect(document.write).toBe(original);

    const bad = loadScript("https://legacy.example.com/bad.js", {
      interceptDocumentWrite: true,
      writeTarget: container,
    });
    expect(document.write).not.toBe(original);
    fire(appendedScripts[1], "error");
    await expect(bad).rejects.toThrow();
    expect(document.write).toBe(original);
  });

  it("identity-guards the restore so a later third-party patch survives", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const promise = loadScript("https://legacy.example.com/ok.js", {
      interceptDocumentWrite: true,
      writeTarget: container,
    });

    const thirdParty = vi.fn() as unknown as typeof document.write;
    document.write = thirdParty;

    fire(appendedScripts[0], "load");
    await expect(promise).resolves.toBeUndefined();

    expect(document.write).toBe(thirdParty);
  });

  it("fully restores document.write after concurrent interceptions unwind", async () => {
    const first = document.createElement("div");
    const second = document.createElement("div");
    document.body.append(first, second);
    const original = document.write;

    const a = loadScript("https://legacy.example.com/a.js", {
      interceptDocumentWrite: true,
      writeTarget: first,
    });
    const b = loadScript("https://legacy.example.com/b.js", {
      interceptDocumentWrite: true,
      writeTarget: second,
    });

    // With no executing-script identity (document.currentScript is null for
    // timer/callback writes) the loader falls back to the most recent target.
    document.write("<i>second</i>");
    expect(second.querySelector("i")).not.toBeNull();

    fire(appendedScripts[0], "load");
    await expect(a).resolves.toBeUndefined();

    // b is still loading, so the patch must stay installed and target b.
    expect(document.write).not.toBe(original);
    document.write("<b>still-second</b>");
    expect(second.querySelector("b")).not.toBeNull();

    fire(appendedScripts[1], "load");
    await expect(b).resolves.toBeUndefined();
    expect(document.write).toBe(original);
  });

  it("routes a write to the executing script's own target while another load is in flight", () => {
    const first = document.createElement("div");
    const second = document.createElement("div");
    document.body.append(first, second);

    void loadScript("https://legacy.example.com/a.js", {
      interceptDocumentWrite: true,
      writeTarget: first,
    }).catch(() => undefined);
    void loadScript("https://legacy.example.com/b.js", {
      interceptDocumentWrite: true,
      writeTarget: second,
    }).catch(() => undefined);

    // Script A finishes downloading first and writes during ITS execution.
    // The write belongs to A's target, not to whichever load started last.
    withCurrentScript(appendedScripts[0], () => {
      document.write('<i id="from-a">a</i>');
    });

    expect(first.querySelector("#from-a")).not.toBeNull();
    expect(second.querySelector("#from-a")).toBeNull();
  });

  it("attributes a vendor-injected nested script to the container holding it", () => {
    const first = document.createElement("div");
    const second = document.createElement("div");
    document.body.append(first, second);

    void loadScript("https://legacy.example.com/a.js", {
      target: "container",
      container: first,
      interceptDocumentWrite: true,
    }).catch(() => undefined);
    void loadScript("https://legacy.example.com/b.js", {
      target: "container",
      container: second,
      interceptDocumentWrite: true,
    }).catch(() => undefined);

    // A legacy embed frequently writes a second <script> beside itself; that
    // script is not one the loader created, but it lives inside A's container.
    const nested = document.createElement("script");
    first.appendChild(nested);

    withCurrentScript(nested, () => {
      document.write('<i id="from-nested">nested</i>');
    });

    expect(first.querySelector("#from-nested")).not.toBeNull();
    expect(second.querySelector("#from-nested")).toBeNull();
  });

  it("releases an interception on demand when the load never settles", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const original = document.write;

    const hung = loadScript("https://legacy.example.com/hung.js", {
      interceptDocumentWrite: true,
      writeTarget: container,
    });
    expect(document.write).not.toBe(original);

    // Neither load nor error will ever fire (blocked host / unmounted block).
    releaseWriteInterception(container);
    expect(document.write).toBe(original);

    // The eventual settle must not double-release or throw.
    fire(appendedScripts[0], "error");
    await expect(hung).rejects.toThrow(/failed to load/);
    expect(document.write).toBe(original);
  });

  it("leaves an unrelated interception installed when one target is released", () => {
    const first = document.createElement("div");
    const second = document.createElement("div");
    document.body.append(first, second);
    const original = document.write;

    void loadScript("https://legacy.example.com/a.js", {
      interceptDocumentWrite: true,
      writeTarget: first,
    }).catch(() => undefined);
    void loadScript("https://legacy.example.com/b.js", {
      interceptDocumentWrite: true,
      writeTarget: second,
    }).catch(() => undefined);

    releaseWriteInterception(first);

    expect(document.write).not.toBe(original);
    document.write('<i id="still-b">b</i>');
    expect(second.querySelector("#still-b")).not.toBeNull();
  });

  it("keeps the interception installed while a slow script is still downloading", async () => {
    // A dynamically inserted async script's document.write is DISCARDED by the
    // browser once the real implementation is back, so dropping the patch on a
    // wall clock while the owner is still mounted and in flight silently loses
    // the embed's markup — the exact case interception exists to serve.
    vi.useFakeTimers();
    const container = document.createElement("div");
    document.body.appendChild(container);
    const original = document.write;

    const slow = loadScript("https://legacy.example.com/slow.js", {
      target: "container",
      container,
      interceptDocumentWrite: true,
      writeTarget: container,
    });
    expect(document.write).not.toBe(original);

    // Three watchdog intervals with the block still mounted and the script
    // still unsettled.
    vi.advanceTimersByTime(90_000);
    expect(document.write).not.toBe(original);

    document.write('<p id="slow-output">late</p>');
    expect(container.querySelector("#slow-output")?.textContent).toBe("late");

    fire(appendedScripts[0], "load");
    await expect(slow).resolves.toBeUndefined();
    expect(document.write).toBe(original);
  });

  it("force-releases with a breadcrumb once the owning block is gone", () => {
    vi.useFakeTimers();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const container = document.createElement("div");
    document.body.appendChild(container);
    const original = document.write;

    void loadScript("https://legacy.example.com/orphan.js", {
      target: "container",
      container,
      interceptDocumentWrite: true,
      writeTarget: container,
    }).catch(() => undefined);

    // The block unmounted without calling releaseWriteInterception: the write
    // target is detached, so the patch is pointing at nothing.
    container.remove();
    vi.advanceTimersByTime(30_000);

    expect(document.write).toBe(original);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("still force-releases a hung-but-mounted interception at the hard ceiling", () => {
    vi.useFakeTimers();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const container = document.createElement("div");
    document.body.appendChild(container);
    const original = document.write;

    void loadScript("https://legacy.example.com/hung-forever.js", {
      target: "container",
      container,
      interceptDocumentWrite: true,
      writeTarget: container,
    }).catch(() => undefined);

    // Mounted the whole time, but the host never fires load OR error: the
    // backstop must still hand document.write back eventually.
    vi.advanceTimersByTime(601_000);

    expect(document.write).toBe(original);
    warn.mockRestore();
  });

  it("intercepts writes around a synchronous inline script too", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const original = document.write;

    // jsdom evaluates inline scripts asynchronously, so stand in for the real
    // browser's parse-time execution: the moment the loader appends the script
    // element, emit the document.write a legacy embed would emit.
    const hooked = Node.prototype.appendChild;
    Node.prototype.appendChild = function <T extends Node>(
      this: Node,
      node: T,
    ): T {
      const result = hooked.call(this, node) as T;
      if (node instanceof HTMLScriptElement && node.text.includes("legacy")) {
        document.write('<i id="written-inline">legacy</i>');
      }
      return result;
    };

    try {
      await runInlineScript("window.legacyWidget = 1;", {
        key: "legacy-inline",
        interceptDocumentWrite: true,
        writeTarget: container,
      });
    } finally {
      Node.prototype.appendChild = hooked;
    }

    expect(container.querySelector("#written-inline")?.textContent).toBe(
      "legacy",
    );
    // Interception window closes as soon as the inline script is appended.
    expect(document.write).toBe(original);
  });
});

/* -------------------------------------------------------------------------- */
/* Stylesheets                                                                  */
/* -------------------------------------------------------------------------- */

describe("loadStylesheet", () => {
  it("appends one <link rel=stylesheet> and dedupes repeat calls", async () => {
    const first = loadStylesheet("https://cdn.example.com/a.css");
    const second = loadStylesheet("https://cdn.example.com/a.css");

    expect(first).toBe(second);
    expect(appendedLinks).toHaveLength(1);
    expect(appendedLinks[0].rel).toBe("stylesheet");
    expect(appendedLinks[0].parentElement).toBe(document.head);

    fire(appendedLinks[0], "load");
    await expect(first).resolves.toBeUndefined();
  });

  it("clears its dedupe entry and removes the link on error", async () => {
    const first = loadStylesheet("https://cdn.example.com/bad.css");
    const failed = appendedLinks[0];

    fire(failed, "error");
    await expect(first).rejects.toThrow(/failed to load stylesheet/);
    expect(failed.isConnected).toBe(false);

    void loadStylesheet("https://cdn.example.com/bad.css").catch(
      () => undefined,
    );
    expect(appendedLinks).toHaveLength(2);
  });

  it("keeps stylesheet keys in a namespace separate from scripts", () => {
    void loadStylesheet("https://cdn.example.com/same", { key: "k" }).catch(
      () => undefined,
    );
    void loadScript("https://cdn.example.com/same", { key: "k" }).catch(
      () => undefined,
    );

    expect(appendedLinks).toHaveLength(1);
    expect(appendedScripts).toHaveLength(1);
  });
});

/* -------------------------------------------------------------------------- */
/* Multiple bundle copies (tsup splitting:false)                                */
/* -------------------------------------------------------------------------- */

/**
 * `tsup` builds with `splitting: false`, so this file is inlined independently
 * into `dist/script-loader.js`, `dist/script-embed.js`, `dist/tripleseat-form.js`
 * and `dist/registry.js`. A host importing two of those subpaths therefore runs
 * two separate module instances against ONE document.
 *
 * `vi.resetModules()` + a fresh dynamic import reproduces exactly that: two
 * distinct module objects, one realm. Both suites below fail if the loader's
 * state ever goes back to bare module scope.
 */
describe("script-loader across duplicated bundle copies", () => {
  async function loadTwoCopies(): Promise<
    [typeof import("../script-loader"), typeof import("../script-loader")]
  > {
    vi.resetModules();
    const copyA = await import("../script-loader");
    vi.resetModules();
    const copyB = await import("../script-loader");

    // Guard the premise: if these are the same object the suites below are
    // vacuous.
    expect(copyA).not.toBe(copyB);
    return [copyA, copyB];
  }

  it("shares one dedupe map, so a url loaded from two bundles executes once", async () => {
    const [copyA, copyB] = await loadTwoCopies();

    const fromA = copyA.loadScript("https://cdn.example.com/widget.js");
    const fromB = copyB.loadScript("https://cdn.example.com/widget.js");

    // Same cached promise, one <script> — no double widget initialization.
    expect(fromA).toBe(fromB);
    expect(appendedScripts).toHaveLength(1);

    fire(appendedScripts[0], "load");
    await expect(fromA).resolves.toBeUndefined();
    await expect(fromB).resolves.toBeUndefined();
  });

  it("restores the real document.write when two bundles unwind their interceptions out of order", async () => {
    const [copyA, copyB] = await loadTwoCopies();

    const realWrite = document.write;
    const realWriteln = document.writeln;

    const targetA = document.createElement("div");
    const targetB = document.createElement("div");
    document.body.append(targetA, targetB);

    // A patches first, B patches on top.
    const loadA = copyA.loadScript("https://cdn.example.com/legacy-a.js", {
      interceptDocumentWrite: true,
      writeTarget: targetA,
    });
    const loadB = copyB.loadScript("https://cdn.example.com/legacy-b.js", {
      interceptDocumentWrite: true,
      writeTarget: targetB,
    });
    expect(appendedScripts).toHaveLength(2);
    expect(document.write).not.toBe(realWrite);

    // A settles FIRST — the out-of-order unwind that leaked with per-copy state
    // (A's identity guard failed, then B restored A's patch permanently).
    fire(appendedScripts[0], "load");
    await expect(loadA).resolves.toBeUndefined();
    fire(appendedScripts[1], "load");
    await expect(loadB).resolves.toBeUndefined();

    expect(document.write).toBe(realWrite);
    expect(document.writeln).toBe(realWriteln);

    // And the stack really is empty: nothing is left pointing at a detached
    // container, so a later write is not silently swallowed into <body>.
    targetA.remove();
    targetB.remove();
  });

  it("lets one copy release an interception another copy installed", async () => {
    const [copyA, copyB] = await loadTwoCopies();

    const realWrite = document.write;
    const target = document.createElement("div");
    document.body.appendChild(target);

    void copyA.loadScript("https://cdn.example.com/hung.js", {
      interceptDocumentWrite: true,
      writeTarget: target,
    });
    expect(document.write).not.toBe(realWrite);

    copyB.releaseWriteInterception(target);

    expect(document.write).toBe(realWrite);
    target.remove();
  });
});

/* -------------------------------------------------------------------------- */
/* SSR                                                                          */
/* -------------------------------------------------------------------------- */

describe("script-loader SSR behaviour", () => {
  it("returns a never-settling promise for every entry point when document is absent", async () => {
    vi.stubGlobal("document", undefined);

    await expect(settlement(loadScript("https://cdn.example.com/a.js"))).resolves.toBe(
      "pending",
    );
    await expect(
      settlement(runInlineScript("window.x = 1;", { key: "k" })),
    ).resolves.toBe("pending");
    await expect(
      settlement(loadStylesheet("https://cdn.example.com/a.css")),
    ).resolves.toBe("pending");
    await expect(
      settlement(loadScriptSequence([{ url: "https://cdn.example.com/a.js" }])),
    ).resolves.toBe("pending");
  });

  it("touches no DOM during SSR", () => {
    vi.stubGlobal("document", undefined);

    void loadScript("https://cdn.example.com/a.js");
    void loadStylesheet("https://cdn.example.com/a.css");

    expect(appendedScripts).toHaveLength(0);
    expect(appendedLinks).toHaveLength(0);
  });
});
