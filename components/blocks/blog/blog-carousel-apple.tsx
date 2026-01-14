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
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

export interface BlogCarouselApplePost {
  /**
   * Blog post image URL
   */
  image: string;
  /**
   * Blog post title
   */
  title: string;
  /**
   * Blog post category/tag
   */
  category: string;
  /**
   * Blog post URL (internal or external)
   */
  url: string;
  /**
   * Optional blog post excerpt/description (for dialog/lightbox views)
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
   * Array of blog posts to display in the carousel
   */
  posts?: BlogCarouselApplePost[];
  /**
   * Card action type - determines behavior when cards are clicked
   * @default "link"
   */
  actionType?: "link" | "dialog" | "lightbox" | "none";
  /**
   * Custom action handler for card clicks
   */
  onCardClick?: (post: BlogCarouselApplePost, index: number) => void;
  /**
   * Enable layout animations for cards
   * @default false
   */
  enableLayoutAnimations?: boolean;
  /**
   * OptixFlow configuration for optimized image loading
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Background style for the section
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   * @default "lg"
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
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
 * BlogCarouselApple - An eye-catching horizontal blog post carousel featuring
 * Apple-style cards with gradient overlays and smooth animations. Each card
 * displays a featured image, category tag, and title. Perfect for showcasing
 * featured blog posts, latest articles, or curated content collections.
 *
 * @example
 * ```tsx
 * <BlogCarouselApple
 *   title="Latest Insights"
 *   subtitle="From Our Blog"
 *   posts={blogPosts}
 *   actionType="link"
 *   background="gray"
 * />
 * ```
 */
export function BlogCarouselApple({
  title,
  subtitle,
  posts,
  actionType = "link",
  onCardClick,
  enableLayoutAnimations = false,
  optixFlowConfig,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  carouselClassName,
  containerClassName,
  cardClassName,
}: BlogCarouselAppleProps): React.JSX.Element {
  // Convert blog posts to carousel card data
  const carouselCards = React.useMemo(() => {
    return posts.map((post): AppleCarouselCardData => ({
      src: post.image,
      title: post.title,
      category: post.category,
      content: post.excerpt,
    }));
  }, [posts]);

  // Generate card elements
  const cardElements = React.useMemo(() => {
    return carouselCards.map((card, index) => {
      const action: AppleCarouselCardAction = {
        type: actionType,
        href: actionType === "link" ? posts[index].url : undefined,
        onClick: onCardClick
          ? () => onCardClick(posts[index], index)
          : undefined,
      };

      return (
        <AppleCarouselCard
          key={`blog-card-${index}`}
          card={card}
          index={index}
          action={action}
          layout={enableLayoutAnimations}
          optixFlowConfig={optixFlowConfig}
          className={cardClassName}
        />
      );
    });
  }, [
    carouselCards,
    posts,
    actionType,
    onCardClick,
    enableLayoutAnimations,
    optixFlowConfig,
    cardClassName,
  ]);

  return (
    <Section
      title={title}
      subtitle={subtitle}
      background={background}
      spacing={spacing}
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
