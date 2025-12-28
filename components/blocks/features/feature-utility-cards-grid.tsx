"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Card } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureUtilityCardsGridItem {
  /**
   * Utility title
   */
  title: string;
  /**
   * Utility description
   */
  description: string;
  /**
   * Image source URL
   */
  image: string;
}

export interface FeatureUtilityCardsGridProps {
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
   * Learn more link URL
   */
  learnMoreUrl?: string;
  /**
   * Array of utility items
   */
  utilities?: FeatureUtilityCardsGridItem[];
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
 * Feature Utility Cards Grid - Six-card grid showcasing utilities with images
 * and descriptions.
 *
 * Layout: Header with separator, two-column intro, three-column card grid.
 * Key features: Icon label, separator line, image cards, hover effects.
 * Best for: Utility showcases, integration highlights, tool collections.
 *
 * @example
 * ```tsx
 * <FeatureUtilityCardsGrid
 *   label="Utilities"
 *   title="What you can do with our utilities?"
 *   utilities={[
 *     { title: "Integrations", description: "Connect your tools", image: "/integrations.jpg" },
 *   ]}
 * />
 * ```
 */
export function FeatureUtilityCardsGrid({
  label = "Utilities",
  title = "What you can do with our utilities?",
  description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae praesent, ad ullam quis cupiditate atque maxime alias eaque repellendus perferendis, nemo repudiandae.",
  learnMoreUrl = "#",
  utilities = [
    {
      title: "Integrations",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      image: blockBrandedIconsAndPlaceholders.placeholder1,
    },
    {
      title: "Apps",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      image: blockBrandedIconsAndPlaceholders.placeholderDark1,
    },
    {
      title: "APIs",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      image: blockBrandedIconsAndPlaceholders.placeholder3,
    },
    {
      title: "Plugins",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      image: blockBrandedIconsAndPlaceholders.placeholder4,
    },
    {
      title: "Extensions",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      image: blockBrandedIconsAndPlaceholders.placeholder5,
    },
    {
      title: "Widgets",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      image: blockBrandedIconsAndPlaceholders.placeholder6,
    },
  ],
  className,
  optixFlowConfig,
}: FeatureUtilityCardsGridProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-7xl">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <DynamicIcon
              name="lucide/square-dashed-mouse-pointer"
              size={20}
              className="text-primary"
            />
            <p>{label}</p>
          </div>
          <Pressable href={learnMoreUrl} className="hover:text-primary hover:underline">
            Learn more
            <DynamicIcon name="lucide/chevron-right" size={16} className="ml-2 inline-block" />
          </Pressable>
        </div>
        <Separator className="mt-3 mb-8" />
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <h2 className="text-3xl font-medium md:w-1/2">{title}</h2>
          <p className="md:w-1/2">{description}</p>
        </div>
        <div className="mt-11 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {utilities.map((utility, index) => (
            <Card key={index} className="overflow-hidden pt-0">
              <Img
                src={utility.image}
                alt={utility.title}
                className="aspect-video w-full object-cover"
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="p-5">
                <p className="mb-1 font-medium">{utility.title}</p>
                <p className="text-muted-foreground">{utility.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
