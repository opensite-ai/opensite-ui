"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { ActionConfig, StatItem, SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * Props for the StatsSimpleGrid component
 */
export interface StatsSimpleGridProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of stat items to display
   */
  stats?: StatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for individual stat items
   */
  statItemClassName?: string;
  /**
   * Additional CSS classes for stat values
   */
  statValueClassName?: string;
  /**
   * Additional CSS classes for stat labels
   */
  statLabelClassName?: string;
}

/**
 * StatsSimpleGrid - A clean, minimal stats section with a heading, action buttons,
 * and a responsive grid of key metrics. Features a 2x2 grid on mobile that expands
 * to 4 columns on larger screens. Ideal for showcasing company achievements,
 * platform performance, or key business metrics with prominent numerical values.
 *
 * @example
 * ```tsx
 * <StatsSimpleGrid
 *   heading="Platform Performance Insights"
 *   stats={[
 *     { value: "90%", label: "Customer Satisfaction" },
 *     { value: "200+", label: "Enterprise Clients" },
 *   ]}
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" },
 *   ]}
 * />
 * ```
 */
export function StatsSimpleGrid({
  heading = "Platform Performance Insights",
  stats,
  statsSlot,
  actions,
  actionsSlot,
  background = "muted",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  actionsClassName,
  statsClassName,
  statItemClassName,
  statValueClassName,
  statLabelClassName,
}: StatsSimpleGridProps) {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={cn("w-full sm:w-auto", actionClassName)}
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
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <div key={index} className={cn("w-full", statItemClassName)}>
        <div className={cn("mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl", statValueClassName)}>
          {stat.value}
        </div>
        <div className={cn("text-base leading-6 text-muted-foreground lg:text-lg", statLabelClassName)}>
          {stat.label}
        </div>
      </div>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("flex flex-col items-start text-left", containerClassName)}>
        <div className={cn("mb-12 w-full md:mb-16", contentClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("mb-8 w-full max-w-[24rem] text-3xl font-bold text-pretty sm:text-4xl md:max-w-[30rem] lg:max-w-[37rem] lg:text-5xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {(actionsSlot || (actions && actions.length > 0)) && (
            <div className={cn("flex flex-col justify-start gap-2 sm:flex-row", actionsClassName)}>
              {renderActions()}
            </div>
          )}
        </div>
        {(statsSlot || (stats && stats.length > 0)) && (
          <div className={cn("grid w-full grid-cols-2 gap-12 sm:w-fit sm:grid-cols-4 lg:gap-16", statsClassName)}>
            {renderStats()}
          </div>
        )}
      </div>
    </Section>
  );
}
