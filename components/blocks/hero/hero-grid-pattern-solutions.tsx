"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

export interface HeroGridPatternSolutionsProps {
  /**
   * Badge/link text content
   */
  badgeText?: React.ReactNode;
  /**
   * Badge/link href
   */
  badgeHref?: string;
  /**
   * Custom slot for badge (overrides badge props)
   */
  badgeSlot?: React.ReactNode;
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
   * Array of images for the grid (expects 3 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Whether to show the grid pattern background
   */
  showGridPattern?: boolean;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content area
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
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroGridPatternSolutions({
  badgeText,
  badgeHref = "#",
  badgeSlot,
  heading,
  description,
  actions,
  actionsSlot,
  images,
  imagesSlot,
  showGridPattern = true,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroGridPatternSolutionsProps): React.JSX.Element {
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;

    return (
      <Pressable
        href={badgeHref}
        className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm"
      >
        {badgeText}
        <DynamicIcon name="lucide/arrow-right" size={16} />
      </Pressable>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-col justify-center gap-x-2 gap-y-3 sm:flex-row", actionsClassName)}>
        {actions.map((action, index) => {
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
        })}
      </div>
    );
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className={cn("mt-20 grid gap-6 md:grid-cols-10", imagesClassName)}>
        {images.map((image, index) => (
          <Img
            key={index}
            src={image.src}
            alt={image.alt}
            className={cn("h-full max-h-[500px] w-full rounded-xl object-cover", image.className)}
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </div>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="relative overflow-hidden">
          {showGridPattern && (
            <div className="absolute inset-0 -top-1 -left-1 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_100%_at_50%_50%,transparent_60%,#000_100%)] bg-size-[92px_92px] opacity-15"></div>
          )}
          <div className={cn("mx-auto max-w-4xl", contentClassName)}>
            {renderBadge()}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("my-4 mb-6 text-center text-3xl font-semibold lg:text-8xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("my-4 mb-6 text-center text-3xl font-semibold lg:text-8xl", headingClassName)}>
                  {heading}
                </h1>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mx-auto mb-8 max-w-2xl text-center text-muted-foreground lg:text-xl", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {renderActions()}
          </div>
        </div>
        {renderImages()}
      </div>
    </section>
  );
}
