"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaMinimalSeparatorProps {
  /**
   * Main text content
   */
  text?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the text
   */
  textClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the separators
   */
  separatorClassName?: string;
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
}

/**
 * CtaMinimalSeparator - A minimal CTA section with centered text and a single
 * button flanked by horizontal separators. Ultra-clean design for subtle
 * conversion prompts.
 *
 * @example
 * ```tsx
 * <CtaMinimalSeparator
 *   text="Ready to get started?"
 *   actions={[
 *     { label: "Sign Up", href: "/signup", variant: "default" }
 *   ]}
 * />
 * ```
 */
export function CtaMinimalSeparator({
  text,
  actions,
  actionsSlot,
  className,
  containerClassName,
  contentClassName,
  textClassName,
  actionsClassName,
  separatorClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: CtaMinimalSeparatorProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => (
      <Pressable
        key={index}
        href={action.href}
        onClick={action.onClick}
        variant={action.variant}
        size={action.size}
        className={action.className}
        aria-label={action["aria-label"]}
        asButton
      >
        {action.icon}
        {action.children ?? action.label}
        {action.iconAfter}
      </Pressable>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className="flex flex-col items-center gap-8">
          <Separator className={cn("w-full", separatorClassName)} />
          <div
            className={cn(
              "flex flex-col items-center gap-6 text-center md:flex-row md:gap-8",
              contentClassName
            )}
          >
            <p className={cn("text-lg text-muted-foreground", textClassName)}>
              {text}
            </p>
            <div className={actionsClassName}>{renderActions()}</div>
          </div>
          <Separator className={cn("w-full", separatorClassName)} />
        </div>
      </div>
    </Section>
  );
}
