"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import type {
  ActionConfig,
  LogoItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface HeroFullscreenLogoCtaProps {
  /**
   * Logo configuration
   */
  logo?: LogoItem;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Scroll/read more action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Background image URL
   */
  backgroundImage?: string; /**
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroFullscreenLogoCta({
  sectionId = "hero-fullscreen-logo-cta",
  logo,
  logoSlot,
  heading,
  description,
  action,
  actionSlot,
  backgroundImage,
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-0 sm:px-0 lg:px-0 max-w-full relative z-10 h-screen w-screen flex justify-center items-center",
  contentClassName,
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroFullscreenLogoCtaProps): React.JSX.Element {
  const renderBackground = useMemo(() => {
    if (!backgroundImage) return null;

    return (
      <div className="absolute inset-0">
        <Img
          src={backgroundImage}
          alt="Full screen background image"
          className="h-full w-full object-cover"
          loading="eager"
          optixFlowConfig={optixFlowConfig}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/65 to-black/20" />
      </div>
    );
  }, [backgroundImage, optixFlowConfig]);

  const renderLogo = useMemo(() => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;
    return (
      <Img
        src={logoSrc}
        alt={logo.alt}
        className={cn("h-12 md:h-16 w-auto object-contain", logo.className)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [logoSlot, logo, optixFlowConfig]);

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
            <DynamicIcon name={icon} />
            {label}
            <DynamicIcon name={iconAfter} />
          </>
        )}
      </Pressable>
    );
  }, [actionSlot, action]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(
        "relative flex h-full min-h-screen w-screen items-center justify-center overflow-hidden pb-0 pt-0 md:pt-0 px-0",
        className,
      )}
      containerClassName={containerClassName}
    >
      {renderBackground}

      <div
        className={cn(
          "z-30 m-auto max-w-full items-start justify-center flex flex-col",
          "relative gap-12 md:gap-6 px-5",
          "pt-8 pb-6 md:pt-0 md:pb-0",
          contentClassName,
        )}
      >
        {renderLogo}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-start md:justify-between gap-8">
          <div className={cn("flex w-full flex-col gap-8 md:w-2/3")}>
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-5xl md:text-6xl lg:text-7xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <h1
                  className={cn(
                    "text-5xl md:text-6xl lg:text-7xl",
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
                    "text-xl md:text-2xl text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
          </div>
          {renderAction}
        </div>
      </div>
    </Section>
  );
}
