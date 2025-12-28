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
}

const defaultFeatures = [
  "Initial cost",
  "Scalability",
  "Performance",
  "Maintenance",
  "Data recovery",
  "Lifespan",
];

const defaultModels: ComparisonModel[] = [
  {
    name: "SSD",
    attributes: [
      { value: "Medium to high", status: "negative" },
      { value: "Limited by size", status: "neutral" },
      { value: "Very fast", status: "positive" },
      { value: "Low maintenance", status: "positive" },
      { value: "Challenging", status: "negative" },
      { value: "5-7 years", status: "neutral" },
    ],
  },
  {
    name: "Cloud Storage",
    attributes: [
      { value: "Pay-as-you-go", status: "positive" },
      { value: "Unlimited scaling", status: "positive" },
      { value: "Depends on connection", status: "neutral" },
      { value: "Managed service", status: "positive" },
      { value: "Provider dependent", status: "neutral" },
      { value: "Indefinite", status: "positive" },
    ],
  },
  {
    name: "NAS",
    attributes: [
      { value: "High upfront", status: "negative" },
      { value: "Expandable", status: "positive" },
      { value: "Network limited", status: "neutral" },
      { value: "Regular upkeep", status: "negative" },
      { value: "Built-in redundancy", status: "positive" },
      { value: "7-10 years", status: "positive" },
    ],
  },
];

/**
 * ComparisonTableTabs - Table comparison with mobile tabs and status indicators
 *
 * Displays a feature comparison table with multiple options. On mobile, uses
 * tabs to switch between options while desktop shows all columns. Each cell
 * includes a status indicator (positive/negative/neutral) with corresponding
 * colored icons and backgrounds.
 *
 * Best for: Multi-option technical comparisons, storage solutions, hosting
 * options, service tier comparisons with detailed attributes.
 */
export function ComparisonTableTabs({
  heading,
  description,
  features = defaultFeatures,
  models = defaultModels,
  tableSlot,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  tabsClassName,
  tableClassName,
  tableHeaderClassName,
  tableCellClassName,
}: ComparisonTableTabsProps): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState(models[0]?.name || "");

  const renderStatusIcon = (status: AttributeValue["status"]) => {
    if (status === "positive") {
      return (
        <span className="flex size-8 items-center justify-center rounded-full border border-green-200 bg-green-100">
          <DynamicIcon name="lucide/circle-check" size={16} className="text-green-700" />
        </span>
      );
    }
    if (status === "negative") {
      return (
        <span className="flex size-8 items-center justify-center rounded-full border border-red-200 bg-red-100">
          <DynamicIcon name="lucide/circle-x" size={16} className="text-red-700" />
        </span>
      );
    }
    return (
      <span className="flex size-8 items-center justify-center rounded-full border border-amber-200 bg-amber-100">
        <DynamicIcon name="lucide/circle-minus" size={16} className="text-amber-700" />
      </span>
    );
  };

  const renderTable = () => {
    if (tableSlot) return tableSlot;

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
                <TableHead className={cn("sticky top-0 mb-24 w-1/4 bg-background p-5 text-base font-medium text-primary after:absolute after:right-0 after:-bottom-px after:left-0 after:h-px after:bg-border", tableHeaderClassName)}>
                  Feature
                </TableHead>
                {models.map((model, idx) => (
                  <TableHead
                    key={idx}
                    className={cn(
                      "sticky top-0 mb-24 w-1/4 bg-background p-5 text-center text-base font-medium text-primary after:absolute after:right-0 after:-bottom-px after:left-0 after:h-px after:bg-border md:table-cell",
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
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {(heading || description) && (
          <div className="mb-8 text-center">
            {heading && (
              typeof heading === "string" ? (
                <h2 className={cn("text-3xl font-bold md:text-4xl lg:text-5xl", headingClassName)}>
                  {heading}
                </h2>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mt-4 text-muted-foreground md:text-lg", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
          </div>
        )}
        {renderTable()}
      </div>
    </section>
  );
}
