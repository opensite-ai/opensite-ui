"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, LogoItem, OptixFlowConfig } from "../../../src/types";

export interface HeroLogoCenteredScreenshotProps {
  /**
   * Logo configuration
   */
  logo?: LogoItem;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
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
   * Custom slot for action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Screenshot image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
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
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroLogoCenteredScreenshot({
  logo,
  logoSlot,
  heading = "Build your next project with Blocks",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  action,
  actionSlot,
  image,
  imageSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroLogoCenteredScreenshotProps): React.JSX.Element {
  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;
    return (
      <Img
        src={logoSrc}
        alt={logo.alt}
        className={cn("h-10 md:h-16", logo.className)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
    return (
      <Pressable asButton className={actionClassName} {...pressableProps}>
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

  const renderImage = () => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <Img
        src={image.src}
        alt={image.alt}
        className={cn("mt-20 aspect-video w-full rounded-t-lg object-cover", imageClassName, image.className)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="border-b">
        <div className={cn("container max-w-7xl", containerClassName)}>
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className={cn("z-10 flex flex-col items-center gap-6 text-center", contentClassName)}>
              {renderLogo()}
              <div>
                {heading && (
                  typeof heading === "string" ? (
                    <h1 className={cn("mb-4 text-3xl font-medium text-pretty lg:text-5xl", headingClassName)}>
                      {heading}
                    </h1>
                  ) : (
                    <h1 className={cn("mb-4 text-3xl font-medium text-pretty lg:text-5xl", headingClassName)}>
                      {heading}
                    </h1>
                  )
                )}
                {description && (
                  typeof description === "string" ? (
                    <p className={cn("max-w-3xl text-muted-foreground lg:text-xl", descriptionClassName)}>
                      {description}
                    </p>
                  ) : (
                    <div className={descriptionClassName}>{description}</div>
                  )
                )}
              </div>
              {renderAction()}
            </div>
          </div>
          {renderImage()}
        </div>
      </div>
    </section>
  );
}
