"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaSplitGradientImageProps {
  /**
   * Label content above the heading
   */
  label?: React.ReactNode;
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
   * Additional CSS classes for the label
   */
  labelClassName?: string;
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

const defaultActions: ActionConfig[] = [
  { label: "Get Started", href: "#", variant: "default" },
  { label: "Learn More", href: "#", variant: "outline" },
];

/**
 * CtaSplitGradientImage - A split-layout CTA with content and buttons on one side,
 * a featured image on the other, and a subtle radial gradient background.
 * Modern and visually appealing design for product launches.
 *
 * @example
 * ```tsx
 * <CtaSplitGradientImage
 *   label="Ready to get started?"
 *   heading="Start your free trial today"
 *   description="No credit card required. Cancel anytime."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" },
 *     { label: "Learn More", href: "/learn", variant: "outline" }
 *   ]}
 *   imageSrc="/product-image.jpg"
 * />
 * ```
 */
export function CtaSplitGradientImage({
  label = "Ready to get started?",
  heading = "Start your free trial today.",
  description = "Start with a 14-day free trial. No credit card required. No setup fees. Cancel anytime.",
  actions = defaultActions,
  actionsSlot,
  imageSrc = imagePlaceholders[4],
  imageAlt = "Featured image",
  className,
  containerClassName,
  cardClassName,
  contentClassName,
  labelClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CtaSplitGradientImageProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-6 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start",
          actionsClassName
        )}
      >
        {actions.map((action, index) => (
          <Pressable
            key={index}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant}
            size={action.size}
            className={action.className}
            aria-label={action["aria-label"]}
            asButton
          >
            {action.icon}
            {action.children ?? action.label}
            {action.iconAfter}
          </Pressable>
        ))}
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
          className={cn(
            "mx-auto flex max-w-7xl flex-col justify-between gap-20 overflow-hidden rounded-2xl border bg-[radial-gradient(ellipse_30%_60%_at_100%_80%,var(--color-gray-200),transparent)] pt-20 sm:pl-16 lg:flex-row lg:bg-[radial-gradient(ellipse_50%_80%_at_40%_120%,var(--color-gray-200),transparent)] lg:pl-20",
            cardClassName
          )}
        >
          <div
            className={cn(
              "lg:texlf mx-auto max-w-md px-4 text-center md:px-0 lg:mx-0 lg:pb-20 lg:text-left",
              contentClassName
            )}
          >
            <p className={cn("mb-6 font-medium", labelClassName)}>{label}</p>
            <h2
              className={cn(
                "mb-6 text-4xl font-bold md:text-5xl",
                headingClassName
              )}
            >
              {heading}
            </h2>
            <p
              className={cn(
                "text-lg text-muted-foreground",
                descriptionClassName
              )}
            >
              {description}
            </p>
            {renderActions()}
          </div>
          <div className={cn("relative w-full pl-4 sm:pl-0", imageClassName)}>
            <div className="absolute -bottom-8 -left-8 -z-10 h-4/5 w-4/5 rounded-tl-2xl rounded-br-2xl bg-stone-900/20 blur-2xl"></div>
            <Img
              src={imageSrc}
              alt={imageAlt}
              className="relative z-10 h-full max-h-[400px] w-full rounded-tl-2xl rounded-br-2xl object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
