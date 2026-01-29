"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroBusinessOperationsMosaicProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/tagline content
   */
  subheading?: React.ReactNode;
  /**
   * Array of mosaic images (expects 3 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for mosaic images (overrides images array)
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
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the mosaic container
   */
  mosaicClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroBusinessOperationsMosaic({
  heading,
  subheading,
  images,
  imagesSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  subheadingClassName,
  mosaicClassName,
  optixFlowConfig,
}: HeroBusinessOperationsMosaicProps): React.JSX.Element {
  const renderMosaic = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className="mx-auto grid h-full w-full grid-cols-[14.7%_47.29%_14.7%_14.7%] grid-rows-[34.7%_26.28%_34.7%] gap-x-[2.85%] gap-y-[2.32%]">
        {images[0] && (
          <div className="col-[1/3] row-[1/3]">
            <div className="h-full w-full overflow-hidden rounded-[2vw] bg-primary/10 lg:rounded-[1.2vw] xl:rounded-2xl">
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn("h-full w-full object-cover object-center", images[0].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
        {images[1] && (
          <div className="col-[3/5] row-[2/3]">
            <div className="h-full w-full overflow-hidden rounded-[2vw] bg-success/10 lg:rounded-[1.2vw] xl:rounded-2xl">
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn("h-full w-full object-cover object-center", images[1].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
        {images[2] && (
          <div className="col-[2/4] row-[3/4]">
            <div className="h-full w-full overflow-hidden rounded-[2vw] bg-pink-100 lg:rounded-[1.2vw] xl:rounded-2xl">
              <Img
                src={images[2].src}
                alt={images[2].alt}
                className={cn("h-full w-full object-cover object-center", images[2].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
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
    >
      <div className={cn("container max-w-392.5", containerClassName)}>
        <div className="grid grid-cols-1 items-center justify-between gap-14 lg:grid-cols-2">
          <div className={cn("w-full max-w-166.5", mosaicClassName)}>
            <AspectRatio ratio={0.815177479 / 1}>
              {renderMosaic}
            </AspectRatio>
          </div>
          <div className={cn("flex w-full max-w-125 flex-col gap-14 lg:max-w-full", contentClassName)}>
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("font-serif text-6xl lg:text-7xl xl:text-[5rem]", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
            {subheading && (
              typeof subheading === "string" ? (
                <p className={cn("font-montserrat text-2xl leading-snug lg:text-3xl xl:text-4xl", subheadingClassName)}>
                  {subheading}
                </p>
              ) : (
                <div className={subheadingClassName}>{subheading}</div>
              )
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
