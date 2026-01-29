"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface FeatureBentoUtilitiesCardItem {
  /**
   * Card title
   */
  title?: React.ReactNode;
  /**
   * Card description
   */
  description?: React.ReactNode;
  /**
   * Image source URL (for image cards)
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
   * Whether to show sparkle icon next to title
   */
  showSparkle?: boolean;
  /**
   * Badge text (e.g., "Coming soon")
   */
  badge?: React.ReactNode;
  /**
   * Whether this is a dashed/coming soon style card
   */
  isDashed?: boolean;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface FeatureBentoUtilitiesProps {
  /**
   * Section label content
   */
  label?: React.ReactNode;
  /**
   * Icon name for the label
   */
  labelIconName?: string;
  /**
   * Icon element for the label (overrides labelIconName)
   */
  labelIcon?: React.ReactNode;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of cards for the left column
   */
  leftColumnCards?: FeatureBentoUtilitiesCardItem[];
  /**
   * Custom slot for left column (overrides leftColumnCards)
   */
  leftColumnSlot?: React.ReactNode;
  /**
   * Array of cards for the right column
   */
  rightColumnCards?: FeatureBentoUtilitiesCardItem[];
  /**
   * Custom slot for right column (overrides rightColumnCards)
   */
  rightColumnSlot?: React.ReactNode;
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
   * Additional CSS classes for the label
   */
  labelClassName?: string;
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
   * Additional CSS classes for each column
   */
  columnClassName?: string;
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
 * Feature Bento Utilities - Bento-style grid layout with mixed card sizes
 * showcasing various utilities.
 *
 * Layout: Two-column bento grid with varying card heights and image cards.
 * Key features: Bento grid layout, sparkle icons, coming soon badge, image cards.
 * Best for: Feature dashboards, capability overviews, product highlights.
 *
 * @example
 * ```tsx
 * <FeatureBentoUtilities
 *   label="Utilities"
 *   title="Utilities for every use case"
 *   description="All the tools you need to get the job done."
 *   leftColumnCards={[
 *     { title: "Apps", description: "App management tools" },
 *     { title: "Integrations", description: "Connect your tools", imageSrc: "/integrations.jpg" },
 *   ]}
 * />
 * ```
 */
export function FeatureBentoUtilities({
  label,
  labelIconName,
  labelIcon,
  title,
  description,
  leftColumnCards,
  leftColumnSlot,
  rightColumnCards,
  rightColumnSlot,
  className,
  containerClassName,
  headerClassName,
  labelClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  columnClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureBentoUtilitiesProps): React.JSX.Element {
  const renderCard = React.useCallback((card: FeatureBentoUtilitiesCardItem, index: number) => {
    const hasImage = card.imageSrc || card.imageSlot;
    const cardClasses = cn(
      hasImage ? "overflow-hidden pt-0" : "p-6",
      card.isDashed && "border-dashed bg-transparent shadow-none",
      card.className
    );

    const renderImage = () => {
      if (card.imageSlot) return card.imageSlot;
      if (card.imageSrc) {
        return (
          <Img
            src={card.imageSrc}
            alt={card.imageAlt || ""}
            className="aspect-video w-full object-cover"
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
        );
      }
      return null;
    };

    const renderTitle = () => {
      if (!card.title) return null;

      const titleContent = (
        <>
          {card.title}
          {card.showSparkle && <DynamicIcon name="lucide/sparkles" size={16} />}
          {card.badge && <Badge variant="outline">{card.badge}</Badge>}
        </>
      );

      return (
        <div className="mb-1 flex items-center gap-2 font-medium">
          {titleContent}
        </div>
      );
    };

    if (hasImage) {
      return (
        <Card key={index} className={cardClasses}>
          {renderImage()}
          <div className="p-6">
            {renderTitle()}
            {card.description && (
              <p className="text-muted-foreground">{card.description}</p>
            )}
          </div>
        </Card>
      );
    }

    return (
      <Card key={index} className={cardClasses}>
        {renderTitle()}
        {card.description && (
          <p className="text-muted-foreground">{card.description}</p>
        )}
      </Card>
    );
  }, [optixFlowConfig]);

  const renderColumn = React.useCallback((cards: FeatureBentoUtilitiesCardItem[] | undefined, slot: React.ReactNode | undefined) => {
    if (slot) return slot;
    if (!cards || cards.length === 0) return null;
    return cards.map((card, index) => renderCard(card, index));
  }, [renderCard]);

  const labelIconElement = useMemo(() => {
    if (labelIcon) return labelIcon;
    if (labelIconName) return <DynamicIcon name={labelIconName} size={20} />;
    return null;
  }, [labelIcon, labelIconName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={cn("bg-gray-50 dark:bg-background", className)}
      containerClassName={cn("max-w-7xl", containerClassName)}
    >
      {(labelIconElement || label) && (
        <div className={cn("flex items-center gap-2 text-muted-foreground", labelClassName)}>
          {labelIconElement}
          {label && (
            typeof label === "string" ? (
              <p className="text-sm">{label}</p>
            ) : (
              <div className="text-sm">{label}</div>
            )
          )}
        </div>
      )}
      <Separator className="mt-3 mb-8" />
      <div className={cn("flex flex-col justify-between gap-6 md:flex-row", headerClassName)}>
        {title && (
          typeof title === "string" ? (
            <h2 className={cn("text-3xl font-medium md:w-1/2", titleClassName)}>{title}</h2>
          ) : (
            <div className={cn("text-3xl font-medium md:w-1/2", titleClassName)}>{title}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("md:w-1/2", descriptionClassName)}>{description}</p>
          ) : (
            <div className={cn("md:w-1/2", descriptionClassName)}>{description}</div>
          )
        )}
      </div>
      <div className={cn("mt-11 flex flex-col gap-6 md:flex-row", gridClassName)}>
        <div className={cn("flex w-full flex-col gap-6", columnClassName)}>
          {renderColumn(leftColumnCards, leftColumnSlot)}
        </div>
        <div className={cn("flex w-full flex-col gap-6", columnClassName)}>
          {renderColumn(rightColumnCards, rightColumnSlot)}
        </div>
      </div>
    </Section>
  );
}
