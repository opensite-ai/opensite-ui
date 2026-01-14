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

export function BlogRelatedArticles({
  heading,
  seeAllAction,
  seeAllSlot,
  articles,
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
