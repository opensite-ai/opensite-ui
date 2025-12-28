"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface ServicesListCenteredIconsProps {
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
      "From market research to user personas, we help you build products that matter.",
    items: ["Market Research", "User Personas"],
  },
  {
    icon: "lucide/pen-tool",
    title: "Design",
    description:
      "Beautiful, functional designs that create memorable user experiences.",
    items: ["UI/UX Design", "Prototyping", "Interaction Design"],
  },
  {
    icon: "lucide/code",
    title: "Web Development",
    description:
      "Robust, scalable applications built with modern technologies and frameworks.",
    items: ["Frontend Dev", "Backend Dev"],
  },
  {
    icon: "lucide/shrub",
    title: "Marketing",
    description:
      "Strategic growth initiatives to scale your product and maximize impact.",
    items: ["SEO Strategy", "Analytics & Data", "A/B Testing"],
  },
];

/**
 * ServicesListCenteredIcons - A responsive 1x4 grid layout with centered text and circular icons.
 * Features hover effects on icons that invert colors. Each service displays an icon, title, description, and stacked items.
 * Ideal for a compact, visually balanced presentation of services with interactive hover states.
 */
export function ServicesListCenteredIcons({
  className,
  title = "Services",
  description = "We deliver end-to-end digital solutions that drive results and exceed expectations.",
  services = defaultServices,
}: ServicesListCenteredIconsProps) {
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

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div key={index} className="group space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                  {service.icon && (
                    <DynamicIcon name={service.icon} className="h-8 w-8" />
                  )}
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                {service.items && service.items.length > 0 && (
                  <div className="space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="text-xs font-medium text-muted-foreground"
                      >
                        {item}
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
