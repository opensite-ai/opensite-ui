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
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  cn,
  getNestedCardBg,
  getNestedCardTextColor,
} from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
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
import { BlockActions } from "@/components/ui/block-actions";
import { Badge } from "@/src";

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
  /** Optional Section ID */
  sectionId?: string;
}

export function CarouselImageHero({
  sectionId = "carousel-image-hero",
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
  const hasImages = React.useMemo(() => {
    return images && images?.length > 0;
  }, [images]);

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const progress = useMotionValue(100);
  const clipPath = useMotionTemplate`inset(0 ${progress}% 0 0 round 10px)`;

  // Progress-based auto-advance
  React.useEffect(() => {
    if (!hasImages || (images?.length ?? 0) < 2) return;

    // Calculate tick interval based on autoPlayInterval
    // Progress goes from 100 to 0 in 100 steps
    const tickInterval = autoPlayInterval / 100;

    const interval = setInterval(() => {
      const currentProgress = progress.get();
      if (currentProgress > 0) {
        progress.set(currentProgress - 1);
      } else {
        // Reset and advance to next slide
        progress.set(100);
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % (images?.length ?? 1),
        );
      }
    }, tickInterval);

    return () => clearInterval(interval);
  }, [
    progress,
    currentImageIndex,
    images?.length,
    autoPlayInterval,
    hasImages,
  ]);

  const handlePrev = React.useCallback(() => {
    progress.set(100);
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : (images?.length ?? 1) - 1,
    );
  }, [images?.length, progress]);

  const handleNext = React.useCallback(() => {
    progress.set(100);
    setCurrentImageIndex((prevIndex) =>
      prevIndex < (images?.length ?? 0) - 1 ? prevIndex + 1 : 0,
    );
  }, [images?.length, progress]);

  const handleDotClick = React.useCallback(
    (index: number) => {
      progress.set(100);
      setCurrentImageIndex(index);
    },
    [progress],
  );

  return (
    <Section
      id={sectionId}
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
      <div className={cn("absolute inset-0", imageClassName)}>
        {!hasImages
          ? null
          : images?.map((image, index) => (
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

        {/* Navigation Controls */}
        <div
          className={cn(
            "absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-5",
            indicatorsClassName,
          )}
        >
          <Pressable
            onClick={handlePrev}
            asButton
            variant="ghost"
            size="icon"
            className={cn(
              "flex size-6 cursor-pointer items-center justify-center rounded-full p-0.5 opacity-80 hover:opacity-100 active:scale-95 bg-white/20 text-white backdrop-blur-sm",
            )}
          >
            <DynamicIcon name="lucide/chevron-left" size={16} />
          </Pressable>
          <div className="flex items-center justify-center gap-1">
            {images?.map((_, index) => (
              <motion.button
                key={index}
                initial={false}
                onClick={() => handleDotClick(index)}
                animate={{
                  width: index === currentImageIndex ? "30px" : "8px",
                }}
                className="relative flex h-2 cursor-pointer items-center justify-center overflow-hidden rounded-full p-0.5 bg-white/50"
                aria-label={`Go to image ${index + 1}`}
              >
                {currentImageIndex === index && (
                  <motion.div
                    style={{ clipPath }}
                    className="absolute left-0 top-0 h-full w-full origin-left rounded-full bg-white"
                  />
                )}
              </motion.button>
            ))}
          </div>
          <Pressable
            onClick={handleNext}
            asButton
            variant="ghost"
            size="icon"
            className={cn(
              "flex size-6 cursor-pointer items-center justify-center rounded-full p-0.5 opacity-80 hover:opacity-100 active:scale-95 bg-white/20 text-white backdrop-blur-sm",
            )}
          >
            <DynamicIcon name="lucide/chevron-right" size={16} />
          </Pressable>
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-[600px] flex-col items-center justify-center px-4 py-16 text-center md:px-16 md:py-20",
        )}
      >
        <div className={cn("max-w-4xl space-y-6", contentClassName)}>
          <div className="space-y-4">
            {badge &&
              (typeof badge === "string" ? (
                <Badge
                  className={cn("px-3 py-1 backdrop-blur-sm", badgeClassName)}
                >
                  <span>{badge}</span>
                </Badge>
              ) : (
                badge
              ))}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold sm:text-5xl md:text-6xl text-balance",
                    headingClassName,
                    hasImages ? "text-white text-shadow-lg" : "",
                  )}
                >
                  {heading}
                </h1>
              ) : (
                heading
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "text-xl text-balance",
                    descriptionClassName,
                    hasImages ? "text-white text-shadow-lg" : "",
                  )}
                >
                  {description}
                </p>
              ) : (
                description
              ))}
          </div>

          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </div>
      </div>
    </Section>
  );
}
