"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import type {ActionConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

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

export function HeroVideoBackgroundDark({
  badgeText,
  heading,
  description,
  actions,
  actionsSlot,
  videoSrc,
  videoSlot,
  background = "dark",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
}: HeroVideoBackgroundDarkProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex lg:justify-center">
        <div className="flex min-w-fit flex-col gap-5 text-sm leading-[.96] whitespace-nowrap lg:flex-row lg:items-stretch">
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
  };

  const renderVideo = () => {
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
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("relative z-10 container mx-auto flex size-full max-w-3xl flex-col justify-center gap-4 lg:items-center lg:text-center", contentClassName)}>
        {badgeText && (
          typeof badgeText === "string" ? (
            <span className="text-xs text-muted-foreground">
              {badgeText}
            </span>
          ) : (
            badgeText
          )
        )}
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("text-5xl font-bold text-foreground lg:text-[4.2rem]", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <h1 className={cn("text-5xl font-bold text-foreground lg:text-[4.2rem]", headingClassName)}>
              {heading}
            </h1>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("text-lg text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {renderActions()}
      </div>
      {renderVideo()}
    </Section>
  );
}
