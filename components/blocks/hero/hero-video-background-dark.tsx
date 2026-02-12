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
import { Badge } from "@/src";

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
  videoSrc,
  videoSlot,
  background,
  spacing = "py-0 md:py-0",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-0 sm:px-0 md:px-0 lg:px-0 min-h-screen w-screen h-full max-w-screen",
  contentClassName,
  headingClassName,
  descriptionClassName,
}: HeroVideoBackgroundDarkProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex lg:justify-center">
        <div className="flex min-w-fit flex-col gap-5 text-sm leading-[.96] whitespace-nowrap lg:flex-row lg:items-stretch">
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
                    {label}
                    {iconAfter}
                  </>
                )}
              </Pressable>
            );
          })}
        </div>
      </div>
    );
  }, [actionsSlot, actions]);

  const renderVideo = useMemo(() => {
    if (videoSlot) return videoSlot;

    return (
      <video
        loop
        playsInline
        src={videoSrc}
        className="absolute top-0 left-0 size-full object-cover"
        autoPlay
        muted
      />
    );
  }, [videoSlot, videoSrc]);

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
            "relative z-10 mx-auto flex size-full max-w-3xl flex-col justify-center gap-6 lg:items-center lg:text-center px-6",
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
                  "text-4xl font-bold md:text-5xl text-balance text-white text-shadow-xl",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <h1
                className={cn(
                  "text-4xl font-bold md:text-5xl text-balance text-white text-shadow-xl",
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
                  "text-lg text-balance text-white text-shadow-xl",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          {renderActions}
        </div>
        {renderVideo}
      </div>
    </Section>
  );
}
