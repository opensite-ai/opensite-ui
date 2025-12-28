"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * A single stat entry with value, change, and trend
 */
export interface TimelineStat {
  /**
   * The label for the stat
   */
  label: string;
  /**
   * The stat value (e.g., "1,284", "32,891", "5.2%")
   */
  value: string;
  /**
   * The percentage change
   */
  change: number;
  /**
   * Whether the trend is up or down
   */
  trend: "up" | "down";
  /**
   * Label for the comparison period
   */
  previousLabel: string;
  /**
   * If true, a downward trend is considered positive (e.g., for support tickets)
   */
  inversePositive?: boolean;
}

/**
 * A time period with its associated stats
 */
export interface TimePeriod {
  /**
   * Unique identifier for the period
   */
  id: string;
  /**
   * Display label for the period
   */
  label: string;
  /**
   * Stats for this time period
   */
  stats: TimelineStat[];
}

/**
 * Props for the StatsTimelineTabs component
 */
export interface StatsTimelineTabsProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Badge text above the heading
   */
  badge?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Array of time periods with their stats
   */
  periods?: TimePeriod[];
  /**
   * Default selected period ID
   */
  defaultPeriod?: string;
}

const defaultPeriods: TimePeriod[] = [
  {
    id: "weekly",
    label: "Weekly",
    stats: [
      { label: "New Sign-ups", value: "1,284", change: 12.3, trend: "up", previousLabel: "Previous week" },
      { label: "Active Sessions", value: "32,891", change: 8.7, trend: "up", previousLabel: "Previous week" },
      { label: "Conversion Rate", value: "5.2%", change: 0.8, trend: "up", previousLabel: "Previous week" },
      { label: "Support Tickets", value: "187", change: -5.3, trend: "down", previousLabel: "Previous week", inversePositive: true },
    ],
  },
  {
    id: "monthly",
    label: "Monthly",
    stats: [
      { label: "New Sign-ups", value: "5,726", change: 15.8, trend: "up", previousLabel: "Previous month" },
      { label: "Active Sessions", value: "142,308", change: 11.2, trend: "up", previousLabel: "Previous month" },
      { label: "Conversion Rate", value: "6.7%", change: 1.4, trend: "up", previousLabel: "Previous month" },
      { label: "Support Tickets", value: "834", change: -3.1, trend: "down", previousLabel: "Previous month", inversePositive: true },
    ],
  },
  {
    id: "quarterly",
    label: "Quarterly",
    stats: [
      { label: "New Sign-ups", value: "18,492", change: 32.1, trend: "up", previousLabel: "Previous quarter" },
      { label: "Active Sessions", value: "487,125", change: 24.3, trend: "up", previousLabel: "Previous quarter" },
      { label: "Conversion Rate", value: "8.3%", change: 2.1, trend: "up", previousLabel: "Previous quarter" },
      { label: "Support Tickets", value: "2,874", change: -8.5, trend: "down", previousLabel: "Previous quarter", inversePositive: true },
    ],
  },
  {
    id: "yearly",
    label: "Yearly",
    stats: [
      { label: "New Sign-ups", value: "76,542", change: 65.4, trend: "up", previousLabel: "Previous year" },
      { label: "Active Sessions", value: "2.1M", change: 48.7, trend: "up", previousLabel: "Previous year" },
      { label: "Conversion Rate", value: "9.2%", change: 3.5, trend: "up", previousLabel: "Previous year" },
      { label: "Support Tickets", value: "12,458", change: -12.3, trend: "down", previousLabel: "Previous year", inversePositive: true },
    ],
  },
];

/**
 * StatsTimelineTabs - A tabbed stats display showing metrics across different time periods
 * (weekly, monthly, quarterly, yearly). Features a badge header, centered tab navigation,
 * and a responsive grid of stat cards with color-coded trend indicators. Each stat shows
 * the value, percentage change, and comparison period. Ideal for analytics dashboards,
 * performance reports, or any time-series data visualization.
 *
 * @example
 * ```tsx
 * <StatsTimelineTabs
 *   badge="Performance Timeline"
 *   heading="Growth Progression"
 *   description="Track our key metrics over different time periods"
 *   defaultPeriod="monthly"
 * />
 * ```
 */
export function StatsTimelineTabs({
  className,
  badge = "Performance Timeline",
  heading = "Growth Progression",
  description = "Track our key metrics over different time periods to see our consistent growth and improvements",
  periods = defaultPeriods,
  defaultPeriod = "monthly",
}: StatsTimelineTabsProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col space-y-6">
          <div className="space-y-2 text-center">
            <Badge className="mb-2">{badge}</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">{heading}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {description}
            </p>
          </div>

          <Tabs defaultValue={defaultPeriod} className="mt-8 w-full">
            <div className="mb-8 flex justify-center">
              <TabsList>
                {periods.map((period) => (
                  <TabsTrigger key={period.id} value={period.id}>
                    {period.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {periods.map((period) => (
              <TabsContent key={period.id} value={period.id} className="mt-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {period.stats.map((stat, index) => {
                    const isPositive =
                      (stat.trend === "up" && !stat.inversePositive) ||
                      (stat.trend === "down" && stat.inversePositive);

                    return (
                      <div
                        key={index}
                        className="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-lg font-medium">{stat.label}</p>
                          <div className="flex items-center">
                            <DynamicIcon
                              name="lucide/clock"
                              size={16}
                              className="mr-1 text-muted-foreground"
                            />
                            <span className="text-xs text-muted-foreground">
                              {period.label}
                            </span>
                          </div>
                        </div>

                        <h3 className="mt-4 text-3xl font-bold">{stat.value}</h3>

                        <div className="mt-2 flex items-center">
                          <div
                            className={cn(
                              "flex items-center rounded-full px-2 py-1 text-xs font-medium",
                              isPositive
                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                                : "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                            )}
                          >
                            <DynamicIcon
                              name={
                                stat.trend === "up"
                                  ? "lucide/arrow-up-right"
                                  : "lucide/arrow-down-right"
                              }
                              size={12}
                              className="mr-1"
                            />
                            {Math.abs(stat.change)}%
                          </div>
                          <p className="ml-2 text-sm text-muted-foreground">
                            vs {stat.previousLabel}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
