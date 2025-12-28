"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";

interface ComparisonRow {
  label: string;
  optionA: string;
  optionB: string;
  hasIcon?: boolean;
}

export interface ComparisonTableTwoColumnProps {
  className?: string;
  title?: string;
  rows?: ComparisonRow[];
  optionALogo?: string;
  optionBLogo?: string;
  optionALogoAlt?: string;
  optionBLogoAlt?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultRows: ComparisonRow[] = [
  {
    label: "Onboarding",
    optionA: "1-2 days",
    optionB: "30 days",
  },
  {
    label: "Price Range",
    optionA: "10%",
    optionB: "50-60%",
  },
  {
    label: "Quality Score",
    optionA: "Top 3%",
    optionB: "Varies",
  },
  {
    label: "Verification",
    optionA: "Multi-step verification process",
    optionB: "Basic check",
    hasIcon: true,
  },
  {
    label: "Adaptability",
    optionA: "Fully flexible",
    optionB: "Limited",
    hasIcon: true,
  },
  {
    label: "Support",
    optionA: "24/7 dedicated team",
    optionB: "Limited hours",
    hasIcon: true,
  },
];

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
  className,
  title = "Compare us with others.",
  rows = defaultRows,
  optionALogo,
  optionBLogo,
  optionALogoAlt = "Option A logo",
  optionBLogoAlt = "Option B logo",
  optixFlowConfig,
}: ComparisonTableTwoColumnProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl">
          {title}
        </h1>
        <div className="-mr-4 overflow-x-auto">
          <div className="min-w-2xl overflow-hidden">
            <div className="grid grid-cols-3 [&>:last-child_div]:rounded-b-md [&>div:nth-last-child(-n+3)]:rounded-b-md [&>div:nth-last-child(-n+3)]:border-b-0">
              <div className="p-4"></div>
              <div className="flex items-center rounded-t-md bg-green-100 p-3 md:p-4">
                {optionALogo ? (
                  <Img
                    src={optionALogo}
                    alt={optionALogoAlt}
                    className="h-7 md:h-8"
                    optixFlowConfig={optixFlowConfig}
                  />
                ) : (
                  <span className="text-lg font-semibold text-green-800">
                    Option A
                  </span>
                )}
              </div>
              <div className="flex items-center rounded-t-md bg-red-100 p-3 md:p-4">
                {optionBLogo ? (
                  <Img
                    src={optionBLogo}
                    alt={optionBLogoAlt}
                    className="h-7 md:h-8"
                    optixFlowConfig={optixFlowConfig}
                  />
                ) : (
                  <span className="text-lg font-semibold text-red-800">
                    Option B
                  </span>
                )}
              </div>
              {rows.map((row, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center border-b p-3 text-base font-medium md:p-4 md:text-lg">
                    {row.label}
                  </div>
                  <div className="border-b bg-green-50 p-3 md:p-6">
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
                  <div className="border-b bg-red-50 p-3 md:p-6">
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
      </div>
    </section>
  );
}
