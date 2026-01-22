"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaEnterpriseDarkFeature {
  /**
   * Icon name for the feature
   */
  iconName?: string;
  /**
   * Custom icon element
   */
  icon?: React.ReactNode;
  /**
   * Feature text
   */
  text?: React.ReactNode;
  /**
   * Additional CSS classes for the feature
   */
  className?: string;
}

export interface CtaEnterpriseDarkFeaturesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
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
   * Array of features to display
   */
  features?: CtaEnterpriseDarkFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Decorative images
   */
  decorativeImages?: string[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the card wrapper
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
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
   * Additional CSS classes for the features list
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the images wrapper
   */
  imagesClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * CtaEnterpriseDarkFeatures - A dark-themed enterprise CTA with serif heading,
 * feature list with icons, and layered decorative images. Sophisticated design
 * for enterprise solutions.
 *
 * @example
 * ```tsx
 * <CtaEnterpriseDarkFeatures
 *   heading="Enterprise Solutions"
 *   description="Built for scale with enterprise-grade features."
 *   actions={[
 *     { label: "Contact Sales", href: "/contact", variant: "secondary", size: "lg" },
 *     { label: "View Pricing", href: "/pricing", variant: "outline", size: "lg" }
 *   ]}
 *   features={[
 *     { iconName: "lucide/shield-check", text: "Enterprise security" }
 *   ]}
 * />
 * ```
 */
export function CtaEnterpriseDarkFeatures({
  heading,
  description,
  actions,
  actionsSlot,
  features,
  featuresSlot,
  decorativeImages,
  className,
  containerClassName,
  cardClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  featuresClassName,
  actionsClassName,
  imagesClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CtaEnterpriseDarkFeaturesProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-col gap-3 sm:flex-row", actionsClassName)}>
        {actions.map((action, index) => {
          const isFirstAction = index === 0;
          const isOutlineOnDark =
            action.variant === "outline" && !isFirstAction;
          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              size={action.size}
              className={cn(
                isOutlineOnDark &&
                  "border-white/30 text-white hover:bg-white/10",
                action.className,
              )}
              aria-label={action["aria-label"]}
              asButton
            >
              {action.icon}
              {action.children ?? action.label}
              {action.iconAfter ??
                (isFirstAction && (
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="ml-2"
                  />
                ))}
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
      <ul className={cn("mb-8 space-y-4", featuresClassName)}>
        {features.map((feature, index) => (
          <li
            key={index}
            className={cn("flex items-center gap-3", feature.className)}
          >
            {(feature.icon || feature.iconName) && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                {feature.icon ??
                  (feature.iconName && (
                    <DynamicIcon
                      name={feature.iconName}
                      size={16}
                      className="text-white"
                    />
                  ))}
              </div>
            )}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-slate-900 p-8 text-white md:p-12 lg:p-16",
            cardClassName,
          )}
        >
          <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className={contentClassName}>
              <h2
                className={cn(
                  "mb-6 font-serif text-4xl font-bold md:text-5xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
              <p
                className={cn(
                  "mb-8 text-lg text-slate-300",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
              {renderFeatures()}
              {renderActions()}
            </div>
            <div className={cn("relative hidden lg:block", imagesClassName)}>
              <div className="absolute -right-8 -top-8 h-64 w-48 rotate-6 overflow-hidden rounded-xl shadow-2xl">
                <Img
                  src={decorativeImages?.[0]}
                  alt=""
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="absolute right-16 top-24 h-48 w-36 -rotate-3 overflow-hidden rounded-xl shadow-2xl">
                <Img
                  src={decorativeImages?.[1]}
                  alt=""
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="absolute -bottom-4 right-8 h-56 w-44 rotate-12 overflow-hidden rounded-xl shadow-2xl">
                <Img
                  src={decorativeImages?.[2]}
                  alt=""
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-linear-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />
        </div>
      </div>
    </Section>
  );
}
