"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

export interface HeroMarketplaceScatteredImagesProps {
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
   * Tagline text with icon
   */
  tagline?: React.ReactNode;
  /**
   * Tagline icon name
   */
  taglineIcon?: string;
  /**
   * Custom slot for tagline (overrides tagline props)
   */
  taglineSlot?: React.ReactNode;
  /**
   * Array of scattered images (expects 5 images)
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
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroMarketplaceScatteredImages({
  heading = "Explore a World of Digital Assets",
  description = "Discover the future of asset management, tokenization, and liquidity with our comprehensive marketplace.",
  action,
  actionSlot,
  tagline = "Global Partnerships and Innovation",
  taglineIcon = "lucide/globe",
  taglineSlot,
  images,
  imagesSlot,
  showGridPattern = true,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroMarketplaceScatteredImagesProps): React.JSX.Element {
  const renderAction = () => {
    if (actionSlot) return actionSlot;

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

  const renderTagline = () => {
    if (taglineSlot) return taglineSlot;

    return (
      <div className="mt-7 flex items-start justify-center gap-2 font-medium md:text-xl">
        <DynamicIcon name={taglineIcon} size={20} className="mt-0.5" />
        {tagline}
      </div>
    );
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className={cn("mx-auto mt-14 max-w-7xl overflow-hidden py-8", imagesClassName)}>
        <div className="relative w-full">
          {images.map((image, index) => (
            <Img
              key={index}
              src={image.src}
              alt={image.alt}
              className={image.className}
              optixFlowConfig={optixFlowConfig}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={containerClassName}>
        <div className={cn("relative container mx-auto max-w-xl py-10 text-center", contentClassName)}>
          {showGridPattern && (
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[64px_64px]"></div>
          )}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("mb-3 text-4xl lg:text-7xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("mb-3 text-4xl lg:text-7xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mb-5 text-sm text-muted-foreground md:text-base", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderAction()}
          {renderTagline()}
        </div>
        {renderImages()}
      </div>
    </section>
  );
}
