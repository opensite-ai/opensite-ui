"use client";

import * as React from "react";
import { useDeferredMount } from "@page-speed/hooks";
import { cn } from "../../../lib/utils";
import {
  loadScriptSequence,
  loadStylesheet,
  releaseWriteInterception,
} from "../../../lib/script-loader";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/** Fallback height for `containMode="fixed-height"` when no height is supplied. */
const DEFAULT_FIXED_HEIGHT = "600px";

/** A bare number, i.e. a CSS length that is missing its unit. */
const UNITLESS_LENGTH_RE = /^\d+(?:\.\d+)?$/;

/**
 * Normalizes `fixedHeight` into a usable CSS length. Mirrors
 * `iframe-embed.tsx`: a unitless string ("640") is rejected by CSSOM and
 * collapses the reserved box, and a JSON number gets an explicit `px` rather
 * than relying on React's implicit append. Block data is not format-validated
 * upstream, so both shapes reach this prop in practice.
 *
 * @param height raw `fixedHeight` prop value
 */
function resolveFixedHeight(height: unknown): string {
  if (typeof height === "number") {
    return Number.isFinite(height) ? `${height}px` : DEFAULT_FIXED_HEIGHT;
  }
  const trimmed = typeof height === "string" ? height.trim() : "";
  if (!trimmed) return DEFAULT_FIXED_HEIGHT;
  return UNITLESS_LENGTH_RE.test(trimmed) ? `${trimmed}px` : trimmed;
}

/** House container padding used by every non-full-bleed block. */
const DEFAULT_CONTAINER_CLASS_NAME = "px-6 sm:px-6 md:px-8 lg:px-8";

/** Full-bleed container idiom (canonical: hero-fullscreen-background-image). */
const FULL_SCREEN_CONTAINER_CLASS_NAME =
  "px-0 sm:px-0 lg:px-0 max-w-full relative z-10";

/** Console breadcrumb prefix, matching the platform's third-party embed logs. */
const LOG_PREFIX = "[opensite-script-embed]";

/**
 * Monotonic per-mount counter used only when `runOnEveryMount` is true. React
 * StrictMode invokes the effect twice on the SAME component instance, and a ref
 * survives that, so the id stays stable across the double invocation while a
 * genuine SPA remount gets a fresh one.
 */
let mountCounter = 0;

/**
 * djb2 hash, base36-encoded. Used to derive a stable dedupe key from inline
 * script source when the author did not supply `scriptKey`. Deterministic
 * across page loads so the same inline snippet never runs twice.
 */
function hashInlineSource(source: string): string {
  let hash = 5381;
  for (let index = 0; index < source.length; index += 1) {
    hash = ((hash << 5) + hash + source.charCodeAt(index)) | 0;
  }
  return (hash >>> 0).toString(36);
}

/** Drop blank/whitespace-only entries and trim the rest of a URL list. */
function usableUrls(urls: string[] | undefined): string[] {
  if (!urls) return [];
  const cleaned: string[] = [];
  for (const url of urls) {
    const trimmed = typeof url === "string" ? url.trim() : "";
    if (trimmed) cleaned.push(trimmed);
  }
  return cleaned;
}

/* -------------------------------------------------------------------------- */
/* Cross-mount DOM parking                                                     */
/* -------------------------------------------------------------------------- */

/**
 * The shared loader dedupes forever by design (that dedupe is what keeps
 * StrictMode and SPA remounts from double-initializing a widget), so a vendor
 * script is never re-executed. customer-sites is a client-routed SPA, so
 * navigating away and back destroys the container div and mounts a fresh, empty
 * one — and the widget that built its DOM during the URL script's own load
 * never rebuilds it. The visitor sees a blank box until a hard reload.
 *
 * So on unmount the widget's DOM is detached into a module-level holder and put
 * back on the next mount with the same key. This repaints the widget WITHOUT
 * re-executing anything, which is what the contract requires (DESIGN-CONTRACT
 * §1 dedupe semantics, §3 `runOnEveryMount` defaults to false).
 *
 * `<script>` children are deliberately NOT parked: they have already executed,
 * re-attaching them does nothing in a browser, and keeping them out of the
 * holder keeps "did the script run again?" honest.
 *
 * Known limitation (same as integrations/tripleseat-form): two live blocks with
 * the same dedupe key on one page — only the first to mount adopts the parked
 * DOM. Widgets keyed by a shared loader URL already share global mount-point
 * ids, so two live copies are broken by construction regardless.
 */
