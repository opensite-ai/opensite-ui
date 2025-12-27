"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Pressable } from "../../../lib/Pressable";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqSplitHelpProps {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  helpHeading?: string;
  helpDescription?: string;
  helpButtonText?: string;
  helpButtonUrl?: string;
  className?: string;
}

const defaultItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is a FAQ?",
    answer:
      "A FAQ is a list of frequently asked questions and answers on a particular topic.",
  },
  {
    id: "faq-2",
    question: "What is the purpose of a FAQ?",
    answer:
      "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
  },
  {
    id: "faq-3",
    question: "How do I create a FAQ?",
    answer:
      "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
  },
  {
    id: "faq-4",
    question: "What are the benefits of a FAQ?",
    answer:
      "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
  },
  {
    id: "faq-5",
    question: "How should I organize my FAQ?",
    answer:
      "You should organize your FAQ in a logical manner, grouping related questions together and ordering them from most basic to more advanced topics.",
  },
  {
    id: "faq-6",
    question: "How long should FAQ answers be?",
    answer:
      "FAQ answers should be concise and to the point, typically a few sentences or a short paragraph is sufficient for most questions.",
  },
  {
    id: "faq-7",
    question: "Should I include links in my FAQ?",
    answer:
      "Yes, including links to more detailed information or related resources can be very helpful for users who want to learn more about a particular topic.",
  },
];

export function FaqSplitHelp({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = defaultItems,
  helpHeading = "Still have questions?",
  helpDescription = "Can't find the answer you're looking for? Our support team is here to help.",
  helpButtonText = "Contact Support",
  helpButtonUrl = "#",
  className,
}: FaqSplitHelpProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="lg:w-1/3">
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
              {heading}
            </h2>
            <p className="text-muted-foreground lg:text-lg">{description}</p>
          </div>
          <Accordion type="single" collapsible className="lg:w-2/3">
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                  <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="sm:mb-1 lg:mb-2">
                  <div className="text-muted-foreground lg:text-lg">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-16 flex flex-col items-center gap-4 rounded-lg bg-accent p-6 text-center md:flex-row md:justify-between md:text-left lg:p-8">
          <div>
            <h3 className="text-lg font-semibold">{helpHeading}</h3>
            <p className="text-muted-foreground mt-1">{helpDescription}</p>
          </div>
          <Pressable href={helpButtonUrl}>{helpButtonText}</Pressable>
        </div>
      </div>
    </section>
  );
}
