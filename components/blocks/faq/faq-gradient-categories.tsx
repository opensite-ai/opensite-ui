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

export interface FaqCategory {
  title: React.ReactNode;
  items: FaqItem[];
}

export interface FaqGradientCategoriesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of FAQ categories
   */
  categories?: FaqCategory[];
  /**
   * Custom slot for rendering categories (overrides categories array)
   */
  categoriesSlot?: React.ReactNode;
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
   * Additional CSS classes for the gradient wrapper
   */
  gradientWrapperClassName?: string;
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
   * Additional CSS classes for the categories grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for category titles
   */
  categoryTitleClassName?: string;
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

const defaultCategories: FaqCategory[] = [
  {
    title: "General",
    items: [
      {
        id: "general-1",
        question: "What is a FAQ?",
        answer:
          "A FAQ is a list of frequently asked questions and answers on a particular topic.",
      },
      {
        id: "general-2",
        question: "What is the purpose of a FAQ?",
        answer:
          "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
      },
      {
        id: "general-3",
        question: "How do I create a FAQ?",
        answer:
          "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
      },
    ],
  },
  {
    title: "Billing",
    items: [
      {
        id: "billing-1",
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.",
      },
      {
        id: "billing-2",
        question: "Can I get a refund?",
        answer:
          "Yes, we offer a 30-day money-back guarantee for all our plans. If you're not satisfied, contact our support team for a full refund.",
      },
      {
        id: "billing-3",
        question: "How do I cancel my subscription?",
        answer:
          "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
      },
    ],
  },
];

export function FaqGradientCategories({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  categories = defaultCategories,
  categoriesSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  gradientWrapperClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  categoryTitleClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
}: FaqGradientCategoriesProps) {
  const renderCategories = () => {
    if (categoriesSlot) return categoriesSlot;
    if (!categories || categories.length === 0) return null;

    return (
      <div
        className={cn(
          "mx-auto mt-10 grid max-w-7xl gap-10 md:grid-cols-2",
          gridClassName
        )}
      >
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            {typeof category.title === "string" ? (
              <h3
                className={cn(
                  "mb-4 text-xl font-semibold",
                  categoryTitleClassName
                )}
              >
                {category.title}
              </h3>
            ) : (
              <div className={categoryTitleClassName}>{category.title}</div>
            )}
            <Accordion
              type="single"
              collapsible
              className={accordionClassName}
            >
              {category.items.map((item) => (
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
      <div className={containerClassName}>
        <div
          className={cn(
            "rounded-lg bg-linear-to-b from-muted/50 to-muted p-8 md:p-12 lg:p-16",
            gradientWrapperClassName
          )}
        >
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
          {renderCategories()}
        </div>
      </div>
    </Section>
  );
}
