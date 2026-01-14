"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import {
  imagePlaceholders,
  logoPlaceholders,
} from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { OptixFlowConfig } from "../../../src/types";

export interface CaseStudyImageGridItem {
  /**
   * Background image URL
   */
  image: string;
  /**
   * Company logo image URL
   */
  logo: string;
  /**
   * Case study title
   */
  title: React.ReactNode;
  /**
   * Link URL for the case study
   */
  href?: string;
  /**
   * Additional CSS classes for this item
   */
  className?: string;
}

export interface CaseStudiesImageGridProps {
  /**
   * Array of case study items to display
   */
  items?: CaseStudyImageGridItem[];
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
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each item card
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for the background image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the gradient overlay
   */
  overlayClassName?: string;
  /**
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * CaseStudiesImageGrid displays case studies in a responsive grid layout with
 * full-bleed background images, company logos, and hover zoom effects.
 *
 * Features a 2-column asymmetric grid where the first and fifth items span 2 rows,
 * creating visual hierarchy. Each card shows a gradient overlay, company logo at top,
 * and case study title at bottom. Ideal for showcasing client success stories,
 * portfolio highlights, or featured projects with strong visual impact.
 *
 * @example
 * ```tsx
 * <CaseStudiesImageGrid
 *   items={[
 *     {
 *       image: "/images/case-1.jpg",
 *       logo: "/logos/client-1.svg",
 *       title: "How we helped TechCorp increase conversions by 200%",
 *       href: "/case-studies/techcorp"
 *     }
 *   ]}
 * />
 * ```
 */
export function CaseStudiesImageGrid({
  items,
  itemsSlot,
  className,
  containerClassName,
  gridClassName,
  itemClassName,
  imageClassName,
  overlayClassName,
  logoClassName,
  titleClassName,
  optixFlowConfig,
}: CaseStudiesImageGridProps): React.JSX.Element {
  const getGridClass = (index: number) => {
    if (index === 0 || index === 4) {
      return "row-span-2 aspect-square lg:aspect-auto";
    }
    return "aspect-3/2 md:aspect-2/1";
  };

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, index) => (
      <Pressable
        key={index}
        href={item.href}
        className={cn(
          "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md lg:p-10",
          getGridClass(index),
          itemClassName,
          item.className
        )}
      >
        <Img
          src={item.image}
          alt={typeof item.title === "string" ? item.title : "Case study"}
          className={cn("absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105", imageClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
        <div className={cn("absolute inset-0 bg-linear-to-t from-black/80 to-black/10", overlayClassName)}></div>
        <Img
          src={item.logo}
          alt="Company logo"
          className={cn("isolate h-7 w-fit", logoClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
        {typeof item.title === "string" ? (
          <h2 className={cn("isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold", titleClassName)}>
            {item.title}
          </h2>
        ) : (
          <div className={titleClassName}>{item.title}</div>
        )}
      </Pressable>
    ));
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto grid max-w-2xl gap-6 lg:max-w-5xl lg:grid-cols-2", gridClassName)}>
          {renderItems()}
        </div>
      </div>
    </section>
  );
}
