"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

/**
 * Configuration for the primary action button
 */
export interface ActionButtonConfig {
  /**
   * Button label text
   */
  label: string;
  /**
   * Button href destination
   */
  href: string;
  /**
   * Icon name to display after the label
   */
  icon?: string;
}

/**
 * Configuration for the trust/rating section
 */
export interface TrustConfig {
  /**
   * Number of stars to display
   */
  starCount?: number;
  /**
   * Trust message text
   */
  message?: string;
}

export interface HeroVideoOverlayStarsProps {
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Action buttons configuration
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for actions (overrides action prop)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Trust/rating section configuration
   */
  trust?: TrustConfig;
  /**
   * Custom slot for trust section (overrides trust prop)
   */
  trustSlot?: React.ReactNode;
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
   * Additional CSS classes for the section wrapper
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
   * Video source URL
   */
  videoSrc?: string;
  /**
   * Custom slot for video background (overrides videoSrc)
   */
  videoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

/**
 * HeroVideoOverlayStars - A full-screen hero with video background, gradient text heading,
 * prominent CTA button, and star rating trust indicator. Ideal for product launches.
 */
export function HeroVideoOverlayStars({
  heading,
  actions,
  actionsSlot,
  actionsClassName,
  description,
  descriptionClassName,
  trust,
  trustSlot,
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  containerClassName = "px-0 sm:px-0 lg:px-0 max-w-full relative z-10 h-screen w-screen flex justify-center items-center",
  contentClassName,
  className,
  headingClassName,
  videoSrc,
  videoSlot,
}: HeroVideoOverlayStarsProps): React.JSX.Element {
  const renderTrust = useMemo(() => {
    if (trustSlot) return trustSlot;
    if (!trust) return null;

    const starCount = trust.starCount ?? 5;

    return (
      <div>
        <div className="flex items-center justify-center gap-0.5 text-white">
          {[...Array(starCount)].map((_, i) => (
            <DynamicIcon key={i} name="lucide/star" size={12} />
          ))}
        </div>
        {trust.message && (
          <p className="mt-1.5 max-w-40 text-center text-xs leading-snug font-medium text-white text-shadow-2xl">
            {trust.message}
          </p>
        )}
      </div>
    );
  }, [trustSlot, trust]);

  const renderVideo = useMemo(() => {
    if (videoSlot) return videoSlot;

    return (
      <div className="absolute inset-0 size-full before:absolute brightness-50">
        <video
          src={videoSrc}
          muted
          autoPlay
          loop
          controls={false}
          className="size-full object-cover object-center"
        />
      </div>
    );
  }, [videoSlot, videoSrc]);

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
      <div className="relative z-10 flex size-full">
        <div className="m-auto flex max-w-100 flex-col items-center gap-9 sm:max-w-125 md:max-w-200 text-center">
          <div className={cn("flex w-full flex-col gap-8", contentClassName)}>
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-5xl font-semibold md:text-6xl text-balance text-white text-shadow-2xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <h1
                  className={cn(
                    "text-5xl font-semibold md:text-6xl text-balance text-white text-shadow-2xl",
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
                    "text-xl md:text-2xl text-balance text-white text-shadow-2xl",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
          </div>
          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
          {renderTrust}
        </div>
      </div>
      {renderVideo}
    </Section>
  );
}
