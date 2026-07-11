"use client";

import * as React from "react";
import { useMemo } from "react";
import {
  ImmersiveFeedProvider,
  ImmersiveViewer,
  ThumbnailCard,
  useImmersiveFeed,
  type ImmersiveAction,
  type MediaItem,
} from "@page-speed/media-immersive";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

// The dev-only skip warning reads the literal `process.env.NODE_ENV` so
// consumer bundlers (Next/webpack/esbuild define-replacement) inline it and
// dead-code-eliminate the branch in production builds. This library targets
// browsers (tsconfig lib: DOM, no @types/node), so declare the minimal
// ambient shape module-locally; the runtime `typeof` guard below keeps
// bundler-less environments (no `process` global) safe — they simply never
// warn.
declare const process: { env: { NODE_ENV?: string } } | undefined;

/**
 * A single Instagram post rendered as a grid tile.
 *
 * Mirrors the wire shape hydrated from the toastability Instagram feed
 * (`PublicFeeds::InstagramPostSerializer`). Media URLs MUST be the re-hosted
 * MediaRecord CDN URLs — never expiring Instagram CDN URLs.
 */
export interface InstagramPostItem {
  /**
   * Unique identifier for the post
   */
  id: string;
  /**
   * External Instagram permalink (opens instagram.com in a new tab)
   */
  href: string;
  /**
   * Image / poster source URL (required — items without it are skipped)
   */
  image: string;
  /**
   * Alt text for the image (falls back to "Instagram post")
   */
  imageAlt?: string;
  /**
   * Post caption (truncated for display).
   *
   * NOTE: For immersive rendering the caption must be a **string** — the
   * library's `MediaItem.title`/`caption` are string-typed, so a caption is
   * flowed through as text. A rich `ReactNode` caption (hand-authored markup,
   * only ever used by the legacy pre-immersive block) cannot be threaded into
   * the immersive card/viewer; when supplied it is dropped and the tile/viewer
   * title falls back to `imageAlt` (then `"Instagram post"`). Hydrated feeds
   * always send plain strings, so this only affects hand-authored usage.
   */
  caption?: React.ReactNode;
  /**
   * Whether this post is a video/reel
   */
  isVideo?: boolean;
  /**
   * Video source URL (only used when `isVideo` is true)
   */
  videoUrl?: string;
  /**
   * Formatted post date
   */
  date?: React.ReactNode;
  /**
   * Number of likes (badge is only rendered when present)
   */
  likeCount?: number;
  /**
   * Number of comments (badge is only rendered when present)
   */
  commentCount?: number;
  /**
   * Number of views (badge is only rendered when present)
   */
  viewCount?: number;
  /**
   * Additional CSS classes for the tile
   */
  className?: string;
}

export interface InstagramPostGridProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/intro content below the heading
   */
  subheading?: React.ReactNode;
  /**
   * Array of Instagram posts to display
   */
  items?: InstagramPostItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header container
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each tile
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for each media element
   */
  imageClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Instagram account username (leading `@` tolerated). Renders as a
   * prominent, semi-transparent, clickable `@username` badge in the fullscreen
   * viewer's caption card that opens the account's profile
   * (`https://www.instagram.com/<username>/`) in a new tab. When omitted the
   * badge degrades to a non-clickable "Instagram" chip — a handle is never
   * fabricated.
   */
  username?: string;
  /**
   * Show the like-count pill on grid tiles. Defaults to `false`: clients with
   * low like counts don't want them visible, so the pills stay hidden until
   * per-client dynamic visibility ships. The pill implementation is retained
   * intentionally — flip this prop to bring it back.
   */
  showLikeBadges?: boolean;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * Raw pixel width handed to `<ThumbnailCard size>`. Deliberately larger than
 * every client-portal preset (`sm` 88, `md` 152, `hero` 200, `ig` 264) so the
 * feed reads like a social grid, per the annotated design. The card's outer
 * width is then overridden to `100%` (see {@link IG_TILE_STYLE}) so each 9:16
 * tile fills its responsive grid cell — this raw width still drives the card's
 * corner radius.
 */
const IG_TILE_WIDTH = 320;

/** Fill the responsive grid cell; the card keeps its intrinsic 9:16 ratio. */
const IG_TILE_STYLE: React.CSSProperties = { width: "100%" };

/**
 * Radius the immersive `ThumbnailCard` resolves for widths > 160px — the
 * wrapper's shadow and the caption scrim's bottom corners must match it so
 * the tile reads as one rounded surface.
 */
const IG_TILE_RADIUS = 18;

