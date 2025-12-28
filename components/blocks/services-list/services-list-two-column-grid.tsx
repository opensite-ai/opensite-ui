"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";

export interface ServicesListTwoColumnGridProps {
  className?: string;
  badge?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  services?: Array<{
    icon?: string;
    title: string;
    description: string;
    ctaUrl?: string;
  }>;
}

const defaultServices = [
  {
    icon: "lucide/code",
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies.",
    ctaUrl: "#",
  },
  {
    icon: "lucide/smartphone",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
    ctaUrl: "#",
  },
  {
    icon: "lucide/palette",
    title: "UI/UX Design",
    description:
      "User-centered design solutions that create engaging experiences.",
    ctaUrl: "#",
  },
  {
    icon: "lucide/bar-chart-3",
    title: "Analytics",
    description:
      "Data-driven insights to optimize your digital presence.",
    ctaUrl: "#",
  },
];

/**
 * ServicesListTwoColumnGrid - A 2-column layout with introductory content on the left and a 2x2 service grid on the right.
 * The left column features a badge, title, description, and dual CTA buttons.
 * The right column displays services as bordered cards with icons and hover effects.
 * Ideal for presenting services alongside compelling marketing copy.
 */
export function ServicesListTwoColumnGrid({
  className,
  badge = "Services",
  title = "Everything You Need to Succeed Online",
  description = "We provide comprehensive digital solutions to help your business grow. From development to design, we've got you covered.",
  primaryCtaText = "Get Started",
  primaryCtaUrl = "#",
  secondaryCtaText = "Learn More",
  secondaryCtaUrl = "#",
  services = defaultServices,
}: ServicesListTwoColumnGridProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            {badge && (
              <Badge variant="outline" className="mb-4 w-fit">
                {badge}
              </Badge>
            )}
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Pressable
                href={primaryCtaUrl}
                variant="default"
                size="lg"
                asButton
              >
                {primaryCtaText}
                <DynamicIcon
                  name="lucide/arrow-right"
                  className="ml-2 h-4 w-4"
                />
              </Pressable>
              <Pressable
                href={secondaryCtaUrl}
                variant="outline"
                size="lg"
                asButton
              >
                {secondaryCtaText}
              </Pressable>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <Pressable
                key={index}
                href={service.ctaUrl}
                className="group flex flex-col rounded-xl border border-border p-6 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {service.icon && (
                    <DynamicIcon name={service.icon} className="h-6 w-6" />
                  )}
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Learn more
                    <DynamicIcon
                      name="lucide/arrow-right"
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Pressable>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
