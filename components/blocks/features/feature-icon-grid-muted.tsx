"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface FeatureIconGridMutedItem {
  /**
   * Icon name in format: prefix/name (e.g., "lucide/check-circle-2")
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

export interface FeatureIconGridMutedProps {
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
  features?: FeatureIconGridMutedItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * Feature Icon Grid Muted - Five-feature grid with muted background and
 * icon badges showcasing key capabilities.
 *
 * Layout: Muted background section with centered header and five-column grid.
 * Key features: Muted background, icon badges, centered text, responsive grid.
 * Best for: Key features, time-saving tools, capability highlights.
 *
 * @example
 * ```tsx
 * <FeatureIconGridMuted
 *   title="Key Features That Save You Time"
 *   description="Explore tools specifically built to enhance your workflow."
 *   features={[
 *     { icon: "lucide/check-circle-2", title: "Instant Approvals", description: "Get quick approvals" },
 *   ]}
 * />
 * ```
 */
export function FeatureIconGridMuted({
  title = "Key Features That Save You Time",
  description = "Explore tools specifically built to enhance your workflow and boost efficiency.",
  features = [
    {
      icon: "lucide/check-circle-2",
      title: "Instant Approvals",
      description:
        "Quickly approve requests and tasks with a single click, reducing delays.",
    },
    {
      icon: "lucide/git-graph",
      title: "Workflow Automation",
      description:
        "Automate repetitive tasks and streamline your processes for maximum efficiency.",
    },
    {
      icon: "lucide/message-square",
      title: "Real-Time Collaboration",
      description:
        "Work together with your team in real-time, no matter where you are.",
    },
    {
      icon: "lucide/star",
      title: "Priority Management",
      description:
        "Easily prioritize tasks and focus on what matters most to your business.",
    },
    {
      icon: "lucide/zap",
      title: "Lightning Fast",
      description:
        "Experience blazing fast performance with optimized code and infrastructure.",
    },
  ],
  className,
}: FeatureIconGridMutedProps) {
  return (
    <section className={cn("bg-muted/60 py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-10">
          <div className="mx-auto flex max-w-xl flex-col gap-2.5 text-center">
            {title && (
              <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
            )}
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col gap-2.5 rounded-xl border bg-background p-7"
              >
                <DynamicIcon name={feature.icon} size={24} />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
