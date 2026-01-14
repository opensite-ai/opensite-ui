"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Card, CardContent } from "../../ui/card";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { BlogPostItem, OptixFlowConfig } from "../../../src/types";

export interface BlogHorizontalTimelineProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of blog post configurations
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering posts (overrides posts array)
   */
  postsSlot?: React.ReactNode;
  /**
   * Text for "Read" links on each post
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
   * Additional CSS classes for the posts container
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for individual post items
   */
  postItemClassName?: string;
  /**
   * Additional CSS classes for post images
   */
  postImageClassName?: string;
  /**
   * Additional CSS classes for post content cards
   */
  postCardClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function BlogHorizontalTimeline({
  heading = "Discover Our Fresh Content",
  posts,
  postsSlot,
  readText = "Read",
  className,
  containerClassName,
  headingClassName,
  postsClassName,
  postItemClassName,
  postImageClassName,
  postCardClassName,
  optixFlowConfig,
}: BlogHorizontalTimelineProps): React.JSX.Element {
  const renderPosts = () => {
    if (postsSlot) return postsSlot;
    if (!posts || posts.length === 0) return null;

    return posts.map((post, index) => {
      const postHref = post.href || post.url || post.link || "#";
      const postId = post.id || String(post.title) || Math.random().toString();
      const postDate = post.date || post.published;
      const postDescription = post.description || post.summary;
      const postImageAlt = post.imageAlt || (typeof post.title === "string" ? post.title : "Blog post");

      return (
        <div
          key={postId}
          className={cn("flex flex-col items-center gap-16 md:flex-row", postItemClassName)}
        >
          {post.image && (
            <div className={cn("flex h-80 w-full items-center justify-center overflow-hidden rounded-3xl bg-muted md:w-140", postImageClassName)}>
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
                  index === 0 && "md:border-t"
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    });
  };

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("mb-12 max-w-lg font-sans text-5xl font-extrabold tracking-tight text-foreground md:text-7xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={cn("mb-12", headingClassName)}>{heading}</div>
          )
        )}

        <div className={cn("flex flex-col", postsClassName)}>
          {renderPosts()}
        </div>
      </div>
    </section>
  );
}
