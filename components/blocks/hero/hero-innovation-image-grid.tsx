"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { AspectRatio } from "../../ui/aspect-ratio";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

export interface HeroInnovationImageGridProps {
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
   * Array of images for the grid (expects 3 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
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

const defaultAction: ActionConfig = {
  label: "Started for free",
  href: "#",
  variant: "default",
  className: "group flex h-fit w-fit items-center gap-2 rounded-full px-8 py-3",
};

const defaultImages: ImageItem[] = [
  { src: imagePlaceholders[98], alt: "" },
  { src: imagePlaceholders[99], alt: "" },
  { src: imagePlaceholders[100], alt: "" },
];

export function HeroInnovationImageGrid({
  heading = "Uncover our vision for a more innovative, better future",
  description = "Be part of our journey to innovate and develop solutions that enrich lives and fuel progress.",
  action = defaultAction,
  actionSlot,
  images = defaultImages,
  imagesSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroInnovationImageGridProps): React.JSX.Element {
  const renderAction = () => {
    if (actionSlot) return actionSlot;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
    return (
      <Pressable asButton className={actionClassName} {...pressableProps}>
        {children ?? (
          <>
            {icon}
            <div className="font-medium text-white">{label}</div>
            <div className="relative h-6 w-7 overflow-hidden">
              <div className="absolute top-0 left-0 flex -translate-x-1/2 items-center transition-all duration-500 group-hover:translate-x-0">
                <DynamicIcon name="lucide/move-right" size={24} className="fill-white px-1" />
                <DynamicIcon name="lucide/move-right" size={24} className="fill-white px-1" />
              </div>
            </div>
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div>
        <AspectRatio ratio={1.390658174 / 1}>
          <div className={cn("grid h-full w-full grid-cols-2 grid-rows-2 gap-5 lg:max-w-155.75 lg:gap-8", imagesClassName)}>
            {images[0] && (
              <div className="col-[1/2] row-[1/3]">
                <Img
                  src={images[0].src}
                  alt={images[0].alt}
                  className={cn("size-full rounded-lg object-cover", images[0].className)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {images[1] && (
              <div className="col-[2/3] row-[1/2]">
                <Img
                  src={images[1].src}
                  alt={images[1].alt}
                  className={cn("size-full rounded-lg object-cover", images[1].className)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {images[2] && (
              <div className="col-[2/3] row-[2/3]">
                <Img
                  src={images[2].src}
                  alt={images[2].alt}
                  className={cn("size-full rounded-lg object-cover", images[2].className)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
          </div>
        </AspectRatio>
      </div>
    );
  };

  return (
    <section className={cn("bg-primary/5 py-12 font-sans md:py-20", className)}>
      <div className={cn("container max-w-350", containerClassName)}>
        <div className="grid grid-cols-1 gap-22.5 lg:grid-cols-2">
          <div>
            <div className={cn("flex flex-col gap-12", contentClassName)}>
              <div>
                {heading && (
                  typeof heading === "string" ? (
                    <h1 className={cn("mb-3 text-4xl font-bold md:text-5xl lg:text-6xl", headingClassName)}>
                      {heading}
                    </h1>
                  ) : (
                    <h1 className={cn("mb-3 text-4xl font-bold md:text-5xl lg:text-6xl", headingClassName)}>
                      {heading}
                    </h1>
                  )
                )}
                {description && (
                  typeof description === "string" ? (
                    <p className={cn("text-lg text-muted-foreground", descriptionClassName)}>
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
          {renderImages()}
        </div>
      </div>
    </section>
  );
}
