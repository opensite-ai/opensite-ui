import React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  optionAValue: string;
  optionBValue: string;
  optionAHighlight?: boolean;
  optionBHighlight?: boolean;
}

export interface ComparisonGridBadgesProps {
  className?: string;
  title?: string;
  description?: string;
  optionALabel?: string;
  optionBLabel?: string;
  features?: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    icon: "lucide/code-2",
    title: "Development Speed",
    description: "Time from concept to production deployment",
    optionAValue: "2-4 weeks",
    optionBValue: "3-6 months",
    optionAHighlight: true,
  },
  {
    icon: "lucide/headset",
    title: "Support Level",
    description: "Access to technical assistance and guidance",
    optionAValue: "24/7 Priority",
    optionBValue: "Business Hours",
    optionAHighlight: true,
  },
  {
    icon: "lucide/chart-line",
    title: "Scalability",
    description: "Ability to handle growth and increased demand",
    optionAValue: "Auto-scaling",
    optionBValue: "Manual",
    optionAHighlight: true,
  },
  {
    icon: "lucide/users",
    title: "Team Size",
    description: "Number of team members included",
    optionAValue: "Unlimited",
    optionBValue: "Up to 10",
    optionAHighlight: true,
  },
];

/**
 * ComparisonGridBadges - Grid-based comparison with icons and badges
 *
 * Displays features in a grid layout with icons, descriptions, and badge-style
 * value indicators for each option. Each feature card shows an icon, title,
 * description, and two badges comparing the options. Highlighted badges use
 * a distinct color to indicate the preferred choice.
 *
 * Best for: Feature-rich product comparisons, technical specification comparisons,
 * service tier breakdowns, capability matrices.
 */
export function ComparisonGridBadges({
  className,
  title = "Feature Comparison",
  description = "See how our solution compares to traditional approaches across key metrics.",
  optionALabel = "Our Solution",
  optionBLabel = "Traditional",
  features = defaultFeatures,
}: ComparisonGridBadgesProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <DynamicIcon
                    name={feature.icon}
                    size={20}
                    className="text-primary"
                  />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                {feature.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={feature.optionAHighlight ? "default" : "secondary"}
                  className="text-xs"
                >
                  {optionALabel}: {feature.optionAValue}
                </Badge>
                <Badge
                  variant={feature.optionBHighlight ? "default" : "outline"}
                  className="text-xs"
                >
                  {optionBLabel}: {feature.optionBValue}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
