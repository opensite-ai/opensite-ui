"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";

/**
 * A stat item with a value and label
 */
export interface StatItem {
  /**
   * The stat value (e.g., "90%", "200+", "$2.5M")
   */
  value: string;
  /**
   * The label describing the stat
   */
  label: string;
}

/**
 * Props for the StatsSimpleGrid component
 */
export interface StatsSimpleGridProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Array of stat items to display
   */
  stats?: StatItem[];
  /**
   * Primary button text
   */
  primaryButtonText?: string;
  /**
   * Primary button URL
   */
  primaryButtonUrl?: string;
  /**
   * Secondary button text
   */
  secondaryButtonText?: string;
  /**
   * Secondary button URL
   */
  secondaryButtonUrl?: string;
}

const defaultStats: StatItem[] = [
  { value: "90%", label: "Customer Satisfaction" },
  { value: "200+", label: "Enterprise Clients" },
  { value: "99%", label: "Uptime Guarantee" },
  { value: "150+", label: "Team Members" },
];

/**
 * StatsSimpleGrid - A clean, minimal stats section with a heading, action buttons,
 * and a responsive grid of key metrics. Features a 2x2 grid on mobile that expands
 * to 4 columns on larger screens. Ideal for showcasing company achievements,
 * platform performance, or key business metrics with prominent numerical values.
 *
 * @example
 * ```tsx
 * <StatsSimpleGrid
 *   heading="Platform Performance Insights"
 *   stats={[
 *     { value: "90%", label: "Customer Satisfaction" },
 *     { value: "200+", label: "Enterprise Clients" },
 *   ]}
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 * />
 * ```
 */
export function StatsSimpleGrid({
  className,
  heading = "Platform Performance Insights",
  stats = defaultStats,
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
}: StatsSimpleGridProps) {
  return (
    <section className={cn("bg-accent py-32", className)}>
      <div className="container flex flex-col items-start text-left">
        <div className="mb-12 w-full md:mb-16">
          <h2 className="mb-8 w-full max-w-[24rem] text-3xl font-bold text-pretty sm:text-4xl md:max-w-[30rem] lg:max-w-[37rem] lg:text-5xl">
            {heading}
          </h2>
          <div className="flex flex-col justify-start gap-2 sm:flex-row">
            <Pressable
              href={primaryButtonUrl}
              variant="default"
              size="default"
              asButton
              className="w-full sm:w-auto"
            >
              {primaryButtonText}
            </Pressable>
            <Pressable
              href={secondaryButtonUrl}
              variant="outline"
              size="default"
              asButton
              className="w-full sm:w-auto"
            >
              {secondaryButtonText}
            </Pressable>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-12 sm:w-fit sm:grid-cols-4 lg:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="w-full">
              <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
                {stat.value}
              </div>
              <div className="text-base leading-6 text-muted-foreground lg:text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
