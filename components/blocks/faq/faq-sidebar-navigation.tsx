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
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  categories,
  categoriesSlot,
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
  const [activeCategory, setActiveCategory] = React.useState(
    categories?.[0]?.id || ""
  );

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`faq-category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderCategories = () => {
    if (categoriesSlot) return categoriesSlot;
    if (!categories || categories.length === 0) return null;

    return (
      <div className={cn("space-y-10 lg:w-3/4", categoriesWrapperClassName)}>
        {categories.map((category) => (
          <div
            key={category.id}
            id={`faq-category-${category.id}`}
            className="scroll-mt-24"
          >
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
            "mx-auto mt-10 flex max-w-7xl flex-col gap-10 lg:flex-row lg:gap-16",
            contentWrapperClassName
          )}
        >
          <nav className={cn("lg:w-1/4", navClassName)}>
            <div className="sticky top-24 space-y-2">
              {categories?.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={cn(
                    "w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors",
                    activeCategory === category.id
                      ? cn("bg-primary text-primary-foreground", navButtonActiveClassName)
                      : cn("hover:bg-muted", navButtonClassName)
                  )}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </nav>
          {renderCategories()}
        </div>
      </div>
    </Section>
  );
}
