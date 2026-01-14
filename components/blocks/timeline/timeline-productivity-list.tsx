"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface TimelineProductivityItem {
  icon: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface TimelineProductivityListProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of productivity items
   */
  items?: TimelineProductivityItem[];
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
   * Additional CSS classes for the items container
   */
  itemsClassName?: string;
  /**
   * Additional CSS classes for individual items
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for item icons
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for item titles
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for item descriptions
   */
  descriptionClassName?: string;
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

export function TimelineProductivityList({
  heading,
  items,
  className,
  containerClassName,
  headingClassName,
  itemsClassName,
  itemClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
}: TimelineProductivityListProps) {
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
            {heading && (
              <h2 className={cn("text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl", headingClassName)}>
                {heading}
              </h2>
            )}
          </div>
        </div>

        {items && items.length > 0 && (
          <div className={cn("-mt-8 sm:-mt-12", itemsClassName)}>
            {items.map((item, index) => (
              <div
                key={index}
                className={cn("relative flex flex-col justify-center overflow-hidden border-b py-8 shadow-none sm:py-12", itemClassName)}
              >
                <div className="flex gap-4 sm:gap-6">
                  <div className={cn("shrink-0", iconClassName)}>
                    <DynamicIcon name={item.icon} size={48} />
                  </div>
                  <div>
                    <h4 className={cn("mb-2 text-2xl font-semibold text-primary sm:text-3xl", titleClassName)}>
                      {item.title}
                    </h4>
                    <p className={cn("mt-6 text-sm text-muted-foreground sm:text-base", descriptionClassName)}>
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
