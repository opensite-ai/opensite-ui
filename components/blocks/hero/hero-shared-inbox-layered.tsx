"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor, getBorderColor } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
import type {ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

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
  layeredImagesSlot?: React.ReactNode;  /**
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
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroSharedInboxLayeredProps): React.JSX.Element {
  const renderLayeredImages = useMemo(() => {
    if (layeredImagesSlot) return layeredImagesSlot;
    if (!layeredImages) return null;

    return (
      <div className={cn("relative ml-8 aspect-square w-full max-w-225 overflow-hidden lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2", imagesClassName)}>
        {layeredImages.backgroundImage && (
          <div className="absolute right-0 bottom-0 w-[85%] overflow-hidden rounded-lg">
            <AspectRatio ratio={0.918918919 / 1}>
              <Img
                src={layeredImages.backgroundImage.src}
                alt={layeredImages.backgroundImage.alt}
                className={cn("block size-full object-cover object-top-left", layeredImages.backgroundImage.className)}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        )}
        {layeredImages.foregroundImage && (
          <div className="absolute right-0 bottom-0 w-[93%] overflow-hidden rounded-tl-lg shadow-md">
            <AspectRatio ratio={1.381308411 / 1}>
              <Img
                src={layeredImages.foregroundImage.src}
                alt={layeredImages.foregroundImage.alt}
                className={cn("block size-full object-cover object-center", layeredImages.foregroundImage.className)}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        )}
      </div>
    );
  }, [layeredImagesSlot, layeredImages, imagesClassName, optixFlowConfig]);

  return (
    <Section
      className={cn("relative border-b bg-background", getBorderColor(background, "muted"), className)}
    >
      <div className={cn("container pt-10", containerClassName)}>
        <div className="grid grid-cols-1 items-center gap-2 md:gap-4 lg:grid-cols-2">
          <div className={cn("flex w-full max-w-125 flex-col gap-9 lg:max-w-150 lg:py-[20%] xl:py-[26%]", contentClassName)}>
            {subtitle && (
              typeof subtitle === "string" ? (
                <p className={cn("font-mono text-[clamp(0.875rem,0.875vw,1rem)]", getTextColor(background, "muted"))}>
                  {subtitle}
                </p>
              ) : (
                subtitle
              )
            )}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-[clamp(3.5rem,calc(6.5vw+2.3rem),9.5rem)] leading-[0.85] tracking-[-0.03em] ", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("text-[clamp(3.5rem,calc(6.5vw+2.3rem),9.5rem)] leading-[0.85] tracking-[-0.03em] ", headingClassName)}>
                  {heading}
                </h1>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-[clamp(1.125rem,1.125vw,1.4rem)] leading-normal", getTextColor(background, "muted"), descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
          </div>
          <div>
            {renderLayeredImages}
          </div>
        </div>
      </div>
    </Section>
  );
}
