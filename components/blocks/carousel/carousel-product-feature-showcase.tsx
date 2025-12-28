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
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  colors?: Array<{
    name: string;
    value: string;
    image?: string;
  }>;
}

export interface CarouselProductFeatureShowcaseProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  features?: ProductFeature[];
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CarouselProductFeatureShowcase({
  className,
  optixFlowConfig,
  features,
  heading = "Discover Our Products",
  subheading = "Explore the features that make our products stand out",
  ctaText = "Learn More",
  ctaHref = "#",
}: CarouselProductFeatureShowcaseProps): React.JSX.Element {
  const defaultFeatures: ProductFeature[] = React.useMemo(
    () =>
      Array.from({ length: 4 }).map((_, index) => ({
        id: `feature-${index}`,
        title: `Product Feature ${index + 1}`,
        description: `Experience the innovative design and functionality of feature ${index + 1}. Built with precision and attention to detail.`,
        image: imagePlaceholders[index % imagePlaceholders.length],
        colors: [
          { name: "Default", value: "#3b82f6" },
          { name: "Dark", value: "#1f2937" },
          { name: "Light", value: "#f3f4f6" },
        ],
      })),
    []
  );

  const productFeatures = features || defaultFeatures;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [activeColorIndex, setActiveColorIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const activeFeature = productFeatures[activeIndex];

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % productFeatures.length);
    setActiveColorIndex(0);
  };

  const goToPrev = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + productFeatures.length) % productFeatures.length
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
    activeFeature.colors?.[activeColorIndex]?.image || activeFeature.image;

  return (
    <section className={cn("w-full py-16 lg:py-24", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        </div>

        {/* Main content */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image section */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted lg:aspect-[4/3]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={`${activeIndex}-${activeColorIndex}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Img
                  src={currentImage}
                  alt={activeFeature.title}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Pressable
                onClick={goToPrev}
                asButton
                variant="secondary"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm"
              >
                <DynamicIcon name="lucide/chevron-left" size={20} />
              </Pressable>
              <Pressable
                onClick={goToNext}
                asButton
                variant="secondary"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm"
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
                <h3 className="text-2xl font-semibold md:text-3xl">
                  {activeFeature.title}
                </h3>
                <p className="mt-4 text-lg text-muted-foreground">
                  {activeFeature.description}
                </p>

                {/* Color selectors */}
                {activeFeature.colors && activeFeature.colors.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-3 text-sm font-medium">Available Colors</p>
                    <div className="flex gap-3">
                      {activeFeature.colors.map((color, index) => (
                        <button
                          key={color.name}
                          onClick={() => setActiveColorIndex(index)}
                          className={cn(
                            "h-8 w-8 rounded-full border-2 transition-all",
                            activeColorIndex === index
                              ? "border-primary ring-2 ring-primary ring-offset-2"
                              : "border-transparent hover:border-muted-foreground"
                          )}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <Pressable
                  href={ctaHref}
                  asButton
                  className="mt-8"
                  size="lg"
                >
                  {ctaText}
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="ml-2"
                  />
                </Pressable>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="mt-8 flex gap-2">
              {productFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    activeIndex === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

