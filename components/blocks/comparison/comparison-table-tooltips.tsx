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
  heading = "Compare Us",
  description = "A modern framework for building websites that is better than the competition.",
  optionALabel = "Our Solution",
  optionBLabel = "Alternative",
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
}: ComparisonTableTooltipsProps): React.JSX.Element {
  const renderCellContent = (
    cell: string | CellValue,
    isHighlighted: boolean
  ) => {
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
  };

  const renderTable = () => {
    if (tableSlot) return tableSlot;
    if (!rows || rows.length === 0) return null;

    return (
      <Table className={cn("rounded border text-left shadow-lg", tableClassName)}>
        <TableHeader>
          <TableRow>
            <TableHead className={tableHeaderClassName}></TableHead>
            <TableHead className={cn("bg-muted px-6 py-4 font-semibold", tableHeaderClassName)}>
              {optionALabel}
            </TableHead>
            <TableHead className={cn("px-6 py-4 font-semibold", tableHeaderClassName)}>
              {optionBLabel}
            </TableHead>
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
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h2 className={cn("mb-4 text-center text-4xl font-semibold", headingClassName)}>
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mb-8 text-center text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        <div className={cn("mx-auto max-w-3xl overflow-x-auto", tableWrapperClassName)}>
          {renderTable()}
        </div>
      </div>
    </section>
  );
}
