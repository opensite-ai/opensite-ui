"use client";

import * as React from "react";
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

const defaultItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is a FAQ?",
    answer:
      "A FAQ is a list of frequently asked questions and answers on a particular topic.",
  },
  {
    id: "faq-2",
    question: "What is the purpose of a FAQ?",
    answer:
      "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
  },
  {
    id: "faq-3",
    question: "How do I create a FAQ?",
    answer:
      "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
  },
  {
    id: "faq-4",
    question: "What are the benefits of a FAQ?",
    answer:
      "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
  },
  {
    id: "faq-5",
    question: "How should I organize my FAQ?",
    answer:
      "You should organize your FAQ in a logical manner, grouping related questions together and ordering them from most basic to more advanced topics.",
  },
  {
    id: "faq-6",
    question: "How long should FAQ answers be?",
    answer:
      "FAQ answers should be concise and to the point, typically a few sentences or a short paragraph is sufficient for most questions.",
  },
  {
    id: "faq-7",
    question: "Should I include links in my FAQ?",
    answer:
      "Yes, including links to more detailed information or related resources can be very helpful for users who want to learn more about a particular topic.",
  },
];

export function FaqRoundedCards({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = defaultItems,
  itemsSlot,
  background = "white",
  spacing = "lg",
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
  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <Accordion
        type="single"
        collapsible
        className={cn("space-y-4", accordionClassName)}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={cn(
              "rounded-lg bg-background px-4 border-none",
              accordionItemClassName
            )}
          >
            <AccordionTrigger
              className={cn(
                "font-semibold hover:no-underline",
                accordionTriggerClassName
              )}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className={cn("text-muted-foreground", accordionContentClassName)}
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
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
      <div className={containerClassName}>
        <div
          className={cn(
            "mx-auto flex max-w-3xl flex-col text-left md:text-center",
            headerClassName
          )}
        >
          {heading && (
            typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl",
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
              <p className={cn("text-muted-foreground lg:text-lg", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        <div
          className={cn(
            "mx-auto mt-10 max-w-3xl rounded-2xl bg-muted/50 p-6 md:p-8",
            cardsWrapperClassName
          )}
        >
          {renderItems()}
        </div>
      </div>
    </Section>
  );
}
