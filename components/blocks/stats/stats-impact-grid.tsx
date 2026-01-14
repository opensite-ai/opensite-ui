"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing, ActionConfig } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * An impact stat with icon, value, label, and description
 */
export interface ImpactStat {
  /**
   * Unique identifier for the stat
   */
  id: string;
  /**
   * The stat value (e.g., "437", "2.4", "89")
   */
  value: React.ReactNode;
  /**
   * Prefix for the value (e.g., "$")
   */
  prefix?: React.ReactNode;
  /**
   * Suffix for the value (e.g., "%", "B+", "x")
   */
  suffix?: React.ReactNode;
  /**
   * The label for the stat
   */
  label: React.ReactNode;
  /**
   * Description of the stat
   */
  description: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/line-chart")
   */
  icon?: string;
  /**
   * Custom slot for icon (overrides icon prop)
   */
  iconSlot?: React.ReactNode;
  /**
   * Icon color class (e.g., "text-primary", "text-emerald-500")
   */
  iconColor?: string;
  /**
   * Additional CSS classes for the stat card
   */
  className?: string;
}

/**
 * Props for the StatsImpactGrid component
 */
export interface StatsImpactGridProps {
  /**
   * Badge content above the heading
   */
  badge?: React.ReactNode;
  /**
   * Custom slot for badge (overrides badge prop)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Array of impact stats to display
   */
  stats?: ImpactStat[];
  /**
   * Custom slot for stats grid (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Industry comparison section heading
   */
  comparisonHeading?: React.ReactNode;
  /**
   * Industry comparison description
   */
  comparisonDescription?: React.ReactNode;
  /**
   * Industry average value
   */
  industryAverage?: React.ReactNode;
  /**
   * Platform value
   */
  platformValue?: React.ReactNode;
  /**
   * Custom slot for comparison section (overrides comparison props)
   */
  comparisonSlot?: React.ReactNode;
  /**
   * CTA heading
   */
  ctaHeading?: React.ReactNode;
  /**
   * Array of action buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for CTA section (overrides ctaHeading and actions)
   */
  ctaSlot?: React.ReactNode;
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
  /**
   * Additional CSS classes for the pattern
   */
  patternClassName?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
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
   * Additional CSS classes for the stats grid
   */
  statsGridClassName?: string;
  /**
   * Additional CSS classes for stat cards
   */
  statCardClassName?: string;
  /**
   * Additional CSS classes for the comparison section
   */
  comparisonClassName?: string;
  /**
   * Additional CSS classes for the CTA section
   */
  ctaClassName?: string;
}

/**
 * StatsImpactGrid - A comprehensive stats section featuring a grid of impact metrics
 * with icons, an industry comparison bar chart, and a call-to-action. Each stat card
 * displays an icon, large value with prefix/suffix, label, and description. Includes
 * a visual comparison between industry average and platform performance. Ideal for
 * showcasing ROI, business impact, or platform benefits with social proof.
 *
 * @example
 * ```tsx
 * <StatsImpactGrid
 *   badge="Proven Results"
 *   heading="Transforming Businesses With Real Numbers"
 *   stats={[
 *     { id: "roi", value: "437", suffix: "%", label: "Average ROI", ... },
 *   ]}
 * />
 * ```
 */
