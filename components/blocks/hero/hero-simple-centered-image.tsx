"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export interface HeroSimpleCenteredImageProps {
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
   * Hero image source URL
   */
  imageSrc?: string;
  /**
   * Hero image alt text
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroSimpleCenteredImage({
  heading = "Welcome to Our Website",
  description = "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur.",
  actions,
  actionsSlot,
  imageSrc = imagePlaceholders[6],
  imageAlt = "placeholder hero",
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageWrapperClassName,
  imageClassName,
  optixFlowConfig,
}: HeroSimpleCenteredImageProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
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
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container flex flex-col items-center text-center", containerClassName, contentClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("my-3 text-3xl font-bold text-pretty sm:text-4xl md:my-6 lg:text-6xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mb-6 max-w-xl text-muted-foreground lg:mb-12 lg:text-2xl", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {(actionsSlot || (actions && actions.length > 0)) && (
          <div className={cn("mb-6 flex gap-2 lg:mb-12", actionsClassName)}>
            {renderActions()}
          </div>
        )}
      </div>
      {imageSrc && (
        <div className="container">
          <div className={cn("aspect-video mask-[linear-gradient(#000_80%,transparent_100%)]", imageWrapperClassName)}>
            <Img
              src={imageSrc}
              alt={imageAlt}
              className={cn("h-full w-full rounded-md object-cover", imageClassName)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      )}
    </section>
  );
}
