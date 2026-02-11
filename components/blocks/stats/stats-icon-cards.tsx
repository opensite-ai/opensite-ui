"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * A stat item with icon, value, label, and growth indicator.
 * Used to display metrics with visual growth trends.
 */
export interface StatIconItem {
  /**
   * The label describing the stat
   */
  label: React.ReactNode;
  /**
   * The stat value (e.g., "120K+", "$3.2M", "9.5%")
   */
  value: React.ReactNode;
  /**
   * Growth indicator text (e.g., "18% growth", "+2 min")
   */
  growth: React.ReactNode;
  /**
   * Whether the growth is positive (green) or negative (red)
   * @default true
   */
  isPositive?: boolean;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/users", "lucide/clock")
   */
  icon?: string;
  /**
   * Custom icon element (overrides icon name)
   */
  iconSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the stat card
   */
  className?: string;
}

/**
 * Props for the StatsIconCards component.
 * A modern stats grid featuring bordered cards with icons, values, and growth indicators.
 */
export interface StatsIconCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Array of stat items to display
   */
  stats?: StatIconItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
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
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the stats container
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
   * Additional CSS classes for stat growth indicators
   */
  statGrowthClassName?: string;
  /**
   * Additional CSS classes for stat icons
   */
  statIconClassName?: string;
}

/**
 * StatsIconCards - A modern stats grid featuring bordered cards with icons,
 * large numerical values, and growth indicators. Each card displays a metric
 * with a circular icon badge, prominent value, and color-coded growth trend.
 * Ideal for dashboards, analytics sections, or showcasing key performance
 * indicators with visual hierarchy.
 *
 * @example
 * ```tsx
 * <StatsIconCards
 *   heading="Our Growth in Numbers"
 *   description="Key metrics that showcase our impact"
 *   stats={[
 *     { label: "Active Users", value: "120K+", growth: "18% growth", icon: "lucide/users" },
 *     { label: "Revenue", value: "$3.2M", growth: "32% increase", icon: "lucide/dollar-sign" },
 *   ]}
 * />
 * ```
 */
export function StatsIconCards({
  heading,
  description,
  stats,
  statsSlot,
  background,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  contentClassName,
  headingClassName,
  descriptionClassName,
  statsClassName,
  statCardClassName,
  statValueClassName,
  statLabelClassName,
  statGrowthClassName,
  statIconClassName,
}: StatsIconCardsProps) {
  // Memoized icon rendering
  const renderIcon = useCallback(
    (stat: StatIconItem) => {
      if (stat.iconSlot) return stat.iconSlot;
      if (!stat.icon) return null;
      return (
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10",
            statIconClassName,
          )}
        >
          <DynamicIcon name={stat.icon} size={24} className="text-primary" />
        </div>
      );
    },
    [statIconClassName],
  );

  // Memoized stats rendering
  const statsContent = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <div
        key={index}
        className={cn(
          "relative overflow-hidden rounded-xl border bg-background p-6",
          stat.className,
          statCardClassName,
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            {stat.label && (
              <p
                className={cn(
                  "font-medium text-muted-foreground",
                  statLabelClassName,
                )}
              >
                {stat.label}
              </p>
            )}
            {stat.value && (
              <h3 className={cn("mt-4 text-4xl font-bold", statValueClassName)}>
                {stat.value}
              </h3>
            )}
            {stat.growth && (
              <p
                className={cn(
                  "mt-1 flex items-center text-sm font-medium",
                  stat.isPositive !== false
                    ? "text-success"
                    : "text-destructive",
                  statGrowthClassName,
                )}
              >
                <DynamicIcon
                  name={
                    stat.isPositive !== false
                      ? "lucide/arrow-up-right"
                      : "lucide/arrow-down-right"
                  }
                  size={16}
                  className="mr-1"
                />
                <span>{stat.growth}</span>
              </p>
            )}
          </div>
          {renderIcon(stat)}
        </div>
      </div>
    ));
  }, [
    statsSlot,
    stats,
    statCardClassName,
    statLabelClassName,
    statValueClassName,
    statGrowthClassName,
    renderIcon,
  ]);

  // Check if header has any content
  const hasHeaderContent = !!(heading || description);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        {hasHeaderContent && (
          <div className={cn("mb-10 text-center", contentClassName)}>
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
                    "mt-3 text-muted-foreground",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={cn("mt-3", descriptionClassName)}>
                  {description}
                </div>
              ))}
          </div>
        )}

        {(statsSlot || (stats && stats.length > 0)) && (
          <div
            className={cn(
              "grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
              statsClassName,
            )}
          >
            {statsContent}
          </div>
        )}
      </div>
    </Section>
  );
}
