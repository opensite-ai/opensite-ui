"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getProseClassName } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbItemUI,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  BreadcrumbItem,
  StatItem,
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CaseStudyStatsMetricsProps {
  /**
   * Array of breadcrumb items for navigation
   */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * Custom slot for breadcrumbs (overrides breadcrumbs array)
   */
  breadcrumbsSlot?: React.ReactNode;
  /**
   * Main title/heading content
   */
  title?: React.ReactNode;
  /**
   * Subtitle/description below the title
   */
  subtitle?: React.ReactNode;
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
   * Array of stat items to display
   */
  stats?: StatItem[];
  /**
   * Custom slot for stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
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
   * Overview text for sidebar
   */
  overview?: React.ReactNode;
  /**
   * Category text
   */
  sector?: React.ReactNode;
  /**
   * Badge label
   */
  solutionLabel?: React.ReactNode;
  /**
   * Badge icon name or custom element
   */
  solutionIcon?: React.ReactNode | string;
  /**
   * Badge href
   */
  solutionHref?: string;
  /**
   * Custom slot for badge (overrides solution props)
   */
  solutionSlot?: React.ReactNode;
  /**
   * CTA action configuration
   */
  ctaAction?: ActionConfig;
  /**
   * Custom slot for CTA (overrides ctaAction)
   */
  ctaSlot?: React.ReactNode;
  /**
   * Label text above CTA
   */
  ctaLabel?: React.ReactNode;
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
   * Additional CSS classes for the main content wrapper
   */
  contentWrapperClassName?: string;
  /**
   * Additional CSS classes for the layout wrapper
   */
  layoutClassName?: string;
  /**
   * Additional CSS classes for the main column
   */
  mainClassName?: string;
  /**
   * Additional CSS classes for the breadcrumbs
   */
  breadcrumbsClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  heroImageClassName?: string;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for individual stat items
   */
  statItemClassName?: string;
  /**
   * Additional CSS classes for the prose content
   */
  proseClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the company logo
   */
  companyLogoClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * CaseStudyStatsMetrics displays content with prominent performance metrics,
 * breadcrumb navigation, prose content, and a sticky sidebar with contextual information and CTA.
 *
 * Features a two-column layout with the main content area showing breadcrumbs, title,
 * subtitle, hero image, a grid of key statistics, and rich prose content
 * with headings, paragraphs, blockquotes, lists, tables, and alerts. The sticky sidebar
 * displays logo, overview text, category information, a badge with icon,
 * and a call-to-action button.
 *
 * Ideal for results-focused pages that emphasize quantifiable outcomes,
 * success stories with measurable impact, or data-driven content.
 *
 * @example
 * ```tsx
 * <CaseStudyStatsMetrics
 *   title="Boosting Performance by 125%"
 *   stats={[
 *     { value: "125%", label: "improvement in performance" },
 *     { value: "40%", label: "reduction in issues" }
 *   ]}
 *   companyLogoSrc="/logos/logo.svg"
 *   overview="Leading platform"
 *   sector="Technology"
 * />
 * ```
 */
export function CaseStudyStatsMetrics({
  sectionId = "case-study-stats-metrics",
  breadcrumbs,
  breadcrumbsSlot,
  title,
  subtitle,
  heroImageSrc,
  heroImageAlt,
  heroMediaSlot,
  stats,
  statsSlot,
  content,
  contentSlot,
  companyLogoSrc,
  companyLogoAlt,
  companyLogoSlot,
  overview,
  sector,
  solutionLabel,
  solutionIcon,
  solutionHref,
  solutionSlot,
  ctaAction,
  ctaSlot,
  ctaLabel,
  sidebarSlot,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentWrapperClassName,
  layoutClassName,
  mainClassName,
  breadcrumbsClassName,
  titleClassName,
  subtitleClassName,
  heroImageClassName,
  statsClassName,
  statItemClassName,
  proseClassName,
  sidebarClassName,
  companyLogoClassName,
  optixFlowConfig,
}: CaseStudyStatsMetricsProps): React.JSX.Element {
  const breadcrumbsContent = useMemo(() => {
    if (breadcrumbsSlot) return breadcrumbsSlot;
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
      <Breadcrumb className={cn("mb-6 lg:mb-10", breadcrumbsClassName)}>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItemUI key={index} className={crumb.className}>
              {crumb.href ? (
                <>
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  )}
                </>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItemUI>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }, [breadcrumbsSlot, breadcrumbs, breadcrumbsClassName]);

  const heroMediaContent = useMemo(() => {
    if (heroMediaSlot) return heroMediaSlot;
    if (!heroImageSrc) return null;

    return (
      <Img
        src={heroImageSrc}
        alt={heroImageAlt}
        className={cn(
          "my-8 aspect-video w-full rounded-lg object-cover",
          heroImageClassName,
        )}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [
    heroMediaSlot,
    heroImageSrc,
    heroImageAlt,
    heroImageClassName,
    optixFlowConfig,
  ]);

  const statsContent = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div
        className={cn(
          "mb-8 grid grid-cols-2 gap-5 lg:grid-cols-4",
          statsClassName,
        )}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col gap-2",
              stat.className,
              statItemClassName,
            )}
          >
            {typeof stat.value === "string" ? (
              <p className="text-4xl font-semibold sm:text-5xl">{stat.value}</p>
            ) : (
              stat.value
            )}
            {stat.label &&
              (typeof stat.label === "string" ? (
                <p className="text-sm">{stat.label}</p>
              ) : (
                stat.label
              ))}
          </div>
        ))}
      </div>
    );
  }, [statsSlot, stats, statsClassName, statItemClassName]);

  const contentArea = useMemo(() => {
    if (contentSlot) return contentSlot;
    if (!content) return null;

    return (
      <div
        className={cn(
          getProseClassName(background, "mb-8 max-w-full"),
          proseClassName,
        )}
      >
        {content}
      </div>
    );
  }, [contentSlot, content, proseClassName]);

  const logoContent = useMemo(() => {
    if (companyLogoSlot) return companyLogoSlot;
    if (!companyLogoSrc) return null;

    return (
      <Img
        src={companyLogoSrc}
        alt={companyLogoAlt}
        className={cn("mb-8 w-36", companyLogoClassName)}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [
    companyLogoSlot,
    companyLogoSrc,
    companyLogoAlt,
    companyLogoClassName,
    optixFlowConfig,
  ]);

  const solutionContent = useMemo(() => {
    if (solutionSlot) return solutionSlot;
    if (!solutionLabel && !solutionHref) return null;

    return (
      <Pressable
        href={solutionHref}
        variant="outline"
        size="sm"
        asButton
        className="inline-flex items-center gap-2"
      >
        {solutionIcon && (
          <DynamicIcon name={solutionIcon} size={16} className="opacity-60" />
        )}
        {solutionLabel}
      </Pressable>
    );
  }, [solutionSlot, solutionLabel, solutionIcon, solutionHref]);

  const ctaContent = useMemo(() => {
    if (ctaSlot) return ctaSlot;
    if (!ctaAction) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = ctaAction;

    return (
      <Pressable asButton className={actionClassName} {...pressableProps}>
        {children ?? (
          <>
            {icon !== "" && <DynamicIcon name={icon} />}
            {label}
            {iconAfter !== "" && <DynamicIcon name={iconAfter} />}
          </>
        )}
      </Pressable>
    );
  }, [ctaSlot, ctaAction]);

  const sidebarContent = useMemo(() => {
    if (sidebarSlot) return sidebarSlot;
    if (!logoContent && !overview && !sector && !solutionContent && !ctaContent)
      return null;

    return (
      <div
        className={cn("h-fit lg:sticky lg:top-8 lg:max-w-80", sidebarClassName)}
      >
        {logoContent}
        {overview && (
          <>
            <p className="mb-1.5 text-sm font-semibold">Overview</p>
            {typeof overview === "string" ? (
              <p className="mb-5 text-sm">{overview}</p>
            ) : (
              <div className="mb-5 text-sm">{overview}</div>
            )}
          </>
        )}
        {sector && (
          <>
            <p className="mb-1.5 text-sm font-semibold">Sector</p>
            {typeof sector === "string" ? (
              <p className="mb-5 text-sm text-muted-foreground">{sector}</p>
            ) : (
              <div className="mb-5 text-sm text-muted-foreground">{sector}</div>
            )}
          </>
        )}
        {solutionContent && (
          <>
            <p className="mb-1.5 text-sm font-semibold">Solution</p>
            {solutionContent}
          </>
        )}
        {(overview || sector || solutionContent) && ctaContent && (
          <Separator className="my-5" />
        )}
        {ctaContent && (
          <>
            {ctaLabel &&
              (typeof ctaLabel === "string" ? (
                <p className="mb-3 text-sm font-semibold">{ctaLabel}</p>
              ) : (
                <div className="mb-3 text-sm font-semibold">{ctaLabel}</div>
              ))}
            {ctaContent}
          </>
        )}
      </div>
    );
  }, [
    sidebarSlot,
    logoContent,
    overview,
    sector,
    solutionContent,
    ctaContent,
    ctaLabel,
    sidebarClassName,
  ]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(pattern && "overflow-visible", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className={cn("mx-auto max-w-7xl", contentWrapperClassName)}>
          {breadcrumbsContent}
          <div
            className={cn(
              "relative flex-col gap-10 lg:flex lg:flex-row lg:justify-between",
              layoutClassName,
            )}
          >
            <div className={cn("lg:max-w-[692px]", mainClassName)}>
              <div className="max lg:col-span-2">
                <div>
                  {title &&
                    (typeof title === "string" ? (
                      <h1
                        className={cn(
                          "text-3xl font-extrabold text-pretty",
                          titleClassName,
                        )}
                      >
                        {title}
                      </h1>
                    ) : (
                      <div className={titleClassName}>{title}</div>
                    ))}
                  {subtitle &&
                    (typeof subtitle === "string" ? (
                      <p
                        className={cn(
                          "mt-2 text-lg text-muted-foreground",
                          subtitleClassName,
                        )}
                      >
                        {subtitle}
                      </p>
                    ) : (
                      <div
                        className={cn(
                          "mt-2 text-lg text-muted-foreground",
                          subtitleClassName,
                        )}
                      >
                        {subtitle}
                      </div>
                    ))}
                  {heroMediaContent}
                  {statsContent}
                </div>
                {contentArea}
              </div>
            </div>
            {sidebarContent}
          </div>
        </div>
      </div>
    </Section>
  );
}
