"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface SliderTestimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
}

export interface TestimonialsSliderMinimalProps {
  testimonials?: SliderTestimonial[];
  autoPlayInterval?: number;
  className?: string;
}

const DEFAULT_TESTIMONIALS: SliderTestimonial[] = [
  {
    id: "1",
    quote:
      "This platform has completely transformed how our team collaborates. The intuitive interface and powerful features have made us significantly more productive.",
    author: {
      name: "Sarah Chen",
      role: "Product Manager at TechCorp",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
  },
  {
    id: "2",
    quote:
      "I've tried dozens of similar tools, but nothing comes close to the elegance and functionality of this solution. It's become indispensable to our workflow.",
    author: {
      name: "Michael Torres",
      role: "CEO at StartupXYZ",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "3",
    quote:
      "The customer support is exceptional. Any time we've had questions, the team has been incredibly responsive and helpful. Truly a pleasure to work with.",
    author: {
      name: "Emily Watson",
      role: "Operations Lead at GrowthCo",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
];

/**
 * TestimonialsSliderMinimal - A clean, auto-rotating testimonial slider with minimal
 * design. Features smooth fade transitions between testimonials, centered layout with
 * large quotes, and author information with avatars. Includes dot indicators for manual
 * navigation. The auto-play interval is configurable. Perfect for hero sections or
 * anywhere a focused, single-testimonial display is needed.
 *
 * @example
 * ```tsx
 * <TestimonialsSliderMinimal
 *   testimonials={[
 *     {
 *       id: "1",
 *       quote: "Amazing product that changed our workflow...",
 *       author: { name: "Jane D.", role: "CEO at TechCo", avatar: "/avatars/jane.jpg" }
 *     }
 *   ]}
 *   autoPlayInterval={5000}
 * />
 * ```
 */
export function TestimonialsSliderMinimal({
  testimonials = DEFAULT_TESTIMONIALS,
  autoPlayInterval = 5000,
  className,
}: TestimonialsSliderMinimalProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 300);
    },
    [currentIndex]
  );

  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      goToSlide(nextIndex);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlayInterval, testimonials.length, goToSlide]);

  const current = testimonials[currentIndex];

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={cn(
              "transition-opacity duration-300",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}
          >
            <blockquote className="text-xl font-medium leading-relaxed md:text-2xl lg:text-3xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Avatar className="size-14">
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
                {current.author.role && (
                  <p className="text-sm text-muted-foreground">
                    {current.author.role}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
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
        </div>
      </div>
    </section>
  );
}
