"use client";

import * as React from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  ActionConfig,
} from "../../../src/types";

/**
 * Step item configuration for numbered steps display
 */
export interface ServicesListNumberedStepsStep {
  /**
   * Step title
   */
  title?: React.ReactNode;
  /**
   * Step description
   */
  description?: React.ReactNode;
  /**
   * List of items/deliverables for this step
   */
  items?: React.ReactNode[];
  /**
   * Additional CSS classes for the step
   */
  className?: string;
}

export interface ServicesListNumberedStepsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Primary CTA configuration
   */
  primaryAction?: ActionConfig;
  /**
   * Custom slot for actions (overrides primaryAction)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of step configurations
   */
  steps?: ServicesListNumberedStepsStep[];
  /**
   * Custom slot for rendering steps (overrides steps array)
   */
  stepsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the steps container
   */
  stepsClassName?: string;
  /**
   * Additional CSS classes for each step
   */
  stepClassName?: string;
  /**
   * Additional CSS classes for the step number
   */
  numberClassName?: string;
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
}

/**
 * ServicesListNumberedSteps - A numbered steps layout displaying services as a sequential process.
 * Each step features a large number, title, description, and optional items list.
 * Connected by a vertical line to show progression. Perfect for showcasing a workflow,
 * process, or methodology with clear sequential steps and deliverables.
 *
 * @example
 * ```tsx
 * <ServicesListNumberedSteps
 *   heading="Our Process"
 *   description="A proven methodology that delivers results."
 *   primaryAction={{ label: "Start Your Project", href: "#" }}
 *   steps={[{ title: "Discovery", description: "Understanding your business" }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListNumberedSteps({
  heading,
  description,
  primaryAction,
  actionsSlot,
  steps,
  stepsSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  stepsClassName,
  stepClassName,
  numberClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ServicesListNumberedStepsProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!primaryAction) return null;

    return (
      <div className="text-center">
        <Pressable
          href={primaryAction.href}
          onClick={primaryAction.onClick}
          variant="default"
          size="lg"
          asButton
        >
          {primaryAction.label}
          <DynamicIcon name="lucide/arrow-right" className="ml-2 h-4 w-4" />
        </Pressable>
      </div>
    );
  };

  const renderSteps = () => {
    if (stepsSlot) return stepsSlot;
    if (!steps || steps.length === 0) return null;

    return (
      <div className="relative">
        <div className="absolute left-8 top-0 hidden h-full w-px bg-border md:block" />
        <div className={cn("space-y-12", stepsClassName)}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "relative flex gap-8",
                stepClassName,
                step.className,
              )}
            >
              <div
                className={cn(
                  "relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-2xl font-bold text-primary",
                  numberClassName,
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 pt-3">
                {step.title &&
                  (typeof step.title === "string" ? (
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  ) : (
                    <div className="text-xl font-bold">{step.title}</div>
                  ))}
                {step.description &&
                  (typeof step.description === "string" ? (
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  ) : (
                    <div className="mt-2 text-muted-foreground leading-relaxed">
                      {step.description}
                    </div>
                  ))}
                {step.items && step.items.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className={cn(
                          "inline-flex items-center rounded-full border border-border px-3 py-1 text-sm",
                          getNestedCardBg(background, 'subtle'),
                          getNestedCardTextColor(background),
                        )}
                      >
                        <DynamicIcon
                          name="lucide/check"
                          className="mr-1.5 h-3.5 w-3.5 text-primary"
                        />
                        {typeof item === "string" ? item : <span>{item}</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("mx-auto max-w-4xl space-y-16", containerClassName)}>
        <div className={cn("space-y-4 text-center", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-semibold tracking-tight md:text-4xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>
        {renderSteps()}
        {renderActions()}
      </div>
    </Section>
  );
}