const parkedEmbeds = new Map<
  string,
  { holder: HTMLElement; mountId: number | null }
>();

function parkEmbedDom(
  key: string,
  container: HTMLElement,
  mountId: number | null,
): void {
  const holder = container.ownerDocument.createElement("div");
  for (const node of Array.from(container.childNodes)) {
    if (node instanceof HTMLScriptElement) continue;
    holder.appendChild(node);
  }
  if (holder.childNodes.length === 0) return;
  parkedEmbeds.set(key, { holder, mountId });
}

/** Returns the mount id that parked the DOM, or null when nothing was adopted. */
function adoptParkedEmbed(
  key: string,
  container: HTMLElement,
): number | null | undefined {
  const parked = parkedEmbeds.get(key);
  if (!parked) return undefined;
  parkedEmbeds.delete(key);
  // The injection effect has just written a pristine copy of companionHtml into
  // this container; the parked nodes ARE that markup plus everything the widget
  // built on top of it, so they replace it wholesale.
  //
  // `<script>` children are the one exception, for the same reason they are
  // never parked: on a same-instance re-run the loader has already appended
  // this block's scripts here and one of them may still be downloading.
  // Detaching it would not un-run it, but it WOULD make the script-loader's
  // document.write watchdog read the embed as dead and drop the interception.
  for (const node of Array.from(container.childNodes)) {
    if (node instanceof HTMLScriptElement) continue;
    container.removeChild(node);
  }
  const firstScript = container.firstChild;
  for (const node of Array.from(parked.holder.childNodes)) {
    container.insertBefore(node, firstScript);
  }
  return parked.mountId;
}

/**
 * True when the container still holds markup the visitor can see. `<script>`
 * children are ignored: they are never parked, so a container holding nothing
 * but scripts is exactly the "cleanup emptied me" state.
 */
function hasRenderedChildren(container: HTMLElement): boolean {
  for (const node of Array.from(container.childNodes)) {
    if (!(node instanceof HTMLScriptElement)) return true;
  }
  return false;
}

/**
 * Writes `companionHtml` into the container by hand.
 *
 * React does not own the container's children at all (see the injection effect
 * in the component), so this is the ONLY thing that ever puts the companion
 * markup in the DOM: on mount, when the author edits `companionHtml`, and after
 * an effect cleanup has detached the previous children into the park.
 *
 * Already-executed `<script>` children are left alone (removing them does not
 * un-run them, and `currentWriteTarget` attributes vendor-injected scripts by
 * containment), and the companion goes in FRONT of them so the DOM order
 * matches a fresh render.
 */
function reseedCompanion(container: HTMLElement, companionHtml: string): void {
  for (const node of Array.from(container.childNodes)) {
    if (node instanceof HTMLScriptElement) continue;
    container.removeChild(node);
  }
  if (!companionHtml) return;
  const template = container.ownerDocument.createElement("template");
  template.innerHTML = companionHtml;
  container.insertBefore(template.content, container.firstChild);
}

/** Test-only: clears the module-level parked-DOM store. */
export function __resetScriptEmbedStateForTests(): void {
  parkedEmbeds.clear();
}

