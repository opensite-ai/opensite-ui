"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, SectionBackground, SectionSpacing } from "../../../src/types";

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
}

export function HeroDeveloperToolsCode({
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
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  terminalClassName,
}: HeroDeveloperToolsCodeProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badgeText && !badgeIcon) return null;

    return (
      <Badge variant="outline" className="w-fit">
        {badgeIcon && <DynamicIcon name={badgeIcon} size={14} className="mr-1" />}
        {badgeText}
      </Badge>
    );
  }, [badgeSlot, badgeText, badgeIcon]);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-col gap-4 sm:flex-row", actionsClassName)}>
        {actions.map((action, index) => {
          const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={actionClassName}
              {...pressableProps}
            >
              {children ?? (
                <>
                  {icon}
                  {label}
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  const renderTerminal = useMemo(() => {
    if (terminalSlot) return terminalSlot;
    if (!terminalLines || terminalLines.length === 0) return null;

    return (
      <div className={cn("overflow-hidden rounded-xl border border-border bg-zinc-950 shadow-2xl", terminalClassName)}>
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
            <div key={index} className={cn(index > 0 && "mt-1", line.colorClass)}>
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
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex flex-col gap-8", contentClassName)}>
            {renderBadge}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-lg", getTextColor(background, "muted"), descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {renderActions}
          </div>
          <div className="relative">
            {renderTerminal}
          </div>
        </div>
      </div>
    </Section>
  );
}
