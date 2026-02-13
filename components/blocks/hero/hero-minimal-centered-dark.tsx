"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  StatItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { Badge } from "@/src";

export interface HeroMinimalCenteredDarkProps {
  /**
   * Badge/status indicator content
   */
  badge?: React.ReactNode;
  /**
   * Show animated status dot
   */
  showStatusDot?: boolean;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Highlighted text within heading (gradient styled)
   */
  headingHighlight?: string;
  /**
   * Description text below heading
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
   * Array of stat/trust indicators
   */
  stats?: StatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode; /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;

  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
}

export function HeroMinimalCenteredDark({
  badge,
  heading,
  headingHighlight,
  description,
  actions,
  actionsSlot,
  stats,
  statsSlot,
  background,
  spacing = "pt-32 pb-8 md:pt-32 md:pb-32",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  statsClassName,
}: HeroMinimalCenteredDarkProps): React.JSX.Element {
  const renderActions = useMemo(() => {
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
    });
  }, [actionsSlot, actions]);

  const renderStats = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <div
        key={index}
        className={cn("flex items-center gap-2", stat.className)}
      >
        {stat.icon}
        <span>{stat.value}</span>
      </div>
    ));
  }, [statsSlot, stats]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        {badge && (
          <Badge className={cn("px-3 py-2", badgeClassName)}>
            {typeof badge === "string" ? <span>{badge}</span> : badge}
          </Badge>
        )}
        {(heading || headingHighlight) &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "mt-8 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl text-balance",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : heading ? (
            <div className={headingClassName}>{heading}</div>
          ) : headingHighlight ? (
            <h1
              className={cn(
                "mt-8 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl text-balance",
                headingClassName,
              )}
            >
              {headingHighlight}
            </h1>
          ) : null)}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "mt-6 max-w-2xl text-lg md:text-xl text-balance",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          ))}
        {(actionsSlot || (actions && actions.length > 0)) && (
          <div
            className={cn(
              "mt-6 md:mt-10 flex flex-col gap-4 md:flex-row",
              actionsClassName,
            )}
          >
            {renderActions}
          </div>
        )}
        {(statsSlot || (stats && stats.length > 0)) && (
          <div
            className={cn(
              "mt-16 flex items-center gap-8 text-sm",
              statsClassName,
            )}
          >
            {renderStats}
          </div>
        )}
      </div>
    </Section>
  );
}
