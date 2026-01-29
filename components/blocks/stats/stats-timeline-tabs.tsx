"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * A single stat entry with value, change, and trend.
 * Used to display metrics with trend indicators and comparison periods.
 */
export interface TimelineStat {
  /**
   * The label for the stat
   */
  label: React.ReactNode;
  /**
   * The stat value (e.g., "1,284", "32,891", "5.2%")
   */
  value: React.ReactNode;
  /**
   * The percentage change
   */
  change: number;
  /**
   * Whether the trend is up or down
   */
  trend: "up" | "down";
  /**
   * Label for the comparison period
   */
  previousLabel: React.ReactNode;
  /**
   * If true, a downward trend is considered positive (e.g., for support tickets)
   */
  inversePositive?: boolean;
  /**
   * Additional CSS classes for the stat card
   */
  className?: string;
}

/**
 * A time period with its associated stats.
 * Groups metrics by time range for tabbed display.
 */
export interface TimePeriod {
  /**
   * Unique identifier for the period
   */
  id: string;
  /**
   * Display label for the period
   */
  label: React.ReactNode;
  /**
   * Stats for this time period
   */
  stats: TimelineStat[];
  /**
   * Additional CSS classes for the period
   */
  className?: string;
}

/**
 * Props for the StatsTimelineTabs component.
 * A tabbed stats display showing metrics across different time periods with color-coded trend indicators.
 */
export interface StatsTimelineTabsProps {
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
   * Array of time periods with their stats
   */
  periods?: TimePeriod[];
  /**
   * Custom slot for tabs content (overrides periods array)
   */
  tabsSlot?: React.ReactNode;
  /**
   * Default selected period ID
   */
  defaultPeriod?: string;
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
   * Additional CSS classes for the tabs container
   */
  tabsClassName?: string;
  /**
   * Additional CSS classes for the tabs list
   */
  tabsListClassName?: string;
  /**
   * Additional CSS classes for the stats grid
   */
  statsGridClassName?: string;
  /**
   * Additional CSS classes for stat cards
   */
  statCardClassName?: string;
}

/**
 * StatsTimelineTabs - A tabbed stats display showing metrics across different time periods
 * (weekly, monthly, quarterly, yearly). Features a badge header, centered tab navigation,
 * and a responsive grid of stat cards with color-coded trend indicators. Each stat shows
 * the value, percentage change, and comparison period. Ideal for analytics dashboards,
 * performance reports, or any time-series data visualization.
 *
 * @example
 * ```tsx
 * <StatsTimelineTabs
 *   badge="Performance Timeline"
 *   heading="Growth Progression"
 *   description="Track our key metrics over different time periods"
 *   defaultPeriod="monthly"
 * />
 * ```
 */
export function StatsTimelineTabs({
  badge,
  badgeSlot,
  heading,
  description,
  periods,
  tabsSlot,
  defaultPeriod,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  tabsClassName,
  tabsListClassName,
  statsGridClassName,
  statCardClassName,
}: StatsTimelineTabsProps) {
  // Use first period as default if not specified
  const effectiveDefaultPeriod =
    defaultPeriod || (periods && periods.length > 0 ? periods[0].id : "");

  // Memoized badge rendering
  const badgeContent = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badge) return null;
    return <Badge className={cn("mb-2", badgeClassName)}>{badge}</Badge>;
  }, [badgeSlot, badge, badgeClassName]);

  // Memoized tabs rendering
  const tabsContent = useMemo(() => {
    if (tabsSlot) return tabsSlot;
    if (!periods || periods.length === 0) return null;

    return (
      <Tabs
        defaultValue={effectiveDefaultPeriod}
        className={cn("mt-8 w-full", tabsClassName)}
      >
        <div className="mb-8 flex justify-center">
          <TabsList className={tabsListClassName}>
            {periods.map((period) => (
              <TabsTrigger key={period.id} value={period.id}>
                {period.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {periods.map((period) => (
          <TabsContent
            key={period.id}
            value={period.id}
            className={cn("mt-4", period.className)}
          >
            <div
              className={cn(
                "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
                statsGridClassName,
              )}
            >
              {period.stats.map((stat, index) => {
                const isPositive =
                  (stat.trend === "up" && !stat.inversePositive) ||
                  (stat.trend === "down" && stat.inversePositive);

                return (
                  <div
                    key={index}
                    className={cn(
                      "rounded-lg border bg-card p-6 transition-shadow hover:shadow-md",
                      stat.className,
                      statCardClassName,
                    )}
                  >
                    <div className="flex items-start justify-between">
                      {stat.label && (
                        <p className="text-lg font-medium">{stat.label}</p>
                      )}
                      <div className="flex items-center">
                        <DynamicIcon
                          name="lucide/clock"
                          size={16}
                          className="mr-1 text-muted-foreground"
                        />
                        <span className="text-xs text-muted-foreground">
                          {period.label}
                        </span>
                      </div>
                    </div>

                    {stat.value && (
                      <h3 className="mt-4 text-3xl font-bold">{stat.value}</h3>
                    )}

                    <div className="mt-2 flex items-center">
                      <div
                        className={cn(
                          "flex items-center rounded-full px-2 py-1 text-xs font-medium",
                          isPositive
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive",
                        )}
                      >
                        <DynamicIcon
                          name={
                            stat.trend === "up"
                              ? "lucide/arrow-up-right"
                              : "lucide/arrow-down-right"
                          }
                          size={12}
                          className="mr-1"
                        />
                        {Math.abs(stat.change)}%
                      </div>
                      {stat.previousLabel && (
                        <p className="ml-2 text-sm text-muted-foreground">
                          vs {stat.previousLabel}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    );
  }, [
    tabsSlot,
    periods,
    effectiveDefaultPeriod,
    tabsClassName,
    tabsListClassName,
    statsGridClassName,
    statCardClassName,
  ]);

  // Check if header has any content
  const hasHeaderContent = !!(badge || badgeSlot || heading || description);
  const hasTabsContent = !!(tabsSlot || (periods && periods.length > 0));

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("mx-auto max-w-6xl", containerClassName)}>
        <div className="flex flex-col space-y-6">
          {hasHeaderContent && (
            <div className={cn("space-y-2 text-center", headerClassName)}>
              {badgeContent}
              {heading &&
                (typeof heading === "string" ? (
                  <h2
                    className={cn(
                      "text-3xl font-bold md:text-4xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h2>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "mx-auto max-w-2xl text-muted-foreground",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  <div
                    className={cn("mx-auto max-w-2xl", descriptionClassName)}
                  >
                    {description}
                  </div>
                ))}
            </div>
          )}

          {hasTabsContent && tabsContent}
        </div>
      </div>
    </Section>
  );
}
