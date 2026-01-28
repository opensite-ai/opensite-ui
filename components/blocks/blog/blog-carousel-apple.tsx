"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  AppleCarousel,
  AppleCarouselCard,
  AppleCarouselCardData,
  AppleCarouselCardAction,
} from "../../ui/apple-cards-carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

export interface BlogCarouselApplePost {
  /**
   * Content item image URL
   */
  image?: string;
  /**
   * Content item title
   */
  title?: string;
  /**
   * Content item category/tag
   */
  category?: string;
  /**
   * Content item URL (internal or external)
   */
  url?: string;
  /**
   * Optional content item excerpt/description (for dialog/lightbox views)
   */
  excerpt?: React.ReactNode;
}

export interface BlogCarouselAppleProps {
  /**
   * Section title
   */
  title?: string;
  /**
   * Section subtitle/eyebrow text
   */
  subtitle?: string;
  /**
   * Array of content items to display in the carousel
   */
  posts?: BlogCarouselApplePost[];
  /**
   * Card action type - determines behavior when cards are clicked
   */
  actionType?: "link" | "dialog" | "lightbox" | "none";
  /**
   * Custom action handler for card clicks
   */
  onCardClick?: (post: BlogCarouselApplePost, index: number) => void;
  /**
   * Enable layout animations for cards
   */
  enableLayoutAnimations?: boolean;
  /**
   * OptixFlow configuration for optimized image loading
   */
  optixFlowConfig?: OptixFlowConfig;
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
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the carousel wrapper
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for the carousel container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for individual cards
   */
  cardClassName?: string;
}

/**
 * BlogCarouselApple - An eye-catching horizontal carousel featuring
 * Apple-style cards with gradient overlays and smooth animations. Each card
 * displays a featured image, category tag, and title. Perfect for showcasing
 * featured content items, latest updates, or curated content collections.
 *
 * @example
 * ```tsx
 * <BlogCarouselApple
 *   title="Latest Insights"
 *   subtitle="Featured Content"
 *   posts={contentItems}
 *   actionType="link"
 *   background="gray"
 * />
 * ```
 */
export function BlogCarouselAppleComponent({
  title,
  subtitle,
  posts,
  actionType,
  onCardClick,
  enableLayoutAnimations,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  carouselClassName,
  containerClassName,
  cardClassName,
}: BlogCarouselAppleProps): React.JSX.Element {
  // Convert content items to carousel card data
  const carouselCards = React.useMemo(() => {
    if (!posts || posts.length === 0) return [];

    return posts.map(
      (post, idx): AppleCarouselCardData => ({
        idx: idx,
        src: post.image || "",
        title: post.title || "",
        category: post.category || "",
        content: post.excerpt,
      }),
    );
  }, [posts]);

  // Generate card elements
  const cardElements = React.useMemo(() => {
    if (!posts || posts.length === 0) return [];

    return carouselCards
      .map((card, index) => {
        const post = posts[index];
        if (!post) return null;

        const action: AppleCarouselCardAction = {
          type: actionType || "link",
          href: actionType === "link" && post.url ? post.url : undefined,
          onClick: onCardClick ? () => onCardClick(post, index) : undefined,
        };

        return (
          <AppleCarouselCard
            key={`carousel-card-${index}`}
            card={card}
            index={index}
            action={action}
            layout={enableLayoutAnimations || false}
            optixFlowConfig={optixFlowConfig}
            className={cardClassName}
          />
        );
      })
      .filter((element): element is JSX.Element => element !== null);
  }, [
    carouselCards,
    posts,
    actionType,
    onCardClick,
    enableLayoutAnimations,
    optixFlowConfig,
    cardClassName,
  ]);

  if (!posts || posts.length === 0) {
    return <></>;
  }

  return (
    <Section
      title={title}
      subtitle={subtitle}
      background={background || "white"}
      spacing={spacing || "lg"}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <AppleCarousel
        items={cardElements}
        className={carouselClassName}
        containerClassName={containerClassName}
      />
    </Section>
  );
}

export { BlogCarouselAppleComponent as BlogCarouselApple };
