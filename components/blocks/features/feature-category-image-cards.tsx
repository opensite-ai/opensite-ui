"use client";

import * as React from "react";
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
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { OptixFlowConfig } from "../../../src/types";

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
  containerClassName,
  headerClassName,
  badgeClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  optixFlowConfig,
}: FeatureCategoryImageCardsProps): React.JSX.Element {
  const renderFeatureImage = (feature: FeatureCategoryImageCardsItem) => {
    if (feature.imageSlot) return feature.imageSlot;
    if (feature.imageSrc) {
      return (
        <Img
          src={feature.imageSrc}
          alt={feature.imageAlt || "Feature image"}
          className={cn("w-full rounded-xl object-cover", feature.imageClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      );
    }
    return null;
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <Card key={index} className={cn("border-none bg-muted/60", cardClassName, feature.className)}>
        <CardHeader className="text-center">
          {feature.title && (
            typeof feature.title === "string" ? (
              <CardTitle className={cn("text-lg font-semibold md:text-2xl", feature.titleClassName)}>
                {feature.title}
              </CardTitle>
            ) : (
              <div className={cn("text-lg font-semibold md:text-2xl", feature.titleClassName)}>
                {feature.title}
              </div>
            )
          )}
          {feature.category && (
            typeof feature.category === "string" ? (
              <CardDescription className={cn("text-muted-foreground md:text-lg", feature.categoryClassName)}>
                {feature.category}
              </CardDescription>
            ) : (
              <div className={cn("text-muted-foreground md:text-lg", feature.categoryClassName)}>
                {feature.category}
              </div>
            )
          )}
        </CardHeader>
        <CardContent className="px-7 pb-7">
          {renderFeatureImage(feature)}
        </CardContent>
      </Card>
    ));
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("flex flex-col items-center justify-center gap-4 text-center", headerClassName)}>
          {badge && <Badge variant="outline" className={badgeClassName}>{badge}</Badge>}
          {title && (
            typeof title === "string" ? (
              <h1 className={cn("text-3xl font-semibold md:text-5xl", titleClassName)}>{title}</h1>
            ) : (
              <div className={cn("text-3xl font-semibold md:text-5xl", titleClassName)}>{title}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("max-w-2xl text-muted-foreground md:text-lg", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={cn("max-w-2xl text-muted-foreground md:text-lg", descriptionClassName)}>
                {description}
              </div>
            )
          )}
        </div>
        <div className={cn("mx-auto mt-20 grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3", gridClassName)}>
          {renderFeatures()}
        </div>
      </div>
    </section>
  );
}
