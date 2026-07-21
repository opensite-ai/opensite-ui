"use client";

import * as React from "react";
import { useMemo } from "react";
import { Video } from "@page-speed/video";
import { cn } from "../../../lib/utils";
import type {
  ActionConfig,
  MediaItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import { GradientOverlay } from "../../ui/gradient-overlay";
import type { PatternName } from "../../ui/pattern-background";
import { Badge } from "@/src";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

export interface HeroVideoBackgroundDarkProps {
  /**
   * Badge/label text above heading
   */
  badgeText?: React.ReactNode;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Background video configuration
   */
  backgroundVideo?: MediaItem;
  /**
   * Custom slot for video (overrides backgroundVideo prop)
   */
  videoSlot?: React.ReactNode;
  /**
   * @deprecated Use backgroundVideo instead
   */
  videoSrc?: string;
  /**
   * Intensity of the gradient overlay on the video
   * @default "high"
   */
  videoOverlayIntensity?: "low" | "default" | "high" | "very-high";
  /**
   * Granular control of brightness for video (deprecated - prefer videoOverlayIntensity)
   * @default "50"
   */
  videoBrightness?: "10" | "20" | "25" | "30" | "40" | "50" | "75" | "100";
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

export function HeroVideoBackgroundDark({
  sectionId = "hero-video-background-dark",
  badgeText,
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  backgroundVideo,
  videoSrc,
  videoSlot,
  background,
  videoBrightness,
  videoOverlayIntensity = "high",
  spacing = "py-0 md:py-0",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-0 sm:px-0 md:px-0 lg:px-0 min-h-screen w-screen h-full max-w-screen",
  contentClassName,
  headingClassName,
  descriptionClassName,
  logo,
  logoSlot,
  logoClassName,
}: HeroVideoBackgroundDarkProps): React.JSX.Element {
  const renderVideo = useMemo(() => {
    if (videoSlot) return videoSlot;

    return (
      <>
        <Video
          src={backgroundVideo?.video?.src || videoSrc}
          masterPlaylistUrl={backgroundVideo?.video?.masterPlaylistUrl}
          fallbackSrc={backgroundVideo?.video?.fallbackSrc}
          poster={backgroundVideo?.video?.poster || backgroundVideo?.image?.src}
          loop
          playsInline
          autoPlay
          muted
          controls={false}
          className="absolute top-0 left-0 size-full object-cover"
          {...backgroundVideo?.video}
        />
        <GradientOverlay intensity={videoOverlayIntensity} />
      </>
    );
  }, [videoSlot, backgroundVideo, videoSrc, videoOverlayIntensity]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative flex items-center justify-center", className)}
      containerClassName={containerClassName}
    >
      <div className="min-h-screen h-full flex flex-col justify-center items-center">
        <div
          className={cn(
            "relative z-10 mx-auto flex flex-col justify-center",
            "size-full max-w-full md:max-w-md lg:max-w-4xl",
            "gap-4 md:gap-6 items-center text-center px-4 md:px-6",
            contentClassName,
          )}
        >
          {badgeText &&
            (typeof badgeText === "string" ? (
              <Badge>{badgeText}</Badge>
            ) : (
              badgeText
            ))}
          {(logo || logoSlot) && (
            <div className={cn("mb-4 flex justify-center", logoClassName)}>
              <BrandLogo logo={logo} logoSlot={logoSlot} size="xl" />
            </div>
          )}

          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "font-bold text-5xl md:text-6xl lg:text-8xl",
                  "text-balance text-white text-shadow-lg",
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
                  "max-w-full md:max-w-md text-balance",
                  "text-lg md:text-xl text-white text-shadow-lg",
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
        {renderVideo}
      </div>
    </Section>
  );
}
