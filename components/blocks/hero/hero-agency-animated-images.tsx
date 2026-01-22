"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroAgencyAnimatedImagesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/tagline content
   */
  subheading?: React.ReactNode;
  /**
   * CTA action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for rendering action (overrides action)
   */
  actionSlot?: React.ReactNode;
  /**
   * Array of images for the grid
   */
  images?: ImageItem[];
  /**
   * Custom slot for rendering images (overrides images array)
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
   * Additional CSS classes for the images container
   */
  imagesContainerClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroAgencyAnimatedImages({
  heading,
  subheading,
  action,
  actionSlot,
  images,
  imagesSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  subheadingClassName,
  imagesContainerClassName,
  optixFlowConfig,
}: HeroAgencyAnimatedImagesProps): React.JSX.Element {
  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
    return (
      <Pressable
        asButton
        className={actionClassName}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    const leftImages = images.slice(0, 2);
    const rightImages = images.slice(2, 4);

    return (
      <div className="grid w-full grid-cols-2 items-center justify-center gap-4">
        <div className="flex flex-col items-end justify-center gap-4">
          {leftImages.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <Img
                src={image.src}
                alt={image.alt}
                className={cn("block h-full w-full object-cover object-center", image.className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-center gap-4">
          {rightImages.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <Img
                src={image.src}
                alt={image.alt}
                className={cn("block h-full w-full object-cover object-center", image.className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("container max-w-444", containerClassName)}>
        <div className="grid w-full grid-cols-1 items-center justify-between gap-14 lg:grid-cols-2">
          <div className={cn("flex w-full max-w-125 flex-col gap-8 md:gap-14 lg:max-w-full", contentClassName)}>
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("font-serif text-5xl text-foreground md:text-6xl lg:text-7xl xl:text-[5rem]", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
            {subheading && (
              typeof subheading === "string" ? (
                <p className={cn("font-montserrat text-2xl leading-snug text-foreground lg:text-3xl xl:text-4xl", subheadingClassName)}>
                  {subheading}
                </p>
              ) : (
                <div className={subheadingClassName}>{subheading}</div>
              )
            )}
            {renderAction()}
          </div>
          <div className={cn("mx-auto w-full max-w-211.5 lg:mx-0", imagesContainerClassName)}>
            <AspectRatio ratio={1.049627792 / 1}>
              {renderImages()}
            </AspectRatio>
          </div>
        </div>
      </div>
    </Section>
  );
}
