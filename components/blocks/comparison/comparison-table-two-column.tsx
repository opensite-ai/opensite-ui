"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type { OptixFlowConfig } from "../../../src/types";

/**
 * Comparison row data for two-column table
 */
export interface ComparisonRow {
  label: string;
  optionA: string;
  optionB: string;
  hasIcon?: boolean;
}

export interface ComparisonTableTwoColumnProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of comparison rows
   */
  rows?: ComparisonRow[];
  /**
   * Custom slot for rendering the table (overrides default table)
   */
  tableSlot?: React.ReactNode;
  /**
   * Logo URL for option A
   */
  optionALogo?: string;
  /**
   * Alt text for option A logo
   */
  optionALogoAlt?: string;
  /**
   * Label for option A (used when no logo)
   */
  optionALabel?: React.ReactNode;
  /**
   * Logo URL for option B
   */
  optionBLogo?: string;
  /**
   * Alt text for option B logo
   */
  optionBLogoAlt?: string;
  /**
   * Label for option B (used when no logo)
   */
  optionBLabel?: React.ReactNode;
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
   * Additional CSS classes for the table wrapper
   */
  tableWrapperClassName?: string;
  /**
   * Additional CSS classes for the table grid
   */
  tableGridClassName?: string;
  /**
   * Additional CSS classes for option A cells
   */
  optionACellClassName?: string;
  /**
   * Additional CSS classes for option B cells
   */
  optionBCellClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ComparisonTableTwoColumn - A table-based comparison layout with two columns
 *
 * Displays a side-by-side comparison table with company logos at the top and
 * feature rows below. The first column (Option A) is highlighted in green tones
 * indicating the preferred choice, while the second column (Option B) uses red
 * tones. Rows can optionally display check/x icons for boolean comparisons.
 *
 * Best for: Product comparisons, service tier comparisons, competitor analysis,
 * feature-by-feature breakdowns where one option is clearly preferred.
 */
export function ComparisonTableTwoColumn({
  heading = "Compare us with others.",
  description,
  rows,
  tableSlot,
  optionALogo,
  optionALogoAlt = "Option A logo",
  optionALabel = "Option A",
  optionBLogo,
  optionBLogoAlt = "Option B logo",
  optionBLabel = "Option B",
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  tableWrapperClassName,
  tableGridClassName,
  optionACellClassName,
  optionBCellClassName,
  optixFlowConfig,
}: ComparisonTableTwoColumnProps): React.JSX.Element {
  const renderTable = () => {
    if (tableSlot) return tableSlot;

    return (
      <div className={cn("-mr-4 overflow-x-auto", tableWrapperClassName)}>
        <div className="min-w-2xl overflow-hidden">
          <div className={cn("grid grid-cols-3 [&>:last-child_div]:rounded-b-md [&>div:nth-last-child(-n+3)]:rounded-b-md [&>div:nth-last-child(-n+3)]:border-b-0", tableGridClassName)}>
            <div className="p-4"></div>
            <div className={cn("flex items-center rounded-t-md bg-green-100 p-3 md:p-4", optionACellClassName)}>
              {optionALogo ? (
                <Img
                  src={optionALogo}
                  alt={optionALogoAlt}
                  className="h-7 md:h-8"
                  optixFlowConfig={optixFlowConfig}
                />
              ) : (
                typeof optionALabel === "string" ? (
                  <span className="text-lg font-semibold text-green-800">
                    {optionALabel}
                  </span>
                ) : (
                  optionALabel
                )
              )}
            </div>
            <div className={cn("flex items-center rounded-t-md bg-red-100 p-3 md:p-4", optionBCellClassName)}>
              {optionBLogo ? (
                <Img
                  src={optionBLogo}
                  alt={optionBLogoAlt}
                  className="h-7 md:h-8"
                  optixFlowConfig={optixFlowConfig}
                />
              ) : (
                typeof optionBLabel === "string" ? (
                  <span className="text-lg font-semibold text-red-800">
                    {optionBLabel}
                  </span>
                ) : (
                  optionBLabel
                )
              )}
            </div>
            {rows.map((row, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center border-b p-3 text-base font-medium md:p-4 md:text-lg">
                  {row.label}
                </div>
                <div className={cn("border-b bg-green-50 p-3 md:p-6", optionACellClassName)}>
                  <div className="flex items-center gap-2">
                    {row.hasIcon && (
                      <DynamicIcon
                        name="lucide/circle-check-big"
                        size={20}
                        className="text-green-600"
                      />
                    )}
                    <span className="text-base md:text-lg">
                      {row.optionA}
                    </span>
                  </div>
                </div>
                <div className={cn("border-b bg-red-50 p-3 md:p-6", optionBCellClassName)}>
                  <div className="flex items-center gap-2">
                    {row.hasIcon && (
                      <DynamicIcon
                        name="lucide/octagon-x"
                        size={20}
                        className="text-red-600"
                      />
                    )}
                    <span className="text-base md:text-lg">
                      {row.optionB}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("mb-8 text-3xl font-bold md:mb-12 md:text-5xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mb-8 text-muted-foreground md:text-lg", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {renderTable()}
      </div>
    </section>
  );
}
