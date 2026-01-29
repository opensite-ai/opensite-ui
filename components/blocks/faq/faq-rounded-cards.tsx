"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface FaqItem {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface FaqRoundedCardsProps {
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
   * Additional CSS classes for the cards wrapper
   */
  cardsWrapperClassName?: string;
  /**
   * Additional CSS classes for the accordion
   */
  accordionClassName?: string;
  /**
   * Additional CSS classes for accordion items
   */
  accordionItemClassName?: string;
  /**
   * Additional CSS classes for accordion triggers
   */
  accordionTriggerClassName?: string;
  /**
   * Additional CSS classes for accordion content
   */
  accordionContentClassName?: string;
}

export function FaqRoundedCards({
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
  cardsWrapperClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
}: FaqRoundedCardsProps) {
  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <Accordion
        type="single"
        collapsible
        className={cn("space-y-3", accordionClassName)}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={cn(
              "rounded-xl border border-border/60 px-5 shadow-sm transition-shadow hover:shadow-md data-[state=open]:shadow-md",
              accordionItemClassName,
            )}
          >
            <AccordionTrigger
              className={cn(
                "py-4 font-medium transition-opacity hover:no-underline hover:opacity-70 lg:text-lg [&[data-state=open]>svg]:rotate-180",
                accordionTriggerClassName,
              )}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className={cn("pb-4 ", accordionContentClassName)}
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }, [
    itemsSlot,
    items,
    accordionClassName,
    accordionItemClassName,
    accordionTriggerClassName,
    accordionContentClassName,
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
              <p className={cn("lg:text-lg", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>
        <div className={cn("mx-auto mt-10 max-w-3xl", cardsWrapperClassName)}>
          {itemsContent}
        </div>
      </div>
    </Section>
  );
}
