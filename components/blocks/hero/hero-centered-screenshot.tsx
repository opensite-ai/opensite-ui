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
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface HeroCenteredScreenshotProps {
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
   * Screenshot/hero image source URL
   */
  imageSrc?: string;
  /**
   * Screenshot/hero image alt text
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
   * Additional CSS classes for the content wrapper
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

export function HeroCenteredScreenshot({
  sectionId = "hero-centered-screenshot",
  heading,
  description,
  actions,
  actionsSlot,
  imageSrc,
  imageAlt = "placeholder",
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  optixFlowConfig,
}: HeroCenteredScreenshotProps): React.JSX.Element {
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

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className={cn("")}>
        <div className="flex flex-col">
          <div
            className={cn("z-10 items-center text-center", contentClassName)}
          >
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "mb-8 text-4xl font-bold text-balance lg:text-7xl",
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
                    "mx-auto max-w-3xl lg:text-xl text-balance opacity-80",
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
                  "flex items-center gap-4 mt-8 md:mt-12 justify-center",
                  actionsClassName,
                )}
              >
                {renderActions}
              </div>
            )}
          </div>
        </div>
        {imageSrc && (
          <Img
            src={imageSrc}
            alt={imageAlt}
            className={cn(
              "mx-auto mt-12 md:mt-24 max-h-[700px] w-full max-w-7xl rounded-2xl object-cover shadow-xl",
              imageClassName,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        )}
      </div>
    </Section>
  );
}
