"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ServicesListImageCardsProps {
  className?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  services?: Array<{
    title: string;
    description: string;
    image?: {
      src: string;
      alt: string;
    };
    ctaText?: string;
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
    description:
      "Custom websites and web applications built with modern technologies for optimal performance.",
    image: {
      src: imagePlaceholders[0],
      alt: "Web Development",
    },
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    image: {
      src: imagePlaceholders[1],
      alt: "Mobile Apps",
    },
    ctaText: "Learn More",
    ctaUrl: "#",
  },
];

/**
 * ServicesListImageCards - An asymmetric layout with introductory text on the left and 2 featured service cards on the right.
 * Each service card features a large image overlay with gradient, title, description, and CTA link.
 * Perfect for showcasing 2-3 primary services with strong visual impact and clear calls to action.
 */
export function ServicesListImageCards({
  className,
  title = "Transform Your Digital Presence",
  description = "We specialize in creating digital experiences that drive results. Our team combines creativity with technical expertise to deliver solutions that exceed expectations.",
  primaryCtaText = "Get Started",
  primaryCtaUrl = "#",
  secondaryCtaText = "View Portfolio",
  secondaryCtaUrl = "#",
  services = defaultServices,
  optixFlowConfig,
}: ServicesListImageCardsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
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

          <div className="grid gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl"
              >
                {service.image && (
                  <Img
                    src={service.image.src}
                    alt={service.image.alt}
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    {service.description}
                  </p>
                  {service.ctaText && (
                    <Pressable
                      href={service.ctaUrl}
                      className="mt-4 inline-flex items-center text-sm font-medium text-white hover:underline"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
