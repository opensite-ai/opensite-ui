"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface FeatureChecklistThreeColumnCheckItem {
  /**
   * Checklist item content
   */
  content?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface FeatureChecklistThreeColumnCard {
  /**
   * Card title content
   */
  title?: React.ReactNode;
  /**
   * Card description content
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  image?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Custom image slot (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Array of checklist items
   */
  checklistItems?: (string | FeatureChecklistThreeColumnCheckItem)[];
  /**
   * Link URL
   */
  link?: string;
  /**
   * Link label content
   */
  linkLabel?: React.ReactNode;
  /**
   * Custom link slot (overrides link and linkLabel)
   */
  linkSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface FeatureChecklistThreeColumnProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * First column checklist items
   */
  checklistColumn1?: (string | FeatureChecklistThreeColumnCheckItem)[];
  /**
   * Custom slot for first checklist column (overrides checklistColumn1)
   */
  checklistColumn1Slot?: React.ReactNode;
  /**
   * Second column checklist items
   */
  checklistColumn2?: (string | FeatureChecklistThreeColumnCheckItem)[];
  /**
   * Custom slot for second checklist column (overrides checklistColumn2)
   */
  checklistColumn2Slot?: React.ReactNode;
  /**
   * Array of feature cards
   */
  cards?: FeatureChecklistThreeColumnCard[];
  /**
   * Custom slot for rendering cards (overrides cards array)
   */
  cardsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header grid
   */
  headerGridClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the checklist columns
   */
  checklistClassName?: string;
  /**
   * Additional CSS classes for the cards grid
   */
  cardsGridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
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
}

