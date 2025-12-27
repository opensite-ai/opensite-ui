"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqProfileSidebarProps {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  profileImage?: string;
  profileName?: string;
  profileRole?: string;
  profileDescription?: string;
  contactText?: string;
  contactButtonText?: string;
  contactButtonUrl?: string;
  optixFlowConfig?: OptixFlowConfig;
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

export function FaqProfileSidebar({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = defaultItems,
  profileImage = imagePlaceholders[0],
  profileName = "Sarah Johnson",
  profileRole = "Customer Success Manager",
  profileDescription = "I'm here to help you get the most out of our platform. Feel free to reach out with any questions!",
  contactText = "Still have questions?",
  contactButtonText = "Contact Support",
  contactButtonUrl = "#",
  optixFlowConfig,
  className,
}: FaqProfileSidebarProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div>
                <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:text-4xl">
                  {heading}
                </h2>
                <p className="text-muted-foreground">{description}</p>
              </div>
              <div className="rounded-lg border p-6">
                <div className="flex items-center gap-4">
                  <Img
                    src={profileImage}
                    alt={profileName}
                    className="size-16 rounded-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                  <div>
                    <h3 className="font-semibold">{profileName}</h3>
                    <p className="text-muted-foreground text-sm">
                      {profileRole}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  {profileDescription}
                </p>
                <div className="mt-6 border-t pt-6">
                  <p className="text-sm font-medium">{contactText}</p>
                  <Pressable
                    href={contactButtonUrl}
                    variant="outline"
                    className="mt-3 w-full"
                  >
                    {contactButtonText}
                  </Pressable>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3">
            <Accordion type="single" collapsible>
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
        </div>
      </div>
    </section>
  );
}
