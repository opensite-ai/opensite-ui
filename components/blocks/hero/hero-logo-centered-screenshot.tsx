"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import type {
  ActionConfig,
  ImageItem,
  LogoItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { LogoConfig } from "../navbars/types";
import BrandLogo from "@/components/ui/brand-logo";

export interface HeroLogoCenteredScreenshotProps {
  /**
   * Brand logo configuration — renders above the announcement badge.
   * LOGO MEDIA ONLY. Do not use photos, hero images, or video assets.
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
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Action configuration for CTA button
   */
  action?: ActionConfig;
  /**
   * Custom slot for action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Screenshot image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
   */
  imageSlot?: React.ReactNode; /**
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

export function HeroLogoCenteredScreenshot({
  sectionId = "hero-logo-centered-screenshot",
  logo,
  logoSlot,
  logoClassName,
  heading,
  description,
  action,
  actionSlot,
  image,
  imageSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "pt-32 pb-8 md:pt-32 md:pb-32",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroLogoCenteredScreenshotProps): React.JSX.Element {
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

  const renderImage = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <Img
        src={image.src}
        alt={image.alt}
        className={cn(
          "mt-20 w-full rounded-xl object-cover h-auto shadow-xl",
          imageClassName,
          image.className,
        )}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [imageSlot, image, imageClassName, optixFlowConfig]);

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
        <div className="mx-auto flex max-w-full md:max-w-5xl flex-col items-center">
          <div
            className={cn(
              "z-10 flex flex-col items-center gap-6 text-center",
              contentClassName,
            )}
          >
            {(logo || logoSlot) && (
              <div className={cn("flex justify-center", logoClassName)}>
                <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />
              </div>
            )}
            <div className="flex flex-col justify-center items-center w-full text-balance">
              {heading &&
                (typeof heading === "string" ? (
                  <h1
                    className={cn(
                      "mb-4 text-3xl font-medium lg:text-5xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h1>
                ) : (
                  heading
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "max-w-full md:max-w-3xl lg:text-xl",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  description
                ))}
            </div>
            {renderAction}
          </div>
        </div>
        {renderImage}
      </div>
    </Section>
  );
}
