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
}

export function FaqSplitHelp({
  heading,
  description,
  items,
  itemsSlot,
  helpHeading,
  helpDescription,
  helpAction,
  helpSlot,
  background,
  spacing,
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
  const itemsContent = useMemo(() => {
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
              <div className="text-muted-foreground lg:text-lg">
                {item.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }, [itemsSlot, items, accordionClassName, accordionItemClassName, accordionTriggerClassName, accordionContentClassName]);

  const helpSectionContent = useMemo(() => {
    if (helpSlot) return helpSlot;

    return (
      <div
        className={cn(
          "mt-16 flex flex-col items-center gap-4 rounded-lg bg-accent p-6 text-center md:flex-row md:justify-between md:text-left lg:p-8",
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
              <p className="text-muted-foreground mt-1">{helpDescription}</p>
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
          >
            {helpAction.children ?? helpAction.label}
          </Pressable>
        )}
      </div>
    );
  }, [helpSlot, helpHeading, helpDescription, helpAction, helpSectionClassName]);

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
          {itemsContent}
        </div>
        {helpSectionContent}
      </div>
    </Section>
  );
}
