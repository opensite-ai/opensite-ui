"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbItemUI,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { Separator } from "../../ui/separator";
import type {
  BreadcrumbItem,
  StatItem,
  ActionConfig,
  OptixFlowConfig,
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
   * Overview text for sidebar
   */
  overview?: React.ReactNode;
  /**
   * Sector/industry text
   */
  sector?: React.ReactNode;
  /**
   * Solution badge label
   */
  solutionLabel?: React.ReactNode;
  /**
   * Solution badge icon name
   */
  solutionIcon?: string;
  /**
   * Solution badge href
   */
  solutionHref?: string;
  /**
   * Custom slot for solution badge (overrides solution props)
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
}

/**
 * CaseStudyStatsMetrics displays a case study with prominent performance metrics,
 * breadcrumb navigation, prose content, and a sticky sidebar with company info and CTA.
 *
 * Features a two-column layout with the main content area showing breadcrumbs, title,
 * subtitle, hero image, a grid of key statistics (4 metrics), and rich prose content
 * with headings, paragraphs, blockquotes, lists, tables, and alerts. The sticky sidebar
 * displays company logo, overview text, sector information, a solution badge with icon,
 * and a call-to-action button.
 *
 * Ideal for results-focused case studies that emphasize quantifiable outcomes,
 * customer success stories with measurable impact, or ROI-driven content marketing.
 *
 * @example
 * ```tsx
 * <CaseStudyStatsMetrics
 *   title="Boosting System Reliability by 125% with AI Monitoring"
 *   stats={[
 *     { value: "125%", label: "improvement in system reliability" },
 *     { value: "40%", label: "reduction in downtime" }
 *   ]}
 *   companyLogoSrc="/logos/client.svg"
 *   overview="Enterprise software company"
 *   sector="Technology"
 * />
 * ```
 */
export function CaseStudyStatsMetrics({
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
  const renderBreadcrumbs = () => {
    if (breadcrumbsSlot) return breadcrumbsSlot;
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
      <Breadcrumb className={cn("mb-6 lg:mb-10", breadcrumbsClassName)}>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItemUI key={index} className={crumb.className}>
              {crumb.href ? (
                <>
                  <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
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
  };

  const renderHeroMedia = () => {
    if (heroMediaSlot) return heroMediaSlot;

    return (
      <Img
        src={heroImageSrc}
        alt={heroImageAlt}
        className={cn("my-8 aspect-video w-full rounded-lg object-cover", heroImageClassName)}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className={cn("mb-8 grid grid-cols-2 gap-5 lg:grid-cols-4", statsClassName)}>
        {stats.map((stat, index) => (
          <div key={index} className={cn("flex flex-col gap-2", stat.className, statItemClassName)}>
            {typeof stat.value === "string" ? (
              <p className="text-4xl font-semibold sm:text-5xl">{stat.value}</p>
            ) : (
              stat.value
            )}
            {stat.label && (
              typeof stat.label === "string" ? (
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              ) : (
                stat.label
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (contentSlot) return contentSlot;

    return (
      <div className={cn("prose mb-8 max-w-full lg:max-w-prose dark:prose-invert", proseClassName)}>
        {content}
      </div>
    );
  };

  const renderCompanyLogo = () => {
    if (companyLogoSlot) return companyLogoSlot;

    return (
      <Img
        src={companyLogoSrc}
        alt={companyLogoAlt}
        className={cn("mb-8 w-36", companyLogoClassName)}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderSolution = () => {
    if (solutionSlot) return solutionSlot;

    return (
      <Pressable
        href={solutionHref}
        variant="outline"
        size="sm"
        asButton
        className="inline-flex items-center gap-2"
      >
        {solutionIcon && <DynamicIcon name={solutionIcon} size={16} className="opacity-60" />}
        {solutionLabel}
      </Pressable>
    );
  };

  const renderCta = () => {
    if (ctaSlot) return ctaSlot;
    if (!ctaAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = ctaAction;

    return (
      <Pressable
        asButton
        className={actionClassName}
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

  const renderSidebar = () => {
    if (sidebarSlot) return sidebarSlot;

    return (
      <div className={cn("h-fit lg:sticky lg:top-8 lg:max-w-80", sidebarClassName)}>
        {renderCompanyLogo()}
        <p className="mb-1.5 text-sm font-semibold">Overview</p>
        {typeof overview === "string" ? (
          <p className="mb-5 text-sm text-muted-foreground">{overview}</p>
        ) : (
          <div className="mb-5 text-sm text-muted-foreground">{overview}</div>
        )}
        <p className="mb-1.5 text-sm font-semibold">Sector</p>
        {typeof sector === "string" ? (
          <p className="mb-5 text-sm text-muted-foreground">{sector}</p>
        ) : (
          <div className="mb-5 text-sm text-muted-foreground">{sector}</div>
        )}
        <p className="mb-1.5 text-sm font-semibold">Solution</p>
        {renderSolution()}
        <Separator className="my-5" />
        {ctaLabel && (
          typeof ctaLabel === "string" ? (
            <p className="mb-3 text-sm font-semibold">{ctaLabel}</p>
          ) : (
            <div className="mb-3 text-sm font-semibold">{ctaLabel}</div>
          )
        )}
        {renderCta()}
      </div>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-7xl", contentWrapperClassName)}>
          {renderBreadcrumbs()}
          <div className={cn("relative flex-col gap-10 lg:flex lg:flex-row lg:justify-between", layoutClassName)}>
            <div className={cn("lg:max-w-[692px]", mainClassName)}>
              <div className="max lg:col-span-2">
                <div>
                  {title && (
                    typeof title === "string" ? (
                      <h1 className={cn("text-3xl font-extrabold text-pretty", titleClassName)}>
                        {title}
                      </h1>
                    ) : (
                      <div className={titleClassName}>{title}</div>
                    )
                  )}
                  {subtitle && (
                    typeof subtitle === "string" ? (
                      <p className={cn("mt-2 text-lg text-muted-foreground", subtitleClassName)}>
                        {subtitle}
                      </p>
                    ) : (
                      <div className={cn("mt-2 text-lg text-muted-foreground", subtitleClassName)}>
                        {subtitle}
                      </div>
                    )
                  )}
                  {renderHeroMedia()}
                  {renderStats()}
                </div>
                {renderContent()}
              </div>
            </div>
            {renderSidebar()}
          </div>
        </div>
      </div>
    </section>
  );
}
