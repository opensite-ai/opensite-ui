"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type {ActionConfig, LogoItem, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

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
  backgroundImage?: string;  /**
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
}

export function HeroFullscreenLogoCta({
  logo,
  logoSlot,
  heading,
  description,
  action,
  actionSlot,
  backgroundImage,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroFullscreenLogoCtaProps): React.JSX.Element {
  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;
    return (
      <Img
        src={logoSrc}
        alt={logo.alt}
        className={cn("size-20", logo.className)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
    return (
      <Pressable
        asButton
        className={actionClassName}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            <span className="text-2xl">{label}</span>
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  return (
    <Section
      className={cn(
        "dark h-screen w-screen bg-background bg-cover bg-center bg-no-repeat pt-12 pb-24",
        className,
      )}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className={cn("container flex h-full flex-col justify-between px-5 xl:px-20", containerClassName)}>
        {renderLogo()}
        <div className="flex items-end justify-between">
          <div className={cn("flex w-full flex-col gap-8 md:w-2/3", contentClassName)}>
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-6xl font-medium text-foreground md:text-[5.8rem]", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("text-6xl font-medium text-foreground md:text-[5.8rem]", headingClassName)}>
                  {heading}
                </h1>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-xl text-foreground md:text-2xl", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
          </div>
          {renderAction()}
        </div>
      </div>
    </Section>
  );
}
