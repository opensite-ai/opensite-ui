"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, FeatureItem, LogoItem, OptixFlowConfig } from "../../../src/types";

export interface HeroEnterpriseSecurityProps {
  /**
   * Badge text content
   */
  badgeText?: React.ReactNode;
  /**
   * Badge icon name
   */
  badgeIcon?: string;
  /**
   * Custom slot for badge (overrides badge props)
   */
  badgeSlot?: React.ReactNode;
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
   * Array of security feature items
   */
  features?: Array<FeatureItem & { iconName?: string }>;
  /**
   * Custom slot for features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Array of logo items
   */
  logos?: LogoItem[];
  /**
   * Custom slot for logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
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
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultActions: ActionConfig[] = [
  {
    label: "Request a demo",
    href: "#",
    variant: "default",
    size: "lg",
    iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />,
  },
  {
    label: "View security docs",
    href: "#",
    variant: "outline",
    size: "lg",
  },
];

const defaultFeatures: Array<FeatureItem & { iconName?: string }> = [
  {
    iconName: "lucide/lock",
    title: "End-to-end encryption",
    description: "All data is encrypted at rest and in transit using AES-256",
    iconBgClass: "bg-green-100",
    iconColorClass: "text-green-600",
  },
  {
    iconName: "lucide/key",
    title: "SSO & SAML",
    description: "Integrate with your existing identity provider",
    iconBgClass: "bg-blue-100",
    iconColorClass: "text-blue-600",
  },
  {
    iconName: "lucide/eye",
    title: "Audit logs",
    description: "Complete visibility into all account activity",
    iconBgClass: "bg-purple-100",
    iconColorClass: "text-purple-600",
  },
];

const defaultLogos: LogoItem[] = [
  { src: logoPlaceholders.darkHorizontalLogo, alt: "", className: "h-8 opacity-50 grayscale" },
  { src: logoPlaceholders.darkHorizontalLogo, alt: "", className: "h-8 opacity-50 grayscale" },
  { src: logoPlaceholders.darkHorizontalLogo, alt: "", className: "h-8 opacity-50 grayscale" },
  { src: logoPlaceholders.darkHorizontalLogo, alt: "", className: "h-8 opacity-50 grayscale" },
  { src: logoPlaceholders.darkHorizontalLogo, alt: "", className: "h-8 opacity-50 grayscale" },
];

export function HeroEnterpriseSecurity({
  badgeText = "Enterprise-grade security",
  badgeIcon = "lucide/shield-check",
  badgeSlot,
  heading = "Security that scales with your business",
  description = "Protect your data with industry-leading security features. SOC 2 Type II certified, GDPR compliant, and trusted by Fortune 500 companies.",
  actions = defaultActions,
  actionsSlot,
  features = defaultFeatures,
  featuresSlot,
  logos = defaultLogos,
  logosSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
  logosClassName,
  optixFlowConfig,
}: HeroEnterpriseSecurityProps): React.JSX.Element {
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;

    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
        <DynamicIcon name={badgeIcon} size={16} className="text-green-500" />
        <span>{badgeText}</span>
      </div>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

    return (
      <div className={cn("mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center", actionsClassName)}>
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
      <div className={cn("mt-20 grid gap-8 md:grid-cols-3", featuresClassName)}>
        {features.map((feature, index) => (
          <div key={index} className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className={cn("mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full", feature.iconBgClass || "bg-primary/10")}>
              {feature.icon ?? <DynamicIcon name={feature.iconName || "lucide/check"} size={24} className={feature.iconColorClass || "text-primary"} />}
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

  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <div className={cn("mt-16 flex flex-wrap items-center justify-center gap-8", logosClassName)}>
        {logos.map((logo, index) => {
          const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;
          return (
            <Img
              key={index}
              src={logoSrc}
              alt={logo.alt}
              className={cn("h-8 opacity-50 grayscale", logo.className)}
              optixFlowConfig={optixFlowConfig}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-4xl text-center", contentClassName)}>
          {renderBadge()}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("mt-8 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("mt-8 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-6 text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderActions()}
        </div>
        {renderFeatures()}
        {renderLogos()}
      </div>
    </section>
  );
}
