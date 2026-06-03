"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  BlogPostItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface BlogHorizontalCardsProps {
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
   * Action configuration for the main CTA button
   */
  ctaAction?: ActionConfig;
  /**
   * Custom slot for rendering the CTA action (overrides ctaAction)
   */
  ctaSlot?: React.ReactNode;
  /**
   * Array of content item configurations
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering posts (overrides posts array)
   */
  postsSlot?: React.ReactNode;
  /**
   * Text for "Read more" links on each post
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
   * Additional CSS classes for the header
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
   * Additional CSS classes for the posts container
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for individual post cards
   */
  postCardClassName?: string;
  /**
   * Additional CSS classes for the CTA container
   */
  ctaClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

export function BlogHorizontalCards({
  sectionId = "blog-horizontal-cards",
  badge,
  heading,
  description,
  ctaAction,
  ctaSlot,
  posts,
  postsSlot,
  readMoreText,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  postsClassName,
  postCardClassName,
  ctaClassName,
  optixFlowConfig,
  background,
  pattern,
  patternOpacity,
}: BlogHorizontalCardsProps): React.JSX.Element {
  const ctaContent = React.useMemo(() => {
    if (ctaSlot) return ctaSlot;
    if (!ctaAction) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = ctaAction;
    return (
      <Pressable
        asButton
        className={cn("w-full sm:w-auto", actionClassName)}
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
  }, [ctaSlot, ctaAction]);

  const postsContent = React.useMemo(() => {
    if (postsSlot) return postsSlot;
    if (!posts || posts.length === 0) return null;

    return posts.map((post) => {
      const postHref = post.href || post.url || post.link || "#";
      const postId = post.id || String(post.title) || Math.random().toString();
      const postTitle =
        typeof post.title === "string" ? post.title : "Content item";
      const postLabel = post.label || post.category;
      const postSummary = post.summary || post.description;
      const postDate = post.published || post.date;

      return (
        <div
          key={postId}
          className={cn(
            "overflow-hidden border-0 bg-transparent shadow-none",
            postCardClassName,
          )}
        >
          <div className="flex flex-col gap-6 sm:flex-row">
            {post.image && (
              <div className="shrink-0">
                <Pressable
                  href={postHref}
                  className="block transition-opacity duration-200 hover:opacity-90"
                >
                  <Img
                    src={post.image}
                    alt={postTitle}
                    className="aspect-video w-full rounded-lg object-cover object-center sm:w-[260px]"
                    optixFlowConfig={optixFlowConfig}
                    loading="eager"
                  />
                </Pressable>
              </div>
            )}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-4 text-sm opacity-70">
                {postLabel && <Badge variant="secondary">{postLabel}</Badge>}
                {post.author && <span>{post.author}</span>}
                {postDate && <span>{postDate}</span>}
              </div>
              {post.title && (
                <h3 className="text-xl leading-tight font-bold lg:text-2xl">
                  <Pressable href={postHref} className="hover:underline">
                    {post.title}
                  </Pressable>
                </h3>
              )}
              {postSummary && (
                <p className="text-base opacity-70">{postSummary}</p>
              )}
              {readMoreText && (
                <Pressable href={postHref} variant="outline">
                  {readMoreText}
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="size-4"
                  />
                </Pressable>
              )}
            </div>
          </div>
        </div>
      );
    });
  }, [postsSlot, posts, postCardClassName, optixFlowConfig, readMoreText]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col items-center">
        <div className={cn("mx-auto max-w-3xl text-center", headerClassName)}>
          {badge &&
            (typeof badge === "string" ? (
              <Badge className={cn("mb-6", badgeClassName)}>{badge}</Badge>
            ) : (
              badge
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-5xl lg:mb-6",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              heading
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mb-12 opacity-70 md:text-base lg:text-lg text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}
        </div>

        <div className={cn("mx-auto max-w-5xl space-y-12", postsClassName)}>
          {postsContent}
        </div>

        {(ctaSlot || ctaAction) && (
          <div className={cn("mt-16 text-center", ctaClassName)}>
            {ctaContent}
          </div>
        )}
      </div>
    </Section>
  );
}
