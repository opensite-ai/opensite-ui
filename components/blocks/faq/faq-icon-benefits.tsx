"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface FaqBenefit {
  icon: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface FaqIconBenefitsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of benefit items
   */
  benefits?: FaqBenefit[];
  /**
   * Custom slot for rendering benefits (overrides benefits array)
   */
  benefitsSlot?: React.ReactNode;
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
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
   * Additional CSS classes for the benefits grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for benefit cards
   */
  benefitCardClassName?: string;
  /**
   * Additional CSS classes for benefit icons wrapper
   */
  iconWrapperClassName?: string;
  /**
   * Additional CSS classes for benefit icons
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for benefit titles
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for benefit descriptions
   */
  benefitDescriptionClassName?: string;
}

export function FaqIconBenefits({
  heading,
  description,
  benefits,
  benefitsSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  benefitCardClassName,
  iconWrapperClassName,
  iconClassName,
  titleClassName,
  benefitDescriptionClassName,
}: FaqIconBenefitsProps) {
  const benefitsContent = useMemo(() => {
    if (benefitsSlot) return benefitsSlot;
    if (!benefits || benefits.length === 0) return null;

    return (
      <div
        className={cn(
          "mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center gap-4 rounded-lg border p-6 text-center",
              benefitCardClassName,
            )}
          >
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-full bg-primary/10",
                iconWrapperClassName,
              )}
            >
              <DynamicIcon
                name={benefit.icon}
                className={cn("size-6 text-primary", iconClassName)}
              />
            </div>
            {typeof benefit.title === "string" ? (
              <h3 className={cn("text-lg font-semibold", titleClassName)}>
                {benefit.title}
              </h3>
            ) : (
              <div className={titleClassName}>{benefit.title}</div>
            )}
            {typeof benefit.description === "string" ? (
              <p
                className={cn(
                  "text-muted-foreground text-sm",
                  benefitDescriptionClassName,
                )}
              >
                {benefit.description}
              </p>
            ) : (
              <div className={benefitDescriptionClassName}>
                {benefit.description}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }, [benefitsSlot, benefits, gridClassName, benefitCardClassName, iconWrapperClassName, iconClassName, titleClassName, benefitDescriptionClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={containerClassName}>
        <div
          className={cn(
            "mx-auto flex max-w-3xl flex-col text-left md:text-center",
            headerClassName,
          )}
        >
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl",
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
                  "text-muted-foreground lg:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>
        {benefitsContent}
      </div>
    </Section>
  );
}
