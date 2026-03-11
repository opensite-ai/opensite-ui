"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { ActionConfig } from "../../../src/types/blocks";

export interface TimelineFeature {
  image: string;
  imageAlt?: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface TimelineTwoColumnFeaturedProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Primary action configuration
   */
  primaryAction?: ActionConfig;
  /**
   * Secondary action configuration
   */
  secondaryAction?: ActionConfig;
  /**
   * Custom slot for rendering actions (overrides primaryAction/secondaryAction)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of timeline features
   */
  features?: TimelineFeature[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  containerClassName?: string;
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
  /**
   * Additional CSS classes for individual feature cards
   */
  featureClassName?: string;
  /**
   * Additional CSS classes for feature images
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for feature titles
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for feature descriptions
   */
  featureDescriptionClassName?: string;
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
   * Additional CSS classes for the pattern background
   */
  patternClassName?: string;
  /**
   * Section ID for anchor links
   */
  id?: string;
  /**
   * Inline styles for the section
   */
  style?: React.CSSProperties;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  /** Optional Section ID */
  sectionId?: string;
}

export function TimelineTwoColumnFeatured({
  sectionId = "timeline-two-column-featured",
  heading,
  description,
  primaryAction,
  secondaryAction,
  actionsSlot,
  features,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
  featureClassName,
  imageClassName,
  titleClassName,
  featureDescriptionClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
  optixFlowConfig,
}: TimelineTwoColumnFeaturedProps) {
  const renderActions = React.useMemo(() => {
    if (actionsSlot) {
      return actionsSlot;
    }

    return (
      <>
        {primaryAction && (
          <Pressable
            href={primaryAction.href}
            onClick={primaryAction.onClick}
            variant={primaryAction.variant || "default"}
            size={primaryAction.size || "lg"}
            className={primaryAction.className}
            asButton
          >
            {primaryAction.children || primaryAction.label}
          </Pressable>
        )}
        {secondaryAction && (
          <Pressable
            href={secondaryAction.href}
            onClick={secondaryAction.onClick}
            variant={secondaryAction.variant || "outline"}
            size={secondaryAction.size || "lg"}
            className={secondaryAction.className}
            asButton
          >
            {secondaryAction.children || secondaryAction.label}
          </Pressable>
        )}
      </>
    );
  }, [actionsSlot, primaryAction, secondaryAction]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      style={style}
    >
      <div className={cn("max-w-6xl mx-auto", containerClassName)}>
        <div className="relative grid gap-16 md:grid-cols-2">
          <div className="top-40 h-fit md:sticky">
            <h2
              className={cn(
                "mt-4 mb-6 text-4xl font-semibold md:text-5xl",
                headingClassName,
              )}
            >
              {heading}
            </h2>
            <p
              className={cn(
                "font-medium text-muted-foreground md:text-xl",
                descriptionClassName,
              )}
            >
              {description}
            </p>
            <div
              className={cn(
                "mt-8 flex flex-col gap-4 lg:flex-row",
                actionsClassName,
              )}
            >
              {renderActions}
            </div>
          </div>
          <div
            className={cn("flex flex-col gap-12 md:gap-20", featuresClassName)}
          >
            {features?.map((feature, index) => (
              <div
                key={index}
                className={cn("rounded-xl border p-2", featureClassName)}
              >
                <Img
                  src={feature.image}
                  alt={
                    feature.imageAlt ||
                    (typeof feature.title === "string"
                      ? feature.title
                      : `Feature ${index + 1}`)
                  }
                  className={cn(
                    "aspect-video w-full rounded-xl border border-dashed object-cover",
                    imageClassName,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="p-6">
                  <h3
                    className={cn(
                      "mb-1 text-2xl font-semibold",
                      titleClassName,
                    )}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={cn(
                      "text-muted-foreground",
                      featureDescriptionClassName,
                    )}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
