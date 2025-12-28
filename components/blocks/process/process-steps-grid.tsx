"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface ProcessStepsGridProps {
  className?: string;
  title?: string;
  description?: string;
  steps?: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSteps = [
  {
    icon: "lucide/search",
    title: "Research & Discovery",
    description:
      "We dive deep into understanding your business, market, and users to identify opportunities and challenges.",
  },
  {
    icon: "lucide/lightbulb",
    title: "Ideation & Strategy",
    description:
      "Based on our research, we develop creative solutions and strategic approaches tailored to your needs.",
  },
  {
    icon: "lucide/pencil-ruler",
    title: "Design & Prototype",
    description:
      "Our design team creates intuitive interfaces and interactive prototypes for validation and feedback.",
  },
  {
    icon: "lucide/code-2",
    title: "Development",
    description:
      "We build robust, scalable solutions using modern technologies and best practices in software engineering.",
  },
  {
    icon: "lucide/test-tube-2",
    title: "Testing & QA",
    description:
      "Rigorous testing ensures your product meets the highest standards of quality and reliability.",
  },
  {
    icon: "lucide/rocket",
    title: "Launch & Support",
    description:
      "We handle deployment and provide ongoing support to ensure your product's continued success.",
  },
];

const defaultProps: Partial<ProcessStepsGridProps> = {
  title: "Our Process",
  description:
    "A systematic approach to delivering exceptional results through careful planning and execution.",
  steps: defaultSteps,
};

export function ProcessStepsGrid({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  steps = defaultProps.steps,
}: ProcessStepsGridProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight lg:text-5xl">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground/50">
            {description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps?.map((step, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <span className="absolute -right-4 -top-4 text-[120px] font-bold leading-none text-muted/20 transition-colors group-hover:text-primary/10">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10">
                {step.icon && (
                  <div className="mb-6 flex size-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <DynamicIcon name={step.icon} size={28} />
                  </div>
                )}
                <h3 className="mb-3 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-foreground/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
