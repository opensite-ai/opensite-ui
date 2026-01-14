"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface TimelineHistoryEntry {
  date: React.ReactNode;
  title: React.ReactNode;
  /**
   * Content as ReactNode (preferred) or HTML string for dangerouslySetInnerHTML
   */
  content?: React.ReactNode;
  /**
   * HTML string content (used if content is not provided)
   */
  contentHtml?: string;
}

export interface TimelineHistoryProseProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of timeline entries
   */
  entries?: TimelineHistoryEntry[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the entries wrapper
   */
  entriesClassName?: string;
  /**
   * Additional CSS classes for individual entry items
   */
  entryClassName?: string;
  /**
   * Additional CSS classes for entry title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for entry date
   */
  dateClassName?: string;
  /**
   * Additional CSS classes for entry content
   */
  contentClassName?: string;
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
   * Additional CSS classes for the pattern background
   */
  patternClassName?: string;
  /**
   * Section ID for anchor links
   */
  id?: string;
  /**
   * Inline styles for the section
   */
  style?: React.CSSProperties;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function TimelineHistoryProse({
  heading = "The History of Artificial Intelligence",
  entries,
  className,
  containerClassName,
  headingClassName,
  entriesClassName,
  entryClassName,
  titleClassName,
  dateClassName,
  contentClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
}: TimelineHistoryProseProps) {
  if (!entries || entries.length === 0) {
    return (
      <Section
        id={id}
        background={background}
        spacing={spacing}
        className={className}
        pattern={pattern}
        patternOpacity={patternOpacity}
        patternClassName={patternClassName}
        style={style}
      >
        <div className={containerClassName}>
          <h1 className={cn("mb-10 text-center text-3xl font-bold tracking-tighter text-foreground sm:text-6xl", headingClassName)}>
            {heading}
          </h1>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id={id}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      style={style}
    >
      <div className={containerClassName}>
        <h1 className={cn("mb-10 text-center text-3xl font-bold tracking-tighter text-foreground sm:text-6xl", headingClassName)}>
          {heading}
        </h1>
        <div className={cn("relative mx-auto max-w-4xl", entriesClassName)}>
          <Separator
            orientation="vertical"
            className="absolute top-4 left-2 bg-muted"
          />
          {entries.map((entry, index) => (
            <div key={index} className={cn("relative mb-10 pl-8", entryClassName)}>
              <div className="absolute top-3.5 left-0 flex size-4 items-center justify-center rounded-full bg-foreground" />
              <h4 className={cn("rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3", titleClassName)}>
                {entry.title}
              </h4>

              <h5 className={cn("text-md top-3 -left-34 rounded-xl tracking-tight text-muted-foreground xl:absolute", dateClassName)}>
                {entry.date}
              </h5>

              <Card className="my-5 border-none shadow-none">
                <CardContent className="px-0 xl:px-2">
                  {entry.content ? (
                    <div className={cn("prose text-foreground dark:prose-invert", contentClassName)}>
                      {entry.content}
                    </div>
                  ) : entry.contentHtml ? (
                    <div
                      className={cn("prose text-foreground dark:prose-invert", contentClassName)}
                      dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
                    />
                  ) : null}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
