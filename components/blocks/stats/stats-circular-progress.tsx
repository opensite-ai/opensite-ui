"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * A stat with circular progress indicator.
 * Used to display metrics with visual progress rings.
 */
export interface CircularStat {
  /**
   * The label for the stat
   */
  label: React.ReactNode;
  /**
   * The stat value (0-100 for percentage display)
   */
  value: number;
  /**
   * Suffix for the value (e.g., "%", "")
   */
  suffix?: string;
  /**
   * Additional info text
   */
  info: React.ReactNode;
  /**
   * Additional CSS classes for the stat card
   */
  className?: string;
}

/**
 * A category of stats.
 * Used to group related stats under a common category tab.
 */
export interface StatCategory {
  /**
   * Unique identifier for the category
   */
  id: string;
  /**
   * Display name for the category
   */
  name: React.ReactNode;
  /**
   * Stats for this category
   */
  stats: CircularStat[];
  /**
   * Additional CSS classes for the category
   */
  className?: string;
}

/**
 * Props for the StatsCircularProgress component.
 * A tabbed stats display featuring circular progress indicators organized by category.
 */
export interface StatsCircularProgressProps {
  /**
   * Badge content above the heading
   */
  badge?: React.ReactNode;
  /**
   * Custom badge slot (overrides badge)
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
   * Array of stat categories
   */
  categories?: StatCategory[];
  /**
   * Custom slot for rendering categories (overrides categories array)
   */
  categoriesSlot?: React.ReactNode;
  /**
   * Default selected category ID
   */
  defaultCategory?: string;
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
   * Additional CSS classes for the tabs
   */
  tabsClassName?: string;
  /**
   * Additional CSS classes for the stats grid
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for stat cards
   */
  statCardClassName?: string;
  /**
   * Additional CSS classes for stat values
   */
  statValueClassName?: string;
  /**
   * Additional CSS classes for stat labels
   */
  statLabelClassName?: string;
  /**
   * Additional CSS classes for stat info
   */
  statInfoClassName?: string;
}

/**
 * Helper function to determine color based on value
 */
function getColorClass(value: number): string {
  if (value >= 90) return "text-success";
  if (value >= 75) return "text-primary";
  if (value >= 50) return "text-accent-foreground";
  return "text-destructive";
}

/**
 * SVG Circular Progress component
 */
function CircularProgressIndicator({
  value,
  size = 120,
  strokeWidth = 10,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const offset = circumference - (normalizedValue / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90 transform"
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-muted"
      />
      {/* Foreground circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={cn(getColorClass(value))}
      />
    </svg>
  );
}

/**
 * StatsCircularProgress - A tabbed stats display featuring circular progress indicators
 * organized by category (Business, Technical, Customer). Each stat shows a visual
 * circular progress ring with the value centered inside, along with a label and
 * additional info. Includes both desktop tabs and mobile dropdown for category
 * selection. Ideal for KPI dashboards, performance reports, or multi-dimensional
 * metrics visualization.
 *
 * @example
 * ```tsx
 * <StatsCircularProgress
 *   badge="Performance"
 *   heading="Key Performance Indicators"
 *   categories={[
 *     { id: "business", name: "Business", stats: [...] },
 *   ]}
 * />
 * ```
 */
export function StatsCircularProgress({
  badge,
  badgeSlot,
  heading,
  description,
  categories,
  categoriesSlot,
  defaultCategory,
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
  statsClassName,
  statCardClassName,
  statValueClassName,
  statLabelClassName,
  statInfoClassName,
}: StatsCircularProgressProps) {
  // Use first category as default if not specified
  const effectiveDefaultCategory =
    defaultCategory ||
    (categories && categories.length > 0 ? categories[0].id : "");
  const [category, setCategory] = React.useState(effectiveDefaultCategory);

  // Memoized badge rendering
  const badgeContent = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badge) return null;
    return (
      <Badge variant="outline" className={cn("mb-4", badgeClassName)}>
        {badge}
      </Badge>
    );
  }, [badgeSlot, badge, badgeClassName]);

  // Memoized categories rendering
  const categoriesContent = useMemo(() => {
    if (categoriesSlot) return categoriesSlot;
    if (!categories || categories.length === 0) return null;

    return (
      <>
        {/* Mobile Dropdown */}
        <div className="mb-8 md:hidden">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={`select-${cat.id}`} value={cat.id}>
                {typeof cat.name === "string"
                  ? `${cat.name} Metrics`
                  : cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs for desktop */}
        <Tabs
          value={category}
          onValueChange={setCategory}
          className={cn("w-full", tabsClassName)}
        >
          {/* Desktop Tabs */}
          <div className="mb-12 hidden justify-center md:flex">
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {typeof cat.name === "string"
                    ? `${cat.name} Metrics`
                    : cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className={cat.className}>
              <div
                className={cn(
                  "grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
                  statsClassName,
                )}
              >
                {cat.stats.map((stat, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-xl border bg-card p-6",
                      stat.className,
                      statCardClassName,
                    )}
                  >
                    <div className="relative mb-4 flex items-center justify-center">
                      <CircularProgressIndicator
                        value={stat.value}
                        size={120}
                      />
                      <div className="absolute flex flex-col items-center justify-center">
                        <span
                          className={cn(
                            "text-2xl font-bold md:text-3xl",
                            getColorClass(stat.value),
                            statValueClassName,
                          )}
                        >
                          {stat.value}
                          {stat.suffix}
                        </span>
                      </div>
                    </div>
                    {stat.label && (
                      <h3
                        className={cn(
                          "text-center text-lg font-semibold md:text-xl",
                          statLabelClassName,
                        )}
                      >
                        {stat.label}
                      </h3>
                    )}
                    {stat.info && (
                      <p
                        className={cn(
                          "mt-1 text-center text-xs text-muted-foreground md:text-sm",
                          statInfoClassName,
                        )}
                      >
                        {stat.info}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </>
    );
  }, [
    categoriesSlot,
    categories,
    category,
    tabsClassName,
    statsClassName,
    statCardClassName,
    statValueClassName,
    statLabelClassName,
    statInfoClassName,
  ]);

  // Check if header has any content
  const hasHeaderContent = !!(badge || badgeSlot || heading || description);

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
        {hasHeaderContent && (
          <div className={cn("mb-12 text-center", headerClassName)}>
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
                    "mx-auto mt-3 max-w-2xl text-muted-foreground",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div
                  className={cn("mx-auto mt-3 max-w-2xl", descriptionClassName)}
                >
                  {description}
                </div>
              ))}
          </div>
        )}

        {categoriesContent}
      </div>
    </Section>
  );
}
