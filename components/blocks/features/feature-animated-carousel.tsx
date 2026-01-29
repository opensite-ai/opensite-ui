"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

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
}

export interface FeatureAnimatedCarouselProps {
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

const Controls = ({
  handleNext,
  handlePrevious,
  isPreviousDisabled,
  isNextDisabled,
}: ControlsProps) => {
  return (
    <div className="hidden flex-col items-start gap-8 lg:flex">
      <button
        className="rounded-full border bg-background/50 p-2 hover:bg-background disabled:opacity-50"
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        type="button"
      >
        <DynamicIcon name="lucide/chevron-up" size={24} />
      </button>
      <button
        className="rounded-full border bg-background/50 p-2 hover:bg-background disabled:opacity-50"
        onClick={handleNext}
        disabled={isNextDisabled}
        type="button"
      >
        <DynamicIcon name="lucide/chevron-down" size={24} />
      </button>
    </div>
  );
};

interface FeatureCardProps {
  feature: FeatureAnimatedCarouselItem;
  isActive: boolean;
  onClick: () => void;
}

const FeatureCard = ({ feature, isActive, onClick }: FeatureCardProps) => {
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

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
        className="flex cursor-pointer items-start gap-4 overflow-hidden bg-background md:w-fit md:max-w-sm"
        onClick={onClick}
      >
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
            <p>
              <span className="font-semibold">{feature.title}.</span>{" "}
              <span>{feature.description}</span>
            </p>
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
            <p className="shrink-0 font-semibold">{feature.title}</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

interface FeaturesDesktopProps {
  features: FeatureAnimatedCarouselItem[];
  handleNext: () => void;
  handlePrevious: () => void;
  activeIndex: number;
  handleFeatureClick: (index: number) => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const FeaturesDesktop = ({
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
};

interface FeatureMobileProps {
  features: FeatureAnimatedCarouselItem[];
  handleNext: () => void;
  handlePrevious: () => void;
  activeIndex: number;
  direction: 1 | -1;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const FeaturesMobile = ({
  features,
  handleNext,
  handlePrevious,
  activeIndex,
  direction,
  isPreviousDisabled,
  isNextDisabled,
}: FeatureMobileProps) => {
  const variants = {
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
  };

  return (
    <div className="relative z-10 flex flex-col items-center gap-6 md:hidden">
      <div className="flex w-full items-center justify-between gap-4">
        <button
          className="rounded-full border bg-background/50 p-2 hover:bg-background disabled:opacity-50"
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
          type="button"
        >
          <DynamicIcon name="lucide/chevron-left" size={24} />
        </button>
        <div className="relative h-24 w-full overflow-hidden">
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
              className="absolute inset-0 flex items-center justify-center rounded-3xl bg-background p-4"
            >
              <p className="text-center text-sm">
                <span className="font-semibold">
                  {features[activeIndex].title}.
                </span>{" "}
                <span>{features[activeIndex].description}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          className="rounded-full border bg-background/50 p-2 hover:bg-background disabled:opacity-50"
          onClick={handleNext}
          disabled={isNextDisabled}
          type="button"
        >
          <DynamicIcon name="lucide/chevron-right" size={24} />
        </button>
      </div>
    </div>
  );
};

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
  features = [],
  className,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureAnimatedCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  const handleNext = () => {
    if (activeIndex < features.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleFeatureClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const isPreviousDisabled = activeIndex === 0;
  const isNextDisabled = activeIndex === features.length - 1;

  const imageVariants = {
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

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className="relative flex min-h-[500px] flex-col-reverse gap-8 overflow-hidden rounded-3xl bg-muted p-6 md:flex-row md:items-center md:p-12 lg:min-h-[600px]">
        {features && (
          <FeaturesDesktop
            features={features}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            activeIndex={activeIndex}
            handleFeatureClick={handleFeatureClick}
            isPreviousDisabled={isPreviousDisabled}
            isNextDisabled={isNextDisabled}
          />
        )}
        {features && (
          <FeaturesMobile
            features={features}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            activeIndex={activeIndex}
            direction={direction}
            isPreviousDisabled={isPreviousDisabled}
            isNextDisabled={isNextDisabled}
          />
        )}
        <div className="relative flex-1 overflow-hidden rounded-2xl md:absolute md:right-8 md:top-8 md:bottom-8 md:w-1/2">
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
                src={features ? features[activeIndex].image : undefined}
                alt={
                  features
                    ? features[activeIndex].imageAlt ||
                      (typeof features[activeIndex].title === "string"
                        ? features[activeIndex].title
                        : "Feature image")
                    : undefined
                }
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
