"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CarouselTestimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    role?: string;
    company?: string;
  };
  backgroundImage: string;
}

export interface TestimonialsCarouselImageProps {
  testimonials?: CarouselTestimonial[];
  className?: string;
  optixFlowConfig?: OptixFlowConfig;
}

const DEFAULT_TESTIMONIALS: CarouselTestimonial[] = [
  {
    id: "1",
    quote:
      "Working with this team has been an absolute game-changer for our business. Their expertise and dedication exceeded all our expectations.",
    author: {
      name: "Sarah Chen",
      role: "CEO",
      company: "TechVentures",
    },
    backgroundImage: imagePlaceholders[10],
  },
  {
    id: "2",
    quote:
      "The level of professionalism and attention to detail is unmatched. They delivered exactly what we needed, on time and on budget.",
    author: {
      name: "Michael Torres",
      role: "Founder",
      company: "StartupLab",
    },
    backgroundImage: imagePlaceholders[11],
  },
  {
    id: "3",
    quote:
      "I've worked with many agencies, but none have matched the quality and creativity that this team brings to every project.",
    author: {
      name: "Emily Watson",
      role: "Marketing Director",
      company: "GrowthCo",
    },
    backgroundImage: imagePlaceholders[12],
  },
];

/**
 * TestimonialsCarouselImage - A full-width image carousel testimonial section with
 * large background images, overlay gradients, and navigation controls. Each slide
 * displays a prominent quote with author information over a visually striking image.
 * Features previous/next navigation buttons and dot indicators. Perfect for hero
 * sections or impactful testimonial showcases requiring visual storytelling.
 *
 * @example
 * ```tsx
 * <TestimonialsCarouselImage
 *   testimonials={[
 *     {
 *       id: "1",
 *       quote: "This service transformed our business...",
 *       author: { name: "Jane D.", role: "CEO", company: "TechCo" },
 *       backgroundImage: "/images/testimonial-bg-1.jpg"
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialsCarouselImage({
  testimonials = DEFAULT_TESTIMONIALS,
  className,
  optixFlowConfig,
}: TestimonialsCarouselImageProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  }, [testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <section className={cn("relative h-[600px] md:h-[700px]", className)}>
      <div className="absolute inset-0">
        <Img
          src={current.backgroundImage}
          alt=""
          className="size-full object-cover"
          optixFlowConfig={optixFlowConfig}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-4xl text-center text-white">
          <DynamicIcon
            name="lucide/quote"
            size={48}
            className="mx-auto mb-6 opacity-50"
          />
          <blockquote className="text-2xl font-light leading-relaxed md:text-4xl">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <div className="mt-8">
            <p className="text-lg font-semibold">{current.author.name}</p>
            <p className="text-sm opacity-80">
              {current.author.role}
              {current.author.company && `, ${current.author.company}`}
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4">
          <Pressable
            asButton
            variant="ghost"
            size="icon"
            className="size-10 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <DynamicIcon name="lucide/chevron-left" size={24} />
          </Pressable>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "size-2 rounded-full transition-all",
                  index === currentIndex
                    ? "w-6 bg-white"
                    : "bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Pressable
            asButton
            variant="ghost"
            size="icon"
            className="size-10 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <DynamicIcon name="lucide/chevron-right" size={24} />
          </Pressable>
        </div>
      </div>
    </section>
  );
}
