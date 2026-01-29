"use client";

import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Review item with images and helpful voting
 */
export interface ReviewWithImages {
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
  /**
   * Array of review image URLs
   */
  images?: string[];
  /**
   * Number of helpful votes
   */
  helpful?: number;
  /**
   * Product variant purchased
   */
  variant?: string;
}

export interface ReviewsImagesHelpfulProps {
  /**
   * Array of reviews to display
   */
  reviews?: ReviewWithImages[];
  /**
   * Custom slot for rendering reviews (overrides reviews array)
   */
  reviewsSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Write review button text
   */
  writeReviewLabel?: React.ReactNode;
  /**
   * Label for the report button
   */
  reportButtonLabel?: React.ReactNode;
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
   * Additional CSS classes for each review card
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
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * Callback when write review button is clicked
   */
  onWriteReview?: () => void;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}


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
 * ReviewsImagesHelpful - An enhanced customer reviews section featuring image attachments,
 * helpful voting functionality, and a write review button. Displays reviews with star ratings,
 * product variants, user avatars with verification badges, and interactive helpful/report
 * buttons. Perfect for e-commerce product pages requiring rich review experiences.
 *
 * @example
 * ```tsx
 * <ReviewsImagesHelpful
 *   heading="Customer Reviews"
 *   reviews={[
 *     {
 *       rating: 5,
 *       title: "Amazing quality",
 *       content: "This product exceeded my expectations...",
 *       author: "Jane D.",
 *       avatarSrc: "/avatars/jane.jpg",
 *       date: "Dec 15, 2024",
 *       verified: true,
 *       images: ["/review-images/1.jpg"],
 *       helpful: 15,
 *       variant: "Size M, Blue"
 *     }
 *   ]}
 *   onWriteReview={() => console.log("Open review form")}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ReviewsImagesHelpful({
  reviews,
  reviewsSlot,
  heading,
  writeReviewLabel,
  reportButtonLabel,
  className,
  headerClassName,
  headingClassName,
  reviewClassName,
  contentClassName,
  authorClassName,
  imagesClassName,
  onWriteReview,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ReviewsImagesHelpfulProps): React.JSX.Element {
  const [helpfulClicked, setHelpfulClicked] = useState<Set<number>>(new Set());

  const totalReviews = reviews?.length ?? 0;
  const averageRating = totalReviews > 0
    ? (reviews?.reduce((sum, review) => sum + review.rating, 0) ?? 0) / totalReviews
    : 0;

  const handleHelpful = useCallback((reviewIndex: number) => {
    setHelpfulClicked((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewIndex)) {
        newSet.delete(reviewIndex);
      } else {
        newSet.add(reviewIndex);
      }
      return newSet;
    });
  }, []);

  const getAuthorName = useCallback((review: ReviewWithImages): string => {
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
              {index > 0 && <Separator className="my-6" />}
              <Card className="border-0 p-0 shadow-none">
                <CardContent className={cn("space-y-4 p-0", contentClassName)}>
                  <div
                    className={cn(
                      "flex items-start justify-between gap-4",
                      authorClassName,
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage src={review.avatarSrc} alt={authorName} />
                        <AvatarFallback>
                          {getInitials(authorName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          {review.author &&
                            (typeof review.author === "string" ? (
                              <span className="font-medium">
                                {review.author}
                              </span>
                            ) : (
                              review.author
                            ))}
                          {review.verified && (
                            <span className="flex items-center gap-1 text-emerald-600">
                              <DynamicIcon
                                name="lucide/badge-check"
                                size={16}
                              />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {review.date && <span>{review.date}</span>}
                          {review.variant && (
                            <>
                              <span>·</span>
                              <span>{review.variant}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={16} />
                  </div>

                  <div>
                    {review.title &&
                      (typeof review.title === "string" ? (
                        <h3 className="font-medium">{review.title}</h3>
                      ) : (
                        review.title
                      ))}
                    {review.content &&
                      (typeof review.content === "string" ? (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {review.content}
                        </p>
                      ) : (
                        <div className="mt-2">{review.content}</div>
                      ))}
                  </div>

                  {review.images && review.images.length > 0 && (
                    <div className={cn("flex gap-2", imagesClassName)}>
                      {review.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="size-20 overflow-hidden rounded-lg sm:size-24"
                        >
                          <AspectRatio ratio={1}>
                            <Img
                              src={image}
                              alt={`Review image ${imgIndex + 1}`}
                              className="size-full object-cover"
                              optixFlowConfig={optixFlowConfig}
                            />
                          </AspectRatio>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <Pressable
                      asButton
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 gap-1.5 text-muted-foreground",
                        helpfulClicked.has(index) && "text-foreground",
                      )}
                      onClick={() => handleHelpful(index)}
                    >
                      <DynamicIcon
                        name="lucide/thumbs-up"
                        size={16}
                        className={cn(
                          helpfulClicked.has(index) && "fill-current",
                        )}
                      />
                      Helpful
                      {review.helpful !== undefined && (
                        <span>
                          (
                          {review.helpful + (helpfulClicked.has(index) ? 1 : 0)}
                          )
                        </span>
                      )}
                    </Pressable>
                    <Pressable
                      asButton
                      variant="ghost"
                      size="sm"
                      className="h-8 text-muted-foreground"
                    >
                      {reportButtonLabel ?? "Report"}
                    </Pressable>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }, [reviewsSlot, reviews, reviewClassName, contentClassName, authorClassName, imagesClassName, helpfulClicked, optixFlowConfig, reportButtonLabel, getAuthorName, getInitials, handleHelpful]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className="mx-auto max-w-3xl">
        <div
          className={cn(
            "mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
            headerClassName,
          )}
        >
          <div>
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
            {totalReviews > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <StarRating rating={Math.round(averageRating)} size={20} />
                <span className="text-lg font-semibold">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({totalReviews} reviews)
                </span>
              </div>
            )}
          </div>
          {(writeReviewLabel || onWriteReview) && (
            <Pressable asButton variant="outline" onClick={onWriteReview}>
              {writeReviewLabel}
            </Pressable>
          )}
        </div>

        {renderedReviews}
      </div>
    </Section>
  );
}