/**
 * Feature Checklist Three Column - Three-column layout with heading, dual
 * checklists, and feature cards with images.
 *
 * Layout: Three-column grid with heading, two checklist columns, and feature cards.
 * Key features: Dual checklist columns, image cards with badges, read more links.
 * Best for: Comprehensive feature lists, product capabilities, service highlights.
 *
 * @example
 * ```tsx
 * <FeatureChecklistThreeColumn
 *   title="Build any kind of Website with our Blocks"
 *   checklistColumn1={["Responsive Design", "Clean Design"]}
 *   checklistColumn2={["High Performance", "Clean Code"]}
 *   cards={[
 *     {
 *       title: "Responsive Blocks",
 *       description: "Fully responsive components.",
 *       image: "/responsive.jpg",
 *       badge: "Example",
 *       checklistItems: ["Responsive", "Modern", "SEO friendly"],
 *       link: "/responsive"
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureChecklistThreeColumn({
  title,
  checklistColumn1,
  checklistColumn1Slot,
  checklistColumn2,
  checklistColumn2Slot,
  cards,
  cardsSlot,
  className,
  containerClassName,
  headerGridClassName,
  titleClassName,
  checklistClassName,
  cardsGridClassName,
  cardClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureChecklistThreeColumnProps): React.JSX.Element {
  const getCheckItemContent = useCallback((item: string | FeatureChecklistThreeColumnCheckItem) => {
    if (typeof item === "string") return item;
    return item.content;
  }, []);

  const getCheckItemClassName = useCallback((item: string | FeatureChecklistThreeColumnCheckItem) => {
    if (typeof item === "string") return undefined;
    return item.className;
  }, []);

  const renderChecklistColumn = useCallback((
    items: (string | FeatureChecklistThreeColumnCheckItem)[] | undefined,
    slot: React.ReactNode | undefined,
    gapClass: string
  ) => {
    if (slot) return slot;
    if (!items || items.length === 0) return null;

    return (
      <ul className={cn("flex flex-col text-muted-foreground", gapClass, checklistClassName)}>
        {items.map((item, index) => (
          <li key={index} className={cn("flex items-center gap-2", getCheckItemClassName(item))}>
            <DynamicIcon name="lucide/check" size={16} className="text-primary" />
            {getCheckItemContent(item)}
          </li>
        ))}
      </ul>
    );
  }, [checklistClassName, getCheckItemContent, getCheckItemClassName]);

  const renderCardImage = useCallback((card: FeatureChecklistThreeColumnCard) => {
    if (card.imageSlot) return card.imageSlot;
    if (card.image) {
      return (
        <Img
          src={card.image}
          alt={card.imageAlt || (typeof card.title === "string" ? card.title : "Card image")}
          className={cn("max-h-96 w-full rounded-t-lg object-cover sm:max-h-72 md:max-h-64", card.imageClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      );
    }
    return null;
  }, [optixFlowConfig]);

  const renderCardLink = useCallback((card: FeatureChecklistThreeColumnCard) => {
    if (card.linkSlot) return card.linkSlot;
    if (!card.link) return null;

    return (
      <Pressable
        href={card.link}
        className="my-3 flex items-center gap-2 px-4 font-medium sm:my-4 sm:px-5 md:px-6"
      >
        {card.linkLabel || "Read more"}
        <DynamicIcon name="lucide/chevron-right" size={16} className="mt-0.5" />
      </Pressable>
    );
  }, []);

  const cardsContent = useMemo(() => {
    if (cardsSlot) return cardsSlot;
    if (!cards || cards.length === 0) return null;

    return cards.map((card, index) => (
      <div key={index} className={cn("rounded-lg border", cardClassName, card.className)}>
        <div className="relative p-1">
          {renderCardImage(card)}
          {card.badge && (
            <Badge
              variant="outline"
              className={cn("absolute top-5 left-5 bg-background", card.badgeClassName)}
            >
              {card.badge}
            </Badge>
          )}
        </div>
        <div>
          <div className="mb-3 px-4 pt-5 sm:px-5 md:px-6 md:pt-6">
            {card.title && (
              typeof card.title === "string" ? (
                <h3 className={cn("font-medium", card.titleClassName)}>{card.title}</h3>
              ) : (
                <div className={cn("font-medium", card.titleClassName)}>{card.title}</div>
              )
            )}
            {card.description && (
              typeof card.description === "string" ? (
                <p className={cn("text-muted-foreground", card.descriptionClassName)}>{card.description}</p>
              ) : (
                <div className={cn("text-muted-foreground", card.descriptionClassName)}>{card.description}</div>
              )
            )}
          </div>
          <div className="h-px border-t border-dashed"></div>
          <ul className="text-muted-foreground">
            {card.checklistItems?.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                <li className={cn("flex items-start gap-2 px-4 py-3 sm:px-5 md:px-6", getCheckItemClassName(item))}>
                  <DynamicIcon
                    name="lucide/check"
                    size={16}
                    className="mt-1 shrink-0 text-primary"
                  />
                  {getCheckItemContent(item)}
                </li>
                {card.checklistItems && itemIndex < card.checklistItems.length - 1 && (
                  <div className="h-px border-t border-dashed"></div>
                )}
              </React.Fragment>
            ))}
          </ul>
          <div className="h-px border-t border-dashed"></div>
          {renderCardLink(card)}
        </div>
      </div>
    ));
  }, [cardsSlot, cards, cardClassName, renderCardImage, renderCardLink, getCheckItemContent, getCheckItemClassName]);

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
      <div className={cn("grid gap-4 sm:grid-cols-2 sm:gap-8 md:gap-12 lg:grid-cols-3 lg:gap-16", headerGridClassName)}>
        {title && (
          typeof title === "string" ? (
            <h2 className={cn("mb-4 text-3xl font-medium sm:col-span-2 sm:text-4xl md:mb-0 lg:col-span-1", titleClassName)}>
              {title}
            </h2>
          ) : (
            <div className={cn("mb-4 text-3xl font-medium sm:col-span-2 sm:text-4xl md:mb-0 lg:col-span-1", titleClassName)}>
              {title}
            </div>
          )
        )}
        {renderChecklistColumn(checklistColumn1, checklistColumn1Slot, "gap-3 sm:gap-4")}
        {renderChecklistColumn(checklistColumn2, checklistColumn2Slot, "gap-4")}
      </div>
      <div className={cn("mt-10 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3", cardsGridClassName)}>
        {cardsContent}
      </div>
    </Section>
  );
}
