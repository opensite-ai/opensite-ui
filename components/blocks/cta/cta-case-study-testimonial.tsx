"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaCaseStudySection {
  /**
   * Icon name for the section
   */
  iconName?: string;
  /**
   * Custom icon element
   */
  icon?: React.ReactNode;
  /**
   * Section title
   */
  title?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

export interface CtaCaseStudyStat {
  /**
   * Stat value
   */
  value?: React.ReactNode;
  /**
   * Stat label
   */
  label?: React.ReactNode;
  /**
   * Additional CSS classes for the stat
   */
  className?: string;
}

export interface CtaCaseStudyTestimonialProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Case study sections (challenge, solution, results)
   */
  sections?: CtaCaseStudySection[];
  /**
   * Custom slot for rendering sections (overrides sections array)
   */
  sectionsSlot?: React.ReactNode;
  /**
   * Testimonial quote content
   */
  testimonialQuote?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Featured image URL
   */
  featuredImage?: string;
  /**
   * Featured image alt text
   */
  featuredImageAlt?: string;
  /**
   * Stats to display
   */
  stats?: CtaCaseStudyStat[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Company logo URL
   */
  companyLogo?: string;
  /**
   * Company name
   */
  companyName?: React.ReactNode;
  /**
   * Company industry badge content
   */
  industryBadge?: React.ReactNode;
  /**
   * Company details content
   */
  companyDetails?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the grid wrapper
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the sections wrapper
   */
  sectionsClassName?: string;
  /**
   * Additional CSS classes for the testimonial quote
   */
  testimonialClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
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
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  /**
   * @deprecated Use badge instead
   */
  badgeText?: string;
}

/**
 * CtaCaseStudyTestimonial - A comprehensive case study CTA with testimonial quote,
 * challenge/solution/results breakdown, stats cards, and video thumbnail. Perfect
 * for social proof and conversion.
 *
 * @example
 * ```tsx
 * <CtaCaseStudyTestimonial
 *   badge="Case Study"
 *   heading="How TechNova transformed their workflow"
 *   description="See how TechNova achieved 200% productivity increase."
 *   testimonialQuote="The platform transformed how our teams collaborate."
 *   actions={[
 *     { label: "Read Full Case Study", href: "/case-studies/technova", variant: "default", size: "lg" },
 *     { label: "Schedule a Demo", href: "/demo", variant: "outline", size: "lg" }
 *   ]}
 * />
 * ```
 */
export function CtaCaseStudyTestimonial({
  badge,
  badgeText = "Case Study",
  heading = "How TechNova transformed their workflow",
  description = "See how TechNova achieved 200% productivity increase and 30% faster project delivery with our platform.",
  sections,
  sectionsSlot,
  testimonialQuote = "The platform transformed how our teams collaborate. We've eliminated silos and can now deliver projects with unprecedented speed and quality.",
  actions,
  actionsSlot,
  featuredImage = imagePlaceholders[16],
  featuredImageAlt = "Team collaborating on the platform",
  stats,
  statsSlot,
  companyLogo = blockBrandedIconsAndPlaceholders.fictionalCompanyLogo7,
  companyName = "TechNova",
  industryBadge = "SaaS",
  companyDetails = "Industry: Technology • Team size: 120+ • Region: Global",
  className,
  containerClassName,
  gridClassName,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  sectionsClassName,
  testimonialClassName,
  actionsClassName,
  sidebarClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CtaCaseStudyTestimonialProps): React.JSX.Element {
  const renderSections = () => {
    if (sectionsSlot) return sectionsSlot;
    if (!sections || sections.length === 0) return null;

    return (
      <div className={cn("mb-8 space-y-6", sectionsClassName)}>
        {sections.map((section, index) => (
          <div
            key={index}
            className={cn("flex items-start gap-4", section.className)}
          >
            <div className="rounded-full bg-primary/10 p-2">
              {section.icon ??
                (section.iconName && (
                  <DynamicIcon
                    name={section.iconName}
                    size={20}
                    className="text-primary"
                  />
                ))}
            </div>
            <div>
              <h3 className="text-lg font-medium">{section.title}</h3>
              <p className="text-muted-foreground">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn("mt-8 flex flex-col gap-4 sm:flex-row", actionsClassName)}
      >
        {actions.map((action, index) => {
          const isFirstAction = index === 0;
          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              size={action.size}
              className={action.className}
              aria-label={action["aria-label"]}
              asButton
            >
              {action.icon}
              {action.children ?? action.label}
              {action.iconAfter ??
                (isFirstAction ? (
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="ml-2"
                  />
                ) : (
                  <DynamicIcon
                    name="lucide/arrow-up-right"
                    size={16}
                    className="ml-2"
                  />
                ))}
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className="mt-6 grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={cn("rounded-lg border p-4 text-center", stat.className)}
          >
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>
    );
  };

  const badgeContent = badge ?? badgeText;

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("grid gap-12 lg:grid-cols-5", gridClassName)}>
          <div className={cn("lg:col-span-3", contentClassName)}>
            <Badge variant="secondary" className={cn("mb-4", badgeClassName)}>
              {badgeContent}
            </Badge>
            <h2
              className={cn(
                "mb-4 text-3xl font-bold md:text-4xl",
                headingClassName
              )}
            >
              {heading}
            </h2>
            <p
              className={cn(
                "mb-8 text-lg text-muted-foreground",
                descriptionClassName
              )}
            >
              {description}
            </p>

            {renderSections()}

            <div
              className={cn(
                "relative mt-8 border-l-4 border-primary/20 pl-6 italic text-muted-foreground",
                testimonialClassName
              )}
            >
              <DynamicIcon
                name="lucide/quote"
                size={24}
                className="absolute -left-3 -top-2 rounded-full bg-background text-primary"
              />
              <p className="md:text-lg">&ldquo;{testimonialQuote}&rdquo;</p>
            </div>

            {renderActions()}
          </div>

          <div className={cn("lg:col-span-2", sidebarClassName)}>
            <div className="relative aspect-4/3 overflow-hidden rounded-xl border">
              <Img
                src={featuredImage}
                alt={featuredImageAlt}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full border-2 border-white bg-white/20 p-2 backdrop-blur-sm transition-transform hover:scale-110">
                  <DynamicIcon
                    name="lucide/play"
                    size={40}
                    className="text-white"
                  />
                </div>
              </div>
            </div>

            {renderStats()}

            <Card className="mt-6 rounded-lg border bg-muted/40 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Img
                    src={companyLogo}
                    alt={`${companyName} logo`}
                    className="h-8 w-8 rounded-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                  <span className="font-medium">{companyName}</span>
                </div>
                <Badge variant="outline">{industryBadge}</Badge>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {companyDetails}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
