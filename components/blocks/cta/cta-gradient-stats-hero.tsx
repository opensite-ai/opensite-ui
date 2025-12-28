"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card } from "../../ui/card";

export interface CtaGradientStatItem {
  /**
   * Stat value (e.g., "99.9%", "10K+")
   */
  value?: string;
  /**
   * Stat label
   */
  label?: string;
}

export interface CtaGradientStatsHeroProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
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
  /**
   * Array of stats to display
   */
  stats?: CtaGradientStatItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

const defaultStats: CtaGradientStatItem[] = [
  { value: "99.9%", label: "Uptime" },
  { value: "10K+", label: "Customers" },
  { value: "50M+", label: "Requests/day" },
  { value: "24/7", label: "Support" },
];

/**
 * CtaGradientStatsHero - A hero-style CTA with gradient background, heading,
 * description, action buttons, and floating stats cards showing metrics.
 * Perfect for showcasing achievements.
 *
 * @example
 * ```tsx
 * <CtaGradientStatsHero
 *   heading="Scale with confidence"
 *   description="Built for enterprise-grade performance."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   stats={[
 *     { value: "99.9%", label: "Uptime" },
 *     { value: "10K+", label: "Customers" }
 *   ]}
 * />
 * ```
 */
export function CtaGradientStatsHero({
  heading = "Scale with confidence",
  description = "Built for enterprise-grade performance and reliability. Join thousands of companies that trust us with their mission-critical applications.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "View Pricing",
  secondaryButtonUrl = "#",
  stats = defaultStats,
  className,
}: CtaGradientStatsHeroProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground md:p-12 lg:p-16">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="mb-8 text-lg opacity-90 md:text-xl">{description}</p>
            <div className="mb-12 flex flex-col justify-center gap-3 sm:flex-row">
              <Pressable
                href={primaryButtonUrl}
                variant="secondary"
                size="lg"
                asButton
              >
                {primaryButtonText}
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="ml-2"
                />
              </Pressable>
              <Pressable
                href={secondaryButtonUrl}
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asButton
              >
                {secondaryButtonText}
              </Pressable>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="border-primary-foreground/20 bg-primary-foreground/10 p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-primary-foreground md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/80">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
