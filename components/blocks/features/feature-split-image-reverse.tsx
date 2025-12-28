"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export interface FeatureSplitImageReverseProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text for accessibility
   */
  imageAlt?: string;
  /**
   * Custom slot for image (overrides imageSrc)
   */
  imageSlot?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultActions: ActionConfig[] = [
  {
    label: "Get Started",
    href: "#",
    variant: "default",
  },
  {
    label: "Learn More",
    href: "#",
    variant: "outline",
  },
];

/**
 * Feature Split Image Reverse - Two-column feature section with image on the left
 * and text content on the right.
 *
 * Layout: Split two-column grid with image on left, text/CTAs on right.
 * Key features: Responsive stacking, dual CTA buttons, image-first visual hierarchy.
 * Best for: Alternating content sections, visual-first storytelling, product showcases.
 *
 * @example
 * ```tsx
 * <FeatureSplitImageReverse
 *   title="Designed for developers"
 *   description="Copy and paste components directly into your project."
 *   imageSrc="/feature-image.jpg"
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" },
 *     { label: "Learn More", href: "/docs", variant: "outline" },
 *   ]}
 * />
 * ```
 */
export function FeatureSplitImageReverse({
  title = "Build faster with Opensite AI components",
  description = "Hundreds of finely crafted components built with React, Tailwind and modern best practices. Developers can copy and paste these blocks directly into their project.",
  imageSrc = blockBrandedIconsAndPlaceholders.placeholder1,
  imageAlt = "Feature illustration",
  imageSlot,
  actions = defaultActions,
  actionsSlot,
  className,
  containerClassName,
  gridClassName,
  imageClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  optixFlowConfig,
}: FeatureSplitImageReverseProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      if (action.children) {
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
            {action.children}
          </Pressable>
        );
      }

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
          {action.label}
          {action.iconAfter}
        </Pressable>
      );
    });
  };

  const renderImage = () => {
    if (imageSlot) return imageSlot;
    if (imageSrc) {
      return (
        <Img
          src={imageSrc}
          alt={imageAlt}
          className={cn("max-h-96 w-full rounded-md object-cover", imageClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      );
    }
    return null;
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("grid items-center gap-8 md:gap-16 lg:grid-cols-2", gridClassName)}>
          {renderImage()}
          <div className={cn("flex flex-col items-center text-center lg:items-start lg:text-left", contentClassName)}>
            {title && (
              typeof title === "string" ? (
                <h2 className={cn("my-6 mt-0 text-4xl font-semibold text-balance lg:text-5xl", titleClassName)}>
                  {title}
                </h2>
              ) : (
                <div className={cn("my-6 mt-0 text-4xl font-semibold text-balance lg:text-5xl", titleClassName)}>
                  {title}
                </div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mb-8 max-w-xl text-muted-foreground lg:text-lg", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={cn("mb-8 max-w-xl text-muted-foreground lg:text-lg", descriptionClassName)}>
                  {description}
                </div>
              )
            )}
            <div className={cn("flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start", actionsClassName)}>
              {renderActions()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
