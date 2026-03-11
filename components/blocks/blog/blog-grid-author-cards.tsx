"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  BlogPostItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface BlogGridAuthorCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of content items to display
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering items (overrides posts array)
   */
  postsSlot?: React.ReactNode;
  /**
   * Action configuration for the action button (mobile)
   */
  viewAllAction?: ActionConfig;
  /**
   * Custom slot for rendering the action (overrides viewAllAction)
   */
  viewAllSlot?: React.ReactNode;
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the items grid
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for individual cards
   */
  postCardClassName?: string;
  /**
   * Additional CSS classes for the action container
   */
  viewAllClassName?: string;
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

export function BlogGridAuthorCardsComponent({
  sectionId = "blog-grid-author-cards",
  heading,
  description,
  posts,
  postsSlot,
  viewAllAction,
  viewAllSlot,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  headerClassName,
  headingClassName,
  descriptionClassName,
  postsClassName,
  postCardClassName,
  viewAllClassName,
  optixFlowConfig,
  background,
  pattern,
  patternOpacity,
}: BlogGridAuthorCardsProps): React.JSX.Element {
  const viewAllActionContent = React.useMemo(() => {
    if (viewAllSlot) return viewAllSlot;
    if (!viewAllAction) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = viewAllAction;
    return (
      <Pressable
        asButton
        className={cn("w-full sm:w-fit", actionClassName)}
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
  }, [viewAllSlot, viewAllAction]);

  const postsContent = React.useMemo(() => {
    if (postsSlot) return postsSlot;
    if (!posts || posts.length === 0) return null;

    return posts.map((post) => {
      if (!post) return null;

      const postHref = post.href || post.url || post.link || "#";
      const postId = post.id || String(post.title) || Math.random().toString();
      const authorStr = typeof post.author === "string" ? post.author : "";

      return (
        <Pressable
          key={postId}
          href={postHref}
          className={cn("group flex flex-col", postCardClassName)}
        >
          {post.image && (
            <div className="shadow-xl mb-6 flex overflow-clip rounded-xl md:mb-8">
              <div className="transition-opacity duration-300 group-hover:opacity-80">
                <Img
                  src={post.image}
                  alt={
                    typeof post.title === "string" ? post.title : "Content item"
                  }
                  className="aspect-3/2 h-full w-full object-cover object-center"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </div>
          )}

          {post.label || post.category ? (
            <Badge>{post.label || post.category}</Badge>
          ) : null}

          {post.title &&
            (typeof post.title === "string" ? (
              <div className="mb-2 line-clamp-3 pt-4 text-lg font-semibold wrap-break-word md:mb-3 md:pt-4 md:text-xl lg:pt-4 leading-tight transition-all duration-300 group-hover:underline group-hover:underline-offset-4">
                {post.title}
              </div>
            ) : (
              post.title
            ))}
          {(post.summary || post.description) && (
            <div className="mb-4 line-clamp-2 text-sm md:mb-5 md:text-base">
              {post.summary || post.description}
            </div>
          )}
          {(post.author || post.authorAvatar) && (
            <div className="flex items-center gap-3">
              <Avatar className="size-12 ring-4 ring-primary shadow-lg">
                {post.authorAvatar && <AvatarImage src={post.authorAvatar} />}
                <AvatarFallback>
                  {post.authorInitials ||
                    (authorStr ? authorStr.slice(0, 2).toUpperCase() : "")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-px text-sm">
                {post.author && (
                  <span className="font-semibold">{post.author}</span>
                )}
                {(post.published || post.date) && (
                  <span className="opacity-75">
                    {post.published || post.date}
                  </span>
                )}
              </div>
            </div>
          )}
        </Pressable>
      );
    });
  }, [postsSlot, posts, postCardClassName, optixFlowConfig]);

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
        {(heading || description) && (
          <div className={cn("mb-6 md:mb-14 lg:mb-16", headerClassName)}>
            <div className="flex items-start justify-between gap-8">
              <div>
                {heading &&
                  (typeof heading === "string" ? (
                    <h2
                      className={cn(
                        "text-2xl font-semibold tracking-tight md:text-4xl lg:text-6xl text-pretty",
                        headingClassName,
                      )}
                    >
                      {heading}
                    </h2>
                  ) : (
                    heading
                  ))}
              </div>
            </div>
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "text-lg text-balance opacity-75",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                description
              ))}
          </div>
        )}
        <div
          className={cn(
            "grid",
            "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3",
            "gap-8 md:gap-12",
            postsClassName,
          )}
        >
          {postsContent}
        </div>
        {(viewAllSlot || viewAllAction) && (
          <div
            className={cn("mt-16 flex flex-col items-center", viewAllClassName)}
          >
            {viewAllActionContent}
          </div>
        )}
      </div>
    </Section>
  );
}

export { BlogGridAuthorCardsComponent as BlogGridAuthorCards };
