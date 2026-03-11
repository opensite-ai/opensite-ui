"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type {
  ActionConfig,
  FeatureItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";

export interface HeroFeatureCardsGridProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
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
   * Array of feature items
   */
  features?: Array<FeatureItem & { iconName?: string }>;
  /**
   * Custom slot for features (overrides features array)
   */
  featuresSlot?: React.ReactNode; /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;

  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content area
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
   * Additional CSS classes for the features container
   */
  featuresClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroFeatureCardsGrid({
  sectionId = "hero-feature-cards-grid",
  heading,
  description,
  actions,
  actionsSlot,
  features,
  featuresSlot,
  background,
  spacing = "xl",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
}: HeroFeatureCardsGridProps): React.JSX.Element {
  const renderFeatures = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-12 md:mt-20 grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-4",
          featuresClassName,
        )}
      >
        {features.map((feature, index) => (
          <Pressable
            href={feature.href}
            key={index}
            className={cn(
              "group rounded-2xl border border-border p-6 transition-shadow hover:shadow-lg",
            )}
          >
            <div
              className={cn(
                "mb-4 flex h-12 w-12 items-center justify-center rounded-lg",
              )}
            >
              {feature.icon ?? (
                <DynamicIcon
                  name={feature.iconName || "lucide/check"}
                  size={24}
                />
              )}
            </div>
            <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
            {feature.description && (
              <p className={cn("text-sm")}>{feature.description}</p>
            )}
          </Pressable>
        ))}
      </div>
    );
  }, [featuresSlot, features, featuresClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="pt-10 md:pt-0">
        <div
          className={cn(
            "mx-auto max-w-full md:max-w-3xl text-center flex flex-col items-center",
            contentClassName,
          )}
        >
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <h1
                className={cn(
                  "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mt-6 text-lg text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </div>
        {renderFeatures}
      </div>
    </Section>
  );
}
