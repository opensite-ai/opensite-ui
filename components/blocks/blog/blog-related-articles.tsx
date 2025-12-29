"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import type { ActionConfig, BlogPostItem, OptixFlowConfig } from "../../../src/types";

export interface BlogRelatedArticlesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Action configuration for the "See All" button
   */
  seeAllAction?: ActionConfig;
  /**
   * Custom slot for rendering the see all action (overrides seeAllAction)
   */
  seeAllSlot?: React.ReactNode;
  /**
   * Array of article/post configurations
   */
  articles?: BlogPostItem[];
  /**
   * Custom slot for rendering articles (overrides articles array)
   */
  articlesSlot?: React.ReactNode;
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
   * Additional CSS classes for the see all action
   */
  seeAllClassName?: string;
  /**
   * Additional CSS classes for the articles grid
   */
  articlesClassName?: string;
  /**
   * Additional CSS classes for individual article cards
   */
  articleCardClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultArticles: BlogPostItem[] = [
  {
    id: 1,
    title: "Getting Started with Modern Web Development",
    description:
      "Discover the essential tools and frameworks needed for modern web development. Learn about the latest technologies, best practices, and workflow optimization techniques for building robust web applications.",
    date: "March 15, 2024",
    category: "Web Development",
    href: "#",
  },
  {
    id: 2,
    title: "Understanding Frontend Design Principles",
    description:
      "Explore fundamental principles of frontend design and development. Learn about responsive layouts, user interface patterns, accessibility standards, and how to create engaging user experiences.",
    date: "March 12, 2024",
    category: "Frontend",
    href: "#",
  },
  {
    id: 3,
    title: "Backend Development Fundamentals Guide",
    description:
      "Master the core concepts of backend development including database design, API architecture, and server management. Learn how to build secure, efficient, and scalable backend systems.",
    date: "March 8, 2024",
    category: "Backend",
    href: "#",
  },
  {
    id: 4,
    title: "Advanced JavaScript Programming Concepts",
    description:
      "Deep dive into advanced JavaScript concepts including async programming, design patterns, and modern ES6+ features. Learn how to write clean, maintainable, and efficient JavaScript code.",
    date: "March 5, 2024",
    category: "Frontend",
    href: "#",
  },
];

const defaultSeeAllAction: ActionConfig = {
  label: "See all articles",
  href: "#",
  variant: "outline",
  size: "sm",
};

export function BlogRelatedArticles({
  heading = "Related articles",
  seeAllAction = defaultSeeAllAction,
  seeAllSlot,
  articles = defaultArticles,
  articlesSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  seeAllClassName,
  articlesClassName,
  articleCardClassName,
}: BlogRelatedArticlesProps): React.JSX.Element {
  const renderSeeAllAction = () => {
    if (seeAllSlot) return seeAllSlot;
    if (!seeAllAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = seeAllAction;
    return (
      <Pressable
        asButton
        className={cn("md:h-10 md:px-4 md:py-2", actionClassName, seeAllClassName)}
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

  const renderArticles = () => {
    if (articlesSlot) return articlesSlot;
    if (!articles || articles.length === 0) return null;

    return articles.map((item) => {
      const itemHref = item.href || item.url || item.link || "#";
      const itemId = item.id || String(item.title) || Math.random().toString();

      return (
        <Pressable
          key={itemId}
          href={itemHref}
          className={cn("flex flex-col gap-2", articleCardClassName)}
        >
          {(item.category || item.label) && (
            <span className="text-sm font-medium text-muted-foreground">
              {item.category || item.label}
            </span>
          )}
          {item.title && (
            typeof item.title === "string" ? (
              <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
            ) : (
              <div className="mb-1 text-lg font-semibold">{item.title}</div>
            )
          )}
          {(item.description || item.summary) && (
            <p className="mb-4 text-sm text-muted-foreground">
              {item.description || item.summary}
            </p>
          )}
          {(item.date || item.published) && (
            <span className="text-sm font-medium text-muted-foreground">
              {item.date || item.published}
            </span>
          )}
        </Pressable>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mb-8 flex flex-wrap items-center justify-between gap-1", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-2xl font-semibold md:text-4xl", headingClassName)}>{heading}</h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {renderSeeAllAction()}
        </div>
        <div className={cn("grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10", articlesClassName)}>
          {renderArticles()}
        </div>
      </div>
    </section>
  );
}
