"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
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

export interface HeroCustomerSupportLayeredProps {
  /**
   * Tagline text above heading
   */
  tagline?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of layered images (expects 3 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
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
   * Additional CSS classes for the tagline
   */
  taglineClassName?: string;
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
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroCustomerSupportLayered({
  sectionId = "hero-customer-support-layered",
  tagline,
  heading,
  description,
  images,
  imagesSlot,
  background,
  pattern,
  patternOpacity,
  className,
  actions,
  actionsSlot,
  actionsClassName,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  contentClassName,
  taglineClassName,
  headingClassName,
  descriptionClassName,
  imagesClassName,
  optixFlowConfig,
  patternClassName,
}: HeroCustomerSupportLayeredProps): React.JSX.Element {
  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div
        className={cn(
          "relative min-h-[350px] md:min-h-[400px] lg:min-h-[450px]",
          imagesClassName,
        )}
      >
        {images[0] && (
          <div className="absolute left-0 top-0 z-10 aspect-4/3 w-[65%] overflow-hidden rounded-lg shadow-2xl md:w-[60%]">
            <Img
              src={images[0].src}
              alt={images[0].alt}
              className={cn("h-full w-full object-cover", images[0].className)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}
        {images[1] && (
          <div className="absolute bottom-0 left-[5%] z-20 aspect-video w-[60%] overflow-hidden rounded-lg shadow-2xl md:w-[55%]">
            <Img
              src={images[1].src}
              alt={images[1].alt}
              className={cn("h-full w-full object-cover", images[1].className)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}
        {images[2] && (
          <div className="absolute left-[50%] top-[40%] md:top-[10%] z-30 aspect-3/4 w-[45%] overflow-hidden rounded-lg shadow-2xl md:w-[40%]">
            <Img
              src={images[2].src}
              alt={images[2].alt}
              className={cn("h-full w-full object-cover", images[2].className)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}
      </div>
    );
  }, [imagesSlot, images, imagesClassName, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="pt-8 md:pt-0">
        <div className="grid grid-cols-1 items-center gap-12 md:gap-20 md:grid-cols-2">
          <div
            className={cn(
              "flex w-full max-w-125 flex-col gap-4 md:gap-6",
              contentClassName,
            )}
          >
            {tagline &&
              (typeof tagline === "string" ? (
                <div
                  className={cn(
                    "font-light tracking-widest text-sm md:text-md uppercase",
                    taglineClassName,
                  )}
                >
                  {tagline}
                </div>
              ) : (
                tagline
              ))}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-semibold text-balance md:text-7xl",
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
                    "max-w-full md:max-w-[70%] text-lg md:text-xl font-normal text-balance",
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
          <div>{renderImages}</div>
        </div>
      </div>
    </Section>
  );
}
