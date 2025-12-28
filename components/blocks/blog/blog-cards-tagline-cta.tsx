"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, BlogPostItem, OptixFlowConfig } from "../../../src/types";

export interface BlogCardsTaglineCtaProps {
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
   * Action configuration for the main CTA button
   */
  ctaAction?: ActionConfig;
  /**
   * Custom slot for rendering the CTA action (overrides ctaAction)
   */
  ctaSlot?: React.ReactNode;
  /**
   * Array of blog post configurations
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering posts (overrides posts array)
   */
  postsSlot?: React.ReactNode;
  /**
   * Text for "Read more" links on each post
   */
  readMoreText?: React.ReactNode;
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
   * Additional CSS classes for the CTA action
   */
  ctaClassName?: string;
  /**
   * Additional CSS classes for the posts grid
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
    id: "post-1",
    title: "Getting Started with Opensite AI Components",
    summary:
      "Learn how to quickly integrate and customize Opensite AI components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
    label: "Tutorial",
    author: "Sarah Chen",
    published: "1 Jan 2024",
    href: "#",
    image: imagePlaceholders[0],
  },
  {
    id: "post-2",
    title: "Building Accessible Web Applications",
    summary:
      "Explore how to create inclusive web experiences using accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
    label: "Accessibility",
    author: "Marcus Rodriguez",
    published: "1 Jan 2024",
    href: "#",
    image: imagePlaceholders[1],
  },
  {
    id: "post-3",
    title: "Modern Design Systems with Tailwind CSS",
    summary:
      "Dive into creating scalable design systems using Tailwind CSS. Learn how to maintain consistency while building flexible and maintainable component libraries.",
    label: "Design Systems",
    author: "Emma Thompson",
    published: "1 Jan 2024",
    href: "#",
    image: imagePlaceholders[2],
  },
];

const defaultCtaAction: ActionConfig = {
  label: "View all articles",
  href: "#",
  variant: "link",
  iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />,
};

export function BlogCardsTaglineCta({
  badge = "Latest Updates",
  heading = "Blog Posts",
  description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  ctaAction = defaultCtaAction,
  ctaSlot,
  posts = defaultPosts,
  postsSlot,
  readMoreText = "Read more",
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  ctaClassName,
  postsClassName,
  postCardClassName,
  optixFlowConfig,
}: BlogCardsTaglineCtaProps): React.JSX.Element {
  const renderCtaAction = () => {
    if (ctaSlot) return ctaSlot;
    if (!ctaAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = ctaAction;
    return (
      <Pressable
        className={cn("w-full sm:w-auto inline-flex items-center", actionClassName, ctaClassName)}
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
      const postTitle = typeof post.title === "string" ? post.title : "Blog post";
      const postSummary = post.summary || post.description;

      return (
        <Card
          key={postId}
          className={cn("grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0", postCardClassName)}
        >
          {post.image && (
            <div className="aspect-video w-full">
              <Pressable
                href={postHref}
                className="transition-opacity duration-200 fade-in hover:opacity-70"
              >
                <Img
                  src={post.image}
                  alt={postTitle}
                  className="h-full w-full object-cover object-center"
                  optixFlowConfig={optixFlowConfig}
                />
              </Pressable>
            </div>
          )}
          <CardHeader>
            {post.title && (
              <h3 className="text-lg font-semibold hover:underline md:text-xl">
                <Pressable href={postHref}>{post.title}</Pressable>
              </h3>
            )}
          </CardHeader>
          <CardContent>
            {postSummary && (
              <p className="text-muted-foreground">{postSummary}</p>
            )}
          </CardContent>
          <CardFooter>
            <Pressable
              href={postHref}
              className="flex items-center text-foreground hover:underline"
            >
              {readMoreText}
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="ml-2"
              />
            </Pressable>
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container mx-auto flex flex-col items-center gap-16 lg:px-16", containerClassName)}>
        <div className={cn("text-center", headerClassName)}>
          {badge && (
            typeof badge === "string" ? (
              <Badge variant="secondary" className={cn("mb-6", badgeClassName)}>
                {badge}
              </Badge>
            ) : (
              <div className={cn("mb-6", badgeClassName)}>{badge}</div>
            )
          )}
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderCtaAction()}
        </div>
        <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8", postsClassName)}>
          {renderPosts()}
        </div>
      </div>
    </section>
  );
}
