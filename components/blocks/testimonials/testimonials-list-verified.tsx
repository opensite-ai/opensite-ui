"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { StarRating } from "../../ui/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
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

export interface TestimonialsListVerifiedProps {
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
   * Label for the verified purchase badge
   */
  verifiedPurchaseLabel?: React.ReactNode;
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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * TestimonialsListVerified - A clean, vertical list of customer reviews with rating summary,
 * verified purchase badges, and author information. Features star ratings, review titles,
 * content, and author avatars with verification status. Ideal for product pages, service
 * reviews, or any context requiring authentic customer feedback display.
 *
 * @example
 * ```tsx
 * <TestimonialsListVerified
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
export function TestimonialsListVerified({
  sectionId = "testimonials-list-verified",
  reviews,
  reviewsSlot,
  heading,
  verifiedPurchaseLabel,
  className,
  headerClassName,
  headingClassName,
  reviewClassName,
  contentClassName,
  authorClassName,
  background,
  spacing = "lg",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
}: TestimonialsListVerifiedProps): React.JSX.Element {
  const totalReviews = reviews?.length ?? 0;
  const averageRating =
    totalReviews > 0
      ? (reviews?.reduce((sum, review) => sum + review.rating, 0) ?? 0) /
        totalReviews
      : 0;

  const getAuthorName = useCallback((review: ReviewItem): string => {
    if (typeof review.author === "string") return review.author;
    return "";
  }, []);

  const getInitials = useCallback((name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }, []);

  const renderedReviews = useMemo(() => {
    if (reviewsSlot) return reviewsSlot;
    if (!reviews || reviews.length === 0) return null;

    return (
      <div className="space-y-0">
        {reviews.map((review, index) => {
          const authorName = getAuthorName(review);
          return (
            <div key={index} className={reviewClassName}>
              {index > 0 && (
                <Separator className="bg-border/50 shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-12 md:my-16" />
              )}
              <div className={cn("space-y-6 md:space-y-12", contentClassName)}>
                <div className="space-y-4">
                  <StarRating rating={review.rating} size={22} />
                  {review.title &&
                    (typeof review.title === "string" ? (
                      <h3 className="font-medium">{review.title}</h3>
                    ) : (
                      review.title
                    ))}
                </div>

                {review.content &&
                  (typeof review.content === "string" ? (
                    <p className="text-base md:text-lg leading-relaxed font-light">
                      {review.content}
                    </p>
                  ) : (
                    review.content
                  ))}

                <div className={cn("flex items-center justify-between w-full")}>
                  <div
                    className={cn("flex items-center gap-5", authorClassName)}
                  >
                    <Avatar className="size-12 ring-4 ring-primary shadow-lg">
                      <AvatarImage src={review.avatarSrc} alt={authorName} />
                      <AvatarFallback className="text-md">
                        {getInitials(authorName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1 text-base flex-col items-start">
                      {review.author &&
                        (typeof review.author === "string" ? (
                          <span className="font-medium">{review.author}</span>
                        ) : (
                          review.author
                        ))}
                      {/* No fallback label: the indicator renders ONLY when the
                          consumer supplies verifiedPurchaseLabel — wording is
                          industry-specific and must never be hardcoded. */}
                      {review.verified && verifiedPurchaseLabel && (
                        <span className="flex items-center gap-1">
                          <DynamicIcon name="lucide/badge-check" size={18} />
                          {typeof verifiedPurchaseLabel === "string" ? (
                            <span className="text-sm">
                              {verifiedPurchaseLabel}
                            </span>
                          ) : (
                            verifiedPurchaseLabel
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  {review.date && (
                    <span className="relative">{review.date}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [
    reviewsSlot,
    reviews,
    reviewClassName,
    contentClassName,
    authorClassName,
    verifiedPurchaseLabel,
    getAuthorName,
    getInitials,
  ]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="mx-auto max-w-full md:max-w-3xl">
        <div className={cn("mb-12 md:mb-24 space-y-6", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              heading
            ))}
          {totalReviews > 0 && (
            <div className="mt-2 flex items-center gap-3">
              <StarRating rating={Math.round(averageRating)} size={22} />
              <span className="text-sm">
                {averageRating.toFixed(1)} out of 5 · {totalReviews} reviews
              </span>
            </div>
          )}
        </div>

        {renderedReviews}
      </div>
    </Section>
  );
}
