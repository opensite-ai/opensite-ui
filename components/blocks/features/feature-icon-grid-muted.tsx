"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface FeatureIconGridMutedItem {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/check-circle-2")
   */
  iconName?: string;
  /**
   * Feature title content
   */
  title?: React.ReactNode;
  /**
   * Feature description content
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
  /**
   * Additional CSS classes for the icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

export interface FeatureIconGridMutedProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of feature items
   */
  features?: FeatureIconGridMutedItem[];
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
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
}

const defaultFeatures: FeatureIconGridMutedItem[] = [
  {
    iconName: "lucide/check-circle-2",
    title: "Instant Approvals",
    description:
      "Quickly approve requests and tasks with a single click, reducing delays.",
  },
  {
    iconName: "lucide/git-graph",
    title: "Workflow Automation",
    description:
      "Automate repetitive tasks and streamline your processes for maximum efficiency.",
  },
  {
    iconName: "lucide/message-square",
    title: "Real-Time Collaboration",
    description:
      "Work together with your team in real-time, no matter where you are.",
  },
  {
    iconName: "lucide/star",
    title: "Priority Management",
    description:
      "Easily prioritize tasks and focus on what matters most to your business.",
  },
  {
    iconName: "lucide/zap",
    title: "Lightning Fast",
    description:
      "Experience blazing fast performance with optimized code and infrastructure.",
  },
];

/**
 * Feature Icon Grid Muted - Five-feature grid with muted background and
 * icon badges showcasing key capabilities.
 *
 * Layout: Muted background section with centered header and five-column grid.
 * Key features: Muted background, icon badges, centered text, responsive grid.
 * Best for: Key features, time-saving tools, capability highlights.
 *
 * @example
 * ```tsx
 * <FeatureIconGridMuted
 *   title="Key Features That Save You Time"
 *   description="Explore tools specifically built to enhance your workflow."
 *   features={[
 *     { iconName: "lucide/check-circle-2", title: "Instant Approvals", description: "Get quick approvals" },
 *   ]}
 * />
 * ```
 */
export function FeatureIconGridMuted({
  title = "Key Features That Save You Time",
  description = "Explore tools specifically built to enhance your workflow and boost efficiency.",
  features = defaultFeatures,
  featuresSlot,
  className,
  containerClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
}: FeatureIconGridMutedProps): React.JSX.Element {
  const renderFeatureIcon = (feature: FeatureIconGridMutedItem) => {
    if (feature.icon) return feature.icon;
    if (feature.iconName) return <DynamicIcon name={feature.iconName} size={24} className={feature.iconClassName} />;
    return null;
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <div
        key={index}
        className={cn("flex flex-col gap-2.5 rounded-xl border bg-background p-7", cardClassName, feature.className)}
      >
        {renderFeatureIcon(feature)}
        {feature.title && (
          typeof feature.title === "string" ? (
            <h3 className={cn("font-semibold", feature.titleClassName)}>{feature.title}</h3>
          ) : (
            <div className={cn("font-semibold", feature.titleClassName)}>{feature.title}</div>
          )
        )}
        {feature.description && (
          typeof feature.description === "string" ? (
            <p className={cn("text-sm text-muted-foreground", feature.descriptionClassName)}>
              {feature.description}
            </p>
          ) : (
            <div className={cn("text-sm text-muted-foreground", feature.descriptionClassName)}>
              {feature.description}
            </div>
          )
        )}
      </div>
    ));
  };

  return (
    <section className={cn("bg-muted/60 py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="flex flex-col gap-10">
          <div className={cn("mx-auto flex max-w-xl flex-col gap-2.5 text-center", headerClassName)}>
            {title && (
              typeof title === "string" ? (
                <h1 className={cn("text-4xl font-semibold md:text-5xl", titleClassName)}>{title}</h1>
              ) : (
                <div className={cn("text-4xl font-semibold md:text-5xl", titleClassName)}>{title}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-muted-foreground", descriptionClassName)}>{description}</p>
              ) : (
                <div className={cn("text-muted-foreground", descriptionClassName)}>{description}</div>
              )
            )}
          </div>
          <div className={cn("mx-auto grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", gridClassName)}>
            {renderFeatures()}
          </div>
        </div>
      </div>
    </section>
  );
}
