"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Badge } from "@/src";

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
  /** Optional Section ID */
  sectionId?: string;
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
  sectionId = "feature-bento-image-grid",
  title,
  description,
  items,
  itemsSlot,
  className,
  titleClassName,
  descriptionClassName,
  gridClassName,
  largeCardClassName,
  smallCardClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureBentoImageGridProps): React.JSX.Element {
  const renderItemIcon = React.useCallback(
    (item: FeatureBentoImageGridItem) => {
      if (item.icon) return item.icon;
      if (item.iconName) return <DynamicIcon name={item.iconName} size={24} />;
      return null;
    },
    [],
  );

  const renderItemImage = React.useCallback(
    (item: FeatureBentoImageGridItem, imageClassName?: string) => {
      if (item.imageSlot) return item.imageSlot;
      if (item.imageSrc) {
        return (
          <Img
            src={item.imageSrc}
            alt={
              item.imageAlt ||
              (typeof item.title === "string" ? item.title : "Feature image")
            }
            className={cn(imageClassName, item.imageClassName)}
            loading="eager"
            optixFlowConfig={optixFlowConfig}
          />
        );
      }
      return null;
    },
    [optixFlowConfig],
  );

  const renderLargeCard = React.useCallback(
    (item: FeatureBentoImageGridItem) => {
      const iconContent = renderItemIcon(item);
      const hasIconBadgeContent = iconContent || item.iconBadge;

      const cardContent = (
        <>
          {renderItemImage(
            item,
            "h-full w-full rounded-xl object-cover object-center shadow-lg",
          )}
          <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-10 rounded-xl bg-linear-to-t from-black to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
          <div className="absolute top-0 flex h-full w-full flex-col justify-between px-5 md:px-8 py-6 md:py-6">
            {hasIconBadgeContent && (
              <span
                className={cn(
                  "ml-auto flex w-fit items-center gap-2 p-0 text-sm font-semibold text-white",
                  item.iconBadgeClassName,
                )}
              >
                {iconContent}
                {item.iconBadge}
              </span>
            )}
            <div className="flex flex-col gap-2 md:gap-4 text-white text-shadow-lg">
              {item.title &&
                (typeof item.title === "string" ? (
                  <h4
                    className={cn(
                      "text-2xl font-semibold lg:text-3xl",
                      item.titleClassName,
                    )}
                  >
                    {item.title}
                  </h4>
                ) : (
                  item.title
                ))}
              {item.linkText && (
                <p
                  className={cn(
                    "flex items-center gap-1 font-bold text-sm uppercase",
                    item.linkTextClassName,
                  )}
                >
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
            className={cn(
              "group relative h-[22rem] overflow-hidden rounded-xl xl:col-span-2 xl:h-[580px]",
              largeCardClassName,
              item.className,
            )}
          >
            {cardContent}
          </Pressable>
        );
      }

      return (
        <div
          className={cn(
            "group relative h-[22rem] overflow-hidden rounded-xl xl:col-span-2 xl:h-[580px]",
            largeCardClassName,
            item.className,
          )}
        >
          {cardContent}
        </div>
      );
    },
    [largeCardClassName, renderItemImage, renderItemIcon],
  );

  const renderSmallCard = React.useCallback(
    (item: FeatureBentoImageGridItem, index: number) => {
      const iconContent = renderItemIcon(item);
      const hasIconBadgeContent = iconContent || item.iconBadge;

      const cardContent = (
        <>
          {renderItemImage(
            item,
            cn("h-full w-full rounded-xl object-cover object-center shadow-lg"),
          )}
          <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-10 rounded-xl bg-linear-to-t from-black to-transparent opacity-80 transition-transform duration-300 group-hover:translate-y-0"></div>
          <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
            {hasIconBadgeContent && (
              <Badge className={cn("px-2 py-1", item.iconBadgeClassName)}>
                {iconContent}
                {item.iconBadge}
              </Badge>
            )}
            <div className="flex flex-col gap-0 text-white text-shadow-lg">
              {item.title &&
                (typeof item.title === "string" ? (
                  <h4
                    className={cn(
                      "text-xl font-semibold lg:text-2xl",
                      item.titleClassName,
                    )}
                  >
                    {item.title}
                  </h4>
                ) : (
                  item.title
                ))}
              {item.linkText && (
                <p
                  className={cn(
                    "flex items-center gap-1 font-medium",
                    item.linkTextClassName,
                  )}
                >
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
              index === 0 ? "h-56 xl:h-44" : "h-72 xl:h-96",
              smallCardClassName,
              item.className,
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
            index === 0 ? "h-56 xl:h-44" : "h-72 xl:h-96",
            smallCardClassName,
            item.className,
          )}
        >
          {cardContent}
        </div>
      );
    },
    [smallCardClassName, renderItemImage, renderItemIcon],
  );

  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    const largeItem = items.find((item) => item.size === "large") || items[0];
    const smallItems = items
      .filter((item) => item.size !== "large")
      .slice(0, 2);

    return (
      <>
        {renderLargeCard(largeItem)}
        <div className="grid gap-y-5">
          {smallItems.map((item, index) => renderSmallCard(item, index))}
        </div>
      </>
    );
  }, [itemsSlot, items, renderLargeCard, renderSmallCard]);

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
      {title &&
        (typeof title === "string" ? (
          <h2
            className={cn(
              "mb-4 text-center text-4xl font-semibold text-balance",
              titleClassName,
            )}
          >
            {title}
          </h2>
        ) : (
          title
        ))}
      {description &&
        (typeof description === "string" ? (
          <p className={cn("text-center text-balance", descriptionClassName)}>
            {description}
          </p>
        ) : (
          description
        ))}
      <div
        className={cn(
          "grid grid-cols-1 gap-y-5 pt-14 xl:grid-cols-3 xl:gap-x-5 xl:gap-y-0",
          gridClassName,
        )}
      >
        {itemsContent}
      </div>
    </Section>
  );
}
