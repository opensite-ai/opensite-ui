"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Card, CardContent } from "../../ui/card";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  BlogPostItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface BlogHorizontalTimelineProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of content item configurations
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering content items (overrides posts array)
   */
  postsSlot?: React.ReactNode;
  /**
   * Text for action links on each content item
   */
  readText?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the content items container
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for individual content items
   */
  postItemClassName?: string;
  /**
   * Additional CSS classes for content item images
   */
  postImageClassName?: string;
  /**
   * Additional CSS classes for content item cards
   */
  postCardClassName?: string;
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

export function BlogHorizontalTimelineComponent({
  sectionId = "blog-horizontal-timeline",
  heading,
  posts,
  postsSlot,
  readText,
  className,
  containerClassName = "mx-auto w-full px-4 lg:px-8 max-w-full md:max-w-7xl relative z-10 flex justify-center",
  headingClassName,
  postsClassName,
  postItemClassName,
  postImageClassName,
  postCardClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: BlogHorizontalTimelineProps): React.JSX.Element {
  const renderPosts = React.useMemo(() => {
    if (postsSlot) return postsSlot;
    if (!posts || posts.length === 0) return null;

    return posts.map((post, index) => {
      const postHref = post.href || post.url || post.link || "#";
      const postId = post.id || String(post.title) || Math.random().toString();
      const postDate = post.date || post.published;
      const postDescription = post.description || post.summary;
      const postImageAlt =
        post.imageAlt ||
        (typeof post.title === "string" ? post.title : "Content item");

      return (
        <div
          key={postId}
          className={cn(
            "flex min-w-0 flex-col items-center gap-2 wrap-break-word md:flex-row md:gap-16",
            postItemClassName,
          )}
        >
          {post.image && (
            <div
              className={cn(
                "flex h-48 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted md:h-80 md:w-140 md:rounded-3xl",
                postImageClassName,
              )}
            >
              <Img
                src={post.image}
                className="h-full w-full object-cover"
                alt={postImageAlt}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
          <div
            className={cn(
              "w-full border-none shadow-none pt-0 pb-6 md:pt-6 md:pb-6",
              postCardClassName,
            )}
          >
            <div className="p-0">
              <div
                className={cn(
                  "flex flex-col gap-4 border-b h-full justify-between md:items-start md:gap-0 md:border-t py-6 mb-6 md:mb-0",
                  index === 0 && "md:border-t",
                )}
              >
                <div className="flex w-full flex-col items-start gap-2 md:h-full md:justify-between md:pr-8">
                  {post.title && (
                    <h2 className="text-lg font-bold tracking-tight line-clamp-2">
                      {post.title}
                    </h2>
                  )}
                  {postDate && (
                    <p className="text-xs font-semibold tracking-widest uppercase md:mt-2 md:text-sm opacity-75">
                      {postDate}
                    </p>
                  )}
                </div>
                <div className="flex w-full flex-col items-start gap-4 md:h-full md:justify-between md:gap-6">
                  {postDescription && (
                    <p className="text-base leading-relaxed font-normal tracking-tight text-muted-foreground md:text-xl line-clamp-3">
                      {postDescription}
                    </p>
                  )}
                  {readText && (
                    <Pressable href={postHref} asButton variant="outline">
                      {readText}
                      <DynamicIcon name="lucide/arrow-up-right" size={20} />
                    </Pressable>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }, [
    postsSlot,
    posts,
    postItemClassName,
    postImageClassName,
    postCardClassName,
    optixFlowConfig,
    readText,
  ]);

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
      <div className="relative">
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "mb-12 max-w-lg font-sans text-5xl font-extrabold tracking-tight md:text-7xl",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            heading
          ))}

        <div className={cn("flex flex-col gap-0 md:gap-20", postsClassName)}>
          {renderPosts}
        </div>
      </div>
    </Section>
  );
}

export { BlogHorizontalTimelineComponent as BlogHorizontalTimeline };
