"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  DetailItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CaseStudyProseSidebarProps {
  /**
   * Hero image URL
   */
  heroImageSrc?: string;
  /**
   * Hero image alt text
   */
  heroImageAlt?: string;
  /**
   * Custom slot for hero media (overrides heroImageSrc)
   */
  heroMediaSlot?: React.ReactNode;
  /**
   * Main prose content
   */
  content?: React.ReactNode;
  /**
   * Custom slot for content (overrides content prop)
   */
  contentSlot?: React.ReactNode;
  /**
   * Logo image URL
   */
  companyLogoSrc?: string;
  /**
   * Logo image alt text
   */
  companyLogoAlt?: string;
  /**
   * Custom slot for logo (overrides companyLogoSrc)
   */
  companyLogoSlot?: React.ReactNode;
  /**
   * Array of detail items for the sidebar
   */
  details?: DetailItem[];
  /**
   * Custom slot for entire sidebar (overrides all sidebar props)
   */
  sidebarSlot?: React.ReactNode;
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
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the article/main content area
   */
  articleClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  heroImageClassName?: string;
  /**
   * Additional CSS classes for the prose content
   */
  proseClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the sidebar card
   */
  sidebarCardClassName?: string;
  /**
   * Additional CSS classes for the company logo
   */
  companyLogoClassName?: string;
  /**
   * Additional CSS classes for detail items
   */
  detailItemClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * CaseStudyProseSidebar displays an article with rich prose content
 * and a sidebar containing contextual information.
 *
 * Features a two-column layout with the main article content on the left (including
 * hero image, headings, paragraphs, blockquotes, lists, and tables) and a sticky
 * sidebar on the right with logo and flexible detail items. The sidebar
 * uses an accent background with organized sections.
 *
 * Ideal for long-form content pages, detailed articles, or comprehensive narratives
 * that need supplementary context alongside the main content.
 *
 * @example
 * ```tsx
 * <CaseStudyProseSidebar
 *   heroImageSrc="/images/hero.jpg"
 *   companyLogoSrc="/logos/logo.svg"
 *   details={[
 *     { label: "Organization", value: "Leading platform" },
 *     { label: "Category", value: "Technology" },
 *     { label: "Location", value: "San Francisco, CA" },
 *     { label: "Website", value: "example.com", href: "https://example.com" }
 *   ]}
 * />
 * ```
 */
export function CaseStudyProseSidebar({
  heroImageSrc,
  heroImageAlt,
  heroMediaSlot,
  content,
  contentSlot,
  companyLogoSrc,
  companyLogoAlt,
  companyLogoSlot,
  details,
  sidebarSlot,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  articleClassName,
  heroImageClassName,
  proseClassName,
  sidebarClassName,
  sidebarCardClassName,
  companyLogoClassName,
  detailItemClassName,
  optixFlowConfig,
}: CaseStudyProseSidebarProps): React.JSX.Element {
  const heroMediaContent = useMemo(() => {
    if (heroMediaSlot) return heroMediaSlot;
    if (!heroImageSrc) return null;

    return (
      <Img
        src={heroImageSrc}
        alt={heroImageAlt}
        className={cn("mb-8 aspect-video w-full max-w-3xl rounded-lg border object-cover", heroImageClassName)}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [heroMediaSlot, heroImageSrc, heroImageAlt, heroImageClassName, optixFlowConfig]);

  const contentArea = useMemo(() => {
    if (contentSlot) return contentSlot;
    if (!content) return null;

    return (
      <div className={cn("prose dark:prose-invert", proseClassName)}>
        {content}
      </div>
    );
  }, [contentSlot, content, proseClassName]);

  const logoContent = useMemo(() => {
    if (companyLogoSlot) return companyLogoSlot;
    if (!companyLogoSrc) return null;

    return (
      <div className="mb-8 px-6">
        <Img
          src={companyLogoSrc}
          alt={companyLogoAlt}
          className={cn("max-h-8 w-full", companyLogoClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  }, [companyLogoSlot, companyLogoSrc, companyLogoAlt, companyLogoClassName, optixFlowConfig]);

  const renderDetailItem = useCallback((detail: DetailItem, index: number, isFirstAfterBorder: boolean = false) => {
    const baseClassName = isFirstAfterBorder
      ? "mb-5 w-full border-t border-border px-6 pt-5 last:mb-0"
      : "mb-5 px-6 last:mb-0";

    return (
      <div key={index} className={cn(baseClassName, detail.className, detailItemClassName)}>
        <div className="mb-2 text-xs font-semibold">
          {detail.label}
        </div>
        <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
          {detail.href ? (
            <Pressable href={detail.href} className="underline hover:text-foreground">
              {detail.value}
            </Pressable>
          ) : (
            detail.value
          )}
        </div>
      </div>
    );
  }, [detailItemClassName]);

  const detailsContent = useMemo(() => {
    if (!details || details.length === 0) return null;

    return details.map((detail, index) => {
      const isFirstAfterBorder = index === 2;
      return renderDetailItem(detail, index, isFirstAfterBorder);
    });
  }, [details, renderDetailItem]);

  const sidebarContent = useMemo(() => {
    if (sidebarSlot) return sidebarSlot;
    if (!logoContent && !detailsContent) return null;

    return (
      <aside className={cn("lg:max-w-[300px]", sidebarClassName)}>
        <div className={cn("flex flex-col items-start rounded-lg border border-border bg-accent py-6 md:py-8", sidebarCardClassName)}>
          {logoContent}
          {detailsContent}
        </div>
      </aside>
    );
  }, [sidebarSlot, logoContent, detailsContent, sidebarClassName, sidebarCardClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container flex flex-col gap-12 lg:flex-row lg:gap-24", containerClassName)}>
        <article className={cn("mx-auto", articleClassName)}>
          {heroMediaContent}
          {contentArea}
        </article>
        {sidebarContent}
      </div>
    </Section>
  );
}
