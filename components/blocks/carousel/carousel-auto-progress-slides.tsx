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

export interface CarouselAutoProgressSlidesProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  heading?: string;
  subheading?: string;
  slideLabel?: string;
  items?: Array<{
    src: string;
    label: string;
  }>;
  autoAdvanceInterval?: number;
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
  className,
  optixFlowConfig,
  heading = "UI for future",
  subheading = "Collection of unusual UI components",
  slideLabel = "Available with our platform",
  items,
  autoAdvanceInterval = 50,
}: CarouselAutoProgressSlidesProps): React.JSX.Element {
  const defaultItems = React.useMemo(
    () =>
      Array.from({ length: 5 }).map((_, index) => ({
        src: imagePlaceholders[index % imagePlaceholders.length],
        label: `Feature showcase ${index + 1}`,
      })),
    []
  );

  const carouselItems = items || defaultItems;
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
        if (currentIndex < carouselItems.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setDirection(1);
        } else {
          setCurrentIndex(0);
        }
      }
    }, autoAdvanceInterval);

    return () => clearInterval(interval);
  }, [progress, currentIndex, carouselItems.length, autoAdvanceInterval]);

  const handlePrev = () => {
    progress.set(100);
    currentIndex > 0
      ? setCurrentIndex(currentIndex - 1)
      : setCurrentIndex(carouselItems.length - 1);
    setDirection(-1);
  };

  const handleNext = () => {
    progress.set(100);
    currentIndex < carouselItems.length - 1
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
      <div className="text-center">
        <h1 className="text-6xl tracking-tighter">{heading}</h1>
        <p className="mt-4 text-2xl text-foreground/50">{subheading}</p>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-5">
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
          {carouselItems.map((_, index) => (
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
            className="flex w-full max-w-3xl flex-col items-center justify-center"
          >
            <p className="mb-6 text-2xl text-foreground/50">{slideLabel}</p>
            <div className="h-[550px] w-full overflow-hidden rounded-3xl bg-foreground/10 p-1">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="h-full w-full"
              >
                <Img
                  src={carouselItems[currentIndex].src}
                  alt={carouselItems[currentIndex].label}
                  className="h-full w-full rounded-3xl object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

