"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface FaqItem {
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface FaqStaticListProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the items wrapper
   */
  itemsWrapperClassName?: string;
  /**
   * Additional CSS classes for individual items
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for questions
   */
  questionClassName?: string;
  /**
   * Additional CSS classes for answers
   */
  answerClassName?: string;
}

export function FaqStaticList({
  heading,
  items,
  itemsSlot,
  background,
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  headingClassName,
  itemsWrapperClassName,
  itemClassName,
  questionClassName,
  answerClassName,
}: FaqStaticListProps) {
  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <div className={cn("space-y-8", itemsWrapperClassName)}>
        {items.map((item, index) => (
          <div key={index} className={cn("border-b pb-6", itemClassName)}>
            {typeof item.question === "string" ? (
              <h3 className={cn("mb-2 font-semibold", questionClassName)}>
                {item.question}
              </h3>
            ) : (
              <div className={questionClassName}>{item.question}</div>
            )}
            {typeof item.answer === "string" ? (
              <p className={cn("leading-snug", answerClassName)}>
                {item.answer}
              </p>
            ) : (
              <div className={answerClassName}>{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    );
  }, [
    itemsSlot,
    items,
    itemsWrapperClassName,
    itemClassName,
    questionClassName,
    answerClassName,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("container max-w-3xl", containerClassName)}>
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "mb-4 text-3xl font-semibold md:mb-11 md:text-4xl",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}
        {itemsContent}
      </div>
    </Section>
  );
}
