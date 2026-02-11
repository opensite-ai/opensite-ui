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
 * A comparison bar item.
 * Used to display a single bar in a comparison visualization.
 */
export interface ComparisonBar {
  /**
   * The label for the bar
   */
  label: React.ReactNode;
  /**
   * The value (0-100 for percentage width)
   */
  value: number;
  /**
   * Display value text (e.g., "$2.4M", "89%")
   */
  displayValue: React.ReactNode;
  /**
   * Color class for the bar (e.g., "bg-primary", "bg-emerald-500")
   */
  color?: string;
  /**
   * Additional CSS classes for the bar
   */
  className?: string;
}

/**
 * A comparison group with multiple bars.
 * Used to group related comparison bars together.
 */
export interface ComparisonGroup {
  /**
   * Title for the comparison group
   */
  title: React.ReactNode;
  /**
   * Bars to compare
   */
  bars: ComparisonBar[];
  /**
   * Additional CSS classes for the group
   */
  className?: string;
}

/**
 * Props for the StatsBarComparison component.
 * A visual comparison section featuring animated horizontal bar charts.
 */
export interface StatsBarComparisonProps {
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
   * Array of comparison groups
   */
  comparisons?: ComparisonGroup[];
  /**
   * Custom slot for rendering comparisons (overrides comparisons array)
   */
  comparisonsSlot?: React.ReactNode;
  /**
   * Whether to animate bars on scroll
   * @default true
   */
  animate?: boolean;
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
   * Additional CSS classes for the comparisons container
   */
  comparisonsClassName?: string;
  /**
   * Additional CSS classes for comparison group cards
   */
  groupCardClassName?: string;
  /**
   * Additional CSS classes for group titles
   */
  groupTitleClassName?: string;
  /**
   * Additional CSS classes for bar labels
   */
  barLabelClassName?: string;
  /**
   * Additional CSS classes for bar values
   */
  barValueClassName?: string;
  /**
   * Additional CSS classes for bar tracks
   */
  barTrackClassName?: string;
}

/**
 * StatsBarComparison - A visual comparison section featuring animated horizontal
 * bar charts that compare platform metrics against industry averages. Each group
 * displays a title and two bars with labels and values. Bars animate from 0 to
 * their target width when scrolled into view. Ideal for competitive analysis,
 * benchmark comparisons, or showcasing platform advantages.
 *
 * @example
 * ```tsx
 * <StatsBarComparison
 *   badge="Competitive Edge"
 *   heading="How We Compare"
 *   comparisons={[
 *     {
 *       title: "Revenue Growth",
 *       bars: [
 *         { label: "Our Platform", value: 89, displayValue: "$2.4M", color: "bg-primary" },
 *         { label: "Industry Average", value: 34, displayValue: "$920K" },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */
export function StatsBarComparison({
  badge,
  badgeSlot,
  heading,
  description,
  comparisons,
  comparisonsSlot,
  animate = true,
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
  comparisonsClassName,
  groupCardClassName,
  groupTitleClassName,
  barLabelClassName,
  barValueClassName,
  barTrackClassName,
}: StatsBarComparisonProps) {
  const [isVisible, setIsVisible] = React.useState(!animate);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!animate) return;

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
  }, [animate]);

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

  // Memoized comparisons rendering
  const comparisonsContent = useMemo(() => {
    if (comparisonsSlot) return comparisonsSlot;
    if (!comparisons || comparisons.length === 0) return null;

    return comparisons.map((group, groupIndex) => (
      <div
        key={groupIndex}
        className={cn(
          "rounded-xl border p-6",
          getNestedCardBg(background, "card"),
          getNestedCardTextColor(background),
          group.className,
          groupCardClassName,
        )}
      >
        {group.title &&
          (typeof group.title === "string" ? (
            <h3
              className={cn("mb-6 text-lg font-semibold", groupTitleClassName)}
            >
              {group.title}
            </h3>
          ) : (
            <div className={cn("mb-6", groupTitleClassName)}>{group.title}</div>
          ))}
        <div className="space-y-4">
          {group.bars.map((bar, barIndex) => (
            <div key={barIndex} className={bar.className}>
              <div className="mb-2 flex items-center justify-between">
                <span className={cn("text-sm font-medium", barLabelClassName)}>
                  {bar.label}
                </span>
                <span className={cn("text-sm font-bold", barValueClassName)}>
                  {bar.displayValue}
                </span>
              </div>
              <div
                className={cn(
                  "h-3 w-full overflow-hidden rounded-full",
                  getNestedCardBg(background, "muted"),
                  barTrackClassName,
                )}
              >
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    bar.color || "bg-primary",
                  )}
                  style={{
                    width: isVisible ? `${bar.value}%` : "0%",
                    transitionDelay: `${groupIndex * 100 + barIndex * 50}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  }, [
    comparisonsSlot,
    comparisons,
    background,
    isVisible,
    groupCardClassName,
    groupTitleClassName,
    barLabelClassName,
    barValueClassName,
    barTrackClassName,
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

        {(comparisonsSlot || (comparisons && comparisons.length > 0)) && (
          <div className={cn("space-y-10", comparisonsClassName)}>
            {comparisonsContent}
          </div>
        )}
      </div>
    </Section>
  );
}
