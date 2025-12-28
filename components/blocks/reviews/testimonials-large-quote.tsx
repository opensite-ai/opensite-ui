"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface LargeQuoteTestimonial {
  quote: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
  };
}

export interface TestimonialsLargeQuoteProps {
  testimonial?: LargeQuoteTestimonial;
  className?: string;
}

const DEFAULT_TESTIMONIAL: LargeQuoteTestimonial = {
  quote:
    "This platform has fundamentally changed how we approach our work. The intuitive design, powerful features, and exceptional support have made it an indispensable part of our daily operations. I cannot recommend it highly enough to anyone looking to transform their workflow.",
  author: {
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    company: "TechVentures Inc.",
    avatar: blockBrandedIconsAndPlaceholders.avatar1,
  },
};

/**
 * TestimonialsLargeQuote - A centered, single testimonial section featuring an oversized
 * quote with decorative quote icons. The large typography creates visual impact while
 * the centered layout draws focus to the testimonial content. Includes author avatar,
 * name, role, and company. Perfect for hero sections, about pages, or anywhere a single
 * powerful testimonial needs to make a statement.
 *
 * @example
 * ```tsx
 * <TestimonialsLargeQuote
 *   testimonial={{
 *     quote: "This service transformed our business...",
 *     author: { name: "Jane D.", role: "CEO", company: "TechCo", avatar: "/avatars/jane.jpg" }
 *   }}
 * />
 * ```
 */
export function TestimonialsLargeQuote({
  testimonial = DEFAULT_TESTIMONIAL,
  className,
}: TestimonialsLargeQuoteProps): React.JSX.Element {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <DynamicIcon
            name="lucide/quote"
            size={64}
            className="mx-auto mb-8 text-primary/20"
          />

          <blockquote className="text-2xl font-medium leading-relaxed md:text-3xl lg:text-4xl">
            {testimonial.quote}
          </blockquote>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage
                src={testimonial.author.avatar}
                alt={testimonial.author.name}
              />
              <AvatarFallback className="text-lg">
                {testimonial.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{testimonial.author.name}</p>
              <p className="text-muted-foreground">
                {testimonial.author.role}
                {testimonial.author.company &&
                  ` at ${testimonial.author.company}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
