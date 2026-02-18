"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

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
}

export function HeroDigitalAgencyFullscreen({
  heading,
  description,
  actions,
  actionsSlot,
  backgroundImage,
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  optixFlowConfig,
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
            alt=""
            className="h-full w-full brightness-50 object-cover object-center"
            eager
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      )}
      <div className="relative">
        <div className="flex w-full flex-col justify-between gap-10">
          <div
            className={cn(
              "mx-auto flex max-w-125 flex-1 flex-col items-center justify-center gap-7 sm:max-w-150 md:max-w-200",
              contentClassName,
            )}
          >
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "mb-8 text-4xl font-normal text-balance md:text-7xl",
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
                    "mb-12 max-w-full md:max-w-[70%] text-lg md:text-xl font-normal text-balance",
                    descriptionClassName,
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
