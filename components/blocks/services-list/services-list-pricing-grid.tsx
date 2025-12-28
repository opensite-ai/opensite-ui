"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

export interface ServicesListPricingGridProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    icon?: string;
    title: string;
    description: string;
    duration?: string;
    price?: string;
    items?: string[];
    ctaText?: string;
    ctaUrl?: string;
  }>;
}

const defaultServices = [
  {
    icon: "lucide/cog",
    title: "Product Strategy",
    description:
      "Strategic planning and market positioning to ensure your product meets user needs.",
    duration: "2-4 weeks",
    price: "From $5,000",
    items: ["Market Research", "User Personas", "Competitive Analysis"],
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/pen-tool",
    title: "Design",
    description:
      "Beautiful, user-centered designs that create engaging experiences across all platforms.",
    duration: "3-6 weeks",
    price: "From $8,000",
    items: ["UI/UX Design", "Prototyping", "Design Systems"],
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/code",
    title: "Web Development",
    description:
      "Modern, scalable web applications built with the latest technologies.",
    duration: "4-12 weeks",
    price: "From $15,000",
    items: ["Frontend Dev", "Backend Dev", "API Integration"],
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/shrub",
    title: "Marketing",
    description:
      "Data-driven strategies to launch successfully and scale your product.",
    duration: "Ongoing",
    price: "From $2,000/mo",
    items: ["SEO Strategy", "Analytics", "A/B Testing"],
    ctaText: "Learn More",
    ctaUrl: "#",
  },
];

/**
 * ServicesListPricingGrid - A 2x2 grid layout displaying services with duration and pricing information.
 * Each card features an icon, title, description, timeline, price, included items, and a CTA button.
 * Perfect for service-based businesses that want to showcase offerings with transparent pricing.
 */
export function ServicesListPricingGrid({
  className,
  title = "Services & Pricing",
  description = "Transparent pricing for all our digital services. Custom quotes available for complex projects.",
  services = defaultServices,
}: ServicesListPricingGridProps) {
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
                className="flex flex-col rounded-xl border border-border p-8 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    {service.icon && (
                      <DynamicIcon
                        name={service.icon}
                        className="h-6 w-6 text-primary"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4 border-t border-b border-border py-4">
                  {service.duration && (
                    <div className="flex items-center gap-2">
                      <DynamicIcon
                        name="lucide/clock"
                        className="h-4 w-4 text-muted-foreground"
                      />
                      <span className="text-sm font-medium">
                        {service.duration}
                      </span>
                    </div>
                  )}
                  {service.price && (
                    <div className="ml-auto text-lg font-bold text-primary">
                      {service.price}
                    </div>
                  )}
                </div>

                {service.items && service.items.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {service.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <DynamicIcon
                          name="lucide/check"
                          className="h-4 w-4 text-primary"
                        />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {service.ctaText && (
                  <div className="mt-auto pt-6">
                    <Pressable
                      href={service.ctaUrl}
                      variant="outline"
                      className="w-full"
                      asButton
                    >
                      {service.ctaText}
                      <DynamicIcon
                        name="lucide/arrow-right"
                        className="ml-2 h-4 w-4"
                      />
                    </Pressable>
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
