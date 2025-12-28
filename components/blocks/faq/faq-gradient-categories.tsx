"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export interface FaqGradientCategoriesProps {
  heading?: string;
  description?: string;
  categories?: FaqCategory[];
  className?: string;
}

const defaultCategories: FaqCategory[] = [
  {
    title: "General",
    items: [
      {
        id: "general-1",
        question: "What is a FAQ?",
        answer:
          "A FAQ is a list of frequently asked questions and answers on a particular topic.",
      },
      {
        id: "general-2",
        question: "What is the purpose of a FAQ?",
        answer:
          "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
      },
      {
        id: "general-3",
        question: "How do I create a FAQ?",
        answer:
          "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
      },
    ],
  },
  {
    title: "Billing",
    items: [
      {
        id: "billing-1",
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.",
      },
      {
        id: "billing-2",
        question: "Can I get a refund?",
        answer:
          "Yes, we offer a 30-day money-back guarantee for all our plans. If you're not satisfied, contact our support team for a full refund.",
      },
      {
        id: "billing-3",
        question: "How do I cancel my subscription?",
        answer:
          "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
      },
    ],
  },
];

export function FaqGradientCategories({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  categories = defaultCategories,
  className,
}: FaqGradientCategoriesProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="rounded-lg bg-linear-to-b from-muted/50 to-muted p-8 md:p-12 lg:p-16">
          <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
              {heading}
            </h2>
            <p className="text-muted-foreground lg:text-lg">{description}</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-7xl gap-10 md:grid-cols-2">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="mb-4 text-xl font-semibold">{category.title}</h3>
                <Accordion type="single" collapsible>
                  {category.items.map((item) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