/**
 * Tile wrapper: hosts the block-owned caption overlay and a subtle boundary
 * shadow so post edges stay visible on dark page backgrounds (refinement #4 —
 * deliberately faint; the grid gap is sized so neighboring shadows never
 * overlap).
 */
const TILE_WRAPPER_STYLE: React.CSSProperties = {
  position: "relative",
  borderRadius: IG_TILE_RADIUS,
  boxShadow:
    "0 1px 2px rgba(15, 23, 42, 0.08), 0 6px 16px rgba(15, 23, 42, 0.10)",
};

/**
 * Bottom gradient scrim behind the caption. Rounded to the tile's own radius
 * and non-interactive so clicks fall through to the card.
 */
const CAPTION_SCRIM_STYLE: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: "28px 14px 13px",
  background:
    "linear-gradient(180deg, rgba(8,12,24,0) 0%, rgba(8,12,24,0.55) 45%, rgba(8,12,24,0.78) 100%)",
  borderBottomLeftRadius: IG_TILE_RADIUS,
  borderBottomRightRadius: IG_TILE_RADIUS,
  pointerEvents: "none",
  // Hiding captions for now until we build in
  // the dynamic behavior that clients can dictate
  display: "none"
};

/**
 * Caption text: readable at grid size, clamped to two lines inside a FIXED
 * two-line box so single-line captions start at the same vertical position as
 * two-line ones (refinement #2).
 */
const CAPTION_TEXT_STYLE: React.CSSProperties = {
  color: "#fff",
  fontSize: 13,
  lineHeight: 1.4,
  fontWeight: 600,
  letterSpacing: "0.005em",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.35)",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  height: "2.8em",
};

/**
 * Consumer metadata attached to every mapped {@link MediaItem}. The immersive
 * library never reads `meta` itself — the block's own viewer actions do.
 */
type InstagramMeta = Record<string, unknown> & {
  href: string;
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  date?: React.ReactNode;
};

/** Max characters kept for the thumbnail/viewer title derived from the caption. */
const TITLE_MAX = 90;

/**
 * Truncate a caption to a tidy title. Trims to the last word boundary within
 * the budget when possible, then appends an ellipsis. Returns the input
 * untouched when it already fits.
 */
function truncate(text: string, max = TITLE_MAX): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  const slice = trimmed.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const head = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;
  return `${head.trimEnd()}…`;
}

/**
 * Coerce a possibly-rich caption into a plain string. Non-string `ReactNode`s
 * (hand-authored markup) collapse to `""` rather than stringifying — this is
 * deliberate: it avoids a `[object Object]` title and lets {@link toMediaItem}
 * fall back to `imageAlt`. See the `caption` field doc for the full contract.
 */
function captionToString(caption: React.ReactNode): string {
  return typeof caption === "string" ? caption : "";
}

/**
 * Map a public `InstagramPostItem` onto the immersive library's `MediaItem`.
 *
 * A post is a **video** only when it is both flagged `isVideo` and carries a
 * `videoUrl` — a flagged post with no source can't produce a valid `<video>`,
 * so it degrades to an **image** (matching the pre-immersive block, which
 * likewise refused to mount a source-less video). For images, `poster` is the
 * image itself and every video-only field is ignored by the library.
 */
function toMediaItem(item: InstagramPostItem): MediaItem {
  const isVideo = Boolean(item.isVideo && item.videoUrl);
  // A non-string (ReactNode) caption collapses to "" here, so the title
  // deliberately falls back to `imageAlt` (then a generic label) and the
  // string-typed `caption` is omitted — a rich caption can't be threaded
  // through the immersive card/viewer. See the `caption` field contract.
  const fullCaption = captionToString(item.caption);
  const title = truncate(fullCaption) || item.imageAlt || "Instagram post";
  const meta: InstagramMeta = {
    href: item.href,
    likeCount: item.likeCount,
    commentCount: item.commentCount,
    viewCount: item.viewCount,
    date: item.date,
  };
  return {
    id: item.id,
    type: isVideo ? "video" : "image",
    poster: item.image,
    // Video source only when the post is a real video (image posts ignore it).
    src: isVideo ? item.videoUrl : undefined,
    title,
    caption: fullCaption || undefined,
    kind: "Instagram",
    meta,
  };
}

/** Open a post's instagram.com permalink in a new, isolated tab. */
function openPermalink(item: MediaItem): void {
  if (typeof window === "undefined") return;
  const href = (item.meta as InstagramMeta | undefined)?.href;
  if (!href) return;
  window.open(href, "_blank", "noopener,noreferrer");
}

