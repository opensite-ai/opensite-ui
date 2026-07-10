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
   * Post caption (truncated for display)
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

/** Coerce a possibly-rich caption into a plain string (non-strings drop out). */
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
  const fullCaption = captionToString(item.caption);
  const title =
    truncate(fullCaption) || item.imageAlt || "Instagram post";
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
        gap: 4,
        padding: "3px 8px",
        borderRadius: 999,
        background: "rgba(8,12,24,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        color: "#fff",
        fontSize: 11,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      <DynamicIcon name="lucide/heart" size={13} aria-hidden="true" />
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
    icon: <DynamicIcon name="lucide/external-link" size={22} aria-hidden="true" />,
    label: "Instagram",
    ariaLabel: "Open in Instagram",
    onPress: (item) => openPermalink(item),
  },
];

interface RailStatProps {
  iconName: string;
  count: number;
  label: string;
  onPress: () => void;
}

/** One read-only engagement stat in the viewer rail (opens the permalink). */
function RailStat({
  iconName,
  count,
  label,
  onPress,
}: RailStatProps): React.JSX.Element {
  return (
    <button
      type="button"
      aria-label={`${count.toLocaleString()} ${label}`}
      onClick={(e) => {
        e.stopPropagation();
        onPress();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        padding: 0,
        border: "none",
        background: "transparent",
        color: "inherit",
        cursor: "pointer",
        font: "inherit",
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
        <DynamicIcon name={iconName} size={22} aria-hidden="true" />
      </span>
      <span aria-hidden="true" style={{ fontSize: 11, fontWeight: 600 }}>
        {count.toLocaleString()}
      </span>
    </button>
  );
}

/**
 * Right-side rail for the fullscreen viewer. Renders present-only engagement
 * counts (likes/comments/views) followed by the explicit "Open in Instagram"
 * egress. All buttons are read-only and open the post's permalink in a new tab
 * — the counts are informational, never toggles.
 */
function InstagramViewerRail({ item }: { item: MediaItem }): React.JSX.Element {
  const meta = (item.meta ?? {}) as InstagramMeta;
  const open = () => openPermalink(item);
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
      {typeof meta.likeCount === "number" ? (
        <RailStat
          iconName="lucide/heart"
          count={meta.likeCount}
          label="likes"
          onPress={open}
        />
      ) : null}
      {typeof meta.commentCount === "number" ? (
        <RailStat
          iconName="lucide/message-circle"
          count={meta.commentCount}
          label="comments"
          onPress={open}
        />
      ) : null}
      {typeof meta.viewCount === "number" ? (
        <RailStat
          iconName="lucide/eye"
          count={meta.viewCount}
          label="views"
          onPress={open}
        />
      ) : null}
      <button
        type="button"
        aria-label="Open in Instagram"
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          padding: 0,
          border: "none",
          background: "transparent",
          color: "inherit",
          cursor: "pointer",
          font: "inherit",
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
            name="lucide/external-link"
            size={22}
            aria-hidden="true"
          />
        </span>
        <span aria-hidden="true" style={{ fontSize: 11, fontWeight: 600 }}>
          Instagram
        </span>
      </button>
    </div>
  );
}

interface InstagramFeedGridProps {
  mediaItems: MediaItem[];
  gridClassName?: string;
  itemClassName?: string;
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
}: InstagramFeedGridProps): React.JSX.Element {
  const { open } = useImmersiveFeed();
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4",
        gridClassName,
      )}
    >
      {mediaItems.map((mediaItem) => {
        const likeCount = (mediaItem.meta as InstagramMeta | undefined)
          ?.likeCount;
        return (
          <ThumbnailCard
            key={mediaItem.id}
            item={mediaItem}
            onOpen={open}
            size={IG_TILE_WIDTH}
            style={IG_TILE_STYLE}
            className={itemClassName}
            elevated={false}
            showDuration={false}
            glyphMode="hover"
            badgeSlot={
              typeof likeCount === "number" ? likeBadge(likeCount) : undefined
            }
          />
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
 * "Open in Instagram" action; the old whole-tile link-out is REPLACED by
 * opening the viewer, with permalink egress living in the viewer.
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
  containerClassName,
  headerClassName,
  headingClassName,
  subheadingClassName,
  gridClassName,
  itemClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
}: InstagramPostGridProps): React.JSX.Element | null {
  // Posts without a servable image are skipped (never render an empty tile).
  const mediaItems = useMemo<MediaItem[]>(() => {
    if (itemsSlot || !items) return [];
    return items.filter((item) => Boolean(item.image)).map(toMediaItem);
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
                  "text-xl font-medium tracking-tight md:text-2xl lg:text-3xl text-balance",
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
                  "max-w-2xl text-balance text-muted-foreground",
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
            "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4",
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
          />
          <ImmersiveViewer
            ariaLabel="Instagram post viewer"
            renderActions={({ item }) => <InstagramViewerRail item={item} />}
          />
        </ImmersiveFeedProvider>
      )}
    </Section>
  );
}
