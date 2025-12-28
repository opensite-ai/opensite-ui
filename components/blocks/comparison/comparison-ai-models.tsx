"use client";

import React, { useState } from "react";
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

interface MetricValue {
  value: string;
  status: "best" | "worst" | "neutral";
}

interface ComparisonRow {
  metric: string;
  modelA: MetricValue;
  modelB: MetricValue;
  modelC: MetricValue;
}

interface ModelInfo {
  name: string;
  icon?: string;
  iconAlt?: string;
  summary: string[];
  hoverColor: string;
}

export interface ComparisonAiModelsProps {
  className?: string;
  models?: {
    modelA: ModelInfo;
    modelB: ModelInfo;
    modelC: ModelInfo;
  };
  comparisonData?: ComparisonRow[];
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultModels = {
  modelA: {
    name: "GPT-4o",
    icon: blockBrandedIconsAndPlaceholders.openaiIcon,
    iconAlt: "OpenAI",
    summary: [
      "Response latency: 1.2s (best)",
      "Code accuracy: 94% (neutral)",
      "Reasoning score: 91/100 (neutral)",
      "Input cost: $3.50/1M tokens (worst)",
      "Rate limit: 50K RPM (neutral)",
    ],
    hoverColor: "red",
  },
  modelB: {
    name: "Claude 3.5",
    icon: blockBrandedIconsAndPlaceholders.claudeIcon,
    iconAlt: "Claude",
    summary: [
      "Response latency: 1.8s (neutral)",
      "Code accuracy: 95% (best)",
      "Reasoning score: 92/100 (best)",
      "Input cost: $3.00/1M tokens (neutral)",
      "Rate limit: 40K RPM (worst)",
    ],
    hoverColor: "blue",
  },
  modelC: {
    name: "Gemini Pro 1.5",
    icon: blockBrandedIconsAndPlaceholders.geminiIcon,
    iconAlt: "Gemini",
    summary: [
      "Context window: 2M tokens (best)",
      "Input cost: $1.25/1M tokens (best)",
      "Output cost: $5.00/1M tokens (best)",
      "Rate limit: 60K RPM (best)",
      "Free tier: Generous (best)",
    ],
    hoverColor: "green",
  },
};

const defaultComparisonData: ComparisonRow[] = [
  {
    metric: "Context Window",
    modelA: { value: "128K tokens", status: "worst" },
    modelB: { value: "200K tokens", status: "neutral" },
    modelC: { value: "2M tokens", status: "best" },
  },
  {
    metric: "Response Speed",
    modelA: { value: "1.2 sec", status: "best" },
    modelB: { value: "1.8 sec", status: "neutral" },
    modelC: { value: "2.2 sec", status: "worst" },
  },
  {
    metric: "Code Generation",
    modelA: { value: "94%", status: "neutral" },
    modelB: { value: "95%", status: "best" },
    modelC: { value: "88%", status: "worst" },
  },
  {
    metric: "Reasoning Score",
    modelA: { value: "91/100", status: "neutral" },
    modelB: { value: "92/100", status: "best" },
    modelC: { value: "86/100", status: "worst" },
  },
  {
    metric: "Input Tokens",
    modelA: { value: "$3.50/1M", status: "worst" },
    modelB: { value: "$3.00/1M", status: "neutral" },
    modelC: { value: "$1.25/1M", status: "best" },
  },
  {
    metric: "Output Tokens",
    modelA: { value: "$14.00/1M", status: "neutral" },
    modelB: { value: "$15.00/1M", status: "worst" },
    modelC: { value: "$5.00/1M", status: "best" },
  },
  {
    metric: "Rate Limit",
    modelA: { value: "50K RPM", status: "neutral" },
    modelB: { value: "40K RPM", status: "worst" },
    modelC: { value: "60K RPM", status: "best" },
  },
  {
    metric: "Free Tier",
    modelA: { value: "Very Limited", status: "worst" },
    modelB: { value: "Limited", status: "neutral" },
    modelC: { value: "Generous", status: "best" },
  },
];

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
  className,
  models = defaultModels,
  comparisonData = defaultComparisonData,
  optixFlowConfig,
}: ComparisonAiModelsProps) {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const renderStatusIcon = (status: MetricValue["status"]) => {
    if (status === "best") {
      return <DynamicIcon name="lucide/circle-check" size={16} className="text-green-600" />;
    }
    if (status === "worst") {
      return <DynamicIcon name="lucide/circle-x" size={16} className="text-red-600" />;
    }
    return <DynamicIcon name="lucide/minus" size={16} className="text-muted-foreground" />;
  };

  const getCellClassName = (status: MetricValue["status"], modelKey: string) => {
    const baseClass = "cursor-pointer py-4 text-center font-medium transition-all duration-300";
    let statusClass = "";
    
    if (status === "best") {
      statusClass = "bg-green-50 text-green-600 dark:bg-green-950/20";
    } else if (status === "worst") {
      statusClass = "bg-red-50 text-red-600 dark:bg-red-950/20";
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

  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="relative overflow-hidden p-8">
          <div className="relative overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm">
            <Table>
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

          <div className="relative mt-8 border border-border/50 bg-muted/20 p-6">
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
                        {model.summary.map((item, idx) => (
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
        </div>
      </div>
    </section>
  );
}
