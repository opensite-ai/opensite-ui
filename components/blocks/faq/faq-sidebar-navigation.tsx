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
  id: string;
  title: string;
  items: FaqItem[];
}

export interface FaqSidebarNavigationProps {
  heading?: string;
  description?: string;
  categories?: FaqCategory[];
  className?: string;
}

const defaultCategories: FaqCategory[] = [
  {
    id: "general",
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
    id: "billing",
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
  {
    id: "support",
    title: "Support",
    items: [
      {
        id: "support-1",
        question: "How do I contact support?",
        answer:
          "You can reach our support team via email at support@example.com or through our live chat feature available on our website.",
      },
      {
        id: "support-2",
        question: "What are your support hours?",
        answer:
          "Our support team is available Monday through Friday, 9am to 6pm EST. We also offer 24/7 support for enterprise customers.",
      },
    ],
  },
];

export function FaqSidebarNavigation({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  categories = defaultCategories,
  className,
}: FaqSidebarNavigationProps) {
  const [activeCategory, setActiveCategory] = React.useState(
    categories[0]?.id || ""
  );

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`faq-category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-10 lg:flex-row lg:gap-16">
          <nav className="lg:w-1/4">
            <div className="sticky top-24 space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={cn(
                    "w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors",
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </nav>
          <div className="space-y-10 lg:w-3/4">
            {categories.map((category) => (
              <div
                key={category.id}
                id={`faq-category-${category.id}`}
                className="scroll-mt-24"
              >
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
