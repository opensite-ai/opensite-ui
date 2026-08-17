"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "@page-speed/router";
import { cn } from "../../../lib/utils";
import { loadScript, releaseWriteInterception } from "../../../lib/script-loader";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import {
  TRIPLESEAT_SCOPE_CLASS,
  acquireBodyMarker,
  buildTripleseatCss,
  hasResolvedThemeTokens,
  readTripleseatTheme,
  releaseBodyMarker,
} from "./tripleseat-style";

/* -------------------------------------------------------------------------- */
/* Constants (structural / config defaults — never user-facing copy)           */
/* -------------------------------------------------------------------------- */

const LOG_PREFIX = "[opensite-tripleseat]";

/** Structural constant. The client supplies only the two query params. */
const TRIPLESEAT_SCRIPT_BASE = "https://api.tripleseat.com/v1/leads/ts_script.js";

/**
 * The embed `document.write`s this itself; we only re-request it when the user
 * hits retry after a bounded wait expired (transient network / blocked request).
 */
const RECAPTCHA_SCRIPT_URL = "https://www.google.com/recaptcha/api.js";

const DEFAULT_RECAPTCHA_TIMEOUT_SECONDS = 30;
const DEFAULT_FORM_MIN_HEIGHT = "400px";
const WATCHDOG_INTERVAL_MS = 1000;
/** Long enough for the confirmation to be read before the route changes. */
const SUCCESS_REDIRECT_DELAY_MS = 2000;
/**
 * `TS.lead_form_embed.init()` is re-run only while jQuery-UI has not claimed the
 * date input — a sentinel this block does not own. If jQuery-UI never attaches,
 * an uncapped repair re-binds the vendor's handlers at 1 Hz for the life of the
 * page, so the repair is bounded and the failure surfaces as the degraded state.
 */
const MAX_BINDING_REPAIRS = 5;
/**
 * The per-site Tailwind bundle is async, so tokens read at mount can be empty.
 * Re-derive on the first few watchdog ticks (belt) as well as on the stylesheet
 * readiness events (braces) until they resolve.
 */
const MAX_THEME_REDERIVE_TICKS = 5;
/** Events the customer-sites shell fires once its per-site stylesheet is usable. */
const THEME_READY_EVENTS = [
  "dashtrack:tailwindInlineReady",
  "dashtrack:chaiPagesLoaded",
];
/** The per-site Tailwind `<link>` on customer-sites (`rel=preload` → stylesheet). */
const SITE_STYLESHEET_LINK_ID = "dt-tailwind";

/**
 * `successRedirectPath` is an INTERNAL SITE PATH and nothing else.
 *
 * The value can originate from AI-generated page content, and page content is
 * outside the trust corpus (see the octane verbatim-code guard). A raw
 * `location.href` assignment is a same-origin execution primitive —
 * `javascript:…` runs on the customer's own origin — so this block refuses every
 * target that is not a single-slash-prefixed path and stays on the in-place
 * confirmation instead. `//host` is protocol-relative and `/\host` is normalized
 * to it by the URL parser, so both are external.
 *
 * The parser ALSO strips every ASCII tab/LF/CR before it parses, so `"/\t/host"`
 * survives a `.trim()`, reads like a path, and still resolves protocol-relative.
 * Rather than normalize and re-check, anything carrying a control character is
 * refused outright: this predicate must hold on its own, not because the one
 * caller happens to end at `pushState` (whose own same-origin check would throw
 * a SecurityError out of a timer instead of leaving the refusal breadcrumb).
 */
const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F]/;

function isInternalSitePath(target: string): boolean {
  if (typeof target !== "string") return false;
  if (CONTROL_CHARACTERS.test(target)) return false;
  return (
    target.startsWith("/") &&
    !target.startsWith("//") &&
    !target.startsWith("/\\")
  );
}

/* -------------------------------------------------------------------------- */
/* Third-party global surface (contract with ts_script.js)                     */
/* -------------------------------------------------------------------------- */

interface JQueryLikeResult {
  remove: () => void;
  is: (selector: string) => boolean;
  replaceWith: (html: string) => void;
}

type JQueryLike = (selector: unknown) => JQueryLikeResult;

interface TripleseatNamespace {
  jQuery?: JQueryLike;
  lead_form_embed?: { init?: () => void; form_selector?: string };
  custom_success_callback?: (successMessage: string) => void;
}

interface GrecaptchaNamespace {
  render?: (element: Element, params: { sitekey: string | null }) => number;
  reset?: (widgetId?: number) => void;
  /** Sentinel — the reset patch is installed at most once per page load. */
  __opensiteTripleseatPatched?: boolean;
}

interface TripleseatWindow extends Window {
  TS?: TripleseatNamespace;
  grecaptcha?: GrecaptchaNamespace;
}

/* -------------------------------------------------------------------------- */
/* Realm-global state (parked DOM, live widget, live success handler)          */
/* -------------------------------------------------------------------------- */

