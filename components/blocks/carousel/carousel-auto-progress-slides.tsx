"use client";

/**
 * CarouselAutoProgressSlides
 *
 * An auto-advancing carousel with animated progress indicators and smooth blur
 * transitions between slides. Features a centered headline, navigation controls,
 * and visual progress dots that fill as each slide auto-advances.
 *
 * Use cases:
 * - Hero sections with rotating feature highlights
 * - Product showcases with timed transitions
 * - Marketing landing pages with auto-playing content
 * - Onboarding flows with step-by-step visuals
 */

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from "framer-motion";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { OptixFlowConfig } from "../../../src/types";

export interface SlideItem {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Slide label/alt text
   */
  label?: React.ReactNode;
  /**
   * Additional CSS classes for the slide
   */
  className?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface CarouselAutoProgressSlidesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/description text
   */
  subheading?: React.ReactNode;
  /**
   * Label shown above each slide
   */
  slideLabel?: React.ReactNode;
  /**
   * Array of slide items
   */
  items?: SlideItem[];
  /**
   * Custom slot for rendering slides (overrides items array)
   */
  slidesSlot?: React.ReactNode;
  /**
   * Auto advance interval in milliseconds
   */
  autoAdvanceInterval?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the header area
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
   * Additional CSS classes for the navigation area
   */
  navigationClassName?: string;
  /**
   * Additional CSS classes for the slide label
   */
  slideLabelClassName?: string;
  /**
   * Additional CSS classes for the slide container
   */
  slideContainerClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const variants: Variants = {
  initial: () => {
    return { opacity: 0, filter: "blur(4px)" };
  },
  active: {
    x: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: 0.3, duration: 0.3, ease: "easeOut" },
  },
  exit: (direction: number) => {
    return {
      x: `${-30 * direction}%`,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.25, ease: "easeOut" },
    };
  },
};

export function CarouselAutoProgressSlides({
  heading = "UI for future",
  subheading = "Collection of unusual UI components",
  slideLabel = "Available with our platform",
  items,
  slidesSlot,
  autoAdvanceInterval = 50,
  className,
  headerClassName,
  headingClassName,
  subheadingClassName,
  navigationClassName,
  slideLabelClassName,
  slideContainerClassName,
  imageClassName,
  optixFlowConfig,
}: CarouselAutoProgressSlidesProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const progress = useMotionValue(100);
  const [direction, setDirection] = React.useState(1);

  const clipPath = useMotionTemplate`inset(0 ${progress}% 0 0 round 10px)`;

  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentProgress = progress.get();
      if (currentProgress > 0) {
        progress.set(currentProgress - 1);
      } else {
        clearInterval(interval);
        progress.set(100);
        if (currentIndex < items.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setDirection(1);
        } else {
          setCurrentIndex(0);
        }
      }
    }, autoAdvanceInterval);

    return () => clearInterval(interval);
  }, [progress, currentIndex, items.length, autoAdvanceInterval]);

  const handlePrev = () => {
    progress.set(100);
    currentIndex > 0
      ? setCurrentIndex(currentIndex - 1)
      : setCurrentIndex(items.length - 1);
    setDirection(-1);
  };

  const handleNext = () => {
    progress.set(100);
    currentIndex < items.length - 1
      ? setCurrentIndex(currentIndex + 1)
      : setCurrentIndex(0);
    setDirection(1);
  };

  const handleDotClick = (index: number) => {
    progress.set(100);
    setCurrentIndex(index);
    if (index > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
  };

  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center gap-12 overflow-hidden font-sans",
        className
      )}
    >
      <div className={cn("text-center", headerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("text-6xl tracking-tighter", headingClassName)}>{heading}</h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {subheading && (
          typeof subheading === "string" ? (
            <p className={cn("mt-4 text-2xl text-foreground/50", subheadingClassName)}>{subheading}</p>
          ) : (
            <div className={cn("mt-4", subheadingClassName)}>{subheading}</div>
          )
        )}
      </div>

      {/* Navigation Controls */}
      <div className={cn("flex items-center justify-center gap-5", navigationClassName)}>
        <Pressable
          onClick={handlePrev}
          asButton
          variant="ghost"
          size="icon"
          className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-foreground/10 p-0.5 text-foreground/50 hover:bg-foreground/20 active:scale-95"
        >
          <DynamicIcon name="lucide/chevron-left" size={16} />
        </Pressable>
        <div className="flex items-center justify-center gap-1">
          {items.map((_, index) => (
            <motion.button
              key={index}
              initial={false}
              onClick={() => handleDotClick(index)}
              animate={{
                width: index === currentIndex ? "30px" : "8px",
              }}
              className="relative flex h-2 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-foreground/15 p-0.5 text-foreground/50"
            >
              {currentIndex === index && (
                <motion.div
                  style={{ clipPath }}
                  className="absolute left-0 top-0 h-full w-full origin-left rounded-full bg-foreground"
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
          className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-foreground/10 p-0.5 text-neutral-400 hover:bg-foreground/20 active:scale-95"
        >
          <DynamicIcon name="lucide/chevron-right" size={16} />
        </Pressable>
      </div>

      {slidesSlot ? (
        slidesSlot
      ) : (
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          {currentIndex !== null && (
            <motion.div
              key={currentIndex}
              variants={variants}
              initial="initial"
              animate="active"
              exit="exit"
              custom={direction}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
              className={cn("flex w-full max-w-3xl flex-col items-center justify-center", items[currentIndex].className)}
            >
              {slideLabel && (
                typeof slideLabel === "string" ? (
                  <p className={cn("mb-6 text-2xl text-foreground/50", slideLabelClassName)}>{slideLabel}</p>
                ) : (
                  <div className={cn("mb-6", slideLabelClassName)}>{slideLabel}</div>
                )
              )}
              <div className={cn("h-[550px] w-full overflow-hidden rounded-3xl bg-foreground/10 p-1", slideContainerClassName)}>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="h-full w-full"
                >
                  <Img
                    src={items[currentIndex].src}
                    alt={typeof items[currentIndex].label === "string" ? items[currentIndex].label : `Slide ${currentIndex + 1}`}
                    className={cn("h-full w-full rounded-3xl object-cover", imageClassName, items[currentIndex].imageClassName)}
                    optixFlowConfig={optixFlowConfig}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}

