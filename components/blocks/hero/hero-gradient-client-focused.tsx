"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

export interface HeroGradientClientFocusedProps {
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
   * Hero image configuration
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

const defaultActions: ActionConfig[] = [
  {
    label: "Meet Us",
    href: "#",
    variant: "default",
    className: "w-fit rounded-md border px-8 py-1",
  },
  {
    label: "Schedule a Demo",
    href: "#",
    variant: "secondary",
    className: "w-fit rounded-md border px-8 py-1",
  },
];

const defaultImage: ImageItem = {
  src: imagePlaceholders[25],
  alt: "",
};

export function HeroGradientClientFocused({
  heading = "Stay front and center with your clients.",
  description = "We enhance client relationships by providing personalized solutions, fostering trust, and driving growth.",
  actions = defaultActions,
  actionsSlot,
  image = defaultImage,
  imageSlot,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  optixFlowConfig,
}: HeroGradientClientFocusedProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

    return (
      <div className={cn("flex items-center gap-2.5 text-lg max-lg:flex-col max-lg:text-base", actionsClassName)}>
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

  const renderImage = () => {
    if (imageSlot) return imageSlot;

    return (
      <Img
        className={cn("mt-10 w-[50%] rounded-xl shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,rgba(0,0,0,0.05)_0px_1px_1px_0px] max-lg:w-full", imageClassName, image.className)}
        src={image.src}
        alt={image.alt}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  return (
    <section
      className={cn(
        "bg-[linear-gradient(#fbf7ec,#e2f1ee)] py-20 text-center",
        className,
      )}
    >
      <div className={cn("container flex flex-col items-center gap-5", containerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("max-w-2xl text-7xl font-medium text-foreground max-lg:text-5xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <h1 className={cn("max-w-2xl text-7xl font-medium text-foreground max-lg:text-5xl", headingClassName)}>
              {heading}
            </h1>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("max-w-2xl text-muted-foreground max-lg:text-sm", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {renderActions()}
        {renderImage()}
      </div>
    </section>
  );
}
