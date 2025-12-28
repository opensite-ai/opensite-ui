"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ServicesListSplitChecklistProps {
  className?: string;
  badge?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  image?: {
    src: string;
    alt: string;
  };
  services?: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultServices = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Custom websites and web applications with clean code and intuitive interfaces that engage your visitors.",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description:
      "User-centered design solutions that enhance usability and create enjoyable digital experiences.",
  },
  {
    id: 3,
    title: "Digital Marketing",
    description:
      "Strategic campaigns that boost your online presence and connect you with your target audience.",
  },
  {
    id: 4,
    title: "SEO Optimization",
    description:
      "Technical and content optimization to improve visibility and drive organic traffic to your website.",
  },
  {
    id: 5,
    title: "Content Strategy",
    description:
      "Engaging, relevant content that resonates with your audience and supports your business goals.",
  },
];

/**
 * ServicesListSplitChecklist - A split layout with introductory content and image on the left, service checklist on the right.
 * The left column features a badge, title, description, dual CTAs, and an optional image.
 * The right column displays services as a checklist with check icons, titles, and descriptions.
 * Perfect for presenting services alongside compelling marketing copy and visual content.
 */
export function ServicesListSplitChecklist({
  className,
  badge = "Services",
  title = "How I Can Help You",
  description = "I offer specialized services designed to help you establish a strong online presence and achieve your business goals. Each service can be tailored to your specific needs or combined into a comprehensive solution.",
  primaryCtaText = "Get in touch",
  primaryCtaUrl = "#",
  secondaryCtaText = "View portfolio",
  secondaryCtaUrl = "#",
  image = {
    src: imagePlaceholders[0],
    alt: "Professional collaboration",
  },
  services = defaultServices,
  optixFlowConfig,
}: ServicesListSplitChecklistProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            {badge && (
              <Badge className="mb-6 w-fit" variant="outline">
                {badge}
              </Badge>
            )}
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Pressable href={primaryCtaUrl} size="lg" variant="default" asButton>
                {primaryCtaText}
                <DynamicIcon
                  name="lucide/arrow-right"
                  className="ml-2 h-4 w-4"
                />
              </Pressable>
              <Pressable href={secondaryCtaUrl} size="lg" variant="outline" asButton>
                {secondaryCtaText}
              </Pressable>
            </div>

            {image && (
              <div className="relative mt-12 hidden lg:block">
                <Img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-lg object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center rounded-xl border bg-card p-8 shadow-sm">
            <h3 className="mb-8 text-lg font-medium text-muted-foreground">
              Specialized services to help your business grow
            </h3>

            <div className="space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border-b border-border pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-1">
                      <DynamicIcon
                        name="lucide/check"
                        className="h-5 w-5 text-primary"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{service.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Pressable
                href="#"
                variant="outline"
                className="w-full"
                asButton
              >
                Request custom service
                <DynamicIcon
                  name="lucide/arrow-right"
                  className="ml-2 h-4 w-4"
                />
              </Pressable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
