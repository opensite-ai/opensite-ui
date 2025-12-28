"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

export interface ServicesListCardsHoverProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    icon?: string;
    title: string;
    description: string;
    features?: string[];
    ctaText?: string;
    ctaUrl?: string;
  }>;
}

const defaultServices = [
  {
    icon: "lucide/code",
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies for optimal performance.",
    features: ["React & Next.js", "Node.js", "Database Design"],
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/smartphone",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    features: ["React Native", "Flutter", "iOS & Android"],
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/palette",
    title: "UI/UX Design",
    description:
      "User-centered design solutions that create engaging, intuitive experiences.",
    features: ["User Research", "Prototyping", "Design Systems"],
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/trending-up",
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies to grow your online presence and reach.",
    features: ["SEO", "Content Strategy", "Analytics"],
    ctaText: "Learn More",
    ctaUrl: "#",
  },
];

/**
 * ServicesListCardsHover - A grid layout with interactive hover cards that reveal additional features.
 * Each card displays an icon, title, and description, with features appearing on hover.
 * Cards feature smooth transitions and visual feedback. Ideal for showcasing services
 * with progressive disclosure of details through hover interactions.
 */
export function ServicesListCardsHover({
  className,
  title = "Our Services",
  description = "Hover over each service to discover what we offer.",
  services = defaultServices,
}: ServicesListCardsHoverProps) {
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary hover:shadow-lg"
              >
                <div className="relative z-10">
                  {service.icon && (
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <DynamicIcon name={service.icon} className="h-7 w-7" />
                    </div>
                  )}
                  <h3 className="mb-2 text-lg font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground transition-all duration-300 group-hover:mb-4">
                    {service.description}
                  </p>

                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
                    {service.features && service.features.length > 0 && (
                      <div className="mb-4 space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <DynamicIcon
                              name="lucide/check"
                              className="h-4 w-4 text-primary"
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {service.ctaText && (
                      <Pressable
                        href={service.ctaUrl}
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        {service.ctaText}
                        <DynamicIcon
                          name="lucide/arrow-right"
                          className="ml-1 h-4 w-4"
                        />
                      </Pressable>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
