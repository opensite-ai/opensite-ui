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

export interface HeroSplitSpiralShapesProps {
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
   * Array of images to display (expects 3 images for scattered layout)
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
}

export function HeroSplitSpiralShapes({
  badgeText,
  heading,
  description,
  actions,
  actionsSlot,
  images,
  imagesSlot,
  optixFlowConfig,
  background,
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  headingClassName,
  descriptionClassName,
  imagesClassName,
}: HeroSplitSpiralShapesProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
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
          "grid grid-cols-2 gap-4 md:relative md:block md:aspect-3/4",
          imagesClassName,
        )}
      >
        {images[0] && (
          <div className="col-span-2 overflow-hidden rounded-lg shadow-xl md:absolute md:top-[5%] md:left-[2%] md:w-[55%]">
            <div className="aspect-5/6">
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
          </div>
        )}
        {images[1] && (
          <div className="overflow-hidden rounded-lg shadow-xl md:absolute md:top-[12%] md:right-[5%] md:w-[35%]">
            <div className="aspect-5/6">
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
          </div>
        )}
        {images[2] && (
          <div className="overflow-hidden rounded-lg shadow-xl md:absolute md:right-[10%] md:bottom-[15%] md:w-[55%]">
            <div className="aspect-5/6">
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
          </div>
        )}
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
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div
            className={cn(
              "flex flex-col items-center text-center lg:mx-auto lg:items-start lg:px-0 lg:text-left",
              contentClassName,
            )}
          >
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
                    "my-6 text-4xl font-bold text-balance lg:text-6xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <h1
                  className={cn(
                    "my-6 text-4xl font-bold text-balance lg:text-6xl",
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
                    "mb-8 max-w-xl lg:text-xl text-balance",
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
      </div>
    </Section>
  );
}