/**
 * Everything in this record is PAGE-scoped, because the things that consume it
 * are page-scoped: the `grecaptcha.reset` patch, `TS.custom_success_callback`
 * and the script loader's dedupe map all live for the life of the page and are
 * installed at most once.
 *
 * A plain module-level `const` does NOT give us one copy per page. tsup builds
 * with `splitting: false`, so this file is inlined independently into
 * `dist/tripleseat-form.js` AND `dist/registry.js`; a host that imports the
 * registry plus the tree-shakable subpath (the advertised pattern) gets two
 * private copies. Copy A would install the reset patch against copy A's widget
 * box while the mounted block wrote copy B's — the argument-less reset would
 * forward `undefined` and a validation-error resubmission would silently never
 * clear the live captcha. Anchoring on `globalThis` (the same version-keyed
 * pattern `lib/script-loader.ts` uses) makes every copy share one instance.
 */
interface TripleseatRealmState {
  /**
   * The shared script loader dedupes by key and never re-appends a script that
   * already loaded (that dedupe is what keeps StrictMode and SPA remounts from
   * double-initializing the embed). The side effect is that a remount gets an
   * EMPTY container, because `ts_script.js` only writes its markup once. So on
   * unmount we detach the vendor's DOM into a holder and put it back on the
   * next mount with the same credentials. jQuery bindings survive a node move;
   * anything that does not is re-attached by the watchdog anyway.
   *
   * Known limitation: two instances with the same credentials on one page — the
   * second gets nothing. TripleSeat's markup uses global element ids
   * (`#tripleseat_embed_form`, `#dp_lead_event_date`), so two live forms on one
   * page are broken by construction regardless.
   */
  parkedForms: Map<string, HTMLElement>;
  /**
   * The widget the argument-less `grecaptcha.reset()` patch must clear. A
   * per-instance ref would freeze the patch on whichever instance installed it.
   */
  activeCaptchaWidgetId: { current: number | null };
  /**
   * The MOUNTED instance's success handler. `TS.custom_success_callback` is
   * installed once per page and the vendor holds that reference forever, so the
   * closure must dispatch through this box: pinning it to the installing
   * instance's ref means a post-remount submission runs a dead instance's
   * handler (no confirmation renders, and it arms a redirect timer whose
   * cleanup has already run and can never clear it).
   *
   * Last mount wins, same as the widget box. Two LIVE forms on one page are
   * already broken by construction (the vendor's global element ids), and the
   * container-scoped backup marker probe still resolves that case per block.
   */
  activeSuccessHandler: { current: ((message: string) => void) | null };
  /** Per-credential embed load bookkeeping — see `EmbedAttempt`. */
  embedAttempts: Map<string, EmbedAttempt>;
  /** Monotonic source of fresh loader keys. */
  attemptSequence: number;
}

/**
 * The loader key an embed load is currently using, plus whether that load ever
 * settled. A request that hangs (blocked by an extension / corporate proxy)
 * fires neither `load` nor `error`, so its promise stays in the loader's dedupe
 * map forever: re-calling `loadScript` with the same key returns that pending
 * promise and appends NOTHING. Re-attempts therefore have to move to a new key.
 */
interface EmbedAttempt {
  key: string;
  settled: boolean;
  /** Set when a real unmount released this attempt's write interception. */
  abandoned: boolean;
}

type TripleseatGlobal = typeof globalThis & {
  __opensiteTripleseatStateV1?: TripleseatRealmState;
};

function realmState(): TripleseatRealmState {
  const scope = globalThis as TripleseatGlobal;
  let state = scope.__opensiteTripleseatStateV1;
  if (!state) {
    state = {
      parkedForms: new Map<string, HTMLElement>(),
      activeCaptchaWidgetId: { current: null },
      activeSuccessHandler: { current: null },
      embedAttempts: new Map<string, EmbedAttempt>(),
      attemptSequence: 0,
    };
    scope.__opensiteTripleseatStateV1 = state;
  }
  return state;
}

function parkForm(key: string, container: HTMLElement): void {
  const nodes = Array.from(container.childNodes);
  if (nodes.length === 0) return;
  const holder = container.ownerDocument.createElement("div");
  for (const node of nodes) holder.appendChild(node);
  realmState().parkedForms.set(key, holder);
}

function adoptParkedForm(key: string, container: HTMLElement): boolean {
  const { parkedForms } = realmState();
  const holder = parkedForms.get(key);
  if (!holder) return false;
  parkedForms.delete(key);
  for (const node of Array.from(holder.childNodes)) container.appendChild(node);
  return true;
}

/** The key this credential pair is loading under, starting the first attempt. */
function embedAttemptKey(dedupeKey: string, fresh: boolean): string {
  const state = realmState();
  const existing = state.embedAttempts.get(dedupeKey);
  if (existing && !fresh) return existing.key;
  // A fresh attempt never reuses a key: the loader caches by key and a stalled
  // entry is never evicted, so the same key would be a guaranteed no-op.
  state.attemptSequence += 1;
  const key = existing
    ? `${dedupeKey}#attempt-${state.attemptSequence}`
    : dedupeKey;
  state.embedAttempts.set(dedupeKey, { key, settled: false, abandoned: false });
  return key;
}

/**
 * Record that `key`'s load settled. Returns false when a newer attempt has
 * already superseded it, so a stale promise cannot resolve over a live one.
 */
function markEmbedAttemptSettled(dedupeKey: string, key: string): boolean {
  const attempt = realmState().embedAttempts.get(dedupeKey);
  if (!attempt || attempt.key !== key) return false;
  attempt.settled = true;
  return true;
}

