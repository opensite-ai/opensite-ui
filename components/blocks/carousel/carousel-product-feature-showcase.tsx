"use client";

/**
 * CarouselProductFeatureShowcase
 *
 * An interactive product feature carousel with mobile-responsive design,
 * color variant selectors, and animated transitions. Features a split layout
 * with product imagery on one side and feature descriptions with navigation
 * on the other.
 *
 * Use cases:
 * - Product landing pages with feature highlights
 * - E-commerce product showcases with variants
 * - SaaS feature tours with visual demonstrations
 * - Marketing pages with interactive product exploration
 */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, getNestedCardBg } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ProductColorVariant {
  /**
   * Color variant name
   */
  name: string;
  /**
   * Color value (hex, rgb, etc.)
   */
  value: string;
  /**
   * Optional image for this color variant
   */
  image?: string;
}

export interface ProductFeature {
  /**
   * Unique identifier for the feature
   */
  id: string;
  /**
   * Feature title
   */
  title?: React.ReactNode;
  /**
   * Feature description
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Color variants for the product
   */
  colors?: ProductColorVariant[];
  /**
   * Additional CSS classes for the feature
   */
  className?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface CarouselProductFeatureShowcaseProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/description text
   */
  subheading?: React.ReactNode;
  /**
   * Array of product features
   */
  features?: ProductFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the content grid
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the navigation arrows
   */
  navigationClassName?: string;
  /**
   * Additional CSS classes for the color selectors
   */
  colorSelectorClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the dot indicators
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

export function CarouselProductFeatureShowcase({
  sectionId = "carousel-product-feature-showcase",
  heading,
  subheading,
  features,
  featuresSlot,
  actions,
  actionsSlot,
  className,
  containerClassName = "px-4 md:px-10 lg:px-16",
  headerClassName,
  headingClassName,
  subheadingClassName,
  contentClassName,
  imageClassName,
  navigationClassName,
  colorSelectorClassName,
  actionsClassName,
  indicatorsClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: CarouselProductFeatureShowcaseProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [activeColorIndex, setActiveColorIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const activeFeature = features?.[activeIndex];

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % (features?.length ?? 1));
    setActiveColorIndex(0);
  };

  const goToPrev = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + (features?.length ?? 1)) % (features?.length ?? 1),
    );
    setActiveColorIndex(0);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setActiveColorIndex(0);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const currentImage =
    activeFeature?.colors?.[activeColorIndex]?.image || activeFeature?.image;

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="mt-8 flex flex-wrap gap-3">
        {actions.map((action, index) => {
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
        })}
      </div>
    );
  };

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className="relative">
        {/* Header */}
        <div className={cn("mb-12 text-center", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              heading
            ))}
          {subheading &&
            (typeof subheading === "string" ? (
              <p
                className={cn("mt-4 text-lg text-balance", subheadingClassName)}
              >
                {subheading}
              </p>
            ) : (
              subheading
            ))}
        </div>

        {/* Main content */}
        {featuresSlot ? (
          <div className={contentClassName}>{featuresSlot}</div>
        ) : (
          <div
            className={cn(
              "grid gap-8 lg:grid-cols-2 lg:gap-12",
              contentClassName,
            )}
          >
            {/* Image section */}
            <div
              className={cn(
                "relative aspect-square overflow-hidden rounded-2xl lg:aspect-4/3 shadow-lg",
                getNestedCardBg(background),
                imageClassName,
              )}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`${activeIndex}-${activeColorIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={cn(
                    "absolute inset-0",
                    activeFeature?.imageClassName,
                  )}
                >
                  <Img
                    src={currentImage}
                    alt={
                      typeof activeFeature?.title === "string"
                        ? activeFeature.title
                        : `Feature ${activeIndex + 1}`
                    }
                    className="h-full w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <div
                className={cn(
                  "absolute bottom-4 right-4 flex gap-2",
                  navigationClassName,
                )}
              >
                <Pressable
                  onClick={goToPrev}
                  asButton
                  variant="outline"
                  size="icon"
                >
                  <DynamicIcon name="lucide/chevron-left" size={20} />
                </Pressable>
                <Pressable
                  onClick={goToNext}
                  asButton
                  variant="outline"
                  size="icon"
                >
                  <DynamicIcon name="lucide/chevron-right" size={20} />
                </Pressable>
              </div>
            </div>

            {/* Content section */}
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeFeature?.title &&
                    (typeof activeFeature.title === "string" ? (
                      <h3 className="text-2xl font-semibold md:text-3xl">
                        {activeFeature.title}
                      </h3>
                    ) : (
                      <div>{activeFeature.title}</div>
                    ))}
                  {activeFeature?.description &&
                    (typeof activeFeature.description === "string" ? (
                      <p className="mt-4 text-lg text-balance">
                        {activeFeature.description}
                      </p>
                    ) : (
                      <div className="mt-4">{activeFeature.description}</div>
                    ))}

                  {/* Color selectors */}
                  {activeFeature?.colors && activeFeature.colors.length > 0 && (
                    <div className={cn("mt-6", colorSelectorClassName)}>
                      <p className="mb-3 text-sm font-medium">
                        Available Colors
                      </p>
                      <div className="flex gap-3">
                        {activeFeature.colors.map((color, index) => (
                          <button
                            key={color.name}
                            onClick={() => setActiveColorIndex(index)}
                            className={cn(
                              "h-8 w-8 rounded-full border-2 transition-all",
                              activeColorIndex === index
                                ? "border-primary ring-2 ring-primary ring-offset-2"
                                : "border-transparent hover:border-muted-foreground",
                            )}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={actionsClassName}>{renderActions()}</div>
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              <div className={cn("mt-8 flex gap-2", indicatorsClassName)}>
                {features?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      activeIndex === index
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
