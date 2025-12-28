"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";

export interface FeatureBadgeGridSixItem {
  /**
   * Icon name in format: prefix/name (e.g., "lucide/git-pull-request")
   */
  icon: string;
  /**
   * Feature heading
   */
  heading: string;
  /**
   * Feature description
   */
  description: string;
}

export interface FeatureBadgeGridSixProps {
  /**
   * Badge label text
   */
  label?: string;
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Array of feature items
   */
  features?: FeatureBadgeGridSixItem[];
  /**
   * Button configuration
   */
  button?: {
    text: string;
    href: string;
  };
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * Feature Badge Grid Six - Six-feature grid with badge header and centered CTA button.
 *
 * Layout: Badge header, two-column grid of six features, centered CTA button.
 * Key features: Badge label, icon badges in accent circles, large heading, CTA button.
 * Best for: Feature overviews, capability lists, product highlights.
 *
 * @example
 * ```tsx
 * <FeatureBadgeGridSix
 *   label="Features"
 *   title="Fully featured components"
 *   features={[
 *     { icon: "lucide/git-pull-request", heading: "Quality", description: "Built with care" },
 *   ]}
 *   button={{ text: "More Features", href: "/features" }}
 * />
 * ```
 */
export function FeatureBadgeGridSix({
  label = "Features",
  title = "Fully featured components for Opensite AI & Tailwind",
  features = [
    {
      icon: "lucide/git-pull-request",
      heading: "Quality",
      description:
        "Built with attention to detail and best practices. Every component is thoroughly tested and follows modern React patterns for reliability and performance.",
    },
    {
      icon: "lucide/square-kanban",
      heading: "Experience",
      description:
        "Crafted with user experience in mind. Each component is designed to be intuitive, accessible, and provide smooth interactions across all devices.",
    },
    {
      icon: "lucide/radio-tower",
      heading: "Support",
      description:
        "Comprehensive documentation and community support. Get help when you need it with detailed guides, examples, and active community assistance.",
    },
    {
      icon: "lucide/wand-sparkles",
      heading: "Innovation",
      description:
        "Cutting-edge design patterns and modern web technologies. Stay ahead with the latest trends in UI/UX design and development practices.",
    },
    {
      icon: "lucide/layers",
      heading: "Results",
      description:
        "Proven track record of successful implementations. These components have been battle-tested in real-world applications and deliver consistent results.",
    },
    {
      icon: "lucide/battery-charging",
      heading: "Efficiency",
      description:
        "Optimized for performance and developer productivity. Lightweight, fast-loading components that help you build faster without compromising on quality.",
    },
  ],
  button = {
    text: "More Features",
    href: "#",
  },
  className,
}: FeatureBadgeGridSixProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {(label || title) && (
          <div className="mb-12 flex max-w-3xl flex-col gap-4">
            {label && <Badge variant="secondary">{label}</Badge>}
            {title && (
              <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className="grid gap-12 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-6 space-y-4 rounded-lg md:block"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                <DynamicIcon name={feature.icon} size={16} className="md:size-6" />
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.heading}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {button && (
          <div className="mt-16 flex justify-center">
            <Pressable href={button.href} size="lg" variant="default" asButton>
              {button.text}
            </Pressable>
          </div>
        )}
      </div>
    </section>
  );
}
