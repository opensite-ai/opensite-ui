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

export interface FeatureSplitImageProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text for accessibility
   */
  imageAlt?: string;
  /**
   * Image element or ReactNode (overrides imageSrc)
   */
  imageSlot?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the grid wrapper
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
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
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
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
}

/**
 * Feature Split Image - Two-column feature section with text content on the left
 * and a prominent image on the right.
 *
 * Layout: Split two-column grid with text/CTAs on left, image on right.
 * Key features: Responsive stacking, dual CTA buttons, large heading with description.
 * Best for: Product introductions, feature highlights, hero-style feature sections.
 *
 * @example
 * ```tsx
 * <FeatureSplitImage
 *   title="Build faster with our components"
 *   description="Hundreds of finely crafted components built with React and Tailwind."
 *   imageSrc="/feature-image.jpg"
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" },
 *     { label: "Learn More", href: "/docs", variant: "outline" },
 *   ]}
 * />
 * ```
 */
export function FeatureSplitImage({
  title,
  description,
  imageSrc,
  imageAlt,
  imageSlot,
  actions,
  actionsSlot,
  className,
  gridClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-4 sm:px-4 md:px-6 lg:px-8",
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureSplitImageProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
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
          className={actionClassName}
          asButton
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

  const imageContent = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!imageSrc) return null;

    return (
      <Img
        src={imageSrc}
        alt={imageAlt || ""}
        className={cn(
          "max-h-96 w-full rounded-md object-cover",
          imageClassName,
        )}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [imageSlot, imageSrc, imageAlt, imageClassName, optixFlowConfig]);

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
      <div
        className={cn("grid items-center gap-8 lg:grid-cols-2", gridClassName)}
      >
        <div
          className={cn(
            "flex flex-col items-center text-center lg:items-start lg:text-left",
            contentClassName,
          )}
        >
          {title &&
            (typeof title === "string" ? (
              <h2
                className={cn(
                  "my-6 mt-0 text-4xl font-semibold text-balance lg:text-5xl",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            ) : (
              <div
                className={cn(
                  "my-6 mt-0 text-4xl font-semibold text-balance lg:text-5xl",
                  titleClassName,
                )}
              >
                {title}
              </div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mb-8 max-w-xl  lg:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div
                className={cn(
                  "mb-8 max-w-xl  lg:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </div>
            ))}
          {(actionsSlot || (actions && actions.length > 0)) && (
            <div
              className={cn(
                "flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start",
                actionsClassName,
              )}
            >
              {actionsContent}
            </div>
          )}
        </div>
        {imageContent}
      </div>
    </Section>
  );
}
