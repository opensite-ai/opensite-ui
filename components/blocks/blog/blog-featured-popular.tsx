"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { BlogPostItem, OptixFlowConfig } from "../../../src/types";

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
}

const defaultPosts: BlogPostItem[] = [
  {
    title: "Exploring the Future of AI in Modern Technology Trends",
    category: "Technology",
    description:
      "Discover how AI is transforming industries and learn about the latest advancements in artificial intelligence. Discover how AI is transforming industries and learn about the latest advancements in artificial intelligence.",
    image: imagePlaceholders[0],
    href: "#",
  },
  {
    title: "Strategies for Effective Business Growth in 2025",
    category: "Business",
    description:
      "Learn proven strategies to grow your business and stay competitive in the ever-evolving market landscape.",
    image: imagePlaceholders[1],
    href: "#",
  },
  {
    title: "Top Wellness Trends to Improve Your Health in 2025",
    category: "Health & Wellness",
    description:
      "Explore the top wellness trends that can help you achieve a healthier and more balanced lifestyle.",
    image: imagePlaceholders[2],
    href: "#",
  },
  {
    title: "Boosting Productivity with Smart Tools and Techniques",
    category: "Productivity",
    description:
      "Find out how to enhance your productivity using the latest tools and techniques for better time management.",
    image: imagePlaceholders[3],
    href: "#",
  },
];

export function BlogFeaturedPopular({
  heading = "Insights and Trends Blog",
  description = "Stay updated with the latest insights, trends, and tips across various topics to keep ahead of the curve.",
  popularHeading = "Popular Posts",
  posts = defaultPosts,
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
}: BlogFeaturedPopularProps): React.JSX.Element {
  const featuredPost = posts?.[0];
  const popularPosts = posts?.slice(1);

  const renderFeaturedPost = () => {
    if (featuredSlot) return featuredSlot;
    if (!featuredPost) return null;

    const postHref = featuredPost.href || featuredPost.url || featuredPost.link;
    const PostWrapper = postHref ? Pressable : "div";
    const wrapperProps = postHref ? { href: postHref } : {};

    return (
      <PostWrapper
        className={cn("my-16 grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-16", featuredClassName)}
        {...wrapperProps}
      >
        {featuredPost.image && (
          <Img
            src={featuredPost.image}
            alt={typeof featuredPost.title === "string" ? featuredPost.title : "Featured post"}
            className={cn("aspect-video rounded-lg object-cover", featuredImageClassName)}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        <div className={cn("flex flex-col items-start gap-4", featuredContentClassName)}>
          {(featuredPost.category || featuredPost.label) && (
            <Badge variant="secondary" className="shrink">
              {featuredPost.category || featuredPost.label}
            </Badge>
          )}
          {featuredPost.title && (
            typeof featuredPost.title === "string" ? (
              <h2 className="text-2xl font-semibold text-balance md:max-w-lg lg:text-3xl">
                {featuredPost.title}
              </h2>
            ) : (
              <div className="text-2xl font-semibold text-balance md:max-w-lg lg:text-3xl">
                {featuredPost.title}
              </div>
            )
          )}
          {(featuredPost.description || featuredPost.summary) && (
            <p className="text-muted-foreground md:max-w-lg">
              {featuredPost.description || featuredPost.summary}
            </p>
          )}
        </div>
      </PostWrapper>
    );
  };

  const renderPopularPosts = () => {
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
              alt={typeof post.title === "string" ? post.title : "Blog post"}
              className="aspect-video rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          )}
          {(post.category || post.label) && (
            <Badge variant="secondary" className="shrink">
              {post.category || post.label}
            </Badge>
          )}
          {post.title && (
            typeof post.title === "string" ? (
              <h3 className="text-xl font-semibold text-balance md:max-w-md">
                {post.title}
              </h3>
            ) : (
              <div className="text-xl font-semibold text-balance md:max-w-md">
                {post.title}
              </div>
            )
          )}
          {(post.description || post.summary) && (
            <p className="text-muted-foreground md:max-w-md">
              {post.description || post.summary}
            </p>
          )}
        </PostWrapper>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mb-16 text-center", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-5xl font-medium md:text-6xl", headingClassName)}>{heading}</h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mx-auto mt-4 max-w-xl text-lg text-muted-foreground", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        <div className="mx-auto max-w-7xl">
          {renderFeaturedPost()}
          {popularHeading && (
            typeof popularHeading === "string" ? (
              <p className={cn("text-2xl font-medium md:text-3xl", popularHeadingClassName)}>{popularHeading}</p>
            ) : (
              <div className={popularHeadingClassName}>{popularHeading}</div>
            )
          )}
          <div className={cn("mt-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6", postsClassName)}>
            {renderPopularPosts()}
          </div>
        </div>
      </div>
    </section>
  );
}
