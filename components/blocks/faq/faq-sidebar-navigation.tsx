"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor } from "../../../lib/utils";
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
  id: string;
  title: React.ReactNode;
  items: FaqItem[];
}

export interface FaqSidebarNavigationProps {
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
   * Additional CSS classes for the content wrapper
   */
  contentWrapperClassName?: string;
  /**
   * Additional CSS classes for the navigation
   */
  navClassName?: string;
  /**
   * Additional CSS classes for navigation buttons
   */
  navButtonClassName?: string;
  /**
   * Additional CSS classes for active navigation button
   */
  navButtonActiveClassName?: string;
  /**
   * Additional CSS classes for the categories wrapper
   */
  categoriesWrapperClassName?: string;
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

export function FaqSidebarNavigation({
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
  headerClassName,
  headingClassName,
  descriptionClassName,
  contentWrapperClassName,
  navClassName,
  navButtonClassName,
  navButtonActiveClassName,
  categoriesWrapperClassName,
  categoryTitleClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
}: FaqSidebarNavigationProps) {
  // Default to "all" when multiple categories exist, otherwise first category
  const [activeCategory, setActiveCategory] = React.useState(
    categories && categories.length > 1 ? "all" : (categories?.[0]?.id || ""),
  );

  // Filter categories based on active selection
  const filteredCategories = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    if (activeCategory === "all") return categories;
    return categories.filter((category) => category.id === activeCategory);
  }, [categories, activeCategory]);

  const categoriesContent = useMemo(() => {
    if (categoriesSlot) return categoriesSlot;
    if (filteredCategories.length === 0) return null;

    return (
      <div className={cn("space-y-10 lg:w-3/4", categoriesWrapperClassName)}>
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            id={`faq-category-${category.id}`}
            className="scroll-mt-24"
          >
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
                      "transition-opacity duration-200 hover:no-underline hover:opacity-60",
                      accordionTriggerClassName,
                    )}
                  >
                    <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                      {item.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    className={cn("sm:mb-1 lg:mb-2", accordionContentClassName)}
                  >
                    <div className={cn(getTextColor(background, "muted"), "lg:text-lg")}>
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
  }, [categoriesSlot, filteredCategories, categoriesWrapperClassName, categoryTitleClassName, accordionClassName, accordionItemClassName, accordionTriggerClassName, accordionContentClassName, background]);

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
                  getTextColor(background, "muted"),
                  "lg:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>
        <div
          className={cn(
            "mx-auto mt-10 flex max-w-7xl flex-col gap-10 lg:flex-row lg:gap-16",
            contentWrapperClassName,
          )}
        >
          <nav className={cn("lg:w-1/4", navClassName)}>
            <div className="sticky top-24 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
              {/* Show "All" tab when more than one category exists */}
              {categories && categories.length > 1 && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors lg:w-full",
                    activeCategory === "all"
                      ? cn(
                          "bg-primary text-primary-foreground",
                          navButtonActiveClassName,
                        )
                      : cn("hover:bg-muted", navButtonClassName),
                  )}
                >
                  All
                </button>
              )}
              {categories?.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors lg:w-full",
                    activeCategory === category.id
                      ? cn(
                          "bg-primary text-primary-foreground",
                          navButtonActiveClassName,
                        )
                      : cn("hover:bg-muted", navButtonClassName),
                  )}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </nav>
          {categoriesContent}
        </div>
      </div>
    </Section>
  );
}
