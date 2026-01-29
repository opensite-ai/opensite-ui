"use client";

import * as React from "react";
import { useMemo } from "react";
import { Img } from "@page-speed/img";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ResourceListFeaturedArticlesFeaturedPost {
  /**
   * Featured post title
   */
  title: React.ReactNode;
  /**
   * Featured post image URL
   */
  imageUrl: string;
  /**
   * Featured post link URL
   */
  link: string;
  /**
   * Additional CSS classes for the featured post
   */
  className?: string;
}

export interface ResourceListFeaturedArticlesArticle {
  /**
   * Article date
   */
  date: React.ReactNode;
  /**
   * Article category
   */
  category: React.ReactNode;
  /**
   * Article title
   */
  title: React.ReactNode;
  /**
   * Article link URL
   */
  link: string;
  /**
   * Additional CSS classes for the article row
   */
  className?: string;
}

export interface ResourceListFeaturedArticlesProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Featured post configuration
   */
  featuredPost?: ResourceListFeaturedArticlesFeaturedPost;
  /**
   * Custom slot for rendering featured post (overrides featuredPost)
   */
  featuredPostSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the featured post container
   */
  featuredPostClassName?: string;
  /**
   * Badge text for the featured post
   */
  featuredBadgeText?: React.ReactNode;
  /**
   * Additional CSS classes for the featured badge
   */
  featuredBadgeClassName?: string;
  /**
   * Button text for the featured post CTA
   */
  featuredButtonText?: React.ReactNode;
  /**
   * Additional CSS classes for the featured button
   */
  featuredButtonClassName?: string;
  /**
   * Title for the articles section
   */
  articlesTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the articles title
   */
  articlesTitleClassName?: string;
  /**
   * Array of article configurations
   */
  articles?: ResourceListFeaturedArticlesArticle[];
  /**
   * Custom slot for rendering articles (overrides articles array)
   */
  articlesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the articles container
   */
  articlesClassName?: string;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

interface FeaturedPostComponentProps {
  title: React.ReactNode;
  imageUrl: string;
  link: string;
  badgeText: React.ReactNode;
  buttonText: React.ReactNode;
  className?: string;
  badgeClassName?: string;
  buttonClassName?: string;
  optixFlowConfig?: OptixFlowConfig;
  background?: SectionBackground;
}

const FeaturedPostComponent = ({
  title,
  imageUrl,
  link,
  badgeText,
  buttonText,
  className,
  badgeClassName,
  buttonClassName,
  optixFlowConfig,
  background,
}: FeaturedPostComponentProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-10 rounded-2xl p-10 xl:flex-row",
        getNestedCardBg(background),
        getNestedCardTextColor(background),
        className,
      )}
    >
      <div className="basis-full lg:basis-1/2">
        <div className="flex flex-col gap-5">
          <Badge
            variant="outline"
            className={cn("w-fit bg-background", badgeClassName)}
          >
            {badgeText}
          </Badge>
          {typeof title === "string" ? (
            <h2 className="text-2xl leading-[1.2] font-normal md:text-[2.5rem] xl:text-[3.125rem]">
              {title}
            </h2>
          ) : (
            <div className="text-2xl leading-[1.2] font-normal md:text-[2.5rem] xl:text-[3.125rem]">
              {title}
            </div>
          )}
          <div>
            <Pressable
              href={link}
              variant="default"
              asButton
              className={cn(
                "group relative mt-5 px-6 transition-all hover:pr-8 hover:pl-4",
                buttonClassName,
              )}
            >
              {buttonText}
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 transition-all group-hover:translate-x-1.5 group-hover:opacity-100"
              />
            </Pressable>
          </div>
        </div>
      </div>
      <div className="basis-full lg:basis-1/2">
        <div className="mx-auto aspect-[1.782729805] w-full max-w-160 overflow-hidden rounded-2xl">
          <Img
            src={imageUrl}
            alt={typeof title === "string" ? title : "Featured post"}
            className="block size-full object-cover object-center"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * ResourceListFeaturedArticles - A clean resource listing with a prominent featured post
 * section and a structured article list showing date, category, and title.
 *
 * Key features:
 * - Featured post card with large image, badge, title, and CTA button
 * - Article list with three-column layout (date, category, title)
 * - Hover effect on article rows for better interactivity
 * - Clean, minimal design with clear visual hierarchy
 * - Responsive layout adapting to different screen sizes
 *
 * Ideal for: Blog archives, resource libraries, documentation indexes,
 * knowledge bases, tutorial collections, and content hubs that want to
 * highlight a featured piece while providing easy access to other articles.
 */
export function ResourceListFeaturedArticles({
  className,
  featuredPost,
  featuredPostSlot,
  featuredPostClassName,
  featuredBadgeText,
  featuredBadgeClassName,
  featuredButtonText,
  featuredButtonClassName,
  articlesTitle,
  articlesTitleClassName,
  articles,
  articlesSlot,
  articlesClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ResourceListFeaturedArticlesProps) {
  const renderedFeaturedPost = useMemo(() => {
    if (featuredPostSlot) return featuredPostSlot;
    if (!featuredPost) return null;

    return (
      <FeaturedPostComponent
        {...featuredPost}
        className={featuredPostClassName}
        badgeText={featuredBadgeText}
        badgeClassName={featuredBadgeClassName}
        buttonText={featuredButtonText}
        buttonClassName={featuredButtonClassName}
        optixFlowConfig={optixFlowConfig}
        background={background}
      />
    );
  }, [featuredPostSlot, featuredPost, featuredPostClassName, featuredBadgeText, featuredBadgeClassName, featuredButtonText, featuredButtonClassName, optixFlowConfig, background]);

  const renderedArticles = useMemo(() => {
    if (articlesSlot) return articlesSlot;
    if (!articles || articles.length === 0) return null;

    return (
      <div className={articlesClassName}>
        {articles.map((article, index) => (
          <Pressable
            href={article.link}
            key={index}
            className={cn(
              "block w-full hover:bg-muted/50",
              article.className,
            )}
          >
            <div className="flex flex-col items-baseline justify-between gap-2 border-t py-6 md:flex-row">
              <div className="basis-1/4 font-medium text-muted-foreground">
                {typeof article.date === "string" ? article.date : article.date}
              </div>
              <div className="basis-1/4 text-muted-foreground">
                {typeof article.category === "string"
                  ? article.category
                  : article.category}
              </div>
              <div className="basis-1/2">
                {typeof article.title === "string"
                  ? article.title
                  : article.title}
              </div>
            </div>
          </Pressable>
        ))}
      </div>
    );
  }, [articlesSlot, articles, articlesClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      {renderedFeaturedPost}
      <div className="flex w-full flex-col gap-4">
        {articlesTitle &&
          (typeof articlesTitle === "string" ? (
            <h2
              className={cn(
                "mt-16 text-xl font-semibold",
                articlesTitleClassName,
              )}
            >
              {articlesTitle}
            </h2>
          ) : (
            <div className={cn("mt-16", articlesTitleClassName)}>
              {articlesTitle}
            </div>
          ))}
        {renderedArticles}
      </div>
    </Section>
  );
}
