"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { OptixFlowConfig } from "../../../src/types";

export interface FeatureBentoImageGridItem {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/atom")
   */
  iconName?: string;
  /**
   * Icon badge content
   */
  iconBadge?: React.ReactNode;
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
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Custom image slot (overrides imageSrc)
   */
  imageSlot?: React.ReactNode;
  /**
   * Card size variant
   */
  size?: "large" | "small";
  /**
   * Additional CSS classes for the item
   */
  className?: string;
  /**
   * Additional CSS classes for the icon badge
   */
  iconBadgeClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the link text
   */
  linkTextClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface FeatureBentoImageGridProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of grid items
   */
  items?: FeatureBentoImageGridItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
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
   * Additional CSS classes for the large card
   */
  largeCardClassName?: string;
  /**
   * Additional CSS classes for small cards
   */
  smallCardClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultItems: FeatureBentoImageGridItem[] = [
  {
    iconName: "lucide/atom",
    iconBadge: "Sustainability Focus",
    title: "Build stunning websites with ease",
    linkText: "Get started today",
    link: "#",
    imageSrc: blockBrandedIconsAndPlaceholders.placeholder1,
    imageAlt: "Feature illustration",
    size: "large" as const,
  },
  {
    iconName: "lucide/settings",
    iconBadge: "Options",
    title: "Explore now",
    linkText: "Explore all features",
    link: "#",
    imageSrc: blockBrandedIconsAndPlaceholders.placeholderDark1,
    imageAlt: "Feature illustration",
    size: "small" as const,
  },
  {
    iconName: "lucide/zap",
    iconBadge: "Latest Collection",
    title: "Redefine your industry leadership.",
    linkText: "Shop now",
    link: "#",
    imageSrc: blockBrandedIconsAndPlaceholders.placeholder3,
    imageAlt: "Feature illustration",
    size: "small" as const,
  },
];

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
 *       iconName: "lucide/atom",
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
  items = defaultItems,
  itemsSlot,
  className,
  containerClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  largeCardClassName,
  smallCardClassName,
  optixFlowConfig,
}: FeatureBentoImageGridProps): React.JSX.Element {
  const renderItemIcon = (item: FeatureBentoImageGridItem) => {
    if (item.icon) return item.icon;
    if (item.iconName) return <DynamicIcon name={item.iconName} size={24} />;
    return null;
  };

  const renderItemImage = (item: FeatureBentoImageGridItem, imageClassName?: string) => {
    if (item.imageSlot) return item.imageSlot;
    if (item.imageSrc) {
      return (
        <Img
          src={item.imageSrc}
          alt={item.imageAlt || (typeof item.title === "string" ? item.title : "Feature image")}
          className={cn(imageClassName, item.imageClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      );
    }
    return null;
  };

  const renderLargeCard = (item: FeatureBentoImageGridItem) => {
    const cardContent = (
      <>
        {renderItemImage(item, "h-full max-h-[580px] w-full rounded-xl object-cover object-center")}
        <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-20 rounded-xl bg-linear-to-t from-primary to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
        <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
          <span className={cn("ml-auto flex w-fit items-center gap-1 p-2.5 text-sm font-semibold text-background", item.iconBadgeClassName)}>
            {renderItemIcon(item)}
            {item.iconBadge}
          </span>
          <div className="flex flex-col gap-5 text-background">
            {item.title && (
              typeof item.title === "string" ? (
                <h4 className={cn("text-2xl font-semibold lg:text-3xl", item.titleClassName)}>
                  {item.title}
                </h4>
              ) : (
                <div className={cn("text-2xl font-semibold lg:text-3xl", item.titleClassName)}>
                  {item.title}
                </div>
              )
            )}
            {item.linkText && (
              <p className={cn("flex items-center gap-1 font-medium", item.linkTextClassName)}>
                {item.linkText}
                <DynamicIcon name="lucide/chevron-right" size={16} />
              </p>
            )}
          </div>
        </div>
      </>
    );

    if (item.link) {
      return (
        <Pressable
          href={item.link}
          className={cn("group relative col-span-2 row-span-3 overflow-hidden rounded-xl", largeCardClassName, item.className)}
        >
          {cardContent}
        </Pressable>
      );
    }

    return (
      <div className={cn("group relative col-span-2 row-span-3 overflow-hidden rounded-xl", largeCardClassName, item.className)}>
        {cardContent}
      </div>
    );
  };

  const renderSmallCard = (item: FeatureBentoImageGridItem, index: number) => {
    const cardContent = (
      <>
        {renderItemImage(item, cn(
          "h-full w-full rounded-xl object-cover object-center",
          index === 0 ? "max-h-44" : "max-h-96"
        ))}
        <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-10 rounded-xl bg-linear-to-t from-primary to-transparent opacity-80 transition-transform duration-300 group-hover:translate-y-0"></div>
        <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
          <span className={cn("ml-auto flex w-fit items-center gap-1 p-2.5 text-sm font-semibold text-background", item.iconBadgeClassName)}>
            {renderItemIcon(item)}
            {item.iconBadge}
          </span>
          <div className="flex flex-col gap-5 text-background">
            {item.title && (
              typeof item.title === "string" ? (
                <h4 className={cn("text-2xl font-semibold lg:text-3xl", item.titleClassName)}>
                  {item.title}
                </h4>
              ) : (
                <div className={cn("text-2xl font-semibold lg:text-3xl", item.titleClassName)}>
                  {item.title}
                </div>
              )
            )}
            {item.linkText && (
              <p className={cn("flex items-center gap-1 font-medium", item.linkTextClassName)}>
                {item.linkText}
                <DynamicIcon name="lucide/chevron-right" size={16} />
              </p>
            )}
          </div>
        </div>
      </>
    );

    if (item.link) {
      return (
        <Pressable
          key={index}
          href={item.link}
          className={cn(
            "group relative overflow-hidden rounded-xl",
            index === 1 && "row-span-2",
            smallCardClassName,
            item.className
          )}
        >
          {cardContent}
        </Pressable>
      );
    }

    return (
      <div
        key={index}
        className={cn(
          "group relative overflow-hidden rounded-xl",
          index === 1 && "row-span-2",
          smallCardClassName,
          item.className
        )}
      >
        {cardContent}
      </div>
    );
  };

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    const largeItem = items.find((item) => item.size === "large") || items[0];
    const smallItems = items.filter((item) => item.size !== "large").slice(0, 2);

    return (
      <>
        {renderLargeCard(largeItem)}
        <div className="grid gap-y-5 xl:row-span-2">
          {smallItems.map((item, index) => renderSmallCard(item, index))}
        </div>
      </>
    );
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
        <div className={cn("grid grid-cols-1 gap-y-5 pt-14 xl:grid-cols-3 xl:grid-rows-2 xl:gap-x-5 xl:gap-y-0", gridClassName)}>
          {renderItems()}
        </div>
      </div>
    </section>
  );
}
