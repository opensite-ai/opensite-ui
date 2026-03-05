"use client";

import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { StarRating } from "../../ui/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
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

export interface TestimonialsImagesHelpfulProps {
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
   * Label for the verified purchase badge
   */
  verifiedPurchaseLabel?: React.ReactNode;
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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
}

/**
 * TestimonialsImagesHelpful - An enhanced customer reviews section featuring image attachments,
 * helpful voting functionality, and a write review button. Displays reviews with star ratings,
 * product variants, user avatars with verification badges, and interactive helpful/report
 * buttons. Perfect for e-commerce product pages requiring rich review experiences.
 *
 * @example
 * ```tsx
 * <TestimonialsImagesHelpful
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
export function TestimonialsImagesHelpful({
  reviews,
  reviewsSlot,
  heading,
  verifiedPurchaseLabel,
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
  spacing = "lg",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: TestimonialsImagesHelpfulProps): React.JSX.Element {
  const [helpfulClicked, setHelpfulClicked] = useState<Set<number>>(new Set());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const totalReviews = reviews?.length ?? 0;
  const averageRating =
    totalReviews > 0
      ? (reviews?.reduce((sum, review) => sum + review.rating, 0) ?? 0) /
        totalReviews
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

  const handleImageClick = useCallback(
    (reviewImages: string[], imageIndex: number) => {
      const items: LightboxItem[] = reviewImages.map((src, i) => ({
        id: `review-image-${i}`,
        type: "image" as const,
        src,
        alt: `Review image ${i + 1}`,
        download: true,
        share: true,
      }));
      setLightboxItems(items);
      setLightboxIndex(imageIndex);
      setLightboxOpen(true);
    },
    [],
  );

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
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

                {review.images && review.images.length > 0 && (
                  <div className={cn("flex gap-3", imagesClassName)}>
                    {review.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="size-20 cursor-pointer overflow-hidden rounded-lg sm:size-24 transition-transform duration-300 hover:scale-[1.03] shadow-sm hover:shadow-lg"
                        onClick={() =>
                          handleImageClick(review.images!, imgIndex)
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleImageClick(review.images!, imgIndex);
                          }
                        }}
                        aria-label={`View review image ${imgIndex + 1} in lightbox`}
                      >
                        <Img
                          src={image}
                          alt={`Review image ${imgIndex + 1}`}
                          className="size-full object-cover"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </div>
                    ))}
                  </div>
                )}

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
                    <div className="flex flex-col items-start gap-0">
                      <div className="flex items-center gap-2">
                        {review.author &&
                          (typeof review.author === "string" ? (
                            <span className="font-medium">{review.author}</span>
                          ) : (
                            review.author
                          ))}
                        {review.verified && (
                          <span className="flex items-center gap-1">
                            <DynamicIcon name="lucide/badge-check" size={18} />
                            {verifiedPurchaseLabel &&
                              (typeof verifiedPurchaseLabel === "string" ? (
                                <span className="text-sm">
                                  {verifiedPurchaseLabel}
                                </span>
                              ) : (
                                verifiedPurchaseLabel
                              ))}
                            {!verifiedPurchaseLabel && (
                              <span className="text-sm">Verified Purchase</span>
                            )}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
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
                  <div className="flex items-center gap-4">
                    <Pressable
                      asButton
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 gap-1.5",
                        helpfulClicked.has(index)
                          ? "text-foreground"
                          : "text-muted-foreground",
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
    imagesClassName,
    helpfulClicked,
    optixFlowConfig,
    reportButtonLabel,
    verifiedPurchaseLabel,
    getAuthorName,
    getInitials,
    handleHelpful,
    handleImageClick,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="mx-auto max-w-full md:max-w-3xl">
        <div className={cn("mb-12 md:mb-24 space-y-6", headerClassName)}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
            {(writeReviewLabel || onWriteReview) && (
              <Pressable asButton variant="outline" onClick={onWriteReview}>
                {writeReviewLabel}
              </Pressable>
            )}
          </div>
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

      {lightboxOpen && (
        <Lightbox
          items={lightboxItems}
          initialIndex={lightboxIndex}
          layout="horizontal"
          controls={{
            navigation: true,
            thumbnails: true,
            download: true,
            share: true,
            fullscreen: true,
            captions: true,
            counter: true,
          }}
          onClose={handleLightboxClose}
          enableKeyboardShortcuts={true}
          closeOnEscape={true}
          closeOnBackdropClick={true}
        />
      )}
    </Section>
  );
}
