"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface TimelineStep {
  icon: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface TimelineVerticalIconDashedProps {
  /**
   * Array of timeline steps
   */
  steps?: TimelineStep[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the steps wrapper
   */
  stepsClassName?: string;
  /**
   * Additional CSS classes for individual step items
   */
  stepClassName?: string;
  /**
   * Additional CSS classes for step icons
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for step titles
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for step descriptions
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the dashed connector line
   */
  connectorClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern background
   */
  patternClassName?: string;
  /**
   * Section ID for anchor links
   */
  id?: string;
  /**
   * Inline styles for the section
   */
  style?: React.CSSProperties;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function TimelineVerticalIconDashed({
  steps,
  className,
  containerClassName,
  stepsClassName,
  stepClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
  connectorClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
}: TimelineVerticalIconDashedProps) {
  if (steps.length === 0) {
    return (
      <Section
        id={id}
        background={background}
        spacing={spacing}
        className={className}
        pattern={pattern}
        patternOpacity={patternOpacity}
        patternClassName={patternClassName}
        style={style}
      >
        <div className={containerClassName} />
      </Section>
    );
  }

  return (
    <Section
      id={id}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      style={style}
    >
      <div className={containerClassName}>
        <div className={cn("mx-auto flex flex-col items-center justify-center text-center sm:max-w-xl", stepsClassName)}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className={cn("flex flex-col items-center", stepClassName)}>
                <span className={cn("flex size-24 items-center justify-center rounded-full border-2 border-foreground", iconClassName)}>
                  <DynamicIcon name={step.icon} size={32} />
                </span>
                <h2 className={cn("my-2 text-3xl font-medium", titleClassName)}>{step.title}</h2>
                <p className={cn("font-mono text-muted-foreground", descriptionClassName)}>
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <span
                  className={cn("my-3 h-36 w-0.5", connectorClassName)}
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, currentColor 10%, rgba(255, 255, 255, 0) 0%)",
                    backgroundPosition: "left",
                    backgroundSize: "3px 15px",
                    backgroundRepeat: "repeat-y",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Section>
  );
}
