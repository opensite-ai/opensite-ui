"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";

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
}

/**
 * FeatureCapabilitiesGrid - Dark capability grid with animated highlight cards.
 * Ideal for showcasing platform features, AI capabilities, or service pillars.
 */
export function FeatureCapabilitiesGrid({
  eyebrow = "[ CAPABILITIES ]",
  heading = "Models that adapt to your coverage strategy",
  items,
  itemsSlot,
  className,
  containerClassName,
  eyebrowClassName,
  headingClassName,
  gridClassName,
  cardClassName,
}: FeatureCapabilitiesGridProps): React.JSX.Element {
  const renderItemIcon = (item: FeatureCapabilitiesGridItem) => {
    if (item.icon) return item.icon;
    if (item.iconName) return <DynamicIcon name={item.iconName} size={20} />;
    return <DynamicIcon name="lucide/star" size={20} />;
  };

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, index) => (
      <Card
        key={`${typeof item.title === "string" ? item.title : "item"}-${index}`}
        className={cn("group relative overflow-visible border-white/10 bg-white/5 p-0 transition-colors duration-300 hover:border-white/20", cardClassName, item.className)}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -inset-px rounded-xl bg-linear-to-br from-white/10 via-white/5 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-tr from-white/0 to-white/0 transition-colors group-hover:from-white/3 group-hover:to-white/6" />

        <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
          <div className="absolute -left-2 -top-2 h-3 w-3 bg-white" />
          <div className="absolute -right-2 -top-2 h-3 w-3 bg-white" />
          <div className="absolute -left-2 -bottom-2 h-3 w-3 bg-white" />
          <div className="absolute -right-2 -bottom-2 h-3 w-3 bg-white" />
        </div>

        <CardHeader className="relative z-10 flex flex-row items-start gap-3 p-6">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white", item.iconClassName)}>
            {renderItemIcon(item)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {item.title && (
                typeof item.title === "string" ? (
                  <CardTitle className={cn("text-lg font-medium text-white", item.titleClassName)}>
                    {item.title}
                  </CardTitle>
                ) : (
                  <div className={cn("text-lg font-medium text-white", item.titleClassName)}>
                    {item.title}
                  </div>
                )
              )}
              {item.badge && (
                <span className={cn("rounded-full border border-white/20 px-2 py-0.5 text-[10px] leading-none text-white/70", item.badgeClassName)}>
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className={cn("relative z-10 px-6 pb-6 text-sm text-white/70", item.descriptionClassName)}>
          {item.description}
        </CardContent>

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-white/0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        />
      </Card>
    ));
  };

  return (
    <section className={cn("bg-foreground py-16 text-background", className)}>
      <div className={cn("container", containerClassName)}>
        {eyebrow && (
          typeof eyebrow === "string" ? (
            <p className={cn("text-xs tracking-widest text-muted-foreground", eyebrowClassName)}>
              {eyebrow}
            </p>
          ) : (
            <div className={cn("text-xs tracking-widest text-muted-foreground", eyebrowClassName)}>
              {eyebrow}
            </div>
          )
        )}
        {heading && (
          typeof heading === "string" ? (
            <h2 className={cn("mt-3 text-4xl font-semibold tracking-tight sm:text-5xl", headingClassName)}>
              {heading}
            </h2>
          ) : (
            <div className={cn("mt-3 text-4xl font-semibold tracking-tight sm:text-5xl", headingClassName)}>
              {heading}
            </div>
          )
        )}

        <div className={cn("mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", gridClassName)}>
          {renderItems()}
        </div>
      </div>
    </section>
  );
}
