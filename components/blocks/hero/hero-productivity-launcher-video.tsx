"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface VersionInfo {
  /**
   * Version number (e.g., "v1.87.5")
   */
  version?: string;
  /**
   * OS requirement (e.g., "macOS 12+")
   */
  osRequirement?: string;
  /**
   * Install method text (e.g., "Install via homebrew")
   */
  installMethod?: string;
  /**
   * Install method action
   */
  installAction?: () => void;
}

export interface SecondaryCtaConfig {
  /**
   * Primary text (e.g., "Download on iOS")
   */
  primaryText?: string;
  /**
   * Secondary text (e.g., "Join waitlist")
   */
  secondaryText?: string;
  /**
   * Link destination
   */
  href?: string;
}

export interface HeroProductivityLauncherVideoProps {
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
   * Version information display
   */
  versionInfo?: VersionInfo;
  /**
   * Custom slot for version info (overrides versionInfo prop)
   */
  versionInfoSlot?: React.ReactNode;
  /**
   * Video source URL
   */
  videoSrc?: string;
  /**
   * Custom slot for video (overrides videoSrc prop)
   */
  videoSlot?: React.ReactNode; /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
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

export function HeroProductivityLauncherVideo({
  heading,
  description,
  actions,
  actionsSlot,
  versionInfo,
  versionInfoSlot,
  videoSrc,
  videoSlot,
  background,
  spacing = "py-0 md:py-0",
  containerClassName = "mx-auto w-screen min-h-screen h-full max-w-screen relative z-10 px-0 sm:px-0 md:px-0 lg:px-0 flex flex-col items-center justify-center",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
}: HeroProductivityLauncherVideoProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {actions.map((action, index) => {
          const {
            label,
            icon,
            iconAfter,
            children,
            className: actionClassName,
            ...pressableProps
          } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={actionClassName}
              {...pressableProps}
            >
              {children ?? (
                <>
                  {icon}
                  <p>{label}</p>
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  }, [actionsSlot, actions]);

  const renderVersionInfo = useMemo(() => {
    if (versionInfoSlot) return versionInfoSlot;
    if (!versionInfo) return null;

    return (
      <div className="flex gap-6 text-xs text-white">
        {versionInfo.version && <span>{versionInfo.version}</span>}
        {versionInfo.osRequirement && (
          <span className="relative before:absolute before:-left-3 before:content-['|']">
            {versionInfo.osRequirement}
          </span>
        )}
        {versionInfo.installMethod && (
          <span className="relative before:absolute before:-left-3 before:content-['|']">
            <button onClick={versionInfo.installAction}>
              {versionInfo.installMethod}
            </button>
          </span>
        )}
      </div>
    );
  }, [versionInfoSlot, versionInfo]);

  const renderVideo = useMemo(() => {
    if (videoSlot) return videoSlot;

    return (
      <div className="absolute top-0 z-10 h-full w-full inset-0">
        <video
          src={videoSrc}
          loop
          muted
          autoPlay
          controls={false}
          className="block size-full object-cover object-center brightness-50"
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
      className={className}
      containerClassName={containerClassName}
    >
      <div className={cn("relative z-20 max-w-204.5", contentClassName)}>
        <div className="flex flex-col items-center pb-8">
          <div className="flex flex-col items-center gap-8 pb-16 pt-16">
            <div className="max-w-100 sm:max-w-135">
              {heading &&
                (typeof heading === "string" ? (
                  <h1
                    className={cn(
                      "text-center text-4xl leading-tight font-semibold text-shadow-lg sm:text-5xl md:text-6xl text-balance text-white",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h1>
                ) : (
                  <h1
                    className={cn(
                      "text-center text-4xl leading-tight font-semibold text-shadow-lg sm:text-5xl md:text-6xl text-balance text-white",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h1>
                ))}
            </div>
            <div className="max-w-90 md:max-w-full">
              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "text-center text-sm leading-normal tracking-tight text-balance md:text-lg text-white",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            {renderActions}
            {renderVersionInfo}
          </div>
        </div>
      </div>
      {renderVideo}
    </Section>
  );
}
