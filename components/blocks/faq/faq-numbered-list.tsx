"use client";

import * as React from "react";
import { useMemo } from "react";
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
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  itemsWrapperClassName,
  itemClassName,
  numberClassName,
  questionClassName,
  answerClassName,
}: FaqNumberedListProps) {
  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-8 md:mt-12 w-full max-w-3xl space-y-12 text-left",
          itemsWrapperClassName,
        )}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-4 p-4 md:p-6",
              "bg-card text-card-foreground",
              "ring-4 ring-primary",
              "rounded-xl shadow-2xl",
              itemClassName,
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center",
                "rounded-xl shadow-lg",
                "bg-primary text-primary-foreground",
                "text-base font-semibold",
                "size-10 shrink-0",
                "text-center",
                numberClassName,
              )}
            >
              {index + 1}
            </span>
            <div className="space-y-2 mt-2">
              {typeof item.question === "string" ? (
                <div
                  className={cn(
                    "font-semibold text-lg leading-snug",
                    questionClassName,
                  )}
                >
                  {item.question}
                </div>
              ) : (
                item.question
              )}
              {typeof item.answer === "string" ? (
                <p className={cn("text-base", answerClassName)}>
                  {item.answer}
                </p>
              ) : (
                item.answer
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }, [
    itemsSlot,
    items,
    itemsWrapperClassName,
    itemClassName,
    numberClassName,
    questionClassName,
    answerClassName,
    background,
  ]);

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
      <div className="flex flex-col items-center">
        <div className="max-w-full md:max-w-3xl flex flex-col items-center gap-4">
          {badge &&
            (typeof badge === "string" ? (
              <Badge className={badgeClassName}>{badge}</Badge>
            ) : (
              badge
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-2xl md:text-4xl lg:text-5xl",
                  "font-semibold text-pretty text-center",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              heading
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "text-balance text-base md:text-lg text-center",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}
          {itemsContent}
        </div>
      </div>
    </Section>
  );
}
