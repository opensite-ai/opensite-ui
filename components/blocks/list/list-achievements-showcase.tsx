"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ListAchievementItem {
  /**
   * Icon name for the achievement (e.g., "lucide/trophy")
   */
  icon?: string;
  /**
   * Title of the achievement
   */
  title?: React.ReactNode;
  /**
   * Category of the achievement
   */
  category?: React.ReactNode;
  /**
   * Description of the achievement
   */
  description?: React.ReactNode;
  /**
   * Action configuration for the item
   */
  action?: ActionConfig;
}

export interface ListAchievementsShowcaseProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Array of achievement items to display
   */
  items?: ListAchievementItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the items container
   */
  itemsClassName?: string;
  /**
   * Additional CSS classes for individual item rows
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for item icons
   */
  itemIconClassName?: string;
  /**
   * Additional CSS classes for item titles
   */
  itemTitleClassName?: string;
  /**
   * Additional CSS classes for item categories
   */
  itemCategoryClassName?: string;
  /**
   * Additional CSS classes for item descriptions
   */
  itemDescriptionClassName?: string;
  /**
   * Default action configuration for items without specific actions
   */
  defaultItemAction?: ActionConfig;
  /**
   * Additional CSS classes for item actions
   */
  itemActionClassName?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

/**
 * ListAchievementsShowcase - A vertical list displaying achievements and recognition
 * with icons, titles, categories, descriptions, and action links. Each item is separated
 * by dividers and features a responsive grid layout that adapts to mobile screens.
 *
 * Perfect for showcasing awards, certifications, milestones, or company achievements
 * in a professional, scannable format.
 *
 * @example
 * ```tsx
 * <ListAchievementsShowcase
 *   heading="Our Achievements & Recognition"
 *   items={[
 *     {
 *       icon: "lucide/trophy",
 *       title: "Industry Recognition",
 *       category: "Achievement",
 *       description: "Outstanding Performance Award.",
 *       action: { href: "/achievements/recognition", label: "View project" }
 *     }
 *   ]}
 * />
 * ```
 */
export function ListAchievementsShowcase({
  heading = "Our Achievements & Recognition",
  headingClassName,
  items,
  itemsSlot,
  itemsClassName,
  itemClassName,
  itemIconClassName,
  itemTitleClassName,
  itemCategoryClassName,
  itemDescriptionClassName,
  defaultItemAction: defaultAction,
  itemActionClassName,
  containerClassName,
  className,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: ListAchievementsShowcaseProps): React.JSX.Element {
  const renderItemAction = (item: ListAchievementItem) => {
    const action = item.action ?? defaultAction;
    if (!action) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;

    return (
      <Pressable
        asButton
        className={cn("order-3 ml-auto w-fit gap-2 md:order-0", actionClassName, itemActionClassName)}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            {label && <span>{label}</span>}
            {iconAfter ?? <DynamicIcon name="lucide/arrow-right" size={16} className="text-current" />}
          </>
        )}
      </Pressable>
    );
  };

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <div className={cn("flex flex-col", itemsClassName)}>
        <Separator />
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className={cn("grid items-center gap-4 px-4 py-5 md:grid-cols-4", itemClassName)}>
              <div className="order-2 flex items-center gap-2 md:order-0">
                <span className={cn("flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-muted", itemIconClassName)}>
                  {item.icon && (
                    <DynamicIcon
                      name={item.icon}
                      size={24}
                      className="text-foreground"
                    />
                  )}
                </span>
                <div className="flex flex-col gap-1">
                  {item.title && (
                    typeof item.title === "string" ? (
                      <h3 className={cn("font-semibold", itemTitleClassName)}>{item.title}</h3>
                    ) : (
                      <div className={itemTitleClassName}>{item.title}</div>
                    )
                  )}
                  {item.category && (
                    typeof item.category === "string" ? (
                      <p className={cn("text-sm text-muted-foreground", itemCategoryClassName)}>
                        {item.category}
                      </p>
                    ) : (
                      <div className={itemCategoryClassName}>{item.category}</div>
                    )
                  )}
                </div>
              </div>
              {item.description && (
                typeof item.description === "string" ? (
                  <p className={cn("order-1 text-2xl font-semibold md:order-0 md:col-span-2", itemDescriptionClassName)}>
                    {item.description}
                  </p>
                ) : (
                  <div className={cn("order-1 md:order-0 md:col-span-2", itemDescriptionClassName)}>
                    {item.description}
                  </div>
                )
              )}
              {renderItemAction(item)}
            </div>
            <Separator />
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("px-0 md:px-8", containerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("mb-10 px-4 text-3xl font-semibold md:mb-14 md:text-4xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={cn("mb-10 px-4 md:mb-14", headingClassName)}>{heading}</div>
          )
        )}
        {renderItems()}
      </div>
    </Section>
  );
}
