"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface TimelineChangelogItem {
  /**
   * Content as ReactNode (preferred)
   */
  content?: React.ReactNode;
  /**
   * HTML string content (used if content is not provided)
   */
  contentHtml?: string;
}

export interface TimelineChangelogEntry {
  date: React.ReactNode;
  items: TimelineChangelogItem[];
}

export interface TimelineChangelogBadgesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of changelog entries
   */
  entries?: TimelineChangelogEntry[];
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
   * Additional CSS classes for date badges
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the items list
   */
  itemsClassName?: string;
  /**
   * Additional CSS classes for individual item content
   */
  itemClassName?: string;
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

const defaultEntries: TimelineChangelogEntry[] = [
  {
    date: "March 21, 2025",
    items: [
      {
        contentHtml:
          "Launched <strong>AI-powered code generation</strong> in our IDE, allowing developers to generate boilerplate code with natural language prompts.",
      },
      {
        contentHtml:
          "Introduced <em>contextual code suggestions</em> that understand project structure and coding patterns for more accurate completions.",
      },
      {
        contentHtml:
          "Added <u>automated code refactoring</u> capabilities that suggest and apply improvements to existing codebases.",
      },
    ],
  },
  {
    date: "March 19, 2025",
    items: [
      {
        contentHtml:
          "Released <strong>AI-driven debugging assistant</strong> that identifies potential issues and suggests fixes before runtime.",
      },
      {
        contentHtml:
          "Implemented <em>smart documentation generation</em> that automatically creates comprehensive docs from code comments and structure.",
      },
      {
        contentHtml:
          "Enhanced <u>code review automation</u> with AI-powered analysis of code quality and best practices.",
      },
    ],
  },
  {
    date: "March 17, 2025",
    items: [
      {
        contentHtml:
          "Announced <strong>AI pair programming</strong> feature that provides real-time coding assistance and explanations.",
      },
      {
        contentHtml:
          "Launched <em>intelligent dependency management</em> that suggests optimal package versions and identifies potential conflicts.",
      },
      {
        contentHtml:
          "Introduced <u>automated test generation</u> that creates comprehensive test suites based on code functionality.",
      },
    ],
  },
];

export function TimelineChangelogBadges({
  heading = "Timeline",
  entries = defaultEntries,
  className,
  containerClassName,
  headingClassName,
  entriesClassName,
  entryClassName,
  badgeClassName,
  itemsClassName,
  itemClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
}: TimelineChangelogBadgesProps) {
  if (entries.length === 0) {
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
          <h1 className={cn("mb-10 text-center text-3xl font-bold tracking-tighter text-foreground lg:text-6xl", headingClassName)}>
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
        <h1 className={cn("mb-10 text-center text-3xl font-bold tracking-tighter text-foreground lg:text-6xl", headingClassName)}>
          {heading}
        </h1>
        <div className={cn("relative mx-auto max-w-4xl", entriesClassName)}>
          <Separator
            orientation="vertical"
            className="absolute top-4 left-2 bg-muted"
          />
          {entries.map((entry, index) => (
            <div key={index} className={cn("relative mb-10 pl-8", entryClassName)}>
              <div className="absolute top-2 left-0 flex size-5 items-center justify-center rounded-full bg-foreground">
                <div className="size-3 rounded-full bg-background" />
              </div>
              <Badge
                variant="secondary"
                className={cn("mb-4 rounded-xl px-3 py-2 text-sm", badgeClassName)}
              >
                {entry.date}
              </Badge>

              <Card className="my-5 border-none shadow-none">
                <CardContent className="px-2">
                  <ul className={cn("flex flex-col gap-1", itemsClassName)}>
                    {entry.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-foreground" />
                        {item.content ? (
                          <span className={cn("text-md leading-relaxed text-foreground", itemClassName)}>
                            {item.content}
                          </span>
                        ) : item.contentHtml ? (
                          <span
                            className={cn("text-md leading-relaxed text-foreground", itemClassName)}
                            dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                          />
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
