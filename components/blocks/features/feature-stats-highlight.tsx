"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";

export interface FeatureStatsHighlightStat {
  /**
   * Stat value (e.g., "99%", "24/7")
   */
  value: string;
  /**
   * Stat label
   */
  label: string;
}

export interface FeatureStatsHighlightProps {
  /**
   * Badge text
   */
  badge?: string;
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Button text
   */
  buttonText?: string;
  /**
   * Button link URL
   */
  buttonLink?: string;
  /**
   * Array of stat items
   */
  stats?: FeatureStatsHighlightStat[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * Feature Stats Highlight - Feature section with stats grid and CTA button,
 * showcasing key metrics and achievements.
 *
 * Layout: Two-column layout with content/CTA on left, stats grid on right.
 * Key features: Badge header, stats grid, CTA button, responsive layout.
 * Best for: Company achievements, service highlights, trust indicators.
 *
 * @example
 * ```tsx
 * <FeatureStatsHighlight
 *   badge="Why Choose Us"
 *   title="We deliver results"
 *   description="Our platform helps businesses grow."
 *   buttonText="Get Started"
 *   stats={[
 *     { value: "99%", label: "Uptime" },
 *     { value: "24/7", label: "Support" },
 *   ]}
 * />
 * ```
 */
export function FeatureStatsHighlight({
  badge = "Why Choose Us",
  title = "We deliver results that matter",
  description = "Our platform is designed to help businesses of all sizes achieve their goals with powerful tools and exceptional support.",
  buttonText = "Get Started",
  buttonLink = "#",
  stats = [
    { value: "99%", label: "Uptime Guarantee" },
    { value: "24/7", label: "Customer Support" },
    { value: "50K+", label: "Active Users" },
    { value: "100+", label: "Integrations" },
  ],
  className,
}: FeatureStatsHighlightProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-5">
            {badge && (
              <Badge variant="outline" className="w-fit">
                {badge}
              </Badge>
            )}
            {title && (
              <h2 className="text-3xl font-semibold lg:text-5xl">{title}</h2>
            )}
            {description && (
              <p className="text-muted-foreground lg:text-lg">{description}</p>
            )}
            <Pressable
              href={buttonLink}
              variant="default"
              size="lg"
              asButton
              className="mt-4 w-fit gap-2"
            >
              {buttonText}
              <DynamicIcon name="lucide/arrow-right" size={16} />
            </Pressable>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-xl border bg-muted/30 p-6"
              >
                <span className="text-4xl font-bold text-primary lg:text-5xl">
                  {stat.value}
                </span>
                <span className="text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
