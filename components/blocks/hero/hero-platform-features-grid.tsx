"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, FeatureItem, LogoItem, OptixFlowConfig } from "../../../src/types";

export interface HeroPlatformFeaturesGridProps {
  /**
   * Logo configuration
   */
  logo?: LogoItem;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Subtitle/label text above heading
   */
  subtitle?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Action configuration for CTA button
   */
  action?: ActionConfig;
  /**
   * Custom slot for action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Array of feature items for the grid
   */
  features?: Array<FeatureItem & { iconName?: string }>;
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
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the features grid
   */
  featuresClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultLogo: LogoItem = {
  src: logoPlaceholders.logoMark,
  alt: "placeholder",
  imgClassName: "mx-auto mb-5 w-16 md:mb-6 md:w-24 lg:mb-7 lg:w-28",
};

const defaultAction: ActionConfig = {
  label: "Start now for free",
  href: "#",
  variant: "default",
  size: "lg",
  className: "mt-8",
  iconAfter: <DynamicIcon name="lucide/move-right" size={20} className="ml-2" />,
};

const defaultFeatures: Array<FeatureItem & { iconName?: string }> = [
  {
    iconName: "lucide/globe",
    title: "Robust Infrastructure",
    description: "Reliable and scalable infrastructure, easy to manage.",
  },
  {
    iconName: "lucide/rocket",
    title: "Easy Setup",
    description: "Quick and simple configuration for any use case.",
  },
  {
    iconName: "lucide/expand",
    title: "Effortless Scaling",
    description: "Built to handle increased demand with ease.",
  },
  {
    iconName: "lucide/wrench",
    title: "Low Maintenance",
    description: "Focus on building, not on maintenance tasks.",
  },
];

export function HeroPlatformFeaturesGrid({
  logo = defaultLogo,
  logoSlot,
  subtitle = "PLATFORM",
  heading = "Develop, launch, and grow your service with our platform",
  action = defaultAction,
  actionSlot,
  features = defaultFeatures,
  featuresSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  featuresClassName,
  optixFlowConfig,
}: HeroPlatformFeaturesGridProps): React.JSX.Element {
  const renderLogo = () => {
    if (logoSlot) return logoSlot;

    const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;
    return (
      <Img
        src={logoSrc}
        alt={logo.alt}
        className={cn("mx-auto mb-5 w-16 md:mb-6 md:w-24 lg:mb-7 lg:w-28", logo.imgClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderAction = () => {
    if (actionSlot) return actionSlot;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
    return (
      <Pressable asButton className={actionClassName} {...pressableProps}>
        {children ?? (
          <>
            {icon}
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div className={cn("mt-16 grid gap-px overflow-hidden rounded-lg border bg-input md:grid-cols-2 lg:grid-cols-4", featuresClassName)}>
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col gap-3 bg-background p-5 md:gap-6">
            {feature.icon ?? (feature.iconName && <DynamicIcon name={feature.iconName} size={24} />)}
            <div>
              {feature.title && (
                <h2 className="text-sm font-semibold md:text-base">
                  {feature.title}
                </h2>
              )}
              {feature.description && (
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
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
        <div className={cn("text-center", headerClassName)}>
          {renderLogo()}
          {subtitle && (
            typeof subtitle === "string" ? (
              <span className="mb-3 text-sm tracking-widest text-muted-foreground md:text-base">
                {subtitle}
              </span>
            ) : (
              subtitle
            )
          )}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("mt-4 text-4xl font-semibold text-balance lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("mt-4 text-4xl font-semibold text-balance lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {renderAction()}
        </div>
        {renderFeatures()}
      </div>
    </section>
  );
}
