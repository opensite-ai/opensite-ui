"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
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

export interface FaqSplitHeroProps {
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Subheading/description text
   */
  subheading?: React.ReactNode;
  /**
   * Array of FAQ items
   */
  items?: FaqItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the image section
   */
  imageSlot?: React.ReactNode;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
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
   * Additional CSS classes for the content wrapper
   */
  contentWrapperClassName?: string;
  /**
   * Additional CSS classes for the left column
   */
  leftColumnClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
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
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function FaqSplitHero({
  heading,
  subheading,
  items,
  itemsSlot,
  imageSlot,
  imageSrc,
  imageAlt,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  contentWrapperClassName,
  leftColumnClassName,
  headerClassName,
  headingClassName,
  subheadingClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
  imageClassName,
  optixFlowConfig,
}: FaqSplitHeroProps) {
  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <Accordion
        type="single"
        collapsible
        className={cn("w-full", accordionClassName)}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={cn("border-b border-border/50", accordionItemClassName)}
          >
            <AccordionTrigger
              className={cn(
                "py-4 text-left text-base font-medium text-foreground transition-colors hover:text-primary hover:no-underline lg:text-lg",
                accordionTriggerClassName,
              )}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                "pb-4 text-muted-foreground",
                accordionContentClassName,
              )}
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }, [itemsSlot, items, accordionClassName, accordionItemClassName, accordionTriggerClassName, accordionContentClassName]);

  const imageContent = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!imageSrc) return null;

    return (
      <Img
        src={imageSrc}
        alt={imageAlt || "FAQ section image"}
        className={cn(
          "hidden h-screen w-1/2 object-cover lg:block",
          imageClassName,
        )}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [imageSlot, imageSrc, imageAlt, imageClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={cn("dark flex", className)}
    >
      <div className={cn("flex", contentWrapperClassName)}>
        <div
          className={cn(
            "flex w-full items-center justify-center bg-background lg:w-1/2",
            leftColumnClassName,
          )}
        >
          <div className="container my-10 flex w-full max-w-[600px] flex-col gap-8 px-6 lg:px-10">
            <div className={cn("space-y-4", headerClassName)}>
              {heading &&
                (typeof heading === "string" ? (
                  <h2
                    className={cn(
                      "text-3xl font-bold text-foreground lg:text-4xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h2>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                ))}
              {subheading &&
                (typeof subheading === "string" ? (
                  <p
                    className={cn(
                      "text-lg text-muted-foreground",
                      subheadingClassName,
                    )}
                  >
                    {subheading}
                  </p>
                ) : (
                  <div className={subheadingClassName}>{subheading}</div>
                ))}
            </div>
            {itemsContent}
          </div>
        </div>
        {imageContent}
      </div>
    </Section>
  );
}
