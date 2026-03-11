"use client";

import * as React from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface TimelineAlternatingItem {
  title: React.ReactNode;
  description: React.ReactNode;
  icon: string;
  image: {
    src: string;
    alt: string;
  };
  reverse?: boolean;
}

export interface TimelineAlternatingDiagonalProps {
  /**
   * Badge configuration with icon and text
   */
  badge?: {
    icon: string;
    text: React.ReactNode;
  };
  /**
   * Custom badge slot to override default badge rendering
   */
  badgeSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below the heading
   */
  description?: React.ReactNode;
  /**
   * Array of timeline items
   */
  items?: TimelineAlternatingItem[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the items container
   */
  itemsClassName?: string;
  /**
   * Additional CSS classes for individual items
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for item titles
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for item descriptions
   */
  itemDescriptionClassName?: string;
  /**
   * Additional CSS classes for item images
   */
  imageClassName?: string;
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
   * Additional CSS classes for the pattern background
   */
  patternClassName?: string;
  /**
   * Section ID for anchor links
   */
  id?: string;
  /**
   * Inline styles for the section
   */
  style?: React.CSSProperties;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  /** Optional Section ID */
  sectionId?: string;
}

const DiagonalPattern = React.memo(({
  className,
  patternOpacity = 0.15,
}: {
  className?: string;
  patternOpacity?: number;
}) => {
  const svgPattern = `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='${patternOpacity}' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div
      className={cn("h-full w-full border-2 border-dashed", className)}
      style={{
        backgroundImage: svgPattern,
      }}
    />
  );
});

export function TimelineAlternatingDiagonal({
  sectionId = "timeline-alternating-diagonal",
  badge,
  badgeSlot,
  heading,
  description,
  items,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  itemsClassName,
  itemClassName,
  titleClassName,
  itemDescriptionClassName,
  imageClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
  optixFlowConfig,
}: TimelineAlternatingDiagonalProps) {
  const renderedBadge = React.useMemo(() => {
    if (badgeSlot) {
      return badgeSlot;
    }
    if (badge) {
      return (
        <Badge
          variant="outline"
          className={cn("w-fit gap-1 px-3 text-sm font-normal tracking-tight shadow-sm", getNestedCardBg(background, "card"), getNestedCardTextColor(background))}
        >
          <DynamicIcon name={badge.icon} size={16} />
          <span>{badge.text}</span>
        </Badge>
      );
    }
    return null;
  }, [badgeSlot, badge]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      style={style}
    >
      <div className="border-y">
        <div
          className={cn(
            "flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8 mx-auto w-full px-2 sm:px-4 lg:px-8 max-w-7xl",
            containerClassName,
          )}
        >
          {renderedBadge}
          <h2
            className={cn(
              "text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl",
              headingClassName,
            )}
          >
            {heading}
          </h2>
          <p
            className={cn(
              "max-w-[600px] tracking-[-0.32px] text-muted-foreground",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        </div>
      </div>

      {items && items.length > 0 && (
        <div
          className={cn(
            "overflow-hidden border-x pb-40 lg:pt-20 [&>*:last-child]:pb-20 [&>div>div:first-child]:pt-20! mx-auto w-full px-2 sm:px-4 lg:px-8 max-w-7xl",
            itemsClassName,
          )}
        >
          {items.map((item, index) => (
            <div key={index} className={cn("relative flex", itemClassName)}>
              <div
                className={cn(
                  "flex w-full justify-center px-1 py-10 text-end md:gap-6 lg:gap-10",
                  item.reverse ? "lg:flex-row-reverse lg:text-start" : "",
                )}
              >
                <div className="flex-1 max-lg:hidden">
                  <h3
                    className={cn(
                      "text-2xl tracking-[-0.96px]",
                      titleClassName,
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2.5 max-w-[300px] tracking-[-0.32px] text-balance text-muted-foreground",
                      item.reverse ? "" : "ml-auto",
                      itemDescriptionClassName,
                    )}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="z-[-1] size-fit -translate-y-5 bg-background p-4 max-lg:-translate-x-4">
                  <div className={cn("rounded-[10px] border p-[5px] shadow-md", getNestedCardBg(background, "card"))}>
                    <div className={cn("size-fit rounded-md border p-1", getNestedCardBg(background))}>
                      <DynamicIcon name={item.icon} size={16} />
                    </div>
                  </div>
                </div>
                <div className="flex-1 max-lg:-translate-x-4">
                  <div className="text-start lg:pointer-events-none lg:hidden">
                    <h3
                      className={cn(
                        "text-2xl tracking-[-0.96px]",
                        titleClassName,
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2.5 mb-10 max-w-[300px] tracking-[-0.32px] text-balance text-muted-foreground",
                        itemDescriptionClassName,
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-start justify-start">
                    <div className={item.reverse ? "lg:ml-auto" : ""}>
                      <div className="px-6 lg:px-10">
                        <DiagonalPattern className="h-6 lg:h-10" />
                      </div>
                      <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                        <DiagonalPattern className="h-full w-6 lg:w-10" />
                        <Img
                          src={item.image.src}
                          alt={item.image.alt}
                          className={cn(
                            "object-contain dark:invert",
                            imageClassName,
                          )}
                          width={400}
                          height={500}
                          optixFlowConfig={optixFlowConfig}
                        />
                        <DiagonalPattern className="w-6 lg:w-10" />
                      </div>
                      <div className="px-6 lg:px-10">
                        <DiagonalPattern className="h-6 lg:h-10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "absolute z-[-2] h-full w-[3px] translate-x-5 rounded-full lg:left-1/2 lg:-translate-x-1/2",
                  index === items.length - 1
                    ? "bg-linear-to-b from-foreground/10 via-foreground/10 to-transparent"
                    : "bg-foreground/10",
                )}
              >
                {index === 0 && (
                  <div className="h-4 w-[3px] -translate-y-full bg-linear-to-b from-transparent to-foreground/10" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="h-8 w-full border-y md:h-12 lg:h-28">
        <div className="h-full w-full border-x mx-auto px-2 sm:px-4 lg:px-8 max-w-7xl" />
      </div>
    </Section>
  );
}
