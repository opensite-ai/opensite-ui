"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "../../../lib/utils";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";

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
  backgroundImage,
  background,
  pattern,
  patternOpacity,
  className,
  spacing = "py-0 md:py-0",
  containerClassName = "sm:px-4 mx-auto h-screen w-full max-w-7xl relative z-10 px-6 pb-12 md:pb-18",
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
          "text-4xl leading-9 font-bold lg:text-5xl lg:leading-12! xl:text-7xl xl:leading-22! text-white text-shadow-lg",
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
      <div className="relative z-10 flex size-full max-w-md flex-col justify-between md:justify-end">
        <div
          className={cn(
            "flex h-full flex-col gap-6 justify-end max-w-full md:max-w-md",
            contentClassName,
          )}
        >
          {renderHeading}
          <div className="flex items-stretch md:items-start flex-col gap-8">
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
            <BlockActions
              actions={actions}
              actionsSlot={actionsSlot}
              actionsClassName={actionsClassName}
              mobileConfig={{ width: "full", position: "center" }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
