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
  OptixFlowConfig,
} from "../../../src/types";

export interface CtaSplitImageProps {
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
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Whether to show image on the left (true) or right (false)
   */
  imageLeft?: boolean;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
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
   * Additional CSS classes for the image
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
  optixFlowConfig?: OptixFlowConfig;
}

const defaultActions: ActionConfig[] = [
  { label: "Get Started", href: "#", variant: "default" },
];

/**
 * CtaSplitImage - A split-layout CTA section with content and button on one side
 * and a featured image on the other. The image appears on the left on larger screens.
 * Perfect for showcasing products or services alongside a call to action.
 *
 * @example
 * ```tsx
 * <CtaSplitImage
 *   heading="Transform Your Workflow"
 *   description="Streamline your processes with our powerful tools."
 *   actions={[{ label: "Get Started", href: "/signup", variant: "default" }]}
 *   imageSrc="/hero-image.jpg"
 *   imageAlt="Product screenshot"
 * />
 * ```
 */
export function CtaSplitImage({
  heading = "Call to Action",
  description = "Build faster with our collection of pre-built components. Speed up your development and ship features in record time.",
  actions = defaultActions,
  actionsSlot,
  imageSrc = imagePlaceholders[0],
  imageAlt = "Featured image",
  imageLeft = true,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageWrapperClassName,
  imageClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CtaSplitImageProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-col gap-3 sm:flex-row", actionsClassName)}>
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

  const imageContent = (
    <div
      className={cn(
        "w-full shrink-0 self-stretch lg:w-1/2",
        imageWrapperClassName
      )}
    >
      <Img
        src={imageSrc}
        alt={imageAlt}
        className={cn(
          "aspect-3/2 w-full object-cover",
          imageLeft
            ? "rounded-t-md md:rounded-t-none md:rounded-l-md"
            : "rounded-b-md md:rounded-b-none md:rounded-r-md",
          imageClassName
        )}
        optixFlowConfig={optixFlowConfig}
      />
    </div>
  );

  const textContent = (
    <div
      className={cn(
        "w-full shrink-0 px-4 py-6 md:p-8 lg:w-1/2 lg:px-16",
        contentClassName
      )}
    >
      <h3
        className={cn(
          "mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6",
          headingClassName
        )}
      >
        {heading}
      </h3>
      <p
        className={cn(
          "mb-8 text-muted-foreground lg:text-lg",
          descriptionClassName
        )}
      >
        {description}
      </p>
      {renderActions()}
    </div>
  );

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className="flex w-full flex-col overflow-hidden rounded-lg bg-muted md:rounded-xl lg:flex-row lg:items-center">
          {imageLeft ? (
            <>
              {imageContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {imageContent}
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
