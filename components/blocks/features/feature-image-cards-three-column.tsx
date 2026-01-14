"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { OptixFlowConfig } from "../../../src/types";

export interface FeatureImageCardsThreeColumnItem {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
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
export function FeatureImageCardsThreeColumn({
  title = "Versatile Designs",
  description = "Personalize the box to fit your requirements",
  cards,
  cardsSlot,
  className,
  containerClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  optixFlowConfig,
}: FeatureImageCardsThreeColumnProps): React.JSX.Element {
  const renderCards = () => {
    if (cardsSlot) return cardsSlot;
    if (!cards || cards.length === 0) return null;

    return cards.map((card, index) => {
      const imageAlt = card.imageAlt || (typeof card.title === "string" ? card.title : "Card image");

      const renderImage = () => {
        if (card.imageSlot) return card.imageSlot;
        if (card.imageSrc) {
          return (
            <Img
              src={card.imageSrc}
              alt={imageAlt}
              className="h-full max-h-[450px] w-full rounded-xl object-cover object-center"
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
          );
        }
        return null;
      };

      const renderBadgeIcon = () => {
        if (card.avatarSrc) {
          return (
            <Avatar className="size-7 rounded-full">
              <AvatarImage src={card.avatarSrc} alt="Avatar" />
            </Avatar>
          );
        }
        if (card.icon) return card.icon;
        return <DynamicIcon name={card.iconName || "lucide/zap"} size={24} />;
      };

      return (
        <Pressable
          key={index}
          href={card.link}
          onClick={card.onClick}
          className={cn("group relative overflow-hidden rounded-xl", cardClassName, card.className)}
        >
          {renderImage()}
          <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-20 rounded-xl bg-linear-to-t from-primary to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
          <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
            <span
              className={cn(
                "ml-auto flex w-fit items-center gap-2 text-sm font-semibold",
                card.avatarSrc
                  ? "rounded-full bg-background/30 px-4 py-2.5 backdrop-blur-sm"
                  : "rounded-full bg-primary px-4 py-2.5 text-background",
                card.badgeClassName
              )}
            >
              {renderBadgeIcon()}
              {card.badgeText}
            </span>
            <div className="flex flex-col gap-5 text-background">
              {card.title && (
                typeof card.title === "string" ? (
                  <h4 className={cn("text-2xl font-semibold lg:text-3xl", card.titleClassName)}>
                    {card.title}
                  </h4>
                ) : (
                  <div className={cn("text-2xl font-semibold lg:text-3xl", card.titleClassName)}>
                    {card.title}
                  </div>
                )
              )}
              {card.linkText && (
                <p className={cn("flex items-center gap-1 font-medium", card.linkClassName)}>
                  {card.linkText}
                  <DynamicIcon name="lucide/chevron-right" size={16} />
                </p>
              )}
            </div>
          </div>
        </Pressable>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {title && (
          typeof title === "string" ? (
            <h1 className={cn("mb-4 text-center text-4xl font-semibold", titleClassName)}>{title}</h1>
          ) : (
            <div className={cn("mb-4 text-center text-4xl font-semibold", titleClassName)}>{title}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("text-center text-muted-foreground", descriptionClassName)}>{description}</p>
          ) : (
            <div className={cn("text-center text-muted-foreground", descriptionClassName)}>{description}</div>
          )
        )}
        <div className={cn("grid gap-5 pt-14 xl:grid-cols-3", gridClassName)}>
          {renderCards()}
        </div>
      </div>
    </section>
  );
}
