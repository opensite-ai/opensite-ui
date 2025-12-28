"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

interface MetricValue {
  value: string;
  unit?: string;
  desc: string;
}

interface MetricRow {
  title: string;
  optionA: MetricValue;
  optionB: MetricValue;
}

export interface ComparisonMetricsRowsProps {
  className?: string;
  title?: string;
  optionALabel?: string;
  optionBLabel?: string;
  metrics?: MetricRow[];
  footnotes?: string[];
  ctaText?: string;
  ctaHref?: string;
}

const defaultMetrics: MetricRow[] = [
  {
    title: "Initial Setup",
    optionA: { value: "6", unit: "mo", desc: "Enterprise implementation timeline" },
    optionB: { value: "2", unit: "wk", desc: "Rapid deployment process" },
  },
  {
    title: "Monthly Cost",
    optionA: { value: "$50k", unit: "+", desc: "Enterprise licensing fees" },
    optionB: { value: "$5k", unit: "", desc: "Predictable monthly pricing" },
  },
  {
    title: "Team Training",
    optionA: { value: "3", unit: "mo", desc: "Extensive onboarding required" },
    optionB: { value: "1", unit: "wk", desc: "Intuitive interface design" },
  },
  {
    title: "ROI Timeline",
    optionA: { value: "4", unit: "y", desc: "Standard enterprise timeline" },
    optionB: { value: "8", unit: "m", desc: "Accelerated market entry" },
  },
];

/**
 * ComparisonMetricsRows - Data-heavy comparison with metrics in rows
 *
 * Displays quantitative metrics in horizontal rows with large typography for
 * values and supporting descriptions. Each row compares two options with
 * prominent numbers, optional units, and explanatory text. Includes column
 * headers, footnotes section, and a call-to-action button.
 *
 * Best for: ROI comparisons, cost analysis, timeline comparisons, performance
 * metrics, quantitative feature breakdowns.
 */
export function ComparisonMetricsRows({
  className,
  title = "Compare Cloud vs On-site Infrastructure",
  optionALabel = "Traditional",
  optionBLabel = "Cloud-Native",
  metrics = defaultMetrics,
  footnotes = [
    "* Varies based on specific requirements and complexity",
    "^ Deployment time may vary depending on integration requirements",
    "# Additional costs may apply for premium features",
  ],
  ctaText = "Get Started",
  ctaHref = "#",
}: ComparisonMetricsRowsProps) {
  return (
    <section className={cn("bg-muted/30 py-32", className)}>
      <div className="container grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 mb-8 max-w-3xl md:col-span-8 md:mb-12 lg:col-span-10 lg:col-start-2 lg:mb-16">
          <h2 className="mb-4 text-center text-3xl font-bold sm:text-left md:text-4xl lg:text-6xl">
            {title}
          </h2>
        </div>

        <div className="col-span-4 px-4 md:col-span-8 lg:col-span-10 lg:col-start-2">
          <div className="grid grid-cols-4 items-center gap-4 md:grid-cols-8">
            <div className="col-span-4 md:col-span-2"></div>
            <div className="col-span-2 ml-0 md:col-span-3 md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
              <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase md:text-sm">
                {optionALabel}
              </h4>
            </div>
            <div className="col-span-2 ml-0 md:col-span-3 md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
              <h4 className="text-xs font-bold tracking-wider uppercase md:text-sm">
                {optionBLabel}
              </h4>
            </div>
          </div>
        </div>

        <div className="col-span-4 rounded-xl bg-background shadow-sm md:col-span-8 lg:col-span-10 lg:col-start-2">
          {metrics.map((row, index) => (
            <div
              key={index}
              className="group border-t px-4 transition-colors first:rounded-t-xl first:border-t-0 last:rounded-b-xl hover:bg-muted/50"
            >
              <div className="grid grid-cols-4 items-start gap-4 py-6 md:grid-cols-8 md:py-8">
                <h3 className="col-span-4 mt-2 text-base font-bold md:col-span-2 md:text-lg">
                  {row.title}
                </h3>

                <div className="col-span-2 flex flex-col md:col-span-3">
                  <div className="ml-0 transition-colors group-hover:text-foreground md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
                    <p className="mb-1 flex items-baseline text-2xl font-bold text-foreground md:mb-2 md:text-5xl">
                      {row.optionA.value}
                      {row.optionA.unit && (
                        <sup className="ml-0.5 text-xs text-foreground md:text-sm">
                          {row.optionA.unit}
                        </sup>
                      )}
                    </p>
                    <p className="text-xs leading-tight text-muted-foreground md:text-sm md:leading-normal">
                      {row.optionA.desc}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 flex flex-col md:col-span-3">
                  <div className="ml-0 transition-colors group-hover:text-accent-foreground md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
                    <p className="mb-1 flex items-baseline text-2xl font-bold text-foreground md:mb-2 md:text-5xl">
                      {row.optionB.value}
                      {row.optionB.unit && (
                        <sup className="ml-0.5 text-xs text-foreground md:text-sm">
                          {row.optionB.unit}
                        </sup>
                      )}
                    </p>
                    <p className="text-xs leading-tight text-muted-foreground md:text-sm md:leading-normal">
                      {row.optionB.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              {footnotes.map((note, idx) => (
                <p key={idx} className="text-xs text-muted-foreground md:text-sm">
                  {note}
                </p>
              ))}
            </div>
            <div className="flex justify-end">
              <Pressable
                href={ctaHref}
                variant="default"
                size="lg"
                asButton
                className="rounded-full px-8 transition-transform hover:scale-105"
              >
                {ctaText}
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
