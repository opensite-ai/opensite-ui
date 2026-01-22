"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Review item interface for verified reviews
 */
export interface ReviewItem {
  /**
   * Star rating (1-5)
   */
  rating: number;
  /**
   * Review title
   */
  title: React.ReactNode;
  /**
   * Review content/body
   */
  content: React.ReactNode;
  /**
   * Author name
   */
  author?: React.ReactNode;
  /**
   * Author avatar image URL
   */
  avatarSrc?: string;
  /**
   * Review date string
   */
  date?: string;
  /**
   * Whether the reviewer is verified
   */
  verified?: boolean;
}

export interface ReviewsListVerifiedProps {
  /**
   * Array of reviews to display
   */
  reviews?: ReviewItem[];
  /**
   * Custom slot for rendering reviews (overrides reviews array)
   */
  reviewsSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the header container
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for each review item
   */
  reviewClassName?: string;
  /**
   * Additional CSS classes for the review content
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the author section
   */
  authorClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    rating: 5,
    title: "Exceeded my expectations",
    content:
      "I was a bit skeptical at first, but this product really delivered. The quality is outstanding and it arrived faster than expected. Would definitely recommend to anyone on the fence.",
    author: "Sarah M.",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
    date: "Dec 10, 2024",
    verified: true,
  },
  {
    rating: 4,
    title: "Great value for money",
    content:
      "Solid product overall. Does exactly what it's supposed to do. Took off one star because the packaging could be better, but the product itself is great.",
    author: "James R.",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
    date: "Dec 8, 2024",
    verified: true,
  },
  {
    rating: 5,
    title: "Perfect for everyday use",
    content:
      "I've been using this daily for a month now and it still looks and works like new. The build quality is impressive at this price point. Already bought one for my sister.",
    author: "Emily K.",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
    date: "Dec 5, 2024",
    verified: true,
  },
  {
    rating: 4,
    title: "Good but not perfect",
    content:
      "The product is nice and works well. My only minor complaint is that the color is slightly different from the photos, but it's still a great purchase overall.",
    author: "Michael T.",
    date: "Dec 2, 2024",
    verified: false,
  },
  {
    rating: 5,
    title: "Best purchase I've made this year",
    content:
      "Absolutely love it! The attention to detail is remarkable. Customer service was also very helpful when I had questions. Five stars all around.",
    author: "Lisa P.",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar5,
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
              ? "fill-primary text-primary"
              : "fill-muted text-muted",
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
 *   heading="Customer Reviews"
 *   reviews={[
 *     {
 *       rating: 5,
 *       title: "Amazing product",
 *       content: "This exceeded all my expectations...",
 *       author: "John D.",
 *       avatarSrc: "/avatars/john.jpg",
 *       date: "Dec 15, 2024",
 *       verified: true
 *     }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ReviewsListVerified({
  reviews = DEFAULT_REVIEWS,
  reviewsSlot,
  heading,
  className,
  headerClassName,
  headingClassName,
  reviewClassName,
  contentClassName,
  authorClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: ReviewsListVerifiedProps): React.JSX.Element {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const getAuthorName = (review: ReviewItem): string => {
    if (typeof review.author === "string") return review.author;
    return "";
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const renderReviews = () => {
    if (reviewsSlot) return reviewsSlot;

    return (
      <div className="space-y-0">
        {reviews.map((review, index) => {
          const authorName = getAuthorName(review);
          return (
            <div key={index} className={reviewClassName}>
              {index > 0 && <Separator className="my-6" />}
              <div className={cn("space-y-3", contentClassName)}>
                <div>
                  <StarRating rating={review.rating} size={16} />
                  {review.title &&
                    (typeof review.title === "string" ? (
                      <h3 className="mt-2 font-medium">{review.title}</h3>
                    ) : (
                      <div className="mt-2">{review.title}</div>
                    ))}
                </div>

                {review.content &&
                  (typeof review.content === "string" ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {review.content}
                    </p>
                  ) : (
                    review.content
                  ))}

                <div className={cn("flex items-center gap-3", authorClassName)}>
                  <Avatar className="size-8">
                    <AvatarImage src={review.avatarSrc} alt={authorName} />
                    <AvatarFallback className="text-xs">
                      {getInitials(authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-sm">
                    {review.author &&
                      (typeof review.author === "string" ? (
                        <span className="font-medium">{review.author}</span>
                      ) : (
                        review.author
                      ))}
                    {review.verified && (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <DynamicIcon name="lucide/badge-check" size={16} />
                        <span className="text-xs">Verified Purchase</span>
                      </span>
                    )}
                    {review.date && (
                      <>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">
                          {review.date}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className="mx-auto max-w-3xl">
        <div className={cn("mb-8", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-2xl font-semibold tracking-tight md:text-3xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          <div className="mt-2 flex items-center gap-3">
            <StarRating rating={Math.round(averageRating)} size={20} />
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} out of 5 · {reviews.length} reviews
            </span>
          </div>
        </div>

        {renderReviews()}
      </div>
    </Section>
  );
}
