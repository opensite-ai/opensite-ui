"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
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
   * @deprecated Use `heading` instead
   */
  title?: string;
  /**
   * @deprecated Use `actions` instead
   */
  ctaText?: string;
  /**
   * @deprecated Use `actions` instead
   */
  ctaUrl?: string;
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
  spacing,
  pattern,
  patternOpacity,
  // Backwards compatibility
  title,
  ctaText,
  ctaUrl,
}: ProcessStickyStepsProps): React.JSX.Element {
  // Handle backwards compatibility
  const resolvedHeading = title ?? heading;
  const resolvedActions: ActionConfig[] =
    actions ??
    (ctaText && ctaUrl
      ? [
          {
            label: ctaText,
            href: ctaUrl,
            variant: "ghost" as const,
            icon: (
              <DynamicIcon
                name="lucide/corner-down-right"
                size={20}
                className="text-primary"
              />
            ),
          },
        ]
      : []);

  const renderActions = useMemo(() => {
    return () => {
      if (actionsSlot) return actionsSlot;
      if (!resolvedActions?.length) return null;

      return (
        <div className={cn("flex flex-col gap-2", actionsClassName)}>
          {resolvedActions.map((action, index) => {
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
                className={cn(
                  "flex items-center justify-start gap-2",
                  actionClassName,
                )}
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
  }, [actionsSlot, resolvedActions, actionsClassName]);

  const renderSteps = useMemo(() => {
    if (stepsSlot) return stepsSlot;
    if (!steps?.length) return null;

    return (
      <ul className={cn("relative col-span-4 w-full lg:pl-22", stepsClassName)}>
        {steps.map((step, index) => (
          <li
            key={index}
            className={cn(
              "relative flex flex-col justify-between gap-10 border-t py-8 md:flex-row lg:py-10",
              stepItemClassName,
              step.className,
            )}
          >
            <CornerIllustration className="absolute top-4 right-0 text-primary" />

            <div className={cn(
              "flex size-12 items-center justify-center px-4 py-1 tracking-tighter",
              getNestedCardBg(background, 'muted'),
              getNestedCardTextColor(background)
            )}>
              {step.step ?? `0${index + 1}`}
            </div>
            <div>
              {step.title &&
                (typeof step.title === "string" ? (
                  <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-3xl">
                    {step.title}
                  </h3>
                ) : (
                  <div className="mb-4">{step.title}</div>
                ))}
              {step.description &&
                (typeof step.description === "string" ? (
                  <p className="text-muted-foreground">{step.description}</p>
                ) : (
                  <div className="text-muted-foreground">{step.description}</div>
                ))}
            </div>
          </li>
        ))}
      </ul>
    );
  }, [stepsSlot, steps, background, stepsClassName, stepItemClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div
        className={cn(
          "grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20",
          contentClassName,
        )}
      >
        <div className="top-10 col-span-2 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
          <div className="relative w-fit text-5xl font-semibold tracking-tight lg:text-7xl">
            {resolvedHeading &&
              (typeof resolvedHeading === "string" ? (
                <h1 className={cn("w-fit", headingClassName)}>
                  {resolvedHeading}
                </h1>
              ) : (
                <div className={headingClassName}>{resolvedHeading}</div>
              ))}
            <DynamicIcon
              name="lucide/asterisk"
              size={40}
              className="absolute -top-2 -right-2 text-primary md:size-10 lg:-right-14"
            />
          </div>
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "text-base text-muted-foreground",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          {renderActions()}
        </div>
        {renderSteps}
      </div>
    </Section>
  );
}
