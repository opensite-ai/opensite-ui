"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

export interface ServicesListAccordionProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    icon?: string;
    title: string;
    shortDescription: string;
    description: string;
    items?: string[];
    deliverables?: string[];
  }>;
}

const defaultServices = [
  {
    icon: "lucide/cog",
    title: "Product Strategy",
    shortDescription: "Strategic planning and market positioning",
    description:
      "From market research to user personas, we help you build products that matter. Our strategic approach ensures your product meets real user needs.",
    items: [
      "Market Research",
      "User Personas",
      "Competitive Analysis",
      "Product Roadmaps",
    ],
    deliverables: [
      "Strategy Document",
      "User Persona Profiles",
      "Market Analysis Report",
    ],
  },
  {
    icon: "lucide/pen-tool",
    title: "Design",
    shortDescription: "User-centered design solutions",
    description:
      "Beautiful, functional designs that create memorable user experiences. We focus on both aesthetics and usability to create designs that convert.",
    items: [
      "UI/UX Design",
      "Prototyping",
      "Interaction Design",
      "Design Systems",
    ],
    deliverables: [
      "Design System",
      "Interactive Prototypes",
      "UI/UX Mockups",
    ],
  },
  {
    icon: "lucide/code",
    title: "Web Development",
    shortDescription: "Modern, scalable applications",
    description:
      "Robust, scalable applications built with modern technologies and frameworks. We ensure your application is fast, secure, and maintainable.",
    items: [
      "Frontend Dev",
      "Backend Dev",
      "API Integration",
      "Performance Optimization",
    ],
    deliverables: ["Source Code", "Documentation", "Deployment Guide"],
  },
  {
    icon: "lucide/shrub",
    title: "Marketing",
    shortDescription: "Growth and optimization strategies",
    description:
      "Strategic growth initiatives to scale your product and maximize impact. We use data-driven approaches to optimize your marketing efforts.",
    items: [
      "SEO Strategy",
      "Analytics & Data",
      "A/B Testing",
      "Content Marketing",
    ],
    deliverables: [
      "Marketing Plan",
      "Analytics Setup",
      "Performance Reports",
    ],
  },
];

/**
 * ServicesListAccordion - An accordion-based expandable services section with detailed information.
 * Each accordion item shows icon, title, and short description when collapsed, expanding to reveal
 * full description, included items, and deliverables. Ideal for detailed service presentations
 * where users can explore specific offerings without overwhelming the initial view.
 */
export function ServicesListAccordion({
  className,
  title = "Services",
  description = "Click to learn more about each service we offer.",
  services = defaultServices,
}: ServicesListAccordionProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="text-lg tracking-tight text-muted-foreground md:text-xl">
              {description}
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-0"
          >
            {services.map((service, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      {service.icon && (
                        <DynamicIcon name={service.icon} className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-6 pl-14">
                    <p className="leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    {service.items && service.items.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          What&apos;s Included
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center gap-2"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          Deliverables
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((deliverable, delIndex) => (
                            <span
                              key={delIndex}
                              className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium"
                            >
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
