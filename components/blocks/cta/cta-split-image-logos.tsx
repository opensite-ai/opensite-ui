"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaSplitImageLogosProps {
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
   * Featured image URL
   */
  imageSrc?: string;
  /**
   * Featured image alt text
   */
  imageAlt?: string;
  /**
   * Array of trusted company logo URLs
   */
  logos?: string[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Text above the logos
   */
  logosLabel?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the grid wrapper
   */
  gridClassName?: string;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the logos wrapper
   */
  logosClassName?: string;
  /**
   * Additional CSS classes for the image wrapper
   */
  imageClassName?: string;
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
  pattern?: PatternName | string;
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
 * CtaSplitImageLogos - A split-layout CTA with content and buttons on one side,
 * a featured image on the other, and trusted company logos below. Great for
 * establishing credibility while driving conversions.
 *
 * @example
 * ```tsx
 * <CtaSplitImageLogos
 *   heading="Transform Your Business"
 *   description="Join thousands of companies already using our platform."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default", size: "lg" },
 *     { label: "Learn More", href: "/learn", variant: "outline", size: "lg" }
 *   ]}
 *   imageSrc="/hero-image.jpg"
 *   logos={["/logo1.png", "/logo2.png", "/logo3.png"]}
 * />
 * ```
 */
export function CtaSplitImageLogos({
  heading = "Build your website faster",
  description = "Build faster with our collection of pre-built components. Speed up your development and ship features in record time.",
  actions,
  actionsSlot,
  imageSrc = imagePlaceholders[2],
  imageAlt = "Featured image",
  logos,
  logosSlot,
  logosLabel = "Trusted by leading companies",
  className,
  containerClassName,
  gridClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  logosClassName,
  imageClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CtaSplitImageLogosProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start",
          actionsClassName
        )}
      >
        {actions.map((action, index) => {
          const isFirstAction = index === 0;
          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              size={action.size}
              className={cn("w-full sm:w-auto", action.className)}
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

  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <div className={cn("mt-10 w-full", logosClassName)}>
        <p className="mb-4 text-sm text-muted-foreground">{logosLabel}</p>
        <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start">
          {logos.map((logo, index) => (
            <Img
              key={index}
              src={logo}
              alt={`Company logo ${index + 1}`}
              className="h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              optixFlowConfig={optixFlowConfig}
            />
          ))}
        </div>
      </div>
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
          className={cn("grid items-center gap-8 lg:grid-cols-2", gridClassName)}
        >
          <div
            className={cn(
              "flex flex-col items-center text-center lg:items-start lg:text-left",
              contentClassName
            )}
          >
            <h1
              className={cn(
                "my-6 text-pretty text-4xl font-bold lg:text-6xl",
                headingClassName
              )}
            >
              {heading}
            </h1>
            <p
              className={cn(
                "mb-8 max-w-xl text-muted-foreground lg:text-xl",
                descriptionClassName
              )}
            >
              {description}
            </p>
            {renderActions()}
            {renderLogos()}
          </div>
          <div className={cn("relative", imageClassName)}>
            <Img
              src={imageSrc}
              alt={imageAlt}
              className="max-h-96 w-full rounded-md object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
