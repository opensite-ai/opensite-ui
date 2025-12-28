"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

export interface ServicesListProgressSidebarProps {
  className?: string;
  sidebarTitle?: string;
  sidebarDescription?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  services?: Array<{
    icon?: string;
    title: string;
    description: string;
    progress?: number;
    status?: string;
  }>;
}

const defaultServices = [
  {
    icon: "lucide/lightbulb",
    title: "Discovery & Strategy",
    description:
      "We start by understanding your business goals, target audience, and competitive landscape.",
    progress: 100,
    status: "Completed",
  },
  {
    icon: "lucide/pen-tool",
    title: "Design & Prototyping",
    description:
      "Creating wireframes and high-fidelity designs that bring your vision to life.",
    progress: 100,
    status: "Completed",
  },
  {
    icon: "lucide/code",
    title: "Development",
    description:
      "Building your solution with clean, maintainable code and modern technologies.",
    progress: 75,
    status: "In Progress",
  },
  {
    icon: "lucide/test-tube",
    title: "Testing & QA",
    description:
      "Rigorous testing to ensure quality, performance, and security.",
    progress: 25,
    status: "Upcoming",
  },
  {
    icon: "lucide/rocket",
    title: "Launch & Support",
    description:
      "Deploying your solution and providing ongoing maintenance and support.",
    progress: 0,
    status: "Pending",
  },
];

/**
 * ServicesListProgressSidebar - A creative solutions layout with a sticky left sidebar and service list with progress indicators.
 * The sidebar contains title, description, and CTA. Each service displays with an icon, title, description, and visual progress bar.
 * Perfect for showcasing a process or methodology with clear status indicators for each phase.
 */
export function ServicesListProgressSidebar({
  className,
  sidebarTitle = "Our Creative Process",
  sidebarDescription = "We follow a proven methodology to deliver exceptional results. Each phase builds upon the previous to ensure your project's success.",
  primaryCtaText = "Start Your Project",
  primaryCtaUrl = "#",
  services = defaultServices,
}: ServicesListProgressSidebarProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {sidebarTitle}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {sidebarDescription}
            </p>
            <div className="mt-8">
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

          <div className="space-y-6 lg:col-span-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-xl border border-border p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                      service.progress === 100
                        ? "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400"
                        : service.progress && service.progress > 0
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {service.icon && (
                      <DynamicIcon name={service.icon} className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      {service.status && (
                        <span
                          className={cn(
                            "text-xs font-medium",
                            service.progress === 100
                              ? "text-green-600 dark:text-green-400"
                              : service.progress && service.progress > 0
                                ? "text-primary"
                                : "text-muted-foreground"
                          )}
                        >
                          {service.status}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                    {typeof service.progress === "number" && (
                      <div className="mt-4">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              service.progress === 100
                                ? "bg-green-500"
                                : "bg-primary"
                            )}
                            style={{ width: `${service.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
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
