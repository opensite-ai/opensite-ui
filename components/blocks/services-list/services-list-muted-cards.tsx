"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface ServicesListMutedCardsProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    icon?: string;
    title: string;
    description: string;
    items?: string[];
  }>;
}

const defaultServices = [
  {
    icon: "lucide/cog",
    title: "Product Strategy",
    description:
      "Comprehensive market analysis and strategic planning to position your product for success in competitive markets.",
    items: [
      "Market Research",
      "User Personas",
      "Competitive Analysis",
      "Product Roadmaps",
    ],
  },
  {
    icon: "lucide/pen-tool",
    title: "Design",
    description:
      "User-centered design solutions that create intuitive and engaging experiences across all digital touchpoints.",
    items: ["UI/UX Design", "Prototyping", "Design Systems", "User Testing"],
  },
  {
    icon: "lucide/code",
    title: "Web Development",
    description:
      "Modern, scalable web applications built with cutting-edge technologies and development best practices.",
    items: [
      "Frontend Development",
      "Backend Development",
      "API Integration",
      "Performance Optimization",
    ],
  },
  {
    icon: "lucide/shrub",
    title: "Marketing",
    description:
      "Strategic marketing and optimization services to successfully launch and scale your digital products.",
    items: [
      "SEO Strategy",
      "Analytics Setup",
      "A/B Testing",
      "Growth Marketing",
    ],
  },
];

/**
 * ServicesListMutedCards - A 2x2 grid layout with muted background cards featuring icons in bordered boxes.
 * Each card includes a "What's Included" section with a 2-column grid of items.
 * Perfect for displaying comprehensive service offerings with detailed inclusions in a visually distinct format.
 */
export function ServicesListMutedCards({
  className,
  title = "Services",
  description = "End-to-end digital solutions designed to help your business thrive in the modern marketplace.",
  services = defaultServices,
}: ServicesListMutedCardsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="space-y-6 rounded-xl bg-muted p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg border border-border bg-background p-2">
                    {service.icon && (
                      <DynamicIcon name={service.icon} className="h-6 w-6" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

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
                          <div className="h-1 w-1 rounded-full bg-foreground" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
