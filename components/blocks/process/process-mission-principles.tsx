"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Principle item configuration for ProcessMissionPrinciples
 */
export interface ProcessMissionPrincipleItem {
  /**
   * Principle number (e.g., "01", "02")
   */
  number?: React.ReactNode;
  /**
   * Principle title
   */
  title?: React.ReactNode;
  /**
   * Principle description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the principle item
   */
  className?: string;
}

export interface ProcessMissionPrinciplesProps {
  /**
   * Mission section label (e.g., "OUR MISSION")
   */
  missionLabel?: React.ReactNode;
  /**
   * Mission heading/title
   */
  missionHeading?: React.ReactNode;
  /**
   * Mission description text
   */
  missionDescription?: React.ReactNode;
  /**
   * Principles section label (e.g., "OUR PRINCIPLES")
   */
  principlesLabel?: React.ReactNode;
  /**
   * Array of principle configurations
   */
  principles?: ProcessMissionPrincipleItem[];
  /**
   * Custom slot for rendering principles (overrides principles array)
   */
  principlesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the mission section
   */
  missionClassName?: string;
  /**
   * Additional CSS classes for the mission label
   */
  missionLabelClassName?: string;
  /**
   * Additional CSS classes for the mission heading
   */
  missionHeadingClassName?: string;
  /**
   * Additional CSS classes for the mission description
   */
  missionDescriptionClassName?: string;
  /**
   * Additional CSS classes for the principles section
   */
  principlesSectionClassName?: string;
  /**
   * Additional CSS classes for the principles label
   */
  principlesLabelClassName?: string;
  /**
   * Additional CSS classes for the principles grid
   */
  principlesGridClassName?: string;
  /**
   * Additional CSS classes for each principle card
   */
  principleCardClassName?: string;
  /**
   * Additional CSS classes for the principle number badge
   */
  principleBadgeClassName?: string;
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * @deprecated Use `missionHeading` instead
   */
  missionTitle?: string;
}

const defaultPrinciples: ProcessMissionPrincipleItem[] = [
  {
    number: "01",
    title: "Customer First",
    description:
      "Every decision we make starts with understanding how it impacts our customers. Their success is our success.",
  },
  {
    number: "02",
    title: "Continuous Improvement",
    description:
      "We believe in constant iteration and learning. There's always a better way, and we're committed to finding it.",
  },
  {
    number: "03",
    title: "Transparency",
    description:
      "Open communication builds trust. We share our progress, challenges, and learnings with all stakeholders.",
  },
  {
    number: "04",
    title: "Quality Over Speed",
    description:
      "While we move fast, we never compromise on quality. Excellence is a habit, not an exception.",
  },
  {
    number: "05",
    title: "Collaboration",
    description:
      "Great things are built together. We foster an environment where diverse perspectives drive innovation.",
  },
  {
    number: "06",
    title: "Accountability",
    description:
      "We own our commitments and deliver on our promises. When we fall short, we learn and improve.",
  },
];

/**
 * ProcessMissionPrinciples - A mission statement and principles section.
 */
export function ProcessMissionPrinciples({
  missionLabel = "OUR MISSION",
  missionHeading = "Building the Future Together",
  missionDescription = "We're on a mission to transform how businesses operate by providing innovative solutions that drive growth, efficiency, and success. Our commitment to excellence guides everything we do.",
  principlesLabel = "OUR PRINCIPLES",
  principles = defaultPrinciples,
  principlesSlot,
  className,
  contentClassName,
  missionClassName,
  missionLabelClassName,
  missionHeadingClassName,
  missionDescriptionClassName,
  principlesSectionClassName,
  principlesLabelClassName,
  principlesGridClassName,
  principleCardClassName,
  principleBadgeClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  // Backwards compatibility
  missionTitle,
}: ProcessMissionPrinciplesProps): React.JSX.Element {
  // Handle backwards compatibility
  const resolvedMissionHeading = missionTitle ?? missionHeading;

  const renderPrinciples = () => {
    if (principlesSlot) return principlesSlot;
    if (!principles || principles.length === 0) return null;

    return (
      <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", principlesGridClassName)}>
        {principles.map((principle, index) => (
          <div
            key={index}
            className={cn(
              "group relative rounded-lg border bg-card p-6 transition-shadow hover:shadow-md",
              principleCardClassName,
              principle.className
            )}
          >
            <span className={cn(
              "absolute -top-3 -left-3 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground",
              principleBadgeClassName
            )}>
              {principle.number ?? `0${index + 1}`}
            </span>
            <div className="pt-4">
              {principle.title && (
                typeof principle.title === "string" ? (
                  <h3 className="mb-3 text-xl font-semibold tracking-tight">
                    {principle.title}
                  </h3>
                ) : (
                  <div className="mb-3 text-xl font-semibold tracking-tight">
                    {principle.title}
                  </div>
                )
              )}
              {principle.description && (
                typeof principle.description === "string" ? (
                  <p className="text-foreground/50 leading-relaxed">
                    {principle.description}
                  </p>
                ) : (
                  <div className="text-foreground/50 leading-relaxed">
                    {principle.description}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={contentClassName}>
        <div className={cn("mb-20 max-w-3xl", missionClassName)}>
          {missionLabel && (
            typeof missionLabel === "string" ? (
              <span className={cn("mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary", missionLabelClassName)}>
                {missionLabel}
              </span>
            ) : (
              <div className={missionLabelClassName}>{missionLabel}</div>
            )
          )}
          {resolvedMissionHeading && (
            typeof resolvedMissionHeading === "string" ? (
              <h1 className={cn("mb-6 text-4xl font-semibold tracking-tight lg:text-5xl", missionHeadingClassName)}>
                {resolvedMissionHeading}
              </h1>
            ) : (
              <div className={missionHeadingClassName}>{resolvedMissionHeading}</div>
            )
          )}
          {missionDescription && (
            typeof missionDescription === "string" ? (
              <p className={cn("text-lg text-foreground/50 leading-relaxed", missionDescriptionClassName)}>
                {missionDescription}
              </p>
            ) : (
              <div className={missionDescriptionClassName}>{missionDescription}</div>
            )
          )}
        </div>

        <div className={principlesSectionClassName}>
          {principlesLabel && (
            typeof principlesLabel === "string" ? (
              <span className={cn("mb-8 inline-block text-sm font-semibold uppercase tracking-wider text-primary", principlesLabelClassName)}>
                {principlesLabel}
              </span>
            ) : (
              <div className={principlesLabelClassName}>{principlesLabel}</div>
            )
          )}
          {renderPrinciples()}
        </div>
      </div>
    </Section>
  );
}
