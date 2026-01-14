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
import type { OptixFlowConfig } from "../../../src/types";

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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ComparisonAiModels - AI model comparison table with hover effects
 *
 * Displays a detailed comparison table for AI models with interactive hover
 * effects. Each column represents a model with its icon, and cells are
 * color-coded based on performance (best/worst/neutral). Includes a technical
 * analysis section below that highlights on hover. Designed for comparing
 * LLM capabilities, pricing, and performance metrics.
 *
 * Best for: AI/ML model comparisons, API pricing comparisons, technical
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
  optixFlowConfig,
}: ComparisonAiModelsProps): React.JSX.Element {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const renderStatusIcon = (status: MetricValue["status"]) => {
    if (status === "best") {
      return <DynamicIcon name="lucide/circle-check" size={16} className="text-success" />;
    }
    if (status === "worst") {
      return <DynamicIcon name="lucide/circle-x" size={16} className="text-destructive" />;
    }
    return <DynamicIcon name="lucide/minus" size={16} className="text-muted-foreground" />;
  };

  const getCellClassName = (status: MetricValue["status"], modelKey: string) => {
    const baseClass = "cursor-pointer py-4 text-center font-medium transition-all duration-300";
    let statusClass = "";
    
    if (status === "best") {
      statusClass = "bg-green-50 text-success dark:bg-green-950/20";
    } else if (status === "worst") {
      statusClass = "bg-red-50 text-destructive dark:bg-red-950/20";
    } else {
      statusClass = "bg-muted/50 text-foreground";
    }

    let hoverClass = "";
    if (hoveredModel === modelKey) {
      if (modelKey === "modelA") hoverClass = "bg-red-50/80 dark:bg-red-950/30";
      else if (modelKey === "modelB") hoverClass = "bg-blue-50/80 dark:bg-blue-950/30";
      else if (modelKey === "modelC") hoverClass = "bg-green-50/80 dark:bg-green-950/30";
    }

    return cn(baseClass, statusClass, hoverClass);
  };

  const getSummaryCardClassName = (modelKey: string) => {
    const baseClass = "rounded border border-border/30 bg-background/50 p-3 transition-all duration-300";
    
    if (hoveredModel === modelKey) {
      if (modelKey === "modelA") return cn(baseClass, "bg-red-50/20 shadow-lg ring-2 ring-red-500/50 dark:bg-red-950/10");
      if (modelKey === "modelB") return cn(baseClass, "bg-blue-50/20 shadow-lg ring-2 ring-blue-500/50 dark:bg-blue-950/10");
      if (modelKey === "modelC") return cn(baseClass, "bg-green-50/20 shadow-lg ring-2 ring-green-500/50 dark:bg-green-950/10");
    }
    
    return baseClass;
  };

  const renderTable = () => {
    if (tableSlot) return tableSlot;
    if (!models || !comparisonData || comparisonData.length === 0) return null;

    return (
      <div className={cn("relative overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm", tableWrapperClassName)}>
        <Table className={tableClassName}>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="font-semibold text-foreground">
                Metric
              </TableHead>
              {Object.entries(models).map(([key, model]) => (
                <TableHead key={key} className="text-center font-semibold text-foreground">
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
              <TableRow
                key={index}
                className="border-border/30 transition-colors hover:bg-muted/30"
              >
                <TableCell className="py-4 font-medium text-foreground">
                  {row.metric}
                </TableCell>
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
  };

  const renderAnalysis = () => {
    if (analysisSlot) return analysisSlot;
    if (!models) return null;

    return (
      <div className={cn("relative mt-8 border border-border/50 bg-muted/20 p-6", analysisClassName)}>
        <div className="relative">
          <h4 className="mb-4 font-mono text-sm font-semibold tracking-wider text-foreground uppercase">
            Technical Analysis
          </h4>
          <div className="space-y-3 font-mono text-xs text-muted-foreground">
            <div className="grid gap-2 md:grid-cols-3">
              {Object.entries(models).map(([key, model]) => (
                <div key={key} className={getSummaryCardClassName(key)}>
                  <div className="mb-1 font-medium text-foreground">
                    {model.name}
                  </div>
                  <div className="space-y-1">
                    {model.summary.map((item: string, idx: number) => (
                      <div key={idx}>• {item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded border border-border/30 bg-background/50 p-3">
              <div className="mb-2 font-medium text-foreground">
                Performance Summary
              </div>
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
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container mx-auto", containerClassName)}>
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
        <div className="relative overflow-hidden p-8">
          {renderTable()}
          {renderAnalysis()}
        </div>
      </div>
    </section>
  );
}
