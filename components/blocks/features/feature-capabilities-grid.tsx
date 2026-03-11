"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardHeader, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { Pressable } from "@/src";

export interface FeatureCapabilitiesGridItem {
  /**
   * Feature title content
   */
  title?: React.ReactNode;
  /**
   * Feature description content
   */
  description?: React.ReactNode;
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/brain")
   */
  iconName?: string;
  /**
   * Optional badge label content
   */
  badge?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
  /**
   * Additional CSS classes for the icon wrapper
   */
  iconClassName?: string;
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
   * Optional href for the item
   */
  href?: string;
}

export interface FeatureCapabilitiesGridProps {
  /**
   * Eyebrow label content
   */
  eyebrow?: React.ReactNode;
  /**
   * Section heading content
   */
  heading?: React.ReactNode;
  /**
   * Feature items
   */
  items?: FeatureCapabilitiesGridItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the eyebrow
   */
  eyebrowClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
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
 * FeatureCapabilitiesGrid - Dark capability grid with animated highlight cards.
 * Ideal for showcasing platform features, AI capabilities, or service pillars.
 */
export function FeatureCapabilitiesGrid({
  sectionId = "feature-capabilities-grid",
  eyebrow,
  heading,
  items,
  itemsSlot,
  className,
  containerClassName = "mx-auto w-full max-w-screen-lg md:max-w-screen-4xl relative z-10 px-6 sm:px-2 md:px-2 lg:px-2",
  spacing = "py-12 md:py-32",
  eyebrowClassName,
  headingClassName,
  gridClassName,
  cardClassName,
  background,
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureCapabilitiesGridProps): React.JSX.Element {
  const renderItemIcon = React.useCallback(
    (item: FeatureCapabilitiesGridItem) => {
      if (item.icon) return item.icon;
      if (item.iconName) return <DynamicIcon name={item.iconName} size={20} />;
      return null;
    },
    [],
  );

  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, index) => {
      const iconContent = renderItemIcon(item);

      return (
        <Card
          key={`${typeof item.title === "string" ? item.title : "item"}-${index}`}
          className={cn(
            "group relative rounded-md overflow-visible border-border/10 bg-card text-card-foreground p-0 transition-colors duration-300 hover:border-border/20",
            cardClassName,
            item.className,
          )}
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute -inset-px rounded-xl bg-linear-to-br from-background/10 via-background/5 to-transparent" />
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-tr from-background/0 to-background/0 transition-colors group-hover:from-background/3 group-hover:to-background/6" />

          <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
            <div className="absolute -left-2 -top-2 h-3 w-3 bg-background" />
            <div className="absolute -right-2 -top-2 h-3 w-3 bg-background" />
            <div className="absolute -left-2 -bottom-2 h-3 w-3 bg-background" />
            <div className="absolute -right-2 -bottom-2 h-3 w-3 bg-background" />
          </div>

          <CardHeader className="relative z-10 flex flex-row items-start gap-3 p-6">
            {iconContent && (
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border ",
                  item.iconClassName,
                )}
              >
                {iconContent}
              </div>
            )}
            <Pressable
              href={item.href}
              className="flex-1 h-full flex items-center"
            >
              <div className="flex items-center gap-2">
                {item.title &&
                  (typeof item.title === "string" ? (
                    <h3
                      className={cn("text-lg font-medium", item.titleClassName)}
                    >
                      {item.title}
                    </h3>
                  ) : (
                    <div
                      className={cn("text-lg font-medium", item.titleClassName)}
                    >
                      {item.title}
                    </div>
                  ))}
                {item.badge && (
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] leading-none",
                      item.badgeClassName,
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </Pressable>
          </CardHeader>

          {item.description && (
            <CardContent
              className={cn(
                "relative z-10 px-6 pb-6 text-sm",
                item.descriptionClassName,
              )}
            >
              {item.description}
            </CardContent>
          )}

          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-border/0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          />
        </Card>
      );
    });
  }, [itemsSlot, items, cardClassName, renderItemIcon]);

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
      <div className="flex flex-col space-y-6 md:space-y-16">
        {eyebrow || heading ? (
          <div className="flex flex-col space-y-4 md:space-y-6">
            {eyebrow &&
              (typeof eyebrow === "string" ? (
                <p className={cn("text-sm tracking-widest", eyebrowClassName)}>
                  {eyebrow}
                </p>
              ) : (
                <div
                  className={cn("text-sm tracking-widest", eyebrowClassName)}
                >
                  {eyebrow}
                </div>
              ))}
            {heading &&
              (typeof heading === "string" ? (
                <h2
                  className={cn(
                    "text-4xl font-semibold sm:text-5xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : (
                <div
                  className={cn(
                    "text-4xl font-semibold sm:text-5xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </div>
              ))}
          </div>
        ) : null}

        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
            gridClassName,
          )}
        >
          {itemsContent}
        </div>
      </div>
    </Section>
  );
}
