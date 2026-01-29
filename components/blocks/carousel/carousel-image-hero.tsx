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
import { cn, getNestedCardBg } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

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
   * Additional CSS classes for the indicators
   */
  indicatorsClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

export function CarouselImageHero({
  badge,
  heading,
  description,
  actions,
  actionsSlot,
  images,
  autoPlayInterval = 7500,
  className,
  containerClassName = "mx-none md:mx-auto w-screen md:w-full max-w-screen md:max-w-7xl relative z-10 rounded-none md:rounded-2xl overflow-hidden shadow-none md:shadow-xl",
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  indicatorsClassName,
  optixFlowConfig,
  background,
  spacing = "py-0 md:py-32",
  pattern,
  patternOpacity,
}: CarouselImageHeroProps): React.JSX.Element {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const goToNext = React.useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (images?.length ?? 1));
  }, [images?.length]);

  const resetInterval = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(goToNext, autoPlayInterval);
  }, [goToNext, autoPlayInterval]);

  const goToSlide = React.useCallback((index: number) => {
    setCurrentImageIndex(index);
    resetInterval();
  }, [resetInterval]);

  React.useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const {
        label,
        icon,
        iconAfter,
        children,
        className: actionClassName,
        ...pressableProps
      } = action;
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
    <Section
      background={background}
      spacing={spacing}
      className={cn(
        "relative min-h-screen md:min-h-[600px] overflow-hidden",
        className,
      )}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      {/* Image Carousel */}
      <div className={cn("absolute inset-0", getNestedCardBg(background), imageClassName)}>
        {images?.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentImageIndex ? "opacity-100" : "opacity-0",
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

        {/* Indicators */}
        <div
          className={cn(
            "absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3",
            indicatorsClassName,
          )}
        >
          {images?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full transition-colors",
                index === currentImageIndex
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/80",
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-[600px] flex-col items-center justify-center px-4 py-16 text-center md:px-16 md:py-20",
        )}
      >
        <div className={cn("max-w-4xl space-y-6", contentClassName)}>
          <div className="space-y-4">
            {badge &&
              (typeof badge === "string" ? (
                <div
                  className={cn(
                    "inline-flex items-center rounded-full bg-background/10 px-3 py-1 text-sm font-medium backdrop-blur-sm",
                    badgeClassName,
                  )}
                >
                  <span>{badge}</span>
                </div>
              ) : (
                <div className={badgeClassName}>{badge}</div>
              ))}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold sm:text-5xl md:text-6xl text-balance text-shadow",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "text-xl text-balance text-shadow",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
          </div>

          {(actionsSlot || (actions && actions.length > 0)) && (
            <div
              className={cn(
                "flex flex-col justify-center gap-4 sm:flex-row",
                actionsClassName,
              )}
            >
              {renderActions()}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
