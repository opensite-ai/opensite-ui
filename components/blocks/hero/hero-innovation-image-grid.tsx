"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

export interface HeroInnovationImageGridProps {
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
  actions?: ActionConfig[];
  /**
   * Custom slot for action (overrides action prop)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Array of images for the grid (expects 3 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
   */
  imagesSlot?: React.ReactNode; /**
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
  /**
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroInnovationImageGrid({
  sectionId = "hero-innovation-image-grid",
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  images,
  imagesSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imagesClassName,
  optixFlowConfig,
  logo,
  logoSlot,
  logoClassName,
}: HeroInnovationImageGridProps): React.JSX.Element {
  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div>
        <AspectRatio ratio={1.390658174 / 1}>
          <div
            className={cn(
              "grid h-full w-full grid-cols-2 grid-rows-2 gap-5 lg:max-w-155.75 lg:gap-8",
              imagesClassName,
            )}
          >
            {images[0] && (
              <div className="col-[1/2] row-[1/3]">
                <Img
                  src={images[0].src}
                  alt={images[0].alt}
                  className={cn(
                    "size-full rounded-xl shadow-xl object-cover",
                    images[0].className,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {images[1] && (
              <div className="col-[2/3] row-[1/2]">
                <Img
                  src={images[1].src}
                  alt={images[1].alt}
                  className={cn(
                    "size-full rounded-xl shadow-xl object-cover",
                    images[1].className,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {images[2] && (
              <div className="col-[2/3] row-[2/3]">
                <Img
                  src={images[2].src}
                  alt={images[2].alt}
                  className={cn(
                    "size-full rounded-xl shadow-xl object-cover",
                    images[2].className,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
          </div>
        </AspectRatio>
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
      className={className}
      containerClassName={containerClassName}
    >
      <div className="pt-10 md:pt-0">
        <div className="grid grid-cols-1 gap-12 md:gap-22.5 lg:grid-cols-2">
          <div>
            <div
              className={cn("flex flex-col gap-2 md:gap-12", contentClassName)}
            >
              <div>
                {(logo || logoSlot) && (

                  <div className={cn("mb-4", logoClassName)}>

                    <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />

                  </div>

                )}

                
                {heading &&
                  (typeof heading === "string" ? (
                    <h1
                      className={cn(
                        "mb-3 text-4xl font-bold md:text-5xl lg:text-6xl text-balance",
                        headingClassName,
                      )}
                    >
                      {heading}
                    </h1>
                  ) : (
                    <h1
                      className={cn(
                        "mb-3 text-4xl font-bold md:text-5xl lg:text-6xl text-balance",
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
                        "text-lg text-balance",
                        descriptionClassName,
                      )}
                    >
                      {description}
                    </p>
                  ) : (
                    <div className={descriptionClassName}>{description}</div>
                  ))}
              </div>
              <BlockActions
                actions={actions}
                actionsSlot={actionsSlot}
                actionsClassName={actionsClassName}
              />
            </div>
          </div>
          {renderImages}
        </div>
      </div>
    </Section>
  );
}
