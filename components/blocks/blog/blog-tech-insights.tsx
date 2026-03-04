"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  BlogPostItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface BlogTechInsightsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Action configuration for the primary call-to-action
   */
  readMoreAction?: ActionConfig;
  /**
   * Custom slot for rendering the primary action (overrides readMoreAction)
   */
  readMoreSlot?: React.ReactNode;
  /**
   * Featured item configuration
   */
  featuredPost?: BlogPostItem;
  /**
   * Custom slot for rendering the featured item (overrides featuredPost)
   */
  featuredSlot?: React.ReactNode;
  /**
   * Array of secondary item configurations
   */
  secondaryPosts?: BlogPostItem[];
  /**
   * Custom slot for rendering secondary items (overrides secondaryPosts array)
   */
  secondaryPostsSlot?: React.ReactNode;
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
   * Additional CSS classes for the primary action
   */
  readMoreClassName?: string;
  /**
   * Additional CSS classes for the content grid
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the featured item wrapper
   */
  featuredClassName?: string;
  /**
   * Additional CSS classes for the featured item image
   */
  featuredImageClassName?: string;
  /**
   * Additional CSS classes for the secondary items container
   */
  secondaryPostsClassName?: string;
  /**
   * Additional CSS classes for individual secondary item entries
   */
  secondaryPostItemClassName?: string;
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

export function BlogTechInsights({
  heading,
  description,
  readMoreAction,
  readMoreSlot,
  featuredPost,
  featuredSlot,
  secondaryPosts,
  secondaryPostsSlot,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  readMoreClassName,
  contentClassName,
  featuredClassName,
  featuredImageClassName,
  secondaryPostsClassName,
  secondaryPostItemClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
}: BlogTechInsightsProps): React.JSX.Element {
  const readMoreActionContent = useMemo(() => {
    if (readMoreSlot) return readMoreSlot;
    if (!readMoreAction) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = readMoreAction;
    return (
      <Pressable
        asButton
        className={cn(actionClassName, readMoreClassName)}
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
  }, [readMoreSlot, readMoreAction, readMoreClassName]);

  const featuredPostContent = useMemo(() => {
    if (featuredSlot) return featuredSlot;
    if (!featuredPost) return null;

    const content = (
      <div className={cn("mb-4", featuredClassName)}>
        {featuredPost.image && (
          <Img
            className={cn(
              "w-full rounded-lg shadow-xl object-cover",
              featuredImageClassName,
            )}
            src={featuredPost.image}
            alt={
              typeof featuredPost.title === "string"
                ? featuredPost.title
                : "Featured item"
            }
            optixFlowConfig={optixFlowConfig}
          />
        )}
        <div className="mt-4">
          {featuredPost.title &&
            (typeof featuredPost.title === "string" ? (
              <h2 className="text-2xl font-bold md:text-3xl">
                {featuredPost.title}
              </h2>
            ) : (
              featuredPost.title
            ))}
        </div>
        {(featuredPost.author || featuredPost.authorAvatar) && (
          <div className="mt-6 flex items-center gap-3 md:mt-8 md:gap-4">
            <Avatar className="h-8 w-8 rounded-md md:h-12 md:w-12">
              {featuredPost.authorAvatar && (
                <AvatarImage src={featuredPost.authorAvatar} />
              )}
            </Avatar>
            <span className="text-sm md:text-base">
              {featuredPost.author && (
                <span className="block">{featuredPost.author}</span>
              )}
              {featuredPost.authorRole && (
                <span className="text-xs md:text-sm">
                  {featuredPost.authorRole}
                </span>
              )}
            </span>
          </div>
        )}
      </div>
    );

    if (featuredPost.href) {
      return (
        <Pressable
          href={featuredPost.href}
          className="block transition-opacity hover:opacity-90"
        >
          {content}
        </Pressable>
      );
    }

    return content;
  }, [
    featuredSlot,
    featuredPost,
    featuredClassName,
    featuredImageClassName,
    optixFlowConfig,
  ]);

  const secondaryPostsContent = useMemo(() => {
    if (secondaryPostsSlot) return secondaryPostsSlot;
    if (!secondaryPosts || secondaryPosts.length === 0) return null;

    return secondaryPosts.map((post) => {
      const postId = post.id || String(post.title) || Math.random().toString();
      const descriptionText = post.description || post.summary;
      const truncatedDescription =
        typeof descriptionText === "string" && descriptionText.length > 100
          ? `${descriptionText.slice(0, 100)}...`
          : descriptionText;

      const postContent = (
        <div
          className={cn(
            "flex items-start gap-4 border-b pb-6 last:border-b-0",
            secondaryPostItemClassName,
          )}
        >
          <div className="w-24 shrink-0 sm:w-28 md:w-32">
            {post.image && (
              <Img
                className="aspect-4/3 w-full shadow-lg rounded-md object-cover"
                src={post.image}
                alt={
                  typeof post.title === "string" ? post.title : "Content item"
                }
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
          <div className="flex-1">
            {post.title && (
              <h3 className="font-semibold text-md line-clamp-2">
                {post.title}
              </h3>
            )}
            {truncatedDescription && (
              <p className="mt-1 text-sm leading-snug md:text-base line-clamp-2">
                {truncatedDescription}
              </p>
            )}
          </div>
        </div>
      );

      if (post.href) {
        return (
          <Pressable
            key={postId}
            href={post.href}
            className="block transition-opacity hover:opacity-80"
          >
            {postContent}
          </Pressable>
        );
      }

      return <div key={postId}>{postContent}</div>;
    });
  }, [
    secondaryPostsSlot,
    secondaryPosts,
    secondaryPostItemClassName,
    optixFlowConfig,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className={cn("flex flex-col items-center gap-8 md:gap-14")}>
        <div className={cn("w-full", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-2xl font-bold lg:text-3xl",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              heading
            ))}

          <div className="mt-4 flex flex-col md:flex-row items-stretch md:items-center justify-start md:justify-between gap-6 w-full">
            {description &&
              (typeof description === "string" ? (
                <span
                  className={cn(
                    "mt-2 block text-base md:text-lg text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </span>
              ) : (
                description
              ))}
            {readMoreActionContent}
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12",
            contentClassName,
          )}
        >
          {featuredPostContent}

          <div
            className={cn("space-y-6 md:space-y-8", secondaryPostsClassName)}
          >
            {secondaryPostsContent}
          </div>
        </div>
      </div>
    </Section>
  );
}
