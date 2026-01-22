"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type {ActionConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface HeroHiringAnimatedTextProps {
  /**
   * Static heading prefix text
   */
  headingPrefix?: React.ReactNode;
  /**
   * Array of animated text items to cycle through
   */
  animatedTexts?: string[];
  /**
   * Custom slot for heading (overrides heading props)
   */
  headingSlot?: React.ReactNode;
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
   * Scroll action configuration
   */
  scrollAction?: ActionConfig;
  /**
   * Custom slot for scroll action (overrides scrollAction prop)
   */
  scrollActionSlot?: React.ReactNode;
  /**
   * Background image URL
   */
  backgroundImage?: string;  /**
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
}

export function HeroHiringAnimatedText({
  headingPrefix = "We help you to hire top",
  animatedTexts,
  headingSlot,
  description,
  actions,
  actionsSlot,
  scrollAction,
  scrollActionSlot,
  backgroundImage,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
}: HeroHiringAnimatedTextProps): React.JSX.Element {
  const renderHeading = () => {
    if (headingSlot) return headingSlot;

    return (
      <h1 className={cn("text-4xl leading-9 font-bold text-foreground lg:text-5xl lg:leading-12! xl:text-7xl xl:leading-22!", headingClassName)}>
        <div className="mb-2">{headingPrefix}</div>
        {animatedTexts && animatedTexts.length > 0 && (
          <div className="relative h-[calc(2.25rem*3)] md:h-9 lg:h-12 xl:h-22">
            {animatedTexts.map((text, index) => (
              <div
                key={index}
                className={cn(
                  "absolute top-0 left-0 will-change-[opacity]",
                  index === 0
                    ? `animate-[show-text_${animatedTexts.length * 2}s_ease-in-out_infinite_0s]`
                    : `animate-[show-text_${animatedTexts.length * 2}s_ease-in-out_infinite_${index * 2}s] opacity-0`
                )}
                style={{
                  animation: `show-text ${animatedTexts.length * 2}s ease-in-out infinite ${index * 2}s`,
                  opacity: index === 0 ? 1 : 0,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        )}
      </h1>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-wrap items-center gap-5", actionsClassName)}>
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
    );
  };

  const renderScrollAction = () => {
    if (scrollActionSlot) return scrollActionSlot;
    if (!scrollAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = scrollAction;
    return (
      <Pressable asButton className={actionClassName} {...pressableProps}>
        {children ?? (
          <>
            {icon}
            <div>{label}</div>
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  return (
    <Section
      className={cn(
        "dark relative h-svh max-h-[1400px] w-full bg-cover bg-position-[100%] bg-no-repeat before:absolute before:top-0 before:left-0 before:size-full before:bg-[radial-gradient(circle_at_100%_-100%,transparent_40%,rgba(0,0,0,.75)_85%)] before:content-['']",
        className
      )}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className={cn("relative z-10 container flex size-full max-w-412.5 flex-col justify-between pt-24 pb-14 md:justify-end", containerClassName)}>
        <div className={cn("flex h-full flex-col justify-between gap-6 md:justify-end", contentClassName)}>
          {renderHeading()}
          <div className="flex flex-col gap-8">
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-lg text-foreground lg:text-2xl", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            <div className="flex flex-wrap items-center justify-between gap-5">
              {renderActions()}
              {renderScrollAction()}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
