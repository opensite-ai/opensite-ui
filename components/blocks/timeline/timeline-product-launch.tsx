"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Progress } from "../../ui/progress";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { ActionConfig } from "../../../src/types/blocks";

export interface TimelineProductLaunchStep {
  number: string;
  title: React.ReactNode;
  heading: React.ReactNode;
  description: React.ReactNode;
  progress: number;
  duration: React.ReactNode;
}

export interface TimelineProductLaunchProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below the heading
   */
  description?: React.ReactNode;
  /**
   * Card heading content
   */
  cardHeading?: React.ReactNode;
  /**
   * CTA action configuration
   */
  ctaAction?: ActionConfig;
  /**
   * Custom slot to override the default CTA rendering
   */
  ctaSlot?: React.ReactNode;
  /**
   * Array of launch steps
   */
  steps?: TimelineProductLaunchStep[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the card heading
   */
  cardHeadingClassName?: string;
  /**
   * Additional CSS classes for the steps container
   */
  stepsClassName?: string;
  /**
   * Additional CSS classes for individual steps
   */
  stepClassName?: string;
  /**
   * Additional CSS classes for step titles
   */
  stepTitleClassName?: string;
  /**
   * Additional CSS classes for step headings
   */
  stepHeadingClassName?: string;
  /**
   * Additional CSS classes for step descriptions
   */
  stepDescriptionClassName?: string;
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

export function TimelineProductLaunch({
  heading,
  description,
  cardHeading = "Guidance from industry leaders",
  ctaAction = {
    label: "Request a demo",
    href: "#",
  },
  ctaSlot,
  steps,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardHeadingClassName,
  stepsClassName,
  stepClassName,
  stepTitleClassName,
  stepHeadingClassName,
  stepDescriptionClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
}: TimelineProductLaunchProps) {
  const renderCta = () => {
    if (ctaSlot) {
      return ctaSlot;
    }
    if (ctaAction) {
      return (
        <Pressable
          href={ctaAction.href}
          onClick={ctaAction.onClick}
          variant={ctaAction.variant || "default"}
          size={ctaAction.size}
          asButton
          className={cn("order-last", ctaAction.className)}
          aria-label={ctaAction["aria-label"]}
        >
          {ctaAction.children || ctaAction.label}
        </Pressable>
      );
    }
    return null;
  };

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
        <div className="flex flex-col">
          <h1 className={cn("mb-2 text-3xl font-semibold md:text-5xl", headingClassName)}>{heading}</h1>
          <p className={cn("max-w-2xl text-muted-foreground", descriptionClassName)}>{description}</p>
        </div>
        <div className={cn("mt-8 flex flex-col gap-6 rounded-xl border border-border bg-card p-4 sm:p-8 lg:p-11", cardClassName)}>
          <div className="contents items-center justify-between sm:flex">
            <h2 className={cn("text-2xl font-semibold tracking-tight", cardHeadingClassName)}>
              {cardHeading}
            </h2>
            {renderCta()}
          </div>
          {steps && steps.length > 0 && (
            <div className="mt-3 flex gap-4 sm:flex-col">
              <div className="relative">
                <div className={cn("grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:items-center", `sm:grid-cols-${steps.length}`)}>
                  <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-ring sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:translate-x-0" />
                  {steps.map((_, index) => (
                    <span
                      key={index}
                      className="relative top-3 size-2 rounded-full bg-ring sm:top-0"
                    />
                  ))}
                </div>
                <div className={cn("animate-timeline-reveal absolute inset-0 grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:items-center", `sm:grid-cols-${steps.length}`)}>
                  <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-primary sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:translate-x-0" />
                  {steps.map((_, index) => (
                    <span
                      key={index}
                      className="relative top-3 size-2 rounded-full bg-primary sm:top-0"
                    />
                  ))}
                </div>
              </div>
              <div className={cn("grid gap-10", `sm:grid-cols-${steps.length}`, stepsClassName)}>
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={cn("flex h-full flex-col justify-between gap-4", stepClassName)}
                  >
                    <div className="flex flex-col">
                      <div className={cn("flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-border bg-border text-sm font-medium", stepTitleClassName)}>
                        <span className="grid h-full place-items-center bg-background px-2">
                          {step.number}
                        </span>
                        <span className="grid h-full place-items-center bg-background px-2">
                          {step.title}
                        </span>
                      </div>
                      <h3 className={cn("mt-5 font-medium", stepHeadingClassName)}>{step.heading}</h3>
                      <p className={cn("mt-2 text-sm text-muted-foreground", stepDescriptionClassName)}>
                        {step.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Progress value={step.progress} className="h-1 flex-1" />
                        <span className="w-8 text-right text-xs text-muted-foreground">
                          {step.progress}%
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {step.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style>
        {`
        /* Mobile: Top to bottom animation */
        @keyframes timeline-reveal-mobile {
          from {
            clip-path: inset(0 0 100% 0);
          }
          to {
            clip-path: inset(0% 0 0 0);
          }
        }
        
        /* Desktop: Left to right animation */
        @keyframes timeline-reveal-desktop {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0% 0 0);
          }
        }
        
        .animate-timeline-reveal {
          animation: timeline-reveal-mobile 5s linear;
        }
        
        @media (min-width: 640px) {
          .animate-timeline-reveal {
            animation: timeline-reveal-desktop 5s linear;
          }
        }
        `}
      </style>
    </Section>
  );
}
