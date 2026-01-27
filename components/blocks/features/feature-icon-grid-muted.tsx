"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

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
   * Feature title content
   */
  title?: React.ReactNode;
  /**
   * Feature description content
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
   * Array of feature items
   */
  features?: FeatureIconGridMutedItem[];
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
 *     { iconName: "lucide/check-circle-2", title: "Instant Approvals", description: "Get quick approvals" },
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
  containerClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureIconGridMutedProps): React.JSX.Element {
  const renderFeatureIcon = (feature: FeatureIconGridMutedItem) => {
    if (feature.icon) return feature.icon;
    if (feature.iconName) return <DynamicIcon name={feature.iconName} size={24} className={feature.iconClassName} />;
    return null;
  };

  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <div
        key={index}
        className={cn("flex flex-col gap-2.5 rounded-xl border bg-background p-7", cardClassName, feature.className)}
      >
        {renderFeatureIcon(feature)}
        {feature.title && (
          typeof feature.title === "string" ? (
            <h3 className={cn("font-semibold", feature.titleClassName)}>{feature.title}</h3>
          ) : (
            <div className={cn("font-semibold", feature.titleClassName)}>{feature.title}</div>
          )
        )}
        {feature.description && (
          typeof feature.description === "string" ? (
            <p className={cn("text-sm text-muted-foreground", feature.descriptionClassName)}>
              {feature.description}
            </p>
          ) : (
            <div className={cn("text-sm text-muted-foreground", feature.descriptionClassName)}>
              {feature.description}
            </div>
          )
        )}
      </div>
    ));
  }, [featuresSlot, features, cardClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={cn("bg-muted/60", className)}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col gap-10">
        <div className={cn("mx-auto flex max-w-xl flex-col gap-2.5 text-center", headerClassName)}>
          {title && (
            typeof title === "string" ? (
              <h1 className={cn("text-4xl font-semibold md:text-5xl", titleClassName)}>{title}</h1>
            ) : (
              <div className={cn("text-4xl font-semibold md:text-5xl", titleClassName)}>{title}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-muted-foreground", descriptionClassName)}>{description}</p>
            ) : (
              <div className={cn("text-muted-foreground", descriptionClassName)}>{description}</div>
            )
          )}
        </div>
        <div className={cn("mx-auto grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", gridClassName)}>
          {featuresContent}
        </div>
      </div>
    </Section>
  );
}
