"use client";

import * as React from "react";
import { useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  cn,
  getNestedCardBg,
  getNestedCardTextColor,
} from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Pressable } from "@/src";

export interface FeatureAnimatedCarouselItem {
  /**
   * Image source URL for this feature
   */
  image?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Custom slot for image (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
   * Feature title content
   */
  title?: React.ReactNode;
  /**
   * Feature description content
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
  /**
   * Optional href for item
   */
  href?: string;
}

export interface FeatureAnimatedCarouselProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Array of feature items to display
   */
  features?: FeatureAnimatedCarouselItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
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
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
}

interface ControlsProps {
  handleNext: () => void;
  handlePrevious: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const Controls = React.memo(
  ({
    handleNext,
    handlePrevious,
    isPreviousDisabled,
    isNextDisabled,
  }: ControlsProps) => {
    return (
      <div className="hidden flex-col items-start gap-8 lg:flex">
        <button
          className="rounded-full border p-2 flex items-center justify-center disabled:opacity-50 h-fit w-fit bg-card text-card-foreground"
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
          type="button"
        >
          <DynamicIcon name="lucide/chevron-up" size={24} />
        </button>
        <button
          className="rounded-full border p-2 flex items-center justify-center disabled:opacity-50 h-fit w-fit bg-card text-card-foreground"
          onClick={handleNext}
          disabled={isNextDisabled}
          type="button"
        >
          <DynamicIcon name="lucide/chevron-down" size={24} />
        </button>
      </div>
    );
  },
);

interface FeatureCardProps {
  feature: FeatureAnimatedCarouselItem;
  isActive: boolean;
  onClick: () => void;
}

const FeatureCard = React.memo(
  ({ feature, isActive, onClick }: FeatureCardProps) => {
    const variants = useMemo(
      () => ({
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
        exit: {
          opacity: 0,
        },
      }),
      [],
    );

    return (
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          transition={{
            layout: {
              duration: 0.4,
              ease: "easeOut",
            },
          }}
          style={{
            borderRadius: "24px",
          }}
          className={cn(
            "relative flex items-start gap-4 overflow-hidden bg-background text-foreground md:w-fit md:max-w-sm",
            isActive ? "shadow-xl" : "cursor-pointer shadow-none",
          )}
          onClick={onClick}
        >
          {isActive && feature.href && (
            <div className="absolute bottom-4 right-4 bg-background rounded-full h-fit w-fit p-2 flex items-center justify-center">
              <Pressable
                href={feature.href}
                size="icon-lg"
                className="text-foreground"
              >
                <DynamicIcon name="lucide/arrow-up-right" />
              </Pressable>
            </div>
          )}
          {isActive ? (
            <motion.div
              layout
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={`feature-description-active-${feature.title}`}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: "easeOut",
              }}
              className="p-6 text-sm md:p-8 md:text-base"
            >
              {(feature.title || feature.description) && (
                <p>
                  {feature.title && (
                    <span className="font-semibold">{feature.title}.</span>
                  )}
                  {feature.title && feature.description && " "}
                  {feature.description && <span>{feature.description}</span>}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={`feature-description-inactive-${feature.title}`}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: "easeOut",
              }}
              className={cn(
                "flex h-fit shrink-0 items-center gap-4 text-sm md:py-3.5 md:pr-6 md:pl-3 md:text-base",
                !isActive && "h-0 w-0 md:h-auto md:w-auto",
              )}
              style={{
                height: "auto",
                lineHeight: "normal",
              }}
            >
              <DynamicIcon
                name="lucide/plus-circle"
                size={24}
                className="shrink-0"
              />
              {feature.title && (
                <p className="shrink-0 font-semibold">{feature.title}</p>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  },
);

interface FeaturesDesktopProps {
  features: FeatureAnimatedCarouselItem[];
  handleNext: () => void;
  handlePrevious: () => void;
  activeIndex: number;
  handleFeatureClick: (index: number) => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const FeaturesDesktop = React.memo(
  ({
    features,
    handleNext,
    handlePrevious,
    activeIndex,
    handleFeatureClick,
    isPreviousDisabled,
    isNextDisabled,
  }: FeaturesDesktopProps) => {
    return (
      <div className="relative z-10 hidden items-center gap-8 md:flex">
        <Controls
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          isPreviousDisabled={isPreviousDisabled}
          isNextDisabled={isNextDisabled}
        />
        <div className="flex flex-col gap-4">
          {features.map((feature, index) => {
            return (
              <FeatureCard
                key={`feature-card-${index}`}
                feature={feature}
                isActive={index === activeIndex}
                onClick={() => handleFeatureClick(index)}
              />
            );
          })}
        </div>
      </div>
    );
  },
);

interface FeatureMobileProps {
  features: FeatureAnimatedCarouselItem[];
  handleNext: () => void;
  handlePrevious: () => void;
  activeIndex: number;
  direction: 1 | -1;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const FeaturesMobile = React.memo(
  ({
    features,
    handleNext,
    handlePrevious,
    activeIndex,
    direction,
    isPreviousDisabled,
    isNextDisabled,
  }: FeatureMobileProps) => {
    const variants = useMemo(
      () => ({
        enter: (direction: number) => ({
          x: direction > 0 ? 100 : -100,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
        },
        exit: (direction: number) => ({
          x: direction < 0 ? 100 : -100,
          opacity: 0,
        }),
      }),
      [],
    );

    const currentFeature = features[activeIndex];

    return (
      <div className="relative z-10 flex flex-col gap-4 md:hidden">
        {/* Content row with text on left and vertical navigation on right */}
        <div className="flex w-full items-stretch gap-4">
          {/* Text content - left aligned */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="rounded-3xl bg-background p-4 text-left"
              >
                {(currentFeature?.title || currentFeature?.description) && (
                  <div className="text-sm">
                    {currentFeature.title && (
                      <p className="font-semibold">{currentFeature.title}</p>
                    )}
                    {currentFeature.description && (
                      <p className="mt-1">{currentFeature.description}</p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Vertical navigation buttons on right */}
          <div className="flex flex-col justify-center gap-2">
            <button
              className="rounded-full border bg-background/50 p-2 hover:bg-background disabled:opacity-50"
              onClick={handlePrevious}
              disabled={isPreviousDisabled}
              type="button"
            >
              <DynamicIcon name="lucide/chevron-up" size={20} />
            </button>
            <button
              className="rounded-full border bg-background/50 p-2 hover:bg-background disabled:opacity-50"
              onClick={handleNext}
              disabled={isNextDisabled}
              type="button"
            >
              <DynamicIcon name="lucide/chevron-down" size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  },
);

/**
 * Feature Animated Carousel - Interactive feature showcase with animated transitions
 * between feature cards and corresponding images.
 *
 * Layout: Split layout with feature cards on left/bottom and large image on right/top.
 * Key features: Animated card expansion, image transitions, desktop/mobile variants.
 * Best for: Product feature showcases, service highlights, capability demonstrations.
 *
 * @example
 * ```tsx
 * <FeatureAnimatedCarousel
 *   features={[
 *     {
 *       image: "/feature1.jpg",
 *       title: "Fast Performance",
 *       description: "Lightning-fast load times for better user experience."
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureAnimatedCarousel({
  title,
  description,
  titleClassName,
  descriptionClassName,
  features,
  className,
  optixFlowConfig,
  background,
  pattern,
  patternOpacity,
  patternClassName,
  headerClassName,
  spacing = "py-12 md:py-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
}: FeatureAnimatedCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  const handleNext = useCallback(() => {
    if (features && activeIndex < features.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex, features]);

  const handlePrevious = useCallback(() => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex]);

  const handleFeatureClick = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  const isPreviousDisabled = activeIndex === 0;
  const isNextDisabled = !features || activeIndex === features.length - 1;

  const imageVariants = useMemo(
    () => ({
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
    }),
    [],
  );

  if (!features || features.length === 0) {
    return (
      <Section
        background={background}
        spacing={spacing}
        pattern={pattern}
        patternOpacity={patternOpacity}
        patternClassName={patternClassName}
        className={className}
        containerClassName={containerClassName}
      >
        <div
          className={cn(
            "relative flex min-h-[500px] flex-col-reverse gap-8 overflow-hidden rounded-3xl p-6 md:flex-row md:items-center md:p-12 lg:min-h-[600px]",
            getNestedCardBg(background),
            getNestedCardTextColor(background),
          )}
        />
      </Section>
    );
  }

  const currentFeature = features[activeIndex];

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className="flex flex-col space-y-6 md:space-y-16">
        {title || description ? (
          <div className={cn("flex flex-col gap-6 text-left", headerClassName)}>
            {title &&
              (typeof title === "string" ? (
                <h2
                  className={cn(
                    "text-xl font-semibold text-balance md:text-2xl lg:text-3xl max-w-lg md:max-w-md",
                    titleClassName,
                  )}
                >
                  {title}
                </h2>
              ) : (
                <div
                  className={cn(
                    "text-xl font-semibold text-balance md:text-2xl lg:text-3xl max-w-lg md:max-w-md",
                    titleClassName,
                  )}
                >
                  {title}
                </div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p className={cn("max-w-lg md:max-w-md", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div
                  className={cn("max-w-lg md:max-w-md", descriptionClassName)}
                >
                  {description}
                </div>
              ))}
          </div>
        ) : null}

        <div
          className={cn(
            "relative flex min-h-[500px] flex-col-reverse gap-8 overflow-hidden rounded-3xl p-6 md:flex-row md:items-center md:p-12 lg:min-h-[600px]",
          )}
        >
          <FeaturesDesktop
            features={features}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            activeIndex={activeIndex}
            handleFeatureClick={handleFeatureClick}
            isPreviousDisabled={isPreviousDisabled}
            isNextDisabled={isNextDisabled}
          />
          <FeaturesMobile
            features={features}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            activeIndex={activeIndex}
            direction={direction}
            isPreviousDisabled={isPreviousDisabled}
            isNextDisabled={isNextDisabled}
          />
          {currentFeature?.image && (
            <div className="relative w-full h-[250px] md:h-auto overflow-hidden rounded-2xl md:absolute md:right-8 md:top-8 md:bottom-8 md:w-1/2 shadow-xl">
              {/* Mobile icon link - positioned at top right of image */}
              {currentFeature.href && (
                <div className="absolute top-4 right-4 z-10 bg-background rounded-full h-fit w-fit p-2 flex items-center justify-center md:hidden">
                  <Pressable
                    href={currentFeature.href}
                    size="icon-lg"
                    className="text-foreground"
                  >
                    <DynamicIcon name="lucide/arrow-up-right" />
                  </Pressable>
                </div>
              )}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="h-full w-full"
                >
                  <Img
                    src={currentFeature.image}
                    alt={
                      currentFeature.imageAlt ||
                      (typeof currentFeature.title === "string"
                        ? currentFeature.title
                        : "Feature image")
                    }
                    className="h-full w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
