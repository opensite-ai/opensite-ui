"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface ServicesListIconGridProps {
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
      "Strategic planning and market positioning to ensure your product meets user needs and business goals.",
    items: ["Market Research", "User Personas", "Competitive Analysis"],
  },
  {
    icon: "lucide/pen-tool",
    title: "Design",
    description:
      "Beautiful, user-centered designs that create engaging experiences across all platforms.",
    items: ["UI/UX Design", "Prototyping", "Interaction Design"],
  },
  {
    icon: "lucide/code",
    title: "Web Development",
    description:
      "Modern, scalable web applications built with the latest technologies and best practices.",
    items: ["Frontend Dev", "Backend Dev", "API Integration"],
  },
  {
    icon: "lucide/shrub",
    title: "Marketing",
    description:
      "Data-driven strategies to launch successfully and scale your product efficiently.",
    items: ["SEO Strategy", "Analytics & Data", "A/B Testing"],
  },
];

/**
 * ServicesListIconGrid - A 2x2 grid layout displaying services with icons, titles, descriptions, and bullet point items.
 * Each service card features a circular icon, bold title, descriptive text, and a list of included items.
 * Ideal for showcasing 4 core services with their key offerings in a clean, organized grid format.
 */
export function ServicesListIconGrid({
  className,
  title = "Services",
  description = "We craft digital experiences that captivate and convert, bringing your vision to life.",
  services = defaultServices,
}: ServicesListIconGridProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-12">
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
              <div
                key={index}
                className="space-y-6 rounded-lg border border-border p-8 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-muted p-3">
                    {service.icon && (
                      <DynamicIcon name={service.icon} className="h-6 w-6" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                {service.items && service.items.length > 0 && (
                  <div className="space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
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
