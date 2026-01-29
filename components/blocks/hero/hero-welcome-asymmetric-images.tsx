"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";

import type { ActionConfig, ImageItem } from "../../../src/types/blocks";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroWelcomeAsymmetricImagesProps {
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Supporting description text
   */
  description?: React.ReactNode;
  /**
   * Action buttons configuration
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Images for the asymmetric grid (4 images)
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
   * Additional CSS classes for the section wrapper
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
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * HeroWelcomeAsymmetricImages - A hero layout with heading, description, CTAs,
 * and an asymmetric 2x2 image grid. Ideal for welcoming visitors with visual impact.
 */
export function HeroWelcomeAsymmetricImages({
  heading,
  description,
  actions,
  actionsSlot,
  images,
  imagesSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroWelcomeAsymmetricImagesProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 sm:flex-row">
        {actions.map((action, idx) => (
          <Pressable
            key={idx}
            href={action.href}
            onClick={action.onClick}
            asButton
            variant={action.variant || "default"}
            size={action.size || "lg"}
          >
            {action.label}
            {action.icon}
          </Pressable>
        ))}
      </div>
    );
  }, [actionsSlot, actions]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length < 4) return null;

    const imgs = images;

    return (
      <div className="relative flex w-full items-center justify-end gap-4">
        <div className="flex flex-col gap-4">
          <Img
            src={imgs[0].src}
            alt={imgs[0].alt || ""}
            className="h-48 w-64 rounded-lg object-cover"
            optixFlowConfig={optixFlowConfig}
          />
          <Img
            src={imgs[1].src}
            alt={imgs[1].alt || ""}
            className="h-64 w-64 rounded-lg object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Img
            src={imgs[2].src}
            alt={imgs[2].alt || ""}
            className="h-64 w-64 rounded-lg object-cover"
            optixFlowConfig={optixFlowConfig}
          />
          <Img
            src={imgs[3].src}
            alt={imgs[3].alt || ""}
            className="h-48 w-64 rounded-lg object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    );
  }, [imagesSlot, images, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row xl:gap-20">
          <div className="flex w-full flex-col items-start text-left">
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "mb-8 text-4xl font-normal text-pretty md:text-7xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <h1
                  className={cn(
                    "mb-8 text-4xl font-normal text-pretty md:text-7xl",
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
                    "mb-12 max-w-[70%] text-xl font-normal",
                    getTextColor(background, "muted"),
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div
                  className={cn(
                    "mb-12 max-w-[70%] text-xl font-normal",
                    getTextColor(background, "muted"),
                    descriptionClassName,
                  )}
                >
                  {description}
                </div>
              ))}
            {renderActions}
          </div>
          {renderImages}
        </div>
      </div>
    </Section>
  );
}
