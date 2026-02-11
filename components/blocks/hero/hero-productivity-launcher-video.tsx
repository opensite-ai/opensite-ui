"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type {ActionConfig, SectionBackground, SectionSpacing} from "../../../src/types";
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
   * Secondary CTA configuration
   */
  secondaryCta?: SecondaryCtaConfig;
  /**
   * Custom slot for secondary CTA (overrides secondaryCta prop)
   */
  secondaryCtaSlot?: React.ReactNode;
  /**
   * Video source URL
   */
  videoSrc?: string;
  /**
   * Custom slot for video (overrides videoSrc prop)
   */
  videoSlot?: React.ReactNode;  /**
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
  secondaryCta,
  secondaryCtaSlot,
  videoSrc,
  videoSlot,
  background,
  spacing = "py-32 md:py-32",
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
      <div className="flex flex-wrap items-center justify-center gap-4">
        {actions.map((action, index) => {
          const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
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
      <div className="flex gap-6 text-xs text-muted-foreground">
        {versionInfo.version && <span>{versionInfo.version}</span>}
        {versionInfo.osRequirement && (
          <span className="relative before:absolute before:-left-3 before:content-['|']">
            {versionInfo.osRequirement}
          </span>
        )}
        {versionInfo.installMethod && (
          <span className="relative before:absolute before:-left-3 before:content-['|']">
            <button onClick={versionInfo.installAction}>{versionInfo.installMethod}</button>
          </span>
        )}
      </div>
    );
  }, [versionInfoSlot, versionInfo]);

  const renderSecondaryCta = useMemo(() => {
    if (secondaryCtaSlot) return secondaryCtaSlot;
    if (!secondaryCta) return null;

    return (
      <Pressable
        href={secondaryCta.href}
        className="group relative mt-10 flex h-8 items-center gap-3 overflow-hidden rounded-full border border-border/50 bg-background px-3 py-1 text-sm font-medium"
      >
        {secondaryCta.primaryText && <span>{secondaryCta.primaryText}</span>}
        {secondaryCta.secondaryText && (
          <span className="flex items-center gap-1 text-muted-foreground">
            <span>{secondaryCta.secondaryText}</span>
            <DynamicIcon
              name="lucide/arrow-right"
              size={16}
              className="stroke-muted-foreground"
            />
          </span>
        )}
      </Pressable>
    );
  }, [secondaryCtaSlot, secondaryCta]);

  const renderVideo = useMemo(() => {
    if (videoSlot) return videoSlot;

    return (
      <div className="absolute -top-24 z-10 h-full w-full before:absolute before:inset-0 before:size-full before:bg-[radial-gradient(circle_at_center,rgba(10,10,10,.3)_15%,rgba(10,10,10,1)_45%)] before:content-['']">
        <video
          src={videoSrc}
          loop
          muted
          autoPlay
          controls={false}
          className="block size-full object-cover object-center bg-blend-saturation"
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
      className={cn("relative flex items-center justify-center dark overflow-hidden bg-background py-12 font-sans md:py-20", className)}
      containerClassName="px-6 sm:px-6 md:px-8 lg:px-8"
    >
      <div className={cn("relative z-20 max-w-204.5", contentClassName)}>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-8 px-4 pt-52 pb-32 md:pb-52">
            <div className="max-w-100 sm:max-w-135">
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("text-center text-4xl leading-tight font-semibold [text-shadow:0_4px_4px_rgba(0,0,0,0.15)] sm:text-5xl md:text-[4rem]", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <h1 className={cn("text-center text-4xl leading-tight font-semibold [text-shadow:0_4px_4px_rgba(0,0,0,0.15)] sm:text-5xl md:text-[4rem]", headingClassName)}>
                    {heading}
                  </h1>
                )
              )}
            </div>
            <div className="max-w-90 md:max-w-full">
              {description && (
                typeof description === "string" ? (
                  <p className={cn("text-center text-sm leading-normal tracking-tight text-balance text-muted-foreground [text-shadow:0_4px_4px_rgba(0,0,0,0.25)] md:text-lg", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            {renderActions}
            {renderVersionInfo}
          </div>
          {renderSecondaryCta}
        </div>
      </div>
      {renderVideo}
    </Section>
  );
}
