"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureCardGridLinkedItem {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Card heading text
   */
  heading: string;
  /**
   * Label text displayed above heading
   */
  label: string;
  /**
   * Card description
   */
  description: string;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Link URL
   */
  url: string;
}

export interface FeatureCardGridLinkedProps {
  /**
   * Section title
   */
  title?: string;
  /**
   * Array of feature cards
   */
  features?: FeatureCardGridLinkedItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * Feature Card Grid Linked - Two-column grid of feature cards with images,
 * labels, and clickable headings.
 *
 * Layout: Two-column grid with muted background cards, image thumbnails.
 * Key features: Clickable headings, label badges, image previews, hover effects.
 * Best for: Audience-specific features, role-based content, product categories.
 *
 * @example
 * ```tsx
 * <FeatureCardGridLinked
 *   title="A collection of extra blocks for your site"
 *   features={[
 *     {
 *       id: "1",
 *       heading: "Design System Approved",
 *       label: "FOR DESIGNERS",
 *       description: "Hundreds of components available in Figma.",
 *       image: "/design.jpg",
 *       url: "/designers"
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureCardGridLinked({
  title = "A collection of extra blocks for Opensite AI & Tailwind",
  features = [
    {
      id: "feature-1",
      heading: "Design System Approved",
      label: "FOR DESIGNERS",
      description:
        "Hundreds of finely crafted components available in Figma. Easily modify the design system to your brand.",
      image: blockBrandedIconsAndPlaceholders.placeholderDark1,
      url: "#",
    },
    {
      id: "feature-2",
      heading: "Copy-Paste Code Blocks",
      label: "FOR DEVELOPERS",
      description:
        "Finely crafted components built with React, Tailwind. Developers can copy and paste these blocks directly into their project.",
      image: blockBrandedIconsAndPlaceholders.placeholderDark2,
      url: "#",
    },
    {
      id: "feature-3",
      heading: "Product-First Approach",
      label: "FOR PRODUCT TEAMS",
      description:
        "Components designed with user experience in mind. Every block is tested for usability and optimized for conversion rates.",
      image: blockBrandedIconsAndPlaceholders.placeholderDark3,
      url: "#",
    },
    {
      id: "feature-4",
      heading: "Marketing-Ready Templates",
      label: "FOR MARKETING",
      description:
        "High-converting landing pages, email templates, and marketing components that drive engagement and boost your campaigns.",
      image: blockBrandedIconsAndPlaceholders.placeholderDark4,
      url: "#",
    },
  ],
  className,
  optixFlowConfig,
}: FeatureCardGridLinkedProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {title && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-4xl font-medium text-pretty lg:text-5xl">
              {title}
            </h2>
          </div>
        )}
        <div className="grid gap-8 lg:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col justify-between rounded-lg bg-muted"
            >
              <div className="flex justify-between gap-10 border-b">
                <div className="flex flex-col justify-between gap-8 py-6 pl-4 md:gap-14 md:py-10 md:pl-8 lg:justify-normal">
                  <span className="font-mono text-xs text-muted-foreground">
                    {feature.label}
                  </span>
                  <Pressable href={feature.url}>
                    <h3 className="text-2xl transition-all hover:text-primary hover:opacity-80 sm:text-3xl lg:text-4xl">
                      {feature.heading}
                    </h3>
                  </Pressable>
                </div>
                <div className="md:1/3 w-2/5 shrink-0 rounded-r-lg border-l">
                  <Pressable href={feature.url}>
                    <Img
                      src={feature.image}
                      alt={feature.heading}
                      className="h-full w-full rounded-t-lg object-cover transition-opacity hover:opacity-80"
                      loading="lazy"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </Pressable>
                </div>
              </div>
              <p className="p-4 text-muted-foreground md:p-8">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
