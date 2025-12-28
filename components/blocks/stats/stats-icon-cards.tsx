"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * A stat item with icon, value, label, and growth indicator
 */
export interface StatIconItem {
  /**
   * The label describing the stat
   */
  label: string;
  /**
   * The stat value (e.g., "120K+", "$3.2M", "9.5%")
   */
  value: string;
  /**
   * Growth indicator text (e.g., "18% growth", "+2 min")
   */
  growth: string;
  /**
   * Whether the growth is positive (green) or negative (red)
   * @default true
   */
  isPositive?: boolean;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/users", "lucide/clock")
   */
  icon: string;
}

/**
 * Props for the StatsIconCards component
 */
export interface StatsIconCardsProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Array of stat items to display
   */
  stats?: StatIconItem[];
}

const defaultStats: StatIconItem[] = [
  {
    label: "Active Users",
    value: "120K+",
    growth: "18% growth",
    isPositive: true,
    icon: "lucide/users",
  },
  {
    label: "Avg. Session",
    value: "4:30",
    growth: "+2 min",
    isPositive: true,
    icon: "lucide/clock",
  },
  {
    label: "Revenue",
    value: "$3.2M",
    growth: "32% increase",
    isPositive: true,
    icon: "lucide/dollar-sign",
  },
  {
    label: "Conversion",
    value: "9.5%",
    growth: "2.1% higher",
    isPositive: true,
    icon: "lucide/target",
  },
];

/**
 * StatsIconCards - A modern stats grid featuring bordered cards with icons,
 * large numerical values, and growth indicators. Each card displays a metric
 * with a circular icon badge, prominent value, and color-coded growth trend.
 * Ideal for dashboards, analytics sections, or showcasing key performance
 * indicators with visual hierarchy.
 *
 * @example
 * ```tsx
 * <StatsIconCards
 *   heading="Our Growth in Numbers"
 *   description="Key metrics that showcase our impact"
 *   stats={[
 *     { label: "Active Users", value: "120K+", growth: "18% growth", icon: "lucide/users" },
 *     { label: "Revenue", value: "$3.2M", growth: "32% increase", icon: "lucide/dollar-sign" },
 *   ]}
 * />
 * ```
 */
export function StatsIconCards({
  className,
  heading = "Our Growth in Numbers",
  description = "Key metrics that showcase our impact in the market",
  stats = defaultStats,
}: StatsIconCardsProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]",
        className
      )}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mt-3 text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl border bg-background p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <h3 className="mt-4 text-4xl font-bold">{stat.value}</h3>
                  <p
                    className={cn(
                      "mt-1 flex items-center text-sm font-medium",
                      stat.isPositive !== false
                        ? "text-emerald-500"
                        : "text-rose-500"
                    )}
                  >
                    <DynamicIcon
                      name={
                        stat.isPositive !== false
                          ? "lucide/arrow-up-right"
                          : "lucide/arrow-down-right"
                      }
                      size={16}
                      className="mr-1"
                    />
                    <span>{stat.growth}</span>
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <DynamicIcon
                    name={stat.icon}
                    size={24}
                    className="text-primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
