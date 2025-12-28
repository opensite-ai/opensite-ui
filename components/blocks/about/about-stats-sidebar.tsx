"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { FeatureItem, StatItem } from "../../../src/types";

interface ExtendedStatItem extends StatItem {
  description?: React.ReactNode;
}

export interface AboutStatsSidebarProps {
  /**
   * Main heading/title
   */
  title?: React.ReactNode;
  /**
   * Main description text
   */
  description?: React.ReactNode;
  /**
   * Array of stat configurations
   */
  stats?: ExtendedStatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Array of feature configurations
   */
  features?: FeatureItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for the features container
   */
  featuresClassName?: string;
}

const defaultStats: ExtendedStatItem[] = [
  {
    icon: <DynamicIcon name="lucide/users" size={24} className="text-primary" />,
    value: "10M+",
    label: "Active Users",
    description: "Developers and teams using our platform daily",
  },
  {
    icon: <DynamicIcon name="lucide/globe" size={24} className="text-primary" />,
    value: "150+",
    label: "Countries",
    description: "Global reach across every continent",
  },
  {
    icon: <DynamicIcon name="lucide/code" size={24} className="text-primary" />,
    value: "1B+",
    label: "Lines of Code",
    description: "Generated through our platform",
  },
  {
    icon: <DynamicIcon name="lucide/star" size={24} className="text-primary" />,
    value: "4.9/5",
    label: "Rating",
    description: "Average customer satisfaction score",
  },
];

const defaultFeatures: FeatureItem[] = [
  {
    icon: <DynamicIcon name="lucide/rocket" size={24} className="text-primary" />,
    title: "Fast Deployment",
    description: "Deploy your applications in seconds, not hours.",
  },
  {
    icon: <DynamicIcon name="lucide/shield-check" size={24} className="text-primary" />,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption.",
  },
  {
    icon: <DynamicIcon name="lucide/headphones" size={24} className="text-primary" />,
    title: "24/7 Support",
    description: "Our team is always here to help you succeed.",
  },
];

export function AboutStatsSidebar({
  title = "Why Choose Us",
  description = "We've built a platform that scales with your needs, from startup to enterprise. Here's what sets us apart.",
  stats = defaultStats,
  statsSlot,
  features = defaultFeatures,
  featuresSlot,
  className,
  containerClassName,
  sidebarClassName,
  titleClassName,
  descriptionClassName,
  statsClassName,
  featuresClassName,
}: AboutStatsSidebarProps): React.JSX.Element {
  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className={cn("grid gap-6 sm:grid-cols-2", statsClassName)}>
        {stats.map((stat, idx) => (
          <div key={idx} className="rounded-xl border bg-card p-6">
            {stat.icon}
            {typeof stat.value === "string" ? (
              <p className="mt-4 text-4xl font-bold">{stat.value}</p>
            ) : (
              <div className="mt-4">{stat.value}</div>
            )}
            {typeof stat.label === "string" ? (
              <p className="mt-1 font-semibold">{stat.label}</p>
            ) : (
              <div className="mt-1">{stat.label}</div>
            )}
            {stat.description && (
              typeof stat.description === "string" ? (
                <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
              ) : (
                <div className="mt-2">{stat.description}</div>
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div className={cn("mt-12 space-y-6", featuresClassName)}>
        {features.map((feature, idx) => (
          <div key={idx} className="flex gap-4">
            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10", feature.iconBgClass)}>
              {feature.icon}
            </div>
            <div>
              {feature.title && (
                typeof feature.title === "string" ? (
                  <h3 className="font-semibold">{feature.title}</h3>
                ) : (
                  feature.title
                )
              )}
              {feature.description && (
                typeof feature.description === "string" ? (
                  <p className="text-muted-foreground">{feature.description}</p>
                ) : (
                  feature.description
                )
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className={cn("lg:sticky lg:top-24 lg:self-start", sidebarClassName)}>
            {title && (
              typeof title === "string" ? (
                <h2 className={cn("text-3xl font-bold tracking-tight md:text-4xl", titleClassName)}>
                  {title}
                </h2>
              ) : (
                <div className={titleClassName}>{title}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mt-4 text-lg text-muted-foreground", descriptionClassName)}>{description}</p>
              ) : (
                <div className={cn("mt-4", descriptionClassName)}>{description}</div>
              )
            )}
          </div>

          <div className="lg:col-span-2">
            {(statsSlot || (stats && stats.length > 0)) && renderStats()}
            {(featuresSlot || (features && features.length > 0)) && renderFeatures()}
          </div>
        </div>
      </div>
    </section>
  );
}