export function StatsImpactGrid({
  badge,
  badgeSlot,
  heading,
  description,
  stats,
  statsSlot,
  comparisonHeading = "How Does This Compare?",
  comparisonDescription = "Our platform delivers results that are 4x better than industry averages across all key performance indicators.",
  industryAverage = "24%",
  platformValue = "89%",
  comparisonSlot,
  ctaHeading = "Ready to See These Results in Your Business?",
  actions,
  ctaSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  statsGridClassName,
  statCardClassName,
  comparisonClassName,
  ctaClassName,
}: StatsImpactGridProps) {
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;
    if (!badge) return null;
    return <Badge className={cn("mb-4", badgeClassName)}>{badge}</Badge>;
  };

  const renderStatIcon = (stat: ImpactStat) => {
    if (stat.iconSlot) return stat.iconSlot;
    if (!stat.icon) return null;
    return (
      <div className="mb-6">
        <DynamicIcon
          name={stat.icon}
          size={32}
          className={stat.iconColor || "text-primary"}
        />
      </div>
    );
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className={cn("mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3", statsGridClassName)}>
        {stats.map((stat) => (
          <Card key={stat.id} className={cn("overflow-hidden border p-0", stat.className, statCardClassName)}>
            <CardContent className="p-6 md:p-8">
              {renderStatIcon(stat)}

              <div className="mb-2 flex items-end">
                {stat.prefix && (
                  <span className="mb-1 mr-1 text-2xl font-bold">
                    {stat.prefix}
                  </span>
                )}
                <h3 className="text-4xl font-bold tracking-tight md:text-5xl">
                  {stat.value}
                </h3>
                {stat.suffix && (
                  <span className="mb-1 ml-1 text-2xl font-bold">
                    {stat.suffix}
                  </span>
                )}
              </div>

              <div className="mb-4 text-xl font-semibold">{stat.label}</div>
              {stat.description && (
                typeof stat.description === "string" ? (
                  <p className="text-muted-foreground">{stat.description}</p>
                ) : (
                  <div className="text-muted-foreground">{stat.description}</div>
                )
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderComparison = () => {
    if (comparisonSlot) return comparisonSlot;
    if (!comparisonHeading && !comparisonDescription && !industryAverage && !platformValue) return null;

    return (
      <div className={cn("mb-16 rounded-xl bg-muted p-8", comparisonClassName)}>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div>
            {comparisonHeading && (
              typeof comparisonHeading === "string" ? (
                <h3 className="mb-4 text-2xl font-bold">{comparisonHeading}</h3>
              ) : (
                <div className="mb-4">{comparisonHeading}</div>
              )
            )}
            {comparisonDescription && (
              typeof comparisonDescription === "string" ? (
                <p className="mb-6 text-muted-foreground">{comparisonDescription}</p>
              ) : (
                <div className="mb-6">{comparisonDescription}</div>
              )
            )}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted-foreground/20">
                  <div className="h-full w-[24%] bg-muted-foreground" />
                </div>
                <span className="min-w-[60px] text-sm font-medium">
                  Industry
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-primary/20">
                  <div className="h-full w-[89%] bg-primary" />
                </div>
                <span className="min-w-[60px] text-sm font-medium">
                  Our Platform
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-center md:border-l md:pl-16 md:text-left">
            <div>
              <div className="text-sm text-muted-foreground">
                INDUSTRY AVERAGE
              </div>
              <div className="text-3xl font-bold">{industryAverage}</div>
            </div>
            <div className="flex h-12 items-center justify-center md:justify-start">
              <DynamicIcon
                name="lucide/arrow-up-right"
                size={32}
                className="text-primary"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-primary">
                OUR PLATFORM
              </div>
              <div className="text-4xl font-bold text-primary">
                {platformValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderActions = () => {
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex flex-wrap justify-center gap-4">
        {actions.map((action, index) => (
          <Pressable
            key={index}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant || "default"}
            size="lg"
            asButton
            className={index === 0 ? "inline-flex items-center justify-center gap-2" : undefined}
          >
            {action.label}
            {index === 0 && <DynamicIcon name="lucide/arrow-right" size={16} />}
          </Pressable>
        ))}
      </div>
    );
  };

  const renderCta = () => {
    if (ctaSlot) return ctaSlot;
    if (!ctaHeading && (!actions || actions.length === 0)) return null;

    return (
      <div className={cn("text-center", ctaClassName)}>
        {ctaHeading && (
          typeof ctaHeading === "string" ? (
            <h3 className="mb-6 text-2xl font-bold">{ctaHeading}</h3>
          ) : (
            <div className="mb-6">{ctaHeading}</div>
          )
        )}
        {renderActions()}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />

      <div className={cn("relative mx-auto max-w-5xl", containerClassName)}>
        <div className={cn("mb-12 text-center", headerClassName)}>
          {renderBadge()}
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("mb-4 text-3xl font-bold md:text-5xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={cn("mb-4", headingClassName)}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mx-auto max-w-3xl text-lg text-muted-foreground", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={cn("mx-auto max-w-3xl", descriptionClassName)}>{description}</div>
            )
          )}
        </div>

        {renderStats()}
        {renderComparison()}
        {renderCta()}
      </div>
    </Section>
  );
}
