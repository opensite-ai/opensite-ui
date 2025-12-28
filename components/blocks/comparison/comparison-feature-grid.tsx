import React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

interface FeatureRow {
  icon: string;
  label: string;
  description: string;
  optionA: true | false | "partial";
  optionB: true | false | "partial";
}

export interface ComparisonFeatureGridProps {
  className?: string;
  title?: string;
  description?: string;
  optionALabel?: string;
  optionBLabel?: string;
  features?: FeatureRow[];
}

const defaultFeatures: FeatureRow[] = [
  {
    icon: "lucide/layout-dashboard",
    label: "Design System",
    description: "Modern, utility-first vs classic, component-based.",
    optionA: true,
    optionB: true,
  },
  {
    icon: "lucide/settings-2",
    label: "Customization",
    description: "Highly customizable vs limited by default.",
    optionA: true,
    optionB: false,
  },
  {
    icon: "lucide/moon",
    label: "Dark Mode",
    description: "Built-in dark mode vs requires extra setup.",
    optionA: true,
    optionB: false,
  },
  {
    icon: "lucide/type",
    label: "TypeScript Support",
    description: "First-class TypeScript support vs partial support.",
    optionA: true,
    optionB: "partial",
  },
  {
    icon: "lucide/accessibility",
    label: "Accessibility",
    description: "Focus on accessibility (a11y) vs basic support.",
    optionA: true,
    optionB: false,
  },
  {
    icon: "lucide/list-checks",
    label: "Component Count",
    description: "30+ components vs 25+ components.",
    optionA: true,
    optionB: true,
  },
  {
    icon: "lucide/badge-check",
    label: "License",
    description: "MIT license for both.",
    optionA: true,
    optionB: true,
  },
  {
    icon: "lucide/gem",
    label: "Premium Components",
    description: "Premium components available vs not included.",
    optionA: true,
    optionB: false,
  },
  {
    icon: "lucide/figma",
    label: "Figma Kit",
    description: "Official Figma kit available vs not available.",
    optionA: true,
    optionB: false,
  },
];

/**
 * ComparisonFeatureGrid - Feature grid with icons and status indicators
 *
 * Displays features in a responsive list format with icons, labels, descriptions,
 * and check/x indicators for each option. Each row shows the feature icon on the
 * left, feature details in the middle, and status indicators on the right.
 * Supports true/false/partial states with corresponding visual indicators.
 *
 * Best for: Framework comparisons, library comparisons, detailed feature
 * matrices, technology stack evaluations.
 */
export function ComparisonFeatureGrid({
  className,
  title = "Compare Us",
  description = "A modern framework for building websites that is better than the competition.",
  optionALabel = "Our Solution",
  optionBLabel = "Alternative",
  features = defaultFeatures,
}: ComparisonFeatureGridProps) {
  const renderStatusIcon = (status: true | false | "partial") => {
    if (status === true) {
      return <DynamicIcon name="lucide/check" size={20} className="text-green-600" />;
    }
    if (status === "partial") {
      return <DynamicIcon name="lucide/check" size={20} className="text-yellow-500" />;
    }
    return <DynamicIcon name="lucide/x" size={20} className="text-destructive" />;
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-4 text-center text-4xl font-semibold">{title}</h2>
        <p className="mb-8 text-center text-muted-foreground">{description}</p>
        <div className="mx-auto max-w-4xl divide-y divide-border overflow-x-auto rounded-lg border-border bg-background shadow">
          <div className="hidden rounded-t-lg bg-muted text-left text-base font-semibold text-foreground sm:flex">
            <div className="w-16 px-6 py-4"></div>
            <div className="flex-1 px-6 py-4">Feature</div>
            <div className="w-40 px-6 py-4">{optionALabel}</div>
            <div className="w-40 px-6 py-4">{optionBLabel}</div>
          </div>
          {features.map((row, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start text-left sm:flex-row sm:items-center"
            >
              <div className="flex w-full items-center justify-start px-6 pt-4 sm:w-16 sm:justify-center sm:py-4">
                <DynamicIcon name={row.icon} size={20} className="text-gray-500" />
                <span className="ml-3 text-base font-medium sm:hidden">
                  {row.label}
                </span>
              </div>
              <div className="w-full flex-1 px-6 pb-2 sm:py-4">
                <div className="hidden font-medium sm:block">{row.label}</div>
                <div className="mt-2 mb-2 text-sm text-muted-foreground sm:mb-0">
                  {row.description}
                </div>
              </div>
              <div className="flex w-full items-center justify-start px-6 pb-2 sm:w-40 sm:justify-center sm:py-4">
                {renderStatusIcon(row.optionA)}
                <span className="ml-2 text-xs font-medium text-muted-foreground sm:hidden">
                  {optionALabel}
                </span>
              </div>
              <div className="flex w-full items-center justify-start border-border px-6 pb-4 sm:w-40 sm:justify-center sm:border-0 sm:py-4">
                {renderStatusIcon(row.optionB)}
                <span className="ml-2 text-xs font-medium text-muted-foreground sm:hidden">
                  {optionBLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
