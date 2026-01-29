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
import { BRIGHTNESS_CLASS_MAP, cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ContainerMaxWidth,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface AnimatedSection {
  /**
   * Unique identifier for the section
   */
  id: string;
  /**
   * Section title
   */
  title?: React.ReactNode;
  /**
   * Section subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  image: string;
  /**
   * CTA button text
   */
  ctaText?: React.ReactNode;
  /**
   * CTA button href
   */
  ctaHref?: string;
  /**
   * CTA button onClick handler
   */
  ctaOnClick?: () => void;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface CarouselAnimatedSectionsProps {
  /**
   * Array of sections
   */
  sections?: AnimatedSection[];
  /**
   * Custom slot for rendering sections (overrides sections array)
   */
  sectionsSlot?: React.ReactNode;
  /**
   * Custom slot for rendering actions
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of action configurations
   */
  actions?: ActionConfig[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the navigation dots
   */
  navigationClassName?: string;
  /**
   * Additional CSS classes for the arrow navigation
   */
  arrowsClassName?: string;
  /**
   * Additional CSS classes for the counter
   */
  counterClassName?: string;
  /**
   * Granular control of brightness for slide media
   * Values 10-40 use arbitrary Tailwind values for finer control on bright images
   */
  slideMediaBrightness?: "10" | "20" | "25" | "30" | "40" | "50" | "75" | "100";
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
   * Optional max width for the content container
   */
  containerMaxWidth?: ContainerMaxWidth;
}

export function CarouselAnimatedSections({
  sections,
  sectionsSlot,
  actionsSlot,
  actions,
  className,
  containerClassName = "h-full flex flex-col justify-center",
  contentClassName,
  subtitleClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  navigationClassName,
  arrowsClassName,
  counterClassName,
  slideMediaBrightness = "50",
  optixFlowConfig,
  background = "dark",
  spacing = "py-0",
  containerMaxWidth = "full",
  pattern = "diagonalCrossBasic",
  patternOpacity = 0.033,
}: CarouselAnimatedSectionsProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const goToNext = React.useCallback(() => {
    if (isAnimating || currentIndex >= (sections?.length ?? 0) - 1) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, isAnimating, sections?.length]);

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

  const currentSection = sections?.[currentIndex];

  const actionElements = React.useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (actions && actions.length > 0) {
      return actions.map((action, index) => (
        <Pressable
          key={index}
          href={action.href}
          onClick={action.onClick}
          asButton
          variant={action.variant}
          size={action.size}
          className={cn(action.className)}
        >
          {action.label}
          {action.icon && <span className="ml-2">{action.icon}</span>}
          {action.iconAfter && <span className="ml-2">{action.iconAfter}</span>}
        </Pressable>
      ));
    }
    return null;
  }, [actionsSlot, actions]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn("relative h-screen w-full overflow-hidden", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerMaxWidth={containerMaxWidth}
      containerClassName={containerClassName}
    >
      {/* Background slides */}
      {sectionsSlot ? (
        sectionsSlot
      ) : currentSection ? (
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
            className={cn("absolute inset-0", currentSection?.className)}
          >
            <Img
              src={currentSection?.image}
              alt={
                typeof currentSection?.title === "string"
                  ? currentSection?.title
                  : `Section ${currentSection?.id}`
              }
              className={cn(
                "h-full w-full object-cover",
                BRIGHTNESS_CLASS_MAP[slideMediaBrightness],
                currentSection?.imageClassName,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          </motion.div>
        </AnimatePresence>
      ) : null}

      {/* Content */}
      <div
        className={cn(
          "relative z-10 flex h-full items-center",
          contentClassName,
        )}
      >
        <div className={cn("container mx-auto px-6", containerClassName)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="max-w-2xl text-shadow"
            >
              {currentSection?.subtitle &&
                (typeof currentSection?.subtitle === "string" ? (
                  <p
                    className={cn(
                      "mb-2 text-sm font-medium uppercase tracking-widest opacity-70",
                      subtitleClassName,
                    )}
                  >
                    {currentSection?.subtitle}
                  </p>
                ) : (
                  <div className={cn("mb-2", subtitleClassName)}>
                    {currentSection?.subtitle}
                  </div>
                ))}
              {currentSection?.title &&
                (typeof currentSection?.title === "string" ? (
                  <h2
                    className={cn(
                      "mb-4 text-4xl font-bold md:text-5xl lg:text-6xl",
                      titleClassName,
                    )}
                  >
                    {currentSection?.title}
                  </h2>
                ) : (
                  <div className={cn("mb-4", titleClassName)}>
                    {currentSection?.title}
                  </div>
                ))}
              {currentSection?.description &&
                (typeof currentSection?.description === "string" ? (
                  <p
                    className={cn(
                      "mb-8 text-lg opacity-80 text-balance",
                      descriptionClassName,
                    )}
                  >
                    {currentSection?.description}
                  </p>
                ) : (
                  <div className={cn("mb-8", descriptionClassName)}>
                    {currentSection?.description}
                  </div>
                ))}
              <div className={actionsClassName}>
                {actionElements ||
                  (currentSection?.ctaText && (
                    <Pressable
                      href={currentSection?.ctaHref}
                      onClick={currentSection?.ctaOnClick}
                      asButton
                      size="lg"
                      className="bg-background text-foreground hover:bg-background/90"
                    >
                      {currentSection?.ctaText}
                      <DynamicIcon
                        name="lucide/arrow-right"
                        size={16}
                        className="ml-2"
                      />
                    </Pressable>
                  ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation dots */}
      <div
        className={cn(
          "absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3",
          navigationClassName,
        )}
      >
        {sections?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-3 w-3 rounded-full border-2 transition-all",
              currentIndex === index
                ? "scale-125 border-background bg-background"
                : "border-background/50 bg-transparent hover:border-background",
            )}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow navigation */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-4",
          arrowsClassName,
        )}
      >
        <Pressable
          onClick={goToPrev}
          asButton
          variant="ghost"
          size="icon"
          disabled={currentIndex === 0}
          className="rounded-full border border-background/30 hover:bg-background/10 disabled:opacity-30"
        >
          <DynamicIcon name="lucide/chevron-up" size={20} />
        </Pressable>
        <Pressable
          onClick={goToNext}
          asButton
          variant="ghost"
          size="icon"
          disabled={currentIndex === (sections?.length ?? 0) - 1}
          className="rounded-full border border-background/30 hover:bg-background/10 disabled:opacity-30"
        >
          <DynamicIcon name="lucide/chevron-down" size={20} />
        </Pressable>
      </div>

      {/* Slide counter */}
      <div
        className={cn(
          "absolute bottom-8 right-8 z-20 text-sm opacity-50",
          counterClassName,
        )}
      >
        {String(currentIndex + 1).padStart(2, "0")} /{" "}
        {String(sections?.length ?? 0).padStart(2, "0")}
      </div>
    </Section>
  );
}
