"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqNumberedListProps {
  badge?: string;
  heading?: string;
  description?: string;
  items?: FaqItem[];
  className?: string;
}

const defaultItems: FaqItem[] = [
  {
    question: "What is a FAQ?",
    answer:
      "A FAQ is a list of frequently asked questions and answers on a particular topic.",
  },
  {
    question: "What is the purpose of a FAQ?",
    answer:
      "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
  },
  {
    question: "How do I create a FAQ?",
    answer:
      "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
  },
  {
    question: "What are the benefits of a FAQ?",
    answer:
      "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
  },
  {
    question: "How should I organize my FAQ?",
    answer:
      "You should organize your FAQ in a logical manner, grouping related questions together and ordering them from most basic to more advanced topics.",
  },
];

export function FaqNumberedList({
  badge = "FAQ",
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = defaultItems,
  className,
}: FaqNumberedListProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-center text-center">
        <Badge variant="outline">{badge}</Badge>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{heading}</h2>
        <p className="text-muted-foreground mt-6 max-w-xl text-base md:text-lg">
          {description}
        </p>
        <div className="mt-10 w-full max-w-3xl space-y-4 text-left">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-lg border p-4 md:p-5"
            >
              <span className="bg-secondary flex size-6 shrink-0 items-center justify-center rounded-sm text-xs font-medium">
                {index + 1}
              </span>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-medium">{item.question}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
