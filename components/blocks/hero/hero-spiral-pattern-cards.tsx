"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
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
import { Badge } from "@/src";

export interface HeroSpiralPatternCardsProps {
  /**
   * Badge/label text above heading
   */
  badgeText?: React.ReactNode;
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
   * Array of images to display (expects 3 images for stacked card effect)
   */
  images?: ImageItem[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
}

export function HeroSpiralPatternCards({
  badgeText,
  heading,
  description,
  actions,
  actionsSlot,
  images,
  imagesSlot,
  optixFlowConfig,
  background,
  spacing = "pt-28 pb-8 md:pt-32 md:pb-32",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headingClassName,
  descriptionClassName,
  imagesClassName,
}: HeroSpiralPatternCardsProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
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
                  {label}
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
    if (!images || images.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-16 flex flex-col items-center justify-center lg:mt-20",
          imagesClassName,
        )}
      >
        <div className="relative mx-auto aspect-square w-[95%] max-w-125 sm:w-full">
          {images[0] && (
            <div className="absolute inset-0 z-5 m-auto flex aspect-29/36 w-4/5 max-w-[16rem] translate-x-[-75%] translate-y-[10%] scale-[0.85] rotate-[-15deg] justify-center overflow-hidden rounded-lg border border-border opacity-60 md:w-85 md:max-w-85">
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn(
                  "h-full w-full object-cover",
                  images[0].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
          {images[1] && (
            <div className="absolute inset-0 z-10 m-auto flex aspect-29/36 w-4/5 max-w-[16rem] translate-x-[-40%] translate-y-[5%] scale-[0.9] rotate-[-7deg] justify-center overflow-hidden rounded-lg border border-border opacity-80 md:w-85 md:max-w-85">
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn(
                  "h-full w-full object-cover",
                  images[1].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
          {images[2] && (
            <div className="absolute inset-0 z-20 m-auto flex aspect-29/36 w-4/5 max-w-[16rem] justify-center overflow-hidden rounded-lg border border-border md:w-85 md:max-w-85">
              <Img
                src={images[2].src}
                alt={images[2].alt}
                className={cn(
                  "h-full w-full object-cover",
                  images[2].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
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
      className={cn("relative flex items-center justify-center", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="flex flex-col items-center text-center">
          {badgeText &&
            (typeof badgeText === "string" ? (
              <Badge>{badgeText}</Badge>
            ) : (
              badgeText
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "my-3 text-2xl font-bold sm:text-4xl md:my-6 lg:text-5xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <h1
                className={cn(
                  "my-3 text-2xl font-bold sm:text-4xl md:my-6 lg:text-5xl text-balance",
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
                  "mb-6 max-w-xl md:mb-12 lg:text-xl text-balance",
                  descriptionClassName,
                )}
              >
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
