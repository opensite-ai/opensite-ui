"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Badge } from "@/src";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";

export interface FeatureImageCardsThreeColumnItem {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode | string;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/zap")
   */
  iconName?: string;
  /**
   * Avatar image URL (alternative to icon)
   */
  avatarSrc?: string;
  /**
   * Badge text content
   */
  badgeText?: React.ReactNode;
  /**
   * Card title content
   */
  title?: React.ReactNode;
  /**
   * Card subtitle content
   */
  subtitle?: React.ReactNode;
  /**
   * Link text content
   */
  linkText?: React.ReactNode;
  /**
   * Link URL
   */
  link?: string;
  /**
   * onClick handler for the card
   */
  onClick?: () => void;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Custom slot for image (overrides imageSrc)
   */
  imageSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the link text
   */
  linkClassName?: string;
}

export interface FeatureImageCardsThreeColumnProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of card items
   */
  cards?: FeatureImageCardsThreeColumnItem[];
  /**
   * Custom slot for rendering cards (overrides cards array)
   */
  cardsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * OptixFlow image optimization configuration
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * Media card aspect ratios
   * @default { desktop: "vertical", mobile: "square" }
   */
  cardAspectRatios?: {
    desktop: "square" | "horizontal" | "vertical";
    mobile: "square" | "horizontal" | "vertical";
  };
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * Feature Image Cards Three Column - Three-column grid of image cards with
 * gradient overlays, badges, and CTAs.
 *
 * Layout: Three equal-width cards with full-height images and overlays.
 * Key features: Gradient overlays, icon/avatar badges, hover animations, CTAs.
 * Best for: Portfolio showcases, product categories, feature highlights.
 *
 * @example
 * ```tsx
 * <FeatureImageCardsThreeColumn
 *   title="Versatile Designs"
 *   description="Personalize the box to fit your requirements"
 *   cards={[
 *     {
 *       iconName: "lucide/zap",
 *       badgeText: "Advanced tools",
 *       title: "Transform your website",
 *       linkText: "Explore all features",
 *       link: "/features",
 *       imageSrc: "/feature.jpg",
 *       imageAlt: "Feature"
 *     },
 *   ]}
 * />
 * ```
 */
const ASPECT_RATIO_VALUES = {
  square: "1 / 1",
  horizontal: "16 / 9",
  vertical: "8 / 12",
} as const;

