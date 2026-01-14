"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { DetailItem, OptixFlowConfig } from "../../../src/types";

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
   * Company logo URL
   */
  companyLogoSrc?: string;
  /**
   * Company logo alt text
   */
  companyLogoAlt?: string;
  /**
   * Custom slot for company logo (overrides companyLogoSrc)
   */
  companyLogoSlot?: React.ReactNode;
  /**
   * Array of detail items for the sidebar (replaces individual company props)
   */
  details?: DetailItem[];
  /**
   * Custom slot for entire sidebar (overrides all sidebar props)
   */
  sidebarSlot?: React.ReactNode;
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
 * CaseStudyProseSidebar displays a case study article with rich prose content
 * and a sidebar containing company information.
 *
 * Features a two-column layout with the main article content on the left (including
 * hero image, headings, paragraphs, blockquotes, lists, and tables) and a sticky
 * sidebar on the right with company logo and flexible detail items. The sidebar
 * uses an accent background with organized sections.
 *
 * Ideal for detailed case study pages, customer success stories, or in-depth
 * articles that need supplementary company context alongside the main narrative.
 *
 * @example
 * ```tsx
 * <CaseStudyProseSidebar
 *   heroImageSrc="/images/case-study-hero.jpg"
 *   companyLogoSrc="/logos/techcorp.svg"
 *   details={[
 *     { label: "Company", value: "Leading enterprise software company" },
 *     { label: "Industry", value: "Technology" },
 *     { label: "Location", value: "San Francisco, CA" },
 *     { label: "Website", value: "techcorp.com", href: "https://techcorp.com" }
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
  const renderHeroMedia = () => {
    if (heroMediaSlot) return heroMediaSlot;

    return (
      <Img
        src={heroImageSrc}
        alt={heroImageAlt}
        className={cn("mb-8 aspect-video w-full max-w-3xl rounded-lg border object-cover", heroImageClassName)}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderContent = () => {
    if (contentSlot) return contentSlot;

    return (
      <div className={cn("prose dark:prose-invert", proseClassName)}>
        {content}
      </div>
    );
  };

  const renderCompanyLogo = () => {
    if (companyLogoSlot) return companyLogoSlot;

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
  };

  const renderDetailItem = (detail: DetailItem, index: number, isFirstAfterBorder: boolean = false) => {
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
  };

  const renderDetails = () => {
    if (!details || details.length === 0) return null;

    return details.map((detail, index) => {
      const isFirstAfterBorder = index === 2;
      return renderDetailItem(detail, index, isFirstAfterBorder);
    });
  };

  const renderSidebar = () => {
    if (sidebarSlot) return sidebarSlot;

    return (
      <aside className={cn("lg:max-w-[300px]", sidebarClassName)}>
        <div className={cn("flex flex-col items-start rounded-lg border border-border bg-accent py-6 md:py-8", sidebarCardClassName)}>
          {renderCompanyLogo()}
          {renderDetails()}
        </div>
      </aside>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container flex flex-col gap-12 lg:flex-row lg:gap-24", containerClassName)}>
        <article className={cn("mx-auto", articleClassName)}>
          {renderHeroMedia()}
          {renderContent()}
        </article>
        {renderSidebar()}
      </div>
    </section>
  );
}
