"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import {
  PatternBackground,
  type PatternName,
} from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface DirectionConfig {
  desktop: "mediaRight" | "mediaLeft";
  mobile: "mediaTop" | "mediaBottom";
}

export interface FaqItem {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface FaqSplitHeroProps {
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Subheading/description text
   */
  subheading?: React.ReactNode;
  /**
   * Array of FAQ items
   */
  items?: FaqItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the image section
   */
  imageSlot?: React.ReactNode;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
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
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the accordion
   */
  accordionClassName?: string;
  /**
   * Additional CSS classes for accordion items
   */
  accordionItemClassName?: string;
  /**
   * Additional CSS classes for accordion triggers
   */
  accordionTriggerClassName?: string;
  /**
   * Additional CSS classes for accordion content
   */
  accordionContentClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Direction configuration for desktop and mobile layouts
   * @default { desktop: 'mediaRight', mobile: 'mediaTop' }
   */
  directionConfig?: DirectionConfig;
}

export function FaqSplitHero({
  heading,
  subheading,
  items,
  itemsSlot,
  imageSlot,
  imageSrc,
  imageAlt,
  background = "dark",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headerClassName,
  headingClassName,
  subheadingClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
  imageClassName,
  optixFlowConfig,
  directionConfig = { desktop: "mediaRight", mobile: "mediaTop" },
}: FaqSplitHeroProps): React.JSX.Element {
  // Determine background color based on background variant
  const bgColorClass = useMemo(() => {
    switch (background) {
      case "dark":
        return "bg-gray-900 text-white";
      case "gray":
        return "bg-gray-100 text-gray-900";
      case "white":
        return "bg-white text-gray-900";
      default:
        return "bg-background text-foreground";
    }
  }, [background]);

  // Determine flex direction based on directionConfig
  const desktopOrder =
    directionConfig.desktop === "mediaRight"
      ? "lg:flex-row"
      : "lg:flex-row-reverse";
  const mobileOrder =
    directionConfig.mobile === "mediaTop" ? "flex-col" : "flex-col-reverse";

  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <Accordion
        type="single"
        collapsible
        className={cn("w-full", accordionClassName)}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={cn("border-b border-current/20", accordionItemClassName)}
          >
            <AccordionTrigger
              className={cn(
                "py-4 text-left text-base font-medium transition-opacity hover:opacity-70 hover:no-underline lg:text-lg",
                accordionTriggerClassName,
              )}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className={cn("pb-4 opacity-80", accordionContentClassName)}
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }, [
    itemsSlot,
    items,
    accordionClassName,
    accordionItemClassName,
    accordionTriggerClassName,
    accordionContentClassName,
  ]);

  const contentArea = (
    <div
      className={cn(
        "relative flex w-full items-center lg:w-1/2",
        bgColorClass,
        contentClassName,
      )}
    >
      {/* Pattern Background */}
      {pattern && (
        <div className="absolute inset-0 overflow-hidden">
          <PatternBackground pattern={pattern} opacity={patternOpacity} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
        <div className="mx-auto max-w-xl space-y-8">
          {/* Header */}
          <div className={cn("space-y-4", headerClassName)}>
            {heading &&
              (typeof heading === "string" ? (
                <h2
                  className={cn(
                    "text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : (
                <div className={headingClassName}>{heading}</div>
              ))}
            {subheading &&
              (typeof subheading === "string" ? (
                <p
                  className={cn(
                    "text-base leading-relaxed opacity-80 sm:text-lg",
                    subheadingClassName,
                  )}
                >
                  {subheading}
                </p>
              ) : (
                <div className={subheadingClassName}>{subheading}</div>
              ))}
          </div>

          {/* FAQ Items */}
          {itemsContent}
        </div>
      </div>
    </div>
  );

  const imageArea = imageSlot ? (
    <div className="relative h-64 w-full sm:h-96 lg:h-auto lg:w-1/2">
      {imageSlot}
    </div>
  ) : imageSrc ? (
    <div className="relative h-64 w-full sm:h-96 lg:h-auto lg:w-1/2">
      <Img
        src={imageSrc}
        alt={imageAlt || "FAQ section image"}
        className={cn("h-full w-full object-cover", imageClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    </div>
  ) : null;

  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      <div className={cn("flex min-h-screen", mobileOrder, desktopOrder)}>
        {contentArea}
        {imageArea}
      </div>
    </section>
  );
}
