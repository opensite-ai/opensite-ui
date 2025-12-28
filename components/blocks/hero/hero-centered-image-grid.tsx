"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, LogoItem, OptixFlowConfig } from "../../../src/types";

export interface HeroCenteredImageGridProps {
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
   * Grid images (expects 2 images)
   */
  gridImages?: ImageItem[];
  /**
   * Custom slot for grid images (overrides gridImages)
   */
  gridImagesSlot?: React.ReactNode;
  /**
   * Image overlay action configuration
   */
  imageOverlayAction?: ActionConfig;
  /**
   * Array of logo items
   */
  logos?: LogoItem[];
  /**
   * Custom slot for logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
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
   * Additional CSS classes for the image grid
   */
  imageGridClassName?: string;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultActions: ActionConfig[] = [
  {
    label: "Get started now",
    href: "#",
    variant: "default",
    iconAfter: <DynamicIcon name="lucide/chevron-right" size={16} className="ml-1" />,
  },
  {
    label: "Learn more",
    href: "#",
    variant: "ghost",
    iconAfter: <DynamicIcon name="lucide/chevron-right" size={16} className="ml-1" />,
  },
];

const defaultGridImages: ImageItem[] = [
  { src: imagePlaceholders[2], alt: "placeholder" },
  { src: imagePlaceholders[3], alt: "placeholder" },
];

const defaultImageOverlayAction: ActionConfig = {
  label: "Learn more",
  href: "#",
  variant: "outline",
  className: "absolute right-5 bottom-5",
  iconAfter: <DynamicIcon name="lucide/chevron-right" size={16} className="ml-1" />,
};

const defaultLogos: LogoItem[] = [
  { src: { light: logoPlaceholders.darkHorizontalLogo, dark: logoPlaceholders.lightHorizontalLogo }, alt: "logo", className: "h-5 sm:h-7" },
  { src: { light: logoPlaceholders.darkHorizontalLogo, dark: logoPlaceholders.lightHorizontalLogo }, alt: "logo", className: "h-9 sm:h-11" },
  { src: { light: logoPlaceholders.darkHorizontalLogo, dark: logoPlaceholders.lightHorizontalLogo }, alt: "logo", className: "h-4 sm:h-6" },
];

export function HeroCenteredImageGrid({
  heading = "Build your next project with Blocks",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  actions = defaultActions,
  actionsSlot,
  gridImages = defaultGridImages,
  gridImagesSlot,
  imageOverlayAction = defaultImageOverlayAction,
  logos = defaultLogos,
  logosSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageGridClassName,
  logosClassName,
  optixFlowConfig,
}: HeroCenteredImageGridProps): React.JSX.Element {
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

  const renderImageOverlayAction = () => {
    if (!imageOverlayAction) return null;
    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = imageOverlayAction;
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

  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return logos.map((logo, index) => {
      const src = typeof logo.src === "string" ? logo.src : logo.src.light;
      const darkSrc = typeof logo.src === "string" ? logo.src : logo.src.dark;
      
      return (
        <React.Fragment key={index}>
          <Img
            src={src}
            alt={logo.alt}
            className={cn(logo.className, "dark:invert")}
            optixFlowConfig={optixFlowConfig}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className={cn("z-10 flex flex-col items-center gap-8 text-center", contentClassName)}>
            <div className="max-w-3xl">
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("mb-4 text-4xl font-semibold text-pretty lg:text-6xl", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("text-muted-foreground lg:text-xl", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
            </div>
            {(actionsSlot || (actions && actions.length > 0)) && (
              <div className={cn("flex w-full flex-col justify-center gap-2 sm:flex-row", actionsClassName)}>
                {renderActions()}
              </div>
            )}
          </div>
        </div>
        {gridImagesSlot ? gridImagesSlot : (
          <div className={cn("mx-auto mt-20 grid max-w-7xl gap-px bg-border p-px md:grid-cols-5", imageGridClassName)}>
            {gridImages[0] && (
              <Img
                src={gridImages[0].src}
                alt={gridImages[0].alt}
                className={cn("h-full max-h-[500px] w-full object-cover md:col-span-3 dark:invert", gridImages[0].className)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
            {gridImages[1] && (
              <div className="relative md:col-span-2">
                <Img
                  src={gridImages[1].src}
                  alt={gridImages[1].alt}
                  className={cn("h-full max-h-[500px] w-full object-cover dark:invert", gridImages[1].className)}
                  optixFlowConfig={optixFlowConfig}
                />
                {renderImageOverlayAction()}
              </div>
            )}
          </div>
        )}
        {(logosSlot || (logos && logos.length > 0)) && (
          <div className={cn("mx-auto mt-12 grid max-w-7xl grid-cols-2 place-items-center gap-6 md:grid-cols-4", logosClassName)}>
            {renderLogos()}
          </div>
        )}
      </div>
    </section>
  );
}
