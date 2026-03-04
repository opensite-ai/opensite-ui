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

export interface FaqBadgeSupportProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
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
   * Support section text
   */
  supportText?: React.ReactNode;
  /**
   * Support section CTA configuration
   */
  supportAction?: ActionConfig;
  /**
   * Custom slot for support section (overrides supportText and supportAction)
   */
  supportSlot?: React.ReactNode;
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
   * Additional CSS classes for the support section
   */
  supportSectionClassName?: string;
}

export function FaqBadgeSupport({
  badge,
  heading,
  description,
  items,
  itemsSlot,
  supportText,
  supportAction,
  supportSlot,
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
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
  supportSectionClassName,
}: FaqBadgeSupportProps) {
  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <Accordion
        type="single"
        collapsible
        className={cn("mx-auto w-full lg:max-w-3xl", accordionClassName)}
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
              <div className="font-semibold py-1 lg:py-2 text-lg leading-tight">
                {item.question}
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={cn("sm:mb-1 lg:mb-2", accordionContentClassName)}
            >
              <div className="text-lg">{item.answer}</div>
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

  const supportSectionContent = useMemo(() => {
    if (supportSlot) return supportSlot;

    return (
      <div
        className={cn(
          "mx-auto max-w-full md:max-w-3xl",
          "flex flex-col items-center md:flex-row md:justify-between",
          "bg-card text-card-foreground",
          "text-center md:text-left",
          "gap-4 p-6 md:p-12",
          "rounded-lg shadow-lg ring-2",
          supportSectionClassName,
        )}
      >
        {supportText &&
          (typeof supportText === "string" ? (
            <h3 className="text-lg font-semibold">{supportText}</h3>
          ) : (
            supportText
          ))}
        {supportAction && (
          <Pressable
            href={supportAction.href}
            onClick={supportAction.onClick}
            variant={supportAction.variant}
            size={supportAction.size}
            className={supportAction.className}
            asButton={supportAction.asButton}
          >
            {supportAction.children ?? supportAction.label}
            {supportAction.icon && supportAction.icon}
            {supportAction.iconAfter && supportAction.iconAfter}
          </Pressable>
        )}
      </div>
    );
  }, [
    supportSlot,
    supportText,
    supportAction,
    supportSectionClassName,
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
            "max-w-full md:max-w-md",
            "text-3xl md:text-4xl lg:text-5xl",
            "font-semibold text-balance",
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
            "text-base md:text-lg max-w-full md:max-w-md text-balance",
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
      <div className="space-y-8 md:space-y-16">
        <div
          className={cn(
            "mx-auto flex max-w-full md:max-w-3xl flex-col items-center text-center gap-4",
          )}
        >
          {badge && (
            <Badge className={cn("px-3 py-1", badgeClassName)}>{badge}</Badge>
          )}

          <ContentGroup
            items={contentItems}
            className={cn(
              "flex flex-col gap-2 text-center items-center",
              headerClassName,
            )}
          />
        </div>
        {itemsContent}
        {supportSectionContent}
      </div>
    </Section>
  );
}
