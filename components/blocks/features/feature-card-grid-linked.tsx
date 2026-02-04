"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import {
  cn,
  getNestedCardBg,
  getNestedCardTextColor,
  getTextColor,
} from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface FeatureCardGridLinkedItem {
  /**
   * Unique identifier
   */
  id?: string;
  /**
   * Card heading content
   */
  heading?: React.ReactNode;
  /**
   * Label content displayed above heading
   */
  label?: React.ReactNode;
  /**
   * Card description content
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  image?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Image element or ReactNode (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
   * Link URL
   */
  url?: string;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

export interface FeatureCardGridLinkedProps {
  /**
   * Section title content
   */
  title?: React.ReactNode;
  /**
   * Feature description content
   */
  description?: React.ReactNode;
  /**
   * Array of feature cards
   */
  features?: FeatureCardGridLinkedItem[];
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
   * Additional CSS classes for the title wrapper
   */
  titleWrapperClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
 * Feature Card Grid Linked - Two-column grid of feature cards with images,
 * labels, and clickable headings.
 *
 * Layout: Two-column grid with muted background cards, image thumbnails.
 * Key features: Clickable headings, label badges, image previews, hover effects.
 * Best for: Audience-specific features, role-based content, product categories.
 *
 * @example
 * ```tsx
 * <FeatureCardGridLinked
 *   title="A collection of extra blocks for your site"
 *   features={[
 *     {
 *       id: "1",
 *       heading: "Design System Approved",
 *       label: "FOR DESIGNERS",
 *       description: "Hundreds of components available in Figma.",
 *       image: "/design.jpg",
 *       url: "/designers"
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureCardGridLinked({
  title,
  description,
  features,
  featuresSlot,
  className,
  containerClassName = "px-6 sm:px-6 md:px-6 lg:px-8",
  titleWrapperClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  optixFlowConfig,
  background,
  spacing = "py-8 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureCardGridLinkedProps): React.JSX.Element {
  const renderImage = useCallback(
    (feature: FeatureCardGridLinkedItem, imageAlt: string) => {
      if (feature.imageSlot) return feature.imageSlot;
      if (feature.image) {
        return (
          <Img
            src={feature.image}
            alt={imageAlt}
            className="h-full w-full rounded-t-lg object-cover transition-opacity hover:opacity-80"
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
        );
      }
      return null;
    },
    [optixFlowConfig],
  );

  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => {
      const featureKey = feature.id || `feature-${index}`;
      const imageAlt =
        feature.imageAlt ||
        (typeof feature.heading === "string"
          ? feature.heading
          : "Feature image");

      return (
        <div
          key={featureKey}
          className={cn(
            "flex flex-col justify-between rounded-lg border",
            getNestedCardBg(background),
            getNestedCardTextColor(background),
            cardClassName,
            feature.className,
          )}
        >
          <div className="flex justify-between gap-4 md:gap-10 border-b">
            <div className="flex flex-col justify-between gap-8 py-4 pl-4 md:gap-14 md:py-10 md:pl-8 lg:justify-normal">
              {feature.label && (
                <span
                  className={cn(
                    "font-bold text-xs uppercase opacity-75",
                    feature.labelClassName,
                  )}
                >
                  {feature.label}
                </span>
              )}
              {feature.heading && (
                <Pressable href={feature.url}>
                  {typeof feature.heading === "string" ? (
                    <h3
                      className={cn(
                        "text-lg md:text-xl transition-all hover:opacity-80 lg:text-2xl font-semibold leading-snug ",
                        feature.headingClassName,
                      )}
                    >
                      {feature.heading}
                    </h3>
                  ) : (
                    <div
                      className={cn(
                        "text-lg md:text-xl transition-all hover:opacity-80 lg:text-2xl font-semibold leading-snug ",
                        feature.headingClassName,
                      )}
                    >
                      {feature.heading}
                    </div>
                  )}
                </Pressable>
              )}
            </div>
            <div className="md:1/3 w-2/5 shrink-0 rounded-r-lg border-l">
              <Pressable href={feature.url}>
                {renderImage(feature, imageAlt)}
              </Pressable>
            </div>
          </div>
          {feature.description && (
            <p
              className={cn(
                "p-4 md:p-8",
                getTextColor(background, "muted"),
                feature.descriptionClassName,
              )}
            >
              {feature.description}
            </p>
          )}
        </div>
      );
    });
  }, [featuresSlot, features, cardClassName, renderImage, background]);

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
        {title || description ? (
          <div className="flex flex-col gap-4">
            {title &&
              (typeof title === "string" ? (
                <h2
                  className={cn(
                    "text-xl font-medium tracking-tight md:text-2xl lg:text-3xl text-balance",
                    titleClassName,
                  )}
                >
                  {title}
                </h2>
              ) : (
                <div className={titleClassName}>{title}</div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn("max-w-lg text-balance", descriptionClassName)}
                >
                  {description}
                </p>
              ) : (
                <div
                  className={cn("max-w-lg text-balance", descriptionClassName)}
                >
                  {description}
                </div>
              ))}
          </div>
        ) : null}

        <div
          className={cn("grid gap-4 md:gap-8 lg:grid-cols-2", gridClassName)}
        >
          {featuresContent}
        </div>
      </div>
    </Section>
  );
}
