"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  BlogPostItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface BlogFeaturedPopularProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Popular posts section title
   */
  popularHeading?: React.ReactNode;
  /**
   * Array of blog post configurations (first post is featured)
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering the featured post (overrides first post)
   */
  featuredSlot?: React.ReactNode;
  /**
   * Custom slot for rendering popular posts (overrides posts array)
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
   * Additional CSS classes for the featured post wrapper
   */
  featuredClassName?: string;
  /**
   * Additional CSS classes for the featured post image
   */
  featuredImageClassName?: string;
  /**
   * Additional CSS classes for the featured post content
   */
  featuredContentClassName?: string;
  /**
   * Additional CSS classes for the popular posts heading
   */
  popularHeadingClassName?: string;
  /**
   * Additional CSS classes for the popular posts grid
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for individual post cards
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

export function BlogFeaturedPopular({
  heading,
  description,
  popularHeading,
  posts,
  featuredSlot,
  postsSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  featuredClassName,
  featuredImageClassName,
  featuredContentClassName,
  popularHeadingClassName,
  postsClassName,
  postCardClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: BlogFeaturedPopularProps): React.JSX.Element {
  const featuredPost = posts?.[0];
  const popularPosts = posts?.slice(1);

  const renderedFeaturedPost = React.useMemo(() => {
    if (featuredSlot) return featuredSlot;
    if (!featuredPost) return null;

    const postHref = featuredPost.href || featuredPost.url || featuredPost.link;
    const PostWrapper = postHref ? Pressable : "div";
    const wrapperProps = postHref ? { href: postHref } : {};

    return (
      <PostWrapper
        className={cn(
          "my-16 grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-16",
          featuredClassName,
        )}
        {...wrapperProps}
      >
        {featuredPost.image && (
          <Img
            src={featuredPost.image}
            alt={
              typeof featuredPost.title === "string"
                ? featuredPost.title
                : "Featured post"
            }
            className={cn(
              "aspect-video rounded-lg object-cover w-full h-auto",
              featuredImageClassName,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        <div
          className={cn(
            "flex flex-col items-start gap-4",
            featuredContentClassName,
          )}
        >
          {(featuredPost.category || featuredPost.label) && (
            <Badge variant="secondary" className="shrink">
              {featuredPost.category || featuredPost.label}
            </Badge>
          )}
          {featuredPost.title &&
            (typeof featuredPost.title === "string" ? (
              <h2 className="text-2xl font-semibold text-balance md:max-w-lg lg:text-3xl">
                {featuredPost.title}
              </h2>
            ) : (
              <div className="text-2xl font-semibold text-balance md:max-w-lg lg:text-3xl">
                {featuredPost.title}
              </div>
            ))}
          {(featuredPost.description || featuredPost.summary) && (
            <p className="text-muted-foreground md:max-w-lg">
              {featuredPost.description || featuredPost.summary}
            </p>
          )}
        </div>
      </PostWrapper>
    );
  }, [
    featuredSlot,
    featuredPost,
    featuredClassName,
    featuredImageClassName,
    featuredContentClassName,
    optixFlowConfig,
  ]);

  const renderedPopularPosts = React.useMemo(() => {
    if (postsSlot) return postsSlot;
    if (!popularPosts || popularPosts.length === 0) return null;

    return popularPosts.map((post) => {
      const postHref = post.href || post.url || post.link;
      const postId = post.id || String(post.title) || Math.random().toString();
      const PostWrapper = postHref ? Pressable : "div";
      const wrapperProps = postHref ? { href: postHref } : {};

      return (
        <PostWrapper
          key={postId}
          className={cn("flex flex-col items-start gap-4", postCardClassName)}
          {...wrapperProps}
        >
          {post.image && (
            <Img
              src={post.image}
              alt={typeof post.title === "string" ? post.title : "Content item"}
              className="aspect-video rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          )}
          {(post.category || post.label) && (
            <Badge variant="secondary" className="shrink">
              {post.category || post.label}
            </Badge>
          )}
          {post.title &&
            (typeof post.title === "string" ? (
              <h3 className="text-xl font-semibold text-balance md:max-w-md">
                {post.title}
              </h3>
            ) : (
              <div className="text-xl font-semibold text-balance md:max-w-md">
                {post.title}
              </div>
            ))}
          {(post.description || post.summary) && (
            <p className="text-muted-foreground md:max-w-md">
              {post.description || post.summary}
            </p>
          )}
        </PostWrapper>
      );
    });
  }, [postsSlot, popularPosts, postCardClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        {(heading || description) && (
          <div
            className={cn(
              "mb-6 md:mb-16 text-center px-8 md:px-0",
              headerClassName,
            )}
          >
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold md:text-5xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
          </div>
        )}
        <div className="mx-auto max-w-7xl">
          {renderedFeaturedPost}
          {popularHeading &&
            (typeof popularHeading === "string" ? (
              <p
                className={cn(
                  "text-2xl font-medium md:text-3xl",
                  popularHeadingClassName,
                )}
              >
                {popularHeading}
              </p>
            ) : (
              <div className={popularHeadingClassName}>{popularHeading}</div>
            ))}
          {renderedPopularPosts && (
            <div
              className={cn(
                "mt-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6",
                postsClassName,
              )}
            >
              {renderedPopularPosts}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
