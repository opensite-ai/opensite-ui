"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface FeatureCategoryImageCardsItem {
  /**
   * Feature title content
   */
  title?: React.ReactNode;
  /**
   * Feature category content
   */
  category?: React.ReactNode;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Custom slot for image (overrides imageSrc)
   */
  imageSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the category
   */
  categoryClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface FeatureCategoryImageCardsProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
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
  features?: FeatureCategoryImageCardsItem[];
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
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
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
 * Feature Category Image Cards - Six-card grid with category badges and
 * large images showcasing key features.
 *
 * Layout: Centered header with three-column grid of muted background cards.
 * Key features: Category labels, large images, centered text, muted backgrounds.
 * Best for: Feature showcases, product categories, capability highlights.
 *
 * @example
 * ```tsx
 * <FeatureCategoryImageCards
 *   badge="Exceptional Software"
 *   title="Key Features"
 *   features={[
 *     { title: "Interface", category: "Design", imageSrc: "/interface.jpg", imageAlt: "Interface" },
 *   ]}
 * />
 * ```
 */
export function FeatureCategoryImageCards({
  badge,
  title,
  description,
  features,
  featuresSlot,
  className,
  headerClassName,
  badgeClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureCategoryImageCardsProps): React.JSX.Element {
  const renderFeatureImage = useCallback(
    (feature: FeatureCategoryImageCardsItem) => {
      if (feature.imageSlot) return feature.imageSlot;
      if (feature.imageSrc) {
        return (
          <Img
            src={feature.imageSrc}
            alt={feature.imageAlt || "Feature image"}
            className={cn(
              "w-full rounded-xl object-cover",
              feature.imageClassName,
            )}
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

    return features.map((feature, index) => (
      <Card
        key={index}
        className={cn("border-none", cardClassName, feature.className)}
      >
        <CardHeader className="text-center">
          {feature.title &&
            (typeof feature.title === "string" ? (
              <CardTitle
                className={cn(
                  "text-lg font-semibold md:text-2xl",
                  feature.titleClassName,
                )}
              >
                {feature.title}
              </CardTitle>
            ) : (
              <div
                className={cn(
                  "text-lg font-semibold md:text-2xl",
                  feature.titleClassName,
                )}
              >
                {feature.title}
              </div>
            ))}
          {feature.category &&
            (typeof feature.category === "string" ? (
              <CardDescription
                className={cn("md:text-lg", feature.categoryClassName)}
              >
                {feature.category}
              </CardDescription>
            ) : (
              <div className={cn("md:text-lg", feature.categoryClassName)}>
                {feature.category}
              </div>
            ))}
        </CardHeader>
        <CardContent className="px-7 pb-7">
          {renderFeatureImage(feature)}
        </CardContent>
      </Card>
    ));
  }, [featuresSlot, features, cardClassName, renderFeatureImage]);

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
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4 text-center",
          headerClassName,
        )}
      >
        {badge && (
          <Badge variant="outline" className={badgeClassName}>
            {badge}
          </Badge>
        )}
        {title &&
          (typeof title === "string" ? (
            <h2
              className={cn(
                "text-3xl font-semibold md:text-5xl",
                titleClassName,
              )}
            >
              {title}
            </h2>
          ) : (
            <div
              className={cn(
                "text-3xl font-semibold md:text-5xl",
                titleClassName,
              )}
            >
              {title}
            </div>
          ))}
        {description &&
          (typeof description === "string" ? (
            <p className={cn("max-w-2xl md:text-lg", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={cn("max-w-2xl md:text-lg", descriptionClassName)}>
              {description}
            </div>
          ))}
      </div>
      <div
        className={cn(
          "mx-auto mt-20 grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {featuresContent}
      </div>
    </Section>
  );
}