/**
 * Top-left like-count pill that REPLACES the immersive card's built-in badge
 * chip (`badgeSlot`). Rendered only when a numeric `likeCount` is present — a
 * missing metric never fabricates a zero.
 */
function likeBadge(likeCount: number): React.ReactNode {
  return (
    <span
      aria-label={`${likeCount.toLocaleString()} likes`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        // Breathing room from the tile's top-left corner (refinement #1).
        margin: 6,
        padding: "6px 11px",
        borderRadius: 999,
        background: "rgba(8, 12, 24, 0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        color: "#fff",
        fontSize: 13,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: "0.01em",
      }}
    >
      <DynamicIcon name="mdi/cards-heart" size={15} aria-hidden="true" />
      <span aria-hidden="true">{likeCount.toLocaleString()}</span>
    </span>
  );
}

/**
 * Feed-level viewer actions. The library ships no defaults, so the block
 * supplies its own. Every post has a permalink, so "Open in Instagram" applies
 * feed-wide; per-item engagement counts are rendered by {@link InstagramViewerRail}
 * via `renderActions` (a feed-level action can't express "present counts only"
 * per item). A non-empty array here is also what gates `renderActions` on.
 */
const VIEWER_ACTIONS: ImmersiveAction[] = [
  {
    id: "open-in-instagram",
    icon: <DynamicIcon name="lucide/instagram" size={22} aria-hidden="true" />,
    label: "Instagram",
    ariaLabel: "Open in Instagram",
    onPress: (item) => openPermalink(item),
  },
];

/**
 * Right-side rail for the fullscreen viewer. Per the annotated expanded-UI
 * cleanup, the engagement stats (likes/comments/views) were removed entirely —
 * the rail is now a single "Open in Instagram" egress rendered as a white
 * Instagram glyph with no text label.
 */
function InstagramViewerRail({ item }: { item: MediaItem }): React.JSX.Element {
  const meta = (item.meta ?? {}) as InstagramMeta;
  return (
    <div
      style={{
        position: "absolute",
        right: 11,
        bottom: 135,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        color: "var(--psmi-chrome-fg, #fff)",
        zIndex: 3,
      }}
    >
      {/*
        The permalink egress is a REAL anchor, not a button. `ImmersiveAction`
        (the library's feed-level action shape) only exposes `onPress` — it
        cannot host an `href` — but this rail is supplied through the viewer's
        `renderActions` render prop, which lets the block emit arbitrary JSX.
        So the egress renders as an `<a target="_blank" rel="noopener
        noreferrer">`: a crawlable, keyboard/right-click-correct link instead
        of a scripted `window.open`. Rendered only when a permalink exists —
        never a dead link.
      */}
      {meta.href ? (
        <a
          href={meta.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in Instagram"
          // Isolate the click from the viewer's pager/close gestures; the
          // anchor still navigates via its href (no preventDefault).
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 0,
            border: "none",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
            font: "inherit",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "var(--psmi-chrome-bg, rgba(255,255,255,0.14))",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicIcon
              name="lucide/instagram"
              size={22}
              aria-hidden="true"
            />
          </span>
        </a>
      ) : null}
    </div>
  );
}

/** Instagram profile URL for a username (leading `@` tolerated). */
function profileUrl(username: string): string {
  return `https://www.instagram.com/${username.replace(/^@+/, "")}/`;
}

/** Shared look of the viewer caption's account badge (anchor or static chip). */
const USERNAME_BADGE_STYLE: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  marginBottom: 10,
  padding: "7px 12px",
  borderRadius: 999,
  background: "var(--psmi-chrome-bg, rgba(255,255,255,0.16))",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  color: "inherit",
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: "0.01em",
  textDecoration: "none",
  pointerEvents: "auto",
};

/** Viewer caption title — the truncated caption IS the title (no duplicate). */
const VIEWER_TITLE_STYLE: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 1.35,
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

/**
 * Block-owned caption card for the fullscreen viewer (via `renderCaption`).
 * Per the annotated expanded-UI cleanup it replaces the library card with:
 * a prominent semi-transparent `@username` badge that links to the account's
 * Instagram profile (new tab), and the post title. The old small "Instagram"
 * kind label and the duplicate caption line below the title are gone — the
 * title already IS the truncated caption. The viewer's own position counter
 * renders outside the caption card and is unaffected.
 */
