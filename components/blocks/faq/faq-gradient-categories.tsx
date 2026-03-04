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
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";

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

export function FaqGradientCategories({
  heading,
  description,
  categories,
  categoriesSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
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
  const categoriesContent = useMemo(() => {
    if (categoriesSlot) return categoriesSlot;
    if (!categories || categories.length === 0) return null;

    return (
      <div
        className={cn(
          "mx-auto mt-10 grid max-w-7xl gap-10 md:grid-cols-2",
          gridClassName,
        )}
      >
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            {typeof category.title === "string" ? (
              <h3
                className={cn(
                  "mb-4 text-xl font-semibold",
                  categoryTitleClassName,
                )}
              >
                {category.title}
              </h3>
            ) : (
              <div className={categoryTitleClassName}>{category.title}</div>
            )}
            <Accordion type="single" collapsible className={accordionClassName}>
              {category.items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className={accordionItemClassName}
                >
                  <AccordionTrigger
                    className={cn(
                      "transition-opacity",
                      "hover:no-underline hover:opacity-75",
                      "cursor-pointer duration-200",
                      accordionTriggerClassName,
                    )}
                  >
                    <div className="font-medium py-1 md:py-2 text-lg">
                      {item.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    className={cn("mb-1 md:mb-2", accordionContentClassName)}
                  >
                    <div className="text-lg">{item.answer}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    );
  }, [
    categoriesSlot,
    categories,
    gridClassName,
    categoryTitleClassName,
    accordionClassName,
    accordionItemClassName,
    accordionTriggerClassName,
    accordionContentClassName,
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
            "text-xl max-w-full md:max-w-md text-balance",
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
      <div className="relative">
        <div
          className={cn(
            "rounded-lg bg-card text-card-foreground p-8 md:p-12 lg:p-16",
            gradientWrapperClassName,
          )}
        >
          <ContentGroup
            className={cn(
              "mx-auto flex flex-col",
              "max-w-full md:max-w-3xl",
              "text-left md:text-center",
              "mb-12 md:mb-20",
              headerClassName,
            )}
            items={contentItems}
          />
          {categoriesContent}
        </div>
      </div>
    </Section>
  );
}
