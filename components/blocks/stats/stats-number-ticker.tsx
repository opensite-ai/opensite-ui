"use client";

import * as React from "react";
import { useMemo } from "react";
import {
  cn,
  getNestedCardBg,
  getNestedCardTextColor,
} from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * A stat with number ticker animation.
 * Used to display metrics with animated counting effects.
 */
export interface TickerStat {
  /**
   * The end value for the ticker animation
   */
  value: number;
  /**
   * Prefix for the value (e.g., "$", "+")
   */
  prefix?: React.ReactNode;
  /**
   * Suffix for the value (e.g., "%", "K", "M", "+")
   */
  suffix?: React.ReactNode;
  /**
   * The label for the stat
   */
  label: React.ReactNode;
  /**
   * Description text
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the stat card
   */
  className?: string;
}

/**
 * Props for the StatsNumberTicker component.
 * A stats section featuring smooth number ticker animations that count up when scrolled into view.
 */
export interface StatsNumberTickerProps {
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
   * Array of stats to display with ticker animation
   */
  stats?: TickerStat[];
  /**
   * Custom slot for stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Animation duration in milliseconds
   * @default 2500
   */
  animationDuration?: number;
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
   * Additional CSS classes for stat values
   */
  statValueClassName?: string;
  /**
   * Additional CSS classes for stat labels
   */
  statLabelClassName?: string;
  /**
   * Additional CSS classes for stat descriptions
   */
  statDescriptionClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * Hook for number ticker animation with smooth digit transitions
 */
function useNumberTicker(
  endValue: number,
  duration: number = 2500,
  isVisible: boolean,
  decimals: number = 0,
): string {
  const [displayValue, setDisplayValue] = React.useState("0");

  React.useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = easeOutExpo * endValue;

      if (decimals > 0) {
        setDisplayValue(currentValue.toFixed(decimals));
      } else {
        setDisplayValue(Math.floor(currentValue).toLocaleString());
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Ensure final value is exact
        if (decimals > 0) {
          setDisplayValue(endValue.toFixed(decimals));
        } else {
          setDisplayValue(endValue.toLocaleString());
        }
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration, isVisible, decimals]);

  return displayValue;
}

/**
 * Individual ticker stat component
 */
function TickerStatItem({
  stat,
  duration,
  isVisible,
  background,
  cardClassName,
  valueClassName,
  labelClassName,
  descriptionClassName,
}: {
  stat: TickerStat;
  duration: number;
  isVisible: boolean;
  background?: SectionBackground;
  cardClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
}) {
  // Determine decimal places based on the value
  const decimals = stat.value % 1 !== 0 ? 1 : 0;
  const displayValue = useNumberTicker(
    stat.value,
    duration,
    isVisible,
    decimals,
  );

  return (
    <div
      className={cn(
        "rounded-xl border p-6 transition-shadow hover:shadow-md",
        getNestedCardBg(background, "card"),
        getNestedCardTextColor(background),
        stat.className,
        cardClassName,
      )}
    >
      <div
        className={cn(
          "mb-2 text-4xl font-bold tabular-nums md:text-5xl",
          valueClassName,
        )}
      >
        {stat.prefix}
        {displayValue}
        {stat.suffix}
      </div>
      <div className={cn("mb-1 text-lg font-semibold", labelClassName)}>
        {stat.label}
      </div>
      {stat.description &&
        (typeof stat.description === "string" ? (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              descriptionClassName,
            )}
          >
            {stat.description}
          </p>
        ) : (
          <div className={cn("text-sm", descriptionClassName)}>
            {stat.description}
          </div>
        ))}
    </div>
  );
}

/**
 * StatsNumberTicker - A stats section featuring smooth number ticker animations
 * that count up when scrolled into view. Each stat card displays an animated
 * value with optional prefix/suffix, label, and description. Uses exponential
 * easing for a polished counting effect. Supports both integer and decimal values.
 * Ideal for landing pages, dashboards, or any section showcasing impressive metrics.
 *
 * @example
 * ```tsx
 * <StatsNumberTicker
 *   badge="By The Numbers"
 *   heading="Platform Statistics"
 *   stats={[
 *     { value: 10000, suffix: "+", label: "Active Users", description: "Growing community" },
 *     { value: 99.9, suffix: "%", label: "Uptime", description: "Enterprise-grade reliability" },
 *   ]}
 * />
 * ```
 */
export function StatsNumberTicker({
  sectionId = "stats-number-ticker",
  badge,
  badgeSlot,
  heading,
  description,
  stats,
  statsSlot,
  animationDuration = 2500,
  background = "white",
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
  statValueClassName,
  statLabelClassName,
  statDescriptionClassName,
}: StatsNumberTickerProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Memoized badge rendering
  const badgeContent = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badge) return null;
    return <Badge className={cn("mb-4", badgeClassName)}>{badge}</Badge>;
  }, [badgeSlot, badge, badgeClassName]);

  // Memoized stats rendering
  const statsContent = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div
        className={cn(
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
          statsGridClassName,
        )}
      >
        {stats.map((stat, index) => (
          <TickerStatItem
            key={index}
            stat={stat}
            duration={animationDuration}
            isVisible={isVisible}
            background={background}
            cardClassName={statCardClassName}
            valueClassName={statValueClassName}
            labelClassName={statLabelClassName}
            descriptionClassName={statDescriptionClassName}
          />
        ))}
      </div>
    );
  }, [
    statsSlot,
    stats,
    background,
    animationDuration,
    isVisible,
    statsGridClassName,
    statCardClassName,
    statValueClassName,
    statLabelClassName,
    statDescriptionClassName,
  ]);

  // Check if header has any content
  const hasHeaderContent = !!(badge || badgeSlot || heading || description);

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
      <div ref={sectionRef} className="relative">
        {hasHeaderContent && (
          <div className={cn("mb-12 text-center", headerClassName)}>
            {badgeContent}
            {heading &&
              (typeof heading === "string" ? (
                <h2
                  className={cn(
                    "mb-4 text-3xl font-bold md:text-4xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : (
                <div className={cn("mb-4", headingClassName)}>{heading}</div>
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
                <div className={cn("mx-auto max-w-2xl", descriptionClassName)}>
                  {description}
                </div>
              ))}
          </div>
        )}

        {statsContent}
      </div>
    </Section>
  );
}
