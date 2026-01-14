"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { FeatureItem, OptixFlowConfig } from "../../../src/types";

export interface FeatureIconGridAccentItem {
  /**
   * Icon element or ReactNode
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/zoom-in") - used if icon prop not provided
   */
  iconName?: string;
  /**
   * Feature title
   */
  title?: React.ReactNode;
  /**
   * Feature description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the feature card
   */
  className?: string;
  /**
   * Additional CSS classes for the icon wrapper
   */
  iconClassName?: string;
}

export interface FeatureIconGridAccentProps {
  /**
   * Section label/eyebrow text
   */
  label?: React.ReactNode;
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
  features?: FeatureIconGridAccentItem[];
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
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the features grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each feature card
   */
  cardClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * Feature Icon Grid Accent - Two-column grid of features with accent background
 * cards and icon badges.
 *
 * Layout: Centered header with two-column grid of accent-colored cards.
 * Key features: Accent background cards, circular icon badges, generous spacing.
 * Best for: Value propositions, unique selling points, company differentiators.
 *
 * @example
 * ```tsx
 * <FeatureIconGridAccent
 *   label="WHY WE ARE UNIQUE"
 *   title="Bringing the best to you"
 *   features={[
 *     { iconName: "lucide/zoom-in", title: "Quality", description: "Built with care" },
 *     { iconName: "lucide/zap", title: "Innovation", description: "Cutting-edge tech" },
 *   ]}
 * />
 * ```
 */
export function FeatureIconGridAccent({
  label,
  title,
  description,
  features,
  featuresSlot,
  className,
  containerClassName,
  headerClassName,
  labelClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
}: FeatureIconGridAccentProps): React.JSX.Element {
  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => {
      const iconElement = feature.icon ?? (
        feature.iconName ? <DynamicIcon name={feature.iconName} size={24} /> : null
      );

      return (
        <div
          key={index}
          className={cn(
            "flex flex-col justify-between rounded-lg bg-accent p-6 md:min-h-[300px] md:p-8",
            cardClassName,
            feature.className
          )}
        >
          {iconElement && (
            <span className={cn("mb-6 flex size-11 items-center justify-center rounded-full bg-background", feature.iconClassName)}>
              {iconElement}
            </span>
          )}
          <div>
            {feature.title && (
              typeof feature.title === "string" ? (
                <h3 className="text-lg font-medium md:text-2xl">
                  {feature.title}
                </h3>
              ) : (
                <div className="text-lg font-medium md:text-2xl">{feature.title}</div>
              )
            )}
            {feature.description && (
              typeof feature.description === "string" ? (
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              ) : (
                <div className="mt-2 text-muted-foreground">{feature.description}</div>
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
        <div className={cn("flex w-full flex-col items-center", headerClassName)}>
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
            {label && (
              typeof label === "string" ? (
                <p className={cn("text-sm text-muted-foreground", labelClassName)}>{label}</p>
              ) : (
                <div className={labelClassName}>{label}</div>
              )
            )}
            {title && (
              typeof title === "string" ? (
                <h2 className={cn("text-3xl font-medium md:text-5xl", titleClassName)}>{title}</h2>
              ) : (
                <div className={titleClassName}>{title}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-muted-foreground md:max-w-2xl", descriptionClassName)}>{description}</p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
          </div>
        </div>
        <div className={cn("mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-2", gridClassName)}>
          {renderFeatures()}
        </div>
      </div>
    </section>
  );
}
