"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface ProcessRoadmapTimelineProps {
  className?: string;
  title?: string;
  description?: string;
  milestones?: Array<{
    title: string;
    description: string;
    date?: string;
    status: "completed" | "in-progress" | "upcoming";
    features?: string[];
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultMilestones = [
  {
    title: "Foundation",
    description:
      "Establishing the core infrastructure and setting up the development environment.",
    date: "Q1 2024",
    status: "completed" as const,
    features: ["Core Architecture", "Database Setup", "Authentication System"],
  },
  {
    title: "Core Features",
    description:
      "Building the essential features that form the backbone of the platform.",
    date: "Q2 2024",
    status: "completed" as const,
    features: ["User Dashboard", "API Integration", "Notification System"],
  },
  {
    title: "Enhancement Phase",
    description:
      "Adding advanced features and improving user experience based on feedback.",
    date: "Q3 2024",
    status: "in-progress" as const,
    features: ["Analytics Dashboard", "Advanced Reporting", "Team Collaboration"],
  },
  {
    title: "Scale & Optimize",
    description:
      "Optimizing performance and preparing the platform for scale.",
    date: "Q4 2024",
    status: "upcoming" as const,
    features: ["Performance Optimization", "CDN Integration", "Load Balancing"],
  },
  {
    title: "Enterprise Features",
    description:
      "Rolling out enterprise-grade features for larger organizations.",
    date: "Q1 2025",
    status: "upcoming" as const,
    features: ["SSO Integration", "Audit Logs", "Custom Branding"],
  },
];

const defaultProps: Partial<ProcessRoadmapTimelineProps> = {
  title: "Product Roadmap",
  description:
    "Our journey from concept to completion, with clear milestones and deliverables.",
  milestones: defaultMilestones,
};

const StatusBadge = ({ status }: { status: "completed" | "in-progress" | "upcoming" }) => {
  const config = {
    completed: {
      label: "Completed",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      icon: "lucide/check-circle-2",
    },
    "in-progress": {
      label: "In Progress",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      icon: "lucide/loader-2",
    },
    upcoming: {
      label: "Upcoming",
      className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
      icon: "lucide/clock",
    },
  };

  const { label, className, icon } = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        className
      )}
    >
      <DynamicIcon name={icon} size={14} />
      {label}
    </span>
  );
};

export function ProcessRoadmapTimeline({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  milestones = defaultProps.milestones,
}: ProcessRoadmapTimelineProps) {
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

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border" />

          <div className="space-y-12">
            {milestones?.map((milestone, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex items-start gap-8",
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "flex-1",
                    index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md",
                      milestone.status === "in-progress" && "border-primary/50"
                    )}
                  >
                    <div
                      className={cn(
                        "mb-3 flex items-center gap-3",
                        index % 2 === 0 ? "justify-end" : "justify-start"
                      )}
                    >
                      {milestone.date && (
                        <span className="text-sm font-medium text-muted-foreground">
                          {milestone.date}
                        </span>
                      )}
                      <StatusBadge status={milestone.status} />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold tracking-tight">
                      {milestone.title}
                    </h3>
                    <p className="mb-4 text-foreground/50">{milestone.description}</p>
                    {milestone.features && milestone.features.length > 0 && (
                      <div
                        className={cn(
                          "flex flex-wrap gap-2",
                          index % 2 === 0 ? "justify-end" : "justify-start"
                        )}
                      >
                        {milestone.features.map((feature, fIndex) => (
                          <span
                            key={fIndex}
                            className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={cn(
                    "absolute left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-background",
                    milestone.status === "completed"
                      ? "border-green-500 bg-green-500 text-white"
                      : milestone.status === "in-progress"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground"
                  )}
                >
                  {milestone.status === "completed" ? (
                    <DynamicIcon name="lucide/check" size={20} />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
