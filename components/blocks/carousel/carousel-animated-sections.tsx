"use client";

/**
 * CarouselAnimatedSections
 *
 * A fullscreen section carousel with smooth animated transitions between
 * slides. Features keyboard and scroll-wheel navigation with visual
 * slide indicators and overlay content.
 *
 * Use cases:
 * - Fullscreen presentation-style pages
 * - Portfolio showcases with dramatic transitions
 * - Product feature tours with immersive visuals
 * - Landing pages with section-based navigation
 */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface AnimatedSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface CarouselAnimatedSectionsProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  sections?: AnimatedSection[];
}

export function CarouselAnimatedSections({
  className,
  optixFlowConfig,
  sections,
}: CarouselAnimatedSectionsProps): React.JSX.Element {
  const defaultSections: AnimatedSection[] = React.useMemo(
    () =>
      Array.from({ length: 4 }).map((_, index) => ({
        id: `section-${index}`,
        title: `Experience ${index + 1}`,
        subtitle: `Chapter ${index + 1}`,
        description: `Discover the unique features and capabilities that make this section special. Each experience is crafted to deliver maximum impact.`,
        image: imagePlaceholders[index % imagePlaceholders.length],
        ctaText: "Explore",
        ctaHref: "#",
      })),
    []
  );

  const sectionItems = sections || defaultSections;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const goToNext = React.useCallback(() => {
    if (isAnimating || currentIndex >= sectionItems.length - 1) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, isAnimating, sectionItems.length]);

  const goToPrev = React.useCallback(() => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => prev - 1);
  }, [currentIndex, isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Wheel navigation with debounce
  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (e.deltaY > 0) {
          goToNext();
        } else if (e.deltaY < 0) {
          goToPrev();
        }
      }, 50);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeout);
    };
  }, [goToNext, goToPrev]);

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const currentSection = sectionItems[currentIndex];

  return (
    <section
      className={cn("relative h-screen w-full overflow-hidden", className)}
    >
      {/* Background slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          onAnimationComplete={() => setIsAnimating(false)}
          className="absolute inset-0"
        >
          <Img
            src={currentSection.image}
            alt={currentSection.title}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="max-w-2xl text-white"
            >
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/70">
                {currentSection.subtitle}
              </p>
              <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                {currentSection.title}
              </h2>
              <p className="mb-8 text-lg text-white/80">
                {currentSection.description}
              </p>
              {currentSection.ctaText && (
                <Pressable
                  href={currentSection.ctaHref}
                  asButton
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
                >
                  {currentSection.ctaText}
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="ml-2"
                  />
                </Pressable>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
        {sectionItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-3 w-3 rounded-full border-2 transition-all",
              currentIndex === index
                ? "scale-125 border-white bg-white"
                : "border-white/50 bg-transparent hover:border-white"
            )}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow navigation */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-4">
        <Pressable
          onClick={goToPrev}
          asButton
          variant="ghost"
          size="icon"
          disabled={currentIndex === 0}
          className="rounded-full border border-white/30 text-white hover:bg-white/10 disabled:opacity-30"
        >
          <DynamicIcon name="lucide/chevron-up" size={20} />
        </Pressable>
        <Pressable
          onClick={goToNext}
          asButton
          variant="ghost"
          size="icon"
          disabled={currentIndex === sectionItems.length - 1}
          className="rounded-full border border-white/30 text-white hover:bg-white/10 disabled:opacity-30"
        >
          <DynamicIcon name="lucide/chevron-down" size={20} />
        </Pressable>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 z-20 text-sm text-white/50">
        {String(currentIndex + 1).padStart(2, "0")} /{" "}
        {String(sectionItems.length).padStart(2, "0")}
      </div>
    </section>
  );
}

