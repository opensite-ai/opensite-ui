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
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type {
  SectionBackground,
  SectionSpacing,
  ActionConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";

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
  /** Optional Section ID */
  sectionId?: string;
}

export function FaqSplitHelp({
  sectionId = "faq-split-help",
  heading,
  description,
  items,
  itemsSlot,
  helpHeading,
  helpDescription,
  helpAction,
  helpSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  leftColumnClassName,
  headingClassName,
  descriptionClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
  helpSectionClassName,
}: FaqSplitHelpProps) {
  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <Accordion
        type="single"
        collapsible
        className={cn("w-full lg:w-2/3", accordionClassName)}
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
              <div className="text-base md:text-lg">{item.answer}</div>
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
  ]);

  const helpSectionContent = useMemo(() => {
    if (helpSlot) return helpSlot;

    return (
      <div
        className={cn(
          "flex flex-col items-center",
          "md:flex-row md:justify-between",
          "mt-8 md:mt-16 p-6 lg:p-8",
          "gap-4 text-center md:text-left",
          "rounded-lg shadow-lg",
          "bg-card text-card-foreground",
          helpSectionClassName,
        )}
      >
        <div>
          {helpHeading &&
            (typeof helpHeading === "string" ? (
              <h3 className="text-lg font-semibold">{helpHeading}</h3>
            ) : (
              helpHeading
            ))}
          {helpDescription &&
            (typeof helpDescription === "string" ? (
              <p className="mt-1">{helpDescription}</p>
            ) : (
              helpDescription
            ))}
        </div>
        {helpAction && (
          <Pressable
            href={helpAction.href}
            onClick={helpAction.onClick}
            variant={helpAction.variant}
            size={helpAction.size}
            className={helpAction.className}
            asButton={helpAction.asButton}
          >
            {helpAction.children ?? helpAction.label}
            {helpAction.icon && helpAction.icon}
            {helpAction.iconAfter && helpAction.iconAfter}
          </Pressable>
        )}
      </div>
    );
  }, [
    helpSlot,
    helpHeading,
    helpDescription,
    helpAction,
    helpSectionClassName,
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
            "text-3xl lg:text-4xl font-semibold",
            "mb-3  md:mb-4 lg:mb-6",
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
          className: cn("text-base md:text-lg", descriptionClassName),
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
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          <ContentGroup
            className={cn("w-full lg:w-1/3", leftColumnClassName)}
            items={contentItems}
          />

          {itemsContent}
        </div>
        {helpSectionContent}
      </div>
    </Section>
  );
}
