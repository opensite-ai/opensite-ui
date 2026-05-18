"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

export interface HeroDigitalAgencyFullscreenProps {
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

export function HeroDigitalAgencyFullscreen({
  sectionId = "hero-digital-agency-fullscreen",
  heading,
  description,
  actions,
  actionsSlot,
  backgroundImage,
  background,
  pattern,
  patternOpacity,
  className,
  spacing = "py-0 md:py-0",
  containerClassName = "w-screen max-w-full relative z-10 px-0 min-h-screen h-full",
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  optixFlowConfig,
  logo,
  logoSlot,
  logoClassName,
}: HeroDigitalAgencyFullscreenProps): React.JSX.Element {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundImage || !bgImageRef.current) return;

    const imgEl = bgImageRef.current.querySelector("img");
    if (!imgEl) return;

    // If the image is already cached / complete, reveal immediately
    if (imgEl.complete && imgEl.naturalWidth > 0) {
      setIsImageLoaded(true);
      return;
    }

    const handleLoad = () => setIsImageLoaded(true);
    imgEl.addEventListener("load", handleLoad);
    return () => imgEl.removeEventListener("load", handleLoad);
  }, [backgroundImage]);

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
      {backgroundImage && (
        <div
          ref={bgImageRef}
          className={cn(
            "absolute inset-0 transition-[filter] duration-1000 ease-out",
            isImageLoaded ? "blur-0" : "blur-xl",
          )}
        >
          <Img
            src={backgroundImage}
            alt="Hero Background Image"
            className="h-full w-full brightness-50 object-cover object-center"
            loading="eager"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      )}
      <div className="relative">
        <div
          className={cn(
            "flex min-h-screen h-full w-full flex-col items-center justify-end",
            contentClassName,
          )}
        >
          <div className="container flex flex-col gap-6 mb-6 md:mb-24 px-6 md:px-0">
            {(logo || logoSlot) && (

              <div className={cn("mb-4 flex justify-center", logoClassName)}>

                <BrandLogo logo={logo} logoSlot={logoSlot} size="xl" />

              </div>

            )}

            
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold text-balance md:text-7xl",
                    headingClassName,
                    backgroundImage ? "text-white text-shadow-lg" : "",
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
                    "max-w-full md:max-w-[70%] text-lg md:text-xl font-normal text-balance",
                    descriptionClassName,
                    backgroundImage ? "text-white text-shadow-lg" : "",
                  )}
                >
                  {description}
                </p>
              ) : (
                description
              ))}
            <BlockActions
              actions={actions}
              actionsSlot={actionsSlot}
              actionsClassName={actionsClassName}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
