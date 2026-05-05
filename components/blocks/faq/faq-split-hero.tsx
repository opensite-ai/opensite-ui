"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Video } from "@page-speed/video";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import type { PatternName } from "../../ui/pattern-background";
import { Section } from "../../ui/section";
import type {
  DirectionConfig,
  MediaItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { useResponsiveLayout } from "@/lib/useResponsiveLayout";

export type { DirectionConfig };

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
   * Media item configuration for image and/or video rendering.
   */
  mediaItem?: MediaItem;
  /**
   * Custom slot for rendering the media section (overrides mediaItem)
   */
  mediaSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section.
   * Defaults to "none" since this block manages its own internal spacing.
   * @default "none"
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
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Direction configuration for desktop and mobile layouts
   * @default { desktop: 'mediaRight', mobile: 'mediaTop' }
   */
  directionConfig?: DirectionConfig;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function FaqSplitHero({
  sectionId = "faq-split-hero",
  heading,
  subheading,
  items,
  itemsSlot,
  mediaItem,
  mediaSlot,
  containerClassName = "px-0 sm:px-0 lg:px-0",
  background,
  spacing = "none",
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
  optixFlowConfig,
  directionConfig = { desktop: "mediaRight", mobile: "mediaTop" },
}: FaqSplitHeroProps): React.JSX.Element {
  const { responsiveClassName } = useResponsiveLayout({ directionConfig });

  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <Accordion
        type="single"
        collapsible
        className={cn("w-full", accordionClassName)}
      >
        {items.map((item, idx: number) => (
          <AccordionItem
            key={item.id || idx}
            value={item.id || `faq-item-${idx}`}
            className={cn("border-b border-current/20", accordionItemClassName)}
          >
            <AccordionTrigger
              className={cn(
                "font-semibold text-lg",
                "py-4 transition-opacity",
                "hover:opacity-70 hover:no-underline",
                accordionTriggerClassName,
              )}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className={cn("pb-4 text-base", accordionContentClassName)}
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

  const renderMedia = useMemo(() => {
    if (!mediaItem) return null;

    const { image, video } = mediaItem;

    // Video takes priority when provided
    if (video) {
      const { src, className: videoClassName, ...videoRest } = video;
      return (
        <Video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className={cn("h-full w-full object-cover", videoClassName)}
          {...videoRest}
        />
      );
    }

    if (image) {
      const { src, alt, className: imgClassName, ...imgRest } = image;
      return (
        <Img
          src={src as string}
          alt={alt || "FAQ section image"}
          className={cn("h-full w-full object-cover", imgClassName)}
          optixFlowConfig={optixFlowConfig}
          {...imgRest}
        />
      );
    }

    return null;
  }, [mediaItem, optixFlowConfig]);

  const hasMedia = mediaSlot || mediaItem?.image || mediaItem?.video;

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("w-full overflow-hidden", className)}
      containerMaxWidth="full"
      containerClassName={containerClassName}
    >
      <div className={cn("flex min-h-screen", responsiveClassName)}>
        {/* Content Area */}
        <div
          className={cn(
            "relative flex w-full items-center lg:w-1/2",
            contentClassName,
          )}
        >
          <div className="relative z-10 w-full px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
            <div className="mx-auto max-w-xl space-y-8">
              {/* Header */}
              <div className={cn("space-y-4", headerClassName)}>
                {heading &&
                  (typeof heading === "string" ? (
                    <h2
                      className={cn(
                        "font-bold text-pretty",
                        "text-3xl md:text-4xl lg:text-5xl",
                        "leading-tight tracking-tight",
                        headingClassName,
                      )}
                    >
                      {heading}
                    </h2>
                  ) : (
                    heading
                  ))}
                {subheading &&
                  (typeof subheading === "string" ? (
                    <p
                      className={cn(
                        "text-base md:text-lg",
                        "text-pretty leading-relaxed",
                        "opacity-80",
                        subheadingClassName,
                      )}
                    >
                      {subheading}
                    </p>
                  ) : (
                    subheading
                  ))}
              </div>

              {/* FAQ Items */}
              {itemsContent}
            </div>
          </div>
        </div>

        {/* Media Area */}
        {hasMedia && (
          <div
            className={cn(
              "relative h-64 w-full sm:h-96 lg:h-screen lg:w-1/2",
              mediaItem?.containerClassName,
            )}
          >
            {mediaSlot || renderMedia}
          </div>
        )}
      </div>
    </Section>
  );
}
