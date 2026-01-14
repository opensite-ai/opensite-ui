"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { OptixFlowConfig } from "../../../src/types";

export interface FeatureCardGridLinkedItem {
  /**
   * Unique identifier
   */
  id?: string;
  /**
   * Card heading content
   */
  heading?: React.ReactNode;
  /**
   * Label content displayed above heading
   */
  label?: React.ReactNode;
  /**
   * Card description content
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  image?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Image element or ReactNode (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
   * Link URL
   */
  url?: string;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

export interface FeatureCardGridLinkedProps {
  /**
   * Section title content
   */
  title?: React.ReactNode;
  /**
   * Array of feature cards
   */
  features?: FeatureCardGridLinkedItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the title wrapper
   */
  titleWrapperClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
  features,
  featuresSlot,
  className,
  containerClassName,
  titleWrapperClassName,
  titleClassName,
  gridClassName,
  cardClassName,
  optixFlowConfig,
}: FeatureCardGridLinkedProps): React.JSX.Element {
  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => {
      const featureKey = feature.id || `feature-${index}`;
      const imageAlt = feature.imageAlt || (typeof feature.heading === "string" ? feature.heading : "Feature image");

      const renderImage = () => {
        if (feature.imageSlot) return feature.imageSlot;
        if (feature.image) {
          return (
            <Img
              src={feature.image}
              alt={imageAlt}
              className="h-full w-full rounded-t-lg object-cover transition-opacity hover:opacity-80"
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
          );
        }
        return null;
      };

      return (
        <div
          key={featureKey}
          className={cn("flex flex-col justify-between rounded-lg bg-muted", cardClassName, feature.className)}
        >
          <div className="flex justify-between gap-10 border-b">
            <div className="flex flex-col justify-between gap-8 py-6 pl-4 md:gap-14 md:py-10 md:pl-8 lg:justify-normal">
              {feature.label && (
                <span className={cn("font-mono text-xs text-muted-foreground", feature.labelClassName)}>
                  {feature.label}
                </span>
              )}
              {feature.heading && (
                <Pressable href={feature.url}>
                  {typeof feature.heading === "string" ? (
                    <h3 className={cn("text-2xl transition-all hover:text-primary hover:opacity-80 sm:text-3xl lg:text-4xl", feature.headingClassName)}>
                      {feature.heading}
                    </h3>
                  ) : (
                    <div className={cn("text-2xl transition-all hover:text-primary hover:opacity-80 sm:text-3xl lg:text-4xl", feature.headingClassName)}>
                      {feature.heading}
                    </div>
                  )}
                </Pressable>
              )}
            </div>
            <div className="md:1/3 w-2/5 shrink-0 rounded-r-lg border-l">
              <Pressable href={feature.url}>
                {renderImage()}
              </Pressable>
            </div>
          </div>
          {feature.description && (
            <p className={cn("p-4 text-muted-foreground md:p-8", feature.descriptionClassName)}>
              {feature.description}
            </p>
          )}
        </div>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {title && (
          <div className={cn("mx-auto mb-16 max-w-3xl text-center", titleWrapperClassName)}>
            {typeof title === "string" ? (
              <h2 className={cn("text-4xl font-medium text-pretty lg:text-5xl", titleClassName)}>
                {title}
              </h2>
            ) : (
              <div className={cn("text-4xl font-medium text-pretty lg:text-5xl", titleClassName)}>
                {title}
              </div>
            )}
          </div>
        )}
        <div className={cn("grid gap-8 lg:grid-cols-2", gridClassName)}>
          {renderFeatures()}
        </div>
      </div>
    </section>
  );
}
