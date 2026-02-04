"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { Pressable } from "@/src";

export interface FeatureIconGridMutedItem {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/check-circle-2")
   */
  iconName?: string;
  /**
   * Item title content
   */
  title?: React.ReactNode;
  /**
   * Item description content
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
  /**
   * Additional CSS classes for the icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Optional href for the item
   */
  href?: string;
}

export interface FeatureIconGridMutedProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of items to display
   */
  features?: FeatureIconGridMutedItem[];
  /**
   * Custom slot for rendering items (overrides features array)
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
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
}

/**
 * Feature Icon Grid Muted - Five-column grid with muted background and
 * icon badges showcasing key capabilities.
 *
 * Layout: Muted background section with centered header and five-column grid.
 * Key features: Muted background, icon badges, centered text, responsive grid.
 * Best for: Capability highlights, benefits showcase, service offerings.
 *
 * @example
 * ```tsx
 * <FeatureIconGridMuted
 *   title="Key Capabilities"
 *   description="Explore tools built to enhance your workflow."
 *   features={[
 *     { iconName: "lucide/check-circle-2", title: "Quick Processing", description: "Fast results" },
 *   ]}
 * />
 * ```
 */
export function FeatureIconGridMuted({
  title,
  description,
  features,
  featuresSlot,
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  background,
  pattern,
  patternOpacity,
  patternClassName,
  spacing = "py-12 md:py-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
}: FeatureIconGridMutedProps): React.JSX.Element {
  const renderFeatureIcon = useCallback((feature: FeatureIconGridMutedItem) => {
    if (feature.icon) return feature.icon;
    if (feature.iconName)
      return (
        <DynamicIcon
          name={feature.iconName}
          size={24}
          className={feature.iconClassName}
        />
      );
    return null;
  }, []);

  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <div
        key={index}
        className={cn(
          "flex flex-col gap-2.5 rounded-xl border p-7 bg-muted text-muted-foreground",
          cardClassName,
          feature.className,
        )}
      >
        <div className="flex flex-col gap-6 md:gap-12">
          {(feature.icon || feature.iconName) && renderFeatureIcon(feature)}

          <div className="flex flex-col gap-2 md:gap-4">
            {feature.title &&
              (typeof feature.title === "string" ? (
                <Pressable
                  href={feature.href}
                  className={cn(
                    "font-medium text-xl text-muted-foreground",
                    feature.titleClassName,
                  )}
                >
                  {feature.title}
                </Pressable>
              ) : (
                <div
                  className={cn(
                    "font-medium text-xl text-muted-foreground",
                    feature.titleClassName,
                  )}
                >
                  {feature.title}
                </div>
              ))}
            {feature.description &&
              (typeof feature.description === "string" ? (
                <p className={cn("text-sm", feature.descriptionClassName)}>
                  {feature.description}
                </p>
              ) : (
                <div className={cn("text-sm", feature.descriptionClassName)}>
                  {feature.description}
                </div>
              ))}
          </div>
        </div>
      </div>
    ));
  }, [featuresSlot, features, cardClassName, renderFeatureIcon]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col gap-10">
        {(title || description) && (
          <div
            className={cn(
              "mx-auto flex max-w-full md:max-w-md text-balance flex-col gap-2.5 text-center",
              headerClassName,
            )}
          >
            {title &&
              (typeof title === "string" ? (
                <h2
                  className={cn(
                    "text-4xl font-semibold md:text-5xl",
                    titleClassName,
                  )}
                >
                  {title}
                </h2>
              ) : (
                <div
                  className={cn(
                    "text-4xl font-semibold md:text-5xl",
                    titleClassName,
                  )}
                >
                  {title}
                </div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p className={cn(descriptionClassName)}>{description}</p>
              ) : (
                <div className={cn(descriptionClassName)}>{description}</div>
              ))}
          </div>
        )}
        {(featuresSlot || (features && features.length > 0)) && (
          <div
            className={cn(
              "mx-auto grid max-w-full md:max-w-7xl gap-4 md:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
              gridClassName,
            )}
          >
            {featuresContent}
          </div>
        )}
      </div>
    </Section>
  );
}
