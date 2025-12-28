"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface FeatureIconGridBorderedItem {
  /**
   * Icon name in format: prefix/name (e.g., "lucide/timer")
   */
  icon: string;
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature description
   */
  description: string;
}

export interface FeatureIconGridBorderedProps {
  /**
   * Section label text
   */
  label?: string;
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Array of feature items to display
   */
  features?: FeatureIconGridBorderedItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * Feature Icon Grid Bordered - Four-column grid of features with icons and
 * dashed left borders creating a visual timeline effect.
 *
 * Layout: Four-column responsive grid with icon badges and dashed borders.
 * Key features: Icon badges in accent circles, dashed border separators, accent line indicators.
 * Best for: Why us sections, value propositions, capability highlights, process steps.
 *
 * @example
 * ```tsx
 * <FeatureIconGridBordered
 *   label="Why Us?"
 *   title="A better way to build websites"
 *   features={[
 *     { icon: "lucide/timer", title: "Performance", description: "Fast and optimized" },
 *     { icon: "lucide/zap", title: "Innovation", description: "Cutting-edge tech" },
 *   ]}
 * />
 * ```
 */
export function FeatureIconGridBordered({
  label = "Why Us?",
  title = "A better way to build websites",
  features = [
    {
      icon: "lucide/timer",
      title: "Performance",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sunt beatae tenetur.",
    },
    {
      icon: "lucide/zap",
      title: "Innovation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sunt beatae tenetur.",
    },
    {
      icon: "lucide/zoom-in",
      title: "Quality",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sunt beatae tenetur.",
    },
    {
      icon: "lucide/person-standing",
      title: "Accessibility",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sunt beatae tenetur.",
    },
  ],
  className,
}: FeatureIconGridBorderedProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {label && (
          <p className="mb-4 text-xs text-muted-foreground">{label}</p>
        )}
        {title && (
          <h2 className="text-3xl font-medium lg:text-4xl">{title}</h2>
        )}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5"
            >
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                <DynamicIcon name={feature.icon} size={20} className="md:size-6" />
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.title}
                  <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
