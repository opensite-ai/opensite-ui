"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type {
  ActionConfig,
  FeatureItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { Badge } from "@/src";
import { BlockActions } from "@/components/ui/block-actions";

export interface HeroEnterpriseSecurityProps {
  /**
   * Badge/status indicator content
   */
  badge?: React.ReactNode;
  /**
   * Badge icon
   */
  badgeIcon?: React.ReactNode;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
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
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroEnterpriseSecurity({
  badge,
  badgeIcon,
  badgeClassName,
  heading,
  description,
  actions,
  actionsSlot,
  features,
  featuresSlot,
  background,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
}: HeroEnterpriseSecurityProps): React.JSX.Element {
  const renderFeatures = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-12 md:mt-20 grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-3",
          featuresClassName,
        )}
      >
        {features.map((feature, index) => (
          <Pressable
            href={feature.href}
            key={index}
            className={cn(
              "rounded-2xl border border-border p-6 text-center",
              "transition-all duration-500 hover:ring-2 hover:shadow-lg",
            )}
          >
            <div
              className={cn(
                "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full",
                feature.iconBgClass,
              )}
            >
              {feature.icon ?? (
                <DynamicIcon
                  name={feature.iconName || "lucide/check"}
                  size={24}
                  className={feature.iconColorClass}
                />
              )}
            </div>
            <h3 className="mb-2 text-lg font-semibold ">{feature.title}</h3>
            {feature.description && (
              <p className="text-sm">{feature.description}</p>
            )}
          </Pressable>
        ))}
      </div>
    );
  }, [featuresSlot, features, featuresClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="pt-8 md:pt-0">
        <div
          className={cn(
            "mx-auto max-w-4xl text-center flex flex-col items-center gap-6",
            contentClassName,
          )}
        >
          {badge && (
            <Badge className={cn("px-4", badgeClassName)}>
              {badgeIcon}
              {typeof badge === "string" ? <span>{badge}</span> : badge}
            </Badge>
          )}
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-4xl font-bold text-balance md:text-7xl",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              heading
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "max-w-full md:max-w-[70%] text-lg md:text-xl font-normal text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}
          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </div>
        {renderFeatures}
      </div>
    </Section>
  );
}
