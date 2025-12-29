"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
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

const defaultItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "What services do you offer?",
    answer:
      "We offer a comprehensive suite of services including web development, mobile app development, UI/UX design, and digital marketing solutions tailored to your business needs.",
  },
  {
    id: "faq-2",
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a complex application could take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    id: "faq-3",
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. The best option depends on your project requirements and budget.",
  },
  {
    id: "faq-4",
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer various support and maintenance packages to ensure your product continues to perform optimally after launch. This includes bug fixes, updates, and feature enhancements.",
  },
  {
    id: "faq-5",
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply reach out through our contact form or schedule a free consultation. We'll discuss your project requirements and provide a customized proposal.",
  },
];

export function FaqSplitHero({
  heading = "Frequently Asked Questions",
  subheading = "Find answers to common questions about our services and how we can help you achieve your goals.",
  items = defaultItems,
  itemsSlot,
  imageSlot,
  imageSrc = blockBrandedIconsAndPlaceholders.placeholderDark1,
  imageAlt = "FAQ section image",
  background = "white",
  spacing = "none",
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
  const renderItems = () => {
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
                accordionTriggerClassName
              )}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className={cn("pb-4 text-muted-foreground", accordionContentClassName)}
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const renderImage = () => {
    if (imageSlot) return imageSlot;

    return (
      <Img
        src={imageSrc}
        alt={imageAlt}
        className={cn(
          "hidden h-screen w-1/2 object-cover lg:block",
          imageClassName
        )}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

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
            leftColumnClassName
          )}
        >
          <div className="container my-10 flex w-full max-w-[600px] flex-col gap-8 px-6 lg:px-10">
            <div className={cn("space-y-4", headerClassName)}>
              {heading && (
                typeof heading === "string" ? (
                  <h2
                    className={cn(
                      "text-3xl font-bold text-foreground lg:text-4xl",
                      headingClassName
                    )}
                  >
                    {heading}
                  </h2>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                )
              )}
              {subheading && (
                typeof subheading === "string" ? (
                  <p className={cn("text-lg text-muted-foreground", subheadingClassName)}>
                    {subheading}
                  </p>
                ) : (
                  <div className={subheadingClassName}>{subheading}</div>
                )
              )}
            </div>
            {renderItems()}
          </div>
        </div>
        {renderImage()}
      </div>
    </Section>
  );
}
