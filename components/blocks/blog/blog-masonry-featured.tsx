"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  BlogPostItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface BlogMasonryFeaturedProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Slide description
   */
  description?: React.ReactNode;
  /**
   * Array of content items (first item is featured)
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering the featured item (overrides first item)
   */
  featuredSlot?: React.ReactNode;
  /**
   * Custom slot for rendering additional items (overrides items array)
   */
  postsSlot?: React.ReactNode;
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
   * Additional CSS classes for the items grid
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for the featured item wrapper
   */
  featuredClassName?: string;
  /**
   * Additional CSS classes for the featured item media
   */
  featuredImageClassName?: string;
  /**
   * Additional CSS classes for individual item cards
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

export function BlogMasonryFeaturedComponent({
  sectionId = "blog-masonry-featured",
  heading,
  description,
  posts,
  featuredSlot,
  postsSlot,
  className,
  headingClassName,
  postsClassName,
  featuredClassName,
  featuredImageClassName,
  postCardClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "hero",
  pattern,
  patternOpacity,
}: BlogMasonryFeaturedProps): React.JSX.Element {
  const featuredPost = posts?.[0];
  const otherPosts = posts?.slice(1);

  const featuredPostContent = React.useMemo(() => {
    if (featuredSlot) return featuredSlot;
    if (!featuredPost) return null;

    const postHref = featuredPost.href || featuredPost.url || featuredPost.link;

    return (
      <div
        className={cn(
          "relative md:row-span-2 lg:col-span-2",
          featuredClassName,
        )}
      >
        <Pressable
          href={postHref}
          className="block h-fit rounded-lg p-3 md:top-0"
        >
          {featuredPost.image && (
            <Img
              src={featuredPost.image}
              alt={
                typeof featuredPost.title === "string"
                  ? featuredPost.title
                  : "Featured content"
              }
              className={cn(
                "h-48 w-full rounded-xl shadow-xl object-cover md:h-80 lg:h-96 transition-all duration-500 hover:opacity-80",
                featuredImageClassName,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div className="mt-5">
            <div className="mb-2.5 flex items-center gap-1 text-sm">
              {(featuredPost.date || featuredPost.published) && (
                <time>{featuredPost.date || featuredPost.published}</time>
              )}
              {(featuredPost.date || featuredPost.published) &&
                featuredPost.author &&
                "·"}
              {featuredPost.author && <span>{featuredPost.author}</span>}
            </div>
            {featuredPost.title &&
              (typeof featuredPost.title === "string" ? (
                <div className="text-2xl font-semibold">
                  {featuredPost.title}
                </div>
              ) : (
                featuredPost.title
              ))}
            {(featuredPost.description || featuredPost.summary) && (
              <p className="mt-4 text-sm font-normal">
                {featuredPost.description || featuredPost.summary}
              </p>
            )}
          </div>
        </Pressable>
      </div>
    );
  }, [
    featuredSlot,
    featuredPost,
    featuredClassName,
    featuredImageClassName,
    optixFlowConfig,
  ]);

  const otherPostsContent = React.useMemo(() => {
    if (postsSlot) return postsSlot;
    if (!otherPosts || otherPosts.length === 0) return null;

    return otherPosts.map((post) => {
      const postHref = post.href || post.url || post.link || "#";
      const postId = post.id || String(post.title) || Math.random().toString();

      return (
        <Pressable
          key={postId}
          href={postHref}
          /*
            Grid/flex card guard: a card's default `min-width: auto` is its
            min-content width, so one unbroken token in a feed-driven title or
            summary makes the card wider than its track and scrolls the whole page
            sideways on a phone. `min-w-0` and `wrap-break-word` are both already
            in the production Tailwind safelist.
          */
          className={cn(
            "min-w-0 rounded-lg p-3 wrap-break-word",
            postCardClassName,
          )}
        >
          {post.image && (
            <Img
              src={post.image}
              alt={typeof post.title === "string" ? post.title : "Content item"}
              className="h-48 w-full rounded-xl shadow-lg object-cover transition-all duration-500 hover:opacity-80"
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div className="mt-5">
            <div className="mb-2.5 flex items-center gap-1 text-sm">
              {(post.date || post.published) && (
                <time>{post.date || post.published}</time>
              )}
              {(post.date || post.published) && post.author && "·"}
              {post.author && <span>{post.author}</span>}
            </div>
            {post.title &&
              (typeof post.title === "string" ? (
                <div className="text-lg font-semibold">{post.title}</div>
              ) : (
                post.title
              ))}
          </div>
        </Pressable>
      );
    });
  }, [postsSlot, otherPosts, postCardClassName, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className="relative">
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "mb-4 text-center text-2xl font-medium md:text-4xl text-balance",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            heading
          ))}
        {description &&
          (typeof description === "string" ? (
            <p className="text-balance text-center text-lg">{description}</p>
          ) : (
            description
          ))}

        <div
          className={cn(
            "grid-cols-1 mt-6 md:mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
            postsClassName,
          )}
        >
          {featuredPostContent}
          {otherPostsContent}
        </div>
      </div>
    </Section>
  );
}

export { BlogMasonryFeaturedComponent as BlogMasonryFeatured };
