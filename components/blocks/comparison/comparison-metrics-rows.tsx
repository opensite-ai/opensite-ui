"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import type { ActionConfig } from "../../../src/types";

/**
 * Metric value with optional unit and description
 */
export interface MetricValue {
  value: string;
  unit?: string;
  desc: string;
}

/**
 * Metric row configuration for comparison
 */
export interface MetricRow {
  title: string;
  optionA: MetricValue;
  optionB: MetricValue;
}

export interface ComparisonMetricsRowsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Label for option A column
   */
  optionALabel?: React.ReactNode;
  /**
   * Label for option B column
   */
  optionBLabel?: React.ReactNode;
  /**
   * Array of metric rows to display
   */
  metrics?: MetricRow[];
  /**
   * Custom slot for rendering metrics (overrides metrics array)
   */
  metricsSlot?: React.ReactNode;
  /**
   * Array of footnote strings
   */
  footnotes?: string[];
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the metrics container
   */
  metricsClassName?: string;
  /**
   * Additional CSS classes for metric rows
   */
  metricRowClassName?: string;
  /**
   * Additional CSS classes for the footnotes container
   */
  footnotesClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
}

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
  heading = "Compare Cloud vs On-site Infrastructure",
  description,
  optionALabel = "Traditional",
  optionBLabel = "Cloud-Native",
  metrics,
  metricsSlot,
  footnotes,
  actions,
  actionsSlot,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  metricsClassName,
  metricRowClassName,
  footnotesClassName,
  actionsClassName,
}: ComparisonMetricsRowsProps): React.JSX.Element {
  const renderMetrics = () => {
    if (metricsSlot) return metricsSlot;

    return (
      <div className={cn("col-span-4 rounded-xl bg-background shadow-sm md:col-span-8 lg:col-span-10 lg:col-start-2", metricsClassName)}>
        {metrics.map((row, index) => (
          <div
            key={index}
            className={cn("group border-t px-4 transition-colors first:rounded-t-xl first:border-t-0 last:rounded-b-xl hover:bg-muted/50", metricRowClassName)}
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
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex justify-end", actionsClassName)}>
        {actions.map((action, idx) => (
          <Pressable
            key={idx}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant || "default"}
            size={action.size || "lg"}
            asButton
            className={cn("rounded-full px-8 transition-transform hover:scale-105", action.className)}
          >
            {action.icon}
            {action.label}
            {action.iconAfter}
          </Pressable>
        ))}
      </div>
    );
  };

  return (
    <section className={cn("bg-muted/30 py-32", className)}>
      <div className={cn("container grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 lg:grid-cols-12", containerClassName)}>
        <div className="col-span-4 mb-8 max-w-3xl md:col-span-8 md:mb-12 lg:col-span-10 lg:col-start-2 lg:mb-16">
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("mb-4 text-center text-3xl font-bold sm:text-left md:text-4xl lg:text-6xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-muted-foreground md:text-lg", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
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

        {renderMetrics()}

        <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2">
          <div className="flex flex-col space-y-4">
            <div className={cn("space-y-2", footnotesClassName)}>
              {footnotes.map((note, idx) => (
                <p key={idx} className="text-xs text-muted-foreground md:text-sm">
                  {note}
                </p>
              ))}
            </div>
            {renderActions()}
          </div>
        </div>
      </div>
    </section>
  );
}