export function FeatureImageCardsThreeColumn({
  sectionId = "feature-image-cards-three-column",
  title,
  description,
  headerClassName,
  cards,
  cardsSlot,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  optixFlowConfig,
  background,
  pattern,
  patternOpacity,
  patternClassName,
  cardAspectRatios = { desktop: "vertical", mobile: "square" },
}: FeatureImageCardsThreeColumnProps): React.JSX.Element {
  const renderImage = useCallback(
    (card: FeatureImageCardsThreeColumnItem, imageAlt: string) => {
      if (card.imageSlot) return card.imageSlot;
      if (!card.imageSrc) return null;

      return (
        <Img
          src={card.imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full rounded-xl object-cover object-center"
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      );
    },
    [optixFlowConfig],
  );

  const renderBadgeIcon = useCallback(
    (card: FeatureImageCardsThreeColumnItem) => {
      if (card.avatarSrc) {
        return (
          <Avatar className="size-7 rounded-full">
            <AvatarImage src={card.avatarSrc} alt="Avatar" />
          </Avatar>
        );
      }
      if (card.icon) return <DynamicIcon name={card.icon} size={18} />;
      if (!card.iconName) return null;

      return <DynamicIcon name={card.iconName} size={18} />;
    },
    [],
  );

  const renderCardBadge = useCallback(
    (card: FeatureImageCardsThreeColumnItem) => {
      return card.badgeText || card.avatarSrc || card.icon || card.iconName ? (
        <Badge
          variant="default"
          className={cn("py-1 px-3 gap-2", card.badgeClassName)}
        >
          {renderBadgeIcon(card)}
          {card.badgeText}
        </Badge>
      ) : null;
    },
    [renderBadgeIcon],
  );

  const cardHasTextContent = useCallback(
    (card: FeatureImageCardsThreeColumnItem) => {
      const hasBadge = !!(
        card.badgeText ||
        card.avatarSrc ||
        card.icon ||
        card.iconName
      );
      return hasBadge || !!card.title || !!card.subtitle || !!card.linkText;
    },
    [],
  );

  const renderCardText = useCallback(
    (card: FeatureImageCardsThreeColumnItem) => {
      if (!cardHasTextContent(card)) {
        return null;
      }

      const cardBadge = renderCardBadge(card);

      return (
        <div className="absolute top-0 flex h-full w-full flex-col justify-between p-4 md:p-6">
          {cardBadge || <div />}
          {card.title || card.subtitle || card.linkText ? (
            <div className="flex flex-col items-start gap-4 md:gap-6 text-white">
              {card.title || card.subtitle ? (
                <div className="flex flex-col items-start gap-0 md:gap-1">
                  {card.title &&
                    (typeof card.title === "string" ? (
                      <h3
                        className={cn(
                          "text-lg md:text-xl font-semibold",
                          card.titleClassName,
                        )}
                      >
                        {card.title}
                      </h3>
                    ) : (
                      card.title
                    ))}
                  {card.subtitle &&
                    (typeof card.subtitle === "string" ? (
                      <p
                        className={cn(
                          "text-base font-normal",
                          card.subtitleClassName,
                        )}
                      >
                        {card.subtitle}
                      </p>
                    ) : (
                      card.subtitle
                    ))}
                </div>
              ) : null}

              {card.linkText && (
                <div
                  className={cn(
                    "font-bold text-xs uppercase flex items-center gap-2",
                    card.linkClassName,
                  )}
                >
                  {card.linkText}
                  <DynamicIcon name="lucide/arrow-up-right" size={18} />
                </div>
              )}
            </div>
          ) : null}
        </div>
      );
    },
    [cardHasTextContent, renderCardBadge],
  );

  const cardsContent = useMemo(() => {
    if (cardsSlot) return cardsSlot;
    if (!cards || cards.length === 0) return null;

    return cards.map((card, index) => {
      const imageAlt =
        card.imageAlt ||
        (typeof card.title === "string" ? card.title : "Card image");

      const aspectRatioStyle = {
        "--aspect-mobile": ASPECT_RATIO_VALUES[cardAspectRatios.mobile],
        "--aspect-desktop": ASPECT_RATIO_VALUES[cardAspectRatios.desktop],
      } as React.CSSProperties;

      return (
        <Pressable
          key={index}
          href={card.link}
          onClick={card.onClick}
          style={aspectRatioStyle}
          className={cn(
            "group relative overflow-hidden rounded-2xl shadow-xl",
            "aspect-(--aspect-mobile) `md:aspect-(--aspect-desktop)",
            cardClassName,
            card.className,
          )}
        >
          {renderImage(card, imageAlt)}
          {cardHasTextContent(card) && (
            <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-10 md:translate-y-20 rounded-xl bg-linear-to-t from-black to-transparent transition-transform duration-300 group-hover:translate-y-0" />
          )}
          {renderCardText(card)}
        </Pressable>
      );
    });
  }, [
    cardsSlot,
    cards,
    cardClassName,
    cardAspectRatios,
    renderImage,
    cardHasTextContent,
    renderCardText,
  ]);

  const contentItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (title) {
      if (typeof title === "string") {
        items.push({
          _type: "text",
          as: "h2",
          className: cn(
            "text-3xl font-semibold text-balance md:text-4xl lg:text-5xl max-w-full md:max-w-md",
            titleClassName,
          ),
          children: title,
        });
      } else {
        items.push(title);
      }
    }

    if (description) {
      if (typeof description === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: cn(
            "text-xl max-w-full md:max-w-md text-balance",
            descriptionClassName,
          ),
          children: description,
        });
      } else {
        items.push(description);
      }
    }

    return items;
  }, [title, titleClassName, description, descriptionClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col space-y-6 md:space-y-16">
        <ContentGroup
          items={contentItems}
          className={cn(
            "flex flex-col gap-2 text-left items-start",
            headerClassName,
          )}
        />

        <div
          className={cn(
            "grid gap-4 md:gap-4 grid-cols-1 md:grid-cols-3",
            gridClassName,
          )}
        >
          {cardsContent}
        </div>
      </div>
    </Section>
  );
}
