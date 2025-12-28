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

export interface FaqSplitHeroItem {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * FAQ question
   */
  question: string;
  /**
   * FAQ answer
   */
  answer: string;
}

export interface FaqSplitHeroProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Subheading/description text
   */
  subheading?: string;
  /**
   * Array of FAQ items
   */
  items?: FaqSplitHeroItem[];
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultItems: FaqSplitHeroItem[] = [
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

/**
 * FAQ Split Hero - A dark-themed split-screen FAQ section with animated accordion
 * on the left and a large image on the right.
 *
 * Layout: Two-column split with FAQ content on left, full-height image on right.
 * Key features: Dark theme, animated accordion, prominent heading and subheading.
 * Best for: Landing pages, product pages, service pages requiring FAQ visibility.
 *
 * @example
 * ```tsx
 * <FaqSplitHero
 *   heading="Frequently Asked Questions"
 *   subheading="Find answers to common questions about our services."
 *   items={[
 *     { id: "1", question: "What services do you offer?", answer: "..." },
 *   ]}
 * />
 * ```
 */
export function FaqSplitHero({
  heading = "Frequently Asked Questions",
  subheading = "Find answers to common questions about our services and how we can help you achieve your goals.",
  items = defaultItems,
  imageSrc = blockBrandedIconsAndPlaceholders.placeholderDark1,
  imageAlt = "FAQ section image",
  className,
  optixFlowConfig,
}: FaqSplitHeroProps) {
  return (
    <section className={cn("dark flex", className)}>
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="container my-10 flex w-full max-w-[600px] flex-col gap-8 px-6 lg:px-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
              {heading}
            </h2>
            <p className="text-lg text-muted-foreground">{subheading}</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-border/50"
              >
                <AccordionTrigger className="py-4 text-left text-base font-medium text-foreground transition-colors hover:text-primary hover:no-underline lg:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Img
        src={imageSrc}
        alt={imageAlt}
        className="hidden h-screen w-1/2 object-cover lg:block"
        optixFlowConfig={optixFlowConfig}
      />
    </section>
  );
}
