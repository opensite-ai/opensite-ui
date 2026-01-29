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

export interface FaqNumberedGridProps {
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
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for grid items
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for the number badge
   */
  numberClassName?: string;
  /**
   * Additional CSS classes for item questions
   */
  questionClassName?: string;
  /**
   * Additional CSS classes for item answers
   */
  answerClassName?: string;
}

export function FaqNumberedGrid({
  heading,
  description,
  items,
  itemsSlot,
  background,
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  itemClassName,
  numberClassName,
  questionClassName,
  answerClassName,
}: FaqNumberedGridProps) {
  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <div
        className={cn(
          "mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-2",
          gridClassName,
        )}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-4 rounded-lg border p-4 md:p-5",
              itemClassName,
            )}
          >
            <span
              className={cn(
                "bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg text-md font-semibold",
                numberClassName,
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
                    answerClassName,
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
  }, [
    itemsSlot,
    items,
    gridClassName,
    itemClassName,
    numberClassName,
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
        {itemsContent}
      </div>
    </Section>
  );
}
