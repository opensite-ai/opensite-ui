"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { BlogPostItem, OptixFlowConfig } from "../../../src/types";

export interface BlogMasonryFeaturedProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of blog post configurations (first post is featured)
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering the featured post (overrides first post)
   */
  featuredSlot?: React.ReactNode;
  /**
   * Custom slot for rendering other posts (overrides posts array)
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
   * Additional CSS classes for the posts grid
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for the featured post wrapper
   */
  featuredClassName?: string;
  /**
   * Additional CSS classes for the featured post image
   */
  featuredImageClassName?: string;
  /**
   * Additional CSS classes for individual post cards
   */
  postCardClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function BlogMasonryFeatured({
  heading,
  posts,
  featuredSlot,
  postsSlot,
  className,
  containerClassName,
  headingClassName,
  postsClassName,
  featuredClassName,
  featuredImageClassName,
  postCardClassName,
  optixFlowConfig,
}: BlogMasonryFeaturedProps): React.JSX.Element {
  const featuredPost = posts?.[0];
  const otherPosts = posts?.slice(1);

  const renderFeaturedPost = () => {
    if (featuredSlot) return featuredSlot;
    if (!featuredPost) return null;

    const postHref = featuredPost.href || featuredPost.url || featuredPost.link || "#";

    return (
      <div className={cn("relative md:row-span-2 lg:col-span-2", featuredClassName)}>
        <Pressable
          href={postHref}
          className="block h-fit rounded-lg p-3 md:top-0"
        >
          {featuredPost.image && (
            <Img
              src={featuredPost.image}
              alt={typeof featuredPost.title === "string" ? featuredPost.title : "Featured post"}
              className={cn("h-48 w-full rounded-lg object-cover hover:opacity-80 md:h-80 lg:h-96", featuredImageClassName)}
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div className="mt-5">
            <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
              {(featuredPost.date || featuredPost.published) && (
                <time>{featuredPost.date || featuredPost.published}</time>
              )}
              {(featuredPost.date || featuredPost.published) && featuredPost.author && "·"}
              {featuredPost.author && <span>{featuredPost.author}</span>}
            </div>
            {featuredPost.title && (
              typeof featuredPost.title === "string" ? (
                <h3 className="text-lg md:text-3xl lg:text-4xl">{featuredPost.title}</h3>
              ) : (
                <div className="text-lg md:text-3xl lg:text-4xl">{featuredPost.title}</div>
              )
            )}
            {(featuredPost.description || featuredPost.summary) && (
              <p className="mt-4 text-muted-foreground">
                {featuredPost.description || featuredPost.summary}
              </p>
            )}
          </div>
        </Pressable>
      </div>
    );
  };

  const renderOtherPosts = () => {
    if (postsSlot) return postsSlot;
    if (!otherPosts || otherPosts.length === 0) return null;

    return otherPosts.map((post) => {
      const postHref = post.href || post.url || post.link || "#";
      const postId = post.id || String(post.title) || Math.random().toString();

      return (
        <Pressable key={postId} href={postHref} className={cn("rounded-lg p-3", postCardClassName)}>
          {post.image && (
            <Img
              src={post.image}
              alt={typeof post.title === "string" ? post.title : "Blog post"}
              className="h-48 w-full rounded-lg object-cover hover:opacity-80"
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div className="mt-5">
            <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
              {(post.date || post.published) && <time>{post.date || post.published}</time>}
              {(post.date || post.published) && post.author && "·"}
              {post.author && <span>{post.author}</span>}
            </div>
            {post.title && (
              typeof post.title === "string" ? (
                <h3 className="text-lg">{post.title}</h3>
              ) : (
                <div className="text-lg">{post.title}</div>
              )
            )}
          </div>
        </Pressable>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("mb-12 text-center text-4xl font-medium md:text-7xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}

        <div className={cn("xs:grid-cols-1 mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", postsClassName)}>
          {renderFeaturedPost()}
          {renderOtherPosts()}
        </div>
      </div>
    </section>
  );
}
