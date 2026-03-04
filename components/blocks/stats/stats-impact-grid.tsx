"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type {
  SectionBackground,
  SectionSpacing,
  ActionConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * An impact stat with icon, value, label, and description.
 * Used to display key metrics, KPIs, or performance indicators.
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
   * Prefix for the value (e.g., "$", "€", "£")
   */
  prefix?: React.ReactNode;
  /**
   * Suffix for the value (e.g., "%", "B+", "x", "K")
   */
  suffix?: React.ReactNode;
  /**
   * The label for the stat
   */
  label: React.ReactNode;
  /**
   * Description or context for the stat
   */
  description?: React.ReactNode;
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
 * Props for the StatsImpactGrid component.
 * A versatile stats section for displaying metrics with optional comparison visualization.
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
   * Array of impact stats to display in the grid
   */
  stats?: ImpactStat[];
  /**
   * Custom slot for stats grid (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Comparison section heading
   */
  comparisonHeading?: React.ReactNode;
  /**
   * Comparison section description
   */
  comparisonDescription?: React.ReactNode;
  /**
   * Baseline comparison value (displayed as the first/lower comparison point)
   */
  baselineValue?: React.ReactNode;
  /**
   * Target comparison value (displayed as the second/higher comparison point)
   */
  targetValue?: React.ReactNode;
  /**
   * Label for the baseline comparison bar
   */
  baselineLabel?: React.ReactNode;
  /**
   * Label for the target comparison bar
   */
  targetLabel?: React.ReactNode;
  /**
   * Percentage width for the baseline progress bar (0-100)
   */
  baselinePercent?: number;
  /**
   * Percentage width for the target progress bar (0-100)
   */
  targetPercent?: number;
  /**
   * Custom slot for comparison section (overrides comparison props)
   */
  comparisonSlot?: React.ReactNode;
  /**
   * CTA section heading
   */
  ctaHeading?: React.ReactNode;
  /**
   * Array of action buttons for the CTA section
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
 * with icons, an optional comparison bar visualization, and a call-to-action.
 * Each stat card displays an icon, large value with prefix/suffix, label, and description.
 * The comparison section visualizes the difference between two values with progress bars.
 * Ideal for showcasing ROI, performance metrics, growth comparisons, or any key indicators.
 *
 * @example
 * ```tsx
 * <StatsImpactGrid
 *   badge="Results"
 *   heading="Our Impact"
 *   stats={[
 *     { id: "growth", value: "437", suffix: "%", label: "Growth Rate", description: "Year over year" },
 *   ]}
 *   comparisonHeading="Performance Comparison"
 *   baselineLabel="Before"
 *   baselineValue="24%"
 *   baselinePercent={24}
 *   targetLabel="After"
 *   targetValue="89%"
 *   targetPercent={89}
 *   ctaHeading="Ready to get started?"
 *   actions={[{ label: "Get Started", href: "/signup" }]}
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
  comparisonHeading,
  comparisonDescription,
  baselineValue,
  targetValue,
  baselineLabel,
  targetLabel,
  baselinePercent,
  targetPercent,
  comparisonSlot,
  ctaHeading,
  actions,
  ctaSlot,
  background,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  statsGridClassName,
  statCardClassName,
  comparisonClassName,
  ctaClassName,
}: StatsImpactGridProps) {
  // Memoized badge rendering - no arguments, pure derivation from props
  const badgeContent = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badge) return null;
    return <Badge className={cn("mb-4", badgeClassName)}>{badge}</Badge>;
  }, [badgeSlot, badge, badgeClassName]);

  // Callback for rendering stat icons - takes argument (stat)
  const renderStatIcon = useCallback((stat: ImpactStat) => {
    if (stat.iconSlot) return stat.iconSlot;
    if (!stat.icon) return null;
    return (
      <div className="mb-6">
        <DynamicIcon name={stat.icon} size={32} className={stat.iconColor} />
      </div>
    );
  }, []);

  // Memoized stats grid rendering
  const statsContent = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div
        className={cn(
          "mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
          statsGridClassName,
        )}
      >
        {stats.map((stat) => (
          <Card
            key={stat.id}
            className={cn(
              "overflow-hidden border p-0",
              stat.className,
              statCardClassName,
            )}
          >
            <CardContent className="p-6 md:p-8">
              {renderStatIcon(stat)}

              <div className="mb-2 flex items-end">
                {stat.prefix && (
                  <span className="mb-1 mr-1 text-2xl font-bold">
                    {stat.prefix}
                  </span>
                )}
                <h3 className="text-4xl font-bold tracking-tight leading-tight md:text-5xl">
                  {stat.value}
                </h3>
                {stat.suffix && (
                  <span className="mb-1 ml-1 text-2xl font-bold">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {stat.label && (
                <div className="mb-4 text-xl font-semibold">{stat.label}</div>
              )}
              {stat.description &&
                (typeof stat.description === "string" ? (
                  <p className="opacity-75">{stat.description}</p>
                ) : (
                  stat.description
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }, [statsSlot, stats, statsGridClassName, statCardClassName, renderStatIcon]);

  // Check if comparison section has any content to render
  const hasComparisonContent = useMemo(() => {
    return !!(
      comparisonHeading ||
      comparisonDescription ||
      baselineValue ||
      targetValue ||
      baselineLabel ||
      targetLabel
    );
  }, [
    comparisonHeading,
    comparisonDescription,
    baselineValue,
    targetValue,
    baselineLabel,
    targetLabel,
  ]);

  // Memoized comparison section rendering
  const comparisonContent = useMemo(() => {
    if (comparisonSlot) return comparisonSlot;
    if (!hasComparisonContent) return null;

    // Only render progress bars if we have the necessary data
    const hasProgressBars =
      baselineLabel &&
      targetLabel &&
      baselinePercent !== undefined &&
      targetPercent !== undefined;

    return (
      <div
        className={cn(
          "mb-16 rounded-xl p-8 bg-card text-card-foreground",
          comparisonClassName,
        )}
      >
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,240px)] md:items-start md:gap-12">
          <div>
            {comparisonHeading &&
              (typeof comparisonHeading === "string" ? (
                <h3 className="mb-4 text-2xl font-bold">{comparisonHeading}</h3>
              ) : (
                comparisonHeading
              ))}
            {comparisonDescription &&
              (typeof comparisonDescription === "string" ? (
                <p className="mb-6">{comparisonDescription}</p>
              ) : (
                comparisonDescription
              ))}
            {hasProgressBars && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-card/20 invert">
                    <div
                      className="h-full bg-card"
                      style={{ width: `${baselinePercent}%` }}
                    />
                  </div>
                  <span className="min-w-[60px] text-sm font-medium">
                    {baselineLabel}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-primary/20">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${targetPercent}%` }}
                    />
                  </div>
                  <span className="min-w-[60px] text-sm font-medium">
                    {targetLabel}
                  </span>
                </div>
              </div>
            )}
          </div>
          {(baselineValue || targetValue) && (
            <div className="rounded-lg border p-6 text-center shadow-sm md:text-left">
              <div className="space-y-4">
                {baselineValue && (
                  <div>
                    {baselineLabel && (
                      <div className="text-xs font-semibold uppercase tracking-wide">
                        {baselineLabel}
                      </div>
                    )}
                    <div className="text-3xl font-bold">{baselineValue}</div>
                  </div>
                )}
                {baselineValue && targetValue && (
                  <div className="h-px bg-border" />
                )}
                {targetValue && (
                  <div>
                    {targetLabel && (
                      <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {targetLabel}
                      </div>
                    )}
                    <div className="text-4xl font-bold text-primary">
                      {targetValue}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }, [
    comparisonSlot,
    hasComparisonContent,
    background,
    comparisonHeading,
    comparisonDescription,
    baselineValue,
    targetValue,
    baselineLabel,
    targetLabel,
    baselinePercent,
    targetPercent,
    comparisonClassName,
  ]);

  // Memoized actions rendering
  const actionsContent = useMemo(() => {
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex flex-wrap justify-center gap-4">
        {actions.map((action, index) => {
          const {
            label,
            icon,
            iconAfter,
            children,
            className: actionClassName,
            ...pressableProps
          } = action;

          return (
            <Pressable
              key={action.href || index}
              size="lg"
              asButton
              className={cn(
                "inline-flex items-center justify-center gap-2",
                actionClassName,
              )}
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
  }, [actions]);

  // Memoized CTA section rendering
  const ctaContent = useMemo(() => {
    if (ctaSlot) return ctaSlot;
    if (!ctaHeading && (!actions || actions.length === 0)) return null;

    return (
      <div className={cn("text-center mb-12", ctaClassName)}>
        {ctaHeading &&
          (typeof ctaHeading === "string" ? (
            <h3 className="mb-6 text-2xl font-semibold">{ctaHeading}</h3>
          ) : (
            ctaHeading
          ))}
        {actionsContent}
      </div>
    );
  }, [ctaSlot, ctaHeading, actions, ctaClassName, actionsContent]);

  // Check if header has any content
  const hasHeaderContent = !!(badge || badgeSlot || heading || description);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={cn("relative overflow-hidden", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        {hasHeaderContent && (
          <div className={cn("mb-12 text-center", headerClassName)}>
            {badgeContent}
            {heading &&
              (typeof heading === "string" ? (
                <h2
                  className={cn(
                    "mb-4 text-3xl font-bold md:text-5xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : (
                heading
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "mx-auto max-w-3xl text-lg text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                description
              ))}
          </div>
        )}

        {statsContent}
        {comparisonContent}
        {ctaContent}
      </div>
    </Section>
  );
}
