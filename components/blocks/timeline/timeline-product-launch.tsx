"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Progress } from "../../ui/progress";

export interface TimelineProductLaunchStep {
  number: string;
  title: string;
  heading: string;
  description: string;
  progress: number;
  duration: string;
}

export interface TimelineProductLaunchProps {
  className?: string;
  heading?: string;
  description?: string;
  cardHeading?: string;
  ctaButton?: {
    text: string;
    url: string;
  };
  steps?: TimelineProductLaunchStep[];
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSteps: TimelineProductLaunchStep[] = [
  {
    number: "01",
    title: "Ideation",
    heading: "Brainstorm and validate your concept",
    description:
      "Gather insights from market research, customer interviews, and competitor analysis to refine your product idea.",
    progress: 15,
    duration: "~2 weeks",
  },
  {
    number: "02",
    title: "Development",
    heading: "Build your MVP",
    description:
      "Design, prototype, and develop the minimum viable product. Iterate quickly based on early feedback and testing.",
    progress: 85,
    duration: "~6 weeks",
  },
  {
    number: "03",
    title: "Launch",
    heading: "Go to market",
    description:
      "Execute your launch plan with marketing campaigns, outreach, and customer support to maximize impact and adoption.",
    progress: 100,
    duration: "Launch complete",
  },
];

export function TimelineProductLaunch({
  className,
  heading = "Journey to Product Launch",
  description = "Follow the essential steps to bring your innovative idea to market and ensure a successful product debut.",
  cardHeading = "Guidance from industry leaders",
  ctaButton = {
    text: "Request a demo",
    url: "#",
  },
  steps = defaultSteps,
}: TimelineProductLaunchProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl font-semibold md:text-5xl">{heading}</h1>
          <p className="max-w-2xl text-muted-foreground">{description}</p>
        </div>
        <div className="mt-8 flex flex-col gap-6 rounded-xl border border-border bg-card p-4 sm:p-8 lg:p-11">
          <div className="contents items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold tracking-tight">
              {cardHeading}
            </h2>
            <Pressable href={ctaButton.url} variant="default" asButton className="order-last">
              {ctaButton.text}
            </Pressable>
          </div>
          <div className="mt-3 flex gap-4 sm:flex-col">
            <div className="relative">
              <div className="grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:grid-cols-3 sm:items-center">
                <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-ring sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:translate-x-0" />
                {steps.map((_, index) => (
                  <span
                    key={index}
                    className="relative top-3 size-2 rounded-full bg-ring sm:top-0"
                  />
                ))}
              </div>
              <div className="animate-timeline-reveal absolute inset-0 grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:grid-cols-3 sm:items-center">
                <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-primary sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:translate-x-0" />
                {steps.map((_, index) => (
                  <span
                    key={index}
                    className="relative top-3 size-2 rounded-full bg-primary sm:top-0"
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex h-full flex-col justify-between gap-4"
                >
                  <div className="flex flex-col">
                    <div className="flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-border bg-border text-sm font-medium">
                      <span className="grid h-full place-items-center bg-background px-2">
                        {step.number}
                      </span>
                      <span className="grid h-full place-items-center bg-background px-2">
                        {step.title}
                      </span>
                    </div>
                    <h3 className="mt-5 font-medium">{step.heading}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Progress value={step.progress} className="h-1 flex-1" />
                      <span className="w-8 text-right text-xs text-muted-foreground">
                        {step.progress}%
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {step.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        /* Mobile: Top to bottom animation */
        @keyframes timeline-reveal-mobile {
          from {
            clip-path: inset(0 0 100% 0);
          }
          to {
            clip-path: inset(0% 0 0 0);
          }
        }
        
        /* Desktop: Left to right animation */
        @keyframes timeline-reveal-desktop {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0% 0 0);
          }
        }
        
        .animate-timeline-reveal {
          animation: timeline-reveal-mobile 5s linear;
        }
        
        @media (min-width: 640px) {
          .animate-timeline-reveal {
            animation: timeline-reveal-desktop 5s linear;
          }
        }
        `}
      </style>
    </section>
  );
}
