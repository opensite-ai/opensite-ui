"use client";

import * as React from "react";
import { useState } from "react";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface ResourceListFeaturedGridArticle {
  /**
   * Article title
   */
  title: React.ReactNode;
  /**
   * Category value for filtering (must be string for deterministic filtering)
   */
  category: string;
  /**
   * Category display label (can be ReactNode for custom rendering)
   */
  categoryLabel?: React.ReactNode;
  /**
   * Article date
   */
  date: React.ReactNode;
  /**
   * Author avatar URLs
   */
  author: string[];
  /**
   * Article link URL
   */
  link: string;
  /**
   * Additional CSS classes for the article row
   */
  className?: string;
}

export interface ResourceListFeaturedGridFeaturedArticle {
  /**
   * Featured article title
   */
  title: React.ReactNode;
  /**
   * Featured article image URL
   */
  imageUrl: string;
  /**
   * Featured article date
   */
  date: React.ReactNode;
  /**
   * Author avatar URLs
   */
  authors: string[];
  /**
   * Featured article link URL
   */
  link: string;
  /**
   * Badge text for the featured article
   */
  badge?: React.ReactNode;
  /**
   * Additional CSS classes for the featured article card
   */
  className?: string;
}

export interface ResourceListFeaturedGridCategory {
  /**
   * Category value for filtering (must be string for deterministic filtering)
   */
  value: string;
  /**
   * Category display label (can be ReactNode for custom rendering)
   */
  label: React.ReactNode;
}

export interface ResourceListFeaturedGridProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Featured article configuration
   */
  featuredArticle?: ResourceListFeaturedGridFeaturedArticle;
  /**
   * Custom slot for rendering featured article (overrides featuredArticle)
   */
  featuredArticleSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the featured article container
   */
  featuredArticleClassName?: string;
  /**
   * Secondary article configurations
   */
  secondaryArticles?: ResourceListFeaturedGridFeaturedArticle[];
  /**
   * Custom slot for rendering secondary articles (overrides secondaryArticles)
   */
  secondaryArticlesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the secondary articles container
   */
  secondaryArticlesClassName?: string;
  /**
   * Article configurations for the filtered list
   */
  articles?: ResourceListFeaturedGridArticle[];
  /**
   * Custom slot for rendering articles (overrides articles array)
   */
  articlesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the articles container
   */
  articlesClassName?: string;
  /**
   * Category configurations for filtering
   */
  categories?: ResourceListFeaturedGridCategory[];
  /**
   * Additional CSS classes for the categories tabs
   */
  categoriesClassName?: string;
  /**
   * Title for the latest updates section
   */
  latestUpdatesTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the latest updates title
   */
  latestUpdatesTitleClassName?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

/**
 * ResourceListFeaturedGrid - A visually rich resource listing with featured article hero,
 * secondary article cards, and a tabbed category filter for browsing articles.
 *
 * Key features:
 * - Large featured article with image overlay, badge, and author avatars
 * - Two secondary article cards with grayscale-to-color hover effect
 * - Tabbed category filtering (All, Data, AI, Security, News, etc.)
 * - Article list with title, category, date, and author avatars
 * - Responsive grid layout with hover animations
 *
 * Ideal for: Resource centers, whitepapers libraries, research publications,
 * tech blogs, news portals, and content hubs that want to highlight featured
 * content while providing easy category-based navigation.
 */
