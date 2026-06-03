"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "motion/react";
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
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

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

export function HeroArchitectureFullscreen({
  sectionId = "hero-architecture-fullscreen",
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
  logo,
  logoSlot,
  logoClassName,
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
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(
        "relative flex min-h-screen min-w-screen items-center justify-center  w-full overflow-hidden",
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
          loading="eager"
        />
      )}
      <div className="relative z-20 h-full w-full max-w-full md:max-w-lg p-8 md:p-24">
        <div className="flex flex-col justify-end gap-6">
          <div className="relative">
            {tagline &&
              (typeof tagline === "string" ? (
                <p
                  className={cn(
                    "text-sm leading-none uppercase text-balance text-white text-shadow-lg",
                    taglineClassName,
                  )}
                >
                  {tagline}
                </p>
              ) : (
                <div className={taglineClassName}>{tagline}</div>
              ))}
            {(logo || logoSlot) && (
              <div className={cn("mb-4 flex justify-start", logoClassName)}>
                <BrandLogo logo={logo} logoSlot={logoSlot} size="xl" />
              </div>
            )}

            {heading &&
              (typeof heading === "string" ? (
                <motion.h1
                  className={cn(
                    "text-6xl font-bold md:text-7xl lg:text-8xl text-white text-balance text-shadow-lg tracking-tight leading-[1.1]",
                    headingClassName,
                  )}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.15,
                      },
                    },
                  }}
                >
                  {heading.split(" ").map((word, i) => (
                    <span
                      key={`${word}-${i}`}
                      className="inline-block overflow-hidden align-bottom"
                    >
                      <motion.span
                        className="inline-block"
                        variants={{
                          hidden: { y: "100%", opacity: 0 },
                          visible: {
                            y: 0,
                            opacity: 1,
                            transition: {
                              duration: 0.5,
                              ease: [0.33, 1, 0.68, 1],
                            },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                      {i < heading.split(" ").length - 1 && (
                        <span className="inline-block w-[0.3em]">&nbsp;</span>
                      )}
                    </span>
                  ))}
                </motion.h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              ))}
          </div>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "text-lg md:text-xl text-balance text-white text-shadow-lg",
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
