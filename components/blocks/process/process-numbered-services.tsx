"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface ProcessNumberedServicesProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    number: string;
    title: string;
    description: string;
    capabilities?: string[];
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
    number: "01",
    title: "Strategy & Consulting",
    description:
      "We help you define your digital strategy and roadmap, ensuring alignment between technology investments and business objectives.",
    capabilities: [
      "Digital Transformation",
      "Technology Assessment",
      "Roadmap Planning",
      "Change Management",
    ],
    ctaText: "Learn more",
    ctaUrl: "#strategy",
  },
  {
    number: "02",
    title: "Design & Experience",
    description:
      "Our design team creates intuitive, engaging experiences that delight users and drive business results.",
    capabilities: [
      "UX Research",
      "UI Design",
      "Design Systems",
      "Prototyping",
    ],
    ctaText: "Learn more",
    ctaUrl: "#design",
  },
  {
    number: "03",
    title: "Development & Engineering",
    description:
      "We build robust, scalable solutions using modern technologies and engineering best practices.",
    capabilities: [
      "Web Development",
      "Mobile Apps",
      "Cloud Architecture",
      "API Development",
    ],
    ctaText: "Learn more",
    ctaUrl: "#development",
  },
  {
    number: "04",
    title: "Growth & Optimization",
    description:
      "We help you grow and optimize your digital presence through data-driven strategies and continuous improvement.",
    capabilities: [
      "Analytics & Insights",
      "Performance Optimization",
      "A/B Testing",
      "SEO & Marketing",
    ],
    ctaText: "Learn more",
    ctaUrl: "#growth",
  },
];

const defaultProps: Partial<ProcessNumberedServicesProps> = {
  title: "Our Services",
  description:
    "Comprehensive solutions to help you succeed in the digital landscape.",
  services: defaultServices,
};

export function ProcessNumberedServices({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  services = defaultProps.services,
}: ProcessNumberedServicesProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-16 max-w-2xl">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight lg:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-foreground/50">{description}</p>
        </div>

        <div className="space-y-0">
          {services?.map((service, index) => (
            <div
              key={index}
              className="group grid gap-8 border-t py-12 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-1">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-primary bg-primary/5 text-xl font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {service.number}
                </div>
              </div>

              <div className="lg:col-span-4">
                <h3 className="mb-3 text-2xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="text-foreground/50 leading-relaxed">
                  {service.description}
                </p>
                {service.ctaText && service.ctaUrl && (
                  <Pressable
                    href={service.ctaUrl}
                    variant="ghost"
                    asButton
                    className="mt-4 inline-flex items-center gap-2 p-0 text-primary hover:text-primary/80"
                  >
                    {service.ctaText}
                    <DynamicIcon name="lucide/arrow-right" size={16} />
                  </Pressable>
                )}
              </div>

              <div className="lg:col-span-7">
                {service.capabilities && service.capabilities.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {service.capabilities.map((capability, cIndex) => (
                      <div
                        key={cIndex}
                        className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3"
                      >
                        <DynamicIcon
                          name="lucide/check-circle-2"
                          size={18}
                          className="text-primary"
                        />
                        <span className="text-sm font-medium">{capability}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
