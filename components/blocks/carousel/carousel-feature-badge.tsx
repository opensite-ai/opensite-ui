"use client";

/**
 * CarouselFeatureBadge
 *
 * A two-column feature section with a badge label, headline, description text,
 * and an interactive carousel showcasing platform screenshots or feature images.
 * Includes previous/next navigation controls for browsing through carousel items.
 *
 * Use cases:
 * - Product feature showcases with visual demonstrations
 * - Platform overview sections with screenshot galleries
 * - Marketing landing pages highlighting key capabilities
 */

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CarouselFeatureBadgeProps {
  /**
   * Badge/eyebrow content above heading
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of image items for the carousel
   */
  items?: ImageItem[];
  /**
   * Custom slot for rendering carousel items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the carousel container
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for each carousel item
   */
  carouselItemClassName?: string;
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
}

export function CarouselFeatureBadge({
  badge,
  heading,
  description,
  items,
  itemsSlot,
  className,
  containerClassName,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  carouselClassName,
  carouselItemClassName,
  optixFlowConfig,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: CarouselFeatureBadgeProps): React.JSX.Element {
  const renderCarouselItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, index) => (
      <CarouselItem key={index} className={carouselItemClassName}>
        <div className="flex aspect-video items-center justify-center overflow-hidden rounded-md bg-muted p-6">
          <Img
            src={item.src}
            alt={item.alt}
            className={cn("h-full w-full object-cover", item.className)}
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </CarouselItem>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container mx-auto", containerClassName)}>
        <div className="grid grid-cols-1 items-end justify-end gap-10 lg:grid-cols-2">
          <div className={cn("flex flex-col items-start gap-4", contentClassName)}>
            {badge && (
              <div className={badgeClassName}>
                {typeof badge === "string" ? <Badge>{badge}</Badge> : badge}
              </div>
            )}
            <div className="flex flex-col gap-2">
              {heading && (
                typeof heading === "string" ? (
                  <h2 className={cn("text-left text-xl font-normal tracking-tighter md:text-3xl lg:max-w-xl lg:text-5xl", headingClassName)}>
                    {heading}
                  </h2>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-sm", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
            </div>
          </div>
          <div className={cn("w-full max-w-full px-6", carouselClassName)}>
            <Carousel>
              <CarouselContent>
                {renderCarouselItems()}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </Section>
  );
}

