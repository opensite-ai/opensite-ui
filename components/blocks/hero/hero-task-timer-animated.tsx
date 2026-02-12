"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
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

export interface HeroTaskTimerAnimatedProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of showcase images (expects 2 images)
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
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the images area
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

export function HeroTaskTimerAnimated({
  heading,
  description,
  descriptionClassName,
  actions,
  actionsSlot,
  images,
  imagesSlot,
  background,
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  headingClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroTaskTimerAnimatedProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex flex-col items-start mt-6 md:mt-8 gap-4 sm:flex-row sm:items-center">
        {actions.map((action, index) => {
          const {
            label,
            icon,
            iconAfter,
            children,
            className: actionClassName,
            ...pressableProps
          } = action;

          return (
            <Pressable
              key={index}
              asButton
              className={actionClassName}
              {...pressableProps}
            >
              {children ?? (
                <>
                  {icon}
                  <span>{label}</span>
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  }, [actionsSlot, actions]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length < 2) return null;

    return (
      <div
        className={cn(
          "flex flex-col mt-6 gap-6 md:gap-10 lg:flex-row",
          imagesClassName,
        )}
      >
        <div className="flex flex-col gap-10 w-full lg:w-[60%]">
          <div className="overflow-hidden rounded-lg shadow-xl">
            <AspectRatio ratio={1.916786227 / 1}>
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn(
                  "block size-full object-cover object-center",
                  images[0].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        </div>
        <div className="flex flex-col gap-10 w-full lg:w-[40%]">
          <div className="overflow-hidden rounded-lg shadow-xl">
            <AspectRatio ratio={1.916786227 / 1}>
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn(
                  "block size-full object-cover object-center",
                  images[1].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
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
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative flex flex-col gap-6 md:gap-16">
        <div className={cn("flex flex-col gap-4 w-full", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "max-w-2xl text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <h1
                className={cn(
                  "max-w-2xl text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("text-lg text-balance", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          {renderActions}
        </div>
        {renderImages}
      </div>
    </Section>
  );
}
