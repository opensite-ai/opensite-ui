"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface GridTestimonial {
  id: string;
  rating: number;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
}

export interface TestimonialsGridAddReviewProps {
  testimonials?: GridTestimonial[];
  title?: string;
  subtitle?: string;
  addReviewText?: string;
  onAddReview?: () => void;
  className?: string;
}

const DEFAULT_TESTIMONIALS: GridTestimonial[] = [
  {
    id: "1",
    rating: 5,
    content:
      "Absolutely love this product! It has made my daily routine so much easier. Highly recommend to anyone looking for quality.",
    author: {
      name: "Sarah M.",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
  },
  {
    id: "2",
    rating: 5,
    content:
      "Best purchase I've made in a long time. The quality exceeded my expectations and the customer service was top-notch.",
    author: {
      name: "James R.",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "3",
    rating: 4,
    content:
      "Great product overall. Does exactly what it promises. Would buy again.",
    author: {
      name: "Emily K.",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
  {
    id: "4",
    rating: 5,
    content:
      "This has become an essential part of my workflow. Can't imagine going back to my old solution.",
    author: {
      name: "Michael T.",
      avatar: blockBrandedIconsAndPlaceholders.avatar4,
    },
  },
  {
    id: "5",
    rating: 5,
    content:
      "Impressed by the attention to detail. You can tell a lot of thought went into designing this.",
    author: {
      name: "Lisa P.",
      avatar: blockBrandedIconsAndPlaceholders.avatar5,
    },
  },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
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
 * TestimonialsGridAddReview - A testimonial grid layout featuring review cards with
 * star ratings and an interactive "Add Review" card. The add review card uses a dashed
 * border and plus icon to invite user participation. Each testimonial displays a star
 * rating, review content, and author avatar. Ideal for product pages or community
 * sections encouraging user-generated content.
 *
 * @example
 * ```tsx
 * <TestimonialsGridAddReview
 *   title="Customer Reviews"
 *   subtitle="See what our customers are saying"
 *   testimonials={[
 *     {
 *       id: "1",
 *       rating: 5,
 *       content: "Amazing product!",
 *       author: { name: "John D.", avatar: "/avatars/john.jpg" }
 *     }
 *   ]}
 *   onAddReview={() => console.log("Open review form")}
 * />
 * ```
 */
export function TestimonialsGridAddReview({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "Customer Reviews",
  subtitle = "Real feedback from our community",
  addReviewText = "Share Your Experience",
  onAddReview,
  className,
}: TestimonialsGridAddReviewProps): React.JSX.Element {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            className="flex cursor-pointer items-center justify-center border-2 border-dashed transition-colors hover:border-primary hover:bg-muted/50"
            onClick={onAddReview}
          >
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <DynamicIcon
                  name="lucide/plus"
                  size={24}
                  className="text-primary"
                />
              </div>
              <p className="font-medium">{addReviewText}</p>
              <p className="text-sm text-muted-foreground">
                Help others by sharing your thoughts
              </p>
            </CardContent>
          </Card>

          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="space-y-4 p-6">
                <StarRating rating={testimonial.rating} />
                <p className="text-sm leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-3">
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
                  <span className="text-sm font-medium">
                    {testimonial.author.name}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
