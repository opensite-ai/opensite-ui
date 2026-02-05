"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { Pressable } from "@/src";

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
  /**
   * Optional href for the item
   */
  href?: string;
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
  containerClassName = "px-6 sm:px-6 md:px-6 lg:px-8",
  labelClassName,
  titleClassName,
  gridClassName,
  cardClassName,
  background,
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureThreeColumnValuesProps): React.JSX.Element {
  const renderValueIcon = React.useCallback(
    (value: FeatureThreeColumnValuesItem) => {
      if (value.icon) return value.icon;
      if (value.iconName)
        return <DynamicIcon name={value.iconName} size={24} />;
      return null;
    },
    [],
  );

  const valuesContent = useMemo(() => {
    if (valuesSlot) return valuesSlot;
    if (!values || values.length === 0) return null;

    return values.map((value, index) => (
      <div
        key={index}
        className={cn(
          "relative flex h-full flex-col justify-between gap-6 rounded-lg p-5 bg-card text-card-foreground shadow-lg border",
          cardClassName,
          value.className,
        )}
      >
        {(value.icon || value.iconName) && (
          <div
            className={cn(
              "flex size-fit p-3 items-center justify-center rounded-full border",
              value.iconClassName,
            )}
          >
            {renderValueIcon(value)}
          </div>
        )}
        <div className="flex flex-1 flex-col justify-end gap-2">
          {value.title &&
            (typeof value.title === "string" ? (
              <Pressable
                href={value.href}
                className={cn(
                  "font-medium md:mb-2 text-xl",
                  value.titleClassName,
                )}
              >
                {value.title}
              </Pressable>
            ) : (
              <div
                className={cn("mb-2 text-xl font-medium", value.titleClassName)}
              >
                {value.title}
              </div>
            ))}
          {value.description &&
            (typeof value.description === "string" ? (
              <p className={cn("leading-7 ", value.descriptionClassName)}>
                {value.description}
              </p>
            ) : (
              <div className={cn("leading-7", value.descriptionClassName)}>
                {value.description}
              </div>
            ))}
        </div>
      </div>
    ));
  }, [valuesSlot, values, cardClassName, renderValueIcon]);

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
      <div className="flex flex-col space-y-6 md:space-y-16">
        {label || title ? (
          <div className="flex flex-col space-y-4">
            {label &&
              (typeof label === "string" ? (
                <p className={cn("text-sm", labelClassName)}>{label}</p>
              ) : (
                <div className={cn("text-sm", labelClassName)}>{label}</div>
              ))}
            {title &&
              (typeof title === "string" ? (
                <h2
                  className={cn(
                    "text-3xl font-medium lg:text-4xl",
                    titleClassName,
                  )}
                >
                  {title}
                </h2>
              ) : (
                <div
                  className={cn(
                    "text-3xl font-medium lg:text-4xl",
                    titleClassName,
                  )}
                >
                  {title}
                </div>
              ))}
          </div>
        ) : null}

        {(valuesSlot || (values && values.length > 0)) && (
          <div
            className={cn(
              "grid gap-6 grid-cols-1 md:grid-cols-3",
              gridClassName,
            )}
          >
            {valuesContent}
          </div>
        )}
      </div>
    </Section>
  );
}
