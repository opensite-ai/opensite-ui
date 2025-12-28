"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ServicesListImageOverlayGridProps {
  className?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  services?: Array<{
    title: string;
    description: string;
    image?: {
      src: string;
      alt: string;
    };
    ctaUrl?: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultServices = [
  {
    title: "Web Development",
    description: "Custom websites built with modern technologies",
    image: { src: imagePlaceholders[0], alt: "Web Development" },
    ctaUrl: "#",
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications",
    image: { src: imagePlaceholders[1], alt: "Mobile Apps" },
    ctaUrl: "#",
  },
  {
    title: "UI/UX Design",
    description: "User-centered design solutions",
    image: { src: imagePlaceholders[2], alt: "UI/UX Design" },
    ctaUrl: "#",
  },
  {
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure",
    image: { src: imagePlaceholders[3], alt: "Cloud Solutions" },
    ctaUrl: "#",
  },
  {
    title: "Digital Marketing",
    description: "Data-driven marketing strategies",
    image: { src: imagePlaceholders[4], alt: "Digital Marketing" },
    ctaUrl: "#",
  },
];

/**
 * ServicesListImageOverlayGrid - An asymmetric layout with introductory text on the left and a 5-service grid on the right.
 * Services display as image cards with gradient overlays, titles, and descriptions that appear on hover.
 * The grid features varying card sizes for visual interest. Ideal for showcasing multiple services with strong imagery.
 */
export function ServicesListImageOverlayGrid({
  className,
  title = "Our Services",
  description = "We offer a comprehensive range of digital services to help your business grow and succeed in the modern marketplace.",
  primaryCtaText = "View All Services",
  primaryCtaUrl = "#",
  services = defaultServices,
  optixFlowConfig,
}: ServicesListImageOverlayGridProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col justify-center lg:col-span-1">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
            <div className="mt-8">
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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2 md:grid-cols-3">
            {services.map((service, index) => (
              <Pressable
                key={index}
                href={service.ctaUrl}
                className={cn(
                  "group relative overflow-hidden rounded-xl",
                  index === 0 && "md:col-span-2 md:row-span-2",
                  index > 0 && "aspect-square"
                )}
              >
                {service.image && (
                  <Img
                    src={service.image.src}
                    alt={service.image.alt}
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110",
                      index === 0
                        ? "aspect-square md:aspect-auto"
                        : "aspect-square"
                    )}
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                  <h3 className="text-lg font-bold text-white md:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                    {service.description}
                  </p>
                </div>
              </Pressable>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
