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
}

export function FaqCardCategories({
  heading,
  description,
  categories,
  categoriesSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  contentWrapperClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
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
          <Card
            key={categoryIndex}
            className={cn("bg-background", cardClassName)}
          >
            <CardHeader>
              {typeof category.title === "string" ? (
                <CardTitle className={categoryTitleClassName}>
                  {category.title}
                </CardTitle>
              ) : (
                <div className={categoryTitleClassName}>{category.title}</div>
              )}
            </CardHeader>
            <CardContent>
              <Accordion
                type="single"
                collapsible
                className={accordionClassName}
              >
                {category.items?.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className={accordionItemClassName}
                  >
                    <AccordionTrigger
                      className={cn(
                        "text-sm transition-opacity duration-200 hover:no-underline hover:opacity-60",
                        accordionTriggerClassName,
                      )}
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent
                      className={cn(
                        "text-muted-foreground text-sm",
                        accordionContentClassName,
                      )}
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
  }, [categoriesSlot, categories, gridClassName, cardClassName, categoryTitleClassName, accordionClassName, accordionItemClassName, accordionTriggerClassName, accordionContentClassName]);

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
            "relative rounded-lg bg-muted/50 p-8 md:p-12 lg:p-16",
            contentWrapperClassName,
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
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
          {categoriesContent}
        </div>
      </div>
    </Section>
  );
}