function InstagramViewerCaption({
  item,
  username,
}: {
  item: MediaItem;
  username?: string;
}): React.JSX.Element {
  const handle = username?.replace(/^@+/, "");
  const badgeContent = (
    <>
      <DynamicIcon name="lucide/instagram" size={14} aria-hidden="true" />
      <span>{handle ? `@${handle}` : "Instagram"}</span>
    </>
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 16,
        // Mirrors the library caption card's clearance for the actions rail.
        right: 78,
        bottom: 34,
        color: "var(--psmi-chrome-fg, #fff)",
        zIndex: 2,
      }}
    >
      {handle ? (
        <a
          href={profileUrl(handle)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open @${handle} on Instagram`}
          onClick={(e) => e.stopPropagation()}
          style={{ ...USERNAME_BADGE_STYLE, cursor: "pointer" }}
        >
          {badgeContent}
        </a>
      ) : (
        // No username supplied: never fabricate a handle — degrade to a
        // non-interactive "Instagram" chip in the same position.
        <span style={USERNAME_BADGE_STYLE}>{badgeContent}</span>
      )}
      <div style={VIEWER_TITLE_STYLE}>{item.title}</div>
    </div>
  );
}

interface InstagramFeedGridProps {
  mediaItems: MediaItem[];
  gridClassName?: string;
  itemClassName?: string;
  /** Extra classes for each card's poster image (see {@link InstagramPostGridProps.imageClassName}). */
  imageClassName?: string;
  /** OptixFlow image optimization config forwarded to each card's poster. */
  optixFlowConfig?: OptixFlowConfig;
  /** Render the like-count pill on tiles (hidden by default — see {@link InstagramPostGridProps.showLikeBadges}). */
  showLikeBadges?: boolean;
}

/**
 * The responsive tile grid. Lives inside `<ImmersiveFeedProvider>` so it can
 * read the provider's `open` and hand it to each card. Cards are the annotated
 * IG spec: like-count `badgeSlot`, no duration, hover-only center glyph, and
 * vertical 9:16 tiles that fill their grid cell.
 */
function InstagramFeedGrid({
  mediaItems,
  gridClassName,
  itemClassName,
  imageClassName,
  optixFlowConfig,
  showLikeBadges = false,
}: InstagramFeedGridProps): React.JSX.Element {
  const { open } = useImmersiveFeed();
  // Consumer image concerns are forwarded onto each card's internal poster
  // <Img> via the library's `posterImgProps` passthrough — the block no
  // longer renders its own <Img>, so `imageClassName`/`optixFlowConfig` would
  // otherwise be dropped on the floor. Omitted entirely when neither is set.
  const posterImgProps = useMemo<Record<string, unknown> | undefined>(() => {
    const next: Record<string, unknown> = {};
    if (imageClassName) next.className = imageClassName;
    if (optixFlowConfig) next.optixFlowConfig = optixFlowConfig;
    return Object.keys(next).length > 0 ? next : undefined;
  }, [imageClassName, optixFlowConfig]);
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
        gridClassName,
      )}
    >
      {mediaItems.map((mediaItem) => {
        const likeCount = (mediaItem.meta as InstagramMeta | undefined)
          ?.likeCount;
        return (
          // The wrapper owns the tile's outer chrome (subtle boundary shadow,
          // matching radius) and the block's own caption overlay — the card's
          // built-in caption is hidden so 1- and 2-line captions can share a
          // fixed-height, top-aligned text box (annotated refinements #2–#4).
          <div key={mediaItem.id} className={itemClassName} style={TILE_WRAPPER_STYLE}>
            <ThumbnailCard
              item={mediaItem}
              onOpen={open}
              size={IG_TILE_WIDTH}
              style={IG_TILE_STYLE}
              elevated={false}
              hideCaption
              hideProgressHint
              showDuration={false}
              glyphMode="hover"
              posterImgProps={posterImgProps}
              // Hidden by default per the annotated review — the pill
              // implementation is kept for the upcoming per-client dynamic
              // visibility (see InstagramPostGridProps.showLikeBadges).
              badgeSlot={
                showLikeBadges && typeof likeCount === "number"
                  ? likeBadge(likeCount)
                  : undefined
              }
            />
            {mediaItem.title ? (
              // aria-hidden: the card already announces the post title; this
              // overlay is purely visual. pointer-events pass through to the card.
              <div aria-hidden="true" style={CAPTION_SCRIM_STYLE}>
                <div style={CAPTION_TEXT_STYLE}>{mediaItem.title}</div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/**
 * InstagramPostGrid displays a website's Instagram feed as a responsive grid of
 * vertical (9:16) tiles that open a fullscreen, swipeable immersive viewer.
 *
 * Composition is powered by `@page-speed/media-immersive`: each post maps to a
 * `MediaItem` (photos are first-class images, reels are videos), tiles are
 * `ThumbnailCard`s, and tapping one opens `ImmersiveViewer` — a TikTok/Reels-
 * style pager. Per the annotated design, each tile shows a like-count pill
 * top-left (only when a numeric like count exists — never fabricated), no
 * duration timestamp, and a center glyph on hover only (a play triangle for
 * reels, an expand icon for photos). The fullscreen viewer carries the caption
 * plus a read-only engagement rail (likes/comments/views) and an explicit
 * "Open in Instagram" egress rendered as a real `<a target="_blank"
 * rel="noopener noreferrer">` (a crawlable, affordance-correct link — not a
 * scripted `window.open` button); the old whole-tile link-out is REPLACED by
 * opening the viewer, with the permalink egress living in the viewer.
 *
 * Consumer image concerns are honored: `imageClassName` and `optixFlowConfig`
 * are forwarded onto each tile's poster image via the library's
 * `posterImgProps` passthrough.
 *
 * Captions should be plain strings when used with immersive rendering; a rich
 * `ReactNode` caption falls back to `imageAlt` (see the `caption` field doc).
 *
 * Posts without an image are skipped; an empty or missing `items` array renders
 * nothing. Data is hydrated from the toastability Instagram feed — media URLs
 * are the re-hosted MediaRecord CDN URLs, never expiring Instagram CDN URLs.
 *
 * @example
 * ```tsx
 * <InstagramPostGrid
 *   heading="Follow us on Instagram"
 *   items={[
 *     {
 *       id: "1",
 *       href: "https://www.instagram.com/p/abc123/",
 *       image: "https://cdn.ing/assets/i/r/1320/instagram-1.webp",
 *       caption: "Fresh out of the oven",
 *       likeCount: 128,
 *       commentCount: 12,
 *     },
 *   ]}
 * />
 * ```
 */
export function InstagramPostGrid({
  sectionId = "instagram-post-grid",
  heading,
  subheading,
  items,
  itemsSlot,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  headerClassName,
  headingClassName,
  subheadingClassName,
  gridClassName,
  itemClassName,
  imageClassName,
  optixFlowConfig,
  username,
  showLikeBadges = false,
  background,
  pattern,
  patternOpacity,
  patternClassName,
}: InstagramPostGridProps): React.JSX.Element | null {
  // Posts without a servable image are skipped (never render an empty tile).
  const mediaItems = useMemo<MediaItem[]>(() => {
    if (itemsSlot || !items) return [];
    const withImage = items.filter((item) => Boolean(item.image));
    // Dev-only: silent drops hide item-count/geometry mistakes, so surface them
    // in development. Memoized on the `items` identity → warns once per feed,
    // never per render; the production render path stays completely silent.
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV !== "production" &&
      withImage.length < items.length
    ) {
      const skipped = items.filter((item) => !item.image);
      const skippedIds = skipped.map((item) => item.id).join(", ");
      console.warn(
        `[instagram-post-grid] skipped ${skipped.length} item(s) without a resolvable image: ${skippedIds}`,
      );
    }
    return withImage.map(toMediaItem);
  }, [items, itemsSlot]);

  // Empty / missing feed → render nothing (blocks own their empty state).
  if (!itemsSlot && (!items || items.length === 0)) {
    return null;
  }

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      {(heading || subheading) && (
        <div className={cn("mb-8 flex flex-col gap-2", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-xl font-medium tracking-tight md:text-3xl lg:text-5xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {subheading &&
            (typeof subheading === "string" ? (
              <p
                className={cn(
                  "max-w-full md:max-w-2xl text-balance opacity-75",
                  subheadingClassName,
                )}
              >
                {subheading}
              </p>
            ) : (
              <div className={subheadingClassName}>{subheading}</div>
            ))}
        </div>
      )}

      {itemsSlot ? (
        <div
          className={cn(
            "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
            gridClassName,
          )}
        >
          {itemsSlot}
        </div>
      ) : (
        <ImmersiveFeedProvider items={mediaItems} actions={VIEWER_ACTIONS}>
          <InstagramFeedGrid
            mediaItems={mediaItems}
            gridClassName={gridClassName}
            itemClassName={itemClassName}
            imageClassName={imageClassName}
            optixFlowConfig={optixFlowConfig}
            showLikeBadges={showLikeBadges}
          />
          <ImmersiveViewer
            ariaLabel="Instagram post viewer"
            renderActions={({ item }) => <InstagramViewerRail item={item} />}
            renderCaption={(item) => (
              <InstagramViewerCaption item={item} username={username} />
            )}
          />
        </ImmersiveFeedProvider>
      )}
    </Section>
  );
}
