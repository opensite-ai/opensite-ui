"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
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
import { BlockActions } from "@/components/ui/block-actions";

export interface HeroGradientClientFocusedProps {
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
   * Hero image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
   */
  imageSlot?: React.ReactNode; /**
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
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroGradientClientFocused({
  sectionId = "hero-gradient-client-focused",
  heading,
  description,
  actions,
  actionsSlot,
  image,
  imageSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  optixFlowConfig,
}: HeroGradientClientFocusedProps): React.JSX.Element {
  const renderImage = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <Img
        className={cn(
          "rounded-2xl aspect-video shadow-xl w-full h-auto object-cover mt-8 md:mt-12",
          imageClassName,
          image.className,
        )}
        src={image.src}
        alt={image.alt}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [imageSlot, image, imageClassName, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      className={cn("text-center", className)}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className="relative flex flex-col items-center gap-4">
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "max-w-full md:max-w-md text-5xl md:text-6xl lg:text-7xl font-semibold text-balance",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            <h1
              className={cn(
                "max-w-full md:max-w-md text-5xl md:text-6xl lg:text-7xl font-semibold text-balance",
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
                "max-w-full md:max-w-md text-balance",
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
        {renderImage}
      </div>
    </Section>
  );
}
