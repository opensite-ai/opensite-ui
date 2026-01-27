"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, BlogPostItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface BlogCategoryOverlayProps {
  /**
   * Badge/tagline content above heading
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of content item configurations
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering content items (overrides posts array)
   */
  postsSlot?: React.ReactNode;
  /**
   * Action configuration for the primary action link
   */
  viewAllAction?: ActionConfig;
  /**
   * Custom slot for rendering the primary action (overrides viewAllAction)
   */
  viewAllSlot?: React.ReactNode;
  /**
   * Action link text for individual items
   */
  readMoreText?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header content wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the view all action
   */
  viewAllClassName?: string;
  /**
   * Additional CSS classes for the content grid
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for individual content cards
   */
  postCardClassName?: string;
  /**
   * Additional CSS classes for the category badge overlay
   */
  categoryBadgeClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
}

export function BlogCategoryOverlay({
  badge,
  heading,
  description,
  posts,
  postsSlot,
  viewAllAction,
  viewAllSlot,
  readMoreText,
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  viewAllClassName,
  postsClassName,
  postCardClassName,
  categoryBadgeClassName,
  optixFlowConfig,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: BlogCategoryOverlayProps): React.JSX.Element {
  const viewAllActionContent = React.useMemo(() => {
    if (viewAllSlot) return viewAllSlot;
    if (!viewAllAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = viewAllAction;
    return (
      <Pressable
        className={cn("flex items-center gap-1 text-sm font-semibold", actionClassName, viewAllClassName)}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  }, [viewAllSlot, viewAllAction, viewAllClassName]);

  const postsContent = React.useMemo(() => {
    if (postsSlot) return postsSlot;
    if (!posts || posts.length === 0) return null;

    return posts.map((post) => {
      const postHref = post.href || post.url || post.link || "#";
      const postId = post.id || String(post.title) || Math.random().toString();

      return (
        <div key={postId} className={cn("flex flex-col", postCardClassName)}>
          <div className="relative">
            {post.image && (
              <Img
                src={post.image}
                alt={typeof post.title === "string" ? post.title : "Content item"}
                className="aspect-video w-full rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            )}
            {(post.category || post.label) && (
              <Badge
                variant="secondary"
                className={cn("absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm", categoryBadgeClassName)}
              >
                {post.category || post.label}
              </Badge>
            )}
          </div>
          <div className="flex h-full flex-col justify-between p-4">
            {post.title && (
              typeof post.title === "string" ? (
                <h2 className="mb-5 text-xl font-semibold">{post.title}</h2>
              ) : (
                <div className="mb-5 text-xl font-semibold">{post.title}</div>
              )
            )}
            <div className="flex justify-between gap-6 text-sm">
              {(post.date || post.published) && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <DynamicIcon name="lucide/calendar" size={16} className="h-4 w-4" />
                  {post.date || post.published}
                </span>
              )}
              {readMoreText && (
                <Pressable href={postHref} className="flex items-center gap-1">
                  {readMoreText}
                  <DynamicIcon name="lucide/chevron-right" size={12} className="h-full w-3" />
                </Pressable>
              )}
            </div>
          </div>
        </div>
      );
    });
  }, [postsSlot, posts, postCardClassName, categoryBadgeClassName, optixFlowConfig, readMoreText]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto flex max-w-3xl flex-col items-center gap-6 text-center", headerClassName)}>
          {badge && (
            <div className={badgeClassName}>
              {typeof badge === "string" ? (
                <Badge variant="outline">{badge}</Badge>
              ) : (
                badge
              )}
            </div>
          )}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-4xl font-semibold text-balance", headingClassName)}>{heading}</h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-muted-foreground", descriptionClassName)}>{description}</p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {viewAllActionContent}
        </div>
        <div className={cn("mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3", postsClassName)}>
          {postsContent}
        </div>
      </div>
    </Section>
  );
}
