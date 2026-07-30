"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  FeatureItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaFeatureCardsGridProps {
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
   * Array of feature cards to display
   */
  features?: FeatureItem[];
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the features grid
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for each feature card
   */
  featureCardClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * CtaFeatureCardsGrid - A CTA section with heading, description, action buttons,
 * and a grid of feature cards with icons and descriptions. Ideal for showcasing
 * multiple benefits alongside a call to action.
 *
 * @example
 * ```tsx
 * <CtaFeatureCardsGrid
 *   heading="Everything you need"
 *   description="All the tools to build amazing products."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" },
 *     { label: "Learn More", href: "/about", variant: "outline" }
 *   ]}
 *   features={[
 *     { iconName: "lucide/zap", title: "Fast", description: "Lightning fast performance" }
 *   ]}
 * />
 * ```
 */
export function CtaFeatureCardsGrid({
  sectionId = "cta-feature-cards-grid",
  heading,
  description,
  actions,
  actionsSlot,
  features,
  featuresSlot,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
  featureCardClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
}: CtaFeatureCardsGridProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "mb-12 flex flex-col justify-center gap-2 sm:flex-row",
          actionsClassName,
        )}
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
            {action.icon === "" ? null : (
              <DynamicIcon name={action.icon} />
            )}
            {action.children ?? action.label}
            {action.iconAfter === "" ? null : (
              <DynamicIcon name={action.iconAfter} />
            )}
          </Pressable>
        ))}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div
        className={cn(
          "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
          featuresClassName,
        )}
      >
        {features.map((feature, index) => (
          <Card
            key={index}
            className={cn("p-6 text-center", featureCardClassName)}
          >
            {(feature.icon || feature.iconName) && (
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                {feature.icon != null ? (
                  feature.icon === "" ? null : (
                    <DynamicIcon name={feature.icon} size={24} />
                  )
                ) : (
                  <DynamicIcon name={feature.iconName || ""} size={24} />
                )}
              </div>
            )}
            {feature.title && (
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
            )}
            {feature.description && (
              <p className="text-sm">{feature.description}</p>
            )}
          </Card>
        ))}
      </div>
    );
  }, [featuresSlot, features, featuresClassName, featureCardClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className={cn("text-center", contentClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-4 text-3xl font-bold md:text-5xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              heading
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mx-auto mb-8 max-w-2xl text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}
          {actionsContent}
        </div>
        {featuresContent}
      </div>
    </Section>
  );
}
