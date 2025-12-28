"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";

export interface FeatureCapabilitiesGridItem {
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature description
   */
  description: string;
  /**
   * Icon name
   */
  icon: string;
  /**
   * Optional badge label
   */
  badge?: string;
}

export interface FeatureCapabilitiesGridProps {
  /**
   * Eyebrow label
   */
  eyebrow?: string;
  /**
   * Section heading
   */
  heading?: string;
  /**
   * Feature items
   */
  items?: FeatureCapabilitiesGridItem[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
}

const defaultItems: FeatureCapabilitiesGridItem[] = [
  {
    title: "Reasoned Guidance",
    icon: "lucide/brain",
    description:
      "Clarify complex decisions with OpenSite AI reasoning and proactive analysis.",
  },
  {
    title: "Visual Intelligence",
    icon: "lucide/camera",
    description:
      "Interpret imagery, inspections, and documentation with precision and confidence.",
  },
  {
    title: "Workflow Automations",
    icon: "lucide/plug",
    description:
      "Integrate operational tools and orchestrate tasks across teams and partners.",
  },
  {
    title: "Structured Outputs",
    icon: "lucide/braces",
    description:
      "Transform complex updates into actionable summaries and structured reports.",
  },
  {
    title: "Image Generation",
    icon: "lucide/image",
    description:
      "Create branded visuals and personalized assets for coverage communications.",
  },
  {
    title: "Live Research",
    icon: "lucide/search",
    badge: "New",
    description:
      "Access real-time market and carrier insights with trusted data sources.",
  },
];

/**
 * FeatureCapabilitiesGrid - Dark capability grid with animated highlight cards.
 * Ideal for showcasing platform features, AI capabilities, or service pillars.
 */
export function FeatureCapabilitiesGrid({
  eyebrow = "[ CAPABILITIES ]",
  heading = "Models that adapt to your coverage strategy",
  items = defaultItems,
  className,
}: FeatureCapabilitiesGridProps): React.JSX.Element {
  return (
    <section className={cn("bg-foreground py-16 text-background", className)}>
      <div className="container">
        <p className="text-xs tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Card
              key={`${item.title}-${index}`}
              className="group relative overflow-visible border-white/10 bg-white/5 p-0 transition-colors duration-300 hover:border-white/20"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-[1px] rounded-xl bg-linear-to-br from-white/10 via-white/5 to-transparent" />
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-tr from-white/0 to-white/0 transition-colors group-hover:from-white/[0.03] group-hover:to-white/[0.06]" />

              <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
                <div className="absolute -left-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -left-2 -bottom-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -bottom-2 h-3 w-3 bg-white" />
              </div>

              <CardHeader className="relative z-10 flex flex-row items-start gap-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white">
                  <DynamicIcon name={item.icon} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-medium text-white">
                      {item.title}
                    </CardTitle>
                    {item.badge ? (
                      <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] leading-none text-white/70">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 px-6 pb-6 text-sm text-white/70">
                {item.description}
              </CardContent>

              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-white/0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
