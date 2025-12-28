"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, BlogPostItem, OptixFlowConfig } from "../../../src/types";

export interface BlogGridNinePostsProps {
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
   * Action configuration for the CTA button (mobile)
   */
  ctaAction?: ActionConfig;
  /**
   * Custom slot for rendering the CTA action (overrides ctaAction)
   */
  ctaSlot?: React.ReactNode;
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
   * Additional CSS classes for the CTA container
   */
  ctaClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultPosts: BlogPostItem[] = [
  {
    id: "post-1",
    title: "The Future of Web Development: What's Next in 2024",
    summary:
      "Explore the latest trends in web development, from AI-powered tools to new frameworks that are reshaping how we build the web.",
    label: "Web Development",
    author: "Sarah Chen",
    published: "15 Jan 2024",
    href: "#",
    image: imagePlaceholders[0],
  },
  {
    id: "post-2",
    title: "Building Scalable APIs with Modern Architecture Patterns",
    summary:
      "Learn about microservices, GraphQL, and event-driven architectures that are powering today's most successful applications.",
    label: "Backend",
    author: "Marcus Rodriguez",
    published: "12 Jan 2024",
    href: "#",
    image: imagePlaceholders[1],
  },
  {
    id: "post-3",
    title: "Design Systems: Creating Consistency at Scale",
    summary:
      "How leading companies are implementing design systems to maintain visual consistency across products.",
    label: "Design",
    author: "Emma Thompson",
    published: "10 Jan 2024",
    href: "#",
    image: imagePlaceholders[2],
  },
  {
    id: "post-4",
    title: "Machine Learning in Production: Best Practices for Deployment",
    summary:
      "From model versioning to monitoring and scaling, learn the essential practices for deploying ML models.",
    label: "Machine Learning",
    author: "Alex Kim",
    published: "8 Jan 2024",
    href: "#",
    image: imagePlaceholders[3],
  },
  {
    id: "post-5",
    title: "The Rise of Edge Computing: Transforming Application Architecture",
    summary:
      "Discover how edge computing is revolutionizing application performance and user experience.",
    label: "Cloud Computing",
    author: "David Park",
    published: "5 Jan 2024",
    href: "#",
    image: imagePlaceholders[4],
  },
  {
    id: "post-6",
    title: "Cybersecurity Essentials for Modern Applications",
    summary:
      "Essential security practices every developer should implement, from authentication to encryption.",
    label: "Security",
    author: "Lisa Wang",
    published: "3 Jan 2024",
    href: "#",
    image: imagePlaceholders[5],
  },
  {
    id: "post-7",
    title: "Performance Optimization: Techniques for Faster Web Applications",
    summary:
      "Advanced techniques for optimizing web application performance, including code splitting and caching.",
    label: "Performance",
    author: "James Wilson",
    published: "1 Jan 2024",
    href: "#",
    image: imagePlaceholders[6],
  },
  {
    id: "post-8",
    title: "DevOps Culture: Building Better Software Delivery Pipelines",
    summary:
      "How to foster a DevOps culture and implement CI/CD pipelines that accelerate development.",
    label: "DevOps",
    author: "Maria Garcia",
    published: "29 Dec 2023",
    href: "#",
    image: imagePlaceholders[7],
  },
  {
    id: "post-9",
    title: "Mobile App Development: Native vs Cross-Platform Solutions",
    summary:
      "Compare native and cross-platform development approaches, exploring trade-offs and best practices.",
    label: "Mobile Development",
    author: "Ryan Johnson",
    published: "27 Dec 2023",
    href: "#",
    image: imagePlaceholders[8],
  },
];

const defaultCtaAction: ActionConfig = {
  label: "View all posts",
  href: "#",
};

export function BlogGridNinePosts({
  heading = "Blog",
  description = "Insights, tutorials, and thoughts on modern software development",
  posts = defaultPosts,
  postsSlot,
  ctaAction = defaultCtaAction,
  ctaSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  postsClassName,
  postCardClassName,
  ctaClassName,
  optixFlowConfig,
}: BlogGridNinePostsProps): React.JSX.Element {
  const renderCtaAction = () => {
    if (ctaSlot) return ctaSlot;
    if (!ctaAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = ctaAction;
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
            <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium wrap-break-word md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
              {post.title}
            </div>
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
                  {post.authorInitials || authorStr.split(" ").map((n) => n[0]).join("")}
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
        {(ctaSlot || ctaAction) && (
          <div className={cn("mt-8 flex flex-col items-center py-2 md:hidden", ctaClassName)}>
            {renderCtaAction()}
          </div>
        )}
      </div>
    </section>
  );
}
