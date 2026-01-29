"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Input } from "../../ui/input";
import type {ActionConfig, StatItem, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface HeroNewsletterMinimalProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Email input placeholder text
   */
  inputPlaceholder?: string;
  /**
   * Submit button configuration
   */
  submitAction?: ActionConfig;
  /**
   * Custom slot for the form (overrides default input + button)
   */
  formSlot?: React.ReactNode;
  /**
   * Disclaimer text below form
   */
  disclaimer?: React.ReactNode;
  /**
   * Array of stat/trust indicators
   */
  stats?: StatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;  /**
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the form container
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the input
   */
  inputClassName?: string;
  /**
   * Additional CSS classes for the disclaimer
   */
  disclaimerClassName?: string;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
}

export function HeroNewsletterMinimal({
  heading,
  description,
  inputPlaceholder = "Enter your email",
  submitAction,
  formSlot,
  disclaimer = "Free forever. No spam. Unsubscribe anytime.",
  stats,
  statsSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  formClassName,
  inputClassName,
  disclaimerClassName,
  statsClassName,
}: HeroNewsletterMinimalProps): React.JSX.Element {
  const renderStats = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <div key={index} className={cn("flex items-center gap-2 text-sm text-muted-foreground", stat.className)}>
        {stat.icon}
        <span>{stat.value}</span>
      </div>
    ));
  }, [statsSlot, stats]);

  const renderForm = useMemo(() => {
    if (formSlot) return formSlot;
    if (!submitAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = submitAction;

    return (
      <>
        <Input
          type="email"
          placeholder={inputPlaceholder}
          className={cn("h-12 flex-1", inputClassName)}
        />
        <Pressable
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
      </>
    );
  }, [formSlot, submitAction, inputPlaceholder, inputClassName]);

  return (
    <Section
      className={cn(
        "relative min-h-[80vh] bg-background py-32",
        className,
      )}
    >
      <div className={cn("container flex flex-col items-center justify-center text-center", containerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("max-w-3xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mt-6 max-w-xl text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        <div className={cn("mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row", formClassName)}>
          {renderForm}
        </div>
        {disclaimer && (
          typeof disclaimer === "string" ? (
            <p className={cn("mt-4 text-sm text-muted-foreground", disclaimerClassName)}>
              {disclaimer}
            </p>
          ) : (
            <div className={disclaimerClassName}>{disclaimer}</div>
          )
        )}
        {(statsSlot || (stats && stats.length > 0)) && (
          <div className={cn("mt-16 flex flex-wrap items-center justify-center gap-8", statsClassName)}>
            {renderStats}
          </div>
        )}
      </div>
    </Section>
  );
}
