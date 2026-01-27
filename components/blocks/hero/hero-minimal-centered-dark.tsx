"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type {ActionConfig, StatItem, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

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
  statsSlot?: React.ReactNode;  /**
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
  showStatusDot = true,
  heading,
  headingHighlight,
  description,
  actions,
  actionsSlot,
  stats,
  statsSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  statsClassName,
}: HeroMinimalCenteredDarkProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
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
    });
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <div key={index} className={cn("flex items-center gap-2", stat.className)}>
        {stat.icon}
        <span>{stat.value}</span>
      </div>
    ));
  };

  return (
    <Section
      className={cn(
        "dark relative min-h-screen bg-background py-32",
        className
      )}
    >
      <div className={cn("container flex flex-col items-center justify-center text-center", containerClassName)}>
        {badge && (
          <div className={cn("inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-2 text-sm text-muted-foreground", badgeClassName)}>
            {showStatusDot && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
              </span>
            )}
            {typeof badge === "string" ? <span>{badge}</span> : badge}
          </div>
        )}
        {(heading || headingHighlight) && (
          typeof heading === "string" ? (
            <h1 className={cn("mt-8 max-w-4xl text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl", headingClassName)}>
              {heading}
            </h1>
          ) : heading ? (
            <div className={headingClassName}>{heading}</div>
          ) : headingHighlight ? (
            <h1 className={cn("mt-8 max-w-4xl text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl", headingClassName)}>
              The future of{" "}
              <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {headingHighlight}
              </span>{" "}
              is here
            </h1>
          ) : null
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {(actionsSlot || (actions && actions.length > 0)) && (
          <div className={cn("mt-10 flex flex-col gap-4 sm:flex-row", actionsClassName)}>
            {renderActions()}
          </div>
        )}
        {(statsSlot || (stats && stats.length > 0)) && (
          <div className={cn("mt-16 flex items-center gap-8 text-sm text-muted-foreground", statsClassName)}>
            {renderStats()}
          </div>
        )}
      </div>
    </Section>
  );
}
