"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface FaqItem {
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface FaqNumberedListProps {
  /**
   * Badge text above heading
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of FAQ items
   */
  items?: FaqItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
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
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the items wrapper
   */
  itemsWrapperClassName?: string;
  /**
   * Additional CSS classes for individual items
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for the number badge
   */
  numberClassName?: string;
  /**
   * Additional CSS classes for questions
   */
  questionClassName?: string;
  /**
   * Additional CSS classes for answers
   */
  answerClassName?: string;
}

export function FaqNumberedList({
  badge,
  heading,
  description,
  items,
  itemsSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  itemsWrapperClassName,
  itemClassName,
  numberClassName,
  questionClassName,
  answerClassName,
}: FaqNumberedListProps) {
  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-10 w-full max-w-3xl space-y-4 text-left",
          itemsWrapperClassName
        )}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-4 rounded-lg border p-4 md:p-5",
              itemClassName
            )}
          >
            <span
              className={cn(
                "bg-secondary flex size-6 shrink-0 items-center justify-center rounded-sm text-xs font-medium",
                numberClassName
              )}
            >
              {index + 1}
            </span>
            <div>
              <div className="mb-1 flex items-center justify-between">
                {typeof item.question === "string" ? (
                  <h3 className={cn("font-medium", questionClassName)}>
                    {item.question}
                  </h3>
                ) : (
                  <div className={questionClassName}>{item.question}</div>
                )}
              </div>
              {typeof item.answer === "string" ? (
                <p
                  className={cn(
                    "text-muted-foreground text-sm",
                    answerClassName
                  )}
                >
                  {item.answer}
                </p>
              ) : (
                <div className={answerClassName}>{item.answer}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div
        className={cn(
          "container flex flex-col items-center text-center",
          containerClassName
        )}
      >
        {badge && (
          typeof badge === "string" ? (
            <Badge variant="outline" className={badgeClassName}>
              {badge}
            </Badge>
          ) : (
            <div className={badgeClassName}>{badge}</div>
          )
        )}
        {heading && (
          typeof heading === "string" ? (
            <h2
              className={cn(
                "mt-4 text-3xl font-semibold md:text-4xl",
                headingClassName
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p
              className={cn(
                "text-muted-foreground mt-6 max-w-xl text-base md:text-lg",
                descriptionClassName
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {renderItems()}
      </div>
    </Section>
  );
}
