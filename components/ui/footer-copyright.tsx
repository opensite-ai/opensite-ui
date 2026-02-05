"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../lib/utils";

/**
 * Props for the FooterCopyright component
 */
export interface FooterCopyrightProps {
  /**
   * The brand/company name to display in the copyright notice.
   * Will be formatted as: © {currentYear} {copyright}. All Rights Reserved.
   */
  copyright?: string;
  /**
   * Additional CSS classes for the copyright paragraph
   */
  className?: string;
}

/**
 * FooterCopyright - A shared component for rendering standardized copyright text.
 *
 * Automatically includes the current year and formats the copyright notice
 * in a consistent way across all footer blocks.
 *
 * @example
 * ```tsx
 * <FooterCopyright copyright="Opensite AI" />
 * // Renders: © 2024 Opensite AI. All Rights Reserved.
 * ```
 */
export function FooterCopyright({
  copyright,
  className,
}: FooterCopyrightProps): React.JSX.Element | null {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  if (!copyright) {
    return null;
  }

  return (
    <p className={cn(className)}>
      © {currentYear} {copyright} All Rights Reserved.
    </p>
  );
}
