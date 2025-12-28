"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

/**
 * An impact stat with icon, value, label, and description
 */
export interface ImpactStat {
  /**
   * Unique identifier for the stat
   */
  id: string;
  /**
   * The stat value (e.g., "437", "2.4", "89")
   */
  value: string;
  /**
   * Prefix for the value (e.g., "$")
   */
  prefix?: string;
  /**
   * Suffix for the value (e.g., "%", "B+", "x")
   */
  suffix?: string;
  /**
   * The label for the stat
   */
  label: string;
  /**
   * Description of the stat
   */
  description: string;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/line-chart")
   */
  icon: string;
  /**
   * Icon color class (e.g., "text-primary", "text-emerald-500")
   */
  iconColor?: string;
}

/**
 * Props for the StatsImpactGrid component
 */
export interface StatsImpactGridProps {
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
   * Array of impact stats to display
   */
  stats?: ImpactStat[];
  /**
   * Industry comparison section heading
   */
  comparisonHeading?: string;
  /**
   * Industry comparison description
   */
  comparisonDescription?: string;
  /**
   * Industry average value
   */
  industryAverage?: string;
  /**
   * Platform value
   */
  platformValue?: string;
  /**
   * CTA heading
   */
  ctaHeading?: string;
  /**
   * Primary CTA button text
   */
  primaryButtonText?: string;
  /**
   * Primary CTA button URL
   */
  primaryButtonUrl?: string;
  /**
   * Secondary CTA button text
   */
  secondaryButtonText?: string;
  /**
   * Secondary CTA button URL
   */
  secondaryButtonUrl?: string;
}

const defaultStats: ImpactStat[] = [
  {
    id: "roi",
    value: "437",
    suffix: "%",
    label: "Average ROI",
    description: "Return on investment for businesses using our platform",
    icon: "lucide/line-chart",
    iconColor: "text-primary",
  },
  {
    id: "revenue",
    value: "2.4",
    prefix: "$",
    suffix: "B+",
    label: "Revenue Generated",
    description: "Total revenue generated for our customers",
    icon: "lucide/dollar-sign",
    iconColor: "text-emerald-500",
  },
  {
    id: "conversion",
    value: "89",
    suffix: "%",
    label: "Conversion Increase",
    description: "Average lift in conversion rates after implementation",
    icon: "lucide/pie-chart",
    iconColor: "text-blue-500",
  },
  {
    id: "time",
    value: "60",
    suffix: "%",
    label: "Time Saved",
    description: "Average reduction in manual workload for marketing teams",
    icon: "lucide/clock",
    iconColor: "text-amber-500",
  },
  {
    id: "growth",
    value: "3.7",
    suffix: "x",
    label: "Customer Growth",
    description: "Average growth in customer base year-over-year",
    icon: "lucide/target",
    iconColor: "text-purple-500",
  },
  {
    id: "efficiency",
    value: "83",
    suffix: "%",
    label: "Marketing Efficiency",
    description: "Improvement in marketing efficiency across channels",
    icon: "lucide/zap",
    iconColor: "text-rose-500",
  },
];

/**
 * StatsImpactGrid - A comprehensive stats section featuring a grid of impact metrics
 * with icons, an industry comparison bar chart, and a call-to-action. Each stat card
 * displays an icon, large value with prefix/suffix, label, and description. Includes
 * a visual comparison between industry average and platform performance. Ideal for
 * showcasing ROI, business impact, or platform benefits with social proof.
 *
 * @example
 * ```tsx
 * <StatsImpactGrid
 *   badge="Proven Results"
 *   heading="Transforming Businesses With Real Numbers"
 *   stats={[
 *     { id: "roi", value: "437", suffix: "%", label: "Average ROI", ... },
 *   ]}
 * />
 * ```
 */
export function StatsImpactGrid({
  className,
  badge = "Proven Results",
  heading = "Transforming Businesses With Real Numbers",
  description = "Our platform delivers measurable impact for businesses of all sizes. See the difference in black and white.",
  stats = defaultStats,
  comparisonHeading = "How Does This Compare?",
  comparisonDescription = "Our platform delivers results that are 4x better than industry averages across all key performance indicators.",
  industryAverage = "24%",
  platformValue = "89%",
  ctaHeading = "Ready to See These Results in Your Business?",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "View Case Studies",
  secondaryButtonUrl = "#",
}: StatsImpactGridProps) {
  return (
    <div
      className={cn(
        "container relative mx-auto overflow-hidden px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]",
        className
      )}
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Badge className="mb-4">{badge}</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            {heading.split(" ").slice(0, 2).join(" ")}{" "}
            <br className="hidden md:inline" />
            {heading.split(" ").slice(2).join(" ")}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Impact Numbers Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.id} className={cn("overflow-hidden border p-0")}>
              <CardContent className="p-6 md:p-8">
                <div className="mb-6">
                  <DynamicIcon
                    name={stat.icon}
                    size={32}
                    className={stat.iconColor || "text-primary"}
                  />
                </div>

                <div className="mb-2 flex items-end">
                  {stat.prefix && (
                    <span className="mb-1 mr-1 text-2xl font-bold">
                      {stat.prefix}
                    </span>
                  )}
                  <h3 className="text-4xl font-bold tracking-tight md:text-5xl">
                    {stat.value}
                  </h3>
                  {stat.suffix && (
                    <span className="mb-1 ml-1 text-2xl font-bold">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                <div className="mb-4 text-xl font-semibold">{stat.label}</div>
                <p className="text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industry comparison */}
        <div className="mb-16 rounded-xl bg-muted p-8">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="mb-4 text-2xl font-bold">{comparisonHeading}</h3>
              <p className="mb-6 text-muted-foreground">
                {comparisonDescription}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted-foreground/20">
                    <div className="h-full w-[24%] bg-muted-foreground" />
                  </div>
                  <span className="min-w-[60px] text-sm font-medium">
                    Industry
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-primary/20">
                    <div className="h-full w-[89%] bg-primary" />
                  </div>
                  <span className="min-w-[60px] text-sm font-medium">
                    Our Platform
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-center md:border-l md:pl-16 md:text-left">
              <div>
                <div className="text-sm text-muted-foreground">
                  INDUSTRY AVERAGE
                </div>
                <div className="text-3xl font-bold">{industryAverage}</div>
              </div>
              <div className="flex h-12 items-center justify-center md:justify-start">
                <DynamicIcon
                  name="lucide/arrow-up-right"
                  size={32}
                  className="text-primary"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-primary">
                  OUR PLATFORM
                </div>
                <div className="text-4xl font-bold text-primary">
                  {platformValue}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="mb-6 text-2xl font-bold">{ctaHeading}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Pressable
              href={primaryButtonUrl}
              variant="default"
              size="lg"
              asButton
              className="inline-flex items-center justify-center gap-2"
            >
              {primaryButtonText}
              <DynamicIcon name="lucide/arrow-right" size={16} />
            </Pressable>
            <Pressable
              href={secondaryButtonUrl}
              variant="outline"
              size="lg"
              asButton
            >
              {secondaryButtonText}
            </Pressable>
          </div>
        </div>
      </div>
    </div>
  );
}