/** A real unmount released the interception: the next mount must re-attempt. */
function markEmbedAttemptAbandoned(dedupeKey: string): void {
  const attempt = realmState().embedAttempts.get(dedupeKey);
  if (attempt) attempt.abandoned = true;
}

/**
 * True when a previous mount walked away from an unsettled load. Its dedupe
 * entry still holds a pending promise and its interception is gone, so reusing
 * the key would leave the new container empty for the life of the page.
 */
function embedAttemptWasAbandoned(dedupeKey: string): boolean {
  const attempt = realmState().embedAttempts.get(dedupeKey);
  return Boolean(attempt && attempt.abandoned && !attempt.settled);
}

/** Test-only: clears the realm-global parked DOM, widget, handler and attempts. */
export function __resetTripleseatFormStateForTests(): void {
  const state = realmState();
  state.parkedForms.clear();
  state.embedAttempts.clear();
  state.activeCaptchaWidgetId.current = null;
  state.activeSuccessHandler.current = null;
  state.attemptSequence = 0;
}

/* -------------------------------------------------------------------------- */
/* Props                                                                       */
/* -------------------------------------------------------------------------- */

export interface TripleseatFormProps {
  /**
   * The `lead_form_id` query parameter from the client's TripleSeat script tag.
   * Copy it verbatim out of the URL the client supplied — never invent one.
   */
  leadFormId?: string;
  /**
   * The `public_key` query parameter from the client's TripleSeat script tag.
   * Copy it verbatim out of the URL the client supplied — never invent one.
   */
  publicKey?: string;
  /**
   * Internal site path to send the visitor to after a successful submission
   * (for example "/thank-you"). Must start with a single "/" — it is navigated
   * in-app via the client-side router. Absolute URLs, protocol-relative "//host"
   * values and any other scheme are REFUSED (the confirmation stays in place),
   * so this block never navigates off-site. Leave empty to show the confirmation
   * in place instead.
   */
  successRedirectPath?: string;
  /** Heading shown in place of the form after a successful submission. */
  successTitle?: string;
  /** Body copy shown in place of the form after a successful submission. */
  successMessage?: string;
  /** Heading for the degraded state shown when the form cannot become usable. */
  degradedTitle?: string;
  /**
   * Body copy for the degraded state. Required: a form that silently fails to
   * load must always tell the visitor how else to reach the business.
   */
  degradedMessage?: string;
  /** Real business phone number offered as a fallback in the degraded state. */
  contactPhone?: string;
  /** Real business email address offered as a fallback in the degraded state. */
  contactEmail?: string;
  /** Label for the button that re-attempts loading the form. Required. */
  retryLabel?: string;
  /** Seconds to wait for the form's reCAPTCHA before degrading. Default 30. */
  recaptchaTimeoutSeconds?: number;
  /** Reserved height for the embed while it loads. Default "400px". */
  formMinHeight?: string;
  /** Optional Section ID */
  sectionId?: string;
  /** Section heading rendered above the form */
  title?: string;
  /** Section eyebrow rendered above the heading */
  subtitle?: string;
  /** Section background variant */
  background?: SectionBackground;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Pattern background key or URL */
  pattern?: PatternName | undefined;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Additional CSS classes for the section */
  className?: string;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Inline styles for the section */
  style?: React.CSSProperties;
}

type Phase = "loading" | "ready" | "degraded" | "success";
type DegradedReason = "script" | "recaptcha";

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Renders a client's TripleSeat lead form, branded to the surrounding site.
 *
 * Mechanism (ported from the verified production prototype, see
 * `docs/component-library/recon/RECON-tripleseat-prod.md` §1):
 *
 * - `ts_script.js` is a legacy embed: it `document.write`s the form markup
 *   "beside" its own `<script>` tag and writes the reCAPTCHA `<script>` too. The
 *   script therefore has to live INSIDE this block's container, with
 *   `document.write` intercepted — written `<script>` nodes are re-created into
 *   `<head>` (template-parsed scripts are inert), everything else lands in the
 *   container. Both behaviours come from the shared script-loader primitive.
 * - A 1 Hz watchdog re-installs/repairs the pieces the vendor only wires up
 *   once: the success callback, the datepicker/time-select/submit bindings, the
 *   reCAPTCHA widget, and `grecaptcha.reset`. Every check is a no-op when
 *   healthy and each install is sentinel-guarded, so it is safe to run forever.
 *
 * Improvements over the prototype:
 * - The prototype's reCAPTCHA wait was UNBOUNDED and had no user-visible failure
 *   path: if Google never loaded, the visitor stared at a dead form and the
 *   business silently lost the lead. Here the wait is bounded and expiry renders
 *   a degraded state with the business's own contact details and a retry.
 * - Success never hard-navigates: an internal `successRedirectPath` is an in-app
 *   route change, and any other value (absolute URL, protocol-relative, or a
 *   `javascript:` payload injected into page content) is refused outright — the
 *   confirmation simply renders in place. This block has no `location.href` sink.
 * - Branding is derived from the host page's CSS variables at runtime instead of
 *   a hand-written brand stylesheet (see `./tripleseat-style`).
 *
 * NOT reversible on unmount (documented, and why every install is idempotent):
 * the `<script>` re-created into `<head>` by the write interception, the
 * `grecaptcha.reset` monkey-patch (guarded by `__opensiteTripleseatPatched`), and
 * `window.TS.custom_success_callback` (guarded by a typeof check) all persist for
 * the life of the page. The success callback survives, but it dispatches through
 * a realm-global box that always points at the MOUNTED instance (or at nothing),
 * so it is inert once the block is gone. What IS cleaned up: the watchdog
 * interval, the pending redirect timer, the `document.write` interception
 * (`releaseWriteInterception`, deferred one macrotask so StrictMode's
 * cleanup+re-setup cannot drop a live patch), the injected `<style>`
 * (React-owned), the body marker class (refcounted), the live-handler slot, and
 * the vendor DOM (parked for the next mount).
 */
