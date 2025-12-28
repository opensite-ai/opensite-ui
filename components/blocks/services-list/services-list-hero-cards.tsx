"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ServicesListHeroCardsProps {
  className?: string;
  title?: string;
  description?: string;
  featuredService?: {
    title: string;
    description: string;
    badge?: string;
    image?: {
      src: string;
      alt: string;
    };
    ctaText?: string;
    ctaUrl?: string;
  };
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

const defaultFeaturedService = {
  title: "Full-Stack Development",
  description:
    "End-to-end development services from concept to deployment. We build scalable, performant applications using modern technologies and best practices.",
  badge: "Featured",
  image: {
    src: imagePlaceholders[0],
    alt: "Full-Stack Development",
  },
  ctaText: "Learn More",
  ctaUrl: "#",
};

const defaultServices = [
  {
    title: "Frontend Development",
    description: "React, Vue, and Angular applications",
    image: { src: imagePlaceholders[1], alt: "Frontend Development" },
    ctaUrl: "#",
  },
  {
    title: "Backend Development",
    description: "Node.js, Python, and Go services",
    image: { src: imagePlaceholders[2], alt: "Backend Development" },
    ctaUrl: "#",
  },
  {
    title: "Mobile Development",
    description: "iOS and Android applications",
    image: { src: imagePlaceholders[3], alt: "Mobile Development" },
    ctaUrl: "#",
  },
  {
    title: "DevOps & Cloud",
    description: "AWS, GCP, and Azure infrastructure",
    image: { src: imagePlaceholders[4], alt: "DevOps & Cloud" },
    ctaUrl: "#",
  },
];

/**
 * ServicesListHeroCards - A featured services layout with a large hero card and smaller supporting cards in a grid.
 * The hero card displays prominently with a badge, full description, and CTA button.
 * Supporting cards show as compact image cards with hover effects. Perfect for highlighting a primary service
 * while showcasing related offerings.
 */
export function ServicesListHeroCards({
  className,
  title = "Our Services",
  description = "Comprehensive digital solutions tailored to your business needs.",
  featuredService = defaultFeaturedService,
  services = defaultServices,
  optixFlowConfig,
}: ServicesListHeroCardsProps) {
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

          <div className="grid gap-8 lg:grid-cols-2">
            {featuredService && (
              <div className="group relative overflow-hidden rounded-2xl lg:row-span-2">
                {featuredService.image && (
                  <Img
                    src={featuredService.image.src}
                    alt={featuredService.image.alt}
                    className="h-full min-h-[400px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  {featuredService.badge && (
                    <Badge className="mb-4">{featuredService.badge}</Badge>
                  )}
                  <h3 className="text-2xl font-bold text-white md:text-3xl">
                    {featuredService.title}
                  </h3>
                  <p className="mt-3 text-white/80">
                    {featuredService.description}
                  </p>
                  {featuredService.ctaText && (
                    <Pressable
                      href={featuredService.ctaUrl}
                      variant="default"
                      className="mt-6"
                      asButton
                    >
                      {featuredService.ctaText}
                      <DynamicIcon
                        name="lucide/arrow-right"
                        className="ml-2 h-4 w-4"
                      />
                    </Pressable>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <Pressable
                  key={index}
                  href={service.ctaUrl}
                  className="group relative overflow-hidden rounded-xl"
                >
                  {service.image && (
                    <Img
                      src={service.image.src}
                      alt={service.image.alt}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      optixFlowConfig={optixFlowConfig}
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h4 className="font-semibold text-white">
                      {service.title}
                    </h4>
                    <p className="mt-1 text-xs text-white/70">
                      {service.description}
                    </p>
                  </div>
                </Pressable>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
