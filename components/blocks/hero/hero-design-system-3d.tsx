"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
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

export interface HeroDesignSystem3dProps {
  /**
   * Trust badge text
   */
  trustBadge?: React.ReactNode;
  /**
   * Custom slot for trust badge (overrides trustBadge prop)
   */
  trustBadgeSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Logo mark image for preview button
   */
  logoMarkSrc?: string;
  /**
   * Array of 3D stacked images (expects 3 images)
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroDesignSystem3d({
  sectionId = "hero-design-system-3d",
  trustBadge,
  trustBadgeSlot,
  heading,
  description,
  actions,
  actionsSlot,
  logoMarkSrc,
  images,
  imagesSlot,
  background,
  spacing = "pt-32 pb-0 md:pt-32 md:pb-0",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroDesignSystem3dProps): React.JSX.Element {
  const renderTrustBadge = useMemo(() => {
    if (trustBadgeSlot) return trustBadgeSlot;

    return (
      <div className="flex items-center justify-center gap-2">
        <DynamicIcon
          name="lucide/star"
          size={20}
          className="fill-black stroke-black"
        />
        {typeof trustBadge === "string" ? (
          <p className="text-sm text-nowrap">{trustBadge}</p>
        ) : (
          trustBadge
        )}
      </div>
    );
  }, [trustBadgeSlot, trustBadge]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div
        className={cn(
          "relative mt-8 aspect-[1.2/1] overflow-hidden sm:-right-[10%] sm:mt-16 sm:aspect-[2.788990826/1]",
          imagesClassName,
        )}
      >
        {images[0] && (
          <div className="absolute top-[11%] left-[8%] z-10 aspect-[0.7/1] w-[80%] sm:left-[4%] sm:w-[45%]">
            <div className="size-full transform-[rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)]">
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn(
                  "block size-full object-cover object-center",
                  images[0].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
        {images[1] && (
          <div className="absolute top-0 left-[70%] z-20 aspect-[0.7/1] w-[73%] -translate-x-1/2 sm:left-1/2 sm:w-[38%]">
            <div className="size-full transform-[rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)] shadow-[-25px_0px_20px_0px_rgba(0,0,0,.04)]">
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn(
                  "block size-full object-cover object-center",
                  images[1].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
        {images[2] && (
          <div className="absolute top-[3%] -right-[45%] z-30 aspect-[0.7/1] w-[85%] sm:-right-[2%] sm:w-[50%]">
            <div className="size-full transform-[rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)] shadow-[-25px_0px_20px_0px_rgba(0,0,0,.04)]">
              <Img
                src={images[2].src}
                alt={images[2].alt}
                className={cn(
                  "block size-full object-cover object-center",
                  images[2].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
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
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative flex flex-col gap-4 md:gap-8 lg:gap-12">
        <div className="relative flex flex-col gap-4 md:gap-6 lg:gap-8">
          <div
            className={cn(
              "mx-auto flex max-w-100 flex-col items-center gap-6 sm:max-w-125 lg:max-w-160",
              contentClassName,
            )}
          >
            {renderTrustBadge}
            <div className="mb-2">
              {heading &&
                (typeof heading === "string" ? (
                  <h1
                    className={cn(
                      "text-center text-[2.8125rem] leading-none font-bold sm:text-[3.9375rem] lg:text-[5.3125rem]",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h1>
                ) : (
                  <h1
                    className={cn(
                      "text-center text-[2.8125rem] leading-none font-bold sm:text-[3.9375rem] lg:text-[5.3125rem]",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h1>
                ))}
            </div>
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "text-center text-base leading-snug text-balance sm:text-2xl",
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
        </div>
        {renderImages}
      </div>
    </Section>
  );
}
