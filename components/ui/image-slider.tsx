"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Img } from "@page-speed/img";
import type { OptixFlowConfig } from "../../src/types";

export type ImageSliderDirection = "up" | "down";

export interface ImageSliderImage {
  /**
   * Image source URL
   */
  src?: string;
  /**
   * Alt text for accessibility
   */
  alt: string;
  /**
   * Additional CSS classes for the image
   */
  className?: string;
  /**
   * Optional per-image OptixFlow configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export interface ImageSliderProps {
  /**
   * Images to rotate through
   */
  images: ImageSliderImage[];
  /**
   * Optional overlay content rendered above the images
   */
  children?: React.ReactNode;
  /**
   * Enable the default overlay gradient
   * @default true
   */
  overlay?: boolean;
  /**
   * Custom overlay slot (overrides default overlay)
   */
  overlaySlot?: React.ReactNode;
  /**
   * Additional classes for the overlay layer
   */
  overlayClassName?: string;
  /**
   * Additional classes for the slider wrapper
   */
  className?: string;
  /**
   * Additional classes for the image element
   */
  imageClassName?: string;
  /**
   * Additional classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Enable autoplay rotation
   * @default true
   */
  autoplay?: boolean;
  /**
   * Autoplay interval in milliseconds
   * @default 6000
   */
  autoplayIntervalMs?: number;
  /**
   * Direction for the slide exit animation
   * @default "up"
   */
  direction?: ImageSliderDirection;
  /**
   * Starting image index
   * @default 0
   */
  startIndex?: number;
  /**
   * Enable keyboard navigation via arrow keys
   * @default true
   */
  enableKeyboard?: boolean;
  /**
   * Optional callback when the slide changes
   */
  onSlideChange?: (index: number) => void;
  /**
   * Global OptixFlow configuration for all images
   */
  optixFlowConfig?: OptixFlowConfig;
}

const slideVariants: Variants = {
  initial: {
    scale: 0.98,
    opacity: 0,
    rotateX: 12,
  },
  visible: {
    scale: 1,
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.645, 0.045, 0.355, 1.0],
    },
  },
  upExit: {
    opacity: 0.8,
    y: "-120%",
    transition: {
      duration: 0.8,
    },
  },
  downExit: {
    opacity: 0.8,
    y: "120%",
    transition: {
      duration: 0.8,
    },
  },
};

const normalizeIndex = (index: number, length: number) => {
  if (!length) return 0;
  const safeIndex = index % length;
  return safeIndex < 0 ? safeIndex + length : safeIndex;
};

export const ImageSlider = ({
  images,
  children,
  overlay = true,
  overlaySlot,
  overlayClassName,
  className,
  imageClassName,
  contentClassName,
  autoplay = true,
  autoplayIntervalMs = 6000,
  direction = "up",
  startIndex = 0,
  enableKeyboard = true,
  onSlideChange,
  optixFlowConfig,
}: ImageSliderProps) => {
  const hasImages = images.length > 0;
  const [currentIndex, setCurrentIndex] = React.useState(() =>
    normalizeIndex(startIndex, images.length),
  );

  const handleNext = React.useCallback(() => {
    if (!hasImages) return;
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1 >= images.length ? 0 : prevIndex + 1;
      onSlideChange?.(nextIndex);
      return nextIndex;
    });
  }, [hasImages, images.length, onSlideChange]);

  const handlePrevious = React.useCallback(() => {
    if (!hasImages) return;
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1;
      onSlideChange?.(nextIndex);
      return nextIndex;
    });
  }, [hasImages, images.length, onSlideChange]);

  React.useEffect(() => {
    if (!hasImages) return;
    setCurrentIndex(normalizeIndex(startIndex, images.length));
  }, [startIndex, images.length, hasImages]);

  React.useEffect(() => {
    if (!enableKeyboard || !hasImages) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enableKeyboard, handleNext, handlePrevious, hasImages]);

  React.useEffect(() => {
    if (!autoplay || images.length < 2) return;
    const interval = window.setInterval(handleNext, autoplayIntervalMs);
    return () => window.clearInterval(interval);
  }, [autoplay, autoplayIntervalMs, handleNext, images.length]);

  const activeImage = hasImages ? images[currentIndex] : null;

  const overlayContent = overlaySlot ? (
    <div className={cn("absolute inset-0 z-10", overlayClassName)}>
      {overlaySlot}
    </div>
  ) : overlay ? (
    <div
      className={cn(
        "absolute inset-0 z-10 bg-linear-to-b from-black/35 via-black/50 to-black/70",
        overlayClassName,
      )}
    />
  ) : null;

  return (
    <div
      className={cn(
        "relative flex min-h-[420px] w-full items-center justify-center overflow-hidden rounded-3xl border border-border/40 bg-muted/30 shadow-2xl",
        className,
      )}
      style={{
        perspective: "1000px",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {activeImage ? (
          <motion.div
            key={`${currentIndex}-${activeImage.src ?? "image"}`}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="absolute inset-0"
          >
            <Img
              src={activeImage.src}
              alt={activeImage.alt}
              className={cn(
                "h-full w-full object-cover object-center",
                imageClassName,
                activeImage.className,
              )}
              optixFlowConfig={activeImage.optixFlowConfig ?? optixFlowConfig}
              eager
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {overlayContent}

      {children ? (
        <div
          className={cn(
            "relative z-20 flex w-full flex-col items-center justify-center px-6 py-12 text-center text-white md:px-12",
            contentClassName,
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};
