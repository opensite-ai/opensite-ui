"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
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

export interface FaqCardCategoriesProps {
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
  {
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

export function FaqCardCategories({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  categories = defaultCategories,
  className,
}: FaqCardCategoriesProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div
          className="relative rounded-lg bg-muted/50 p-8 md:p-12 lg:p-16"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
              {heading}
            </h2>
            <p className="text-muted-foreground lg:text-lg">{description}</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="bg-background">
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {category.items?.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-sm transition-opacity duration-200 hover:no-underline hover:opacity-60">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
