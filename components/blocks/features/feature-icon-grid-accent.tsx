"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface FeatureIconGridAccentItem {
  /**
   * Icon name in format: prefix/name (e.g., "lucide/zoom-in")
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

export interface FeatureIconGridAccentProps {
  /**
   * Section label text
   */
  label?: string;
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Array of feature items
   */
  features?: FeatureIconGridAccentItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * Feature Icon Grid Accent - Two-column grid of features with accent background
 * cards and icon badges.
 *
 * Layout: Centered header with two-column grid of accent-colored cards.
 * Key features: Accent background cards, circular icon badges, generous spacing.
 * Best for: Value propositions, unique selling points, company differentiators.
 *
 * @example
 * ```tsx
 * <FeatureIconGridAccent
 *   label="WHY WE ARE UNIQUE"
 *   title="Bringing the best to you"
 *   features={[
 *     { icon: "lucide/zoom-in", title: "Quality", description: "Built with care" },
 *     { icon: "lucide/zap", title: "Innovation", description: "Cutting-edge tech" },
 *   ]}
 * />
 * ```
 */
export function FeatureIconGridAccent({
  label = "WHY WE ARE UNIQUE",
  title = "Bringing the best to you by the best in the industry",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo. Voluptatum amet architecto suscipit pariatur eligendi repellendus mollitia dolore unde sint?",
  features = [
    {
      icon: "lucide/zoom-in",
      title: "Quality",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
    },
    {
      icon: "lucide/zap",
      title: "Innovation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
    },
    {
      icon: "lucide/messages-square",
      title: "Customer Support",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
    },
    {
      icon: "lucide/infinity",
      title: "Reliability",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
    },
  ],
  className,
}: FeatureIconGridAccentProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
            {label && (
              <p className="text-sm text-muted-foreground">{label}</p>
            )}
            {title && (
              <h2 className="text-3xl font-medium md:text-5xl">{title}</h2>
            )}
            {description && (
              <p className="text-muted-foreground md:max-w-2xl">{description}</p>
            )}
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-lg bg-accent p-6 md:min-h-[300px] md:p-8"
            >
              <span className="mb-6 flex size-11 items-center justify-center rounded-full bg-background">
                <DynamicIcon name={feature.icon} size={24} />
              </span>
              <div>
                <h3 className="text-lg font-medium md:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
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
