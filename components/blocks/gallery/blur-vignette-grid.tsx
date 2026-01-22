"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Image item configuration for the blur vignette grid.
 */
export interface BlurVignetteGridImage {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for accessibility
   */
  alt: string;
  /**
   * Number of columns to span (1-5)
   */
  colSpan: number;
  /**
   * Height class for the image (e.g., "h-82", "h-100")
   */
  height: string;
  /**
   * Additional CSS classes for the image
   */
  className?: string;
}

/**
 * Configuration for the blur vignette effect.
 */
export interface BlurVignetteConfig {
  /**
   * Border radius of the vignette
   * @default "24px"
   */
  radius?: string;
  /**
   * Inset distance from edges
   * @default "10px"
   */
  inset?: string;
  /**
   * Length of the blur transition
   * @default "100px"
   */
  transitionLength?: string;
  /**
   * Blur intensity
   * @default "15px"
   */
  blur?: string;
}

export interface BlurVignetteGridProps {
  /**
   * Array of images to display in the grid
   */
  images?: BlurVignetteGridImage[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Configuration for the blur vignette effect
   */
  vignetteConfig?: BlurVignetteConfig;
  /**
   * Number of grid columns
   * @default 5
   */
  gridColumns?: number;
  /**
   * Gap between grid items
   * @default "gap-4"
   */
  gridGap?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each grid item
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for each image
   */
  imageClassName?: string;
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
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

interface BlurVignetteProps {
  children: React.ReactNode;
  className?: string;
  radius?: string;
  inset?: string;
  transitionLength?: string;
  blur?: string;
}

function BlurVignette({
  children,
  className = "",
  radius = "24px",
  inset = "16px",
  transitionLength = "32px",
  blur = "21px",
}: BlurVignetteProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
        y: -50,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.2 }}
      className={`group relative cursor-pointer overflow-hidden ${className}`}
    >
      <style>
        {`
          .blur-vignette {
            --radius: ${radius};
            --inset: ${inset};
            --transition-length: ${transitionLength};
            --blur: ${blur};
            position: absolute;
            inset: 0;
            -webkit-backdrop-filter: blur(var(--blur));
            backdrop-filter: blur(var(--blur));
            --r: max(var(--transition-length), calc(var(--radius) - var(--inset)));
            --corner-size: calc(var(--r) + var(--inset)) calc(var(--r) + var(--inset));
            --corner-gradient: transparent 0px,
              transparent calc(var(--r) - var(--transition-length)), 
              black var(--r);
            --fill-gradient: black, 
              black var(--inset),
              transparent calc(var(--inset) + var(--transition-length)),
              transparent calc(100% - var(--transition-length) - var(--inset)),
              black calc(100% - var(--inset));
            --fill-narrow-size: calc(100% - (var(--inset) + var(--r)) * 2);
            --fill-farther-position: calc(var(--inset) + var(--r));
            -webkit-mask-image: linear-gradient(to right, var(--fill-gradient)),
              linear-gradient(to bottom, var(--fill-gradient)),
              radial-gradient(at bottom right, var(--corner-gradient)),
              radial-gradient(at bottom left, var(--corner-gradient)),
              radial-gradient(at top left, var(--corner-gradient)),
              radial-gradient(at top right, var(--corner-gradient));
            -webkit-mask-size: 100% var(--fill-narrow-size), 
              var(--fill-narrow-size) 100%,
              var(--corner-size), 
              var(--corner-size), 
              var(--corner-size),
              var(--corner-size);
            -webkit-mask-position: 0 var(--fill-farther-position), 
              var(--fill-farther-position) 0,
              0 0, 
              100% 0, 
              100% 100%, 
              0 100%;
            -webkit-mask-repeat: no-repeat;
            opacity: 0;
            transition: opacity 0.3s ease;    
        }

        .blur-vignette.active {
        opacity: 1;
        }

        .group:hover .blur-vignette {
        opacity: 0;
        }
        `}
      </style>
      <div className="blur-vignette active" />
      {children}
    </motion.div>
  );
}

/**
 * BlurVignetteGrid displays images in a grid with animated blur vignette effect.
 *
 * Features a 5-column grid with varying column spans (2, 3, or 5) and heights.
 * Each image is wrapped in a BlurVignette component that applies a CSS blur
 * mask effect around the edges, which fades out on hover to reveal the full
 * image. Images animate into view with Framer Motion. Ideal for artistic
 * photo galleries, portfolio showcases, or any visual content requiring an
 * elegant, gallery-like presentation.
 *
 * @example
 * ```tsx
 * <BlurVignetteGrid
 *   images={[
 *     { src: "/images/photo-1.jpg", alt: "Photo 1", colSpan: 2, height: "h-82" },
 *     { src: "/images/photo-2.jpg", alt: "Photo 2", colSpan: 3, height: "h-82" }
 *   ]}
 *   vignetteConfig={{ radius: "24px", blur: "15px" }}
 * />
 * ```
 */
export function BlurVignetteGrid({
  images,
  imagesSlot,
  vignetteConfig,
  gridColumns = 5,
  gridGap = "gap-4",
  className,
  gridClassName,
  itemClassName,
  imageClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: BlurVignetteGridProps): React.JSX.Element {
  const {
    radius = "24px",
    inset = "10px",
    transitionLength = "100px",
    blur = "15px",
  } = vignetteConfig || {};

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return images.map((image, index) => (
      <BlurVignette
        key={index}
        radius={radius}
        inset={inset}
        transitionLength={transitionLength}
        blur={blur}
        className={cn(
          `col-span-${image.colSpan}`,
          image.height,
          "rounded-[2.5rem]",
          image.className,
          itemClassName,
        )}
      >
        <Img
          width={200}
          height={200}
          className={cn(
            "size-full rounded-[2.5rem] object-cover",
            imageClassName,
          )}
          src={image.src}
          alt={image.alt}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      </BlurVignette>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div
        className={cn(`grid grid-cols-${gridColumns}`, gridGap, gridClassName)}
      >
        {renderImages()}
      </div>
    </Section>
  );
}
