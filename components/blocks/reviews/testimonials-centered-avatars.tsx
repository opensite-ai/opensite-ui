"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface CenteredTestimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
  };
}

export interface TestimonialsCenteredAvatarsProps {
  testimonials?: CenteredTestimonial[];
  badge?: string;
  title?: string;
  className?: string;
}

const DEFAULT_TESTIMONIALS: CenteredTestimonial[] = [
  {
    id: "1",
    quote:
      "The platform has revolutionized how we handle our daily operations. It's intuitive, powerful, and the support team is always there when we need them.",
    author: {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
  },
  {
    id: "2",
    quote:
      "We've seen a 40% increase in productivity since implementing this solution. It's become an essential part of our workflow.",
    author: {
      name: "Michael Torres",
      role: "Operations Director",
      company: "GrowthCo",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "3",
    quote:
      "The best investment we've made this year. The ROI was visible within the first month of implementation.",
    author: {
      name: "Emily Watson",
      role: "CEO",
      company: "StartupXYZ",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
];

/**
 * TestimonialsCenteredAvatars - A centered testimonial section featuring a badge,
 * title, and a row of large overlapping avatars. Displays multiple testimonials
 * in a clean, centered layout with prominent author photos creating visual interest
 * through the overlapping avatar stack. Ideal for trust-building sections on landing
 * pages where social proof from recognizable faces is important.
 *
 * @example
 * ```tsx
 * <TestimonialsCenteredAvatars
 *   badge="Testimonials"
 *   title="Trusted by Industry Leaders"
 *   testimonials={[
 *     {
 *       id: "1",
 *       quote: "This platform changed everything...",
 *       author: { name: "Jane D.", role: "CEO", company: "TechCo", avatar: "/avatars/jane.jpg" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialsCenteredAvatars({
  testimonials = DEFAULT_TESTIMONIALS,
  badge = "Testimonials",
  title = "Trusted by Industry Leaders",
  className,
}: TestimonialsCenteredAvatarsProps): React.JSX.Element {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <Badge variant="secondary" className="mb-4">
              {badge}
            </Badge>
          )}
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>

          <div className="mt-8 flex justify-center">
            <div className="flex -space-x-4">
              {testimonials.map((testimonial) => (
                <Avatar
                  key={testimonial.id}
                  className="size-16 border-4 border-background ring-2 ring-border md:size-20"
                >
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
              ))}
            </div>
          </div>

          <div className="mt-12 space-y-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="space-y-4">
                <blockquote className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold">{testimonial.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.author.role}
                    {testimonial.author.company &&
                      ` at ${testimonial.author.company}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
