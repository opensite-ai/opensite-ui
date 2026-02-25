"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { Badge } from "@/src";
import { BlockActions } from "@/components/ui/block-actions";

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
   * Video source URL
   */
  videoSrc?: string;
  /**
   * Custom slot for video (overrides videoSrc prop)
   */
  videoSlot?: React.ReactNode;
  /**
   * Granular control of brightness for video
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
}

export function HeroVideoBackgroundDark({
  badgeText,
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  videoSrc,
  videoSlot,
  background,
  videoBrightness = "50",
  spacing = "py-0 md:py-0",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-0 sm:px-0 md:px-0 lg:px-0 min-h-screen w-screen h-full max-w-screen",
  contentClassName,
  headingClassName,
  descriptionClassName,
}: HeroVideoBackgroundDarkProps): React.JSX.Element {
  const renderVideo = useMemo(() => {
    if (videoSlot) return videoSlot;

    return (
      <video
        loop
        playsInline
        src={videoSrc}
        className={cn(
          "absolute top-0 left-0 size-full object-cover",
          `brightness-${videoBrightness}`,
        )}
        autoPlay
        muted
      />
    );
  }, [videoSlot, videoSrc, videoBrightness]);

  return (
    <Section
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
            "relative z-10 mx-auto flex size-full",
            "md:max-w-3xl lg:max-w-4xl flex-col justify-center",
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
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "font-bold text-5xl md:text-6xl lg:text-8xl",
                  "text-pretty text-white text-shadow-2xl",
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
                  "text-lg text-balance text-white text-shadow-xl",
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
