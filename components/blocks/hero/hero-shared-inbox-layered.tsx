"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import type {
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { Badge } from "@/src";

export interface LayeredImageConfig {
  /**
   * Background layer image
   */
  backgroundImage?: ImageItem;
  /**
   * Foreground layer image
   */
  foregroundImage?: ImageItem;
}

export interface HeroSharedInboxLayeredProps {
  /**
   * Subtitle/label text above heading
   */
  subtitle?: React.ReactNode;
  /**
   * Main heading content (can include line breaks)
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Layered images configuration
   */
  layeredImages?: LayeredImageConfig;
  /**
   * Custom slot for layered images (overrides layeredImages prop)
   */
  layeredImagesSlot?: React.ReactNode; /**
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
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

export function HeroSharedInboxLayered({
  subtitle,
  heading,
  description,
  layeredImages,
  layeredImagesSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imagesClassName,
  optixFlowConfig,
  patternClassName,
}: HeroSharedInboxLayeredProps): React.JSX.Element {
  const renderLayeredImages = useMemo(() => {
    if (layeredImagesSlot) return layeredImagesSlot;
    if (!layeredImages) return null;

    return (
      <div
        className={cn(
          "relative min-h-[350px] md:min-h-[400px] lg:min-h-[450px]",
          imagesClassName,
        )}
      >
        {layeredImages.backgroundImage && (
          <div className="absolute left-0 top-0 z-10 aspect-4/3 w-[70%] overflow-hidden rounded-lg shadow-2xl md:w-[65%]">
            <Img
              src={layeredImages.backgroundImage.src}
              alt={layeredImages.backgroundImage.alt}
              className={cn(
                "h-full w-full object-cover",
                layeredImages.backgroundImage.className,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}
        {layeredImages.foregroundImage && (
          <div className="absolute bottom-0 right-0 z-20 aspect-3/4 w-[55%] overflow-hidden rounded-lg shadow-2xl md:w-[50%]">
            <Img
              src={layeredImages.foregroundImage.src}
              alt={layeredImages.foregroundImage.alt}
              className={cn(
                "h-full w-full object-cover",
                layeredImages.foregroundImage.className,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}
      </div>
    );
  }, [layeredImagesSlot, layeredImages, imagesClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="grid grid-cols-1 items-center gap-4 md:gap-20 md:grid-cols-2">
          <div
            className={cn(
              "flex w-full max-w-125 flex-col gap-9",
              contentClassName,
            )}
          >
            {subtitle &&
              (typeof subtitle === "string" ? (
                <Badge>{subtitle}</Badge>
              ) : (
                subtitle
              ))}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-5xl md:text-6xl lg:text-7xl font-semibold text-balance leading-snug",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <h1
                  className={cn(
                    "text-2xl md:text-3xl lg:text-4xl font-semibold text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn("leading-normal text-lg", descriptionClassName)}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
          </div>
          <div>{renderLayeredImages}</div>
        </div>
      </div>
    </Section>
  );
}
