"use client";

import * as React from "react";
import { Fragment, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface ResourceListNewsUpdatesItem {
  /**
   * News item title
   */
  title: React.ReactNode;
  /**
   * Category label for the news item
   */
  category: React.ReactNode;
  /**
   * Avatar image URL
   */
  avatar: string;
  /**
   * Date string or ReactNode
   */
  date: React.ReactNode;
  /**
   * Link URL for the news item
   */
  link: string;
  /**
   * Additional CSS classes for the news item row
   */
  className?: string;
}

export interface ResourceListNewsUpdatesProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Section label with accent dot indicator
   */
  sectionLabel?: React.ReactNode;
  /**
   * Additional CSS classes for the section label
   */
  sectionLabelClassName?: string;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Subtitle/secondary heading content
   */
  subtitle?: React.ReactNode;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Array of news item configurations
   */
  news?: ResourceListNewsUpdatesItem[];
  /**
   * Custom slot for rendering news items (overrides news array)
   */
  newsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the news list container
   */
  newsClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
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

/**
 * ResourceListNewsUpdates - A news and updates listing with animated hover effects,
 * category badges, author avatars, and dates in a clean two-column layout.
 *
 * Key features:
 * - Section label with accent dot indicator
 * - Two-line title with primary/muted color split
 * - News items with hover slide animation and background highlight
 * - Category labels, author avatars, and dates for each item
 * - Arrow icon appears on hover for visual feedback
 * - Separator lines between items for clear visual structure
 *
 * Ideal for: Company news sections, press release archives, update logs,
 * announcement pages, changelog displays, and any content that benefits
 * from a timeline-style presentation with author attribution.
 */
export function ResourceListNewsUpdates({
  className,
  sectionLabel,
  sectionLabelClassName,
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  news,
  newsSlot,
  newsClassName,
  contentClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ResourceListNewsUpdatesProps) {
  const renderedNews = useMemo(() => {
    if (newsSlot) return newsSlot;
    if (!news || news.length === 0) return null;

    return (
      <div className={cn("mt-14", newsClassName)}>
        <Separator />
        {news.map((item, idx) => (
          <Fragment key={idx}>
            <Pressable
              href={item.link}
              className={cn(
                "group flex flex-col justify-between gap-10 py-6 transition-all duration-400 lg:flex-row lg:items-center lg:hover:bg-muted",
                item.className,
              )}
            >
              <div className="flex items-center gap-2 text-lg transition-all duration-400 lg:group-hover:translate-x-8">
                <p className="inline text-pretty text-primary">
                  {item.title}
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="ml-2 inline shrink-0 opacity-0 transition-all duration-400 lg:group-hover:text-primary lg:group-hover:opacity-100"
                  />
                </p>
              </div>
              <div className="flex w-full items-center justify-between transition-all duration-400 lg:max-w-72 lg:group-hover:-translate-x-4 xl:max-w-80">
                {typeof item.category === "string" ? (
                  <p className="text-xs text-muted-foreground">
                    {item.category}
                  </p>
                ) : (
                  item.category
                )}
                <div className="flex items-center gap-2">
                  <Avatar className="size-7 rounded-full border border-border">
                    <AvatarImage src={item.avatar} />
                  </Avatar>
                  {typeof item.date === "string" ? (
                    <time className="text-xs text-muted-foreground">
                      {item.date}
                    </time>
                  ) : (
                    item.date
                  )}
                </div>
              </div>
            </Pressable>
            <Separator />
          </Fragment>
        ))}
      </div>
    );
  }, [newsSlot, news, newsClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div
        className={cn(
          "flex flex-col items-start justify-between gap-5 lg:flex-row lg:gap-2",
          contentClassName,
        )}
      >
        {sectionLabel && (
          <div
            className={cn(
              "flex w-full max-w-56 items-center gap-3 text-sm",
              sectionLabelClassName,
            )}
          >
            <span className="size-2 rounded-full bg-primary"></span>
            {typeof sectionLabel === "string" ? sectionLabel : sectionLabel}
          </div>
        )}
        <div className="flex-1">
          {(title || subtitle) && (
            <h2 className={cn("text-3xl", titleClassName)}>
              {typeof title === "string" ? title : <span>{title}</span>}
              {subtitle && (
                <>
                  <br />
                  {typeof subtitle === "string" ? (
                    <span className={cn("text-primary/50", subtitleClassName)}>
                      {subtitle}
                    </span>
                  ) : (
                    <span className={subtitleClassName}>{subtitle}</span>
                  )}
                </>
              )}
            </h2>
          )}
          {renderedNews}
        </div>
      </div>
    </Section>
  );
}
