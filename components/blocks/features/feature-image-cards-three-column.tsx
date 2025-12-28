"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureImageCardsThreeColumnItem {
  /**
   * Icon name in format: prefix/name (e.g., "lucide/zap")
   */
  icon?: string;
  /**
   * Avatar image URL (alternative to icon)
   */
  avatarSrc?: string;
  /**
   * Badge text
   */
  badgeText: string;
  /**
   * Card title
   */
  title: string;
  /**
   * Link text
   */
  linkText: string;
  /**
   * Link URL
   */
  link: string;
  /**
   * Image source URL
   */
  imageSrc: string;
  /**
   * Image alt text
   */
  imageAlt: string;
}

export interface FeatureImageCardsThreeColumnProps {
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Array of card items
   */
  cards?: FeatureImageCardsThreeColumnItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
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
 *       icon: "lucide/zap",
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
  cards = [
    {
      icon: "lucide/zap",
      badgeText: "Advanced tools",
      title: "Transform your website into a market leader.",
      linkText: "Explore all features",
      link: "#",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder1,
      imageAlt: "Feature illustration",
    },
    {
      avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
      badgeText: "Tailored for experts",
      title: "Elevate your platform to the next level.",
      linkText: "Explore all features",
      link: "#",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholderDark1,
      imageAlt: "Feature illustration",
    },
    {
      icon: "lucide/zap",
      badgeText: "Latest Collection",
      title: "Redefine your industry leadership.",
      linkText: "Explore all features",
      link: "#",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder3,
      imageAlt: "Feature illustration",
    },
  ],
  className,
  optixFlowConfig,
}: FeatureImageCardsThreeColumnProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {title && (
          <h1 className="mb-4 text-center text-4xl font-semibold">{title}</h1>
        )}
        {description && (
          <p className="text-center text-muted-foreground">{description}</p>
        )}
        <div className="grid gap-5 pt-14 xl:grid-cols-3">
          {cards.map((card, index) => (
            <Pressable
              key={index}
              href={card.link}
              className="group relative overflow-hidden rounded-xl"
            >
              <Img
                src={card.imageSrc}
                alt={card.imageAlt}
                className="h-full max-h-[450px] w-full rounded-xl object-cover object-center"
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-20 rounded-xl bg-linear-to-t from-primary to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
              <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
                <span
                  className={cn(
                    "ml-auto flex w-fit items-center gap-2 text-sm font-semibold",
                    card.avatarSrc
                      ? "rounded-full bg-background/30 px-4 py-2.5 backdrop-blur-sm"
                      : "rounded-full bg-primary px-4 py-2.5 text-background"
                  )}
                >
                  {card.avatarSrc ? (
                    <Avatar className="size-7 rounded-full">
                      <AvatarImage src={card.avatarSrc} alt="Avatar" />
                    </Avatar>
                  ) : (
                    <DynamicIcon name={card.icon || "lucide/zap"} size={24} />
                  )}
                  {card.badgeText}
                </span>
                <div className="flex flex-col gap-5 text-background">
                  <h4 className="text-2xl font-semibold lg:text-3xl">
                    {card.title}
                  </h4>
                  <p className="flex items-center gap-1 font-medium">
                    {card.linkText}
                    <DynamicIcon name="lucide/chevron-right" size={16} />
                  </p>
                </div>
              </div>
            </Pressable>
          ))}
        </div>
      </div>
    </section>
  );
}
