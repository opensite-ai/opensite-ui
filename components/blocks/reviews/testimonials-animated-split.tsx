"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface AnimatedSplitTestimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
  };
  image: string;
}

export interface TestimonialsAnimatedSplitProps {
  testimonials?: AnimatedSplitTestimonial[];
  autoPlayInterval?: number;
  className?: string;
  optixFlowConfig?: OptixFlowConfig;
}

const DEFAULT_TESTIMONIALS: AnimatedSplitTestimonial[] = [
  {
    id: "1",
    quote:
      "This platform has completely transformed how we approach our daily operations. The intuitive design and powerful features have made our team significantly more productive.",
    author: {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
    image: imagePlaceholders[30],
  },
  {
    id: "2",
    quote:
      "The best investment we've made this year. Our team adopted it instantly and the results speak for themselves. Customer satisfaction is at an all-time high.",
    author: {
      name: "Michael Torres",
      role: "CEO",
      company: "StartupXYZ",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
    image: imagePlaceholders[31],
  },
  {
    id: "3",
    quote:
      "Outstanding support and an exceptional product. The team goes above and beyond to ensure our success. I couldn't recommend them more highly.",
    author: {
      name: "Emily Watson",
      role: "Operations Director",
      company: "GrowthCo",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
    image: imagePlaceholders[32],
  },
];

/**
 * TestimonialsAnimatedSplit - An animated split-screen testimonial section with smooth
 * transitions powered by Framer Motion. Features a large image on one side and animated
 * quote content on the other. Includes auto-play functionality, navigation dots, and
 * previous/next buttons. The animations create an engaging, premium feel. Perfect for
 * hero sections or featured testimonial showcases.
 *
 * @example
 * ```tsx
 * <TestimonialsAnimatedSplit
 *   testimonials={[
 *     {
 *       id: "1",
 *       quote: "This service transformed our business...",
 *       author: { name: "Jane D.", role: "CEO", company: "TechCo", avatar: "/avatars/jane.jpg" },
 *       image: "/images/testimonial-1.jpg"
 *     }
 *   ]}
 *   autoPlayInterval={6000}
 * />
 * ```
 */
export function TestimonialsAnimatedSplit({
  testimonials = DEFAULT_TESTIMONIALS,
  autoPlayInterval = 6000,
  className,
  optixFlowConfig,
}: TestimonialsAnimatedSplitProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, goToNext]);

  const current = testimonials[currentIndex];

  return (
    <section className={cn("py-16 md:py-24 overflow-hidden", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Img
                  src={current.image}
                  alt="Testimonial"
                  className="size-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <DynamicIcon
                  name="lucide/quote"
                  size={48}
                  className="text-primary/20"
                />

                <blockquote className="text-xl font-medium leading-relaxed md:text-2xl">
                  {current.quote}
                </blockquote>

                <div className="flex items-center gap-4">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={current.author.avatar}
                      alt={current.author.name}
                    />
                    <AvatarFallback>
                      {current.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{current.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {current.author.role}
                      {current.author.company &&
                        ` at ${current.author.company}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4">
              <button
                onClick={goToPrev}
                className="flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-muted"
                aria-label="Previous testimonial"
              >
                <DynamicIcon name="lucide/chevron-left" size={20} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "size-2 rounded-full transition-all",
                      index === currentIndex
                        ? "w-6 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-muted"
                aria-label="Next testimonial"
              >
                <DynamicIcon name="lucide/chevron-right" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
