"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface ProcessStickyStepsProps {
  className?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  steps?: Array<{
    step: string;
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
    step: "01",
    title: "Discover & Research",
    description:
      "We begin by understanding your business goals, target audience, and current challenges. This phase involves research, analysis, and strategic planning to identify opportunities.",
  },
  {
    step: "02",
    title: "Strategy & Planning",
    description:
      "Based on our findings, we develop a comprehensive strategy that aligns with your objectives. This includes defining the approach, timeline, and key milestones for success.",
  },
  {
    step: "03",
    title: "Execute & Develop",
    description:
      "We bring the strategy to life through careful implementation and development. Our team works collaboratively to ensure every detail meets your requirements and standards.",
  },
  {
    step: "04",
    title: "Optimize & Improve",
    description:
      "We continuously monitor performance and gather feedback to refine and improve the solution. This iterative process ensures long-term success and growth.",
  },
];

const defaultProps: Partial<ProcessStickyStepsProps> = {
  title: "Our Process",
  description:
    "We follow a proven methodology to deliver exceptional results for every project we undertake.",
  ctaText: "Get in touch",
  ctaUrl: "#contact",
  steps: defaultSteps,
};

const CornerIllustration = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="0.607422"
        y1="2.57422"
        x2="21.5762"
        y2="2.57422"
        stroke="currentColor"
        strokeWidth="4"
      />
      <line
        x1="19.5762"
        y1="19.624"
        x2="19.5762"
        y2="4.57422"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  );
};

export function ProcessStickySteps({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  ctaText = defaultProps.ctaText,
  ctaUrl = defaultProps.ctaUrl,
  steps = defaultProps.steps,
}: ProcessStickyStepsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">
          <div className="top-10 col-span-2 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
            <div className="relative w-fit text-5xl font-semibold tracking-tight lg:text-7xl">
              <h1 className="w-fit">{title}</h1>
              <DynamicIcon
                name="lucide/asterisk"
                size={40}
                className="absolute -top-2 -right-2 text-primary md:size-10 lg:-right-14"
              />
            </div>
            <p className="text-base text-foreground/50">{description}</p>

            {ctaText && ctaUrl && (
              <Pressable
                href={ctaUrl}
                variant="ghost"
                asButton
                className="flex items-center justify-start gap-2"
              >
                <DynamicIcon
                  name="lucide/corner-down-right"
                  size={20}
                  className="text-primary"
                />
                {ctaText}
              </Pressable>
            )}
          </div>
          <ul className="relative col-span-4 w-full lg:pl-22">
            {steps?.map((step, index) => (
              <li
                key={index}
                className="relative flex flex-col justify-between gap-10 border-t py-8 md:flex-row lg:py-10"
              >
                <CornerIllustration className="absolute top-4 right-0 text-primary" />

                <div className="flex size-12 items-center justify-center bg-muted px-4 py-1 tracking-tighter">
                  0{index + 1}
                </div>
                <div className="">
                  <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-foreground/50">{step.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
