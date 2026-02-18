"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

/**
 * Animation variants for each image position in the 2x2 grid.
 * Each image enters from a unique direction for an asymmetric cascade effect.
 */
const imageAnimationVariants = [
  // Top-left: slides in from left + up
  {
    hidden: { opacity: 0, x: -40, y: -30, scale: 0.92 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  },
  // Bottom-left: slides in from left + down
  {
    hidden: { opacity: 0, x: -30, y: 40, scale: 0.92 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  },
  // Top-right: slides in from right + up
  {
    hidden: { opacity: 0, x: 40, y: -30, scale: 0.92 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  },
  // Bottom-right: slides in from right + down
  {
    hidden: { opacity: 0, x: 30, y: 40, scale: 0.92 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  },
];

/**
 * Stagger delays for each image position to create a cascade reveal.
 */
const staggerDelays = [0, 0.15, 0.1, 0.25];

/**
 * Shared spring transition for smooth, professional motion.
 */
const imageTransition = {
  type: "spring" as const,
  stiffness: 80,
  damping: 20,
  mass: 0.8,
};

export interface HeroAgencyAnimatedImagesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Array of images for the grid
   */
  images?: ImageItem[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
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
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the images container
   */
  imagesContainerClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroAgencyAnimatedImages({
  heading,
  description,
  descriptionClassName,
  actions,
  actionsSlot,
  actionsClassName,
  images,
  imagesSlot,
  background,
  spacing = "xl",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  imagesContainerClassName,
  optixFlowConfig,
}: HeroAgencyAnimatedImagesProps): React.JSX.Element {
  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    const leftImages = images.slice(0, 2);
    const rightImages = images.slice(2, 4);

    return (
      <div className="grid w-full grid-cols-2 items-center justify-center gap-5">
        {/* Left column: offset down for asymmetric visual rhythm */}
        <div className="flex flex-col items-end justify-center gap-5 pt-8">
          {leftImages.map((image, index) => {
            const variant = imageAnimationVariants[index];
            const delay = staggerDelays[index];

            return (
              <motion.div
                key={index}
                initial={variant.hidden}
                whileInView={variant.visible}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...imageTransition, delay }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <Img
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    "block h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105",
                    image.className,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-foreground/5 transition-all duration-500 group-hover:ring-foreground/10" />
              </motion.div>
            );
          })}
        </div>
        {/* Right column: offset up for asymmetric visual rhythm */}
        <div className="flex flex-col items-start justify-center gap-5 pb-8">
          {rightImages.map((image, index) => {
            const globalIndex = index + 2;
            const variant = imageAnimationVariants[globalIndex];
            const delay = staggerDelays[globalIndex];

            return (
              <motion.div
                key={index}
                initial={variant.hidden}
                whileInView={variant.visible}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...imageTransition, delay }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <Img
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    "block h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105",
                    image.className,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-foreground/5 transition-all duration-500 group-hover:ring-foreground/10" />
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }, [imagesSlot, images, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="pt-10 md:pt-0">
        <div className="grid w-full gap-12 md:gap-14 grid-cols-1 lg:grid-cols-2">
          <div className={cn("flex w-full flex-col gap-4", contentClassName)}>
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl md:text-5xl lg:text-7xl xl:text-[5rem] text-left text-pretty",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                heading
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "text-left text-lg md:text-xl text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
            <BlockActions
              actions={actions}
              actionsSlot={actionsSlot}
              actionsClassName={actionsClassName}
            />
          </div>
          <div
            className={cn(
              "mx-auto w-full max-w-211.5 lg:mx-0",
              imagesContainerClassName,
            )}
          >
            <AspectRatio ratio={1.049627792 / 1}>{renderImages}</AspectRatio>
          </div>
        </div>
      </div>
    </Section>
  );
}
