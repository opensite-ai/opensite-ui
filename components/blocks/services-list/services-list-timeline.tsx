"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

export interface ServicesListTimelineProps {
  className?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  services?: Array<{
    icon?: string;
    title: string;
    description: string;
    duration?: string;
    deliverables?: string[];
  }>;
}

const defaultServices = [
  {
    icon: "lucide/search",
    title: "Discovery Phase",
    description:
      "We begin by understanding your business, goals, and target audience through comprehensive research.",
    duration: "Week 1-2",
    deliverables: ["Research Report", "User Personas", "Project Brief"],
  },
  {
    icon: "lucide/pen-tool",
    title: "Design Phase",
    description:
      "Our design team creates wireframes and high-fidelity mockups based on the research findings.",
    duration: "Week 3-4",
    deliverables: ["Wireframes", "UI Mockups", "Design System"],
  },
  {
    icon: "lucide/code",
    title: "Development Phase",
    description:
      "We build your solution using modern technologies with regular progress updates and demos.",
    duration: "Week 5-8",
    deliverables: ["Working Application", "Documentation", "Test Reports"],
  },
  {
    icon: "lucide/rocket",
    title: "Launch Phase",
    description:
      "We deploy your solution and provide training to ensure a smooth transition.",
    duration: "Week 9-10",
    deliverables: ["Live Deployment", "Training Sessions", "Support Plan"],
  },
];

/**
 * ServicesListTimeline - A timeline-style layout displaying services as project phases.
 * Each phase features an icon, title, description, duration badge, and deliverables list.
 * Connected by a vertical timeline line with dot markers. Perfect for showcasing a project
 * workflow or service delivery process with clear timelines and expected outcomes.
 */
export function ServicesListTimeline({
  className,
  title = "Our Process",
  description = "A structured approach to delivering exceptional results on time and on budget.",
  primaryCtaText = "Start Your Project",
  primaryCtaUrl = "#",
  services = defaultServices,
}: ServicesListTimelineProps) {
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
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative flex flex-col gap-4 md:flex-row md:gap-8",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div className="absolute left-4 top-0 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2">
                    {service.icon && (
                      <DynamicIcon
                        name={service.icon}
                        className="h-4 w-4 text-primary"
                      />
                    )}
                  </div>

                  <div
                    className={cn(
                      "ml-12 flex-1 md:ml-0",
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md",
                        index % 2 === 0 ? "md:mr-4" : "md:ml-4"
                      )}
                    >
                      <div
                        className={cn(
                          "mb-2 flex items-center gap-3",
                          index % 2 === 0 ? "md:justify-end" : ""
                        )}
                      >
                        <h3 className="text-lg font-semibold">{service.title}</h3>
                        {service.duration && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {service.duration}
                          </span>
                        )}
                      </div>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {service.description}
                      </p>
                      {service.deliverables && service.deliverables.length > 0 && (
                        <div
                          className={cn(
                            "flex flex-wrap gap-2",
                            index % 2 === 0 ? "md:justify-end" : ""
                          )}
                        >
                          {service.deliverables.map((deliverable, delIndex) => (
                            <span
                              key={delIndex}
                              className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs"
                            >
                              <DynamicIcon
                                name="lucide/check"
                                className="mr-1 h-3 w-3 text-primary"
                              />
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="hidden flex-1 md:block" />
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
