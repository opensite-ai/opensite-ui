"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface TimelineProductivityItem {
  icon: string;
  title: string;
  description: string;
}

export interface TimelineProductivityListProps {
  className?: string;
  heading?: React.ReactNode;
  items?: TimelineProductivityItem[];
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultItems: TimelineProductivityItem[] = [
  {
    icon: "lucide/cloud",
    title: "Boost Productivity",
    description:
      "Streamline your workflows and eliminate inefficiencies with our advanced task management tools.",
  },
  {
    icon: "lucide/x-circle",
    title: "Minimize Errors",
    description:
      "Automate repetitive tasks to reduce human error and ensure consistent results.",
  },
  {
    icon: "lucide/users",
    title: "Enhance Collaboration",
    description:
      "Improve team communication and collaboration with real-time updates and shared workspaces.",
  },
  {
    icon: "lucide/scale",
    title: "Scale Seamlessly",
    description:
      "Grow your team and projects without hassle, thanks to flexible and scalable solutions.",
  },
  {
    icon: "lucide/file-check",
    title: "Track Progress",
    description:
      "Stay on top of your goals with detailed progress tracking and actionable insights.",
  },
  {
    icon: "lucide/clock",
    title: "Save Time",
    description:
      "Focus on what matters most by automating time-consuming tasks and processes.",
  },
];

export function TimelineProductivityList({
  className,
  heading,
  items = defaultItems,
}: TimelineProductivityListProps) {
  const defaultHeading = (
    <>
      Our tools make
      <br />
      productivity your
      <br />
      <span className="text-muted-foreground">superpower</span>
    </>
  );

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                {heading || defaultHeading}
              </h2>
            </div>
          </div>

          <div className="-mt-8 sm:-mt-12">
            {items.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col justify-center overflow-hidden border-b py-8 shadow-none sm:py-12"
              >
                <div className="flex gap-4 sm:gap-6">
                  <div className="shrink-0">
                    <DynamicIcon name={item.icon} size={48} />
                  </div>
                  <div>
                    <h4 className="mb-2 text-2xl font-semibold text-primary sm:text-3xl">
                      {item.title}
                    </h4>
                    <p className="mt-6 text-sm text-muted-foreground sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
