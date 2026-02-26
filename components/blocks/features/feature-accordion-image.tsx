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
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";

export interface FeatureAccordionImageItem {
  /**
   * Accordion item title
   */
  title?: React.ReactNode;
  /**
   * Accordion item content
   */
  content?: React.ReactNode;
  /**
   * Image source URL for this item
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Image element or ReactNode (overrides imageSrc)
   */
  imageSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the accordion item
   */
  className?: string;
  /**
   * Additional CSS classes for the trigger
   */
  triggerClassName?: string;
  /**
   * Additional CSS classes for the content
   */
  contentClassName?: string;
}

export interface FeatureAccordionImageProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of accordion items
   */
  items?: FeatureAccordionImageItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Default open item value
   */
  defaultValue?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the grid wrapper
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the accordion
   */
  accordionClassName?: string;
  /**
   * Additional CSS classes for the image wrapper
   */
  imageWrapperClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
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
}

/**
 * Feature Accordion Image - Accordion-based feature display with images that
 * change based on the selected accordion item.
 *
 * Layout: Two-column layout with accordion on left, dynamic image on right.
 * Key features: Accordion navigation, dynamic images, smooth transitions.
 * Best for: Feature explanations, product tours, FAQ with visuals.
 *
 * @example
 * ```tsx
 * <FeatureAccordionImage
 *   title="How It Works"
 *   description="Learn about our process"
 *   items={[
 *     {
 *       title: "Step 1: Sign Up",
 *       content: "Create your account in minutes.",
 *       imageSrc: "/step1.jpg",
 *       imageAlt: "Sign up process"
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureAccordionImage({
  title,
  description,
  items,
  itemsSlot,
  defaultValue,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  accordionClassName,
  imageWrapperClassName,
  imageClassName,
  optixFlowConfig,
  background,
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureAccordionImageProps): React.JSX.Element {
  const [activeItem, setActiveItem] = React.useState(defaultValue || "item-0");
  const activeIndex = parseInt(activeItem.replace("item-", ""), 10) || 0;

  const accordionItemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, index) => (
      <AccordionItem
        key={index}
        value={`item-${index}`}
        className={item.className}
      >
        {item.title && (
          <AccordionTrigger
            className={cn(
              "text-left md:text-lg font-medium",
              item.triggerClassName,
            )}
          >
            {item.title}
          </AccordionTrigger>
        )}
        {item.content && (
          <AccordionContent className={cn(item.contentClassName)}>
            {item.content}
          </AccordionContent>
        )}
      </AccordionItem>
    ));
  }, [itemsSlot, items]);

  const imageContent = useMemo(() => {
    if (!items || items.length === 0) return null;

    // Check if any item uses imageSlot - if so, fall back to single image mode
    const hasImageSlot = items.some((item) => item.imageSlot);
    if (hasImageSlot) {
      const current = items[activeIndex] || items[0];
      if (current?.imageSlot) return current.imageSlot;
      if (!current?.imageSrc) return null;
      return (
        <Img
          src={current.imageSrc}
          alt={current.imageAlt || "Feature Image"}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            imageClassName,
          )}
          loading="eager"
          optixFlowConfig={optixFlowConfig}
        />
      );
    }

    // Render all images stacked for smooth crossfade transitions
    return items.map((item, index) => {
      if (!item.imageSrc) return null;
      const isActive = index === activeIndex;
      return (
        <Img
          key={index}
          src={item.imageSrc}
          alt={item.imageAlt || "Feature Image"}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out",
            isActive ? "opacity-100" : "opacity-0",
            imageClassName,
          )}
          loading="eager"
          optixFlowConfig={optixFlowConfig}
        />
      );
    });
  }, [items, activeIndex, imageClassName, optixFlowConfig]);

  const contentItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (title) {
      if (typeof title === "string") {
        items.push({
          _type: "text",
          as: "h2",
          className: cn(
            "text-2xl font-semibold md:text-3xl lg:text-4xl",
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
          className: cn("text-lg opacity-70", descriptionClassName),
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
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col items-center space-y-6 md:space-y-16">
        <ContentGroup
          items={contentItems}
          className={cn(
            "text-left md:text-center max-w-full md:max-w-md text-balance",
            headerClassName,
          )}
        />

        {(itemsSlot || (items && items.length > 0)) && (
          <div
            className={cn(
              "grid gap-10 lg:grid-cols-2 lg:gap-16",
              gridClassName,
            )}
          >
            <Accordion
              type="single"
              collapsible
              value={activeItem}
              onValueChange={setActiveItem}
              className={cn("w-full", accordionClassName)}
            >
              {accordionItemsContent}
            </Accordion>
            <div
              className={cn(
                "relative aspect-video overflow-hidden rounded-xl shadow-xl lg:aspect-square",
                imageWrapperClassName,
              )}
            >
              {imageContent}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
