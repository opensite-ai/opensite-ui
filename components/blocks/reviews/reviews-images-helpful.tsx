"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Pressable } from "../../../lib/Pressable";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ReviewWithImages {
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
  images?: string[];
  helpful?: number;
  variant?: string;
}

export interface ReviewsImagesHelpfulProps {
  reviews?: ReviewWithImages[];
  title?: string;
  className?: string;
  onWriteReview?: () => void;
  optixFlowConfig?: OptixFlowConfig;
}

const DEFAULT_REVIEWS: ReviewWithImages[] = [
  {
    id: "1",
    rating: 5,
    title: "Absolutely stunning quality",
    content:
      "The craftsmanship on this is incredible. Photos don't do it justice - it looks even better in person. The material feels premium and the fit is perfect. I've already gotten so many compliments!",
    author: {
      name: "Sarah M.",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
    date: "Dec 10, 2024",
    verified: true,
    images: [imagePlaceholders[0], imagePlaceholders[1]],
    helpful: 24,
    variant: "Size M, Navy Blue",
  },
  {
    id: "2",
    rating: 4,
    title: "Great product, minor sizing issue",
    content:
      "Love the quality and design. Runs slightly small so I'd recommend sizing up. Other than that, it's exactly what I was looking for. Fast shipping too!",
    author: {
      name: "James R.",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
    date: "Dec 8, 2024",
    verified: true,
    helpful: 18,
    variant: "Size L, Black",
  },
  {
    id: "3",
    rating: 5,
    title: "My new favorite!",
    content:
      "I've been searching for something like this for months. The attention to detail is amazing - from the stitching to the hardware, everything is top notch. Worth every penny.",
    author: {
      name: "Emily K.",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
    date: "Dec 5, 2024",
    verified: true,
    images: [imagePlaceholders[2]],
    helpful: 31,
    variant: "One Size, Cream",
  },
  {
    id: "4",
    rating: 5,
    title: "Exceeded expectations",
    content:
      "Was hesitant to order online but so glad I did. The color is exactly as shown and the quality is exceptional. Customer service was also very responsive when I had questions about care instructions.",
    author: {
      name: "Michael T.",
    },
    date: "Dec 2, 2024",
    verified: false,
    helpful: 12,
  },
  {
    id: "5",
    rating: 4,
    title: "Beautiful but pricey",
    content:
      "The product is gorgeous and well-made. I debated for a while because of the price, but ultimately happy with my purchase. Would love to see more color options in the future.",
    author: {
      name: "Lisa P.",
      avatar: blockBrandedIconsAndPlaceholders.avatar5,
    },
    date: "Nov 28, 2024",
    verified: true,
    images: [imagePlaceholders[3]],
    helpful: 8,
    variant: "Gold",
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
 * ReviewsImagesHelpful - An enhanced customer reviews section featuring image attachments,
 * helpful voting functionality, and a write review button. Displays reviews with star ratings,
 * product variants, user avatars with verification badges, and interactive helpful/report
 * buttons. Perfect for e-commerce product pages requiring rich review experiences.
 *
 * @example
 * ```tsx
 * <ReviewsImagesHelpful
 *   title="Customer Reviews"
 *   reviews={[
 *     {
 *       id: "1",
 *       rating: 5,
 *       title: "Amazing quality",
 *       content: "This product exceeded my expectations...",
 *       author: { name: "Jane D.", avatar: "/avatars/jane.jpg" },
 *       date: "Dec 15, 2024",
 *       verified: true,
 *       images: ["/review-images/1.jpg"],
 *       helpful: 15,
 *       variant: "Size M, Blue"
 *     }
 *   ]}
 *   onWriteReview={() => console.log("Open review form")}
 * />
 * ```
 */
export function ReviewsImagesHelpful({
  reviews = DEFAULT_REVIEWS,
  title = "Customer Reviews",
  className,
  onWriteReview,
  optixFlowConfig,
}: ReviewsImagesHelpfulProps): React.JSX.Element {
  const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set());

  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  const handleHelpful = (reviewId: string) => {
    setHelpfulClicked((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container max-w-3xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {title}
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <StarRating rating={Math.round(averageRating)} size={20} />
              <span className="text-lg font-semibold">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({totalReviews} reviews)
              </span>
            </div>
          </div>
          <Pressable
            asButton
            variant="outline"
            onClick={onWriteReview}
          >
            Write a Review
          </Pressable>
        </div>

        <div className="space-y-0">
          {reviews.map((review, index) => (
            <div key={review.id}>
              {index > 0 && <Separator className="my-6" />}
              <Card className="border-0 p-0 shadow-none">
                <CardContent className="space-y-4 p-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage
                          src={review.author.avatar}
                          alt={review.author.name}
                        />
                        <AvatarFallback>
                          {review.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {review.author.name}
                          </span>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-emerald-600">
                              <DynamicIcon name="lucide/badge-check" size={16} />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{review.date}</span>
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
                    <h3 className="font-medium">{review.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {review.content}
                    </p>
                  </div>

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2">
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
                        helpfulClicked.has(review.id) && "text-foreground"
                      )}
                      onClick={() => handleHelpful(review.id)}
                    >
                      <DynamicIcon
                        name="lucide/thumbs-up"
                        size={16}
                        className={cn(
                          helpfulClicked.has(review.id) && "fill-current"
                        )}
                      />
                      Helpful
                      {review.helpful !== undefined && (
                        <span>
                          (
                          {review.helpful +
                            (helpfulClicked.has(review.id) ? 1 : 0)}
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
                      Report
                    </Pressable>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
