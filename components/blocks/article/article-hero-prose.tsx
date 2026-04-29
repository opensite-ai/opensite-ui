"use client";

import { SocialShare } from "@page-speed/social-share";
import * as React from "react";
import { format } from "date-fns/format";
import { cn, getProseClassName } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import type { MarkdownStylesMap } from "@page-speed/markdown-to-jsx";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { LongformContent } from "@/components/ui/longform-content";

export interface ArticleHeroProsePost {
  title?: string;
  authorName?: string;
  authorHref?: string;
  image?: string;
  pubDate?: Date;
  description?: string;
  authorImage?: string;
}

export interface ArticleHeroProseProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header section
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the author information
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the hero media
   */
  heroImageClassName?: string;
  /**
   * Additional CSS classes for the prose content
   */
  proseClassName?: string;
  /**
   * Content metadata (title, author, media, etc.)
   */
  post?: ArticleHeroProsePost;
  /**
   * Custom slot for hero media (overrides post.image)
   */
  heroMediaSlot?: React.ReactNode;
  /**
   * Custom slot for author information (overrides post author fields)
   */
  authorSlot?: React.ReactNode;
  /**
   * Markdown string to render
   */
  markdownString?: string;
  /**
   * Custom className mappings for markdown elements
   * @example { h2: 'text-3xl font-bold', img: 'rounded-lg shadow-md' }
   */
  markdownStyles?: MarkdownStylesMap;
  /**
   * Date format string (date-fns format)
   * @default "MMMM d, yyyy"
   */
  dateFormat?: string;
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
   * Background pattern
   */
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /** Optional Section ID */
  sectionId?: string;
}

export function ArticleHeroProseComponent({
  sectionId = "article-hero-prose",
  post,
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
  authorClassName,
  heroImageClassName,
  proseClassName,
  heroMediaSlot,
  authorSlot,
  markdownString,
  markdownStyles,
  dateFormat = "MMMM d, yyyy",
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "hero",
  pattern,
  patternOpacity,
}: ArticleHeroProseProps) {
  const {
    title,
    authorName,
    authorHref,
    image,
    pubDate,
    description,
    authorImage,
  } = post ?? {};

  const authorContent = React.useMemo(() => {
    if (authorSlot) return authorSlot;
    if (!authorName) return null;

    return (
      <div
        className={cn(
          "flex items-center gap-3 text-sm md:text-base",
          authorClassName,
        )}
      >
        <Avatar className="h-8 w-8 border">
          {authorImage && <AvatarImage src={authorImage} />}
          <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span>
          <Pressable href={authorHref || "#"} className="font-semibold">
            {authorName}
          </Pressable>
          {pubDate && (
            <span className="ml-1">on {format(pubDate, dateFormat)}</span>
          )}
        </span>
      </div>
    );
  }, [
    authorSlot,
    authorName,
    authorImage,
    authorHref,
    pubDate,
    dateFormat,
    authorClassName,
  ]);

  const heroMediaContent = React.useMemo(() => {
    if (heroMediaSlot) return heroMediaSlot;
    if (!image) return null;

    return (
      <Img
        src={image}
        alt="Hero media"
        className={cn(
          "mt-4 mb-8 aspect-video w-full rounded-lg border object-cover",
          heroImageClassName,
        )}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [heroMediaSlot, image, heroImageClassName, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div
          className={cn(
            "mx-auto flex max-w-5xl flex-col items-center gap-4 text-center",
            headerClassName,
          )}
        >
          {title && (
            <h1
              className={cn(
                "max-w-full md:max-w-3xl text-2xl font-semibold text-balance md:text-5xl",
                titleClassName,
              )}
            >
              {title}
            </h1>
          )}
          {description && (
            <h3
              className={cn(
                "max-w-full md:max-w-3xl text-lg md:text-xl text-balance",
                descriptionClassName,
              )}
            >
              {description}
            </h3>
          )}
          {authorContent}
          {heroMediaContent}
        </div>
      </div>
      {markdownString && (
        <div className="flex flex-col items-center">
          <div
            className={cn(
              getProseClassName(background, "max-w-3xl"),
              "mx-auto",
              proseClassName,
            )}
          >
            <LongformContent
              renderMode="markdown"
              markdownString={markdownString}
              optixFlowConfig={optixFlowConfig}
              markdownStyles={markdownStyles}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-center py-12">
        <SocialShare
          variant="combo"
          postTitle={title as string}
          summaryContent={description as string}
        />
      </div>
    </Section>
  );
}

export { ArticleHeroProseComponent as ArticleHeroProse };
