"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Status type for metric values
 */
export type MetricStatus = "best" | "worst" | "neutral";

/**
 * Metric value with status indicator
 */
export interface MetricValue {
  value: string;
  status: MetricStatus;
}

/**
 * Comparison row data for AI models
 */
export interface AiModelComparisonRow {
  metric: string;
  modelA: MetricValue;
  modelB: MetricValue;
  modelC: MetricValue;
}

/**
 * Model information configuration
 */
export interface ModelInfo {
  name: string;
  icon?: string;
  iconAlt?: string;
  summary: string[];
  hoverColor: string;
}

/**
 * Models configuration object
 */
export interface ModelsConfig {
  modelA: ModelInfo;
  modelB: ModelInfo;
  modelC: ModelInfo;
}

export interface ComparisonAiModelsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Models configuration object
   */
  models?: ModelsConfig;
  /**
   * Array of comparison row data
   */
  comparisonData?: AiModelComparisonRow[];
  /**
   * Custom slot for rendering the table (overrides default table)
   */
  tableSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the analysis section
   */
  analysisSlot?: React.ReactNode;
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
   * Additional CSS classes for the analysis section
   */
  analysisClassName?: string;
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
}

/**
 * ComparisonAiModels - Multi-option comparison table with hover effects
 *
 * Displays a detailed comparison table with interactive hover
 * effects. Each column represents an option with its icon, and cells are
 * color-coded based on performance (best/worst/neutral). Includes a technical
 * analysis section below that highlights on hover.
 *
 * Best for: Model comparisons, API pricing comparisons, technical
 * specification matrices, performance benchmarks.
 */
export function ComparisonAiModels({
  heading,
  description,
  models,
  comparisonData,
  tableSlot,
  analysisSlot,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  tableWrapperClassName,
  tableClassName,
  analysisClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ComparisonAiModelsProps): React.JSX.Element {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const renderStatusIcon = React.useCallback((status: MetricValue["status"]) => {
    if (status === "best") {
      return <DynamicIcon name="lucide/circle-check" size={16} className="text-success" />;
    }
    if (status === "worst") {
      return <DynamicIcon name="lucide/circle-x" size={16} className="text-destructive" />;
    }
    return <DynamicIcon name="lucide/minus" size={16} className="text-muted-foreground" />;
  }, []);

  const getCellClassName = React.useCallback(
    (status: MetricValue["status"], modelKey: string) => {
      const baseClass = "cursor-pointer py-4 text-center font-medium transition-all duration-300";
      let statusClass = "";

      if (status === "best") {
        statusClass = "bg-success/10 text-success";
      } else if (status === "worst") {
        statusClass = "bg-destructive/10 text-destructive";
      } else {
        statusClass = "bg-muted/50";
      }

      let hoverClass = "";
      if (hoveredModel === modelKey) {
        if (modelKey === "modelA") hoverClass = "bg-destructive/20";
        else if (modelKey === "modelB") hoverClass = "bg-primary/20";
        else if (modelKey === "modelC") hoverClass = "bg-success/20";
      }

      return cn(baseClass, statusClass, hoverClass);
    },
    [hoveredModel]
  );

  const getSummaryCardClassName = React.useCallback(
    (modelKey: string) => {
      const baseClass = "rounded border border-border/30 bg-background/50 p-3 transition-all duration-300";

      if (hoveredModel === modelKey) {
        if (modelKey === "modelA")
          return cn(baseClass, "bg-destructive/10 shadow-lg ring-2 ring-destructive/50");
        if (modelKey === "modelB")
          return cn(baseClass, "bg-primary/10 shadow-lg ring-2 ring-primary/50");
        if (modelKey === "modelC")
          return cn(baseClass, "bg-success/10 shadow-lg ring-2 ring-success/50");
      }

      return baseClass;
    },
    [hoveredModel]
  );

  const tableContent = React.useMemo(() => {
    if (tableSlot) return tableSlot;
    if (!models || !comparisonData || comparisonData.length === 0) return null;

    return (
      <div
        className={cn(
          "relative overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm",
          tableWrapperClassName
        )}
      >
        <Table className={tableClassName}>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="font-semibold">Metric</TableHead>
              {Object.entries(models).map(([key, model]) => (
                <TableHead key={key} className="text-center font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    {model.icon && (
                      <Img
                        src={model.icon}
                        alt={model.iconAlt || model.name}
                        className="h-4 w-4"
                        optixFlowConfig={optixFlowConfig}
                      />
                    )}
                    {model.name}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonData.map((row, index) => (
              <TableRow key={index} className="border-border/30 transition-colors hover:bg-muted/30">
                <TableCell className="py-4 font-medium">{row.metric}</TableCell>
                <TableCell
                  className={getCellClassName(row.modelA.status, "modelA")}
                  onMouseEnter={() => setHoveredModel("modelA")}
                  onMouseLeave={() => setHoveredModel(null)}
                >
                  <div className="flex items-center justify-center gap-2">
                    {renderStatusIcon(row.modelA.status)}
                    <span>{row.modelA.value}</span>
                  </div>
                </TableCell>
                <TableCell
                  className={getCellClassName(row.modelB.status, "modelB")}
                  onMouseEnter={() => setHoveredModel("modelB")}
                  onMouseLeave={() => setHoveredModel(null)}
                >
                  <div className="flex items-center justify-center gap-2">
                    {renderStatusIcon(row.modelB.status)}
                    <span>{row.modelB.value}</span>
                  </div>
                </TableCell>
                <TableCell
                  className={getCellClassName(row.modelC.status, "modelC")}
                  onMouseEnter={() => setHoveredModel("modelC")}
                  onMouseLeave={() => setHoveredModel(null)}
                >
                  <div className="flex items-center justify-center gap-2">
                    {renderStatusIcon(row.modelC.status)}
                    <span>{row.modelC.value}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }, [
    tableSlot,
    models,
    comparisonData,
    tableWrapperClassName,
    tableClassName,
    optixFlowConfig,
    getCellClassName,
    renderStatusIcon,
  ]);

  const analysisContent = React.useMemo(() => {
    if (analysisSlot) return analysisSlot;
    if (!models) return null;

    return (
      <div className={cn("relative mt-8 border border-border/50 bg-muted/20 p-6", analysisClassName)}>
        <div className="relative">
          <h4 className="mb-4 font-mono text-sm font-semibold tracking-wider uppercase">
            Technical Analysis
          </h4>
          <div className="space-y-3 font-mono text-xs text-muted-foreground">
            <div className="grid gap-2 md:grid-cols-3">
              {Object.entries(models).map(([key, model]) => (
                <div key={key} className={getSummaryCardClassName(key)}>
                  <div className="mb-1 font-medium">{model.name}</div>
                  <div className="space-y-1">
                    {model.summary.map((item: string, idx: number) => (
                      <div key={idx}>• {item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded border border-border/30 bg-background/50 p-3">
              <div className="mb-2 font-medium">Performance Summary</div>
              <div className="space-y-1">
                <div>• {models.modelA.name}: Fastest response times with strong code generation</div>
                <div>• {models.modelB.name}: Excellent reasoning capabilities and balanced performance</div>
                <div>• {models.modelC.name}: Best value proposition with competitive pricing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [analysisSlot, models, analysisClassName, getSummaryCardClassName]);

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
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container mx-auto", containerClassName)}>
        {(heading || description) && (
          <div className="mb-8 text-center">
            {headingContent}
            {descriptionContent}
          </div>
        )}
        <div className="relative overflow-hidden p-8">
          {tableContent}
          {analysisContent}
        </div>
      </div>
    </Section>
  );
}
