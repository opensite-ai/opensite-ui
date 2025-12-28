"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig, FeatureItem } from "../../../src/types";

export interface HeroFeatureCardsGridProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of feature items
   */
  features?: FeatureItem[];
  /**
   * Custom slot for features (overrides features array)
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
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the features container
   */
  featuresClassName?: string;
}

const defaultActions: ActionConfig[] = [
  {
    label: "Get started",
    href: "#",
    variant: "default",
    size: "lg",
    iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />,
  },
  {
    label: "View documentation",
    href: "#",
    variant: "outline",
    size: "lg",
  },
];

const defaultFeatures: FeatureItem[] = [
  {
    icon: "lucide/zap",
    title: "Lightning Fast",
    description: "Optimized for speed and performance",
  },
  {
    icon: "lucide/shield",
    title: "Secure by Default",
    description: "Enterprise-grade security built in",
  },
  {
    icon: "lucide/code",
    title: "Developer First",
    description: "APIs and SDKs for every platform",
  },
  {
    icon: "lucide/globe",
    title: "Global Scale",
    description: "Deploy anywhere in the world",
  },
];

export function HeroFeatureCardsGrid({
  heading = "Everything you need to build modern apps",
  description = "A complete platform with all the tools and features you need to create, deploy, and scale your applications.",
  actions = defaultActions,
  actionsSlot,
  features = defaultFeatures,
  featuresSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
}: HeroFeatureCardsGridProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

    return (
      <div className={cn("mt-10 flex flex-col justify-center gap-4 sm:flex-row", actionsClassName)}>
        {actions.map((action, index) => {
          const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={actionClassName}
              {...pressableProps}
            >
              {children ?? (
                <>
                  {icon}
                  {label}
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div className={cn("mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4", featuresClassName)}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <DynamicIcon name={feature.icon || "lucide/check"} size={24} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {feature.title}
            </h3>
            {feature.description && (
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-3xl text-center", contentClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-6 text-lg text-muted-foreground", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderActions()}
        </div>
        {renderFeatures()}
      </div>
    </section>
  );
}
