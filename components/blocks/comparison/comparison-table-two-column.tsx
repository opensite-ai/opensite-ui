"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ComparisonTableTwoColumn - A table-based comparison layout with two columns
 *
 * Displays a side-by-side comparison table with logos or labels at the top and
 * feature rows below. The first column uses highlighted styling to indicate
 * the preferred choice. Rows can optionally display check/x icons for boolean comparisons.
 *
 * Best for: Option comparisons, tier comparisons, analysis,
 * feature-by-feature breakdowns where one option is clearly preferred.
 */
export function ComparisonTableTwoColumn({
  sectionId = "comparison-table-two-column",
  heading,
  description,
  rows,
  tableSlot,
  optionALogo,
  optionALogoAlt,
  optionALabel,
  optionBLogo,
  optionBLogoAlt,
  optionBLabel,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  tableWrapperClassName,
  tableGridClassName,
  optionACellClassName,
  optionBCellClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ComparisonTableTwoColumnProps): React.JSX.Element {
  const tableContent = React.useMemo(() => {
    if (tableSlot) return tableSlot;
    if (!rows || rows.length === 0) return null;

    return (
      <div className={cn("-mr-4 overflow-x-auto", tableWrapperClassName)}>
        <div className="min-w-2xl overflow-hidden">
          <div
            className={cn(
              "grid grid-cols-3 [&>:last-child_div]:rounded-b-md [&>div:nth-last-child(-n+3)]:rounded-b-md [&>div:nth-last-child(-n+3)]:border-b-0",
              tableGridClassName
            )}
          >
            <div className="p-4"></div>
            <div className={cn("flex items-center rounded-t-md bg-success/10 p-3 md:p-4", optionACellClassName)}>
              {optionALogo ? (
                <Img
                  src={optionALogo}
                  alt={optionALogoAlt || "Option A"}
                  className="h-7 md:h-8"
                  optixFlowConfig={optixFlowConfig}
                />
              ) : (
                optionALabel &&
                (typeof optionALabel === "string" ? (
                  <span className="text-lg font-semibold">{optionALabel}</span>
                ) : (
                  optionALabel
                ))
              )}
            </div>
            <div className={cn("flex items-center rounded-t-md bg-destructive/10 p-3 md:p-4", optionBCellClassName)}>
              {optionBLogo ? (
                <Img
                  src={optionBLogo}
                  alt={optionBLogoAlt || "Option B"}
                  className="h-7 md:h-8"
                  optixFlowConfig={optixFlowConfig}
                />
              ) : (
                optionBLabel &&
                (typeof optionBLabel === "string" ? (
                  <span className="text-lg font-semibold">{optionBLabel}</span>
                ) : (
                  optionBLabel
                ))
              )}
            </div>
            {rows.map((row, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center border-b p-3 text-base font-medium md:p-4 md:text-lg">
                  {row.label}
                </div>
                <div className={cn("border-b bg-success/5 p-3 md:p-6", optionACellClassName)}>
                  <div className="flex items-center gap-2">
                    {row.hasIcon && (
                      <DynamicIcon name="lucide/circle-check-big" size={20} className="text-success" />
                    )}
                    <span className="text-base md:text-lg">{row.optionA}</span>
                  </div>
                </div>
                <div className={cn("border-b bg-destructive/5 p-3 md:p-6", optionBCellClassName)}>
                  <div className="flex items-center gap-2">
                    {row.hasIcon && <DynamicIcon name="lucide/octagon-x" size={20} className="text-destructive" />}
                    <span className="text-base md:text-lg">{row.optionB}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }, [
    tableSlot,
    rows,
    tableWrapperClassName,
    tableGridClassName,
    optionACellClassName,
    optionBCellClassName,
    optionALogo,
    optionALogoAlt,
    optionALabel,
    optionBLogo,
    optionBLogoAlt,
    optionBLabel,
    optixFlowConfig,
  ]);

  const headingContent = React.useMemo(() => {
    if (!heading) return null;
    if (typeof heading === "string") {
      return (
        <h1 className={cn("mb-8 text-3xl font-bold md:mb-12 md:text-5xl", headingClassName)}>
          {heading}
        </h1>
      );
    }
    return <div className={headingClassName}>{heading}</div>;
  }, [heading, headingClassName]);

  const descriptionContent = React.useMemo(() => {
    if (!description) return null;
    if (typeof description === "string") {
      return (
        <p className={cn("mb-8 text-muted-foreground md:text-lg", descriptionClassName)}>
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
        {headingContent}
        {descriptionContent}
        {tableContent}
      </div>
    </Section>
  );
}
