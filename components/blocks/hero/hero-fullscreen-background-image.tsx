"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";
import { Img } from "@page-speed/img";

export interface HeroFullscreenBackgroundImageProps {
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
   * Background image URL
   */
  backgroundImage?: string;
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
   * Additional CSS classes for the content container
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
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroFullscreenBackgroundImage({
  heading,
  description,
  actions,
  actionsSlot,
  backgroundImage,
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-0 sm:px-0 lg:px-0 max-w-full relative z-10 h-screen w-screen flex justify-center items-center",
  contentClassName = "relative flex flex-col gap-12 px-6 pt-28 pb-6 md:pt-0 md:pb-0",
  headingClassName,
  descriptionClassName,
  actionsClassName,
  optixFlowConfig,
}: HeroFullscreenBackgroundImageProps): React.JSX.Element {
  const renderBackground = useMemo(() => {
    if (!backgroundImage) return null;

    return (
      <div className="absolute inset-0">
        <Img
          src={backgroundImage}
          alt="Full screen background image"
          className="h-full w-full object-cover"
          loading="eager"
          optixFlowConfig={optixFlowConfig}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/65 to-black/20" />
      </div>
    );
  }, [backgroundImage, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(
        "relative flex h-full min-h-screen w-screen items-center justify-center overflow-hidden bg-black pb-0 pt-0 md:pt-0 px-0",
        className,
      )}
      containerClassName={containerClassName}
    >
      {renderBackground}
      <div
        className={cn(
          "relative z-30 m-auto flex max-w-full md:max-w-md flex-col items-center justify-center gap-6 px-5",
          contentClassName,
        )}
      >
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "text-5xl md:text-6xl lg:text-7xl text-balance text-white text-shadow-2xl font-semibold",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "text-center text-base text-balance text-white text-shadow-2xl",
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
    </Section>
  );
}
