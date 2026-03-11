"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

export interface TerminalLine {
  /**
   * Text content of the line
   */
  text: string;
  /**
   * Color class for the line
   */
  colorClass?: string;
  /**
   * Prefix text (e.g., "info", "success")
   */
  prefix?: string;
  /**
   * Color class for the prefix
   */
  prefixColorClass?: string;
}

export interface HeroDeveloperToolsCodeProps {
  /**
   * Badge text content
   */
  badgeText?: React.ReactNode;
  /**
   * Badge icon name
   */
  badgeIcon?: string;
  /**
   * Custom slot for badge (overrides badge props)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Terminal window title
   */
  terminalTitle?: string;
  /**
   * Array of terminal output lines
   */
  terminalLines?: TerminalLine[];
  /**
   * Custom slot for terminal content (overrides terminalLines)
   */
  terminalSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
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
  /**
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the terminal container
   */
  terminalClassName?: string;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroDeveloperToolsCode({
  sectionId = "hero-developer-tools-code",
  badgeText,
  badgeIcon,
  badgeSlot,
  heading,
  description,
  actions,
  actionsSlot,
  terminalTitle = "terminal",
  terminalLines,
  terminalSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  patternClassName,
  terminalClassName,
}: HeroDeveloperToolsCodeProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badgeText && !badgeIcon) return null;

    return (
      <Badge className="gap-2 px-4 py-1">
        {badgeIcon && <DynamicIcon name={badgeIcon} size={14} />}
        {badgeText}
      </Badge>
    );
  }, [badgeSlot, badgeText, badgeIcon]);

  const renderTerminal = useMemo(() => {
    if (terminalSlot) return terminalSlot;
    if (!terminalLines || terminalLines.length === 0) return null;

    return (
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-zinc-950 shadow-2xl",
          terminalClassName,
        )}
      >
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-sm text-zinc-500">
            {terminalTitle}
          </div>
        </div>
        <div className="p-4 font-mono text-sm">
          {terminalLines.map((line, index) => (
            <div
              key={index}
              className={cn(index > 0 && "mt-1", line.colorClass)}
            >
              {line.prefix && (
                <span className={line.prefixColorClass}>{line.prefix}</span>
              )}{" "}
              {line.text}
            </div>
          ))}
          <div className="mt-2 flex items-center">
            <span className="text-zinc-500">$</span>
            <span className="ml-1 h-4 w-2 animate-pulse bg-zinc-400"></span>
          </div>
        </div>
      </div>
    );
  }, [terminalSlot, terminalLines, terminalTitle, terminalClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="pt-8 md:pt-0">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex flex-col gap-4 md:gap-8", contentClassName)}>
            {renderBadge}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-pretty",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                heading
              ))}
            {description &&
              (typeof description === "string" ? (
                <p className={cn("text-lg text-balance", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                description
              ))}
            <BlockActions
              actions={actions}
              actionsSlot={actionsSlot}
              actionsClassName={actionsClassName}
            />
          </div>
          <div className="relative">{renderTerminal}</div>
        </div>
      </div>
    </Section>
  );
}
