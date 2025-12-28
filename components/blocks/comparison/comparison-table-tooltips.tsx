import React from "react";
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

interface TableRowData {
  feature: string;
  optionA: string | { value: string; tooltip?: { title: string; content: string } };
  optionB: string | { value: string; tooltip?: { title: string; content: string } };
}

export interface ComparisonTableTooltipsProps {
  className?: string;
  title?: string;
  description?: string;
  optionALabel?: string;
  optionBLabel?: string;
  rows?: TableRowData[];
}

const defaultRows: TableRowData[] = [
  { feature: "Design System", optionA: "Modern, Utility-first", optionB: "Classic, Component-based" },
  { feature: "Customization", optionA: "Highly customizable", optionB: "Limited by default" },
  { feature: "Dark Mode", optionA: "Built-in", optionB: "Requires extra setup" },
  { feature: "TypeScript Support", optionA: "First-class", optionB: "Partial" },
  { feature: "Accessibility", optionA: "Focus on a11y", optionB: "Basic" },
  { feature: "Component Count", optionA: "30+", optionB: "25+" },
  { feature: "License", optionA: "MIT", optionB: "MIT" },
  {
    feature: "Premium Components",
    optionA: "Available",
    optionB: {
      value: "Not included",
      tooltip: {
        title: "Premium Only",
        content: "Some advanced components are only available in paid versions or require third-party libraries.",
      },
    },
  },
  {
    feature: "Figma Kit",
    optionA: "Yes",
    optionB: {
      value: "No",
      tooltip: {
        title: "Figma Kit Unavailable",
        content: "Does not provide an official Figma kit, but community kits may exist.",
      },
    },
  },
];

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
  className,
  title = "Compare Us",
  description = "A modern framework for building websites that is better than the competition.",
  optionALabel = "Our Solution",
  optionBLabel = "Alternative",
  rows = defaultRows,
}: ComparisonTableTooltipsProps) {
  const renderCellContent = (
    cell: string | { value: string; tooltip?: { title: string; content: string } },
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

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-4 text-center text-4xl font-semibold">{title}</h2>
        <p className="mb-8 text-center text-muted-foreground">{description}</p>
        <div className="mx-auto max-w-3xl overflow-x-auto">
          <Table className="rounded border text-left shadow-lg">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="bg-muted px-6 py-4 font-semibold">
                  {optionALabel}
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold">
                  {optionBLabel}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-foreground">
              {rows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-6 py-4">{row.feature}</TableCell>
                  <TableCell className="bg-muted px-6 py-4">
                    {renderCellContent(row.optionA, true)}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {renderCellContent(row.optionB, false)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
