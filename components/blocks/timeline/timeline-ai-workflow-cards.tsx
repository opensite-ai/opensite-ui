"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface TimelineAIWorkflowItem {
  icon: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface TimelineAIWorkflowCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading text below the heading
   */
  subheading?: React.ReactNode;
  /**
   * Array of workflow items
   */
  items?: TimelineAIWorkflowItem[];
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
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the items container
   */
  itemsClassName?: string;
  /**
   * Additional CSS classes for individual cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for card icons
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for card titles
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for card descriptions
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the step number
   */
  stepNumberClassName?: string;
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

export function TimelineAIWorkflowCards({
  heading,
  subheading = "Seamlessly integrate AI into your workflows. Automate tasks, enhance efficiency, and stay ahead.",
  items,
  className,
  containerClassName,
  headingClassName,
  subheadingClassName,
  itemsClassName,
  cardClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
  stepNumberClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
}: TimelineAIWorkflowCardsProps) {
  const defaultHeading = (
    <>
      Unlock{" "}
      <span className="relative inline-block">
        <span className="text-muted-foreground">AI</span>
        <DynamicIcon
          name="lucide/sparkles"
          size={20}
          className="absolute -top-2 -right-4 fill-yellow-500 stroke-none"
        />
      </span>
      <br />
      for your existing workflows
    </>
  );

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
      <div className={cn("grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16", containerClassName)}>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="max-w-lg">
            <h2 className={cn("text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl", headingClassName)}>
              {heading || defaultHeading}
            </h2>
            <p className={cn("mt-12 text-base text-muted-foreground", subheadingClassName)}>
              {subheading}
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <div className={cn("-mt-8 sm:-mt-12", itemsClassName)}>
            {items.map((item, index) => (
              <div
                key={index}
                className={cn("relative my-12 overflow-hidden rounded-lg bg-muted px-8 py-16 shadow-none sm:px-12 sm:py-24 lg:px-16 lg:py-32", cardClassName)}
              >
                <div className="gap-4 sm:gap-6">
                  <div className={cn("block shrink-0", iconClassName)}>
                    <DynamicIcon name={item.icon} size={48} />
                  </div>
                  <div className={cn("absolute top-12 right-12 font-mono text-5xl", stepNumberClassName)}>
                    0{index + 1}
                  </div>
                  <div className="mt-6">
                    <h4 className={cn("mb-2 text-2xl font-semibold text-primary", titleClassName)}>
                      {item.title}
                    </h4>
                    <p className={cn("mt-6 text-xs text-muted-foreground sm:text-base", descriptionClassName)}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
