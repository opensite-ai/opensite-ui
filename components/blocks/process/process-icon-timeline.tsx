"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface ProcessIconTimelineProps {
  className?: string;
  title?: string;
  description?: string;
  steps?: Array<{
    icon: string;
    title: string;
    description: string;
    highlights?: string[];
    badgeColor?: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSteps = [
  {
    icon: "lucide/lightbulb",
    title: "Discovery & Research",
    description:
      "We start by understanding your business, goals, and target audience through comprehensive research and analysis.",
    highlights: ["Market Analysis", "User Research", "Competitive Review"],
    badgeColor: "bg-blue-500",
  },
  {
    icon: "lucide/pencil-ruler",
    title: "Strategy & Planning",
    description:
      "Based on our findings, we develop a strategic roadmap that outlines the approach, timeline, and key deliverables.",
    highlights: ["Project Roadmap", "Resource Planning", "Risk Assessment"],
    badgeColor: "bg-purple-500",
  },
  {
    icon: "lucide/code",
    title: "Design & Development",
    description:
      "Our team brings the strategy to life through iterative design and development cycles with regular feedback loops.",
    highlights: ["UI/UX Design", "Frontend Development", "Backend Integration"],
    badgeColor: "bg-green-500",
  },
  {
    icon: "lucide/test-tube",
    title: "Testing & QA",
    description:
      "Rigorous testing ensures quality and reliability across all platforms and use cases before launch.",
    highlights: ["Unit Testing", "Integration Testing", "User Acceptance"],
    badgeColor: "bg-orange-500",
  },
  {
    icon: "lucide/rocket",
    title: "Launch & Deploy",
    description:
      "We handle the deployment process with care, ensuring a smooth transition to production environments.",
    highlights: ["Deployment Strategy", "Performance Monitoring", "Go-Live Support"],
    badgeColor: "bg-red-500",
  },
  {
    icon: "lucide/bar-chart-3",
    title: "Monitor & Optimize",
    description:
      "Post-launch, we continuously monitor performance and implement optimizations based on real-world data.",
    highlights: ["Analytics Review", "Performance Tuning", "A/B Testing"],
    badgeColor: "bg-teal-500",
  },
  {
    icon: "lucide/refresh-cw",
    title: "Iterate & Improve",
    description:
      "We believe in continuous improvement, regularly updating and enhancing based on user feedback and market changes.",
    highlights: ["Feature Updates", "User Feedback", "Continuous Delivery"],
    badgeColor: "bg-indigo-500",
  },
];

const defaultProps: Partial<ProcessIconTimelineProps> = {
  title: "Our Process",
  description:
    "A proven methodology that delivers exceptional results through careful planning and execution.",
  steps: defaultSteps,
};

export function ProcessIconTimeline({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  steps = defaultProps.steps,
}: ProcessIconTimelineProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-16 max-w-2xl">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight lg:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-foreground/50">{description}</p>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-12">
            {steps?.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex flex-col gap-6 pl-16 lg:flex-row lg:gap-12 lg:pl-0",
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "absolute left-0 flex size-12 items-center justify-center rounded-full text-white lg:left-1/2 lg:-translate-x-1/2",
                    step.badgeColor || "bg-primary"
                  )}
                >
                  <DynamicIcon name={step.icon} size={24} />
                </div>

                <div
                  className={cn(
                    "flex-1 lg:text-right",
                    index % 2 !== 0 && "lg:text-left"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg border bg-card p-6 shadow-sm",
                      index % 2 === 0 ? "lg:mr-12" : "lg:ml-12"
                    )}
                  >
                    <h3 className="mb-2 text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mb-4 text-foreground/50">{step.description}</p>
                    {step.highlights && step.highlights.length > 0 && (
                      <div
                        className={cn(
                          "flex flex-wrap gap-2",
                          index % 2 === 0 ? "lg:justify-end" : "lg:justify-start"
                        )}
                      >
                        {step.highlights.map((highlight, hIndex) => (
                          <span
                            key={hIndex}
                            className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
