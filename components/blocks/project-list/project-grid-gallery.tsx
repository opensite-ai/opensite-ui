"use client";

import * as React from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface ProjectGridGalleryItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface ProjectGridGalleryProps {
  /**
   * Array of image configurations
   */
  images?: ProjectGridGalleryItem[];
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
  pattern?: string;
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
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

/**
 * ProjectGridGallery - Three-column responsive grid gallery with hover effects.
 *
 * Displays projects in a uniform 3-column grid layout with square aspect ratio images.
 * On hover, images scale up slightly with a subtle overlay, and title/description
 * text slides up from the bottom. Perfect for photography portfolios, art galleries,
 * or any visual-first project showcase where uniform presentation is desired.
 * Responsive design collapses to single column on mobile.
 */
export function ProjectGridGallery({
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
  imageClassName,
  titleClassName,
  descriptionClassName,
}: ProjectGridGalleryProps) {
  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return images.map((image, index) => (
      <div
        key={index}
        className={cn("group relative aspect-square overflow-hidden", cardClassName)}
      >
        <Img
          src={image.src}
          alt={image.alt}
          className={cn("h-full w-full object-cover transition-transform duration-300 group-hover:scale-105", imageClassName)}
          optixFlowConfig={optixFlowConfig}
        />
        <div className="absolute inset-0 bg-background/0 transition-all duration-300 group-hover:bg-background/10" />
        <div className="absolute right-0 bottom-0 left-0 translate-y-full transform p-6 transition-transform duration-300 group-hover:translate-y-0">
          <div className="text-center">
            <h3 className={cn("mb-2 text-xl font-semibold text-muted", titleClassName)}>
              {image.title}
            </h3>
            <p className={cn("text-sm text-muted", descriptionClassName)}>{image.description}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("grid grid-cols-1 md:grid-cols-3", gridClassName)}>
          {renderImages()}
        </div>
      </div>
    </Section>
  );
}
