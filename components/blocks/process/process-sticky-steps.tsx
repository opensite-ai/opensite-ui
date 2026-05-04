"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

/**
 * Step item configuration for ProcessStickySteps
 */
export interface ProcessStickyStepItem {
  /**
   * Step number or label (e.g., "01", "Step 1")
   */
  step?: React.ReactNode;
  /**
   * Step title
   */
  title?: React.ReactNode;
  /**
   * Step description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the step item
   */
  className?: string;
  /**
   * Optional URL
   */
  href?: string;
}

export interface ProcessStickyStepsProps {
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
   * Array of step configurations
   */
  steps?: ProcessStickyStepItem[];
  /**
   * Custom slot for rendering steps (overrides steps array)
   */
  stepsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the content wrapper
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
  /**
   * Additional CSS classes for the steps list
   */
  stepsClassName?: string;
  /**
   * Additional CSS classes for each step item
   */
  stepItemClassName?: string;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

const CornerIllustration = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="0.607422"
        y1="2.57422"
        x2="21.5762"
        y2="2.57422"
        stroke="currentColor"
        strokeWidth="4"
      />
      <line
        x1="19.5762"
        y1="19.624"
        x2="19.5762"
        y2="4.57422"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  );
};

/**
 * ProcessStickySteps - A process section with sticky sidebar containing heading,
 * description, and CTA, with scrollable steps on the right side.
 */
export function ProcessStickySteps({
  sectionId = "process-sticky-steps",
  heading,
  description,
  actions,
  actionsSlot,
  steps,
  stepsSlot,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  stepsClassName,
  stepItemClassName,
  background,
  spacing = "lg",
  pattern,
  patternOpacity,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
}: ProcessStickyStepsProps): React.JSX.Element {
  const renderSteps = useMemo(() => {
    if (stepsSlot) return stepsSlot;
    if (!steps?.length) return null;

    return (
      <ul className={cn("relative col-span-4 w-full lg:pl-28", stepsClassName)}>
        {steps.map((step, index) => (
          <li
            key={index}
            className={cn(
              "relative flex flex-col justify-between gap-10 border-t py-8 md:flex-row lg:py-10",
              stepItemClassName,
              step.className,
            )}
          >
            <Pressable
              href={step.href}
              aria-label={
                typeof step.title === "string" ? step.title : "View step"
              }
              className="absolute top-4 right-0 inline-flex"
            >
              <CornerIllustration />
            </Pressable>

            <div
              className={cn(
                "flex size-12 items-center justify-center px-4 py-1 tracking-tighter",
                "bg-muted text-muted-foreground",
              )}
            >
              {step.step ?? `0${index + 1}`}
            </div>
            <div>
              {step.title &&
                (typeof step.title === "string" ? (
                  <Pressable href={step.href} className="mb-4 block">
                    <h3 className="text-2xl font-semibold tracking-tighter lg:text-3xl">
                      {step.title}
                    </h3>
                  </Pressable>
                ) : (
                  <Pressable href={step.href} className="mb-4 block">
                    {step.title}
                  </Pressable>
                ))}
              {step.description &&
                (typeof step.description === "string" ? (
                  <p>{step.description}</p>
                ) : (
                  step.description
                ))}
            </div>
          </li>
        ))}
      </ul>
    );
  }, [stepsSlot, steps, background, stepsClassName, stepItemClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-24",
          contentClassName,
        )}
      >
        <div className="top-10 col-span-2 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
          <div className="relative w-fit text-5xl font-semibold tracking-tight lg:text-7xl">
            {heading &&
              (typeof heading === "string" ? (
                <h1 className={cn("w-fit", headingClassName)}>{heading}</h1>
              ) : (
                heading
              ))}
            <DynamicIcon
              name="lucide/asterisk"
              size={40}
              className="absolute -top-2 -right-2 md:size-10 lg:-right-10"
            />
          </div>
          {description &&
            (typeof description === "string" ? (
              <p className={cn("text-base ", descriptionClassName)}>
                {description}
              </p>
            ) : (
              description
            ))}
          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </div>
        {renderSteps}
      </div>
    </Section>
  );
}
