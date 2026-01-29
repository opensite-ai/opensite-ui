"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn, getAccentColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface FeatureIconGridBorderedItem {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/timer")
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
   * Additional CSS classes for the icon wrapper
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

export interface FeatureIconGridBorderedProps {
  /**
   * Section label content
   */
  label?: React.ReactNode;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Array of items to display
   */
  features?: FeatureIconGridBorderedItem[];
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
   * Additional CSS classes for the label
   */
  labelClassName?: string;
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
 * Feature Icon Grid Bordered - Four-column grid of items with icons and
 * dashed left borders creating a visual timeline effect.
 *
 * Layout: Four-column responsive grid with icon badges and dashed borders.
 * Key features: Icon badges in accent circles, dashed border separators, accent line indicators.
 * Best for: Value propositions, capability highlights, process steps, benefits showcase.
 *
 * @example
 * ```tsx
 * <FeatureIconGridBordered
 *   label="Why Choose Us?"
 *   title="A better way to build"
 *   features={[
 *     { iconName: "lucide/timer", title: "Performance", description: "Fast and optimized" },
 *     { iconName: "lucide/zap", title: "Innovation", description: "Cutting-edge tech" },
 *   ]}
 * />
 * ```
 */
export function FeatureIconGridBordered({
  label,
  title,
  features,
  featuresSlot,
  className,
  containerClassName,
  labelClassName,
  titleClassName,
  gridClassName,
  cardClassName,
  background,
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureIconGridBorderedProps): React.JSX.Element {
  const renderIcon = useCallback((feature: FeatureIconGridBorderedItem) => {
    if (feature.icon) return feature.icon;
    if (feature.iconName) {
      return (
        <DynamicIcon name={feature.iconName} size={20} className="md:size-6" />
      );
    }
    return null;
  }, []);

  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <div
        key={index}
        className={cn(
          "relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5",
          cardClassName,
          feature.className,
        )}
      >
        {(feature.icon || feature.iconName) && (
          <span
            className={cn(
              "mb-8 flex size-10 shrink-0 items-center justify-center rounded-full text-primary-foreground md:size-12",
              getAccentColor(background),
              feature.iconClassName,
            )}
          >
            {renderIcon(feature)}
          </span>
        )}
        <div>
          {feature.title &&
            (typeof feature.title === "string" ? (
              <h3
                className={cn(
                  "font-medium md:mb-2 md:text-xl",
                  feature.titleClassName,
                )}
              >
                {feature.title}
                <span className={cn("absolute -left-px hidden h-6 w-px md:inline-block", getAccentColor(background))}></span>
              </h3>
            ) : (
              <div
                className={cn(
                  "font-medium md:mb-2 md:text-xl",
                  feature.titleClassName,
                )}
              >
                {feature.title}
                <span className={cn("absolute -left-px hidden h-6 w-px md:inline-block", getAccentColor(background))}></span>
              </div>
            ))}
          {feature.description &&
            (typeof feature.description === "string" ? (
              <p
                className={cn(
                  "text-sm md:text-base",
                  feature.descriptionClassName,
                )}
              >
                {feature.description}
              </p>
            ) : (
              <div
                className={cn(
                  "text-sm md:text-base",
                  feature.descriptionClassName,
                )}
              >
                {feature.description}
              </div>
            ))}
        </div>
      </div>
    ));
  }, [featuresSlot, features, cardClassName, renderIcon, background]);

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
      {label &&
        (typeof label === "string" ? (
          <p className={cn("mb-4 text-xs ", labelClassName)}>{label}</p>
        ) : (
          <div className={cn("mb-4 text-xs ", labelClassName)}>{label}</div>
        ))}
      {title &&
        (typeof title === "string" ? (
          <h2
            className={cn("text-3xl font-medium lg:text-4xl", titleClassName)}
          >
            {title}
          </h2>
        ) : (
          <div
            className={cn("text-3xl font-medium lg:text-4xl", titleClassName)}
          >
            {title}
          </div>
        ))}
      {(featuresSlot || (features && features.length > 0)) && (
        <div
          className={cn(
            "mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4",
            gridClassName,
          )}
        >
          {featuresContent}
        </div>
      )}
    </Section>
  );
}
