"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

export interface ServicesListMinimalGridProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    icon?: string;
    title: string;
    description: string;
    ctaText?: string;
    ctaUrl?: string;
  }>;
}

const defaultServices = [
  {
    icon: "lucide/code",
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies.",
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/smartphone",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/palette",
    title: "UI/UX Design",
    description:
      "User-centered design solutions that create engaging experiences.",
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/bar-chart-3",
    title: "Analytics",
    description:
      "Data-driven insights to optimize your digital presence.",
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/cloud",
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and DevOps services.",
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/shield",
    title: "Security",
    description:
      "Comprehensive security audits and implementations.",
    ctaText: "Learn More",
    ctaUrl: "#",
  },
];

/**
 * ServicesListMinimalGrid - A clean, minimal 3-column grid layout for displaying services.
 * Each service card features an icon, title, description, and optional CTA link.
 * The design emphasizes simplicity and readability with subtle hover effects.
 * Ideal for showcasing multiple services in a clean, scannable format.
 */
export function ServicesListMinimalGrid({
  className,
  title = "Our Services",
  description = "Comprehensive digital solutions to help your business succeed.",
  services = defaultServices,
}: ServicesListMinimalGridProps) {
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group rounded-lg border border-border p-6 transition-all hover:border-primary/50 hover:shadow-md"
              >
                {service.icon && (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <DynamicIcon name={service.icon} className="h-6 w-6" />
                  </div>
                )}
                <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {service.description}
                </p>
                {service.ctaText && (
                  <Pressable
                    href={service.ctaUrl}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    {service.ctaText}
                    <DynamicIcon
                      name="lucide/arrow-right"
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </Pressable>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
