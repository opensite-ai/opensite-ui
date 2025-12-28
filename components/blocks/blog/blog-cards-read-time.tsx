"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, BlogPostItem, OptixFlowConfig } from "../../../src/types";

export interface BlogCardsReadTimeProps {
  /**
   * Badge/tagline content above heading
   */
  badge?: React.ReactNode;
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
   * Action configuration for the "View All" button
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
   * Additional CSS classes for the header content wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
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

const defaultPosts: BlogPostItem[] = [
  {
    id: "post-1",
    title: "How to build a successful brand and business online in 2024",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "John Doe",
    authorAvatar: imagePlaceholders[10],
    readTime: "10 Min Read",
    href: "#",
    image: imagePlaceholders[0],
  },
  {
    id: "post-2",
    title: "The difference between UI and UX and how to design for both",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Jane Doe",
    authorAvatar: imagePlaceholders[11],
    readTime: "14 Min Read",
    href: "#",
    image: imagePlaceholders[1],
  },
  {
    id: "post-3",
    title: "Optimizing your website for SEO and getting more traffic",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Jane Smith",
    authorAvatar: imagePlaceholders[12],
    readTime: "9 Min Read",
    href: "#",
    image: imagePlaceholders[2],
  },
];

const defaultViewAllAction: ActionConfig = {
  label: "View All Blogs",
  href: "#",
  variant: "outline",
  iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2 h-full w-4" />,
};

export function BlogCardsReadTime({
  badge = (
    <Badge variant="outline" className="gap-1 py-1">
      <DynamicIcon name="lucide/file-text" size={16} className="h-full w-4" /> Our Blogs
    </Badge>
  ),
  heading = "Discover the latest trends",
  description = "Explore our blog for insightful articles, personal reflections and ideas that inspire action on the topics you care about.",
  posts = defaultPosts,
  postsSlot,
  viewAllAction = defaultViewAllAction,
  viewAllSlot,
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  postsClassName,
  postCardClassName,
  viewAllClassName,
  optixFlowConfig,
}: BlogCardsReadTimeProps): React.JSX.Element {
  const renderViewAllAction = () => {
    if (viewAllSlot) return viewAllSlot;
    if (!viewAllAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = viewAllAction;
    return (
      <Pressable
        asButton
        className={actionClassName}
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
      
      return (
        <Pressable 
          key={postId} 
          className={cn("rounded-xl border", postCardClassName)} 
          href={postHref}
        >
          <div className="p-2">
            {post.image && (
              <Img
                src={post.image}
                alt={typeof post.title === "string" ? post.title : "Blog post"}
                className="aspect-video w-full rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
          <div className="px-3 pt-2 pb-4">
            {post.title && (
              typeof post.title === "string" ? (
                <h2 className="mb-1 font-medium">{post.title}</h2>
              ) : (
                <div className="mb-1 font-medium">{post.title}</div>
              )
            )}
            {(post.summary || post.description) && (
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {post.summary || post.description}
              </p>
            )}
            <Separator className="my-5" />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-9 rounded-full ring-1 ring-input">
                  {post.authorAvatar && (
                    <AvatarImage src={post.authorAvatar} alt={typeof post.author === "string" ? post.author : "Author"} />
                  )}
                </Avatar>
                {post.author && (
                  <span className="text-sm font-medium">{post.author}</span>
                )}
              </div>
              {post.readTime && (
                <Badge variant="secondary" className="h-fit">
                  {post.readTime}
                </Badge>
              )}
            </div>
          </div>
        </Pressable>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto flex max-w-3xl flex-col items-center gap-4 text-center", headerClassName)}>
          {badge && (
            <div className={badgeClassName}>
              {typeof badge === "string" ? (
                <Badge variant="outline" className="gap-1 py-1">
                  <DynamicIcon name="lucide/file-text" size={16} className="h-full w-4" /> {badge}
                </Badge>
              ) : (
                badge
              )}
            </div>
          )}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-4xl font-semibold text-balance", headingClassName)}>{heading}</h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-muted-foreground", descriptionClassName)}>{description}</p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        <div className={cn("mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3", postsClassName)}>
          {renderPosts()}
        </div>
        {(viewAllSlot || viewAllAction) && (
          <div className={cn("mt-10 flex justify-center", viewAllClassName)}>
            {renderViewAllAction()}
          </div>
        )}
      </div>
    </section>
  );
}
