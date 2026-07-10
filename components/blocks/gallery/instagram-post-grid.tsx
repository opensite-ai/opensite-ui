"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Video } from "@page-speed/video";
import { Pressable } from "../../../lib/Pressable";
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

interface EngagementBadgeProps {
  iconName: string;
  count: number;
  label: string;
}

/**
 * Renders a single engagement stat (likes / comments / views) with an icon.
 * Only mounted by the caller when the underlying count is present, so a real
 * zero is displayed but a missing metric is never invented.
 */
function EngagementBadge({
  iconName,
  count,
  label,
}: EngagementBadgeProps): React.JSX.Element {
  return (
    <span
      className="inline-flex items-center gap-1"
      aria-label={`${count.toLocaleString()} ${label}`}
    >
      <DynamicIcon name={iconName} size={16} aria-hidden="true" />
      <span aria-hidden="true">{count.toLocaleString()}</span>
    </span>
  );
}

/**
 * InstagramPostGrid displays a responsive, square-tiled grid of Instagram posts.
 *
 * Each tile links out to the post's instagram.com permalink in a new tab. Images
 * render via `@page-speed/img`; video posts render an in-grid `@page-speed/video`
 * that plays muted on hover (progressive/on-interaction). Captions are truncated,
 * an optional date is shown, and like/comment/view badges appear only when the
 * corresponding count is present — never fabricated. Posts without an image are
 * skipped; an empty or missing `items` array renders nothing.
 *
 * Data is hydrated from the toastability Instagram feed. Media URLs are the
 * re-hosted MediaRecord CDN URLs, never expiring Instagram CDN URLs.
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
  imageClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: InstagramPostGridProps): React.JSX.Element | null {
  const tiles = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    // Posts without a servable image are skipped (never render an empty tile).
    const visibleItems = items.filter((item) => Boolean(item.image));

    return visibleItems.map((item) => {
      const altText =
        item.imageAlt ||
        (typeof item.caption === "string" ? item.caption : "") ||
        "Instagram post";
      const showVideo = Boolean(item.isVideo && item.videoUrl);

      return (
        <Pressable
          key={item.id}
          href={item.href}
          aria-label={
            typeof item.caption === "string" && item.caption.length > 0
              ? item.caption
              : "View Instagram post"
          }
          className={cn(
            "group relative block aspect-square overflow-hidden rounded-md bg-muted",
            item.className,
            itemClassName,
          )}
        >
          <Img
            src={item.image}
            alt={altText}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none",
              imageClassName,
            )}
            optixFlowConfig={optixFlowConfig}
          />

          {showVideo && (
            <Video
              src={item.videoUrl}
              poster={item.image}
              controls={false}
              muted
              loop
              playsInline
              preload="metadata"
              onMouseEnter={(e) => {
                void e.currentTarget.play().catch(() => undefined);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none",
                imageClassName,
              )}
            />
          )}

          {item.isVideo && (
            <span
              className="absolute right-2 top-2 text-white drop-shadow-md"
              aria-hidden="true"
            >
              <DynamicIcon name="lucide/play" size={18} />
            </span>
          )}

          {(item.caption ||
            item.date ||
            typeof item.likeCount === "number" ||
            typeof item.commentCount === "number" ||
            typeof item.viewCount === "number") && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-linear-to-t from-black/70 to-transparent p-3 text-left text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none">
              {item.caption &&
                (typeof item.caption === "string" ? (
                  <p className="line-clamp-2 text-xs leading-snug wrap-break-word">
                    {item.caption}
                  </p>
                ) : (
                  <div className="line-clamp-2 text-xs leading-snug">
                    {item.caption}
                  </div>
                ))}
              {(typeof item.likeCount === "number" ||
                typeof item.commentCount === "number" ||
                typeof item.viewCount === "number" ||
                item.date) && (
                <div className="flex items-center gap-3 text-xs font-medium">
                  {typeof item.likeCount === "number" && (
                    <EngagementBadge
                      iconName="lucide/heart"
                      count={item.likeCount}
                      label="likes"
                    />
                  )}
                  {typeof item.commentCount === "number" && (
                    <EngagementBadge
                      iconName="lucide/message-circle"
                      count={item.commentCount}
                      label="comments"
                    />
                  )}
                  {typeof item.viewCount === "number" && (
                    <EngagementBadge
                      iconName="lucide/eye"
                      count={item.viewCount}
                      label="views"
                    />
                  )}
                  {item.date && (
                    <span className="ml-auto opacity-80">{item.date}</span>
                  )}
                </div>
              )}
            </div>
          )}
        </Pressable>
      );
    });
  }, [itemsSlot, items, itemClassName, imageClassName, optixFlowConfig]);

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
      <div
        className={cn(
          "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4",
          gridClassName,
        )}
      >
        {tiles}
      </div>
    </Section>
  );
}
