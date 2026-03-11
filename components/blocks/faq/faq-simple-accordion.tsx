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
  className?: string;
}

export interface FaqSimpleAccordionProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
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
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function FaqSimpleAccordion({
  sectionId = "faq-simple-accordion",
  heading,
  items,
  itemsSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  description,
  descriptionClassName,
  headingClassName,
  headerClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
}: FaqSimpleAccordionProps) {
  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <Accordion type="single" collapsible className={accordionClassName}>
        {items.map((item, index) => (
          <AccordionItem
            key={item.id || index}
            value={`item-${index}`}
            className={cn(item.className, accordionItemClassName)}
          >
            <AccordionTrigger
              className={cn(
                "cursor-pointer text-lg",
                "font-semibold hover:no-underline",
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
    );
  }, [
    itemsSlot,
    items,
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
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="mx-auto max-w-full md:max-w-3xl space-y-4 md:space-y-8">
        <ContentGroup
          items={contentItems}
          className={cn(
            "flex flex-col gap-2 text-left items-start",
            headerClassName,
          )}
        />

        {itemsContent}
      </div>
    </Section>
  );
}
