"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface MediaHoverCtaItem {
  /**
   * Content to render inside the CTA card.
   */
  content?: React.ReactNode;
  /**
   * Image URL to reveal on hover (optional).
   */
  onHoverImgSrc?: string;
  /**
   * Additional classes for the hover image.
   */
  imgHoverClassName?: string;
  /**
   * Alt text for the hover image (leave empty for decorative images).
   */
  altText?: string;
  /**
   * Optional href to make the card a link.
   */
  cardHref?: string;
  /**
   * Initial background color (CSS color value or CSS variable).
   * Example: "#111" or "var(--brand-900)".
   */
  initialBackgroundColor?: string;
  /**
   * Hover background color (CSS color value or CSS variable).
   * Applied only when onHoverImgSrc is not provided.
   */
  onHoverBackgroundColor?: string;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export type MediaHoverCtaType = MediaHoverCtaItem;

export interface MediaHoverCtasProps {
  /**
   * Additional classes for the section wrapper.
   */
  className?: string;
  /**
   * Additional classes for the grid container.
   */
  gridClassName?: string;
  /**
   * CTA items to render.
   */
  items?: MediaHoverCtaItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Optional Optix Flow configuration for @page-speed/img.
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  /**
   * @deprecated Use className instead
   */
  sectionClassName?: string;
}

/**
 * MediaHoverCtas displays a two-column CTA grid with hover media reveals.
 *
 * Each card can show a hover image or a hover background color while keeping
 * content customizable via React nodes.
 *
 * @example
 * ```tsx
 * <MediaHoverCtas
 *   items={[
 *     {
 *       content: <div><h3>Our Mission</h3><p>...</p></div>,
 *       onHoverImgSrc: "/mission.jpg",
 *       altText: "Our Mission"
 *     },
 *     {
 *       content: <div><h3>Our Vision</h3><p>...</p></div>,
 *       initialBackgroundColor: "var(--brand-100)",
 *       onHoverBackgroundColor: "var(--brand-900)"
 *     }
 *   ]}
 * />
 * ```
 */
export function MediaHoverCtas({
  className,
  sectionClassName,
  gridClassName,
  items,
  itemsSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: MediaHoverCtasProps): React.JSX.Element {
  const resolvedItems = items ?? [];

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;

    return resolvedItems.map((item, index) => {
      const CardComponent: React.ElementType = item.cardHref ? "a" : "div";
      const hasHoverImage = Boolean(item.onHoverImgSrc);
      const applyHoverBackground = Boolean(
        item.onHoverBackgroundColor && !hasHoverImage
      );
      const cardStyle =
        item.initialBackgroundColor || applyHoverBackground
          ? ({
              ...(item.initialBackgroundColor
                ? { "--media-hover-cta-bg": item.initialBackgroundColor }
                : {}),
              ...(applyHoverBackground
                ? {
                    "--media-hover-cta-hover-bg": item.onHoverBackgroundColor,
                  }
                : {}),
            } as React.CSSProperties)
          : undefined;
      const baseBackgroundClassName = item.initialBackgroundColor
        ? "bg-[var(--media-hover-cta-bg)]"
        : "bg-muted-foreground/10";
      const hoverBackgroundClassName = applyHoverBackground
        ? "group-hover:bg-[var(--media-hover-cta-hover-bg)]"
        : "";
      const hoverImageAltText = item.altText ?? "";

      return (
        <CardComponent
          key={index}
          {...(item.cardHref ? { href: item.cardHref } : {})}
          className={cn(
            "group relative flex min-h-100 cursor-pointer items-center overflow-hidden justify-start p-10 transition-colors duration-500",
            index % 2 === 0 ? "md:justify-center" : "md:justify-start md:pl-24",
            baseBackgroundClassName,
            hoverBackgroundClassName,
            item.className
          )}
          style={cardStyle}
        >
          {item.onHoverImgSrc ? (
            <Img
              src={item.onHoverImgSrc}
              alt={hoverImageAltText}
              aria-hidden={item.altText ? undefined : true}
              className={cn(
                "absolute top-0 left-0 z-[-1] h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                item.imgHoverClassName
              )}
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
          ) : null}

          {item.content}
        </CardComponent>
      );
    });
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className, sectionClassName)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div
        className={cn(
          "grid min-h-100 grid-cols-1 gap-1 lg:grid-cols-2",
          gridClassName
        )}
      >
        {renderItems()}
      </div>
    </Section>
  );
}
