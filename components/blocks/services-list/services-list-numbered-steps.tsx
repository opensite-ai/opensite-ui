"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

export interface ServicesListNumberedStepsProps {
  className?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  services?: Array<{
    title: string;
    description: string;
    items?: string[];
  }>;
}

const defaultServices = [
  {
    title: "Discovery & Research",
    description:
      "We start by understanding your business, goals, and target audience through comprehensive research and stakeholder interviews.",
    items: ["Stakeholder Interviews", "Market Research", "Competitive Analysis"],
  },
  {
    title: "Strategy & Planning",
    description:
      "Based on our findings, we develop a comprehensive strategy and project roadmap aligned with your business objectives.",
    items: ["Project Roadmap", "Technical Architecture", "Timeline Planning"],
  },
  {
    title: "Design & Prototyping",
    description:
      "Our design team creates intuitive, beautiful interfaces through iterative wireframing and prototyping.",
    items: ["Wireframing", "UI Design", "Interactive Prototypes"],
  },
  {
    title: "Development & Testing",
    description:
      "We build your solution using modern technologies with rigorous testing to ensure quality and performance.",
    items: ["Frontend Development", "Backend Development", "Quality Assurance"],
  },
  {
    title: "Launch & Support",
    description:
      "We deploy your solution and provide ongoing support to ensure continued success and growth.",
    items: ["Deployment", "Training", "Ongoing Maintenance"],
  },
];

/**
 * ServicesListNumberedSteps - A numbered steps layout displaying services as a sequential process.
 * Each step features a large number, title, description, and optional items list.
 * Connected by a vertical line to show progression. Perfect for showcasing a workflow,
 * process, or methodology with clear sequential steps and deliverables.
 */
export function ServicesListNumberedSteps({
  className,
  title = "Our Process",
  description = "A proven methodology that delivers results. Each step builds upon the previous to ensure your project's success.",
  primaryCtaText = "Start Your Project",
  primaryCtaUrl = "#",
  services = defaultServices,
}: ServicesListNumberedStepsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              {description}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 hidden h-full w-px bg-border md:block" />

            <div className="space-y-12">
              {services.map((service, index) => (
                <div key={index} className="relative flex gap-8">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-2xl font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 pt-3">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    {service.items && service.items.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.items.map((item, itemIndex) => (
                          <span
                            key={itemIndex}
                            className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm"
                          >
                            <DynamicIcon
                              name="lucide/check"
                              className="mr-1.5 h-3.5 w-3.5 text-primary"
                            />
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
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
      </div>
    </section>
  );
}
