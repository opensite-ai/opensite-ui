"use client";

import * as React from "react";
import { useMemo } from "react";
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

export interface HeroBusinessOperationsMosaicProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
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
   * Additional CSS classes for the mosaic container
   */
  mosaicClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroBusinessOperationsMosaic({
  sectionId = "hero-business-operations-mosaic",
  heading,
  description,
  descriptionClassName,
  images,
  imagesSlot,
  actions,
  actionsSlot,
  actionsClassName,
  background,
  spacing = "hero",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  headingClassName,
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
            <div className="h-full w-full overflow-hidden rounded-[2vw] lg:rounded-[1.2vw] xl:rounded-2xl">
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn(
                  "h-full w-full object-cover object-center",
                  images[0].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
        {images[1] && (
          <div className="col-[3/5] row-[2/3]">
            <div className="h-full w-full overflow-hidden rounded-[2vw] lg:rounded-[1.2vw] xl:rounded-2xl">
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn(
                  "h-full w-full object-cover object-center",
                  images[1].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
        {images[2] && (
          <div className="col-[2/4] row-[3/4]">
            <div className="h-full w-full overflow-hidden rounded-[2vw] lg:rounded-[1.2vw] xl:rounded-2xl">
              <Img
                src={images[2].src}
                alt={images[2].alt}
                className={cn(
                  "h-full w-full object-cover object-center",
                  images[2].className,
                )}
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
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="grid grid-cols-1 items-center justify-between gap-14 lg:grid-cols-2">
        <div className={cn("w-full max-w-166.5", mosaicClassName)}>
          <AspectRatio ratio={0.815177479 / 1}>{renderMosaic}</AspectRatio>
        </div>
        <div
          className={cn(
            "flex w-full max-w-full flex-col gap-6",
            contentClassName,
          )}
        >
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-semibold text-pretty leading-tight",
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
                  "text-lg md:text-xl text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}
          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </div>
      </div>
    </Section>
  );
}
