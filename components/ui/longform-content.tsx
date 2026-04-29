"use client";

import { Img, type OptixFlowConfig } from "@page-speed/img";
import { Markdown } from "@page-speed/markdown-to-jsx/core";
import type { MarkdownStylesMap } from "@page-speed/markdown-to-jsx";
import * as React from "react";
import { Pressable } from "@page-speed/pressable";

/**
 * Props for the LongformContent component.
 *
 * @property children - JSX content to render when `renderMode` is "jsx"
 * @property renderMode - Controls whether to render JSX children or markdown string ("jsx" | "markdown")
 * @property markdownString - Markdown content to render when `renderMode` is "markdown"
 * @property optixFlowConfig - OptixFlow image optimization configuration for images in markdown
 * @property markdownStyles - Custom className mappings for markdown elements
 */
export interface LongformContentProps {
  /**
   * JSX content to render when `renderMode` is "jsx".
   * Ignored when `renderMode` is "markdown".
   */
  children?: React.ReactNode;
  /**
   * Controls the rendering strategy for article content.
   * - "jsx": Renders the `children` prop as-is
   * - "markdown": Parses and renders the `markdownString` prop
   * @default "markdown"
   */
  renderMode?: "jsx" | "markdown";
  /**
   * Markdown string to parse and render when `renderMode` is "markdown".
   * Supports standard markdown syntax including headings, links, images, etc.
   */
  markdownString?: string;
  /**
   * OptixFlow configuration for optimizing images within markdown content.
   * Applied to all `<img>` tags when rendering markdown.
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Custom className mappings for markdown elements.
   * Allows styling individual markdown elements like headings, paragraphs, etc.
   * @example { h2: 'text-3xl font-bold', img: 'rounded-lg shadow-md' }
   */
  markdownStyles?: MarkdownStylesMap;
}

/**
 * A unified content rendering component for longform article content.
 *
 * Supports two rendering modes:
 * - **JSX mode** (default): Renders React children directly
 * - **Markdown mode**: Parses and renders markdown strings with automatic
 *   image optimization and link handling
 *
 * This component centralizes the markdown-to-JSX conversion logic with built-in
 * optimizations for images (via OptixFlow) and links (via Pressable).
 *
 * @example
 * ```tsx
 * // JSX mode (default)
 * <LongformContent>
 *   <p>Your JSX content here</p>
 * </LongformContent>
 *
 * // Markdown mode
 * <LongformContent
 *   renderMode="markdown"
 *   markdownString="# Hello World\n\nThis is **markdown** content."
 *   optixFlowConfig={{ quality: 80 }}
 * />
 * ```
 */
export function LongformContent({
  children,
  renderMode = "markdown",
  markdownString,
  optixFlowConfig,
  markdownStyles,
}: LongformContentProps): React.JSX.Element | null {
  /**
   * Determines whether markdown rendering should be used.
   * Only renders markdown when:
   * - renderMode is explicitly set to "markdown"
   * - markdownString is a non-empty string
   */
  const shouldRenderMarkdown = React.useMemo(() => {
    return (
      renderMode === "markdown" &&
      typeof markdownString === "string" &&
      markdownString.length > 0
    );
  }, [renderMode, markdownString]);

  if (shouldRenderMarkdown && markdownString) {
    return (
      <Markdown
        markdownStyles={markdownStyles}
        optixFlowConfig={optixFlowConfig}
        overrides={{
          img: Img,
          a: Pressable,
        }}
      >
        {markdownString}
      </Markdown>
    );
  }

  if (children) {
    return <>{children}</>;
  }

  return null;
}
