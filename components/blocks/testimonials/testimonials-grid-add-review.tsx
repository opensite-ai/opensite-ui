"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { StarRating } from "../../ui/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";
import { ActionConfig } from "@page-speed/maps/components/geo-map";
import { BlockActions } from "@/components/ui/block-actions";
import { Pressable } from "@/src";

export interface TestimonialsGridAddReviewProps {
  /**
   * Array of reviews to display
   */
  reviews?: TestimonialItem[];
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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the quote text
   */
  quoteClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
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
  sectionId = "testimonials-grid-add-review",
  reviews,
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
  quoteClassName,
  addReviewCardClassName,
  authorClassName,
  background,
  spacing = "lg",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
  actions,
  actionsSlot,
  actionsClassName,
}: TestimonialsGridAddReviewProps): React.JSX.Element {
  const getAuthorName = useCallback((testimonial: TestimonialItem): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  }, []);

  const getAvatarSrc = useCallback(
    (testimonial: TestimonialItem): string | undefined => {
      return testimonial.avatarSrc || testimonial.avatar?.src;
    },
    [],
  );

  const getInitials = useCallback((name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }, []);

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
            "flex cursor-pointer items-center justify-center border-2 border-dashed transition-all duration-500 opacity-100 hover:border-primary hover:opacity-75",
            addReviewCardClassName,
          )}
          onClick={onAddReview}
        >
          <CardContent
            className={cn("flex flex-col items-center gap-3 py-12 text-center")}
          >
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

        {reviews?.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          const avatarSrc = getAvatarSrc(testimonial);
          return (
            <Card key={index} className={cardClassName}>
              <CardContent className="p-6">
                <div className="flex flex-col items-start gap-12 justify-between">
                  <div className="flex flex-col items-start gap-4">
                    {/*
                     * Render the review's real rating when the feed (or author)
                     * supplies a numeric value. Falls back to the historical
                     * 5-star default ONLY when no rating data exists — never
                     * fabricate a rating on top of real feed data.
                     */}
                    <StarRating
                      rating={
                        typeof testimonial.rating === "number"
                          ? testimonial.rating
                          : 5
                      }
                      size={20}
                    />

                    {testimonial.quote &&
                      (typeof testimonial.quote === "string" ? (
                        <p
                          className={cn(
                            "mb-6 text-sm leading-relaxed",
                            quoteClassName,
                          )}
                        >
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      ) : (
                        <div className={cn("mb-6", quoteClassName)}>
                          {testimonial.quote}
                        </div>
                      ))}
                  </div>

                  <div
                    className={cn("flex items-center gap-4", authorClassName)}
                  >
                    <Avatar className="size-14 ring-4 ring-primary shadow-lg">
                      <AvatarImage src={avatarSrc} alt={authorName} />
                      <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start gap-1">
                      <div className="space-y-0">
                        {testimonial.author &&
                          (typeof testimonial.author === "string" ? (
                            <p className="text-base font-medium">
                              {testimonial.author}
                            </p>
                          ) : (
                            testimonial.author
                          ))}
                        {testimonial.role &&
                          (typeof testimonial.role === "string" ? (
                            <p className="text-sm opacity-75">
                              {testimonial.role}
                            </p>
                          ) : (
                            testimonial.role
                          ))}
                      </div>

                      {testimonial.linkConfig?.href && (
                        <Pressable
                          href={testimonial.linkConfig.href}
                          className={cn(
                            "text-sm transition-all duration-500",
                            "hover:underline hover:underline-offset-4",
                            testimonial.linkConfig.className,
                          )}
                        >
                          {testimonial.linkConfig.label}
                        </Pressable>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }, [
    reviewsSlot,
    gridClassName,
    addReviewCardClassName,
    onAddReview,
    addReviewText,
    addReviewSubtext,
    reviews,
    cardClassName,
    authorClassName,
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
      <div
        className={cn(
          "mx-auto mb-12 max-w-full md:max-w-md text-center",
          headerClassName,
        )}
      >
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight md:text-4xl text-pretty",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            heading
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "mt-2 md:mt-4 text-lg text-balance",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            description
          ))}
      </div>

      {renderedReviews}

      <BlockActions
        actions={actions}
        actionsSlot={actionsSlot}
        actionsClassName={cn("mt-8 md:mt-12 justify-center", actionsClassName)}
        mobileConfig={{ width: "full", position: "center" }}
      />
    </Section>
  );
}
