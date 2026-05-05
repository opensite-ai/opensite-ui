"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface FaqItem {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface FaqBorderedBadgeProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Badge icon name
   */
  badgeIcon?: string;
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
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the accordion wrapper
   */
  accordionWrapperClassName?: string;
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

export function FaqBorderedBadge({
  sectionId = "faq-bordered-badge",
  badge,
  badgeIcon = "lucide/circle-help",
  heading,
  description,
  items,
  itemsSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  accordionWrapperClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
}: FaqBorderedBadgeProps) {
  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <Accordion
        type="single"
        collapsible
        className={cn("space-y-4", accordionClassName)}
      >
        {items.map((item, idx: number) => (
          <AccordionItem
            key={item.id || idx}
            value={item.id || `faq-item-${idx}`}
            className={cn("rounded-lg border px-4", accordionItemClassName)}
          >
            <AccordionTrigger
              className={cn(
                "font-semibold hover:no-underline",
                accordionTriggerClassName,
              )}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent className={cn(accordionContentClassName)}>
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
        <div
          className={cn(
            "flex flex-col items-center gap-4 text-center",
            headerClassName,
          )}
        >
          {badge && (
            <Badge className={cn("px-2.5 py-1", badgeClassName)}>
              {badgeIcon && <DynamicIcon name={badgeIcon} size={16} />}
              {badge}
            </Badge>
          )}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "max-w-2xl text-3xl font-semibold md:text-4xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              heading
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("max-w-2xl text-balance", descriptionClassName)}>
                {description}
              </p>
            ) : (
              description
            ))}
        </div>
        <div
          className={cn("mx-auto mt-10 max-w-3xl", accordionWrapperClassName)}
        >
          {itemsContent}
        </div>
      </div>
    </Section>
  );
}
