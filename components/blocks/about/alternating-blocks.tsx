"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface AlternatingBlockSection {
  content: React.ReactNode;
  media: React.ReactNode;
  mediaLeft?: boolean;
}

export interface AlternatingBlocksProps {
  /**
   * Array of sections to display with alternating layout
   */
  sections?: AlternatingBlockSection[];
  /**
   * Custom slot for rendering sections (overrides sections array)
   */
  sectionsSlot?: React.ReactNode;
  /**
   * Section title (optional)
   */
  title?: React.ReactNode;
  /**
   * Section subtitle/eyebrow (optional)
   */
  subtitle?: React.ReactNode;
  /**
   * Background style variant
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing variant
   * @default "lg"
   */
  spacing?: SectionSpacing;
  /**
   * Additional CSS classes for the Section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the sections container
   */
  sectionsClassName?: string;
  /**
   * Additional CSS classes for each section item
   */
  sectionItemClassName?: string;
  /**
   * Additional CSS classes for the content column
   */
  sectionContentClassName?: string;
  /**
   * Additional CSS classes for the media column
   */
  sectionMediaClassName?: string;
  /**
   * Pattern background key or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
}

/**
 * AlternatingBlocks component displays content sections with alternating media placement.
 * Uses the Section component for consistent spacing, backgrounds, and optional titles.
 *
 * @example
 * ```tsx
 * <AlternatingBlocks
 *   title="Our Story"
 *   subtitle="About Us"
 *   background="gray"
 *   spacing="xl"
 *   sections={[
 *     {
 *       content: <div><h3>Title</h3><p>Description</p></div>,
 *       media: <img src="..." alt="..." />,
 *       mediaLeft: false
 *     }
 *   ]}
 * />
 * ```
 */
export function AlternatingBlocks({
  sections,
  sectionsSlot,
  title,
  subtitle,
  background,
  spacing,
  className,
  contentClassName,
  sectionsClassName,
  sectionItemClassName,
  sectionContentClassName,
  sectionMediaClassName,
  pattern,
  patternOpacity,
}: AlternatingBlocksProps): React.JSX.Element {
  const sectionsContent = useMemo(() => {
    if (sectionsSlot) return sectionsSlot;
    if (!sections || sections.length === 0) return null;

    return (
      <div className={cn("space-y-12", sectionsClassName)}>
        {sections.map((section, index) => (
          <div
            key={index}
            className={cn("grid items-center gap-8 md:grid-cols-2 md:gap-12", sectionItemClassName)}
          >
            <div className={cn(section.mediaLeft ? "md:order-2" : "", sectionContentClassName)}>
              {section.content}
            </div>

            <div
              className={cn(
                "aspect-4/3 overflow-hidden rounded-lg border",
                section.mediaLeft ? "md:order-1" : "",
                sectionMediaClassName,
              )}
            >
              <div className="flex h-full w-full items-center justify-center">
                {section.media}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }, [sectionsSlot, sections, sectionsClassName, sectionItemClassName, sectionContentClassName, sectionMediaClassName]);

  return (
    <Section
      title={typeof title === "string" ? title : undefined}
      subtitle={typeof subtitle === "string" ? subtitle : undefined}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      {(title && typeof title !== "string") || (subtitle && typeof subtitle !== "string") ? (
        <div className="mb-12 text-center md:mb-16">
          {subtitle && typeof subtitle !== "string" && (
            <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              {subtitle}
            </div>
          )}
          {title && typeof title !== "string" && (
            <div className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </div>
          )}
        </div>
      ) : null}
      <div className={cn("mx-auto w-full max-w-[900px]", contentClassName)}>
        {sectionsContent}
      </div>
    </Section>
  );
}
