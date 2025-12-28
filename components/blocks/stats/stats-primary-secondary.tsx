"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * A secondary stat item with value and label
 */
export interface SecondaryStat {
  /**
   * The stat value (e.g., "99.95%", "2,000+", "85%")
   */
  value: string;
  /**
   * The label describing the stat
   */
  label: string;
}

/**
 * Props for the StatsPrimarySecondary component
 */
export interface StatsPrimarySecondaryProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Primary stat value (large, prominent)
   */
  primaryValue?: string;
  /**
   * Primary stat badge text
   */
  primaryBadge?: string;
  /**
   * Primary stat description
   */
  primaryDescription?: string;
  /**
   * Array of secondary stats to display
   */
  secondaryStats?: SecondaryStat[];
}

const defaultSecondaryStats: SecondaryStat[] = [
  { value: "99.95%", label: "in fulfilling orders" },
  { value: "2,000+", label: "partner with Opensite AI" },
  { value: "85%", label: "this year alone" },
];

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
  className,
  primaryValue = "92%",
  primaryBadge = "+7% this month",
  primaryDescription = "of U.S. adults have bought from businesses using our platform",
  secondaryStats = defaultSecondaryStats,
}: StatsPrimarySecondaryProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]",
        className
      )}
    >
      <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:pe-6 xl:pe-12">
            <p className="text-6xl font-bold leading-10">
              {primaryValue}
              <Badge variant="secondary" className="ml-2 gap-1">
                <DynamicIcon name="lucide/badge-check" size={16} className="shrink-0" />
                {primaryBadge}
              </Badge>
            </p>
            <p className="mt-2 text-muted-foreground sm:mt-3">
              {primaryDescription}
            </p>
          </div>
        </div>

        <div className="relative lg:col-span-8 lg:before:absolute lg:before:-start-12 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-border">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:grid-cols-3">
            {secondaryStats.map((stat, index) => (
              <div key={index}>
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
