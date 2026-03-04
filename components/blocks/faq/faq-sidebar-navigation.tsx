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
  headerClassName,
  headingClassName,
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
    categories && categories.length > 1 ? "all" : categories?.[0]?.id || "",
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
      <div
        className={cn("space-y-10 w-full lg:w-3/4", categoriesWrapperClassName)}
      >
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
              category.title
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
                    <div className="font-medium py-1 lg:py-2 text-lg">
                      {item.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    className={cn("mb-1 lg:mb-2", accordionContentClassName)}
                  >
                    <div className={cn("text-base")}>{item.answer}</div>
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
    filteredCategories,
    categoriesWrapperClassName,
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
            "font-semibold text-4xl md:text-5xl lg:text-6xl",
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
          className: cn("text-lg opacity-70", descriptionClassName),
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
      className={cn(pattern && "overflow-visible", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <ContentGroup
          items={contentItems}
          className={cn(
            "flex flex-col text-left mb-12 md:mb-24 gap-0 text-balance items-start max-w-full md:max-w-md",
            headerClassName,
          )}
        />

        <div
          className={cn(
            "mx-auto mt-10 flex max-w-7xl flex-col gap-10 lg:flex-row lg:gap-16",
            contentWrapperClassName,
          )}
        >
          <nav className={cn("w-full lg:w-1/4", navClassName)}>
            <div className="sticky top-24 flex overflow-x-auto lg:flex-col gap-1 lg:gap-2 lg:overflow-visible p-1 md:p-2 ring-2 rounded-lg">
              {/* Show "All" tab when more than one category exists */}
              {categories && categories.length > 1 && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className={cn(
                    "cursor-pointer",
                    "w-fit lg:w-full",
                    "shrink-0 whitespace-nowrap",
                    "rounded-md px-4 py-2",
                    "text-left text-sm font-medium",
                    "transition-colors",
                    activeCategory === "all"
                      ? cn(
                          "bg-primary text-primary-foreground",
                          navButtonActiveClassName,
                        )
                      : cn(
                          "hover:bg-muted hover:text-muted-foreground",
                          navButtonClassName,
                        ),
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
                    "cursor-pointer",
                    "w-fit lg:w-full",
                    "shrink-0 whitespace-nowrap",
                    "rounded-md px-4 py-2",
                    "text-left text-sm font-medium",
                    "transition-colors",
                    activeCategory === category.id
                      ? cn(
                          "bg-primary text-primary-foreground",
                          navButtonActiveClassName,
                        )
                      : cn(
                          "hover:bg-muted hover:text-muted-foreground",
                          navButtonClassName,
                        ),
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
