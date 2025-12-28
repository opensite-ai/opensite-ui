"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

export interface ServicesListMethodologyStepsProps {
  className?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  steps?: Array<{
    number: string;
    title: string;
    description: string;
    options?: string[];
  }>;
}

const defaultSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We begin by understanding your business, goals, and target audience through in-depth research and stakeholder interviews.",
    options: ["Stakeholder Interviews", "Market Research", "Competitive Analysis", "Goal Setting"],
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Based on our findings, we develop a comprehensive strategy that aligns with your business objectives.",
    options: ["Project Roadmap", "Technical Architecture", "Content Strategy", "Timeline Planning"],
  },
  {
    number: "03",
    title: "Design",
    description:
      "Our design team creates intuitive, beautiful interfaces that engage users and reflect your brand.",
    options: ["Wireframing", "UI Design", "Prototyping", "User Testing"],
  },
  {
    number: "04",
    title: "Development",
    description:
      "We build your solution using modern technologies and best practices for performance and scalability.",
    options: ["Frontend Development", "Backend Development", "API Integration", "Quality Assurance"],
  },
  {
    number: "05",
    title: "Launch & Support",
    description:
      "We deploy your solution and provide ongoing support to ensure continued success.",
    options: ["Deployment", "Training", "Monitoring", "Maintenance"],
  },
];

/**
 * ServicesListMethodologySteps - A structured methodology layout displaying numbered service steps with options.
 * Each step features a large number, title, description, and a list of included options/deliverables.
 * Perfect for showcasing a process, workflow, or methodology with clear sequential steps.
 */
export function ServicesListMethodologySteps({
  className,
  title = "Our Methodology",
  description = "A proven process that delivers results. Each step is designed to ensure your project's success.",
  primaryCtaText = "Start Your Project",
  primaryCtaUrl = "#",
  steps = defaultSteps,
}: ServicesListMethodologyStepsProps) {
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

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative grid gap-6 md:grid-cols-[100px_1fr] md:gap-8"
              >
                <div className="flex items-start">
                  <span className="text-5xl font-bold text-primary/20 transition-colors group-hover:text-primary/40 md:text-6xl">
                    {step.number}
                  </span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  {step.options && step.options.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {step.options.map((option, optionIndex) => (
                        <span
                          key={optionIndex}
                          className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm"
                        >
                          <DynamicIcon
                            name="lucide/check"
                            className="mr-1.5 h-3.5 w-3.5 text-primary"
                          />
                          {option}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-[50px] top-20 hidden h-[calc(100%-20px)] w-px bg-border md:block" />
                )}
              </div>
            ))}
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
