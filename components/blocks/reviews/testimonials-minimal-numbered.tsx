"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface NumberedTestimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
  };
}

export interface TestimonialsMinimalNumberedProps {
  testimonials?: NumberedTestimonial[];
  autoPlayInterval?: number;
  className?: string;
}

const DEFAULT_TESTIMONIALS: NumberedTestimonial[] = [
  {
    id: "1",
    quote:
      "This platform has completely transformed how we approach our daily operations. The intuitive design and powerful features have made our team significantly more productive.",
    author: {
      name: "Sarah Chen",
      role: "Design Director",
      company: "Linear",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
  },
  {
    id: "2",
    quote:
      "The most elegant solution we've ever implemented. Every detail has been thoughtfully considered, and the results speak for themselves.",
    author: {
      name: "Marcus Webb",
      role: "Creative Lead",
      company: "Vercel",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "3",
    quote:
      "Pure craftsmanship in every single detail. The attention to quality is evident throughout the entire experience.",
    author: {
      name: "Elena Frost",
      role: "Head of Product",
      company: "Stripe",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
];

/**
 * TestimonialsMinimalNumbered - A minimal testimonial slider featuring large numbered
 * indicators (01, 02, 03) that transition with the content. Displays one testimonial
 * at a time with smooth fade transitions, author information with avatar, and navigation
 * controls. The oversized numbers create a distinctive visual element. Includes auto-play
 * and manual navigation via line indicators and arrow buttons.
 *
 * @example
 * ```tsx
 * <TestimonialsMinimalNumbered
 *   testimonials={[
 *     {
 *       id: "1",
 *       quote: "Amazing product that changed our workflow...",
 *       author: { name: "Jane D.", role: "CEO", company: "TechCo", avatar: "/avatars/jane.jpg" }
 *     }
 *   ]}
 *   autoPlayInterval={5000}
 * />
 * ```
 */
export function TestimonialsMinimalNumbered({
  testimonials = DEFAULT_TESTIMONIALS,
  autoPlayInterval = 5000,
  className,
}: TestimonialsMinimalNumberedProps): React.JSX.Element {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleChange = useCallback(
    (index: number) => {
      if (index === active || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActive(index);
        setIsTransitioning(false);
      }, 300);
    },
    [active, isTransitioning]
  );

  const handlePrev = useCallback(() => {
    const newIndex = (active - 1 + testimonials.length) % testimonials.length;
    handleChange(newIndex);
  }, [active, testimonials.length, handleChange]);

  const handleNext = useCallback(() => {
    const newIndex = (active + 1) % testimonials.length;
    handleChange(newIndex);
  }, [active, testimonials.length, handleChange]);

  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    const interval = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, handleNext]);

  const current = testimonials[active];

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container max-w-4xl">
        <div className="flex items-start gap-8">
          <span
            className="text-8xl font-light leading-none text-foreground/10 select-none transition-all duration-500 md:text-9xl"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {String(active + 1).padStart(2, "0")}
          </span>

          <div className="flex-1 pt-6">
            <blockquote
              className={cn(
                "text-xl font-light leading-relaxed tracking-tight transition-all duration-300 md:text-2xl lg:text-3xl",
                isTransitioning
                  ? "opacity-0 translate-x-4"
                  : "opacity-100 translate-x-0"
              )}
            >
              {current.quote}
            </blockquote>

            <div
              className={cn(
                "mt-10 transition-all duration-300 delay-100",
                isTransitioning ? "opacity-0" : "opacity-100"
              )}
            >
              <div className="flex items-center gap-4">
                <Avatar className="size-12 ring-2 ring-foreground/10">
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
                  <p className="font-medium">{current.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {current.author.role}
                    {current.author.company && (
                      <>
                        <span className="mx-2 text-foreground/20">/</span>
                        <span>{current.author.company}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleChange(index)}
                  className="group relative py-4"
                >
                  <span
                    className={cn(
                      "block h-px transition-all duration-500 ease-out",
                      index === active
                        ? "w-12 bg-foreground"
                        : "w-6 bg-foreground/20 group-hover:w-8 group-hover:bg-foreground/40"
                    )}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="rounded-full p-2 text-foreground/40 transition-all duration-300 hover:bg-foreground/5 hover:text-foreground"
            >
              <DynamicIcon name="lucide/chevron-left" size={20} />
            </button>
            <button
              onClick={handleNext}
              className="rounded-full p-2 text-foreground/40 transition-all duration-300 hover:bg-foreground/5 hover:text-foreground"
            >
              <DynamicIcon name="lucide/chevron-right" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
