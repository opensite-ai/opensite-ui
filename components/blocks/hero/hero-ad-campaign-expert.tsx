"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface HeroAdCampaignExpertProps {
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
  action?: ActionConfig;
  /**
   * Custom slot for rendering action (overrides action)
   */
  actionSlot?: React.ReactNode;
  /**
   * Hero image source URL
   */
  imageSrc?: string;
  /**
   * Hero image alt text
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
   * Additional CSS classes for the content column
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
   * Additional CSS classes for the image container
   */
  imageContainerClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroAdCampaignExpert({
  heading,
  description,
  action,
  actionSlot,
  imageSrc,
  imageAlt,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "pt-32 pb-8 md:pt-32 md:pb-32",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageContainerClassName,
  imageClassName,
  optixFlowConfig,
}: HeroAdCampaignExpertProps): React.JSX.Element {
  const renderAction = useMemo(() => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = action;
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
        <div className="flex flex-col items-center lg:flex-row lg:items-start">
          <div
            className={cn(
              "relative flex flex-col items-start gap-8 pb-20 lg:w-1/2",
              contentClassName,
            )}
          >
            {heading &&
              (typeof heading === "string" ? (
                <h2
                  className={cn(
                    "text-3xl leading-tight font-bold tracking-tighter lg:text-5xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : heading ? (
                <div className={headingClassName}>{heading}</div>
              ) : null)}
            {description &&
              (typeof description === "string" ? (
                <p className={cn("text-lg text-balance", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
            {renderAction}
          </div>
          <div
            className={cn(
              "relative flex w-full justify-center lg:w-1/2",
              imageContainerClassName,
            )}
          >
            {imageSrc && (
              <div className="relative z-10 -mb-16 h-auto w-[80%] max-w-[355px] lg:w-[520px]">
                <AspectRatio
                  ratio={355 / 520}
                  className="border-muted border rounded-xl shadow-xl overflow-hidden"
                >
                  <Img
                    src={imageSrc}
                    alt={imageAlt}
                    className={cn("size-full object-cover", imageClassName)}
                    optixFlowConfig={optixFlowConfig}
                  />
                </AspectRatio>
              </div>
            )}
            <div className="absolute bottom-0 w-full overflow-hidden">
              <AspectRatio ratio={2} className="relative">
                <AspectRatio
                  ratio={1}
                  className={cn("absolute w-full rounded-full bg-muted")}
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
