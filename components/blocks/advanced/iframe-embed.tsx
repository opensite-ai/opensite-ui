"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Root margin used by the lazy IntersectionObserver. Matches the platform
 * convention used by @page-speed/img so an embed starts loading roughly one
 * scroll-beat before it enters the viewport.
 */
const LAZY_ROOT_MARGIN = "200px";

/** CSS `aspect-ratio` values for each named ratio. */
const ASPECT_RATIO_VALUES = {
  "16:9": "16 / 9",
  "4:3": "4 / 3",
  "1:1": "1 / 1",
  "9:16": "9 / 16",
  "21:9": "21 / 9",
} as const;

/** Fallback height for `containMode="fixed-height"` when no height is supplied. */
const DEFAULT_FIXED_HEIGHT = "600px";

/** A bare number (`"640"`) is not a CSS length — CSSOM drops it. */
const UNITLESS_LENGTH_RE = /^\d+(?:\.\d+)?$/;

/** Characters a hostile URL can hide a scheme behind (`java\nscript:`). */
const URL_CONTROL_CHARS_RE = /[\u0000-\u0020\u007F-\u009F]/g;

/** Only navigable web schemes may reach `<iframe src>`. */
const SAFE_EMBED_URL_RE = /^https?:\/\/[^/]/i;

/**
 * Sizing applied to a direct-child `<iframe>` of the raw-HTML escape hatch.
 * Pasted snippets ship their own `width`/`height` attributes (or none at all,
 * which means the 300x150 intrinsic size), so without this the markup renders
 * clipped or postage-stamped inside the containment box. Arbitrary-variant
 * classes survive as string literals in `dist`, so the safelist extractor
 * picks them up.
 */
const RAW_EMBED_CHILD_SIZING =
  "[&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0";

/**
 * Owner-supplied URLs are trusted for CONTENT but still scheme-checked: an
 * `<iframe src="javascript:…">` executes in the parent document's origin, so a
 * copy-pasted hostile URL would be a same-origin execution primitive. Mirrors
 * `sanitizeFreeFormUrl`/`isAbsoluteHttpsUrl` in `lib/free-form-tree.ts`.
 *
 * @param value raw `embedUrl` prop value
 * @returns the trimmed URL when it is an absolute http(s) URL, else undefined
 */
function resolveEmbedUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const probe = trimmed.replace(URL_CONTROL_CHARS_RE, "");
  return SAFE_EMBED_URL_RE.test(probe) ? trimmed : undefined;
}

/**
 * Resolves the CSS `aspect-ratio` value, falling back to 16:9. Block data is
 * not enum-validated upstream, and an unresolved ratio collapses the frame to
 * zero height (its only children are absolutely positioned).
 *
 * @param ratio named ratio key, `"custom"`, or any out-of-enum string
 * @param custom CSS aspect-ratio value used when `ratio === "custom"`
 */
function resolveAspectRatio(ratio: unknown, custom: unknown): string {
  if (ratio === "custom") {
    const trimmed = typeof custom === "string" ? custom.trim() : "";
    return trimmed || ASPECT_RATIO_VALUES["16:9"];
  }
  const key = typeof ratio === "string" ? ratio : "";
  return (
    (ASPECT_RATIO_VALUES as Record<string, string>)[key] ??
    ASPECT_RATIO_VALUES["16:9"]
  );
}

/**
 * Normalizes `fixedHeight` into a usable CSS length. A unitless string ("640")
 * is rejected by CSSOM and collapses the frame, so it gains a `px` unit; a
 * JSON number gets the same treatment explicitly rather than relying on
 * React's implicit `px` append.
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

/**
 * Full-bleed container idiom (canonical: hero-fullscreen-background-image).
 * The Section has no `fullWidth` prop — full-screen is expressed as
 * `spacing="none"` plus a container that drops its padding and max width.
 */
const FULL_SCREEN_CONTAINER_CLASS_NAME =
  "px-0 sm:px-0 lg:px-0 max-w-full relative z-10";

