import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Tooltip configuration for table cells
 */
export interface TooltipConfig {
  title: string;
  content: string;
}

/**
 * Cell value with optional tooltip
 */
export interface CellValue {
  value: string;
  tooltip?: TooltipConfig;
}

/**
 * Table row data for comparison
 */
export interface TableRowData {
  feature: string;
  optionA: string | CellValue;
  optionB: string | CellValue;
}

export interface ComparisonTableTooltipsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Label for option A column
   */
  optionALabel?: React.ReactNode;
  /**
   * Label for option B column
   */
  optionBLabel?: React.ReactNode;
  /**
   * Array of table row data
   */
  rows?: TableRowData[];
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
   * Additional CSS classes for the table wrapper
   */
  tableWrapperClassName?: string;
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
}

/**
 * ComparisonTableTooltips - Table comparison with tooltips for additional info
 *
 * Displays a two-column comparison table with the preferred option highlighted
 * with a muted background. Some cells can include tooltips that reveal
 * additional context on hover. Clean, minimal design with clear visual
 * hierarchy.
 *
 * Best for: Framework comparisons, technology stack comparisons, detailed
 * feature matrices where some items need additional explanation.
 */
export function ComparisonTableTooltips({
  heading,
  description,
  optionALabel,
  optionBLabel,
  rows,
  tableSlot,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  tableWrapperClassName,
  tableClassName,
  tableHeaderClassName,
  tableCellClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: ComparisonTableTooltipsProps): React.JSX.Element {
  const renderCellContent = React.useCallback(
    (cell: string | CellValue, isHighlighted: boolean) => {
      if (typeof cell === "string") {
        return cell;
      }

      if (cell.tooltip) {
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={cn(
                  "cursor-pointer underline decoration-dotted",
                  !isHighlighted && "text-muted-foreground"
                )}
              >
                {cell.value}
              </span>
            </TooltipTrigger>
            <TooltipContent sideOffset={8} className="max-w-xs">
              <span className="mb-1 block font-semibold">{cell.tooltip.title}</span>
              {cell.tooltip.content}
            </TooltipContent>
          </Tooltip>
        );
      }

      return cell.value;
    },
    []
  );

  const tableContent = React.useMemo(() => {
    if (tableSlot) return tableSlot;
    if (!rows || rows.length === 0) return null;

    return (
      <Table className={cn("rounded border text-left shadow-lg", tableClassName)}>
        <TableHeader>
          <TableRow>
            <TableHead className={tableHeaderClassName}></TableHead>
            {optionALabel && (
              <TableHead className={cn("bg-muted px-6 py-4 font-semibold", tableHeaderClassName)}>
                {optionALabel}
              </TableHead>
            )}
            {optionBLabel && (
              <TableHead className={cn("px-6 py-4 font-semibold", tableHeaderClassName)}>
                {optionBLabel}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody className="text-foreground">
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell className={cn("px-6 py-4", tableCellClassName)}>{row.feature}</TableCell>
              <TableCell className={cn("bg-muted px-6 py-4", tableCellClassName)}>
                {renderCellContent(row.optionA, true)}
              </TableCell>
              <TableCell className={cn("px-6 py-4", tableCellClassName)}>
                {renderCellContent(row.optionB, false)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }, [tableSlot, rows, tableClassName, tableHeaderClassName, tableCellClassName, optionALabel, optionBLabel, renderCellContent]);

  const headingContent = React.useMemo(() => {
    if (!heading) return null;
    if (typeof heading === "string") {
      return (
        <h2 className={cn("mb-4 text-center text-4xl font-semibold", headingClassName)}>
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
        <p className={cn("mb-8 text-center text-muted-foreground", descriptionClassName)}>
          {description}
        </p>
      );
    }
    return <div className={descriptionClassName}>{description}</div>;
  }, [description, descriptionClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        {headingContent}
        {descriptionContent}
        <div className={cn("mx-auto max-w-3xl overflow-x-auto", tableWrapperClassName)}>
          {tableContent}
        </div>
      </div>
    </Section>
  );
}
