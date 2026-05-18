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
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

export interface HeroCenteredImageGridProps {
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
   * Grid images (expects 2 images)
   */
  gridImages?: ImageItem[];
  /**
   * Custom slot for grid images (overrides gridImages)
   */
  gridImagesSlot?: React.ReactNode;
  /**
   * Image overlay action configuration
   */
  imageOverlayAction?: ActionConfig;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the image grid
   */
  imageGridClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroCenteredImageGrid({
  sectionId = "hero-centered-image-grid",
  heading,
  description,
  actions,
  actionsSlot,
  gridImages,
  gridImagesSlot,
  imageOverlayAction,
  background,
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageGridClassName,
  optixFlowConfig,
  logo,
  logoSlot,
  logoClassName,
}: HeroCenteredImageGridProps): React.JSX.Element {
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

  const renderImageOverlayAction = useMemo(() => {
    if (!imageOverlayAction) return null;
    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = imageOverlayAction;
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
  }, [imageOverlayAction]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div
            className={cn(
              "z-10 flex flex-col items-center gap-8 text-center",
              contentClassName,
            )}
          >
            <div className="max-w-3xl">
              {(logo || logoSlot) && (

                <div className={cn("mb-4 flex justify-center", logoClassName)}>

                  <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />

                </div>

              )}

              
              {heading &&
                (typeof heading === "string" ? (
                  <h1
                    className={cn(
                      "mb-4 text-4xl font-semibold text-balance lg:text-6xl",
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
                      "lg:text-xl text-balance",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                ))}
            </div>
            {(actionsSlot || (actions && actions.length > 0)) && (
              <div
                className={cn(
                  "flex w-full flex-col justify-center gap-2 sm:flex-row",
                  actionsClassName,
                )}
              >
                {renderActions}
              </div>
            )}
          </div>
        </div>
        {gridImagesSlot ? (
          gridImagesSlot
        ) : (
          <div
            className={cn(
              "mx-auto mt-20 grid max-w-7xl gap-px bg-border p-px md:grid-cols-5",
              imageGridClassName,
            )}
          >
            {gridImages?.[0] && (
              <Img
                src={gridImages[0].src}
                alt={gridImages[0].alt}
                className={cn(
                  "h-full max-h-[500px] w-full object-cover md:col-span-3 dark:invert",
                  gridImages[0].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            )}
            {gridImages?.[1] && (
              <div className="relative md:col-span-2">
                <Img
                  src={gridImages[1].src}
                  alt={gridImages[1].alt}
                  className={cn(
                    "h-full max-h-[500px] w-full object-cover dark:invert",
                    gridImages[1].className,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
                {renderImageOverlayAction}
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
