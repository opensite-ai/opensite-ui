"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface TestimonialParallaxItem extends TestimonialItem {
  /**
   * Giant background icon name displayed behind the testimonial content (e.g. "material-symbols/award-star-outline").
   * When not provided, no background icon is rendered.
   */
  backgroundIcon?: string;
  /**
   * Giant background text label displayed behind the testimonial content (e.g. "01", "A+").
   * Only used when `backgroundIcon` is not provided.
   */
  backgroundLabel?: React.ReactNode;
}

export interface TestimonialsParallaxNumberProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: TestimonialParallaxItem[];
  /**
   * Custom slot for rendering testimonials (overrides testimonials array)
   */
  testimonialsSlot?: React.ReactNode;
  /**
   * Auto-play interval in milliseconds (0 to disable)
   */
  autoPlayInterval?: number;
  /**
   * Vertical text label displayed on the side
   */
  verticalLabel?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the number indicator
   */
  numberClassName?: string;
  /**
   * Additional CSS classes for the quote text
   */
  quoteClassName?: string;
  /**
   * Additional CSS classes for the author section
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the navigation controls
   */
  navigationClassName?: string;
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
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * TestimonialsParallaxNumber - A premium testimonial section featuring an oversized
 * animated number with parallax mouse-tracking effect. The large index number responds
 * to mouse movement, creating depth. Includes a vertical progress indicator, company
 * badge, word-by-word quote animation, and smooth navigation controls. Auto-plays with
 * a bottom ticker showing company names. Perfect for high-end landing pages requiring
 * sophisticated interactions.
 *
 * @example
 * ```tsx
 * <TestimonialsParallaxNumber
 *   testimonials={[
 *     {
 *       quote: "Amazing product...",
 *       author: "Jane D.",
 *       role: "CEO",
 *       company: "TechCo"
 *     }
 *   ]}
 *   autoPlayInterval={6000}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsParallaxNumber({
  sectionId = "testimonials-parallax-number",
  testimonials,
  testimonialsSlot,
  autoPlayInterval,
  verticalLabel,
  className,
  contentClassName,
  numberClassName,
  quoteClassName,
  authorClassName,
  navigationClassName,
  background,
  pattern,
  patternOpacity,
  spacing = "xl",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
}: TestimonialsParallaxNumberProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalTestimonials = testimonials?.length ?? 0;
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    const interval = autoPlayInterval ?? 6000;
    if (interval <= 0 || totalTestimonials === 0) return;
    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalTestimonials);
    }, interval);
  }, [autoPlayInterval, totalTestimonials]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    },
    [mouseX, mouseY],
  );

  const goNext = useCallback(() => {
    if (totalTestimonials === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalTestimonials);
    resetAutoPlay();
  }, [totalTestimonials, resetAutoPlay]);

  const goPrev = useCallback(() => {
    if (totalTestimonials === 0) return;
    setActiveIndex(
      (prev) => (prev - 1 + totalTestimonials) % totalTestimonials,
    );
    resetAutoPlay();
  }, [totalTestimonials, resetAutoPlay]);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [resetAutoPlay]);

  const current = testimonials?.[activeIndex];

  const getAuthorName = useCallback(
    (testimonial: TestimonialParallaxItem): string => {
      if (typeof testimonial.author === "string") return testimonial.author;
      return "";
    },
    [],
  );

  const getQuoteText = useCallback(
    (testimonial: TestimonialParallaxItem): string => {
      if (typeof testimonial.quote === "string") return testimonial.quote;
      return "";
    },
    [],
  );

  const getCompanyName = useCallback(
    (testimonial: TestimonialParallaxItem): string => {
      if (typeof testimonial.company === "string") return testimonial.company;
      return "";
    },
    [],
  );

  const renderedTestimonial = useMemo(() => {
    if (testimonialsSlot) return testimonialsSlot;
    if (!current) return null;

    const authorName = getAuthorName(current);
    const quoteText = getQuoteText(current);
    const companyName = getCompanyName(current);

    return (
      <div
        ref={containerRef}
        className={cn("relative w-full max-w-5xl", contentClassName)}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className={cn(
            "opacity-15",
            "pointer-events-none absolute -left-8 top-1/2 -translate-y-1/2 select-none text-[20rem] font-bold leading-none tracking-tighter",
            numberClassName,
          )}
          style={{ x: numberX, y: numberY, opacity: 0.1 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {current.backgroundIcon ? (
                <DynamicIcon name={current.backgroundIcon} size={320} />
              ) : current.backgroundLabel != null ? (
                current.backgroundLabel
              ) : null}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <div className="relative flex">
          <div className="flex flex-col items-center justify-center border-r-0 md:border-r border-border/30 pr-4 md:pr-16">
            {/* No fallback label: renders ONLY when the consumer supplies
                verticalLabel — wording is industry-specific and must never
                be hardcoded. */}
            {verticalLabel && (
              <motion.span
                className="text-sm tracking-widest uppercase"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {verticalLabel}
              </motion.span>
            )}

            <div className="relative mt-8 h-32 w-4 bg-muted ring-2 ring-primary rounded">
              <motion.div
                className="absolute left-0 top-0 w-full origin-top bg-primary rounded"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <div className="flex-1 py-6 md:py-12 pl-4 md:pl-16">
            {companyName ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
                    {companyName}
                  </span>
                </motion.div>
              </AnimatePresence>
            ) : null}

            <div className="relative mb-12 min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className={cn(
                    "text-2xl md:text-3xl lg:text-4xl",
                    "font-light leading-[1.15] tracking-tight",
                    quoteClassName,
                  )}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {quoteText.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="mr-[0.3em] inline-block"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="flex items-start md:items-end justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className={cn("flex items-center gap-4", authorClassName)}
                >
                  <div>
                    {current.author &&
                      (typeof current.author === "string" ? (
                        <p className="text-base font-medium">
                          {current.author}
                        </p>
                      ) : (
                        current.author
                      ))}
                    {current.role &&
                      (typeof current.role === "string" ? (
                        <p className="text-sm">{current.role}</p>
                      ) : (
                        current.role
                      ))}
                    {current.linkConfig?.href && (
                      <Pressable
                        href={current.linkConfig.href}
                        className={cn(
                          "transition-all duration-500",
                          "hover:underline hover:underline-offset-4",
                          "text-sm",
                          current.linkConfig.className,
                        )}
                      >
                        {current.linkConfig.label}
                      </Pressable>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div
                className={cn(
                  "flex items-center gap-4 flex-col-reverse md:flex-row",
                  navigationClassName,
                )}
              >
                <motion.button
                  onClick={goPrev}
                  className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 transition-colors"
                  >
                    <path
                      d="M10 12L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={goNext}
                  className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 transition-colors"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    testimonialsSlot,
    contentClassName,
    numberX,
    numberY,
    numberClassName,
    activeIndex,
    testimonials,
    verticalLabel,
    quoteClassName,
    authorClassName,
    current,
    navigationClassName,
    handleMouseMove,
    goPrev,
    goNext,
    totalTestimonials,
    getAuthorName,
    getQuoteText,
    getCompanyName,
  ]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("overflow-hidden", className)}
      containerClassName={containerClassName}
    >
      <div className="flex min-h-[500px] items-center justify-center">
        {renderedTestimonial}
      </div>
    </Section>
  );
}
