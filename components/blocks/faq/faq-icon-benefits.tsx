"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";

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
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
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
          "mx-auto mt-10",
          "grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-3",
          "max-w-full md:max-w-7xl",
          gridClassName,
        )}
      >
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center",
              "gap-4 p-4 md:p-6 text-center",
              "shadow-md rounded-lg",
              "bg-card text-card-foreground",
              "ring-4 ring-primary",
              benefitCardClassName,
            )}
          >
            {benefit.icon && (
              <div
                className={cn(
                  "flex size-12 items-center",
                  "justify-center rounded-lg shadow-lg",
                  "bg-primary text-primary-foreground",
                  "mb-4",
                  iconWrapperClassName,
                )}
              >
                <DynamicIcon
                  name={benefit.icon}
                  className={cn("size-6", iconClassName)}
                />
              </div>
            )}
            {typeof benefit.title === "string" ? (
              <div
                className={cn(
                  "text-lg md:text-xl font-semibold text-pretty",
                  titleClassName,
                )}
              >
                {benefit.title}
              </div>
            ) : (
              benefit.title
            )}
            {typeof benefit.description === "string" ? (
              <p
                className={cn(
                  "text-sm md:text-base text-balance",
                  benefitDescriptionClassName,
                )}
              >
                {benefit.description}
              </p>
            ) : (
              benefit.description
            )}
          </div>
        ))}
      </div>
    );
  }, [
    benefitsSlot,
    benefits,
    gridClassName,
    benefitCardClassName,
    iconWrapperClassName,
    iconClassName,
    titleClassName,
    benefitDescriptionClassName,
    background,
  ]);

  const contentItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h2",
          className: cn(
            "mb-4 text-3xl font-semibold lg:text-4xl text-pretty",
            headingClassName,
          ),
          children: heading,
        });
      } else {
        items.push(heading);
      }
    }

    if (description) {
      if (typeof description === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: cn(
            "text-xl max-w-full md:max-w-md text-balance",
            descriptionClassName,
          ),
          children: description,
        });
      } else {
        items.push(description);
      }
    }

    return items;
  }, [heading, headingClassName, description, descriptionClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <ContentGroup
          className={cn(
            "mx-auto flex flex-col",
            "max-w-full md:max-w-3xl",
            "text-left md:text-center",
            "mb-12 md:mb-20",
            headerClassName,
          )}
          items={contentItems}
        />

        {benefitsContent}
      </div>
    </Section>
  );
}
