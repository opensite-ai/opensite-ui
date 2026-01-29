"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, SectionBackground, SectionSpacing } from "../../../src/types";

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
  badge,
  title,
  description,
  actions,
  actionsSlot,
  stats,
  statsSlot,
  className,
  containerClassName,
  gridClassName,
  contentClassName,
  badgeClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  statsGridClassName,
  statCardClassName,
  background,
  spacing,
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
              {icon}
              {label}
              {iconAfter}
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
        className={cn("flex flex-col gap-2 rounded-xl border bg-muted/30 p-6", statCardClassName, stat.className)}
      >
        {stat.value && (
          <span className={cn("text-4xl font-bold text-primary lg:text-5xl", stat.valueClassName)}>
            {stat.value}
          </span>
        )}
        {stat.label && (
          <span className={cn("text-muted-foreground", stat.labelClassName)}>{stat.label}</span>
        )}
      </div>
    ));
  }, [statsSlot, stats, statCardClassName]);

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
      <div className={cn("grid gap-10 lg:grid-cols-2 lg:gap-20", gridClassName)}>
        <div className={cn("flex flex-col gap-5", contentClassName)}>
          {badge && (
            <Badge variant="outline" className={cn("w-fit", badgeClassName)}>
              {badge}
            </Badge>
          )}
          {title && (
            typeof title === "string" ? (
              <h2 className={cn("text-3xl font-semibold lg:text-5xl", titleClassName)}>{title}</h2>
            ) : (
              <div className={cn("text-3xl font-semibold lg:text-5xl", titleClassName)}>{title}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-muted-foreground lg:text-lg", descriptionClassName)}>{description}</p>
            ) : (
              <div className={cn("text-muted-foreground lg:text-lg", descriptionClassName)}>{description}</div>
            )
          )}
          {(actionsSlot || (actions && actions.length > 0)) && (
            <div className={actionsClassName}>
              {actionsContent}
            </div>
          )}
        </div>
        {(statsSlot || (stats && stats.length > 0)) && (
          <div className={cn("grid grid-cols-2 gap-6", statsGridClassName)}>
            {statsContent}
          </div>
        )}
      </div>
    </Section>
  );
}
