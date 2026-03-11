import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Feature item configuration for grid comparison
 */
export interface GridFeatureItem {
  icon: string;
  title: string;
  description: string;
  optionAValue: string;
  optionBValue: string;
  optionAHighlight?: boolean;
  optionBHighlight?: boolean;
}

export interface ComparisonGridBadgesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Label for option A
   */
  optionALabel?: React.ReactNode;
  /**
   * Label for option B
   */
  optionBLabel?: React.ReactNode;
  /**
   * Array of feature items to display
   */
  features?: GridFeatureItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
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
   * Additional CSS classes for the features grid
   */
  featuresGridClassName?: string;
  /**
   * Additional CSS classes for individual feature cards
   */
  featureCardClassName?: string;
  /**
   * Additional CSS classes for badges
   */
  badgeClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ComparisonGridBadges - Grid-based comparison with icons and badges
 *
 * Displays features in a grid layout with icons, descriptions, and badge-style
 * value indicators for each option. Each feature card shows an icon, title,
 * description, and two badges comparing the options. Highlighted badges use
 * a distinct color to indicate the preferred choice.
 *
 * Best for: Feature comparisons, technical specification comparisons,
 * tier breakdowns, capability matrices.
 */
export function ComparisonGridBadges({
  sectionId = "comparison-grid-badges",
  heading,
  description,
  optionALabel,
  optionBLabel,
  features,
  featuresSlot,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  featuresGridClassName,
  featureCardClassName,
  badgeClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: ComparisonGridBadgesProps): React.JSX.Element {
  const featuresContent = React.useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, idx) => (
      <div
        key={idx}
        className={cn(
          "rounded-xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md",
          featureCardClassName
        )}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <DynamicIcon name={feature.icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{feature.title}</h3>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">{feature.description}</p>
        <div className="flex flex-wrap gap-2">
          {optionALabel && (
            <Badge
              variant={feature.optionAHighlight ? "default" : "secondary"}
              className={cn("text-xs", badgeClassName)}
            >
              {optionALabel}: {feature.optionAValue}
            </Badge>
          )}
          {optionBLabel && (
            <Badge
              variant={feature.optionBHighlight ? "default" : "outline"}
              className={cn("text-xs", badgeClassName)}
            >
              {optionBLabel}: {feature.optionBValue}
            </Badge>
          )}
        </div>
      </div>
    ));
  }, [featuresSlot, features, featureCardClassName, badgeClassName, optionALabel, optionBLabel]);

  const headingContent = React.useMemo(() => {
    if (!heading) return null;
    if (typeof heading === "string") {
      return (
        <h2 className={cn("mb-4 text-3xl font-bold md:text-5xl", headingClassName)}>
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
        <p className={cn("mx-auto max-w-2xl text-muted-foreground md:text-lg", descriptionClassName)}>
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
        <div className="text-center">
          {headingContent}
          {descriptionContent}
        </div>
        <div className={cn("mt-16 grid gap-6 md:grid-cols-2", featuresGridClassName)}>
          {featuresContent}
        </div>
      </div>
    </Section>
  );
}
