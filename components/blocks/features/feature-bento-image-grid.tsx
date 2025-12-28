"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureBentoImageGridItem {
  /**
   * Icon name in format: prefix/name (e.g., "lucide/atom")
   */
  icon: string;
  /**
   * Icon badge text
   */
  iconBadge: string;
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
  /**
   * Card size variant
   */
  size?: "large" | "small";
}

export interface FeatureBentoImageGridProps {
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Array of grid items
   */
  items?: FeatureBentoImageGridItem[];
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
 * Feature Bento Image Grid - Asymmetric bento-style grid with large and small
 * image cards featuring gradient overlays and CTAs.
 *
 * Layout: Bento grid with one large card and two smaller cards.
 * Key features: Gradient overlays, icon badges, hover animations, responsive layout.
 * Best for: Feature highlights, portfolio showcases, product categories.
 *
 * @example
 * ```tsx
 * <FeatureBentoImageGrid
 *   title="Dynamic Layouts"
 *   description="Adapt the box to suit any purpose"
 *   items={[
 *     {
 *       icon: "lucide/atom",
 *       iconBadge: "Sustainability Focus",
 *       title: "Build stunning websites with ease",
 *       linkText: "Get started today",
 *       link: "/start",
 *       imageSrc: "/feature.jpg",
 *       imageAlt: "Feature",
 *       size: "large"
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureBentoImageGrid({
  title = "Dynamic Layouts",
  description = "Adapt the box to suit any purpose",
  items = [
    {
      icon: "lucide/atom",
      iconBadge: "Sustainability Focus",
      title: "Build stunning websites with ease",
      linkText: "Get started today",
      link: "#",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder1,
      imageAlt: "Feature illustration",
      size: "large" as const,
    },
    {
      icon: "lucide/settings",
      iconBadge: "Options",
      title: "Explore now",
      linkText: "Explore all features",
      link: "#",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholderDark1,
      imageAlt: "Feature illustration",
      size: "small" as const,
    },
    {
      icon: "lucide/zap",
      iconBadge: "Latest Collection",
      title: "Redefine your industry leadership.",
      linkText: "Shop now",
      link: "#",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder3,
      imageAlt: "Feature illustration",
      size: "small" as const,
    },
  ],
  className,
  optixFlowConfig,
}: FeatureBentoImageGridProps) {
  const largeItem = items.find((item) => item.size === "large") || items[0];
  const smallItems = items.filter((item) => item.size !== "large").slice(0, 2);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {title && (
          <h1 className="mb-4 text-center text-4xl font-semibold">{title}</h1>
        )}
        {description && (
          <p className="text-center text-muted-foreground">{description}</p>
        )}
        <div className="grid grid-cols-1 gap-y-5 pt-14 xl:grid-cols-3 xl:grid-rows-2 xl:gap-x-5 xl:gap-y-0">
          <Pressable
            href={largeItem.link}
            className="group relative col-span-2 row-span-3 overflow-hidden rounded-xl"
          >
            <Img
              src={largeItem.imageSrc}
              alt={largeItem.imageAlt}
              className="h-full max-h-[580px] w-full rounded-xl object-cover object-center"
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-20 rounded-xl bg-gradient-to-t from-primary to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
            <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
              <span className="ml-auto flex w-fit items-center gap-1 p-2.5 text-sm font-semibold text-background">
                <DynamicIcon name={largeItem.icon} size={24} />
                {largeItem.iconBadge}
              </span>
              <div className="flex flex-col gap-5 text-background">
                <h4 className="text-2xl font-semibold lg:text-3xl">
                  {largeItem.title}
                </h4>
                <p className="flex items-center gap-1 font-medium">
                  {largeItem.linkText}
                  <DynamicIcon name="lucide/chevron-right" size={16} />
                </p>
              </div>
            </div>
          </Pressable>
          <div className="grid gap-y-5 xl:row-span-2">
            {smallItems.map((item, index) => (
              <Pressable
                key={index}
                href={item.link}
                className={cn(
                  "group relative overflow-hidden rounded-xl",
                  index === 1 && "row-span-2"
                )}
              >
                <Img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className={cn(
                    "h-full w-full rounded-xl object-cover object-center",
                    index === 0 ? "max-h-44" : "max-h-96"
                  )}
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-10 rounded-xl bg-gradient-to-t from-primary to-transparent opacity-80 transition-transform duration-300 group-hover:translate-y-0"></div>
                <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
                  <span className="ml-auto flex w-fit items-center gap-1 p-2.5 text-sm font-semibold text-background">
                    <DynamicIcon name={item.icon} size={24} />
                    {item.iconBadge}
                  </span>
                  <div className="flex flex-col gap-5 text-background">
                    <h4 className="text-2xl font-semibold lg:text-3xl">
                      {item.title}
                    </h4>
                    <p className="flex items-center gap-1 font-medium">
                      {item.linkText}
                      <DynamicIcon name="lucide/chevron-right" size={16} />
                    </p>
                  </div>
                </div>
              </Pressable>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
