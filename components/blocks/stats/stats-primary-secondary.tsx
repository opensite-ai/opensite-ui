"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * A secondary stat item with value and label.
 * Used to display supporting metrics alongside a primary stat.
 */
export interface SecondaryStat {
  /**
   * The stat value (e.g., "99.95%", "2,000+", "85%")
   */
  value: React.ReactNode;
  /**
   * The label describing the stat
   */
  label: React.ReactNode;
  /**
   * Additional CSS classes for the stat
   */
  className?: string;
}

/**
 * Props for the StatsPrimarySecondary component.
 * A two-column stats layout featuring one prominent primary metric with a badge indicator, alongside a row of secondary supporting stats.
 */
export interface StatsPrimarySecondaryProps {
  /**
   * Primary stat value (large, prominent)
   */
  primaryValue?: React.ReactNode;
  /**
   * Primary stat badge content
   */
  primaryBadge?: React.ReactNode;
  /**
   * Custom slot for primary badge (overrides primaryBadge)
   */
  primaryBadgeSlot?: React.ReactNode;
  /**
   * Primary stat description
   */
  primaryDescription?: React.ReactNode;
  /**
   * Custom slot for primary section (overrides primaryValue/primaryBadge/primaryDescription)
   */
  primarySlot?: React.ReactNode;
  /**
   * Array of secondary stats to display
   */
  secondaryStats?: SecondaryStat[];
  /**
   * Custom slot for rendering secondary stats (overrides secondaryStats array)
   */
  secondaryStatsSlot?: React.ReactNode;
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
   * Additional CSS classes for the primary section
   */
  primaryClassName?: string;
  /**
   * Additional CSS classes for the primary value
   */
  primaryValueClassName?: string;
  /**
   * Additional CSS classes for the primary badge
   */
  primaryBadgeClassName?: string;
  /**
   * Additional CSS classes for the primary description
   */
  primaryDescriptionClassName?: string;
  /**
   * Additional CSS classes for the secondary section
   */
  secondaryClassName?: string;
  /**
   * Additional CSS classes for secondary stat values
   */
  secondaryValueClassName?: string;
  /**
   * Additional CSS classes for secondary stat labels
   */
  secondaryLabelClassName?: string;
}

/**
 * StatsPrimarySecondary - A two-column stats layout featuring one prominent primary
 * metric with a badge indicator, alongside a row of secondary supporting stats.
 * The primary stat is emphasized with large typography and a verification badge,
 * while secondary stats are displayed in a clean grid with a vertical divider.
 * Ideal for highlighting a key achievement with supporting metrics.
 *
 * @example
 * ```tsx
 * <StatsPrimarySecondary
 *   primaryValue="92%"
 *   primaryBadge="+7% this month"
 *   primaryDescription="of U.S. adults have bought from businesses using our platform"
 *   secondaryStats={[
 *     { value: "99.95%", label: "in fulfilling orders" },
 *     { value: "2,000+", label: "partner with us" },
 *   ]}
 * />
 * ```
 */
export function StatsPrimarySecondary({
  primaryValue,
  primaryBadge,
  primaryBadgeSlot,
  primaryDescription,
  primarySlot,
  secondaryStats,
  secondaryStatsSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  primaryClassName,
  primaryValueClassName,
  primaryBadgeClassName,
  primaryDescriptionClassName,
  secondaryClassName,
  secondaryValueClassName,
  secondaryLabelClassName,
}: StatsPrimarySecondaryProps) {
  // Memoized primary badge rendering
  const renderPrimaryBadge = useCallback(() => {
    if (primaryBadgeSlot) return primaryBadgeSlot;
    if (!primaryBadge) return null;
    return (
      <Badge variant="secondary" className={cn("ml-2 gap-1", primaryBadgeClassName)}>
        <DynamicIcon name="lucide/badge-check" size={16} className="shrink-0" />
        {primaryBadge}
      </Badge>
    );
  }, [primaryBadgeSlot, primaryBadge, primaryBadgeClassName]);

  // Memoized primary section rendering
  const primaryContent = useMemo(() => {
    if (primarySlot) return primarySlot;
    if (!primaryValue) return null;

    return (
      <div className={cn("lg:col-span-4", primaryClassName)}>
        <div className="lg:pe-6 xl:pe-12">
          <p className={cn("text-6xl font-bold leading-10", primaryValueClassName)}>
            {primaryValue}
            {renderPrimaryBadge()}
          </p>
          {primaryDescription && (
            typeof primaryDescription === "string" ? (
              <p className={cn("mt-2 text-muted-foreground sm:mt-3", primaryDescriptionClassName)}>
                {primaryDescription}
              </p>
            ) : (
              <div className={cn("mt-2 sm:mt-3", primaryDescriptionClassName)}>{primaryDescription}</div>
            )
          )}
        </div>
      </div>
    );
  }, [primarySlot, primaryValue, primaryClassName, primaryValueClassName, primaryDescription, primaryDescriptionClassName, renderPrimaryBadge]);

  // Memoized secondary stats rendering
  const secondaryStatsContent = useMemo(() => {
    if (secondaryStatsSlot) return secondaryStatsSlot;
    if (!secondaryStats || secondaryStats.length === 0) return null;

    return secondaryStats.map((stat, index) => (
      <div key={index} className={stat.className}>
        {stat.value && (
          <p className={cn("text-3xl font-semibold", secondaryValueClassName)}>{stat.value}</p>
        )}
        {stat.label && (
          <p className={cn("mt-1 text-muted-foreground", secondaryLabelClassName)}>{stat.label}</p>
        )}
      </div>
    ));
  }, [secondaryStatsSlot, secondaryStats, secondaryValueClassName, secondaryLabelClassName]);

  // Check if there's any content to render
  const hasPrimaryContent = !!(primarySlot || primaryValue);
  const hasSecondaryContent = !!(secondaryStatsSlot || (secondaryStats && secondaryStats.length > 0));

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("grid items-center gap-6 lg:grid-cols-12 lg:gap-12", containerClassName)}>
        {hasPrimaryContent && primaryContent}

        {hasSecondaryContent && (
          <div className={cn("relative lg:before:absolute lg:before:-start-12 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-border", hasPrimaryContent ? "lg:col-span-8" : "lg:col-span-12", secondaryClassName)}>
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:grid-cols-3">
              {secondaryStatsContent}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
