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

export interface CtaPlatformDemoProps {
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
   * Decorative image URL
   */
  decorativeImage?: string;
  /**
   * Main product image URL
   */
  productImage?: string;
  /**
   * Product image alt text
   */
  productImageAlt?: string;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the image wrapper
   */
  imageWrapperClassName?: string;
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
 * CtaPlatformDemo - A CTA section promoting platform exploration with content
 * on one side and decorative product images on the other. Includes demo and
 * video watch buttons. Perfect for SaaS product pages.
 *
 * @example
 * ```tsx
 * <CtaPlatformDemo
 *   heading="Explore Our Platform"
 *   description="Discover the full potential of our platform."
 *   actions={[
 *     { label: "Try Demo", href: "/demo", variant: "default" },
 *     { label: "Watch Video", href: "/video", variant: "outline" }
 *   ]}
 * />
 * ```
 */
export function CtaPlatformDemo({
  heading,
  description,
  actions,
  actionsSlot,
  decorativeImage = blockBrandedIconsAndPlaceholders.placeholder1,
  productImage = imagePlaceholders[6],
  productImageAlt,
  className,
  containerClassName,
  cardClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageWrapperClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CtaPlatformDemoProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn("mt-8 flex flex-col gap-4 sm:flex-row", actionsClassName)}
      >
        {actions.map((action, index) => {
          const isVideoAction =
            typeof action.label === "string" &&
            action.label.toLowerCase().includes("video");
          return (
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
              {action.iconAfter ??
                (isVideoAction && (
                  <DynamicIcon name="lucide/play" size={16} className="ml-2" />
                ))}
            </Pressable>
          );
        })}
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
      <div className={cn("container overflow-hidden", containerClassName)}>
        <div
          className={cn(
            "relative mx-auto flex max-w-7xl flex-col justify-between gap-6 overflow-hidden rounded-xl border bg-muted/50 md:flex-row",
            cardClassName
          )}
        >
          <div
            className={cn("max-w-xl self-center p-6 md:p-12", contentClassName)}
          >
            <h2
              className={cn(
                "text-3xl font-semibold md:text-4xl",
                headingClassName
              )}
            >
              {heading}
            </h2>
            <p
              className={cn(
                "mt-4 text-muted-foreground md:text-lg",
                descriptionClassName
              )}
            >
              {description}
            </p>
            {renderActions()}
          </div>
          <div
            className={cn(
              "relative ml-6 max-h-96 md:mt-8 md:ml-0",
              imageWrapperClassName
            )}
          >
            <Img
              src={decorativeImage}
              alt=""
              className="absolute -bottom-12 left-4 h-48 -translate-x-1/2 -rotate-120"
              optixFlowConfig={optixFlowConfig}
            />
            <Img
              src={productImage}
              alt={productImageAlt}
              className="z-10 aspect-video h-full w-full rounded-tl-xl border-t border-l object-cover pt-3.5 pl-3.5 backdrop-blur-sm"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
