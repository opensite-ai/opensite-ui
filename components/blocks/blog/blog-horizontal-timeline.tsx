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
}

export function BlogHorizontalTimelineComponent({
  heading,
  posts,
  postsSlot,
  readText,
  className,
  containerClassName,
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
            "flex flex-col items-center gap-16 md:flex-row",
            postItemClassName,
          )}
        >
          {post.image && (
            <div
              className={cn(
                "flex h-80 w-full items-center justify-center overflow-hidden rounded-3xl bg-muted md:w-140",
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
          <Card className={cn("border-none shadow-none", postCardClassName)}>
            <CardContent className="p-0">
              <div
                className={cn(
                  "mb-5 flex h-90 items-start border-b py-10 md:mb-0 lg:gap-32",
                  index === 0 && "md:border-t",
                )}
              >
                <div className="flex h-full w-full flex-col items-start justify-between pr-8">
                  {post.title && (
                    <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      {post.title}
                    </h2>
                  )}
                  {postDate && (
                    <p className="mt-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                      {postDate}
                    </p>
                  )}
                </div>
                <div className="flex h-full w-full flex-col items-start justify-between gap-6">
                  {postDescription && (
                    <p className="text-lg leading-relaxed font-normal tracking-tight text-muted-foreground md:text-xl">
                      {postDescription}
                    </p>
                  )}
                  {readText && (
                    <Pressable
                      href={postHref}
                      variant="ghost"
                      className="inline-flex items-center justify-center gap-4 px-0 text-primary transition-all ease-in-out hover:gap-6 hover:text-accent-foreground"
                    >
                      <span className="text-lg font-semibold tracking-tight">
                        {readText}
                      </span>
                      <DynamicIcon name="lucide/arrow-right" size={20} />
                    </Pressable>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
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
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "mb-12 max-w-lg font-sans text-5xl font-extrabold tracking-tight text-foreground md:text-7xl",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            <div className={cn("mb-12", headingClassName)}>{heading}</div>
          ))}

        <div className={cn("flex flex-col", postsClassName)}>{renderPosts}</div>
      </div>
    </Section>
  );
}

export { BlogHorizontalTimelineComponent as BlogHorizontalTimeline };
