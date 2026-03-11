"use client";

import * as React from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CaseStudyStatsCardAuthor {
  /**
   * Author name
   */
  name: string;
  /**
   * Author avatar image URL
   */
  image: string;
  /**
   * Author role/title
   */
  role: string;
}

export interface CaseStudyStatsCardStat {
  /**
   * Stat number/value (e.g., "45%", "3x")
   */
  number: React.ReactNode;
  /**
   * Stat description text
   */
  text: React.ReactNode;
}

export interface CaseStudiesStatsCardProps {
  /**
   * Company logo image URL
   */
  companyLogo?: string;
  /**
   * Company name for alt text
   */
  companyName?: string;
  /**
   * Array of stat items to display
   */
  stats?: CaseStudyStatsCardStat[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Author information
   */
  author?: CaseStudyStatsCardAuthor;
  /**
   * Custom slot for rendering author (overrides author object)
   */
  authorSlot?: React.ReactNode;
  /**
   * Case study title/heading
   */
  title?: React.ReactNode;
  /**
   * Case study summary/description
   */
  summary?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the outer card wrapper
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the left column
   */
  leftColumnClassName?: string;
  /**
   * Additional CSS classes for the right column
   */
  rightColumnClassName?: string;
  /**
   * Additional CSS classes for the company logo
   */
  logoClassName?: string;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for the author container
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the summary
   */
  summaryClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * CaseStudiesStatsCard displays a single case study in a card format with
 * company branding, key metrics, author attribution, and call-to-action.
 *
 * Features a two-column layout within a muted background container. The left
 * column shows company logo, key statistics in a row, and author info with
 * avatar. The right column displays the case study title, summary text, and
 * a "Read Story" button with arrow icon. Ideal for highlighting a featured
 * customer success story with quantifiable results and personal testimonial.
 *
 * @example
 * ```tsx
 * <CaseStudiesStatsCard
 *   companyLogo="/logos/company.svg"
 *   companyName="TechCorp"
 *   stats={[
 *     { number: "45%", text: "improvement in conversions" },
 *     { number: "3x", text: "increase in engagement" }
 *   ]}
 *   author={{
 *     name: "John Doe",
 *     image: "/avatars/john.jpg",
 *     role: "CTO, TechCorp"
 *   }}
 *   title="How We Transformed Our Customer Experience"
 *   summary="Learn how we revamped our onboarding process..."
 *   actions={[{ label: "Read Story", href: "/case-studies/techcorp", variant: "outline" }]}
 * />
 * ```
 */
export function CaseStudiesStatsCard({
  sectionId = "case-studies-stats-card",
  companyLogo,
  companyName,
  stats,
  statsSlot,
  author,
  authorSlot,
  title,
  summary,
  actions,
  actionsSlot,
  className,
  containerClassName,
  cardClassName,
  leftColumnClassName,
  rightColumnClassName,
  logoClassName,
  statsClassName,
  authorClassName,
  titleClassName,
  summaryClassName,
  actionsClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CaseStudiesStatsCardProps): React.JSX.Element {
  const renderedStats = React.useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className={cn("flex w-full flex-col gap-8 sm:flex-row", statsClassName)}>
        {stats.map((item, i) => (
          <div className="flex flex-col gap-1" key={`stats-${i}`}>
            <div className="text-xl font-semibold">{item.number}</div>
            <div className="text-sm font-medium text-muted-foreground">
              {item.text}
            </div>
          </div>
        ))}
      </div>
    );
  }, [statsSlot, stats, statsClassName]);

  const renderedAuthor = React.useMemo(() => {
    if (authorSlot) return authorSlot;
    if (!author) return null;

    return (
      <div className={cn("flex items-center gap-2.5", authorClassName)}>
        <Avatar className="size-10 rounded-lg border bg-background">
          <AvatarImage src={author.image} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <div className="text-sm leading-normal font-medium">
            {author.name}
          </div>
          <div className="text-sm leading-normal font-medium text-muted-foreground">
            {author.role}
          </div>
        </div>
      </div>
    );
  }, [authorSlot, author, authorClassName]);

  const renderedActions = React.useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("shrink-0", actionsClassName)}>
        {actions.map((action, index) => {
          const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
          return (
            <Pressable
              key={index}
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
        })}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("flex w-full flex-col items-stretch justify-between gap-10 rounded-lg p-10 lg:flex-row", getNestedCardBg(background), cardClassName)}>
          <div className={cn("flex w-full max-w-120 flex-col gap-10 rounded-lg p-5", getNestedCardBg(background, "card"), getNestedCardTextColor(background), leftColumnClassName)}>
            <div className={cn("max-w-19.5", logoClassName)}>
              <Img
                src={companyLogo}
                alt={companyName}
                className="block size-full object-contain object-center"
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            {renderedStats}
            {renderedAuthor}
          </div>
          <div className={cn("flex max-w-lg flex-col gap-5", rightColumnClassName)}>
            {title && (
              typeof title === "string" ? (
                <h2 className={cn("text-2xl leading-none font-bold md:text-3xl lg:text-4xl", titleClassName)}>
                  {title}
                </h2>
              ) : (
                <div className={titleClassName}>{title}</div>
              )
            )}
            {summary && (
              typeof summary === "string" ? (
                <p className={cn("text-base font-medium", summaryClassName)}>
                  {summary}
                </p>
              ) : (
                <div className={summaryClassName}>{summary}</div>
              )
            )}
            {renderedActions}
          </div>
        </div>
      </div>
    </Section>
  );
}
