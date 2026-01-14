"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaFeatureItem {
  /**
   * Icon name for the feature (e.g., "lucide/check")
   */
  iconName?: string;
  /**
   * Custom icon element
   */
  icon?: React.ReactNode;
  /**
   * Feature text
   */
  text?: React.ReactNode;
  /**
   * Additional CSS classes for the feature
   */
  className?: string;
}

export interface CtaFeatureListProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of feature items to display
   */
  features?: CtaFeatureItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the card wrapper
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the features list
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * CtaFeatureList - A CTA section featuring a heading, description, action buttons,
 * and a vertical list of features with icons. Includes a decorative background image.
 * Perfect for highlighting key selling points alongside a call to action.
 *
 * @example
 * ```tsx
 * <CtaFeatureList
 *   heading="Start Building Today"
 *   description="Get access to all features with our starter plan."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" },
 *     { label: "Learn More", href: "/learn", variant: "outline" }
 *   ]}
 *   features={[
 *     { iconName: "lucide/check", text: "Easy Integration" },
 *     { iconName: "lucide/check", text: "24/7 Support" }
 *   ]}
 * />
 * ```
 */
export function CtaFeatureList({
  heading = "Call to Action",
  description = "Build faster with our collection of pre-built components. Speed up your development and ship features in record time.",
  actions,
  actionsSlot,
  features,
  featuresSlot,
  backgroundImage = imagePlaceholders[1],
  className,
  containerClassName,
  cardClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  featuresClassName,
  actionsClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CtaFeatureListProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn("flex flex-col gap-2 sm:flex-row", actionsClassName)}
      >
        {actions.map((action, index) => (
          <Pressable
            key={index}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant}
            size={action.size}
            className={action.className}
            aria-label={action["aria-label"]}
            asButton
          >
            {action.icon}
            {action.children ?? action.label}
            {action.iconAfter}
          </Pressable>
        ))}
      </div>
    );
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <ul className={cn("mb-8 flex flex-col gap-2", featuresClassName)}>
        {features.map((feature, idx) => (
          <li
            key={idx}
            className={cn("flex items-center gap-2", feature.className)}
          >
            {feature.icon ??
              (feature.iconName && (
                <DynamicIcon
                  name={feature.iconName}
                  size={20}
                  className="text-primary"
                />
              ))}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn(
            "relative rounded-xl border border-border bg-accent px-6 py-8 2xl:grid 2xl:grid-cols-2 2xl:px-14 2xl:py-10",
            cardClassName
          )}
        >
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <Img
              src={backgroundImage}
              alt=""
              className="pointer-events-none absolute -top-1/4 right-0 hidden h-full w-1/2 object-cover opacity-90 2xl:block"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
              }}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div className={cn("relative z-10", contentClassName)}>
            <h3
              className={cn(
                "mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6",
                headingClassName
              )}
            >
              {heading}
            </h3>
            <p
              className={cn(
                "mb-6 text-muted-foreground lg:text-lg",
                descriptionClassName
              )}
            >
              {description}
            </p>
            {renderFeatures()}
            {renderActions()}
          </div>
        </div>
      </div>
    </Section>
  );
}
