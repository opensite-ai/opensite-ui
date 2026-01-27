"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface FeatureThreeColumnValuesItem {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/timer")
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

export interface FeatureThreeColumnValuesProps {
  /**
   * Section label content
   */
  label?: React.ReactNode;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Array of value items
   */
  values?: FeatureThreeColumnValuesItem[];
  /**
   * Custom slot for rendering values (overrides values array)
   */
  valuesSlot?: React.ReactNode;
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
   * Additional CSS classes for each value card
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
 * Feature Three Column Values - Three-column grid of value cards with icons
 * and accent backgrounds.
 *
 * Layout: Header with three-column grid of accent-colored value cards.
 * Key features: Accent background cards, circular icon badges, consistent heights.
 * Best for: Company values, core principles, service pillars.
 *
 * @example
 * ```tsx
 * <FeatureThreeColumnValues
 *   label="OUR VALUES"
 *   title="Why Choose Us?"
 *   values={[
 *     { iconName: "lucide/timer", title: "Performance", description: "Fast and optimized" },
 *     { iconName: "lucide/zoom-in", title: "Quality", description: "Built with care" },
 *     { iconName: "lucide/zap", title: "Innovation", description: "Cutting-edge tech" },
 *   ]}
 * />
 * ```
 */
export function FeatureThreeColumnValues({
  label,
  title,
  values,
  valuesSlot,
  className,
  containerClassName,
  labelClassName,
  titleClassName,
  gridClassName,
  cardClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureThreeColumnValuesProps): React.JSX.Element {
  const renderValueIcon = (value: FeatureThreeColumnValuesItem) => {
    if (value.icon) return value.icon;
    if (value.iconName) return <DynamicIcon name={value.iconName} size={24} />;
    return <DynamicIcon name="lucide/star" size={24} />;
  };

  const valuesContent = useMemo(() => {
    if (valuesSlot) return valuesSlot;
    if (!values || values.length === 0) return null;

    return values.map((value, index) => (
      <div key={index} className={cn("rounded-lg bg-accent p-5", cardClassName, value.className)}>
        <span className={cn("mb-8 flex size-12 items-center justify-center rounded-full bg-background", value.iconClassName)}>
          {renderValueIcon(value)}
        </span>
        {value.title && (
          typeof value.title === "string" ? (
            <h3 className={cn("mb-2 text-xl font-medium", value.titleClassName)}>{value.title}</h3>
          ) : (
            <div className={cn("mb-2 text-xl font-medium", value.titleClassName)}>{value.title}</div>
          )
        )}
        {value.description && (
          typeof value.description === "string" ? (
            <p className={cn("leading-7 text-muted-foreground", value.descriptionClassName)}>
              {value.description}
            </p>
          ) : (
            <div className={cn("leading-7 text-muted-foreground", value.descriptionClassName)}>
              {value.description}
            </div>
          )
        )}
      </div>
    ));
  }, [valuesSlot, values, cardClassName]);

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
      {label && (
        typeof label === "string" ? (
          <p className={cn("mb-4 text-sm text-muted-foreground lg:text-base", labelClassName)}>
            {label}
          </p>
        ) : (
          <div className={cn("mb-4 text-sm text-muted-foreground lg:text-base", labelClassName)}>
            {label}
          </div>
        )
      )}
      {title && (
        typeof title === "string" ? (
          <h2 className={cn("text-3xl font-medium lg:text-4xl", titleClassName)}>{title}</h2>
        ) : (
          <div className={cn("text-3xl font-medium lg:text-4xl", titleClassName)}>{title}</div>
        )
      )}
      <div className={cn("mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3", gridClassName)}>
        {valuesContent}
      </div>
    </Section>
  );
}
