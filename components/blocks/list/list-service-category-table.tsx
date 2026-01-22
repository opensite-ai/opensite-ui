"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface ListServiceCategoryItem {
  /**
   * Icon name for the category (e.g., "lucide/shield")
   */
  icon?: string;
  /**
   * Category name
   */
  category?: React.ReactNode;
  /**
   * Description of the service
   */
  description?: React.ReactNode;
  /**
   * Year of the service
   */
  year?: React.ReactNode;
  /**
   * Offer type (Free, Professional, Enterprise)
   */
  offer?: "Free" | "Professional" | "Enterprise";
  /**
   * Market segment
   */
  segment?: React.ReactNode;
}

export interface ListServiceCategoryTableProps {
  /**
   * Section heading content
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Section description content
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Array of service category items to display
   */
  items?: ListServiceCategoryItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the table wrapper
   */
  tableWrapperClassName?: string;
  /**
   * Additional CSS classes for the table
   */
  tableClassName?: string;
  /**
   * Additional CSS classes for the table header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for header cells
   */
  headerCellClassName?: string;
  /**
   * Additional CSS classes for table rows
   */
  rowClassName?: string;
  /**
   * Additional CSS classes for table cells
   */
  cellClassName?: string;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

/**
 * ListServiceCategoryTable - A responsive table displaying service categories with icons,
 * descriptions, years, offer types, and market segments. Features color-coded offer indicators
 * and a mobile-optimized layout that collapses columns into a compact view.
 *
 * Ideal for showcasing product catalogs, service offerings, or feature comparisons
 * in a structured, scannable format.
 *
 * @example
 * ```tsx
 * <ListServiceCategoryTable
 *   items={[
 *     {
 *       icon: "lucide/shield",
 *       category: "Security",
 *       description: "Enterprise security solution",
 *       year: 2024,
 *       offer: "Professional",
 *       segment: "Business"
 *     }
 *   ]}
 * />
 * ```
 */
export function ListServiceCategoryTable({
  heading,
  headingClassName,
  description,
  descriptionClassName,
  items,
  itemsSlot,
  tableWrapperClassName,
  tableClassName,
  headerClassName,
  headerCellClassName,
  rowClassName,
  cellClassName,
  containerClassName,
  className,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: ListServiceCategoryTableProps): React.JSX.Element {
  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, idx) => (
      <TableRow
        key={`${typeof item.category === "string" ? item.category : idx}-${idx}`}
        className={rowClassName}
      >
        <TableCell className={cellClassName}>
          <div className="flex items-center gap-2 align-top">
            {item.icon && (
              <DynamicIcon
                name={item.icon}
                size={24}
                className="text-foreground"
              />
            )}
          </div>
        </TableCell>
        <TableCell className={cn("hidden md:table-cell", cellClassName)}>
          {item.category}
        </TableCell>
        <TableCell className={cn("pl-0 align-top md:pl-4", cellClassName)}>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-1 md:hidden">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{item.category}</span>
                <span className="text-sm text-muted-foreground">
                  - {item.segment}
                </span>
                <span
                  className={cn(
                    "ml-1 block h-1.5 w-4 rounded-full md:hidden",
                    item.offer === "Free" && "bg-yellow-400",
                    item.offer === "Professional" && "bg-green-400",
                    item.offer === "Enterprise" && "bg-blue-400",
                  )}
                ></span>
              </div>
              <span className="text-xs text-muted-foreground">{item.year}</span>
            </div>
            {item.description &&
              (typeof item.description === "string" ? (
                <p className="text-sm text-muted-foreground md:text-primary">
                  {item.description}
                </p>
              ) : (
                <div className="text-sm text-muted-foreground md:text-primary">
                  {item.description}
                </div>
              ))}
          </div>
        </TableCell>
        <TableCell
          className={cn("hidden text-right md:table-cell", cellClassName)}
        >
          {item.year}
        </TableCell>
        <TableCell className={cn("hidden md:table-cell", cellClassName)}>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "block h-6 w-1.5 rounded-full",
                item.offer === "Free" && "bg-yellow-400",
                item.offer === "Professional" && "bg-green-400",
                item.offer === "Enterprise" && "bg-blue-400",
              )}
            ></span>
            {item.offer}
          </div>
        </TableCell>
        <TableCell className={cn("hidden md:table-cell", cellClassName)}>
          {item.segment}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      {(heading || description) && (
        <div className="mb-8 text-center">
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold text-foreground md:text-4xl",
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
                className={cn(
                  "mt-3 text-muted-foreground",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={cn("mt-3", descriptionClassName)}>
                {description}
              </div>
            ))}
        </div>
      )}
      <div className={cn("px-0", containerClassName)}>
        <div className={tableWrapperClassName}>
          <Table className={tableClassName}>
            <TableHeader className={headerClassName}>
              <TableRow>
                <TableHead className={headerCellClassName}></TableHead>
                <TableHead
                  className={cn(
                    "hidden font-bold text-primary md:table-cell",
                    headerCellClassName,
                  )}
                >
                  Category
                </TableHead>
                <TableHead className={headerCellClassName}>
                  <span className="hidden font-bold text-primary md:block">
                    Description
                  </span>
                  <span className="block font-bold text-primary md:hidden">
                    Project
                  </span>
                </TableHead>
                <TableHead
                  className={cn(
                    "hidden text-right font-bold text-primary md:table-cell",
                    headerCellClassName,
                  )}
                >
                  Year
                </TableHead>
                <TableHead
                  className={cn(
                    "hidden font-bold text-primary md:table-cell",
                    headerCellClassName,
                  )}
                >
                  Offer
                </TableHead>
                <TableHead
                  className={cn(
                    "hidden font-bold text-primary md:table-cell",
                    headerCellClassName,
                  )}
                >
                  Segment
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderItems()}</TableBody>
          </Table>
        </div>
      </div>
    </Section>
  );
}
