"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Input } from "../../ui/input";
import { Card } from "../../ui/card";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface ListSearchableGridItem {
  /**
   * Card title
   */
  title: React.ReactNode;
  /**
   * Supporting description text
   */
  description?: React.ReactNode;
  /**
   * Icon name for the card
   */
  icon?: string;
  /**
   * Optional link destination
   */
  href?: string;
  /**
   * Optional tags to display
   */
  tags?: string[];
  /**
   * Optional search text override
   */
  searchableText?: string;
}

export interface ListSearchableGridProps {
  /**
   * Section heading content
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Placeholder text for the search input
   */
  searchPlaceholder?: string;
  /**
   * Additional CSS classes for the search input
   */
  searchInputClassName?: string;
  /**
   * Additional CSS classes for the search container
   */
  searchContainerClassName?: string;
  /**
   * Message to show when no results match
   */
  emptyStateMessage?: React.ReactNode;
  /**
   * Additional CSS classes for the empty state message
   */
  emptyStateClassName?: string;
  /**
   * Items to display in the grid
   */
  items?: ListSearchableGridItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the items grid
   */
  itemsClassName?: string;
  /**
   * Additional CSS classes for individual cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for card icons
   */
  cardIconClassName?: string;
  /**
   * Additional CSS classes for card titles
   */
  cardTitleClassName?: string;
  /**
   * Additional CSS classes for card descriptions
   */
  cardDescriptionClassName?: string;
  /**
   * Additional CSS classes for card tags
   */
  cardTagClassName?: string;
  /**
   * Additional CSS classes for the header section
   */
  headerClassName?: string;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Controlled search term value
   */
  searchTerm?: string;
  /**
   * Callback when search term changes
   */
  onSearchTermChange?: (term: string) => void;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ListSearchableGrid - Searchable grid of cards with optional icons and tags.
 * Perfect for resource directories, service catalogs, or partner listings.
 */
export function ListSearchableGrid({
  sectionId = "list-searchable-grid",
  heading,
  headingClassName,
  description,
  descriptionClassName,
  searchPlaceholder,
  searchInputClassName,
  searchContainerClassName,
  emptyStateMessage,
  emptyStateClassName,
  items,
  itemsSlot,
  itemsClassName,
  cardClassName,
  cardIconClassName,
  cardTitleClassName,
  cardDescriptionClassName,
  cardTagClassName,
  headerClassName,
  className,
  background,
  spacing,
  pattern,
  patternOpacity,
  searchTerm: controlledSearchTerm,
  onSearchTermChange,
}: ListSearchableGridProps): React.JSX.Element {
  const [internalSearchTerm, setInternalSearchTerm] = React.useState("");
  const searchTerm = controlledSearchTerm ?? internalSearchTerm;

  const handleSearchChange = (value: string) => {
    if (onSearchTermChange) {
      onSearchTermChange(value);
    } else {
      setInternalSearchTerm(value);
    }
  };

  const filteredItems = React.useMemo(() => {
    if (!searchTerm) {
      return items ?? [];
    }

    const normalized = searchTerm.toLowerCase();

    return (items ?? []).filter((item) => {
      const titleText = typeof item.title === "string" ? item.title : "";
      const descText =
        typeof item.description === "string" ? item.description : "";
      const searchable =
        item.searchableText ||
        [titleText, descText, item.tags?.join(" ")].filter(Boolean).join(" ");
      return searchable.toLowerCase().includes(normalized);
    });
  }, [items, searchTerm]);

  const renderItems = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!filteredItems || filteredItems.length === 0) return null;

    return filteredItems.map((item, index) => {
      const cardContent = (
        <Card
          className={cn(
            "h-full border-border/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
            cardClassName,
          )}
        >
          <div className="flex items-start gap-3">
            {item.icon ? (
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary",
                  cardIconClassName,
                )}
              >
                <DynamicIcon name={item.icon} size={22} />
              </div>
            ) : null}
            <div>
              {item.title &&
                (typeof item.title === "string" ? (
                  <h3
                    className={cn(
                      "text-lg font-semibold",
                      cardTitleClassName,
                    )}
                  >
                    {item.title}
                  </h3>
                ) : (
                  <div className={cardTitleClassName}>{item.title}</div>
                ))}
              {item.description &&
                (typeof item.description === "string" ? (
                  <p
                    className={cn(
                      "mt-2 text-sm text-muted-foreground",
                      cardDescriptionClassName,
                    )}
                  >
                    {item.description}
                  </p>
                ) : (
                  <div className={cn("mt-2", cardDescriptionClassName)}>
                    {item.description}
                  </div>
                ))}
            </div>
          </div>
          {item.tags && item.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs",
                    getNestedCardBg(background),
                    getNestedCardTextColor(background),
                    cardTagClassName,
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </Card>
      );

      return (
        <motion.div
          key={`${typeof item.title === "string" ? item.title : index}-${index}`}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {item.href ? (
            <Pressable href={item.href} className="block">
              {cardContent}
            </Pressable>
          ) : (
            cardContent
          )}
        </motion.div>
      );
    });
  }, [itemsSlot, filteredItems, cardClassName, cardIconClassName, cardTitleClassName, cardDescriptionClassName, cardTagClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("mx-auto max-w-3xl text-center", headerClassName)}>
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-3xl font-bold md:text-4xl",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn("mt-3 text-muted-foreground", descriptionClassName)}
            >
              {description}
            </p>
          ) : (
            <div className={cn("mt-3", descriptionClassName)}>
              {description}
            </div>
          ))}
      </div>

      {searchPlaceholder && (
        <div className={cn("mx-auto mt-8 max-w-2xl", searchContainerClassName)}>
          <div className="relative">
            <DynamicIcon
              name="lucide/search"
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(event) => handleSearchChange(event.target.value)}
              className={cn(
                "h-12 rounded-xl border-border/60 bg-background pl-12 pr-4",
                searchInputClassName,
              )}
              aria-label="Search"
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          "mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
          itemsClassName,
        )}
      >
        {renderItems}
      </div>

      {(filteredItems?.length ?? 0) === 0 &&
        emptyStateMessage &&
        (typeof emptyStateMessage === "string" ? (
          <p
            className={cn(
              "mt-10 text-center text-sm text-muted-foreground",
              emptyStateClassName,
            )}
          >
            {emptyStateMessage}
          </p>
        ) : (
          <div className={cn("mt-10 text-center", emptyStateClassName)}>
            {emptyStateMessage}
          </div>
        ))}
    </Section>
  );
}
