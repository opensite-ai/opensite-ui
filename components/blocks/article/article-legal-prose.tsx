"use client";

import * as React from "react";
import { cn, getProseClassName } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { MarkdownStylesMap } from "@page-speed/markdown-to-jsx";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { LongformContent } from "@/components/ui/longform-content";

export interface ArticleLegalProseProps {
  /**
   * Document title rendered as the page heading, e.g. "Privacy Policy" or
   * "Terms of Use".
   */
  title?: string;
  /**
   * Optional short label prefixing the revision line, e.g. "Last updated".
   * Rendered only when lastUpdatedDate is also supplied.
   */
  lastUpdatedLabel?: string;
  /**
   * Optional human-readable revision date string, e.g. "March 12, 2026".
   * Supply a real date only; omit entirely when the revision date is unknown.
   */
  lastUpdatedDate?: string;
  /**
   * The complete legal document body as markdown. Use ## headings for the
   * document's sections (e.g. "## Information We Collect").
   */
  markdownString?: string;
  /**
   * Custom className mappings for markdown elements
   * @example { h2: 'text-2xl font-semibold', p: 'leading-relaxed' }
   */
  markdownStyles?: MarkdownStylesMap;
  /**
   * OptixFlow image optimization configuration for images in markdown
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Additional CSS classes for the document header (title + revision line)
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the prose content wrapper
   */
  proseClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ArticleLegalProse renders a legal or policy document — privacy policy,
 * terms of use/service, EULA, cookie policy — as one clean long-form prose
 * page: a document title, an optional last-updated line, and the entire
 * document body as sectioned markdown.
 *
 * Unlike the other article blocks it has no byline, publication date, or
 * hero image: legal documents carry none of that metadata, and fabricating
 * it is forbidden.
 *
 * @example
 * ```tsx
 * <ArticleLegalProse
 *   title="Privacy Policy"
 *   lastUpdatedLabel="Last updated"
 *   lastUpdatedDate="March 12, 2026"
 *   markdownString={"## Overview\nWhat this policy covers..."}
 * />
 * ```
 */
export function ArticleLegalProse({
  sectionId = "article-legal-prose",
  title,
  lastUpdatedLabel,
  lastUpdatedDate,
  markdownString,
  markdownStyles,
  optixFlowConfig,
  headerClassName,
  titleClassName,
  proseClassName,
  background,
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
}: ArticleLegalProseProps) {
  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      {(title || lastUpdatedDate) && (
        <header
          className={cn(
            "mx-auto mb-10 flex w-full max-w-3xl flex-col gap-3",
            headerClassName,
          )}
        >
          {title && (
            <h1
              className={cn(
                "text-3xl font-semibold text-balance md:text-4xl",
                titleClassName,
              )}
            >
              {title}
            </h1>
          )}
          {lastUpdatedDate && (
            <p className="text-sm opacity-70">
              {lastUpdatedLabel
                ? `${lastUpdatedLabel}: ${lastUpdatedDate}`
                : lastUpdatedDate}
            </p>
          )}
        </header>
      )}
      {markdownString && (
        <div
          className={cn(
            getProseClassName(background, "w-full max-w-3xl"),
            "mx-auto",
            proseClassName,
          )}
        >
          <LongformContent
            renderMode="markdown"
            markdownString={markdownString}
            optixFlowConfig={optixFlowConfig}
            markdownStyles={markdownStyles}
          />
        </div>
      )}
    </Section>
  );
}
