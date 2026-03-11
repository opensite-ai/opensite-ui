"use client";

import * as React from "react";
import { useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Status indicator for comparison values
 */
export type ComparisonStatus = "positive" | "negative" | "neutral";

/**
 * Attribute value with status indicator
 */
export interface AttributeValue {
  value: string;
  status: ComparisonStatus;
}

/**
 * Model/option configuration for comparison
 */
export interface ComparisonModel {
  name: string;
  attributes: AttributeValue[];
}

export interface ComparisonTableTabsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of feature names for comparison rows
   */
  features?: string[];
  /**
   * Array of model configurations to compare
   */
  models?: ComparisonModel[];
  /**
   * Custom slot for rendering the table (overrides default table)
   */
  tableSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
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
   * Additional CSS classes for the tabs container
   */
  tabsClassName?: string;
  /**
   * Additional CSS classes for the table
   */
  tableClassName?: string;
  /**
   * Additional CSS classes for table header cells
   */
  tableHeaderClassName?: string;
  /**
   * Additional CSS classes for table body cells
   */
  tableCellClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ComparisonTableTabs - Table comparison with mobile tabs and status indicators
 *
 * Displays a feature comparison table with multiple options. On mobile, uses
 * tabs to switch between options while desktop shows all columns. Each cell
 * includes a status indicator (positive/negative/neutral) with corresponding
 * colored icons and backgrounds.
 *
 * Best for: Multi-option technical comparisons, storage solutions, hosting
 * options, tier comparisons with detailed attributes.
 */
export function ComparisonTableTabs({
  sectionId = "comparison-table-tabs",
  heading,
  description,
  features,
  models,
  tableSlot,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  tabsClassName,
  tableClassName,
  tableHeaderClassName,
  tableCellClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: ComparisonTableTabsProps): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState(models?.[0]?.name || "");

  const renderStatusIcon = React.useCallback((status: AttributeValue["status"]) => {
    if (status === "positive") {
      return (
        <span className="flex size-8 items-center justify-center rounded-full border bg-success/10">
          <DynamicIcon name="lucide/circle-check" size={16} className="text-success" />
        </span>
      );
    }
    if (status === "negative") {
      return (
        <span className="flex size-8 items-center justify-center rounded-full border bg-destructive/10">
          <DynamicIcon name="lucide/circle-x" size={16} className="text-destructive" />
        </span>
      );
    }
    return (
      <span className="flex size-8 items-center justify-center rounded-full border bg-accent/10">
        <DynamicIcon name="lucide/circle-minus" size={16} className="text-accent" />
      </span>
    );
  }, []);

  const tableContent = React.useMemo(() => {
    if (tableSlot) return tableSlot;
    if (!models || models.length === 0 || !features || features.length === 0) return null;

    return (
      <>
        <Tabs
          defaultValue={models[0]?.name}
          onValueChange={setSelectedTab}
          className={cn("mb-6 block md:hidden", tabsClassName)}
        >
          <TabsList className="w-full">
            {models.map((model, idx) => (
              <TabsTrigger key={idx} value={model.name}>
                {model.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="[&>div]:overflow-visible">
          <Table className={cn("table-fixed [&_td]:border [&_th]:border", tableClassName)}>
            <TableHeader>
              <TableRow>
                <TableHead
                  className={cn(
                    "sticky top-0 mb-24 w-1/4 bg-background p-5 text-base font-medium after:absolute after:right-0 after:-bottom-px after:left-0 after:h-px after:bg-border",
                    tableHeaderClassName
                  )}
                >
                  Feature
                </TableHead>
                {models.map((model, idx) => (
                  <TableHead
                    key={idx}
                    className={cn(
                      "sticky top-0 mb-24 w-1/4 bg-background p-5 text-center text-base font-medium after:absolute after:right-0 after:-bottom-px after:left-0 after:h-px after:bg-border md:table-cell",
                      model.name !== selectedTab ? "hidden" : "",
                      tableHeaderClassName
                    )}
                  >
                    {model.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, rowIdx) => (
                <TableRow key={rowIdx}>
                  <TableCell className={cn("p-5 font-semibold whitespace-normal", tableCellClassName)}>
                    {feature}
                  </TableCell>
                  {models.map((model, colIdx) => (
                    <TableCell
                      key={colIdx}
                      className={cn(
                        "p-5 text-center whitespace-normal md:table-cell",
                        model.name !== selectedTab ? "hidden" : "",
                        tableCellClassName
                      )}
                    >
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        {renderStatusIcon(model.attributes[rowIdx]?.status || "neutral")}
                        {model.attributes[rowIdx]?.value}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }, [tableSlot, models, features, tabsClassName, tableClassName, tableHeaderClassName, tableCellClassName, selectedTab, renderStatusIcon]);

  const headingContent = React.useMemo(() => {
    if (!heading) return null;
    if (typeof heading === "string") {
      return (
        <h2 className={cn("text-3xl font-bold md:text-4xl lg:text-5xl", headingClassName)}>
          {heading}
        </h2>
      );
    }
    return <div className={headingClassName}>{heading}</div>;
  }, [heading, headingClassName]);

  const descriptionContent = React.useMemo(() => {
    if (!description) return null;
    if (typeof description === "string") {
      return (
        <p className={cn("mt-4 text-muted-foreground md:text-lg", descriptionClassName)}>
          {description}
        </p>
      );
    }
    return <div className={descriptionClassName}>{description}</div>;
  }, [description, descriptionClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        {(heading || description) && (
          <div className="mb-8 text-center">
            {headingContent}
            {descriptionContent}
          </div>
        )}
        {tableContent}
      </div>
    </Section>
  );
}
