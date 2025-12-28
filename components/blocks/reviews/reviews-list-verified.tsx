"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ReviewItem {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  verified?: boolean;
}

export interface ReviewsListVerifiedProps {
  reviews?: ReviewItem[];
  title?: string;
  className?: string;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "1",
    rating: 5,
    title: "Exceeded my expectations",
    content:
      "I was a bit skeptical at first, but this product really delivered. The quality is outstanding and it arrived faster than expected. Would definitely recommend to anyone on the fence.",
    author: {
      name: "Sarah M.",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
    date: "Dec 10, 2024",
    verified: true,
  },
  {
    id: "2",
    rating: 4,
    title: "Great value for money",
    content:
      "Solid product overall. Does exactly what it's supposed to do. Took off one star because the packaging could be better, but the product itself is great.",
    author: {
      name: "James R.",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
    date: "Dec 8, 2024",
    verified: true,
  },
  {
    id: "3",
    rating: 5,
    title: "Perfect for everyday use",
    content:
      "I've been using this daily for a month now and it still looks and works like new. The build quality is impressive at this price point. Already bought one for my sister.",
    author: {
      name: "Emily K.",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
    date: "Dec 5, 2024",
    verified: true,
  },
  {
    id: "4",
    rating: 4,
    title: "Good but not perfect",
    content:
      "The product is nice and works well. My only minor complaint is that the color is slightly different from the photos, but it's still a great purchase overall.",
    author: {
      name: "Michael T.",
    },
    date: "Dec 2, 2024",
    verified: false,
  },
  {
    id: "5",
    rating: 5,
    title: "Best purchase I've made this year",
    content:
      "Absolutely love it! The attention to detail is remarkable. Customer service was also very helpful when I had questions. Five stars all around.",
    author: {
      name: "Lisa P.",
      avatar: blockBrandedIconsAndPlaceholders.avatar5,
    },
    date: "Nov 28, 2024",
    verified: true,
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
 * ReviewsListVerified - A clean, vertical list of customer reviews with rating summary,
 * verified purchase badges, and author information. Features star ratings, review titles,
 * content, and author avatars with verification status. Ideal for product pages, service
 * reviews, or any context requiring authentic customer feedback display.
 *
 * @example
 * ```tsx
 * <ReviewsListVerified
 *   title="Customer Reviews"
 *   reviews={[
 *     {
 *       id: "1",
 *       rating: 5,
 *       title: "Amazing product",
 *       content: "This exceeded all my expectations...",
 *       author: { name: "John D.", avatar: "/avatars/john.jpg" },
 *       date: "Dec 15, 2024",
 *       verified: true
 *     }
 *   ]}
 * />
 * ```
 */
export function ReviewsListVerified({
  reviews = DEFAULT_REVIEWS,
  title = "Customer Reviews",
  className,
}: ReviewsListVerifiedProps): React.JSX.Element {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container max-w-3xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
          <div className="mt-2 flex items-center gap-3">
            <StarRating rating={Math.round(averageRating)} size={20} />
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} out of 5 · {reviews.length} reviews
            </span>
          </div>
        </div>

        <div className="space-y-0">
          {reviews.map((review, index) => (
            <div key={review.id}>
              {index > 0 && <Separator className="my-6" />}
              <div className="space-y-3">
                <div>
                  <StarRating rating={review.rating} size={16} />
                  <h3 className="mt-2 font-medium">{review.title}</h3>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {review.content}
                </p>

                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={review.author.avatar}
                      alt={review.author.name}
                    />
                    <AvatarFallback className="text-xs">
                      {review.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{review.author.name}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <DynamicIcon name="lucide/badge-check" size={16} />
                        <span className="text-xs">Verified Purchase</span>
                      </span>
                    )}
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
