"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig, FeatureItem } from "../../../src/types";

export interface HeroCenteredGradientCtaProps {
  /**
   * Badge/announcement content
   */
  badge?: React.ReactNode;
  /**
   * Badge icon
   */
  badgeIcon?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Highlighted text within heading (gradient styled)
   */
  headingHighlight?: string;
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
   * Array of feature/benefit items
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
   * Additional CSS classes for the gradient background
   */
  gradientClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
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
    label: "Get started free",
    href: "#",
    variant: "default",
    size: "lg",
    className: "rounded-full px-8",
    iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />,
  },
  {
    label: "Watch demo",
    href: "#",
    variant: "outline",
    size: "lg",
    className: "rounded-full px-8",
    icon: <DynamicIcon name="lucide/play" size={16} className="mr-2" />,
  },
];

const defaultFeatures: FeatureItem[] = [
  { title: "Free 14-day trial", icon: <DynamicIcon name="lucide/check-circle" size={16} className="text-green-500" /> },
  { title: "No credit card required", icon: <DynamicIcon name="lucide/check-circle" size={16} className="text-green-500" /> },
  { title: "Cancel anytime", icon: <DynamicIcon name="lucide/check-circle" size={16} className="text-green-500" /> },
];

export function HeroCenteredGradientCta({
  badge = "Introducing our new platform",
  badgeIcon = <DynamicIcon name="lucide/sparkles" size={16} className="text-primary" />,
  heading,
  headingHighlight = "extraordinary",
  description = "Create stunning applications with our powerful platform. Ship faster, scale effortlessly, and delight your users.",
  actions = defaultActions,
  actionsSlot,
  features = defaultFeatures,
  featuresSlot,
  className,
  containerClassName,
  gradientClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
}: HeroCenteredGradientCtaProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
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
    });
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <div key={index} className={cn("flex items-center gap-2", feature.className)}>
        {feature.icon}
        <span>{feature.title}</span>
      </div>
    ));
  };

  const defaultHeading = (
    <>
      Build something{" "}
      <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        {headingHighlight}
      </span>
    </>
  );

  return (
    <section
      className={cn(
        "relative min-h-screen overflow-hidden bg-background py-32",
        className
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]", gradientClassName)} />
      <div className={cn("container relative z-10 flex flex-col items-center text-center", containerClassName)}>
        {badge && (
          <div className={cn("inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-2 text-sm text-muted-foreground", badgeClassName)}>
            {badgeIcon}
            {typeof badge === "string" ? <span>{badge}</span> : badge}
          </div>
        )}
        {(heading || headingHighlight) && (
          typeof heading === "string" ? (
            <h1 className={cn("mt-8 max-w-4xl text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl", headingClassName)}>
              {heading}
            </h1>
          ) : heading ? (
            <div className={headingClassName}>{heading}</div>
          ) : (
            <h1 className={cn("mt-8 max-w-4xl text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl", headingClassName)}>
              {defaultHeading}
            </h1>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {(actionsSlot || (actions && actions.length > 0)) && (
          <div className={cn("mt-10 flex flex-col gap-4 sm:flex-row", actionsClassName)}>
            {renderActions()}
          </div>
        )}
        {(featuresSlot || (features && features.length > 0)) && (
          <div className={cn("mt-16 flex items-center gap-8 text-sm text-muted-foreground", featuresClassName)}>
            {renderFeatures()}
          </div>
        )}
      </div>
    </section>
  );
}
