"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";

export interface ServicesListFeaturedHighlightProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    icon?: string;
    title: string;
    description: string;
    featured?: boolean;
    deliverables?: string[];
    ctaText?: string;
    ctaUrl?: string;
  }>;
}

const defaultServices = [
  {
    icon: "lucide/cog",
    title: "Product Strategy",
    description:
      "Strategic planning and market positioning to ensure your product meets user needs and business goals.",
    featured: false,
    deliverables: ["Market Research", "User Personas", "Competitive Analysis"],
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/pen-tool",
    title: "Design",
    description:
      "Beautiful, user-centered designs that create engaging experiences across all platforms.",
    featured: true,
    deliverables: ["UI/UX Design", "Prototyping", "Design Systems", "User Testing"],
    ctaText: "Get Started",
    ctaUrl: "#",
  },
  {
    icon: "lucide/code",
    title: "Web Development",
    description:
      "Modern, scalable web applications built with the latest technologies and best practices.",
    featured: false,
    deliverables: ["Frontend Dev", "Backend Dev", "API Integration"],
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/shrub",
    title: "Marketing",
    description:
      "Data-driven strategies to launch successfully and scale your product efficiently.",
    featured: false,
    deliverables: ["SEO Strategy", "Analytics", "A/B Testing"],
    ctaText: "Learn More",
    ctaUrl: "#",
  },
];

/**
 * ServicesListFeaturedHighlight - A 2x2 grid layout with featured service highlighting.
 * Featured services display with a "Popular" badge, primary-colored styling, and enhanced visual treatment.
 * Each card includes check icons for deliverables and CTA buttons. Ideal for highlighting a recommended
 * or most popular service option among multiple offerings.
 */
export function ServicesListFeaturedHighlight({
  className,
  title = "Our Services",
  description = "Choose the service that best fits your needs. Our most popular option is highlighted.",
  services = defaultServices,
}: ServicesListFeaturedHighlightProps) {
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
                className={cn(
                  "relative flex flex-col rounded-xl border p-8 transition-shadow hover:shadow-md",
                  service.featured
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border"
                )}
              >
                {service.featured && (
                  <Badge className="absolute -top-3 right-6">Popular</Badge>
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "rounded-lg p-3",
                      service.featured ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}
                  >
                    {service.icon && (
                      <DynamicIcon name={service.icon} className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {service.deliverables.map((deliverable, delIndex) => (
                      <div key={delIndex} className="flex items-center gap-2">
                        <DynamicIcon
                          name="lucide/check-circle"
                          className={cn(
                            "h-5 w-5",
                            service.featured ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                        <span className="text-sm">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                )}

                {service.ctaText && (
                  <div className="mt-auto pt-6">
                    <Pressable
                      href={service.ctaUrl}
                      variant={service.featured ? "default" : "outline"}
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
