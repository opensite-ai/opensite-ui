"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import {
  imagePlaceholders,
  logoPlaceholders,
} from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

export interface HeroDesignSystem3dProps {
  /**
   * Trust badge text
   */
  trustBadge?: React.ReactNode;
  /**
   * Custom slot for trust badge (overrides trustBadge prop)
   */
  trustBadgeSlot?: React.ReactNode;
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
   * Logo mark image for preview button
   */
  logoMarkSrc?: string;
  /**
   * Array of 3D stacked images (expects 3 images)
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

const defaultActions: ActionConfig[] = [
  {
    label: "Preview",
    href: "#",
    variant: "secondary",
    className: "group flex h-fit min-w-45 flex-1 items-center justify-center gap-1 rounded-[5rem] border-2 border-black px-4 py-3 text-base font-semibold md:min-w-fit md:flex-none",
  },
  {
    label: "Get Module",
    href: "#",
    variant: "default",
    className: "group flex h-fit min-w-45 flex-1 items-center justify-center gap-1 rounded-[5rem] border-2 border-primary bg-primary px-4 py-3 text-base font-semibold text-nowrap text-white md:min-w-fit md:flex-none",
  },
];

const defaultImages: ImageItem[] = [
  { src: imagePlaceholders[94], alt: "" },
  { src: imagePlaceholders[95], alt: "" },
  { src: imagePlaceholders[96], alt: "" },
];

export function HeroDesignSystem3d({
  trustBadge = "Trusted by over 7,000 customers",
  trustBadgeSlot,
  heading = "Design system that delivers",
  description = "Create, prototype, and personalize any design—clean and effortless, in just minutes.",
  actions = defaultActions,
  actionsSlot,
  logoMarkSrc = logoPlaceholders.logoMark,
  images = defaultImages,
  imagesSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroDesignSystem3dProps): React.JSX.Element {
  const renderTrustBadge = () => {
    if (trustBadgeSlot) return trustBadgeSlot;

    return (
      <div className="flex items-center justify-center gap-2">
        <DynamicIcon
          name="lucide/star"
          size={20}
          className="fill-black stroke-black"
        />
        {typeof trustBadge === "string" ? (
          <p className="text-sm text-nowrap">{trustBadge}</p>
        ) : (
          trustBadge
        )}
      </div>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

    return (
      <div className={cn("flex w-full flex-wrap items-center gap-4 md:w-fit", actionsClassName)}>
        {actions.map((action, index) => {
          const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
          
          if (index === 0) {
            return (
              <Pressable
                key={index}
                asButton
                className={actionClassName}
                {...pressableProps}
              >
                <Img
                  src={logoMarkSrc}
                  alt=""
                  className="block size-6 shrink-0"
                  optixFlowConfig={optixFlowConfig}
                />
                <p className="text-nowrap transition-all duration-300 ease-in-out group-hover:text-primary">
                  {label}
                </p>
                <DynamicIcon
                  name="lucide/move-up-right"
                  size={24}
                  className="shrink-0 stroke-black transition-all duration-300 ease-in-out group-hover:stroke-primary"
                />
              </Pressable>
            );
          }
          
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

    return (
      <div className={cn("relative mt-16 aspect-[1.2/1] overflow-hidden sm:-right-[10%] sm:mt-28 sm:aspect-[2.788990826/1]", imagesClassName)}>
        {images[0] && (
          <div className="absolute top-[11%] left-[8%] z-10 aspect-[0.7/1] w-[80%] sm:left-[4%] sm:w-[45%]">
            <div className="size-full transform-[rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)]">
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn("block size-full object-cover object-center", images[0].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
        {images[1] && (
          <div className="absolute top-0 left-[70%] z-20 aspect-[0.7/1] w-[73%] -translate-x-1/2 sm:left-1/2 sm:w-[38%]">
            <div className="size-full transform-[rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)] shadow-[-25px_0px_20px_0px_rgba(0,0,0,.04)]">
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn("block size-full object-cover object-center", images[1].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
        {images[2] && (
          <div className="absolute top-[3%] -right-[45%] z-30 aspect-[0.7/1] w-[85%] sm:-right-[2%] sm:w-[50%]">
            <div className="size-full transform-[rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)] shadow-[-25px_0px_20px_0px_rgba(0,0,0,.04)]">
              <Img
                src={images[2].src}
                alt={images[2].alt}
                className={cn("block size-full object-cover object-center", images[2].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className={cn("bg-muted pt-12 font-sans md:pt-20", className)}>
      <div className={cn("mx-auto max-w-396 px-0 sm:px-8", containerClassName)}>
        <div className="container px-4">
          <div className={cn("mx-auto flex max-w-100 flex-col items-center gap-6 sm:max-w-125 lg:max-w-160", contentClassName)}>
            {renderTrustBadge()}
            <div className="mb-2">
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("text-center text-[2.8125rem] leading-none font-bold sm:text-[3.9375rem] lg:text-[5.3125rem]", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <h1 className={cn("text-center text-[2.8125rem] leading-none font-bold sm:text-[3.9375rem] lg:text-[5.3125rem]", headingClassName)}>
                    {heading}
                  </h1>
                )
              )}
            </div>
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-center text-base leading-snug text-balance text-muted-foreground sm:text-2xl", descriptionClassName)}>
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
