"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface HeroConversationIntelligenceProps {
  /**
   * Main heading content (first part)
   */
  headingPrimary?: React.ReactNode;
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
   * Main image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image area (overrides image)
   */
  imageSlot?: React.ReactNode;
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroConversationIntelligence({
  headingPrimary,
  description,
  actions,
  actionsSlot,
  image,
  imageSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  optixFlowConfig,
}: HeroConversationIntelligenceProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
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
    });
  }, [actionsSlot, actions]);

  const renderImage = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div
        className={cn(
          "relative flex size-full flex-col justify-between",
          imageClassName,
        )}
      >
        <Img
          src={image.src}
          alt={image.alt}
          className={cn(
            "object-centers size-full object-cover shadow-xl rounded-xl",
            image.className,
          )}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  }, [imageSlot, image, imageClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="flex flex-col gap-8 md:gap-24">
          <div>
            <div
              className={cn(
                "relative z-10 mx-auto flex max-w-220 flex-col gap-7",
                contentClassName,
              )}
            >
              <h1
                className={cn(
                  "text-center text-5xl leading-[1.294] font-semibold sm:text-[3.75rem] md:text-[4.25rem] text-balance",
                  headingClassName,
                )}
              >
                {headingPrimary}
              </h1>
              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "text-center text-xl leading-normal text-balance",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                ))}
              {(actionsSlot || (actions && actions.length > 0)) && (
                <div
                  className={cn(
                    "flex flex-col md:flex-row items-center justify-center gap-4",
                    actionsClassName,
                  )}
                >
                  {renderActions}
                </div>
              )}
            </div>
          </div>
          {renderImage}
        </div>
      </div>
    </Section>
  );
}
