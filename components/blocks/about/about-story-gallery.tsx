"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface GalleryImageItem {
  src: string;
  alt: string;
  className?: string;
}

export interface AboutStoryGalleryProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Main title
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Main description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Array of gallery images
   */
  images?: GalleryImageItem[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Section background variant
   */
  background?: SectionBackground;
  /**
   * Section spacing variant
   */
  spacing?: SectionSpacing;
  /**
   * Pattern background key or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
}

export function AboutStoryGallery({
  className,
  containerClassName,
  title,
  titleClassName,
  description,
  descriptionClassName,
  images,
  imagesSlot,
  imagesClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: AboutStoryGalleryProps): React.JSX.Element {
  const imagesContent = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className={cn("mt-16 grid gap-4 md:grid-cols-3", imagesClassName)}>
        {images.map((image, idx) => (
          <Img
            key={idx}
            src={image.src}
            alt={image.alt}
            className={cn(
              "h-64 w-full rounded-xl object-cover",
              image.className,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </div>
    );
  }, [imagesSlot, images, imagesClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className="mx-auto max-w-3xl text-center">
        {title &&
          (typeof title === "string" ? (
            <h1
              className={cn(
                "text-4xl font-bold tracking-tight md:text-5xl text-balance",
                titleClassName,
              )}
            >
              {title}
            </h1>
          ) : (
            <div className={titleClassName}>{title}</div>
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "mt-6 text-lg text-muted-foreground whitespace-pre-line text-balance",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={cn("mt-6", descriptionClassName)}>
              {description}
            </div>
          ))}
      </div>

      {imagesContent}
    </Section>
  );
}
