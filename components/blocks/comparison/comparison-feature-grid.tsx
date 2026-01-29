import * as React from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Feature status type
 */
export type FeatureStatus = true | false | "partial";

/**
 * Feature row data for the comparison grid
 */
export interface FeatureGridRow {
  icon: string;
  label: string;
  description: string;
  optionA: FeatureStatus;
  optionB: FeatureStatus;
}

export interface ComparisonFeatureGridProps {
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
   * Array of feature rows
   */
  features?: FeatureGridRow[];
  /**
   * Custom slot for rendering the grid (overrides default grid)
   */
  gridSlot?: React.ReactNode;
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
   * Additional CSS classes for the grid wrapper
   */
  gridWrapperClassName?: string;
  /**
   * Additional CSS classes for the grid header
   */
  gridHeaderClassName?: string;
  /**
   * Additional CSS classes for grid rows
   */
  gridRowClassName?: string;
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
 * ComparisonFeatureGrid - Feature grid with icons and status indicators
 *
 * Displays features in a responsive list format with icons, labels, descriptions,
 * and check/x indicators for each option. Each row shows the feature icon on the
 * left, feature details in the middle, and status indicators on the right.
 * Supports true/false/partial states with corresponding visual indicators.
 *
 * Best for: Framework comparisons, library comparisons, detailed feature
 * matrices, technology stack evaluations.
 */
export function ComparisonFeatureGrid({
  heading,
  description,
  optionALabel,
  optionBLabel,
  features,
  gridSlot,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  gridWrapperClassName,
  gridHeaderClassName,
  gridRowClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: ComparisonFeatureGridProps): React.JSX.Element {
  const renderStatusIcon = React.useCallback((status: FeatureStatus) => {
    if (status === true) {
      return <DynamicIcon name="lucide/check" size={20} className="text-success" />;
    }
    if (status === "partial") {
      return <DynamicIcon name="lucide/check" size={20} className="text-accent" />;
    }
    return <DynamicIcon name="lucide/x" size={20} className="text-destructive" />;
  }, []);

  const gridContent = React.useMemo(() => {
    if (gridSlot) return gridSlot;
    if (!features || features.length === 0) return null;

    return (
      <div
        className={cn(
          "mx-auto max-w-4xl divide-y divide-border overflow-x-auto rounded-lg border-border bg-background shadow",
          gridWrapperClassName
        )}
      >
        {(optionALabel || optionBLabel) && (
          <div
            className={cn(
              "hidden rounded-t-lg text-left text-base font-semibold text-foreground sm:flex",
              getNestedCardBg(background),
              getNestedCardTextColor(background),
              gridHeaderClassName
            )}
          >
            <div className="w-16 px-6 py-4"></div>
            <div className="flex-1 px-6 py-4">Feature</div>
            {optionALabel && <div className="w-40 px-6 py-4">{optionALabel}</div>}
            {optionBLabel && <div className="w-40 px-6 py-4">{optionBLabel}</div>}
          </div>
        )}
        {features.map((row, idx) => (
          <div
            key={idx}
            className={cn("flex flex-col items-start text-left sm:flex-row sm:items-center", gridRowClassName)}
          >
            <div className="flex w-full items-center justify-start px-6 pt-4 sm:w-16 sm:justify-center sm:py-4">
              <DynamicIcon name={row.icon} size={20} className="text-muted-foreground" />
              <span className="ml-3 text-base font-medium sm:hidden">{row.label}</span>
            </div>
            <div className="w-full flex-1 px-6 pb-2 sm:py-4">
              <div className="hidden font-medium sm:block">{row.label}</div>
              <div className="mt-2 mb-2 text-sm text-muted-foreground sm:mb-0">{row.description}</div>
            </div>
            <div className="flex w-full items-center justify-start px-6 pb-2 sm:w-40 sm:justify-center sm:py-4">
              {renderStatusIcon(row.optionA)}
              {optionALabel && (
                <span className="ml-2 text-xs font-medium text-muted-foreground sm:hidden">{optionALabel}</span>
              )}
            </div>
            <div className="flex w-full items-center justify-start border-border px-6 pb-4 sm:w-40 sm:justify-center sm:border-0 sm:py-4">
              {renderStatusIcon(row.optionB)}
              {optionBLabel && (
                <span className="ml-2 text-xs font-medium text-muted-foreground sm:hidden">{optionBLabel}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }, [
    gridSlot,
    features,
    gridWrapperClassName,
    gridHeaderClassName,
    gridRowClassName,
    optionALabel,
    optionBLabel,
    renderStatusIcon,
  ]);

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
        {gridContent}
      </div>
    </Section>
  );
}
