"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * A stat with animated counter.
 * Used to display metrics that animate from 0 to their target value.
 */
export interface AnimatedStat {
  /**
   * The end value for the counter animation
   */
  value: number;
  /**
   * Prefix for the value (e.g., "$", "+")
   */
  prefix?: string;
  /**
   * Suffix for the value (e.g., "%", "K", "M", "+")
   */
  suffix?: string;
  /**
   * The label for the stat
   */
  label: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/users")
   */
  icon?: string;
  /**
   * Custom icon element (overrides icon name)
   */
  iconSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the stat item
   */
  className?: string;
}

/**
 * Props for the StatsAnimatedCounter component.
 * A stats section with animated number counters that trigger on scroll.
 */
export interface StatsAnimatedCounterProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Array of stats to display with animated counters
   */
  stats?: AnimatedStat[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Animation duration in milliseconds
   * @default 2000
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
   * Additional CSS classes for stat values
   */
  statValueClassName?: string;
  /**
   * Additional CSS classes for stat labels
   */
  statLabelClassName?: string;
  /**
   * Additional CSS classes for stat icons
   */
  statIconClassName?: string;
}

/**
 * Hook for animated counter with intersection observer
 */
function useAnimatedCounter(
  endValue: number,
  duration: number = 2000,
  isVisible: boolean,
): number {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * endValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration, isVisible]);

  return count;
}

/**
 * Individual animated stat component
 */
function AnimatedStatItem({
  stat,
  duration,
  isVisible,
  valueClassName,
  labelClassName,
  iconClassName,
}: {
  stat: AnimatedStat;
  duration: number;
  isVisible: boolean;
  valueClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
}) {
  const count = useAnimatedCounter(stat.value, duration, isVisible);

  // Memoized icon rendering
  const iconContent = useMemo(() => {
    if (stat.iconSlot) return stat.iconSlot;
    if (!stat.icon) return null;
    return (
      <div
        className={cn(
          "mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10",
          iconClassName,
        )}
      >
        <DynamicIcon name={stat.icon} size={28} className="text-primary" />
      </div>
    );
  }, [stat.iconSlot, stat.icon, iconClassName]);

  return (
    <div
      className={cn("flex flex-col items-center text-center", stat.className)}
    >
      {iconContent}
      <div
        className={cn("mb-2 text-4xl font-bold md:text-5xl", valueClassName)}
      >
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      {stat.label && (
        <div className={cn("text-muted-foreground", labelClassName)}>
          {stat.label}
        </div>
      )}
    </div>
  );
}

/**
 * StatsAnimatedCounter - A stats section featuring animated number counters that
 * trigger when scrolled into view. Each stat displays an optional icon, animated
 * value with prefix/suffix, and label. Uses intersection observer to start the
 * animation only when visible. Ideal for impact sections, achievements, or any
 * metrics that benefit from engaging number animations.
 *
 * @example
 * ```tsx
 * <StatsAnimatedCounter
 *   heading="Our Impact"
 *   stats={[
 *     { value: 500, suffix: "+", label: "Projects Completed", icon: "lucide/folder-check" },
 *     { value: 98, suffix: "%", label: "Satisfaction Rate", icon: "lucide/heart" },
 *   ]}
 *   animationDuration={2000}
 * />
 * ```
 */
export function StatsAnimatedCounter({
  heading,
  description,
  stats,
  statsSlot,
  animationDuration = 2000,
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
  statValueClassName,
  statLabelClassName,
  statIconClassName,
}: StatsAnimatedCounterProps) {
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

  // Check if header has any content
  const hasHeaderContent = !!(heading || description);

  // Memoized stats rendering
  const statsContent = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <AnimatedStatItem
        key={index}
        stat={stat}
        duration={animationDuration}
        isVisible={isVisible}
        valueClassName={statValueClassName}
        labelClassName={statLabelClassName}
        iconClassName={statIconClassName}
      />
    ));
  }, [
    statsSlot,
    stats,
    animationDuration,
    isVisible,
    statValueClassName,
    statLabelClassName,
    statIconClassName,
  ]);

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
      <div ref={sectionRef} className="relative">
        {hasHeaderContent && (
          <div className={cn("mb-12 text-center", contentClassName)}>
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
