"use client";

import * as React from "react";
import { useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectHoverRevealGridItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface ProjectHoverRevealGridProps {
  /**
   * Array of image configurations
   */
  images?: ProjectHoverRevealGridItem[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Section background style
   */
  background?: SectionBackground;
  /**
   * Section spacing
   */
  spacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
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
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each image card
   */
  cardClassName?: string;
}

/**
 * ProjectHoverRevealGrid - Two-column grid with slide-up text reveal on hover.
 *
 * Displays projects in a uniform 2-column grid with square aspect ratio images.
 * On hover, images scale up slightly with a subtle overlay, and title/description
 * text slides up from the bottom. Similar to ProjectGridGallery but with 2 columns
 * instead of 3, creating larger image tiles. Perfect for portfolios where larger
 * image presentation is preferred while maintaining the interactive hover reveal.
 */
export function ProjectHoverRevealGrid({
  images,
  imagesSlot,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  gridClassName,
  cardClassName,
}: ProjectHoverRevealGridProps) {
  const renderedImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return images.map((image, index) => (
      <div
        key={index}
        className={cn(
          "group relative aspect-square overflow-hidden",
          cardClassName,
        )}
      >
        <Img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          optixFlowConfig={optixFlowConfig}
        />
        <div className="absolute inset-0 bg-background/0 transition-all duration-300 group-hover:bg-background/10" />
        <div className="absolute right-0 bottom-0 left-0 translate-y-full transform p-6 transition-transform duration-300 group-hover:translate-y-0">
          <div className="text-center">
            <h3 className="mb-2 text-xl font-semibold text-muted">
              {image.title}
            </h3>
            <p className="text-sm text-muted">{image.description}</p>
          </div>
        </div>
      </div>
    ));
  }, [imagesSlot, images, cardClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("grid grid-cols-1 md:grid-cols-2", gridClassName)}>
          {renderedImages}
        </div>
      </div>
    </Section>
  );
}
