"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface HeroMarketplaceScatteredImagesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Action configuration for CTA button
   */
  action?: ActionConfig;
  /**
   * Custom slot for action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Tagline text with icon
   */
  tagline?: React.ReactNode;
  /**
   * Tagline icon name
   */
  taglineIcon?: string;
  /**
   * Custom slot for tagline (overrides tagline props)
   */
  taglineSlot?: React.ReactNode;
  /**
   * Array of scattered images (expects 5 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Whether to show the grid pattern background
   */
  showGridPattern?: boolean; /**
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
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroMarketplaceScatteredImages({
  heading,
  description,
  action,
  actionSlot,
  tagline,
  taglineIcon,
  taglineSlot,
  images,
  imagesSlot,
  showGridPattern = true,
  background,
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  headingClassName,
  descriptionClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroMarketplaceScatteredImagesProps): React.JSX.Element {
  const renderAction = useMemo(() => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = action;
    return (
      <Pressable asButton className={actionClassName} {...pressableProps}>
        {children ?? (
          <>
            {icon}
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  }, [actionSlot, action]);

  const renderTagline = useMemo(() => {
    if (taglineSlot) return taglineSlot;
    if (!tagline || !taglineIcon) return null;

    return (
      <div className="mt-7 flex items-start justify-center gap-2 font-medium md:text-xl">
        <DynamicIcon name={taglineIcon} size={20} className="mt-0.5" />
        {tagline}
      </div>
    );
  }, [taglineSlot, taglineIcon, tagline]);

  // Distribute images across 3 columns for masonry layout
  const columns = useMemo(() => {
    if (!images || images.length === 0) return [[], [], []] as ImageItem[][];
    const cols: ImageItem[][] = [[], [], []];
    images.forEach((img, i) => {
      cols[i % 3].push(img);
    });
    return cols;
  }, [images]);

  // Predefined height patterns per column for varied "scattered" feel
  const heightPatterns = useMemo(
    () => [
      ["14rem", "20rem", "16rem", "22rem"],
      ["20rem", "14rem", "22rem", "16rem"],
      ["16rem", "22rem", "14rem", "20rem"],
    ],
    [],
  );

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div
        className={cn(
          "mx-auto max-w-7xl overflow-hidden py-8",
          imagesClassName,
        )}
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {columns.map((colImages, colIndex) => (
            <div
              key={colIndex}
              className={cn(
                "grid gap-3",
                colIndex === 2 && "hidden md:grid",
              )}
            >
              {colImages.map((image, imgIndex) => {
                const height =
                  heightPatterns[colIndex][
                    imgIndex % heightPatterns[colIndex].length
                  ];
                const direction = colIndex % 2 === 0 ? "up" : "down";

                return (
                  <motion.div
                    key={imgIndex}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      y: direction === "up" ? 50 : -50,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: imgIndex * 0.1,
                    }}
                    viewport={{ once: true }}
                    className={cn("w-full overflow-hidden rounded-2xl")}
                    style={{ height }}
                  >
                    <Img
                      src={image.src}
                      alt={image.alt}
                      className={cn(
                        "h-full w-full rounded-2xl object-cover",
                        image.className,
                      )}
                      loading="lazy"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }, [
    imagesSlot,
    images,
    imagesClassName,
    optixFlowConfig,
    columns,
    heightPatterns,
    background,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative flex items-center justify-center", className)}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col gap-6 items-center">
        <div
          className={cn(
            "relative mx-auto max-w-xl py-10 text-center flex flex-col gap-6 items-center",
            contentClassName,
          )}
        >
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "mb-3 text-4xl lg:text-7xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <h1
                className={cn(
                  "mb-3 text-4xl lg:text-7xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mb-5 text-sm md:text-base text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          {renderAction}
          {renderTagline}
        </div>
        {renderImages}
      </div>
    </Section>
  );
}