export function TripleseatForm({
  leadFormId,
  publicKey,
  successRedirectPath,
  successTitle,
  successMessage,
  degradedTitle,
  degradedMessage,
  contactPhone,
  contactEmail,
  retryLabel,
  recaptchaTimeoutSeconds = DEFAULT_RECAPTCHA_TIMEOUT_SECONDS,
  formMinHeight = DEFAULT_FORM_MIN_HEIGHT,
  sectionId = "tripleseat-form",
  title,
  subtitle,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  style,
}: TripleseatFormProps): React.JSX.Element | null {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [degradedReason, setDegradedReason] = useState<DegradedReason | null>(
    null,
  );
  /** TripleSeat's own confirmation text — third-party content, rendered as text. */
  const [providerMessage, setProviderMessage] = useState("");
  /** A re-attempt is in flight: the degraded panel stays, the button rests. */
  const [retryPending, setRetryPending] = useState(false);
  const [scopedCss, setScopedCss] = useState<string | null>(null);

  const mountedRef = useRef(true);
  const successHandledRef = useRef(false);
  const recaptchaReadyRef = useRef(false);
  const degradedRef = useRef(false);
  const deadlineRef = useRef(0);
  const captchaElementRef = useRef<Element | null>(null);
  const redirectTimerRef = useRef<number | null>(null);
  /** Macrotask-deferred `releaseWriteInterception` — cancelled by StrictMode. */
  const releaseTimerRef = useRef<number | null>(null);
  const retryAttemptRef = useRef(0);
  /** Mirrors `retryPending` for the watchdog closure, which never re-subscribes. */
  const retryPendingRef = useRef(false);
  /** Whether the embed promise has settled either way — see the deadline check. */
  const embedSettledRef = useRef(false);
  const bindingRepairsRef = useRef(0);
  const themeResolvedRef = useRef(false);
  const themeTicksRef = useRef(0);

  const { navigateTo } = useNavigation();

  const hasCredentials = Boolean(leadFormId && publicKey);
  const timeoutMs = Math.max(0, recaptchaTimeoutSeconds) * 1000;
  const timeoutMsRef = useRef(timeoutMs);
  timeoutMsRef.current = timeoutMs;

  const scriptUrl = useMemo(
    () =>
      `${TRIPLESEAT_SCRIPT_BASE}?lead_form_id=${encodeURIComponent(
        leadFormId ?? "",
      )}&public_key=${encodeURIComponent(publicKey ?? "")}`,
    [leadFormId, publicKey],
  );
  const dedupeKey = useMemo(
    () => `os-tripleseat:${leadFormId ?? ""}:${publicKey ?? ""}`,
    [leadFormId, publicKey],
  );

  /* ---------------------------------------------------------------------- */
  /* Success                                                                 */
  /* ---------------------------------------------------------------------- */

  const handleSuccess = useCallback(
    (message: string) => {
      // Belt for the page-global dispatch below: a handler that somehow reaches
      // an unmounted instance must not set state and — the part that actually
      // bites — must not arm a redirect timer whose cleanup has already run.
      if (!mountedRef.current) return;
      if (successHandledRef.current) return;
      successHandledRef.current = true;
      console.info(`${LOG_PREFIX} lead submitted`);
      setProviderMessage(typeof message === "string" ? message : "");
      setPhase("success");

      const target = successRedirectPath?.trim();
      if (!target) return;
      if (!isInternalSitePath(target)) {
        // Refuse and stay put: the visitor keeps the in-place confirmation.
        // There is deliberately no external-navigation branch here.
        console.warn(
          `${LOG_PREFIX} ignoring non-internal successRedirectPath (internal "/path" only)`,
        );
        return;
      }

      redirectTimerRef.current = window.setTimeout(() => {
        // Internal paths stay in-app: no full reload, analytics keeps its session.
        console.info(`${LOG_PREFIX} navigating to ${target}`);
        navigateTo(target);
      }, SUCCESS_REDIRECT_DELAY_MS);
    },
    [navigateTo, successRedirectPath],
  );

  const handleSuccessRef = useRef(handleSuccess);
  useEffect(() => {
    handleSuccessRef.current = handleSuccess;
  }, [handleSuccess]);

  /**
   * Publish THIS instance as the page's live success target. The vendor callback
   * is installed once per page and never removed, so it dispatches through the
   * realm-global box instead of closing over one instance's ref: after a remount
   * the box points at the instance that is actually on screen, and while nothing
   * is mounted the dispatch is a no-op (no confirmation on a dead tree, no
   * orphaned redirect timer).
   */
  useEffect(() => {
    const state = realmState();
    const dispatch = (message: string): void => {
      handleSuccessRef.current(message);
    };
    state.activeSuccessHandler.current = dispatch;
    return () => {
      // Only stand down if a later mount has not already taken over.
      if (state.activeSuccessHandler.current === dispatch) {
        state.activeSuccessHandler.current = null;
      }
    };
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Mount bookkeeping: styles + body marker                                 */
  /* ---------------------------------------------------------------------- */

  /**
   * The document the block was rendered INTO — not necessarily the one this
   * module runs in: the dt-cms builder preview portals blocks into an iframe.
   */
  const ownDocument = useCallback((): Document | null => {
    const fromContainer = containerRef.current?.ownerDocument;
    if (fromContainer) return fromContainer;
    return typeof document !== "undefined" ? document : null;
  }, []);

  /**
   * Derive the scoped stylesheet from whatever tokens are resolvable right now.
   * Safe to call repeatedly: identical CSS bails out of the state update.
   */
  const deriveTheme = useCallback((): void => {
    const doc = ownDocument();
    if (!doc) return;
    const root = doc.documentElement;
    const css = buildTripleseatCss(readTripleseatTheme(root));
    themeResolvedRef.current = hasResolvedThemeTokens(root);
    setScopedCss((current) => (current === css ? current : css));
  }, [ownDocument]);

  useEffect(() => {
    mountedRef.current = true;
    const doc = ownDocument();
    // No network, no style-guide fetch — the variables are (or will be) on the
    // page. On customer-sites the per-site bundle is async, so this first read
    // can come up empty; the emitted CSS is var()-referenced either way and the
    // listeners below (plus the watchdog) re-derive when the tokens appear.
    deriveTheme();
    acquireBodyMarker(doc);

    const onThemeReady = (): void => {
      if (!mountedRef.current) return;
      deriveTheme();
    };
    const link = doc?.getElementById(SITE_STYLESHEET_LINK_ID) ?? null;
    link?.addEventListener("load", onThemeReady);
    for (const eventName of THEME_READY_EVENTS) {
      doc?.addEventListener(eventName, onThemeReady);
    }

    return () => {
      mountedRef.current = false;
      link?.removeEventListener("load", onThemeReady);
      for (const eventName of THEME_READY_EVENTS) {
        doc?.removeEventListener(eventName, onThemeReady);
      }
      releaseBodyMarker(doc);
      if (redirectTimerRef.current !== null) {
        window.clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    };
  }, [deriveTheme, ownDocument]);

  /* ---------------------------------------------------------------------- */
  /* Embed script                                                            */
  /* ---------------------------------------------------------------------- */

  /**
   * `fresh` forces a new loader key. Required whenever the previous attempt is
   * still pending: the loader hands back the cached promise for a known key
   * without appending a script or arming a write interception, so a retry (or a
   * remount that inherited an abandoned in-flight load) would otherwise be a
   * certified no-op.
   */
  const startEmbedLoad = useCallback(
    (fresh = false) => {
      const container = containerRef.current;
      if (!container) return;
      deadlineRef.current = Date.now() + timeoutMsRef.current;
      const attemptKey = embedAttemptKey(dedupeKey, fresh);

      loadScript(scriptUrl, {
        key: attemptKey,
        // The vendor writes its markup beside this script node, so the node has
        // to be in the container — not in <head>.
        target: "container",
        container,
        interceptDocumentWrite: true,
        writeTarget: container,
      })
        .then(() => {
          // A superseded attempt must not report anything: its container may be
          // detached and its outcome is no longer the one on screen.
          if (!markEmbedAttemptSettled(dedupeKey, attemptKey)) return;
          embedSettledRef.current = true;
          if (!mountedRef.current) return;
          console.info(`${LOG_PREFIX} embed script loaded`);
          setPhase((current) => (current === "loading" ? "ready" : current));
        })
        .catch((error: unknown) => {
          if (!markEmbedAttemptSettled(dedupeKey, attemptKey)) return;
          embedSettledRef.current = true;
          if (!mountedRef.current) return;
          console.error(`${LOG_PREFIX} embed script failed to load`, error);
          degradedRef.current = true;
          setDegradedReason("script");
          setPhase("degraded");
        });
    },
    [dedupeKey, scriptUrl],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !hasCredentials) return;

    // A pending release belongs to the cleanup StrictMode just ran on THIS
    // instance — cancel it, the block is still here and still owns the patch.
    if (releaseTimerRef.current !== null) {
      window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
    }

    if (adoptParkedForm(dedupeKey, container)) {
      console.info(`${LOG_PREFIX} re-attached existing form DOM after remount`);
    }
    // Only a genuine unmount marks the attempt abandoned, so StrictMode's
    // cleanup+re-setup still reuses the original key (one script, one init).
    startEmbedLoad(embedAttemptWasAbandoned(dedupeKey));

    return () => {
      if (successHandledRef.current) {
        // A submitted form must NOT be resurrected. The vendor replaced its own
        // markup with a hidden `#tsLeadSuccessMessage` marker, so parking it
        // would hand the next mount a marker with a fresh `successHandledRef`:
        // the watchdog would re-enter success within a tick and re-fire the
        // redirect, bouncing the visitor every time they return to the page.
        realmState().parkedForms.delete(dedupeKey);
      } else {
        // Detach rather than let React drop the vendor's DOM on the floor.
        parkForm(dedupeKey, container);
      }

      // DESIGN-CONTRACT §5: unmount owes an identity-guarded document.write
      // restore. A hung embed fires neither load nor error, so without this the
      // patch stays installed — bound to a container React has already detached
      // — until the loader's 30s failsafe, swallowing any other legacy embed's
      // markup in the meantime. Deferred by a macrotask because StrictMode runs
      // cleanup then immediately re-runs the effect on the SAME instance; that
      // re-run cancels this, a real unmount lets it fire.
      releaseTimerRef.current = window.setTimeout(() => {
        releaseTimerRef.current = null;
        releaseWriteInterception(container);
        markEmbedAttemptAbandoned(dedupeKey);
      }, 0);
    };
  }, [dedupeKey, hasCredentials, startEmbedLoad]);

  /* ---------------------------------------------------------------------- */
  /* Watchdog                                                                */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!hasCredentials) return;
    // The realm the block actually rendered into (the preview iframe in dt-cms),
    // where `ts_script.js` defines TS/grecaptcha once it is adopted there.
    const doc = ownDocument();
    const w = (doc?.defaultView ?? window) as TripleseatWindow;

    const findCaptcha = (): Element | null =>
      containerRef.current?.querySelector(".g-recaptcha") ?? null;

    /**
     * TripleSeat calls this instead of its own DOM swap on success. Installed at
     * most once (typeof guard) and never removed — the vendor holds the
     * reference for the life of the page, which is exactly why the closure must
     * dispatch through the realm-global live-handler box rather than through
     * the installing instance's ref.
     */
    const installSuccessCallback = (): void => {
      const ts = w.TS;
      if (!ts || typeof ts !== "object") return;
      if (typeof ts.custom_success_callback === "function") return;
      ts.custom_success_callback = (message: string) => {
        try {
          const jq = ts.jQuery;
          const selector = ts.lead_form_embed?.form_selector;
          if (jq) {
            jq("#errorExplanation").remove();
            if (selector) {
              // Marker only — the visible confirmation is this block's own UI,
              // so no copy is hardcoded into third-party markup.
              jq(selector).replaceWith(
                '<div id="tsLeadSuccessMessage" hidden></div>',
              );
            }
          }
        } catch {
          // Non-fatal: the confirmation UI renders regardless.
        }
        // Whoever is mounted RIGHT NOW owns the confirmation and the redirect.
        realmState().activeSuccessHandler.current?.(message);
      };
      console.info(`${LOG_PREFIX} success callback installed`);
    };

    /**
     * A React re-render (or our own park/adopt) can recreate the form DOM after
     * the vendor's one-time init, silently detaching the datepicker, the time
     * selects and the submit handler. Probe: the date input exists but jQuery-UI
     * no longer marks it `.hasDatepicker`.
     */
    const repairFormBindings = (): void => {
      // Container-scoped for the same reason the success probe is: the vendor's
      // `#dp_lead_event_date` is a GLOBAL id, so a document-wide lookup lets an
      // empty block discover its neighbour's input, burn its own repair budget
      // on it, and re-bind a form it does not own.
      const dateInput =
        containerRef.current?.querySelector("#dp_lead_event_date") ?? null;
      const ts = w.TS;
      if (!dateInput || !ts?.jQuery || typeof ts.lead_form_embed?.init !== "function") {
        return;
      }
      if (ts.jQuery(dateInput).is(".hasDatepicker")) return;
      // `.hasDatepicker` belongs to jQuery-UI, not to this block: if jQuery-UI
      // never attaches the probe stays false forever, so the repair is bounded
      // instead of re-binding the vendor's handlers once a second for the life
      // of the page. Past the cap the deadline evaluator surfaces the fallback.
      if (bindingRepairsRef.current >= MAX_BINDING_REPAIRS) return;
      bindingRepairsRef.current += 1;
      ts.lead_form_embed.init();
      console.info(
        `${LOG_PREFIX} form bindings re-initialized (${bindingRepairsRef.current}/${MAX_BINDING_REPAIRS})`,
      );
      if (bindingRepairsRef.current === MAX_BINDING_REPAIRS) {
        console.warn(
          `${LOG_PREFIX} form bindings never latched — no further re-initialization`,
        );
      }
    };

    /** Google only auto-renders the widget on initial script load. */
    const repairCaptcha = (): void => {
      const grecaptcha = w.grecaptcha;
      if (!grecaptcha || typeof grecaptcha.render !== "function") return;
      const captcha = findCaptcha();
      if (!captcha) return;
      if (captcha === captchaElementRef.current && captcha.childElementCount > 0) {
        return;
      }
      if (captcha.childElementCount > 0) {
        // Adopt Google's own auto-render.
        captchaElementRef.current = captcha;
        return;
      }
      try {
        // Realm-global, because the reset patch that consumes it is page-global
        // and may have been installed by a different inlined copy of this file.
        const widgetBox = realmState().activeCaptchaWidgetId;
        widgetBox.current = grecaptcha.render(captcha, {
          sitekey: captcha.getAttribute("data-sitekey"),
        });
        captchaElementRef.current = captcha;
        console.info(
          `${LOG_PREFIX} reCAPTCHA re-rendered (widget ${widgetBox.current})`,
        );
      } catch {
        // Transient render state; retried on the next tick.
      }
    };

    /**
     * TripleSeat calls `grecaptcha.reset()` with no arguments on validation
     * errors, which targets the widget id it captured at init — dead once we
     * re-rendered. Redirect argument-less resets to the live widget.
     *
     * The sentinel lives on the shared `grecaptcha` object, so the patch outlives
     * the instance that installed it; it therefore reads the REALM-GLOBAL widget
     * box, which every instance writes on a successful render. Realm-global and
     * not module-level: the sentinel is shared across dist bundles, so the box
     * has to be too.
     */
    const patchGrecaptchaReset = (): void => {
      const grecaptcha = w.grecaptcha;
      if (!grecaptcha || typeof grecaptcha.reset !== "function") return;
      if (grecaptcha.__opensiteTripleseatPatched) return;
      const original = grecaptcha.reset.bind(grecaptcha);
      grecaptcha.reset = (widgetId?: number) =>
        original(
          widgetId !== undefined
            ? widgetId
            : (realmState().activeCaptchaWidgetId.current ?? undefined),
        );
      grecaptcha.__opensiteTripleseatPatched = true;
      console.info(`${LOG_PREFIX} grecaptcha.reset patched`);
    };

    /**
     * Backup: succeed even if the callback was never installed in time. Scoped to
     * THIS block's container — the vendor's marker id is global, so a document-
     * wide lookup would let one block inherit another's success (or re-enter
     * success from a marker re-adopted after a remount).
     */
    const detectBackupSuccess = (): void => {
      if (successHandledRef.current) return;
      if (!containerRef.current?.querySelector("#tsLeadSuccessMessage")) return;
      handleSuccessRef.current("");
    };

    /**
     * LAUNCH-CRITICAL. The prototype waited for reCAPTCHA forever and showed
     * nothing when it never arrived. A dead form is a lost lead, so the wait is
     * bounded and expiry is visible.
     */
    const evaluateRecaptchaDeadline = (): void => {
      if (successHandledRef.current || recaptchaReadyRef.current) return;
      const container = containerRef.current;
      const formPresent = Boolean(
        container?.querySelector(
          "#tripleseat_embed_form, #tripleseat_embed_form_inline, form",
        ),
      );
      const captcha = findCaptcha();
      const captchaRendered = Boolean(captcha && captcha.childElementCount > 0);
      // Not every TripleSeat form carries a captcha; an initialized form with no
      // `.g-recaptcha` node is healthy, not stalled.
      const captchaNotRequired = formPresent && !captcha && Boolean(w.TS);

      if (captchaRendered || captchaNotRequired) {
        recaptchaReadyRef.current = true;
        if (degradedRef.current) {
          degradedRef.current = false;
          retryPendingRef.current = false;
          setRetryPending(false);
          setDegradedReason(null);
          setPhase("ready");
          console.info(`${LOG_PREFIX} recovered — form is interactive`);
        }
        return;
      }

      if (degradedRef.current) {
        // A re-attempt that ran out its own window: the panel (and the contact
        // details on it) never left the screen, so all that is owed is the
        // affordance coming back.
        if (retryPendingRef.current && Date.now() >= deadlineRef.current) {
          retryPendingRef.current = false;
          setRetryPending(false);
          console.warn(
            `${LOG_PREFIX} re-attempt did not make the form interactive`,
          );
        }
        return;
      }
      if (Date.now() < deadlineRef.current) return;

      degradedRef.current = true;
      // An embed script that neither loaded nor errored (hung request, blocked
      // by an extension) is a SCRIPT failure, not a captcha one — re-requesting
      // Google's api.js could never produce the missing form. Evidence that the
      // embed DID run: its promise settled, it wrote markup, or it defined `TS`.
      const embedRan =
        embedSettledRef.current || formPresent || Boolean(w.TS);
      setDegradedReason(embedRan ? "recaptcha" : "script");
      setPhase("degraded");
      console.warn(
        `${LOG_PREFIX} form did not become interactive within ${
          timeoutMsRef.current / 1000
        }s — showing fallback contact options`,
      );
    };

    /** Re-derive branding until the site's own stylesheet has actually landed. */
    const refreshThemeIfPending = (): void => {
      if (themeResolvedRef.current) return;
      if (themeTicksRef.current >= MAX_THEME_REDERIVE_TICKS) return;
      themeTicksRef.current += 1;
      deriveTheme();
    };

    /**
     * Each check is isolated: a repair that throws (a vendor init that hits a
     * missing jQuery-UI plugin, say) must not starve the LAUNCH-CRITICAL
     * deadline evaluation that renders the fallback contact details.
     */
    const safely = (check: () => void): void => {
      try {
        check();
      } catch {
        // Transient render states; retried on the next tick.
      }
    };

    const watchdog = window.setInterval(() => {
      safely(refreshThemeIfPending);
      safely(installSuccessCallback);
      safely(repairFormBindings);
      safely(repairCaptcha);
      safely(patchGrecaptchaReset);
      safely(detectBackupSuccess);
      safely(evaluateRecaptchaDeadline);
    }, WATCHDOG_INTERVAL_MS);

    return () => window.clearInterval(watchdog);
  }, [deriveTheme, hasCredentials, ownDocument]);

  /* ---------------------------------------------------------------------- */
  /* Retry                                                                   */
  /* ---------------------------------------------------------------------- */

  const handleRetry = useCallback(() => {
    if (retryPendingRef.current) return;
    const attempt = retryAttemptRef.current + 1;
    retryAttemptRef.current = attempt;
    captchaElementRef.current = null;
    // An explicit retry re-opens the bounded binding repairs.
    bindingRepairsRef.current = 0;
    // The degraded panel STAYS mounted for the whole attempt. Dropping back to
    // "loading" would hide the business's phone and email — the only working
    // path to a lead on a site where the embed is blocked — behind another full
    // `recaptchaTimeoutSeconds` of blank space. Recovery is announced by the
    // watchdog (`recovered — form is interactive`) instead.
    retryPendingRef.current = true;
    setRetryPending(true);
    deadlineRef.current = Date.now() + timeoutMsRef.current;

    if (degradedReason === "script") {
      // A FRESH loader key, always. The error path deleted its dedupe entry,
      // but the stalled path (hung request: neither load nor error, which is
      // what produces this reason most of the time) still holds a pending
      // promise the loader would hand straight back — no element, no request,
      // no write interception. A new key re-issues the request for real.
      console.info(`${LOG_PREFIX} retrying embed script (attempt ${attempt})`);
      startEmbedLoad(true);
      return;
    }

    console.info(`${LOG_PREFIX} retrying reCAPTCHA (attempt ${attempt})`);
    // A distinct key per attempt: the loader keeps successful entries forever,
    // and a previously "successful" load is exactly what left us stranded.
    loadScript(RECAPTCHA_SCRIPT_URL, {
      key: `${RECAPTCHA_SCRIPT_URL}#os-tripleseat-retry-${attempt}`,
    })
      .then(() => {
        if (!mountedRef.current) return;
        // Loaded ≠ interactive: the watchdog clears the degraded state once the
        // widget actually renders, and the deadline re-enables the button.
        console.info(`${LOG_PREFIX} reCAPTCHA script re-requested`);
      })
      .catch((error: unknown) => {
        if (!mountedRef.current) return;
        console.error(`${LOG_PREFIX} reCAPTCHA retry failed`, error);
        retryPendingRef.current = false;
        setRetryPending(false);
        setDegradedReason("recaptcha");
      });
  }, [degradedReason, startEmbedLoad]);

  /* ---------------------------------------------------------------------- */
  /* Render                                                                  */
  /* ---------------------------------------------------------------------- */

  // No credentials means no form. Rendering a shell would be fabricated UI.
  if (!hasCredentials) return null;

  return (
    <Section
      id={sectionId}
      title={title}
      subtitle={subtitle}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
      style={style}
    >
      {scopedCss ? (
        <style data-opensite-tripleseat="">{scopedCss}</style>
      ) : null}

      {phase === "success" ? (
        <div
          className="mx-auto max-w-2xl text-center"
          role="status"
          aria-live="polite"
          data-testid="tripleseat-success"
        >
          {successTitle ? (
            <h3 className="text-2xl font-semibold">{successTitle}</h3>
          ) : null}
          {successMessage ? (
            <p className="mt-4 text-base">{successMessage}</p>
          ) : null}
          {providerMessage ? (
            <p className="mt-4 text-base">{providerMessage}</p>
          ) : null}
        </div>
      ) : null}

      {phase === "degraded" ? (
        <div
          className="mx-auto max-w-2xl rounded-lg border p-6 text-center"
          role="alert"
          data-testid="tripleseat-degraded"
        >
          {degradedTitle ? (
            <h3 className="text-xl font-semibold">{degradedTitle}</h3>
          ) : null}
          {degradedMessage ? (
            <p className="mt-3 text-base">{degradedMessage}</p>
          ) : null}
          {contactPhone || contactEmail ? (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              {contactPhone ? (
                <Pressable href={contactPhone} className="font-medium underline">
                  {contactPhone}
                </Pressable>
              ) : null}
              {contactEmail ? (
                <Pressable href={contactEmail} className="font-medium underline">
                  {contactEmail}
                </Pressable>
              ) : null}
            </div>
          ) : null}
          {retryLabel ? (
            <button
              type="button"
              onClick={handleRetry}
              // Rests while its own attempt is still inside the bounded window:
              // a second click cannot help, and the panel stays put either way.
              disabled={retryPending}
              aria-busy={retryPending || undefined}
              className="mt-6 rounded-md border px-6 py-3 text-sm font-medium disabled:opacity-60"
              data-testid="tripleseat-retry"
            >
              {retryLabel}
            </button>
          ) : null}
        </div>
      ) : null}

      {/*
        This node is never re-created while mounted: React owns the element,
        the vendor owns its children. Hidden (not unmounted) on success so the
        embed's DOM stays intact for the redirect window.

        Degraded keeps the node in place (the watchdog can still recover it, and
        yanking a form out from under a visitor who is mid-typing would be
        worse), but drops the reserved height — a script failure leaves the
        container EMPTY, and 400px of blank space under the fallback alert is
        pure dead layout — and marks it `inert`, so the dead form underneath the
        alert cannot be filled in and submitted.
      */}
      <div
        ref={containerRef}
        className={cn(TRIPLESEAT_SCOPE_CLASS, "w-full")}
        style={{
          minHeight:
            phase === "loading" || phase === "ready" ? formMinHeight : undefined,
          ...(phase === "success" ? { display: "none" } : null),
        }}
        {...(phase === "degraded"
          ? ({ inert: "" } as unknown as React.HTMLAttributes<HTMLDivElement>)
          : null)}
        data-testid="tripleseat-container"
      />
    </Section>
  );
}
