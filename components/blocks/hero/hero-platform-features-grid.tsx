"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type {
  ActionConfig,
  FeatureItem,
  LogoItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

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
}

export function HeroPlatformFeaturesGrid({
  logo,
  logoSlot,
  subtitle,
  description,
  heading,
  action,
  actionSlot,
  features,
  featuresSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-32",
  pattern,
  patternOpacity,
  className,
  headerClassName,
  headingClassName,
  featuresClassName,
  optixFlowConfig,
}: HeroPlatformFeaturesGridProps): React.JSX.Element {
  const renderLogo = useMemo(() => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;
    return (
      <Img
        src={logoSrc}
        alt={logo.alt}
        className={cn(
          "mx-auto mb-5 w-16 md:mb-6 md:w-24 lg:mb-7 lg:w-28",
          logo.imgClassName,
        )}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [logoSlot, logo, optixFlowConfig]);

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
            {icon}
            {label}
            {iconAfter}
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
          "mt-16 grid gap-px overflow-hidden rounded-lg border bg-input md:grid-cols-2 lg:grid-cols-4 w-full",
          featuresClassName,
        )}
      >
        {features.map((feature, index) => (
          <Pressable
            href={feature.href}
            key={index}
            className="flex flex-col gap-3 bg-card text-card-foreground p-5 md:gap-6"
          >
            {feature.icon ??
              (feature.iconName && (
                <DynamicIcon name={feature.iconName} size={24} />
              ))}
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
            "flex flex-col items-center w-full gap-6 text-center",
            headerClassName,
          )}
        >
          {renderLogo}
          {subtitle &&
            (typeof subtitle === "string" ? (
              <span className={cn("mb-3 text-sm tracking-widest md:text-base")}>
                {subtitle}
              </span>
            ) : (
              subtitle
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "mt-4 text-4xl font-semibold text-balance lg:text-6xl",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <h1
                className={cn(
                  "mt-4 text-4xl font-semibold text-balance lg:text-6xl",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("max-w-2xl md:text-lg text-balance")}>
                {description}
              </p>
            ) : (
              <div className={cn("max-w-2xl md:text-lg text-balance")}>
                {description}
              </div>
            ))}

          {renderAction}
        </div>
        {renderFeatures}
      </div>
    </Section>
  );
}