export interface IframeEmbedProps {
  /**
   * URL of the page to embed in an iframe. Copy the `src` value out of the
   * embed code the site owner supplied, EXACTLY as given. Must be an absolute
   * https URL. Never invent, shorten, or "correct" this URL.
   *
   * Only `http:` and `https:` URLs are rendered — anything else (`javascript:`,
   * `data:`, protocol-relative, relative) is treated as if no URL were supplied,
   * because an iframe `src` executes in this document's origin.
   */
  embedUrl?: string;
  /**
   * Raw embed markup escape hatch, used only when the third party's snippet
   * cannot be expressed as a single iframe URL. Paste the owner's markup
   * verbatim.
   *
   * SECURITY: this markup is inserted verbatim and CAN execute. Bare `<script>`
   * tags do not run (innerHTML semantics), which is why script-based widgets
   * still belong in `advanced/script-embed` — but inline event handlers
   * (`onerror`, `onload`) and `<iframe srcdoc>` DO run, same-origin. Treat this
   * prop as owner-trusted code, the same trust class as
   * `script-embed`'s `inlineScriptHtml`; never populate it from scraped,
   * model-authored, or otherwise non-owner content.
   *
   * When `embedUrl` is also present, `embedUrl` wins and this value is ignored.
   */
  embedHtml?: string;
  /**
   * Accessible name for the iframe (rendered as the `title` attribute).
   * Required whenever `embedUrl` is set — screen readers announce it as the
   * frame's label. Describe the embedded content, e.g. "Online reservation form".
   */
  embedTitle?: string;
  /**
   * Value for the iframe `allow` attribute (feature policy), copied from the
   * owner's embed code, e.g. "accelerometer; encrypted-media; picture-in-picture".
   * Omit when the embed code did not include one.
   */
  allowAttributes?: string;
  /**
   * Value for the iframe `sandbox` attribute, e.g.
   * "allow-scripts allow-same-origin allow-forms". When omitted the attribute is
   * not rendered at all (an empty sandbox attribute blocks nearly everything).
   */
  sandboxAttributes?: string;
  /** Value for the iframe `referrerpolicy` attribute. */
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  /**
   * "lazy" (default) defers mounting the embed until it is within 200px of the
   * viewport and also sets the native `loading="lazy"` attribute. Use "eager"
   * only for an embed that is above the fold on first paint.
   */
  loadingStrategy?: "lazy" | "eager";
  /**
   * How the embed is sized. "aspect-ratio" (default) keeps a responsive ratio,
   * "fixed-height" pins a pixel height (use for forms and calendars that scroll
   * internally), "full-screen" fills the viewport edge to edge.
   */
  containMode?: "aspect-ratio" | "fixed-height" | "full-screen";
  /**
   * Ratio used when `containMode="aspect-ratio"`. Use "custom" together with
   * `customAspectRatio` for anything not in this list. A value outside this
   * list falls back to "16:9" rather than collapsing the frame.
   */
  aspectRatio?: "16:9" | "4:3" | "1:1" | "9:16" | "21:9" | "custom";
  /**
   * CSS aspect-ratio value used when `aspectRatio="custom"`, e.g. "5 / 4".
   * Blank or missing falls back to 16:9.
   */
  customAspectRatio?: string;
  /**
   * CSS height used when `containMode="fixed-height"`, e.g. "640px".
   * Defaults to "600px". A unitless value ("640") is read as pixels.
   */
  fixedHeight?: string;
  /**
   * Additional CSS classes applied to the iframe element (parsed `embedUrl`
   * path) or to the wrapper around the pasted markup (`embedHtml` path).
   *
   * Keep these to utilities the library already uses: live-site CSS is
   * safelist-compiled from `className`-keyed block props plus the class strings
   * shipped in `dist`, so a one-off utility written only into this prop can be
   * missing from the customer stylesheet. Mirror anything exotic into
   * `className` (which IS collected) instead.
   */
  iframeClassName?: string;
  /**
   * Short line shown in place of the embed when no `embedUrl`/`embedHtml` is
   * configured yet. With no embed and no label the block renders no content at
   * all — it never fabricates a placeholder frame.
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
   * `containMode="full-screen"` so the embed reaches the viewport edges.
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
 * Renders an owner-supplied third-party embed (booking widget, map, calendar,
 * storefront, video host) inside the standard Section chrome.
 *
 * @example
 * ```tsx
 * <IframeEmbed
 *   embedUrl="https://www.google.com/maps/embed?pb=!1m18"
 *   embedTitle="Map to our dining room"
 *   aspectRatio="16:9"
 * />
 * ```
 */
export function IframeEmbed({
  embedUrl,
  embedHtml,
  embedTitle,
  allowAttributes,
  sandboxAttributes,
  referrerPolicy,
  loadingStrategy = "lazy",
  containMode = "aspect-ratio",
  aspectRatio = "16:9",
  customAspectRatio,
  fixedHeight,
  iframeClassName,
  emptyStateLabel,
  sectionId = "iframe-embed",
  title,
  subtitle,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  style,
}: IframeEmbedProps): React.JSX.Element {
  const frameRef = React.useRef<HTMLDivElement | null>(null);
  const isEager = loadingStrategy === "eager";
  const [isVisible, setIsVisible] = React.useState(isEager);

  // Parsed props win: the iframe form is lazy-loadable, containment-controllable
  // and auditable. The raw markup escape hatch is only used when there is no URL.
  // An `embedUrl` that fails the scheme check is treated as absent, so the block
  // falls back to embedHtml / the empty state instead of rendering a hostile src.
  const safeEmbedUrl = resolveEmbedUrl(embedUrl);
  const usesParsedIframe = Boolean(safeEmbedUrl);
  const usesRawHtml = !usesParsedIframe && Boolean(embedHtml);
  const hasEmbed = usesParsedIframe || usesRawHtml;

  React.useEffect(() => {
    if (isEager) {
      setIsVisible(true);
      return;
    }

    // No IntersectionObserver (old browser, non-DOM test runner): degrade to
    // rendering immediately rather than never showing the embed. Checked before
    // the ref so the fallback does not depend on the frame being mounted yet.
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      setIsVisible(true);
      return;
    }

    // The observed node only exists once there is an embed to show, and hosts
    // that edit in place (dt-cms keys blocks by a stable `_id`) flip that on the
    // SAME instance — so `hasEmbed` MUST stay in the dep list or the observer is
    // never installed and the frame stays blank until a full remount.
    const node = frameRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: LAZY_ROOT_MARGIN },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isEager, hasEmbed]);

  const isFullScreen = containMode === "full-screen";
  const isFixedHeight = containMode === "fixed-height";

  const frameStyle = React.useMemo<React.CSSProperties | undefined>(() => {
    if (isFullScreen) return undefined;
    if (isFixedHeight) return { height: resolveFixedHeight(fixedHeight) };
    return { aspectRatio: resolveAspectRatio(aspectRatio, customAspectRatio) };
  }, [isFullScreen, isFixedHeight, fixedHeight, aspectRatio, customAspectRatio]);

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
      {hasEmbed ? (
        <div
          ref={frameRef}
          data-testid="iframe-embed-frame"
          className={cn(
            "relative w-full overflow-hidden",
            isFullScreen && "h-screen",
          )}
          style={frameStyle}
        >
          {isVisible && usesParsedIframe && (
            <iframe
              src={safeEmbedUrl}
              {...(embedTitle ? { title: embedTitle } : {})}
              {...(allowAttributes ? { allow: allowAttributes } : {})}
              {...(sandboxAttributes ? { sandbox: sandboxAttributes } : {})}
              {...(referrerPolicy ? { referrerPolicy } : {})}
              loading={loadingStrategy}
              className={cn(
                "absolute inset-0 h-full w-full border-0",
                iframeClassName,
              )}
            />
          )}
          {isVisible && usesRawHtml && (
            <div
              data-testid="iframe-embed-raw"
              className={cn(
                // `overflow-auto` keeps a snippet taller than the containment
                // box scrollable — the parent frame is `overflow-hidden`, which
                // would otherwise clip it silently with no affordance.
                "absolute inset-0 h-full w-full overflow-auto",
                RAW_EMBED_CHILD_SIZING,
                iframeClassName,
              )}
              // Owner-supplied markup, passed through verbatim. The prop name
              // ends in `Html` so customer-sites hydration leaves it untouched.
              // This is a same-origin execution sink (see the `embedHtml` prop
              // doc) — it is owner-trusted by design, not sanitized here.
              dangerouslySetInnerHTML={{ __html: embedHtml as string }}
            />
          )}
        </div>
      ) : (
        emptyStateLabel && (
          <p className="text-sm text-muted-foreground">{emptyStateLabel}</p>
        )
      )}
    </Section>
  );
}
