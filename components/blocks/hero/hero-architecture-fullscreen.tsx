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
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface HeroArchitectureFullscreenProps {
  /**
   * Tagline/label above heading
   */
  tagline?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text
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
   * Background image URL
   */
  backgroundImage?: string;
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
   * Additional CSS classes for the tagline
   */
  taglineClassName?: string;
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

export function HeroArchitectureFullscreen({
  tagline,
  heading,
  description,
  action,
  actionSlot,
  backgroundImage,
  background,
  spacing = "py-0 md:py-0",
  pattern,
  patternOpacity,
  className,
  containerClassName = "mx-0 min-h-screen h-full w-screen max-w-full relative z-10 px-0 sm:px-0 md:px-0 lg:px-0 flex items-end",
  taglineClassName,
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroArchitectureFullscreenProps): React.JSX.Element {
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
            {typeof label === "string" ? (
              <p className="group-hover:underline">{label}</p>
            ) : (
              label
            )}
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
      className={cn(
        "relative flex min-h-screen min-w-screen items-center justify-center dark w-full overflow-hidden font-poppins",
        className,
      )}
      containerClassName={containerClassName}
    >
      {backgroundImage && (
        <Img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 min-h-screen min-w-screen object-cover object-center brightness-50"
          optixFlowConfig={optixFlowConfig}
        />
      )}
      <div className="relative z-20 h-full w-full max-w-340 p-8 md:p-24">
        <div className="flex flex-col justify-end gap-6 md:gap-12">
          <div className="flex flex-col gap-1">
            {tagline &&
              (typeof tagline === "string" ? (
                <p
                  className={cn(
                    "text-sm leading-none uppercase text-balance text-white text-shadow-xl",
                    taglineClassName,
                  )}
                >
                  {tagline}
                </p>
              ) : (
                <div className={taglineClassName}>{tagline}</div>
              ))}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-3xl leading-snug! md:text-4xl lg:text-6xl text-white text-balance text-shadow-xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              ))}
          </div>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "text-base text-balance text-white text-shadow-xl",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
          </div>
          <div className="shrink-0">{renderAction}</div>
        </div>
      </div>
    </Section>
  );
}
