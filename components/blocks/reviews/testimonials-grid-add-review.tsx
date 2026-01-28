"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Review item interface for grid with add review
 */
export interface GridReviewItem {
  /**
   * Star rating (1-5)
   */
  rating: number;
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
}

export interface TestimonialsGridAddReviewProps {
  /**
   * Array of reviews to display
   */
  reviews?: GridReviewItem[];
  /**
   * Custom slot for rendering reviews (overrides reviews array)
   */
  reviewsSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Text for the add review button
   */
  addReviewText?: React.ReactNode;
  /**
   * Subtitle for the add review card
   */
  addReviewSubtext?: React.ReactNode;
  /**
   * Callback when add review is clicked
   */
  onAddReview?: () => void;
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
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the add review card
   */
  addReviewCardClassName?: string;
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

const DEFAULT_REVIEWS: GridReviewItem[] = [
  {
    rating: 5,
    content:
      "Absolutely love this product! It has made my daily routine so much easier. Highly recommend to anyone looking for quality.",
    author: "Sarah M.",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    rating: 5,
    content:
      "Best purchase I've made in a long time. The quality exceeded my expectations and the customer service was top-notch.",
    author: "James R.",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    rating: 4,
    content:
      "Great product overall. Does exactly what it promises. Would buy again.",
    author: "Emily K.",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    rating: 5,
    content:
      "This has become an essential part of my workflow. Can't imagine going back to my old solution.",
    author: "Michael T.",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar4,
  },
  {
    rating: 5,
    content:
      "Impressed by the attention to detail. You can tell a lot of thought went into designing this.",
    author: "Lisa P.",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar5,
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
 * TestimonialsGridAddReview - A testimonial grid layout featuring review cards with
 * star ratings and an interactive "Add Review" card. The add review card uses a dashed
 * border and plus icon to invite user participation. Each testimonial displays a star
 * rating, review content, and author avatar. Ideal for product pages or community
 * sections encouraging user-generated content.
 *
 * @example
 * ```tsx
 * <TestimonialsGridAddReview
 *   heading="Customer Reviews"
 *   description="See what our customers are saying"
 *   reviews={[
 *     {
 *       rating: 5,
 *       content: "Amazing product!",
 *       author: "John D.",
 *       avatarSrc: "/avatars/john.jpg"
 *     }
 *   ]}
 *   onAddReview={() => console.log("Open review form")}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsGridAddReview({
  reviews = DEFAULT_REVIEWS,
  reviewsSlot,
  heading,
  description,
  addReviewText,
  addReviewSubtext,
  onAddReview,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  addReviewCardClassName,
  authorClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: TestimonialsGridAddReviewProps): React.JSX.Element {
  const getAuthorName = (review: GridReviewItem): string => {
    if (typeof review.author === "string") return review.author;
    return "";
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const renderedReviews = useMemo(() => {
    if (reviewsSlot) return reviewsSlot;

    return (
      <div
        className={cn(
          "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        <Card
          className={cn(
            "flex cursor-pointer items-center justify-center border-2 border-dashed transition-colors hover:border-primary hover:bg-muted/50",
            addReviewCardClassName,
          )}
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
            {addReviewText &&
              (typeof addReviewText === "string" ? (
                <p className="font-medium">{addReviewText}</p>
              ) : (
                addReviewText
              ))}
            {addReviewSubtext &&
              (typeof addReviewSubtext === "string" ? (
                <p className="text-sm text-muted-foreground">
                  {addReviewSubtext}
                </p>
              ) : (
                addReviewSubtext
              ))}
          </CardContent>
        </Card>

        {reviews.map((review, index) => {
          const authorName = getAuthorName(review);
          return (
            <Card key={index} className={cardClassName}>
              <CardContent className="space-y-4 p-6">
                <StarRating rating={review.rating} />
                {review.content &&
                  (typeof review.content === "string" ? (
                    <p className="text-sm leading-relaxed">{review.content}</p>
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
                  {review.author &&
                    (typeof review.author === "string" ? (
                      <span className="text-sm font-medium">
                        {review.author}
                      </span>
                    ) : (
                      review.author
                    ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }, [reviewsSlot, gridClassName, addReviewCardClassName, onAddReview, addReviewText, addReviewSubtext, reviews, cardClassName, authorClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div
        className={cn("mx-auto mb-12 max-w-2xl text-center", headerClassName)}
      >
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight md:text-4xl",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "mt-4 text-lg text-muted-foreground",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={cn("mt-4", descriptionClassName)}>
              {description}
            </div>
          ))}
      </div>

      {renderedReviews}
    </Section>
  );
}
