"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

export interface HeroCrmStreamlinedProps {
  /**
   * Tagline text above heading
   */
  tagline?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Action configuration for CTA button
   */
  action?: ActionConfig;
  /**
   * Custom slot for action (overrides action)
   */
  actionSlot?: React.ReactNode;
  /**
   * Main image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the tagline
   */
  taglineClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroCrmStreamlined({
  tagline = "Client Relationship Management Software",
  heading = "Your contact management, all streamlined in a single platform",
  description = "Providing a comprehensive view of everything you know about the people, companies, and organizations you work with.",
  action,
  actionSlot,
  image,
  imageSlot,
  className,
  containerClassName,
  contentClassName,
  taglineClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroCrmStreamlinedProps): React.JSX.Element {
  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
    return (
      <Pressable
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
  };

  return (
    <section className={cn("overflow-hidden font-sans", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className={cn("basis-2/4", contentClassName)}>
            <div className="mt-10 flex flex-col gap-2">
              {tagline && (
                typeof tagline === "string" ? (
                  <p className={cn("text-base font-semibold text-muted-foreground", taglineClassName)}>
                    {tagline}
                  </p>
                ) : (
                  <div className={taglineClassName}>{tagline}</div>
                )
              )}
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("mb-2 text-4xl leading-snug! font-medium text-black lg:text-5xl", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("mb-2 text-lg text-black/80", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
              {renderAction()}
            </div>
          </div>
          <div className={cn("relative basis-[42%] py-9 md:py-16", imageClassName)}>
            {imageSlot ? imageSlot : image ? (
              <div className="aspect-square w-full overflow-hidden">
                <Img
                  src={image.src}
                  alt={image.alt}
                  className={cn("relative z-20 h-full w-full object-cover object-center", image.className)}
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="absolute top-0 left-25 z-10 aspect-[1.378254211/1] h-full w-225 bg-muted" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