export function ResourceListFeaturedGrid({
  className,
  title,
  titleClassName,
  description,
  descriptionClassName,
  featuredArticle,
  featuredArticleSlot,
  featuredArticleClassName,
  secondaryArticles,
  secondaryArticlesSlot,
  secondaryArticlesClassName,
  articles,
  articlesSlot,
  articlesClassName,
  categories,
  categoriesClassName,
  latestUpdatesTitle,
  latestUpdatesTitleClassName,
  gridClassName,
  optixFlowConfig,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: ResourceListFeaturedGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = articles?.filter(
    (article) =>
      selectedCategory === "All" || article.category === selectedCategory
  ) ?? [];

  const renderFeaturedArticle = () => {
    if (featuredArticleSlot) return featuredArticleSlot;
    if (!featuredArticle) return null;

    return (
      <Pressable
        href={featuredArticle.link}
        className={cn(
          "group relative isolate overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-0.5 lg:col-span-7 lg:row-span-2",
          featuredArticleClassName,
          featuredArticle.className
        )}
      >
        <Img
          src={featuredArticle.imageUrl}
          alt={typeof featuredArticle.title === "string" ? featuredArticle.title : "Featured article"}
          className="size-full max-h-[550px] object-cover grayscale-100 transition-all duration-300 group-hover:grayscale-50"
          optixFlowConfig={optixFlowConfig}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
          {featuredArticle.badge && (
            <Badge className="w-fit border border-background/20 bg-background/15 backdrop-blur-sm">
              <DynamicIcon name="lucide/sparkles" size={16} className="mr-1" />
              {featuredArticle.badge}
            </Badge>
          )}
          <div className="flex flex-col gap-4">
            {typeof featuredArticle.title === "string" ? (
              <h2 className="text-xl font-medium text-background">
                {featuredArticle.title}
              </h2>
            ) : (
              <div className="text-xl font-medium text-background">
                {featuredArticle.title}
              </div>
            )}
            <div className="flex items-center gap-2">
              {typeof featuredArticle.date === "string" ? (
                <time className="text-sm text-background/80">
                  {featuredArticle.date}
                </time>
              ) : (
                <span className="text-sm text-background/80">
                  {featuredArticle.date}
                </span>
              )}
              <div className="flex items-center -space-x-2">
                {featuredArticle.authors.map((author, idx) => (
                  <Avatar key={idx} className="size-6 border border-primary">
                    <AvatarImage src={author} />
                  </Avatar>
                ))}
                {featuredArticle.authors.length > 2 && (
                  <span className="z-10 grid size-6 place-items-center rounded-full border border-primary bg-primary/90 text-xs text-background backdrop-blur-sm">
                    +{featuredArticle.authors.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Pressable>
    );
  };

  const renderSecondaryArticles = () => {
    if (secondaryArticlesSlot) return secondaryArticlesSlot;
    if (!secondaryArticles || secondaryArticles.length === 0) return null;

    return (
      <div className={cn("flex flex-col gap-4 lg:col-span-5 lg:row-span-2 lg:flex-col", secondaryArticlesClassName)}>
        {secondaryArticles.map((article, idx) => (
          <Pressable
            key={idx}
            href={article.link}
            className={cn(
              "group relative isolate overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-0.5",
              article.className
            )}
          >
            <Img
              src={article.imageUrl}
              alt={typeof article.title === "string" ? article.title : "Article"}
              className="size-full max-h-[267px] object-cover grayscale-100 transition-all duration-300 group-hover:grayscale-50"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
              {article.badge && (
                <Badge className="w-fit border border-background/20 bg-background/15 backdrop-blur-sm">
                  {article.badge}
                </Badge>
              )}
              <div className="flex flex-col gap-4">
                {typeof article.title === "string" ? (
                  <h2 className="text-xl font-medium text-background">
                    {article.title}
                  </h2>
                ) : (
                  <div className="text-xl font-medium text-background">
                    {article.title}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {typeof article.date === "string" ? (
                    <time className="text-sm text-background/80">
                      {article.date}
                    </time>
                  ) : (
                    <span className="text-sm text-background/80">
                      {article.date}
                    </span>
                  )}
                  {article.authors.map((author, authorIdx) => (
                    <Avatar key={authorIdx} className="size-6 border border-primary">
                      <AvatarImage src={author} />
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </Pressable>
        ))}
      </div>
    );
  };

  const renderArticles = () => {
    if (articlesSlot) return articlesSlot;
    if (filteredArticles.length === 0) return null;

    return (
      <div className={cn("mt-4", articlesClassName)}>
        {filteredArticles.map((article, idx) => (
          <Pressable
            key={idx}
            href={article.link}
            className={cn(
              "flex flex-col justify-between gap-4 border-b border-border py-6 md:flex-row",
              article.className
            )}
          >
            {typeof article.title === "string" ? (
              <h3 className="font-medium md:line-clamp-1">{article.title}</h3>
            ) : (
              <div className="font-medium md:line-clamp-1">{article.title}</div>
            )}
            <div className="flex w-full shrink-0 grid-cols-3 justify-between gap-2 md:grid md:max-w-80">
              <p className="text-sm text-muted-foreground">
                {article.categoryLabel ?? article.category}
              </p>
              {typeof article.date === "string" ? (
                <time className="text-sm text-muted-foreground">
                  {article.date}
                </time>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {article.date}
                </span>
              )}
              <div className="hidden items-center justify-end -space-x-2 md:flex">
                {article.author.map((author, authorIdx) => (
                  <Avatar key={authorIdx} className="size-6 border border-border">
                    <AvatarImage src={author} />
                  </Avatar>
                ))}
              </div>
            </div>
          </Pressable>
        ))}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      {title && (
        typeof title === "string" ? (
          <h1 className={cn("text-4xl font-medium sm:text-6xl md:text-7xl", titleClassName)}>
            {title}
          </h1>
        ) : (
          <div className={titleClassName}>{title}</div>
        )
      )}
      {description && (
        typeof description === "string" ? (
          <p className={cn("mt-4 text-lg text-muted-foreground", descriptionClassName)}>{description}</p>
        ) : (
          <div className={cn("mt-4", descriptionClassName)}>{description}</div>
        )
      )}
      <div className={cn("mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12", gridClassName)}>
        {renderFeaturedArticle()}
        {renderSecondaryArticles()}
      </div>
      <div className="mt-24">
        {latestUpdatesTitle && (
          typeof latestUpdatesTitle === "string" ? (
            <h2 className={cn("mb-6 text-2xl font-medium md:text-3xl", latestUpdatesTitleClassName)}>
              {latestUpdatesTitle}
            </h2>
          ) : (
            <div className={cn("mb-6", latestUpdatesTitleClassName)}>{latestUpdatesTitle}</div>
          )
        )}
        <Tabs
          defaultValue="All"
          className={cn("border-b border-border", categoriesClassName)}
          onValueChange={setSelectedCategory}
        >
          <TabsList className="flex h-auto gap-2 bg-background p-0">
            {categories?.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="group relative py-2.5 uppercase data-[state=active]:shadow-none"
              >
                {category.label}
                <span className="absolute -bottom-px group-data-[state=active]:h-px group-data-[state=active]:w-full group-data-[state=active]:bg-primary" />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {renderArticles()}
      </div>
    </Section>
  );
}
