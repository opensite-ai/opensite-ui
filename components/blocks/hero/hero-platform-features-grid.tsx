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
import BrandLogo from "@/components/ui/brand-logo";
import { LogoConfig } from "../navbars/types";

export interface HeroPlatformFeaturesGridProps {
  /**
   * Brand logo configuration — renders above the announcement badge.
   * LOGO MEDIA ONLY. Do not use photos, hero images, or video assets.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /**
   * Subtitle/label text above heading
   */
  subtitle?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
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
  featuresSlot?: React.ReactNode; /**
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
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroPlatformFeaturesGrid({
  sectionId = "hero-platform-features-grid",
  logo,
  logoSlot,
  logoClassName,
  subtitle,
  description,
  heading,
  action,
  actionSlot,
  features,
  featuresSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "pt-32 pb-8 md:pt-32 md:pb-32",
  pattern,
  patternOpacity,
  className,
  headerClassName,
  headingClassName,
  featuresClassName,
  optixFlowConfig,
}: HeroPlatformFeaturesGridProps): React.JSX.Element {
  const renderAction = useMemo(() => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = action;
    return (
      <Pressable asButton className={actionClassName} {...pressableProps}>
        {children ?? (
          <>
            <DynamicIcon name={icon} />
            {label}
            <DynamicIcon name={iconAfter} />
          </>
        )}
      </Pressable>
    );
  }, [actionSlot, action]);

  const renderFeatures = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-12 md:mt-16 grid gap-px overflow-hidden rounded-lg border bg-input md:grid-cols-2 lg:grid-cols-4 w-full",
          featuresClassName,
        )}
      >
        {features.map((feature, index) => (
          <Pressable
            href={feature.href}
            key={index}
            className="flex flex-col gap-3 bg-card text-card-foreground p-5 md:gap-6"
          >
            {feature.icon != null ? (
              <DynamicIcon name={feature.icon} size={24} />
            ) : feature.iconName ? (
              <DynamicIcon name={feature.iconName} size={24} />
            ) : null}
            <div>
              {feature.title && (
                <h2 className="text-sm font-semibold md:text-base">
                  {feature.title}
                </h2>
              )}
              {feature.description && (
                <p className={cn("text-sm md:text-base")}>
                  {feature.description}
                </p>
              )}
            </div>
          </Pressable>
        ))}
      </div>
    );
  }, [featuresSlot, features, featuresClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col items-center w-full">
        <div
          className={cn(
            "flex flex-col items-center w-full gap-4 md:gap-6 text-center",
            headerClassName,
          )}
        >
          {logo || logoSlot ? (
            <div className={cn("flex justify-center", logoClassName)}>
              <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />
            </div>
          ) : null}

          {subtitle &&
            (typeof subtitle === "string" ? (
              <span
                className={cn(
                  "text-sm tracking-widest md:text-base opacity-50",
                )}
              >
                {subtitle}
              </span>
            ) : (
              subtitle
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-4xl font-semibold text-balance lg:text-6xl",
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
                  "mb-6 max-w-full md:max-w-md  text-base md:text-lg text-balance",
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}

          {renderAction}
        </div>
        {renderFeatures}
      </div>
    </Section>
  );
}
