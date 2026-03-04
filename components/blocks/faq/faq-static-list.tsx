"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";

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
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
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
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

export function FaqStaticList({
  headerClassName,
  heading,
  headingClassName,
  description,
  descriptionClassName,
  items,
  itemsSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
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
          <div
            key={index}
            className={cn("border-b border-border/30 pb-8", itemClassName)}
          >
            {typeof item.question === "string" ? (
              <div
                className={cn(
                  "text-lg md:text-xl mb-4 font-medium",
                  questionClassName,
                )}
              >
                {item.question}
              </div>
            ) : (
              item.question
            )}
            {typeof item.answer === "string" ? (
              <p className={cn("leading-normal", answerClassName)}>
                {item.answer}
              </p>
            ) : (
              item.answer
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
            "text-lg md:text-xl max-w-full md:max-w-md text-balance opacity-75",
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
      <div className="flex flex-col items-start gap-8 md:gap-12">
        <div className="max-w-full md:max-w-3xl space-y-12 md:space-y-16">
          <ContentGroup
            className={cn(
              "flex flex-col items-start",
              "text-left",
              headerClassName,
            )}
            items={contentItems}
          />
          {itemsContent}
        </div>
      </div>
    </Section>
  );
}
