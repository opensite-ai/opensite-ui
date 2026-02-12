"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
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
  backgroundImage?: string; /**
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
  headingPrefix,
  animatedTexts,
  headingSlot,
  description,
  actions,
  actionsSlot,
  scrollAction,
  scrollActionSlot,
  backgroundImage,
  background,
  spacing = "pt-28 pb-8 md:pt-32 md:pb-32",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
}: HeroHiringAnimatedTextProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);

  const cycleText = useCallback(() => {
    if (!animatedTexts || animatedTexts.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % animatedTexts.length);
  }, [animatedTexts]);

  useEffect(() => {
    if (!animatedTexts || animatedTexts.length <= 1) return;
    const interval = setInterval(cycleText, 2000);
    return () => clearInterval(interval);
  }, [animatedTexts, cycleText]);

  const renderHeading = useMemo(() => {
    if (headingSlot) return headingSlot;

    return (
      <h1
        className={cn(
          "text-4xl leading-9 font-bold lg:text-5xl lg:leading-12! xl:text-7xl xl:leading-22! text-white text-shadow-xl",
          headingClassName,
        )}
      >
        <div className="mb-2">{headingPrefix}</div>
        {animatedTexts && animatedTexts.length > 0 && (
          <div className="relative h-9 lg:h-12 xl:h-22">
            {animatedTexts.map((text, index) => (
              <div
                key={index}
                className="absolute top-0 left-0 text-white transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: index === activeIndex ? 1 : 0,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        )}
      </h1>
    );
  }, [
    headingSlot,
    headingPrefix,
    animatedTexts,
    headingClassName,
    activeIndex,
  ]);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-col md:flex-row gap-4", actionsClassName)}>
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
    );
  }, [actionsSlot, actions, actionsClassName]);

  const renderScrollAction = useMemo(() => {
    if (scrollActionSlot) return scrollActionSlot;
    if (!scrollAction) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = scrollAction;
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
  }, [scrollActionSlot, scrollAction]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(
        "relative flex items-center justify-center h-svh max-h-[1400px] w-full bg-cover bg-position-[100%] bg-no-repeat before:absolute before:top-0 before:left-0 before:size-full before:bg-[radial-gradient(circle_at_100%_-100%,transparent_40%,rgba(0,0,0,.75)_85%)] before:content-['']",
        className,
      )}
      containerClassName={containerClassName}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="relative z-10 flex size-full max-w-412.5 flex-col justify-between pt-24 pb-14 md:justify-end">
        <div
          className={cn(
            "flex h-full flex-col justify-between gap-6 md:justify-end max-w-full md:max-w-md",
            contentClassName,
          )}
        >
          {renderHeading}
          <div className="flex flex-col gap-8">
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "text-lg lg:text-2xl text-white text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {renderActions}
              {renderScrollAction}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
