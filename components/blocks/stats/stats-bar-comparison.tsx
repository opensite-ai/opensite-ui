"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";

/**
 * A comparison bar item
 */
export interface ComparisonBar {
  /**
   * The label for the bar
   */
  label: string;
  /**
   * The value (0-100 for percentage width)
   */
  value: number;
  /**
   * Display value text (e.g., "$2.4M", "89%")
   */
  displayValue: string;
  /**
   * Color class for the bar (e.g., "bg-primary", "bg-emerald-500")
   */
  color?: string;
}

/**
 * A comparison group with multiple bars
 */
export interface ComparisonGroup {
  /**
   * Title for the comparison group
   */
  title: string;
  /**
   * Bars to compare
   */
  bars: ComparisonBar[];
}

/**
 * Props for the StatsBarComparison component
 */
export interface StatsBarComparisonProps {
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
   * Array of comparison groups
   */
  comparisons?: ComparisonGroup[];
  /**
   * Whether to animate bars on scroll
   * @default true
   */
  animate?: boolean;
}

const defaultComparisons: ComparisonGroup[] = [
  {
    title: "Revenue Growth",
    bars: [
      { label: "Our Platform", value: 89, displayValue: "$2.4M", color: "bg-primary" },
      { label: "Industry Average", value: 34, displayValue: "$920K", color: "bg-muted-foreground/40" },
    ],
  },
  {
    title: "Customer Retention",
    bars: [
      { label: "Our Platform", value: 94, displayValue: "94%", color: "bg-emerald-500" },
      { label: "Industry Average", value: 67, displayValue: "67%", color: "bg-muted-foreground/40" },
    ],
  },
  {
    title: "Time to Value",
    bars: [
      { label: "Our Platform", value: 85, displayValue: "2 weeks", color: "bg-blue-500" },
      { label: "Industry Average", value: 35, displayValue: "8 weeks", color: "bg-muted-foreground/40" },
    ],
  },
  {
    title: "Support Response",
    bars: [
      { label: "Our Platform", value: 95, displayValue: "< 1 hour", color: "bg-amber-500" },
      { label: "Industry Average", value: 45, displayValue: "24 hours", color: "bg-muted-foreground/40" },
    ],
  },
];

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
  className,
  badge = "Competitive Edge",
  heading = "How We Compare",
  description = "See how our platform outperforms industry standards across key metrics",
  comparisons = defaultComparisons,
  animate = true,
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animate]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]",
        className
      )}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            {badge}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="space-y-10">
          {comparisons.map((group, groupIndex) => (
            <div key={groupIndex} className="rounded-xl border bg-card p-6">
              <h3 className="mb-6 text-lg font-semibold">{group.title}</h3>
              <div className="space-y-4">
                {group.bars.map((bar, barIndex) => (
                  <div key={barIndex}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{bar.label}</span>
                      <span className="text-sm font-bold">{bar.displayValue}</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-1000 ease-out",
                          bar.color || "bg-primary"
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
          ))}
        </div>
      </div>
    </div>
  );
}
