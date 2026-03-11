"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";
import { BlockActions } from "@/components/ui/block-actions";

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
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for grid items
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

export function FaqNumberedGrid({
  sectionId = "faq-numbered-grid",
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
  headerClassName,
  contentClassName,
  actions,
  actionsSlot,
  actionsClassName,
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
          "mx-0 md:mx-auto",
          "max-w-full md:max-w-7xl",
          "grid gap-3 md:gap-6 grid-cols-1 md:grid-cols-2",
          gridClassName,
        )}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-4 rounded-lg border p-4 md:p-5",
              "bg-card text-card-foreground",
              itemClassName,
            )}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center",
                "rounded-lg text-md font-semibold shadow-lg",
                "bg-primary text-primary-foreground",
                numberClassName,
              )}
            >
              {index + 1}
            </span>
            <div className="flex flex-col items-start gap-2">
              {typeof item.question === "string" ? (
                <h3
                  className={cn(
                    "font-semibold text-base md:text-lg",
                    questionClassName,
                  )}
                >
                  {item.question}
                </h3>
              ) : (
                item.question
              )}
              {typeof item.answer === "string" ? (
                <p className={cn("text-sm md:text-base", answerClassName)}>
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
    gridClassName,
    itemClassName,
    numberClassName,
    questionClassName,
    answerClassName,
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
            "text-3xl font-semibold lg:text-5xl text-balance",
            heading,
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
            "text-md lg:text-lg text-balance",
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
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "flex flex-col items-center",
          "gap-6 md:gap-8",
          contentClassName,
        )}
      >
        <ContentGroup
          items={contentItems}
          className={cn(
            "mx-auto max-w-3xl",
            "flex flex-col items-start md:items-center",
            "text-left md:text-center",
            "gap-4 md:gap-6",
            headerClassName,
          )}
        />

        {itemsContent}

        <BlockActions
          actions={actions}
          actionsSlot={actionsSlot}
          actionsClassName={actionsClassName}
        />
      </div>
    </Section>
  );
}
