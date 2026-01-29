"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
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
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
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
  }, [
    itemsSlot,
    items,
    accordionClassName,
    accordionItemClassName,
    accordionTriggerClassName,
    accordionContentClassName,
  ]);

  const supportSectionContent = useMemo(() => {
    if (supportSlot) return supportSlot;

    return (
      <div
        className={cn(
          "mx-auto flex max-w-3xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left",
          supportSectionClassName,
        )}
      >
        {supportText &&
          (typeof supportText === "string" ? (
            <p className="text-muted-foreground">{supportText}</p>
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
  }, [supportSlot, supportText, supportAction, supportSectionClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("space-y-8 md:space-y-16", containerClassName)}>
        <div
          className={cn(
            "mx-auto flex max-w-3xl flex-col text-left md:text-center",
            headerClassName,
          )}
        >
          {badge && (
            <Badge
              variant="outline"
              className={cn("w-fit md:mx-auto", badgeClassName)}
            >
              {badge}
            </Badge>
          )}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mt-4 text-3xl font-semibold md:text-4xl",
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
                  "text-muted-foreground mt-6 text-base md:text-lg",
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
        <Separator />
        {supportSectionContent}
      </div>
    </Section>
  );
}
