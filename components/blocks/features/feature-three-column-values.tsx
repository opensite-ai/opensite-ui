"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface FeatureThreeColumnValuesItem {
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

export interface FeatureThreeColumnValuesProps {
  /**
   * Section label text
   */
  label?: string;
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Array of value items
   */
  values?: FeatureThreeColumnValuesItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * Feature Three Column Values - Three-column grid of value cards with icons
 * and accent backgrounds.
 *
 * Layout: Header with three-column grid of accent-colored value cards.
 * Key features: Accent background cards, circular icon badges, consistent heights.
 * Best for: Company values, core principles, service pillars.
 *
 * @example
 * ```tsx
 * <FeatureThreeColumnValues
 *   label="OUR VALUES"
 *   title="Why Choose Us?"
 *   values={[
 *     { icon: "lucide/timer", title: "Performance", description: "Fast and optimized" },
 *     { icon: "lucide/zoom-in", title: "Quality", description: "Built with care" },
 *     { icon: "lucide/zap", title: "Innovation", description: "Cutting-edge tech" },
 *   ]}
 * />
 * ```
 */
export function FeatureThreeColumnValues({
  label = "OUR VALUES",
  title = "Why Choose Us?",
  values = [
    {
      icon: "lucide/timer",
      title: "Performance",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque doloremque! Eligendi.",
    },
    {
      icon: "lucide/zoom-in",
      title: "Quality",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque doloremque! Eligendi.",
    },
    {
      icon: "lucide/zap",
      title: "Innovation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque doloremque! Eligendi.",
    },
  ],
  className,
}: FeatureThreeColumnValuesProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {label && (
          <p className="mb-4 text-sm text-muted-foreground lg:text-base">
            {label}
          </p>
        )}
        {title && (
          <h2 className="text-3xl font-medium lg:text-4xl">{title}</h2>
        )}
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {values.map((value, index) => (
            <div key={index} className="rounded-lg bg-accent p-5">
              <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                <DynamicIcon name={value.icon} size={24} />
              </span>
              <h3 className="mb-2 text-xl font-medium">{value.title}</h3>
              <p className="leading-7 text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
