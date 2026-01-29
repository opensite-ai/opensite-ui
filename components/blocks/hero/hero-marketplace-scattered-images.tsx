"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type {ActionConfig, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
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
  showGridPattern?: boolean;  /**
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
  taglineIcon = "lucide/globe",
  taglineSlot,
  images,
  imagesSlot,
  showGridPattern = true,
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
}: HeroMarketplaceScatteredImagesProps): React.JSX.Element {
  const renderAction = useMemo(() => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
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

    return (
      <div className="mt-7 flex items-start justify-center gap-2 font-medium md:text-xl">
        <DynamicIcon name={taglineIcon} size={20} className="mt-0.5" />
        {tagline}
      </div>
    );
  }, [taglineSlot, taglineIcon, tagline]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className={cn("mx-auto mt-14 max-w-7xl overflow-hidden py-8", imagesClassName)}>
        <div className="relative w-full">
          {images.map((image, index) => (
            <Img
              key={index}
              src={image.src}
              alt={image.alt}
              className={image.className}
              optixFlowConfig={optixFlowConfig}
            />
          ))}
        </div>
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
    >
      <div className={containerClassName}>
        <div className={cn("relative container mx-auto max-w-xl py-10 text-center", contentClassName)}>
          {showGridPattern && (
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[64px_64px]"></div>
          )}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("mb-3 text-4xl lg:text-7xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("mb-3 text-4xl lg:text-7xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mb-5 text-sm md:text-base", getTextColor(background, "muted"), descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderAction}
          {renderTagline}
        </div>
        {renderImages}
      </div>
    </Section>
  );
}
