"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { patternSvgs } from "../../../lib/patternSvgs";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface FeaturePatternGridLinksItem {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/zoom-in")
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
   * Link URL
   */
  link?: string;
  /**
   * Link label content
   */
  linkLabel?: React.ReactNode;
  /**
   * Custom link slot (overrides link and linkLabel)
   */
  linkSlot?: React.ReactNode;
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
   * Additional CSS classes for the link
   */
  linkClassName?: string;
}

export interface FeaturePatternGridLinksProps {
  /**
   * Array of feature items
   */
  features?: FeaturePatternGridLinksItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Background pattern URL
   */
  patternUrl?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
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
 * Feature Pattern Grid Links - Six-feature grid with pattern background and
 * "Learn more" links on each card.
 *
 * Layout: Pattern background section with six bordered cards in a grid.
 * Key features: Pattern background, bordered cards, learn more links with arrows.
 * Best for: Feature showcases, capability grids, service offerings.
 *
 * @example
 * ```tsx
 * <FeaturePatternGridLinks
 *   features={[
 *     { iconName: "lucide/zoom-in", title: "Quality", description: "Built with care", link: "/quality" },
 *   ]}
 * />
 * ```
 */
export function FeaturePatternGridLinks({
  features,
  featuresSlot,
  patternUrl = patternSvgs.dotPattern,
  className,
  containerClassName,
  gridClassName,
  cardClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
}: FeaturePatternGridLinksProps): React.JSX.Element {
  const renderFeatureIcon = (feature: FeaturePatternGridLinksItem) => {
    if (feature.icon) return feature.icon;
    if (feature.iconName) return <DynamicIcon name={feature.iconName} size={24} className={feature.iconClassName} />;
    return null;
  };

  const renderFeatureLink = (feature: FeaturePatternGridLinksItem) => {
    if (feature.linkSlot) return feature.linkSlot;
    if (!feature.link) return null;

    return (
      <Pressable
        href={feature.link}
        className={cn("flex items-center gap-2 text-sm font-medium", feature.linkClassName)}
      >
        {feature.linkLabel || "Learn more"}
        <DynamicIcon name="lucide/chevron-right" size={16} />
      </Pressable>
    );
  };

  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <div
        key={index}
        className={cn("flex flex-col gap-10 rounded-lg border bg-background p-8", cardClassName, feature.className)}
      >
        <div>
          {renderFeatureIcon(feature)}
          {feature.title && (
            typeof feature.title === "string" ? (
              <h3 className={cn("mt-6 mb-2 font-medium", feature.titleClassName)}>{feature.title}</h3>
            ) : (
              <div className={cn("mt-6 mb-2 font-medium", feature.titleClassName)}>{feature.title}</div>
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
        {renderFeatureLink(feature)}
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
      className={cn("bg-muted/30", className)}
      containerClassName={containerClassName}
      style={{
        backgroundImage: `url(${patternUrl})`,
        backgroundRepeat: "repeat",
      }}
    >
      <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", gridClassName)}>
        {featuresContent}
      </div>
    </Section>
  );
}
