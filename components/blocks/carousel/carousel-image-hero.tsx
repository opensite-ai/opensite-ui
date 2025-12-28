"use client";

/**
 * CarouselImageHero
 *
 * A full-width hero section with an auto-advancing background image carousel,
 * overlay content with headline, description, and call-to-action button.
 * Includes navigation arrows and dot indicators for manual slide control.
 *
 * Use cases:
 * - Landing page hero sections with rotating imagery
 * - Product launch pages with visual storytelling
 * - Portfolio showcases with featured work
 * - Marketing campaigns with dynamic backgrounds
 */

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

export interface CarouselImageHeroProps {
  /**
   * Badge/eyebrow content above heading
   */
  badge?: React.ReactNode;
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
   * Array of image items for the carousel
   */
  images?: ImageItem[];
  /**
   * Auto-play interval in milliseconds
   */
  autoPlayInterval?: number;
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
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
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
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the navigation arrows
   */
  navigationClassName?: string;
  /**
   * Additional CSS classes for the indicators
   */
  indicatorsClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultImages: ImageItem[] = [
  { src: imagePlaceholders[0], alt: "Hero image 1" },
  { src: imagePlaceholders[1], alt: "Hero image 2" },
  { src: imagePlaceholders[2], alt: "Hero image 3" },
];

const defaultActions: ActionConfig[] = [
  {
    label: "Get Started",
    href: "#",
    variant: "secondary",
    size: "lg",
    iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />,
  },
];

export function CarouselImageHero({
  badge = "Launching Soon",
  heading = "Build exceptional digital experiences",
  description = "Our platform helps you create stunning websites and applications with ease, designed to engage your audience and drive results.",
  actions = defaultActions,
  actionsSlot,
  images = defaultImages,
  autoPlayInterval = 5000,
  className,
  containerClassName,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  navigationClassName,
  indicatorsClassName,
  optixFlowConfig,
}: CarouselImageHeroProps): React.JSX.Element {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={cn("bg-primary-foreground text-primary dark:bg-primary dark:text-primary-foreground", actionClassName)}
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
    <section className={cn("relative min-h-[600px] overflow-hidden", className)}>
      {/* Image Carousel */}
      <div className={cn("absolute inset-0", imageClassName)}>
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Img
              src={image.src}
              alt={image.alt}
              className={cn("h-full w-full object-cover", image.className)}
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Navigation Arrows */}
        <Pressable
          onClick={goToPreviousImage}
          asButton
          variant="ghost"
          size="icon"
          className={cn("absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-background/30 p-2 backdrop-blur-sm transition-colors hover:bg-background/50 md:block", navigationClassName)}
          aria-label="Previous image"
        >
          <DynamicIcon name="lucide/chevron-left" size={24} className="text-white" />
        </Pressable>

        <Pressable
          onClick={goToNextImage}
          asButton
          variant="ghost"
          size="icon"
          className={cn("absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-background/30 p-2 backdrop-blur-sm transition-colors hover:bg-background/50 md:block", navigationClassName)}
          aria-label="Next image"
        >
          <DynamicIcon name="lucide/chevron-right" size={24} className="text-white" />
        </Pressable>

        {/* Indicators */}
        <div className={cn("absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2", indicatorsClassName)}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                index === currentImageIndex
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={cn("container relative z-10 mx-auto flex min-h-[600px] flex-col items-center justify-center px-4 py-24 text-center md:px-6 md:py-32 2xl:max-w-[1400px]", containerClassName)}>
        <div className={cn("max-w-3xl space-y-8", contentClassName)}>
          <div className="space-y-4">
            {badge && (
              typeof badge === "string" ? (
                <div className={cn("inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm", badgeClassName)}>
                  <span>{badge}</span>
                </div>
              ) : (
                <div className={badgeClassName}>{badge}</div>
              )
            )}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight text-primary-foreground dark:text-primary sm:text-5xl md:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-xl text-primary-foreground dark:text-primary", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
          </div>

          {(actionsSlot || (actions && actions.length > 0)) && (
            <div className={cn("flex flex-col justify-center gap-4 sm:flex-row", actionsClassName)}>
              {renderActions()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

