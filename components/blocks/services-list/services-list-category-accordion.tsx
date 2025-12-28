"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

export interface ServicesListCategoryAccordionProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    title: string;
    description: string;
    category?: string;
    items?: string[];
    badges?: string[];
  }>;
}

const defaultServices = [
  {
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies. We specialize in React, Next.js, and Node.js to create fast, scalable solutions.",
    category: "Development",
    items: [
      "Frontend Development",
      "Backend Development",
      "API Integration",
      "Database Design",
    ],
    badges: ["React", "Next.js", "Node.js"],
  },
  {
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android. We build performant apps that users love.",
    category: "Development",
    items: [
      "iOS Development",
      "Android Development",
      "Cross-Platform Apps",
      "App Store Optimization",
    ],
    badges: ["React Native", "Flutter", "Swift"],
  },
  {
    title: "UI/UX Design",
    description:
      "User-centered design solutions that create engaging experiences. From wireframes to high-fidelity prototypes.",
    category: "Design",
    items: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Visual Design",
    ],
    badges: ["Figma", "User Testing", "Design Systems"],
  },
  {
    title: "Brand Identity",
    description:
      "Comprehensive branding services to establish your visual identity. Logo design, color palettes, and brand guidelines.",
    category: "Design",
    items: [
      "Logo Design",
      "Brand Guidelines",
      "Visual Identity",
      "Marketing Materials",
    ],
    badges: ["Branding", "Identity", "Guidelines"],
  },
  {
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies to grow your online presence. SEO, content marketing, and paid advertising.",
    category: "Marketing",
    items: [
      "SEO Optimization",
      "Content Strategy",
      "Paid Advertising",
      "Social Media",
    ],
    badges: ["SEO", "PPC", "Analytics"],
  },
];

/**
 * ServicesListCategoryAccordion - An accordion layout with large titles and expandable service items featuring categories and badges.
 * Each accordion item displays a category label, title, and expands to show full description, included items, and technology badges.
 * Ideal for organizing services by category with detailed information revealed on demand.
 */
export function ServicesListCategoryAccordion({
  className,
  title = "Our Services",
  description = "Explore our comprehensive range of digital services. Click on any service to learn more.",
  services = defaultServices,
}: ServicesListCategoryAccordionProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              {description}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {services.map((service, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex flex-col items-start gap-2 text-left">
                    {service.category && (
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">
                        {service.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold md:text-2xl">
                      {service.title}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    {service.items && service.items.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {service.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center gap-2"
                          >
                            <DynamicIcon
                              name="lucide/check"
                              className="h-4 w-4 text-primary"
                            />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {service.badges && service.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {service.badges.map((badge, badgeIndex) => (
                          <Badge key={badgeIndex} variant="secondary">
                            {badge}
                          </Badge>
                        ))}
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