export interface ScriptEmbedProps {
  /**
   * URL of the third-party script to load. Copy the `src` value out of the
   * snippet the site owner supplied, EXACTLY as given. Never invent a script
   * URL and never use this block unless the owner provided the code.
   */
  scriptUrl?: string;
  /**
   * Additional script URLs, loaded strictly one at a time AFTER `scriptUrl`
   * finishes. Use when the owner's snippet contains several `<script src>` tags
   * that must run in order.
   */
  additionalScriptUrls?: string[];
  /**
   * Inline JavaScript from the owner's snippet (the contents of a `<script>`
   * tag with no `src`). Runs after every URL script has loaded. Paste the code
   * verbatim, without the surrounding `<script>` tags.
   */
  inlineScriptHtml?: string;
  /**
   * Companion markup from the owner's snippet — the `<div>`/`<span>` mount
   * point the widget looks for. It is placed in the DOM BEFORE any script runs,
   * so widgets that search for their container at start-up find it.
   */
  companionHtml?: string;
  /** Stylesheet URLs from the owner's snippet. Loaded before any script runs. */
  stylesheetUrls?: string[];
  /**
   * "afterInteractive" (default) starts the chain as soon as the block mounts.
   * "lazyOnload" waits for browser idle time — use it for chat widgets, social
   * feeds and anything else that is not needed for the first interaction.
   */
  loadStrategy?: "afterInteractive" | "lazyOnload";
  /**
   * Set true ONLY for legacy widgets that call `document.write`. It redirects
   * those writes into this block's container instead of letting them wipe the
   * page. Default false.
   */
  allowDocumentWrite?: boolean;
  /**
   * Explicit dedupe key for the EXTERNAL script. Defaults to `scriptUrl`, or a
   * stable hash of `inlineScriptHtml` when there is no URL. Set it when the
   * same widget is embedded on several pages with slightly different URLs and
   * must only initialise once. Inline code is always additionally keyed by a
   * hash of itself, so two blocks sharing one loader URL (or one `scriptKey`)
   * still each run their own init.
   */
  scriptKey?: string;
  /**
   * When false (default) the inline script runs once per page load, and after
   * client-side navigation back to this block the widget's existing DOM is
   * re-attached to the fresh container so it repaints without re-running.
   * Set true for widgets that must genuinely re-initialise on every mount:
   * the container is rebuilt from `companionHtml` and the inline code runs
   * again. External script URLs are loaded only once either way.
   */
  runOnEveryMount?: boolean;
  /**
   * How the embed area is sized. "auto" (default) lets the widget size itself,
   * "fixed-height" reserves a pixel height (prevents layout shift), and
   * "full-screen" fills the viewport edge to edge.
   */
  containMode?: "auto" | "fixed-height" | "full-screen";
  /**
   * CSS height used when `containMode="fixed-height"`, e.g. "480px".
   * Defaults to "600px".
   */
  fixedHeight?: string;
  /** Additional CSS classes for the container the widget renders into. */
  embedClassName?: string;
  /**
   * Short line shown when no script, inline code, or companion markup is
   * configured yet. With nothing configured and no label the block renders no
   * content at all — it never fabricates a placeholder widget.
   */
  emptyStateLabel?: string;
  /** Optional Section ID. */
  sectionId?: string;
  /** Optional heading rendered above the embed by the Section. */
  title?: string;
  /** Optional kicker rendered above the heading by the Section. */
  subtitle?: string;
  /** Section background variant. */
  background?: SectionBackground;
  /**
   * Section spacing variant. Defaults to "none" when
   * `containMode="full-screen"`.
   */
  spacing?: SectionSpacing;
  /** Pattern background key. */
  pattern?: PatternName | undefined;
  /** Pattern opacity (0-1). */
  patternOpacity?: number;
  /** Additional CSS classes for the section. */
  className?: string;
  /** Additional CSS classes for the container. */
  containerClassName?: string;
  /** Inline styles for the section element. */
  style?: React.CSSProperties;
}

/**
 * Runs an owner-supplied third-party script snippet (chat widget, booking
 * engine, menu embed, analytics-driven widget) inside the standard Section
 * chrome, with a guaranteed load order and StrictMode-safe deduplication.
 *
 * @example
 * ```tsx
 * <ScriptEmbed
 *   scriptUrl="https://embed-menu-preloader.untappdapi.com/embed-menu-preloader.min.js"
 *   companionHtml='<div id="untappd-menu-container"></div>'
 *   inlineScriptHtml="PreloadEmbedMenu('untappd-menu-container', 1234, 56);"
 * />
 * ```
 */
