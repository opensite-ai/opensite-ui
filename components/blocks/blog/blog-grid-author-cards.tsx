"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, BlogPostItem, OptixFlowConfig } from "../../../src/types";

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
   * Array of blog post configurations
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering posts (overrides posts array)
   */
  postsSlot?: React.ReactNode;
  /**
   * Action configuration for the "View All" button (mobile)
   */
  viewAllAction?: ActionConfig;
  /**
   * Custom slot for rendering the view all action (overrides viewAllAction)
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
   * Additional CSS classes for the posts grid
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for individual post cards
   */
  postCardClassName?: string;
  /**
   * Additional CSS classes for the view all action container
   */
  viewAllClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function BlogGridAuthorCards({
  heading = "Blog",
  description = "Insights, tutorials, and thoughts on modern software development",
  posts,
  postsSlot,
  viewAllAction,
  viewAllSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  postsClassName,
  postCardClassName,
  viewAllClassName,
  optixFlowConfig,
}: BlogGridAuthorCardsProps): React.JSX.Element {
  const renderViewAllAction = () => {
    if (viewAllSlot) return viewAllSlot;
    if (!viewAllAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = viewAllAction;
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
  };

  const renderPosts = () => {
    if (postsSlot) return postsSlot;
    if (!posts || posts.length === 0) return null;

    return posts.map((post) => {
      const postHref = post.href || post.url || post.link || "#";
      const postId = post.id || String(post.title) || Math.random().toString();
      const authorStr = typeof post.author === "string" ? post.author : "";

      return (
        <Pressable
          key={postId}
          href={postHref}
          className={cn("group flex flex-col", postCardClassName)}
        >
          <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
            <div className="transition-opacity duration-300 group-hover:opacity-80">
              {post.image && (
                <Img
                  src={post.image}
                  alt={typeof post.title === "string" ? post.title : "Blog post"}
                  className="aspect-3/2 h-full w-full object-cover object-center"
                  optixFlowConfig={optixFlowConfig}
                />
              )}
            </div>
          </div>

          {(post.label || post.category) && (
            <div>
              <Badge variant="secondary">{post.label || post.category}</Badge>
            </div>
          )}
          {post.title && (
            typeof post.title === "string" ? (
              <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium wrap-break-word md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
                {post.title}
              </div>
            ) : (
              <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium wrap-break-word md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
                {post.title}
              </div>
            )
          )}
          {(post.summary || post.description) && (
            <div className="mb-4 line-clamp-2 text-sm text-muted-foreground md:mb-5 md:text-base">
              {post.summary || post.description}
            </div>
          )}
          {(post.author || post.authorAvatar) && (
            <div className="flex items-center gap-2">
              <Avatar className="size-12">
                {post.authorAvatar && <AvatarImage src={post.authorAvatar} />}
                <AvatarFallback>
                  {post.authorInitials || authorStr.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-px">
                {post.author && (
                  <span className="text-xs font-medium">{post.author}</span>
                )}
                {(post.published || post.date) && (
                  <span className="text-xs text-muted-foreground">
                    {post.published || post.date}
                  </span>
                )}
              </div>
            </div>
          )}
        </Pressable>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mb-8 md:mb-14 lg:mb-16", headerClassName)}>
          <div className="flex items-start justify-between gap-8">
            <div>
              {heading && (
                typeof heading === "string" ? (
                  <h2 className={cn("mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl", headingClassName)}>
                    {heading}
                  </h2>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                )
              )}
            </div>
          </div>
          {description && (
            typeof description === "string" ? (
              <p className={descriptionClassName}>{description}</p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        <div className={cn("grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3", postsClassName)}>
          {renderPosts()}
        </div>
        {(viewAllSlot || viewAllAction) && (
          <div className={cn("mt-8 flex flex-col items-center py-2 md:hidden", viewAllClassName)}>
            {renderViewAllAction()}
          </div>
        )}
      </div>
    </section>
  );
}
