"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
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

export interface FaqCardCategoriesProps {
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
   * Additional CSS classes for the content wrapper
   */
  contentWrapperClassName?: string;
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
   * Additional CSS classes for category cards
   */
  cardClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

export function FaqCardCategories({
  sectionId = "faq-card-categories",
  headerClassName,
  heading,
  headingClassName,
  description,
  descriptionClassName,
  categories,
  categoriesSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  contentWrapperClassName,
  gridClassName,
  cardClassName,
  categoryTitleClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
}: FaqCardCategoriesProps) {
  const categoriesContent = useMemo(() => {
    if (categoriesSlot) return categoriesSlot;
    if (!categories || categories.length === 0) return null;

    return (
      <div
        className={cn(
          "mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {categories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className={cardClassName}>
            <CardHeader>
              {typeof category.title === "string" ? (
                <CardTitle
                  className={cn(
                    "leading-none font-bold opacity-60 uppercase text-sm tracking-widest",
                    categoryTitleClassName,
                  )}
                >
                  {category.title}
                </CardTitle>
              ) : (
                category.title
              )}
            </CardHeader>
            <CardContent>
              <Accordion
                type="single"
                collapsible
                className={accordionClassName}
              >
                {category.items?.map((item, index) => (
                  <AccordionItem
                    key={item.id || index}
                    value={item.id || `faq-item-${index}`}
                    className={cn(
                      categories?.length === index + 1 && "border-b-0",
                      accordionItemClassName,
                    )}
                  >
                    <AccordionTrigger
                      className={cn(
                        "text-sm transition-opacity",
                        "duration-200 hover:no-underline hover:opacity-60",
                        "text-lg",
                        accordionTriggerClassName,
                      )}
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent
                      className={cn("text-base", accordionContentClassName)}
                    >
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }, [
    categoriesSlot,
    categories,
    gridClassName,
    cardClassName,
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
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className={cn("relative", contentWrapperClassName)}>
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
