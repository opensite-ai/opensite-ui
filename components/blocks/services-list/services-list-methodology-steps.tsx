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
 * Step item configuration for methodology steps display
 */
export interface ServicesListMethodologyStepsStep {
  /**
   * Step number (e.g., "01", "02")
   */
  number?: React.ReactNode;
  /**
   * Step title
   */
  title?: React.ReactNode;
  /**
   * Step description
   */
  description?: React.ReactNode;
  /**
   * List of options/deliverables for this step
   */
  options?: React.ReactNode[];
  /**
   * Additional CSS classes for the step
   */
  className?: string;
}

export interface ServicesListMethodologyStepsProps {
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
  steps?: ServicesListMethodologyStepsStep[];
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
   * Additional CSS classes for each step card
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ServicesListMethodologySteps - A structured methodology layout displaying numbered service steps with options.
 * Each step features a large number, title, description, and a list of included options/deliverables.
 * Perfect for showcasing a process, workflow, or methodology with clear sequential steps.
 *
 * @example
 * ```tsx
 * <ServicesListMethodologySteps
 *   heading="Our Methodology"
 *   description="A proven process that delivers results."
 *   primaryAction={{ label: "Start Your Project", href: "#" }}
 *   steps={[{ number: "01", title: "Discovery", description: "Understanding your business" }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListMethodologySteps({
  sectionId = "services-list-methodology-steps",
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
}: ServicesListMethodologyStepsProps): React.JSX.Element {
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
      <div className={cn("space-y-12", stepsClassName)}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "group relative grid gap-6 md:grid-cols-[100px_1fr] md:gap-8",
              stepClassName,
              step.className,
            )}
          >
            <div className="flex items-start">
              {step.number &&
                (typeof step.number === "string" ? (
                  <span
                    className={cn(
                      "text-5xl font-bold text-primary/20 transition-colors group-hover:text-primary/40 md:text-6xl",
                      numberClassName,
                    )}
                  >
                    {step.number}
                  </span>
                ) : (
                  <div className={numberClassName}>{step.number}</div>
                ))}
            </div>
            <div className="space-y-4">
              {step.title &&
                (typeof step.title === "string" ? (
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                ) : (
                  <div className="text-2xl font-bold">{step.title}</div>
                ))}
              {step.description &&
                (typeof step.description === "string" ? (
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                ) : (
                  <div className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </div>
                ))}
              {step.options && step.options.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {step.options.map((option, optionIndex) => (
                    <span
                      key={optionIndex}
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
                      {typeof option === "string" ? (
                        option
                      ) : (
                        <span>{option}</span>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-[50px] top-20 hidden h-[calc(100%-20px)] w-px bg-border md:block" />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Section
      id={sectionId}
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
