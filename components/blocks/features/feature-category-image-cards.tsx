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

export interface FeatureCategoryImageCardsItem {
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature category
   */
  category: string;
  /**
   * Image source URL
   */
  imageSrc: string;
  /**
   * Image alt text
   */
  imageAlt: string;
}

export interface FeatureCategoryImageCardsProps {
  /**
   * Badge text
   */
  badge?: string;
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Array of feature items
   */
  features?: FeatureCategoryImageCardsItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
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
  badge = "Exceptional Software",
  title = "Key Features",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quaerat odit sunt eaque ex, natus vel maxime tenetur odio? Nemo.",
  features = [
    {
      title: "Interface",
      category: "Category",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder1,
      imageAlt: "User-Friendly Interface",
    },
    {
      title: "Analytics",
      category: "Category",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholderDark1,
      imageAlt: "Advanced Analytics",
    },
    {
      title: "Integration",
      category: "Category",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder3,
      imageAlt: "Seamless Integration",
    },
    {
      title: "Customizable",
      category: "Category",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder4,
      imageAlt: "Customizable Features",
    },
    {
      title: "Support",
      category: "Category",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder5,
      imageAlt: "Reliable Support",
    },
    {
      title: "Security",
      category: "Category",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder6,
      imageAlt: "Secure Data Management",
    },
  ],
  className,
  optixFlowConfig,
}: FeatureCategoryImageCardsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {badge && <Badge variant="outline">{badge}</Badge>}
          {title && (
            <h1 className="text-3xl font-semibold md:text-5xl">{title}</h1>
          )}
          {description && (
            <p className="max-w-2xl text-muted-foreground md:text-lg">
              {description}
            </p>
          )}
        </div>
        <div className="mx-auto mt-20 grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-none bg-muted/60">
              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold md:text-2xl">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground md:text-lg">
                  {feature.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-7 pb-7">
                <Img
                  src={feature.imageSrc}
                  alt={feature.imageAlt}
                  className="w-full rounded-xl object-cover"
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
