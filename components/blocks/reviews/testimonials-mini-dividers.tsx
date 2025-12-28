"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface MiniTestimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  rating?: number;
}

export interface TestimonialsMiniDividersProps {
  testimonials?: MiniTestimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_TESTIMONIALS: MiniTestimonial[] = [
  {
    id: "1",
    content:
      "Exceptional quality and outstanding customer service. Highly recommend!",
    author: {
      name: "Sarah Chen",
      role: "Product Manager",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
    rating: 5,
  },
  {
    id: "2",
    content:
      "This solution has transformed how our team works. Incredible value.",
    author: {
      name: "Michael Torres",
      role: "CEO",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
    rating: 5,
  },
  {
    id: "3",
    content:
      "Simple, elegant, and powerful. Everything we needed in one package.",
    author: {
      name: "Emily Watson",
      role: "Operations Lead",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
    rating: 5,
  },
  {
    id: "4",
    content:
      "The best investment we've made this year. ROI was immediate.",
    author: {
      name: "David Kim",
      role: "CTO",
      avatar: blockBrandedIconsAndPlaceholders.avatar4,
    },
    rating: 5,
  },
  {
    id: "5",
    content:
      "Support team is always responsive and helpful. Great experience overall.",
    author: {
      name: "Lisa Park",
      role: "Engineering Manager",
      avatar: blockBrandedIconsAndPlaceholders.avatar5,
    },
    rating: 4,
  },
  {
    id: "6",
    content:
      "Clean interface and intuitive design. Our team adopted it instantly.",
    author: {
      name: "Alex Rivera",
      role: "Design Director",
      avatar: blockBrandedIconsAndPlaceholders.avatar6,
    },
    rating: 5,
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <DynamicIcon
          key={star}
          name="lucide/star"
          size={size}
          className={cn(
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  );
}

/**
 * TestimonialsMiniDividers - A grid of compact testimonial cards separated by subtle
 * dividers. Each card displays a short quote, star rating, author avatar, name, and
 * role. The divider pattern creates visual separation while maintaining a cohesive
 * layout. Ideal for displaying multiple brief testimonials in a structured, scannable
 * format.
 *
 * @example
 * ```tsx
 * <TestimonialsMiniDividers
 *   title="What People Say"
 *   subtitle="Feedback from our customers"
 *   testimonials={[
 *     {
 *       id: "1",
 *       content: "Great product!",
 *       author: { name: "John D.", role: "CEO", avatar: "/avatars/john.jpg" },
 *       rating: 5
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialsMiniDividers({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "What People Say",
  subtitle = "Feedback from our customers",
  className,
}: TestimonialsMiniDividersProps): React.JSX.Element {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3 lg:divide-x">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={cn(
                "p-6",
                index >= 2 && "lg:border-t-0",
                index >= 3 && "sm:border-t lg:border-t-0"
              )}
            >
              {testimonial.rating && (
                <StarRating rating={testimonial.rating} />
              )}
              <p className="mt-3 text-sm leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                  />
                  <AvatarFallback className="text-xs">
                    {testimonial.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {testimonial.author.name}
                  </p>
                  {testimonial.author.role && (
                    <p className="text-xs text-muted-foreground">
                      {testimonial.author.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
