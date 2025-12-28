"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

/**
 * A stat with circular progress indicator
 */
export interface CircularStat {
  /**
   * The label for the stat
   */
  label: string;
  /**
   * The stat value (0-100 for percentage display)
   */
  value: number;
  /**
   * Suffix for the value (e.g., "%", "")
   */
  suffix?: string;
  /**
   * Additional info text
   */
  info: string;
}

/**
 * A category of stats
 */
export interface StatCategory {
  /**
   * Unique identifier for the category
   */
  id: string;
  /**
   * Display name for the category
   */
  name: string;
  /**
   * Stats for this category
   */
  stats: CircularStat[];
}

/**
 * Props for the StatsCircularProgress component
 */
export interface StatsCircularProgressProps {
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
   * Array of stat categories
   */
  categories?: StatCategory[];
  /**
   * Default selected category ID
   */
  defaultCategory?: string;
}

const defaultCategories: StatCategory[] = [
  {
    id: "business",
    name: "Business",
    stats: [
      { label: "Revenue Growth", value: 84, suffix: "%", info: "Year over year" },
      { label: "ROI", value: 167, suffix: "%", info: "Return on investment" },
      { label: "Market Share", value: 42, suffix: "%", info: "In primary markets" },
      { label: "Profit Margin", value: 23, suffix: "%", info: "Net margin" },
    ],
  },
  {
    id: "technical",
    name: "Technical",
    stats: [
      { label: "System Uptime", value: 99.97, suffix: "%", info: "Last 30 days" },
      { label: "Load Time", value: 78, suffix: "%", info: "Faster than average" },
      { label: "Code Coverage", value: 91, suffix: "%", info: "Test coverage" },
      { label: "API Performance", value: 88, suffix: "%", info: "Response time" },
    ],
  },
  {
    id: "customer",
    name: "Customer",
    stats: [
      { label: "Satisfaction", value: 94, suffix: "%", info: "Overall rating" },
      { label: "Retention", value: 87, suffix: "%", info: "Customer loyalty" },
      { label: "NPS Score", value: 72, suffix: "", info: "Net promoter score" },
      { label: "Support Rating", value: 96, suffix: "%", info: "Issue resolution" },
    ],
  },
];

/**
 * Helper function to determine color based on value
 */
function getColorClass(value: number): string {
  if (value >= 90) return "text-emerald-500";
  if (value >= 75) return "text-blue-500";
  if (value >= 50) return "text-amber-500";
  return "text-rose-500";
}

/**
 * SVG Circular Progress component
 */
function CircularProgressIndicator({
  value,
  size = 120,
  strokeWidth = 10,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const offset = circumference - (normalizedValue / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90 transform"
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-gray-200 dark:text-gray-800"
      />
      {/* Foreground circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={cn(getColorClass(value))}
      />
    </svg>
  );
}

/**
 * StatsCircularProgress - A tabbed stats display featuring circular progress indicators
 * organized by category (Business, Technical, Customer). Each stat shows a visual
 * circular progress ring with the value centered inside, along with a label and
 * additional info. Includes both desktop tabs and mobile dropdown for category
 * selection. Ideal for KPI dashboards, performance reports, or multi-dimensional
 * metrics visualization.
 *
 * @example
 * ```tsx
 * <StatsCircularProgress
 *   badge="Performance"
 *   heading="Key Performance Indicators"
 *   categories={[
 *     { id: "business", name: "Business", stats: [...] },
 *   ]}
 * />
 * ```
 */
export function StatsCircularProgress({
  className,
  badge = "Performance",
  heading = "Key Performance Indicators",
  description = "Visualizing our achievements across all business aspects",
  categories = defaultCategories,
  defaultCategory = "business",
}: StatsCircularProgressProps) {
  const [category, setCategory] = React.useState(defaultCategory);

  return (
    <div
      className={cn(
        "container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            {badge}
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Mobile Dropdown */}
        <div className="mb-8 md:hidden">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={`select-${cat.id}`} value={cat.id}>
                {cat.name} Metrics
              </option>
            ))}
          </select>
        </div>

        {/* Tabs for desktop */}
        <Tabs value={category} onValueChange={setCategory} className="w-full">
          {/* Desktop Tabs */}
          <div className="mb-12 hidden justify-center md:flex">
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name} Metrics
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {cat.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center rounded-xl border bg-card p-6"
                  >
                    <div className="relative mb-4 flex items-center justify-center">
                      <CircularProgressIndicator value={stat.value} size={120} />
                      <div className="absolute flex flex-col items-center justify-center">
                        <span
                          className={cn(
                            "text-2xl font-bold md:text-3xl",
                            getColorClass(stat.value)
                          )}
                        >
                          {stat.value}
                          {stat.suffix}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-center text-lg font-semibold md:text-xl">
                      {stat.label}
                    </h3>
                    <p className="mt-1 text-center text-xs text-muted-foreground md:text-sm">
                      {stat.info}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
