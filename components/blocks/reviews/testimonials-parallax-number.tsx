"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../../lib/utils";

export interface ParallaxTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface TestimonialsParallaxNumberProps {
  testimonials?: ParallaxTestimonial[];
  autoPlayInterval?: number;
  className?: string;
}

const DEFAULT_TESTIMONIALS: ParallaxTestimonial[] = [
  {
    id: "1",
    quote: "Transformed our entire creative process overnight.",
    author: "Sarah Chen",
    role: "Design Director",
    company: "Linear",
  },
  {
    id: "2",
    quote: "The most elegant solution we've ever implemented.",
    author: "Marcus Webb",
    role: "Creative Lead",
    company: "Vercel",
  },
  {
    id: "3",
    quote: "Pure craftsmanship in every single detail.",
    author: "Elena Frost",
    role: "Head of Product",
    company: "Stripe",
  },
];

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
 *       id: "1",
 *       quote: "Amazing product...",
 *       author: "Jane D.",
 *       role: "CEO",
 *       company: "TechCo"
 *     }
 *   ]}
 *   autoPlayInterval={6000}
 * />
 * ```
 */
export function TestimonialsParallaxNumber({
  testimonials = DEFAULT_TESTIMONIALS,
  autoPlayInterval = 6000,
  className,
}: TestimonialsParallaxNumberProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goPrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    const timer = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, goNext]);

  const current = testimonials[activeIndex];

  return (
    <section className={cn("py-16 md:py-24 overflow-hidden", className)}>
      <div className="container flex min-h-[500px] items-center justify-center">
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            className="pointer-events-none absolute -left-8 top-1/2 -translate-y-1/2 select-none text-[20rem] font-bold leading-none tracking-tighter text-foreground/[0.03]"
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
                Testimonials
              </motion.span>

              <div className="relative mt-8 h-32 w-px bg-border">
                <motion.div
                  className="absolute left-0 top-0 w-full origin-top bg-foreground"
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
                    {current.company}
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="relative mb-12 min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeIndex}
                    className="text-3xl font-light leading-[1.15] tracking-tight md:text-4xl lg:text-5xl"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {current.quote.split(" ").map((word, i) => (
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
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      className="h-px w-8 bg-foreground"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      style={{ originX: 0 }}
                    />
                    <div>
                      <p className="text-base font-medium">{current.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {current.role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-4">
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
                      className="relative z-10 text-foreground transition-colors group-hover:text-foreground/70"
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
                      className="relative z-10 text-foreground transition-colors group-hover:text-foreground/70"
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
                  {testimonials.map((t) => t.company).join(" • ")} •
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
