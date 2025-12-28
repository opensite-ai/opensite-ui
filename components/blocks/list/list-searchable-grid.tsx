"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Input } from "../../ui/input";
import { Card } from "../../ui/card";
import { Pressable } from "../../../lib/Pressable";

export interface ListSearchableGridItem {
  /**
   * Card title
   */
  title: string;
  /**
   * Supporting description text
   */
  description?: string;
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
   * Section heading text
   */
  heading?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Placeholder text for the search input
   */
  searchPlaceholder?: string;
  /**
   * Message to show when no results match
   */
  emptyStateMessage?: string;
  /**
   * Items to display in the grid
   */
  items?: ListSearchableGridItem[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
}

const defaultItems: ListSearchableGridItem[] = [
  {
    title: "Coverage Audit",
    description: "Identify gaps and upgrade plans with OpenSite AI insights.",
    icon: "lucide/search-check",
    href: "/coverage-audit",
    tags: ["Audit", "Insights"],
  },
  {
    title: "Claims Guidance",
    description: "Navigate claims quickly with dedicated advisor support.",
    icon: "lucide/file-check",
    href: "/claims",
    tags: ["Support", "Claims"],
  },
  {
    title: "Risk Strategy",
    description: "Align protection with growth goals and market changes.",
    icon: "lucide/target",
    href: "/risk-strategy",
    tags: ["Strategy", "Planning"],
  },
];

/**
 * ListSearchableGrid - Searchable grid of cards with optional icons and tags.
 * Perfect for resource directories, service catalogs, or partner listings.
 */
export function ListSearchableGrid({
  heading = "Search the OpenSite AI resource library",
  description = "Filter guides, services, and playbooks with a quick keyword search.",
  searchPlaceholder = "Search resources...",
  emptyStateMessage = "No matching results. Try a different keyword.",
  items = defaultItems,
  className,
}: ListSearchableGridProps): React.JSX.Element {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredItems = React.useMemo(() => {
    if (!searchTerm) {
      return items;
    }

    const normalized = searchTerm.toLowerCase();

    return items.filter((item) => {
      const searchable =
        item.searchableText ||
        [item.title, item.description, item.tags?.join(" ")]
          .filter(Boolean)
          .join(" ");
      return searchable.toLowerCase().includes(normalized);
    });
  }, [items, searchTerm]);

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-muted-foreground">{description}</p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
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
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-12 rounded-xl border-border/60 bg-background pl-12 pr-4"
              aria-label="Search"
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => {
            const cardContent = (
              <Card className="h-full border-border/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start gap-3">
                  {item.icon ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <DynamicIcon name={item.icon} size={22} />
                    </div>
                  ) : null}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                {item.tags && item.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted/60 px-3 py-1 text-xs text-foreground"
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
                key={`${item.title}-${index}`}
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
          })}
        </div>

        {filteredItems.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            {emptyStateMessage}
          </p>
        ) : null}
      </div>
    </section>
  );
}
