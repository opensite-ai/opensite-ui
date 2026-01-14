"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export interface HeroCenteredScreenshotProps {
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
   * Screenshot/hero image source URL
   */
  imageSrc?: string;
  /**
   * Screenshot/hero image alt text
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
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroCenteredScreenshot({
  heading = "Build faster with Opensite AI",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  actions,
  actionsSlot,
  imageSrc = imagePlaceholders[4],
  imageAlt = "placeholder",
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  optixFlowConfig,
}: HeroCenteredScreenshotProps): React.JSX.Element {
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
      <div className="overflow-hidden border-b border-muted">
        <div className={cn("container", containerClassName)}>
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className={cn("z-10 items-center text-center", contentClassName)}>
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("mb-8 text-4xl font-semibold text-pretty lg:text-7xl", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("mx-auto max-w-3xl text-muted-foreground lg:text-xl", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
              {(actionsSlot || (actions && actions.length > 0)) && (
                <div className={cn("mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row", actionsClassName)}>
                  {renderActions()}
                </div>
              )}
            </div>
          </div>
          {imageSrc && (
            <Img
              src={imageSrc}
              alt={imageAlt}
              className={cn("mx-auto mt-24 max-h-[700px] w-full max-w-7xl rounded-t-lg object-cover shadow-lg", imageClassName)}
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>
      </div>
    </section>
  );
}
