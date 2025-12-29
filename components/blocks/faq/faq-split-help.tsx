"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing, ActionConfig } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface FaqItem {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface FaqSplitHelpProps {
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
   * Help section heading
   */
  helpHeading?: React.ReactNode;
  /**
   * Help section description
   */
  helpDescription?: React.ReactNode;
  /**
   * Help section CTA configuration
   */
  helpAction?: ActionConfig;
  /**
   * Custom slot for help section (overrides helpHeading, helpDescription, helpAction)
   */
  helpSlot?: React.ReactNode;
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
   * Additional CSS classes for the left column
   */
  leftColumnClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
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
  /**
   * Additional CSS classes for the help section
   */
  helpSectionClassName?: string;
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

const defaultHelpAction: ActionConfig = {
  label: "Contact Support",
  href: "#",
};

export function FaqSplitHelp({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = defaultItems,
  itemsSlot,
  helpHeading = "Still have questions?",
  helpDescription = "Can't find the answer you're looking for? Our support team is here to help.",
  helpAction = defaultHelpAction,
  helpSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  leftColumnClassName,
  headingClassName,
  descriptionClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
  helpSectionClassName,
}: FaqSplitHelpProps) {
  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <Accordion
        type="single"
        collapsible
        className={cn("lg:w-2/3", accordionClassName)}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={accordionItemClassName}
          >
            <AccordionTrigger
              className={cn(
                "transition-opacity duration-200 hover:no-underline hover:opacity-60",
                accordionTriggerClassName
              )}
            >
              <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                {item.question}
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={cn("sm:mb-1 lg:mb-2", accordionContentClassName)}
            >
              <div className="text-muted-foreground lg:text-lg">
                {item.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const renderHelpSection = () => {
    if (helpSlot) return helpSlot;

    return (
      <div
        className={cn(
          "mt-16 flex flex-col items-center gap-4 rounded-lg bg-accent p-6 text-center md:flex-row md:justify-between md:text-left lg:p-8",
          helpSectionClassName
        )}
      >
        <div>
          {helpHeading && (
            typeof helpHeading === "string" ? (
              <h3 className="text-lg font-semibold">{helpHeading}</h3>
            ) : (
              helpHeading
            )
          )}
          {helpDescription && (
            typeof helpDescription === "string" ? (
              <p className="text-muted-foreground mt-1">{helpDescription}</p>
            ) : (
              helpDescription
            )
          )}
        </div>
        {helpAction && (
          <Pressable
            href={helpAction.href}
            onClick={helpAction.onClick}
            variant={helpAction.variant}
            size={helpAction.size}
            className={helpAction.className}
          >
            {helpAction.children ?? helpAction.label}
          </Pressable>
        )}
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
      <div className={containerClassName}>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className={cn("lg:w-1/3", leftColumnClassName)}>
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
          {renderItems()}
        </div>
        {renderHelpSection()}
      </div>
    </Section>
  );
}
