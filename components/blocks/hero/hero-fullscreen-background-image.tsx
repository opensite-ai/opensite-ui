"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import type {ActionConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface HeroFullscreenBackgroundImageProps {
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
   * Noise overlay image URL (set to empty string to disable)
   */
  noiseOverlayUrl?: string;  /**
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
   * Additional CSS classes for the content container
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
}

export function HeroFullscreenBackgroundImage({
  heading,
  description,
  actions,
  actionsSlot,
  backgroundImage,
  noiseOverlayUrl = "https://cdn.ing/assets/i/r/286188/zrqcp9hynh3j7p2laihwzfbujgrl/noise.png",
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
}: HeroFullscreenBackgroundImageProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
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
    });
  }, [actionsSlot, actions]);

  return (
    <Section
      className={cn(
        "dark relative flex h-svh max-h-[1400px] w-svw overflow-hidden bg-cover bg-center bg-no-repeat font-sans after:absolute after:top-0 after:left-0 after:z-10 after:h-full after:w-full after:bg-black/20 after:content-[''] md:h-svh",
        className
      )}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className={cn("relative z-30 m-auto flex max-w-185 flex-col items-center justify-center gap-6 px-5", contentClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("text-center font-serif text-4xl leading-tight text-foreground md:text-6xl xl:text-[4.4rem]", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("text-center text-base text-foreground", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {(actionsSlot || (actions && actions.length > 0)) && (
          <div className={actionsClassName}>
            {renderActions}
          </div>
        )}
      </div>
      {noiseOverlayUrl && (
        <div
          className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-repeat opacity-15"
          style={{ backgroundImage: `url('${noiseOverlayUrl}')` }}
        />
      )}
    </Section>
  );
}
