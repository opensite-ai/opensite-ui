"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface AboutStatsSidebarProps {
  className?: string;
  title?: string;
  description?: string;
  stats?: Array<{
    icon?: string;
    value: string;
    label: string;
    description?: string;
  }>;
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const defaultStats = [
  {
    icon: "lucide/users",
    value: "10M+",
    label: "Active Users",
    description: "Developers and teams using our platform daily",
  },
  {
    icon: "lucide/globe",
    value: "150+",
    label: "Countries",
    description: "Global reach across every continent",
  },
  {
    icon: "lucide/code",
    value: "1B+",
    label: "Lines of Code",
    description: "Generated through our platform",
  },
  {
    icon: "lucide/star",
    value: "4.9/5",
    label: "Rating",
    description: "Average customer satisfaction score",
  },
];

const defaultFeatures = [
  {
    icon: "lucide/rocket",
    title: "Fast Deployment",
    description: "Deploy your applications in seconds, not hours.",
  },
  {
    icon: "lucide/shield-check",
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption.",
  },
  {
    icon: "lucide/headphones",
    title: "24/7 Support",
    description: "Our team is always here to help you succeed.",
  },
];

const defaultProps: Partial<AboutStatsSidebarProps> = {
  title: "Why Choose Us",
  description:
    "We've built a platform that scales with your needs, from startup to enterprise. Here's what sets us apart.",
  stats: defaultStats,
  features: defaultFeatures,
};

export function AboutStatsSidebar({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  stats = defaultProps.stats,
  features = defaultProps.features,
}: AboutStatsSidebarProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          </div>

          <div className="lg:col-span-2">
            {stats && stats.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border bg-card p-6"
                  >
                    {stat.icon && (
                      <DynamicIcon
                        name={stat.icon}
                        size={24}
                        className="text-primary"
                      />
                    )}
                    <p className="mt-4 text-4xl font-bold">{stat.value}</p>
                    <p className="mt-1 font-semibold">{stat.label}</p>
                    {stat.description && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {features && features.length > 0 && (
              <div className="mt-12 space-y-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <DynamicIcon
                        name={feature.icon}
                        size={24}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
