"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectMasonryColumnsItem {
  src: string;
  alt: string;
}

export interface ProjectMasonryColumnsProps {
  /**
   * Array of image configurations
   */
  images?: ProjectMasonryColumnsItem[];
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
   * Additional CSS classes for the masonry grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each image card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the image wrapper
   */
  imageWrapperClassName?: string;
}

/**
 * ProjectMasonryColumns - CSS columns-based masonry layout with staggered motion animations.
 *
 * Uses CSS multi-column layout to create a Pinterest-style masonry grid that automatically
 * distributes images across 1-3 columns based on viewport width. Each image animates in
 * with a fade and slide effect, staggered by index for a cascading reveal. On hover,
 * images scale up with increased brightness and a subtle dark overlay. Ideal for
 * photography portfolios, mood boards, or any collection where varying image heights
 * create visual interest.
 */
export function ProjectMasonryColumns({
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
  imageWrapperClassName,
}: ProjectMasonryColumnsProps) {
  const renderedImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return images.map((image, index) => (
      <motion.div
        key={index}
        className={cn("mb-4 break-inside-avoid md:mb-6", cardClassName)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
      >
        <div
          className={cn(
            "group relative overflow-hidden border-border transition-all duration-300",
            imageWrapperClassName,
          )}
        >
          <Img
            src={image.src}
            alt={image.alt}
            className="h-auto w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-105"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
        </div>
      </motion.div>
    ));
  }, [imagesSlot, images, cardClassName, imageWrapperClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn(
            "columns-1 gap-4 space-y-4 md:columns-2 md:gap-6 md:space-y-6 lg:columns-3",
            gridClassName,
          )}
        >
          {renderedImages}
        </div>
      </div>
    </Section>
  );
}
