"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import type { ActionConfig } from "../../../src/types";

export interface FeatureBadgeGridSixItem {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/git-pull-request")
   */
  iconName?: string;
  /**
   * Feature heading content
   */
  heading?: React.ReactNode;
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

export interface FeatureBadgeGridSixProps {
  /**
   * Badge label content
   */
  label?: React.ReactNode;
  /**
   * Custom badge slot (overrides label)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Array of feature items
   */
  features?: FeatureBadgeGridSixItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Button action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for action button (overrides action)
   */
  actionSlot?: React.ReactNode;
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
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the action container
   */
  actionContainerClassName?: string;
}

const defaultFeatures: FeatureBadgeGridSixItem[] = [
  {
    iconName: "lucide/git-pull-request",
    heading: "Quality",
    description:
      "Built with attention to detail and best practices. Every component is thoroughly tested and follows modern React patterns for reliability and performance.",
  },
  {
    iconName: "lucide/square-kanban",
    heading: "Experience",
    description:
      "Crafted with user experience in mind. Each component is designed to be intuitive, accessible, and provide smooth interactions across all devices.",
  },
  {
    iconName: "lucide/radio-tower",
    heading: "Support",
    description:
      "Comprehensive documentation and community support. Get help when you need it with detailed guides, examples, and active community assistance.",
  },
  {
    iconName: "lucide/wand-sparkles",
    heading: "Innovation",
    description:
      "Cutting-edge design patterns and modern web technologies. Stay ahead with the latest trends in UI/UX design and development practices.",
  },
  {
    iconName: "lucide/layers",
    heading: "Results",
    description:
      "Proven track record of successful implementations. These components have been battle-tested in real-world applications and deliver consistent results.",
  },
  {
    iconName: "lucide/battery-charging",
    heading: "Efficiency",
    description:
      "Optimized for performance and developer productivity. Lightweight, fast-loading components that help you build faster without compromising on quality.",
  },
];

const defaultAction: ActionConfig = {
  label: "More Features",
  href: "#",
  variant: "default",
};

/**
 * Feature Badge Grid Six - Six-feature grid with badge header and centered CTA button.
 *
 * Layout: Badge header, two-column grid of six features, centered CTA button.
 * Key features: Badge label, icon badges in accent circles, large heading, CTA button.
 * Best for: Feature overviews, capability lists, product highlights.
 *
 * @example
 * ```tsx
 * <FeatureBadgeGridSix
 *   label="Features"
 *   title="Fully featured components"
 *   features={[
 *     { iconName: "lucide/git-pull-request", heading: "Quality", description: "Built with care" },
 *   ]}
 *   action={{ label: "More Features", href: "/features" }}
 * />
 * ```
 */
export function FeatureBadgeGridSix({
  label = "Features",
  badgeSlot,
  title = "Fully featured components for Opensite AI & Tailwind",
  features = defaultFeatures,
  featuresSlot,
  action = defaultAction,
  actionSlot,
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  titleClassName,
  gridClassName,
  cardClassName,
  actionContainerClassName,
}: FeatureBadgeGridSixProps): React.JSX.Element {
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;
    if (!label) return null;
    return <Badge variant="secondary" className={badgeClassName}>{label}</Badge>;
  };

  const renderFeatureIcon = (feature: FeatureBadgeGridSixItem) => {
    if (feature.icon) return feature.icon;
    if (feature.iconName) {
      return (
        <DynamicIcon
          name={feature.iconName}
          size={16}
          className={cn("md:size-6", feature.iconClassName)}
        />
      );
    }
    return null;
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <div
        key={index}
        className={cn("flex gap-6 space-y-4 rounded-lg md:block", cardClassName, feature.className)}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
          {renderFeatureIcon(feature)}
        </span>
        <div>
          {feature.heading && (
            typeof feature.heading === "string" ? (
              <h3 className={cn("font-medium md:mb-2 md:text-xl", feature.headingClassName)}>
                {feature.heading}
              </h3>
            ) : (
              <div className={cn("font-medium md:mb-2 md:text-xl", feature.headingClassName)}>
                {feature.heading}
              </div>
            )
          )}
          {feature.description && (
            typeof feature.description === "string" ? (
              <p className={cn("text-sm text-muted-foreground md:text-base", feature.descriptionClassName)}>
                {feature.description}
              </p>
            ) : (
              <div className={cn("text-sm text-muted-foreground md:text-base", feature.descriptionClassName)}>
                {feature.description}
              </div>
            )
          )}
        </div>
      </div>
    ));
  };

  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    if (action.children) {
      return (
        <Pressable
          href={action.href}
          onClick={action.onClick}
          size="lg"
          variant={action.variant || "default"}
          asButton
          className={action.className}
          aria-label={action["aria-label"]}
        >
          {action.children}
        </Pressable>
      );
    }

    return (
      <Pressable
        href={action.href}
        onClick={action.onClick}
        size="lg"
        variant={action.variant || "default"}
        asButton
        className={action.className}
        aria-label={action["aria-label"]}
      >
        {action.icon}
        {action.label}
        {action.iconAfter}
      </Pressable>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {(label || badgeSlot || title) && (
          <div className={cn("mb-12 flex max-w-3xl flex-col gap-4", headerClassName)}>
            {renderBadge()}
            {title && (
              typeof title === "string" ? (
                <h2 className={cn("text-3xl font-medium md:text-4xl lg:text-5xl", titleClassName)}>
                  {title}
                </h2>
              ) : (
                <div className={cn("text-3xl font-medium md:text-4xl lg:text-5xl", titleClassName)}>
                  {title}
                </div>
              )
            )}
          </div>
        )}
        <div className={cn("grid gap-12 md:grid-cols-2", gridClassName)}>
          {renderFeatures()}
        </div>
        {(action || actionSlot) && (
          <div className={cn("mt-16 flex justify-center", actionContainerClassName)}>
            {renderAction()}
          </div>
        )}
      </div>
    </section>
  );
}