export function ScriptEmbed({
  scriptUrl,
  additionalScriptUrls,
  inlineScriptHtml,
  companionHtml,
  stylesheetUrls,
  loadStrategy = "afterInteractive",
  allowDocumentWrite = false,
  scriptKey,
  runOnEveryMount = false,
  containMode = "auto",
  fixedHeight,
  embedClassName,
  emptyStateLabel,
  sectionId = "script-embed",
  title,
  subtitle,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  style,
}: ScriptEmbedProps): React.JSX.Element {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Assigned on the first effect run and never cleared, so it survives the
  // StrictMode effect → cleanup → effect cycle but changes on a real remount.
  const mountIdRef = React.useRef<number | null>(null);

  // Deferred so StrictMode's synthetic unmount cannot drop a live interception.
  const releaseTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // What the LAST cleanup on THIS instance parked. Non-null at the head of an
  // effect run means the run is a same-instance re-run (StrictMode's synthetic
  // teardown, or a dependency change on a mounted block) rather than a mount,
  // and that the container it is about to use has just been emptied.
  const parkRef = React.useRef<{
    key: string;
    companion: string;
  } | null>(null);

  // Identity of the previous effect run's inputs, used to tell StrictMode's
  // re-invocation (identical inputs) apart from a genuine builder prop edit.
  const runSignatureRef = React.useRef<string | null>(null);

  // The companion markup THIS instance has written into the container. React
  // never writes it (see the injection effect), so this ref is the only record
  // of what is in there.
  const injectedCompanionRef = React.useRef<string | null>(null);

  const isLazy = loadStrategy === "lazyOnload";
  const deferredReady = useDeferredMount({ priority: "low" });
  const shouldRun = isLazy ? deferredReady : true;

  // Serialised ONLY to stabilise the effect dependency array — array identity
  // churn from the builder must not re-run the chain on every render. The
  // signatures are never split back apart: `|` is legal inside a URL (Google
  // Fonts v1 hrefs use it), so the effect reads the real arrays through refs.
  const additionalSignature = (additionalScriptUrls ?? []).join("|");
  const stylesheetSignature = (stylesheetUrls ?? []).join("|");

  const additionalUrlsRef = React.useRef(additionalScriptUrls);
  additionalUrlsRef.current = additionalScriptUrls;
  const stylesheetUrlsRef = React.useRef(stylesheetUrls);
  stylesheetUrlsRef.current = stylesheetUrls;
  const companionHtmlRef = React.useRef(companionHtml);
  companionHtmlRef.current = companionHtml;

  const hasScriptPayload = Boolean(
    scriptUrl || additionalSignature || inlineScriptHtml,
  );
  const hasContent = hasScriptPayload || Boolean(companionHtml);

  /**
   * Injects `companionHtml` into the container IMPERATIVELY, and is declared
   * BEFORE the loader effect so the markup is in the DOM before any stylesheet
   * or script is appended (DESIGN-CONTRACT §3 execution order — React attaches
   * refs and runs effects in hook order within a commit).
   *
   * P1 found by browser E2E: rendering the companion through
   * `dangerouslySetInnerHTML` makes React the OWNER of that subtree, and React
   * re-applies the markup on a later commit, wiping every node the vendor
   * script built plus the `<script>` element itself. react-dom 19's
   * `updateProperties` compares the `dangerouslySetInnerHTML` prop OBJECT by
   * identity and then assigns `innerHTML` unconditionally, and `{ __html }` is
   * a fresh literal every render, so EVERY update commit re-applies it
   * (react-dom 18 guards on the `__html` string, which is why jsdom stayed
   * green while the browser failed). The loader's dedupe key is retained by
   * design, so the init never re-runs: a permanently blank widget, silently.
   *
   * Writing the markup here means React never touches the container's children,
   * so no commit can undo the widget.
   *
   * Trade-off, accepted: the mount point is no longer part of server-rendered
   * HTML. It is an empty vendor mount point rather than content, and the code
   * that fills it is client-only regardless — use `containMode="fixed-height"`
   * to reserve space.
   */
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const html = companionHtml ?? "";
    // Nothing configured: never clear the container. A companion prop that goes
    // away mid-session must not destroy live vendor DOM (React never cleared it
    // either — it only ever wrote non-null `__html`).
    if (!html) return;
    // Same markup, and the container still holds visible children: leave it
    // alone, and specifically leave everything the widget built on top of it.
    if (
      injectedCompanionRef.current === html &&
      hasRenderedChildren(container)
    ) {
      return;
    }
    injectedCompanionRef.current = html;
    reseedCompanion(container, html);
  }, [companionHtml]);

  React.useEffect(() => {
    if (!shouldRun || !hasScriptPayload) return;

    let cancelled = false;
    const container = containerRef.current;

    // NUL-joined: none of these values can contain it, so the signature cannot
    // be spoofed by a value that happens to contain the separator.
    const runSignature = [
      scriptUrl ?? "",
      additionalSignature,
      stylesheetSignature,
      inlineScriptHtml ?? "",
      scriptKey ?? "",
      String(runOnEveryMount),
      String(allowDocumentWrite),
      companionHtmlRef.current ?? "",
    ].join("\u0000");
    const inputsChanged =
      runSignatureRef.current !== null &&
      runSignatureRef.current !== runSignature;
    runSignatureRef.current = runSignature;

    // A prop edit on a live `runOnEveryMount` block must genuinely re-init, so
    // it needs a fresh mount id: the inline dedupe key carries the id, and
    // reusing it would let the loader swallow the re-run against a container we
    // are about to rebuild (a permanently blank widget). StrictMode's re-invoke
    // changes nothing, keeps the id, and stays deduped.
    if (mountIdRef.current === null || (runOnEveryMount && inputsChanged)) {
      mountCounter += 1;
      mountIdRef.current = mountCounter;
    }

    // A pending release belongs to the cleanup that StrictMode just ran on this
    // same instance — cancel it, the block is still here.
    if (releaseTimerRef.current !== null) {
      clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
    }

    const primaryScriptUrl = scriptUrl?.trim() ?? "";
    const primaryKey =
      scriptKey ??
      (primaryScriptUrl || `inline:${hashInlineSource(inlineScriptHtml ?? "")}`);
    // Captured, not re-read in the cleanup: the cleanup runs AFTER React has
    // rendered the next companionHtml, and the park has to be labelled with the
    // markup that actually seeded it.
    const companion = companionHtmlRef.current ?? "";
    // The parked DOM is only interchangeable when the companion markup that
    // seeded it is identical, so the companion is part of the park key.
    const parkKey = `${primaryKey}::dom:${hashInlineSource(companion)}`;

    // Claim (and clear) whatever this instance's own previous cleanup parked.
    const ownPark = parkRef.current;
    parkRef.current = null;

    if (container) {
      if (ownPark) {
        // ── Same-instance effect re-run ──────────────────────────────────
        // The cleanup we just came out of MOVED this container's children into
        // the park. A script-prop-only edit does not re-run the companion
        // injection effect (it keys off `companionHtml` alone), so the container
        // can be empty right now with nothing else about to refill it. Restore
        // or rebuild it here.
        const rebuild =
          // A live `runOnEveryMount` edit is an explicit "start over".
          (runOnEveryMount && inputsChanged) ||
          // The author edited companionHtml: the parked copy is stale markup.
          ownPark.companion !== companion;

        if (rebuild) {
          parkedEmbeds.delete(ownPark.key);
        } else {
          // Adopt by the key the CLEANUP used, not the freshly computed one:
          // any dep change (scriptUrl, scriptKey, …) moves `parkKey`, and
          // adopting by the new key would strand the widget's DOM in the map.
          adoptParkedEmbed(ownPark.key, container);
        }

        if (!hasRenderedChildren(container)) {
          injectedCompanionRef.current = companion;
          reseedCompanion(container, companion);
        }
      } else if (runOnEveryMount) {
        // Genuine mount: the injection effect has just written a pristine
        // companion mount point and the init is about to re-run, so
        // resurrecting the previous render would double the widget.
        parkedEmbeds.delete(parkKey);
      } else {
        const parkedBy = adoptParkedEmbed(parkKey, container);
        // Only a DIFFERENT instance parking it means a genuine remount —
        // StrictMode parks and re-adopts within one instance every mount.
        if (parkedBy !== undefined && parkedBy !== mountIdRef.current) {
          console.info(`${LOG_PREFIX} restored embed DOM after remount`);
        }
      }
    }

    const run = async (): Promise<void> => {
      const stylesheets = usableUrls(stylesheetUrlsRef.current);

      // Stylesheets first, but a broken stylesheet must never stop the widget
      // script from running — hence allSettled rather than all.
      if (stylesheets.length > 0) {
        const results = await Promise.allSettled(
          stylesheets.map((href) => loadStylesheet(href)),
        );
        for (const result of results) {
          if (result.status === "rejected") {
            console.warn(`${LOG_PREFIX} stylesheet failed`, result.reason);
          }
        }
        if (cancelled) return;
      }

      const items: Array<{ url?: string; inline?: string; key?: string }> = [];
      if (primaryScriptUrl) {
        items.push({ url: primaryScriptUrl, key: primaryKey });
      }
      for (const url of usableUrls(additionalUrlsRef.current)) {
        items.push({ url });
      }
      if (inlineScriptHtml) {
        // The inline key is ALWAYS content-addressed. Deriving it from the
        // loader URL alone makes two blocks that share one loader (the
        // canonical multi-menu shape) collide on a single dedupe entry, so the
        // second block's init is silently swallowed — and an edit to the code
        // in the builder produces the same key and stays inert.
        const base = `${primaryKey}::inline:${hashInlineSource(
          inlineScriptHtml,
        )}`;
        items.push({
          inline: inlineScriptHtml,
          key: runOnEveryMount ? `${base}::mount-${mountIdRef.current}` : base,
        });
      }

      await loadScriptSequence(items, {
        target: container ? "container" : "head",
        container,
        interceptDocumentWrite: allowDocumentWrite,
        writeTarget: container,
      });
    };

    run().catch((error: unknown) => {
      if (!cancelled) console.warn(`${LOG_PREFIX} load failed`, error);
    });

    return () => {
      cancelled = true;
      if (!container) return;

      // Hand the widget's DOM to the next mount instead of letting React drop
      // it on the floor (the vendor script will never run again).
      //
      // This detaches the container's children, so the record below is not
      // bookkeeping — it is the ONLY way a same-instance re-run can find them
      // again once the park key has moved with a prop edit.
      parkRef.current = { key: parkKey, companion };
      parkEmbedDom(parkKey, container, mountIdRef.current);

      if (!allowDocumentWrite) return;
      // Deferred by a macrotask: StrictMode runs cleanup then immediately
      // re-runs the effect on the SAME instance, and the re-run cancels this.
      // A genuine unmount lets it fire, which tears down a document.write patch
      // whose script may never fire load or error at all.
      releaseTimerRef.current = setTimeout(() => {
        releaseTimerRef.current = null;
        releaseWriteInterception(container);
      }, 0);
    };
  }, [
    shouldRun,
    hasScriptPayload,
    scriptUrl,
    additionalSignature,
    stylesheetSignature,
    inlineScriptHtml,
    scriptKey,
    runOnEveryMount,
    allowDocumentWrite,
  ]);

  const isFullScreen = containMode === "full-screen";
  const isFixedHeight = containMode === "fixed-height";

  const resolvedSpacing = spacing ?? (isFullScreen ? "none" : undefined);
  const resolvedContainerClassName =
    containerClassName ??
    (isFullScreen
      ? FULL_SCREEN_CONTAINER_CLASS_NAME
      : DEFAULT_CONTAINER_CLASS_NAME);

  return (
    <Section
      id={sectionId}
      title={title}
      subtitle={subtitle}
      background={background}
      spacing={resolvedSpacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={resolvedContainerClassName}
      style={style}
    >
      {hasContent ? (
        <div
          ref={containerRef}
          data-testid="script-embed-container"
          className={cn("w-full", isFullScreen && "h-screen", embedClassName)}
          style={
            isFixedHeight
              ? { height: resolveFixedHeight(fixedHeight) }
              : undefined
          }
          // Deliberately EMPTY and childless in React's eyes: the owner-supplied
          // companion markup is written by the injection effect above, never by
          // React. Handing it to React (`dangerouslySetInnerHTML`) lets a later
          // commit re-apply it and destroy the vendor's DOM permanently — the
          // P1 that browser E2E found. Do not add children or
          // `dangerouslySetInnerHTML` here.
        />
      ) : (
        emptyStateLabel && (
          <p className="text-sm text-muted-foreground">{emptyStateLabel}</p>
        )
      )}
    </Section>
  );
}
