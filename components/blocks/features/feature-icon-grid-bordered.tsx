"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

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
   * Array of feature items to display
   */
  features?: FeatureIconGridBorderedItem[];
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
   * Additional CSS classes for each feature card
   */
  cardClassName?: string;
}

/**
 * Feature Icon Grid Bordered - Four-column grid of features with icons and
 * dashed left borders creating a visual timeline effect.
 *
 * Layout: Four-column responsive grid with icon badges and dashed borders.
 * Key features: Icon badges in accent circles, dashed border separators, accent line indicators.
 * Best for: Why us sections, value propositions, capability highlights, process steps.
 *
 * @example
 * ```tsx
 * <FeatureIconGridBordered
 *   label="Why Us?"
 *   title="A better way to build websites"
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
}: FeatureIconGridBorderedProps): React.JSX.Element {
  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => {
      const renderIcon = () => {
        if (feature.icon) return feature.icon;
        if (feature.iconName) {
          return <DynamicIcon name={feature.iconName} size={20} className="md:size-6" />;
        }
        return <DynamicIcon name="lucide/star" size={20} className="md:size-6" />;
      };

      return (
        <div
          key={index}
          className={cn("relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5", cardClassName, feature.className)}
        >
          <span className={cn("mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12", feature.iconClassName)}>
            {renderIcon()}
          </span>
          <div>
            {feature.title && (
              typeof feature.title === "string" ? (
                <h3 className={cn("font-medium md:mb-2 md:text-xl", feature.titleClassName)}>
                  {feature.title}
                  <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
                </h3>
              ) : (
                <div className={cn("font-medium md:mb-2 md:text-xl", feature.titleClassName)}>
                  {feature.title}
                  <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
                </div>
              )
            )}
            {feature.description && (
              typeof feature.description === "string" ? (
                <p className={cn("text-sm text-muted-foreground md:text-base", feature.descriptionClassName)}>
                  {feature.description}
                </p>
              ) : (
                <div className={cn("text-sm text-muted-foreground md:text-base", feature.descriptionClassName)}>
                  {feature.description}
                </div>
              )
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {label && (
          typeof label === "string" ? (
            <p className={cn("mb-4 text-xs text-muted-foreground", labelClassName)}>{label}</p>
          ) : (
            <div className={cn("mb-4 text-xs text-muted-foreground", labelClassName)}>{label}</div>
          )
        )}
        {title && (
          typeof title === "string" ? (
            <h2 className={cn("text-3xl font-medium lg:text-4xl", titleClassName)}>{title}</h2>
          ) : (
            <div className={cn("text-3xl font-medium lg:text-4xl", titleClassName)}>{title}</div>
          )
        )}
        <div className={cn("mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4", gridClassName)}>
          {renderFeatures()}
        </div>
      </div>
    </section>
  );
}
