"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

export interface HeroAdaptableProductGridProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * CTA action configuration
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering action (overrides action)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Logo/image source URL
   */
  imageSrc?: string;
  /**
   * Logo/image alt text
   */
  imageAlt?: string;
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
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageContainerClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroAdaptableProductGrid({
  heading,
  description,
  actions,
  actionsSlot,
  imageSrc,
  imageAlt = "placeholder",
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  contentClassName,
  imageContainerClassName,
  imageClassName,
  actionsClassName,
  optixFlowConfig,
}: HeroAdaptableProductGridProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "text-5xl lg:text-7xl font-semibold text-balance",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}
        <div className="mt-14 grid gap-6 md:gap-10 grid-cols-1 lg:grid-cols-2">
          <div
            className={cn("flex flex-col items-start gap-6", contentClassName)}
          >
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "text-lg lg:text-xl text-balance",
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
          <div
            className={cn(
              "relative flex items-center justify-center rounded-2xl shadow-2xl overflow-hidden",
              imageContainerClassName,
            )}
          >
            {imageSrc && (
              <Img
                src={imageSrc}
                alt={imageAlt}
                className={cn("max-h-[400px] object-cover", imageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
