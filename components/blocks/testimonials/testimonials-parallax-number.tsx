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
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";

export interface TestimonialsParallaxNumberProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: TestimonialItem[];
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
  spacing,
  pattern,
  patternOpacity,
}: TestimonialsParallaxNumberProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalTestimonials = testimonials?.length ?? 0;
  const effectiveAutoPlayInterval = autoPlayInterval ?? 6000;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  }, [mouseX, mouseY]);

  const goNext = useCallback(() => {
    if (totalTestimonials === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalTestimonials);
  }, [totalTestimonials]);

  const goPrev = useCallback(() => {
    if (totalTestimonials === 0) return;
    setActiveIndex(
      (prev) => (prev - 1 + totalTestimonials) % totalTestimonials,
    );
  }, [totalTestimonials]);

  useEffect(() => {
    if (effectiveAutoPlayInterval <= 0 || totalTestimonials === 0) return;

    const timer = setInterval(goNext, effectiveAutoPlayInterval);
    return () => clearInterval(timer);
  }, [effectiveAutoPlayInterval, goNext, totalTestimonials]);

  const current = testimonials?.[activeIndex];

  const getAuthorName = useCallback((testimonial: TestimonialItem): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  }, []);

  const getQuoteText = useCallback((testimonial: TestimonialItem): string => {
    if (typeof testimonial.quote === "string") return testimonial.quote;
    return "";
  }, []);

  const getCompanyName = useCallback((testimonial: TestimonialItem): string => {
    if (typeof testimonial.company === "string") return testimonial.company;
    return "";
  }, []);

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
            "pointer-events-none absolute -left-8 top-1/2 -translate-y-1/2 select-none text-[20rem] font-bold leading-none tracking-tighter text-muted-foreground/[0.05]",
            numberClassName,
          )}
          style={{ x: numberX, y: numberY }}
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
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <div className="relative flex">
          <div className="flex flex-col items-center justify-center border-r border-border pr-16">
            <motion.span
              className="text-xs font-mono tracking-widest text-muted-foreground uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {verticalLabel && (
                typeof verticalLabel === "string" ? verticalLabel : verticalLabel
              )}
              {!verticalLabel && "Testimonials"}
            </motion.span>

            <div className="relative mt-8 h-32 w-px bg-border">
              <motion.div
                className="absolute left-0 top-0 w-full origin-top bg-primary"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <div className="flex-1 py-12 pl-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {companyName}
                </span>
              </motion.div>
            </AnimatePresence>

            <div className="relative mb-12 min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className={cn(
                    "text-3xl font-light leading-[1.15] tracking-tight md:text-4xl lg:text-5xl",
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

            <div className="flex items-end justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className={cn("flex items-center gap-4", authorClassName)}
                >
                  <motion.div
                    className="h-px w-8 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
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
                        <p className="text-sm text-muted-foreground">
                          {current.role}
                        </p>
                      ) : (
                        current.role
                      ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div
                className={cn("flex items-center gap-4", navigationClassName)}
              >
                <motion.button
                  onClick={goPrev}
                  className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-border"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-muted-foreground transition-colors group-hover:text-foreground"
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
                  className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-border"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-muted-foreground transition-colors group-hover:text-foreground"
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

        <div className="pointer-events-none absolute -bottom-20 left-0 right-0 overflow-hidden opacity-[0.08]">
          <motion.div
            className="flex whitespace-nowrap text-6xl font-bold tracking-tight"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">
                {testimonials.map((t) => getCompanyName(t)).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }, [testimonialsSlot, contentClassName, numberX, numberY, numberClassName, activeIndex, testimonials, verticalLabel, quoteClassName, authorClassName, current, navigationClassName, handleMouseMove, goPrev, goNext, totalTestimonials, getAuthorName, getQuoteText, getCompanyName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("overflow-hidden", className)}
    >
      <div className="flex min-h-[500px] items-center justify-center">
        {renderedTestimonial}
      </div>
    </Section>
  );
}
