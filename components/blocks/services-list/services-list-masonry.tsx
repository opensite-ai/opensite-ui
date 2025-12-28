"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

export interface ServicesListMasonryProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    icon?: string;
    title: string;
    description: string;
    items?: string[];
    featured?: boolean;
    ctaText?: string;
    ctaUrl?: string;
  }>;
}

const defaultServices = [
  {
    icon: "lucide/code",
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies and best practices for optimal performance.",
    items: ["React & Next.js", "Node.js & Python", "Database Design", "API Development"],
    featured: true,
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/palette",
    title: "UI/UX Design",
    description:
      "User-centered design solutions that create engaging experiences.",
    items: ["User Research", "Wireframing", "Prototyping"],
    featured: false,
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/smartphone",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android devices.",
    items: ["React Native", "Flutter", "Native iOS/Android"],
    featured: false,
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/cloud",
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and DevOps services to power your applications with reliability and performance.",
    items: ["AWS & GCP", "Docker & Kubernetes", "CI/CD Pipelines", "Monitoring"],
    featured: true,
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/bar-chart-3",
    title: "Analytics",
    description:
      "Data-driven insights to optimize your digital presence.",
    items: ["Google Analytics", "Custom Dashboards"],
    featured: false,
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/shield",
    title: "Security",
    description:
      "Comprehensive security audits and implementations to protect your digital assets.",
    items: ["Security Audits", "Penetration Testing", "Compliance"],
    featured: false,
    ctaText: "Learn More",
    ctaUrl: "#",
  },
];

/**
 * ServicesListMasonry - A masonry-style grid layout with variable card heights based on content.
 * Featured services display with additional items and larger visual presence.
 * Each card includes an icon, title, description, optional items list, and CTA link.
 * Perfect for showcasing services with varying levels of detail in an organic, Pinterest-style layout.
 */
export function ServicesListMasonry({
  className,
  title = "Our Services",
  description = "Comprehensive digital solutions tailored to your business needs.",
  services = defaultServices,
}: ServicesListMasonryProps) {
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

          <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {services.map((service, index) => (
              <div
                key={index}
                className={cn(
                  "mb-6 break-inside-avoid rounded-xl border border-border p-6 transition-shadow hover:shadow-md",
                  service.featured && "bg-primary/5 border-primary/20"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                      service.featured
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {service.icon && (
                      <DynamicIcon name={service.icon} className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {service.items && service.items.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <DynamicIcon
                          name="lucide/check"
                          className={cn(
                            "h-4 w-4",
                            service.featured
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {service.ctaText && (
                  <Pressable
                    href={service.ctaUrl}
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    {service.ctaText}
                    <DynamicIcon
                      name="lucide/arrow-right"
                      className="ml-1 h-4 w-4"
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
