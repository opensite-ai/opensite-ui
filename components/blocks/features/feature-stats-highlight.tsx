"use client";

import * as React from "react";
import { useMemo } from "react";
import {
  cn,
  getNestedCardBg,
  getNestedCardTextColor,
} from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface FeatureStatsHighlightStat {
  /**
   * Stat value content (e.g., "99%", "24/7")
   */
  value?: React.ReactNode;
  /**
   * Stat label content
   */
  label?: React.ReactNode;
  /**
   * Additional CSS classes for the stat card
   */
  className?: string;
  /**
   * Additional CSS classes for the value
   */
  valueClassName?: string;
  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string;
}

export interface FeatureStatsHighlightProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of stat items
   */
  stats?: FeatureStatsHighlightStat[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
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
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the stats grid
   */
  statsGridClassName?: string;
  /**
   * Additional CSS classes for each stat card
   */
  statCardClassName?: string;
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * Feature Stats Highlight - Feature section with stats grid and CTA button,
 * showcasing key metrics and achievements.
 *
 * Layout: Two-column layout with content/CTA on left, stats grid on right.
 * Key features: Badge header, stats grid, CTA button, responsive layout.
 * Best for: Company achievements, service highlights, trust indicators.
 *
 * @example
 * ```tsx
 * <FeatureStatsHighlight
 *   badge="Why Choose Us"
 *   title="We deliver results"
 *   description="Our platform helps businesses grow."
 *   actions={[{ label: "Get Started", href: "#", variant: "default" }]}
 *   stats={[
 *     { value: "99%", label: "Uptime" },
 *     { value: "24/7", label: "Support" },
 *   ]}
 * />
 * ```
 */
export function FeatureStatsHighlight({
  sectionId = "feature-stats-highlight",
  badge,
  title,
  description,
  actions,
  actionsSlot,
  stats,
  statsSlot,
  className,
  containerClassName = "px-6 sm:px-6 md:px-6 lg:px-8",
  gridClassName,
  contentClassName,
  badgeClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  statsGridClassName,
  statCardClassName,
  background,
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureStatsHighlightProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
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
          key={index}
          className={cn("mt-4 w-fit gap-2", actionClassName)}
          asButton
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon === "" ? null : <DynamicIcon name={icon} />}
              {label}
              {iconAfter === "" ? null : <DynamicIcon name={iconAfter} />}
            </>
          )}
        </Pressable>
      );
    });
  }, [actionsSlot, actions]);

  const statsContent = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <div
        key={index}
        className={cn(
          "flex flex-col gap-2 rounded-xl border p-4 md:p-6 bg-card text-card-foreground h-full justify-between",
          statCardClassName,
          stat.className,
        )}
      >
        {stat.value && (
          <span
            className={cn(
              "text-3xl font-bold lg:text-4xl xl:text-5xl",
              stat.valueClassName,
            )}
          >
            {stat.value}
          </span>
        )}
        {stat.label && (
          <span
            className={cn(
              "uppercase font-bold text-sm opacity-60",
              stat.labelClassName,
            )}
          >
            {stat.label}
          </span>
        )}
      </div>
    ));
  }, [statsSlot, stats, statCardClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn("grid gap-10 lg:grid-cols-2 lg:gap-20", gridClassName)}
      >
        <div className={cn("flex flex-col gap-5", contentClassName)}>
          {badge && (
            <Badge variant="default" className={cn("", badgeClassName)}>
              {badge}
            </Badge>
          )}
          {title &&
            (typeof title === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-semibold lg:text-5xl",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            ) : (
              <div
                className={cn(
                  "text-3xl font-semibold lg:text-5xl",
                  titleClassName,
                )}
              >
                {title}
              </div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn(" lg:text-lg", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={cn(" lg:text-lg", descriptionClassName)}>
                {description}
              </div>
            ))}
          {(actionsSlot || (actions && actions.length > 0)) && (
            <div className={actionsClassName}>{actionsContent}</div>
          )}
        </div>
        {(statsSlot || (stats && stats.length > 0)) && (
          <div
            className={cn(
              "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6",
              statsGridClassName,
            )}
          >
            {statsContent}
          </div>
        )}
      </div>
    </Section>
  );
}
