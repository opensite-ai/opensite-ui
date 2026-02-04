"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor } from "../../../lib/utils";
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
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureAccordionImageProps): React.JSX.Element {
  const [activeItem, setActiveItem] = React.useState(defaultValue || "item-0");
  const activeIndex = parseInt(activeItem.replace("item-", ""), 10) || 0;
  const currentImage = items?.[activeIndex] || items?.[0];

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
              "text-left text-lg font-medium",
              item.triggerClassName,
            )}
          >
            {item.title}
          </AccordionTrigger>
        )}
        {item.content && (
          <AccordionContent
            className={cn(
              getTextColor(background, "muted"),
              item.contentClassName,
            )}
          >
            {item.content}
          </AccordionContent>
        )}
      </AccordionItem>
    ));
  }, [itemsSlot, items]);

  const imageContent = useMemo(() => {
    if (currentImage?.imageSlot) return currentImage.imageSlot;
    if (!currentImage?.imageSrc) return null;

    return (
      <Img
        src={currentImage.imageSrc}
        alt={currentImage.imageAlt || ""}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          imageClassName,
        )}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [currentImage, imageClassName, optixFlowConfig]);

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
      <div className="flex flex-col space-y-6 md:space-y-16">
        {(title || description) && (
          <div
            className={cn(
              "text-center max-w-full md:max-w-md text-balance",
              headerClassName,
            )}
          >
            {title &&
              (typeof title === "string" ? (
                <h2
                  className={cn(
                    "text-xl font-semibold md:text-2xl lg:text-3xl",
                    titleClassName,
                  )}
                >
                  {title}
                </h2>
              ) : (
                <div
                  className={cn(
                    "text-xl font-semibold md:text-2xl lg:text-3xl",
                    titleClassName,
                  )}
                >
                  {title}
                </div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p className={cn("mt-4 lg:text-lg", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={cn("mt-4 lg:text-lg", descriptionClassName)}>
                  {description}
                </div>
              ))}
          </div>
        )}
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
