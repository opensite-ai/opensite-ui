"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import type { ActionConfig } from "../../../src/types";

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
  badgeText = "Developer Tools",
  badgeIcon = "lucide/terminal",
  badgeSlot,
  heading = "Build faster with modern developer tools",
  description = "Everything you need to build production-ready applications. Type-safe APIs, real-time subscriptions, and powerful CLI tools.",
  actions,
  actionsSlot,
  terminalTitle = "terminal",
  terminalLines,
  terminalSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  terminalClassName,
}: HeroDeveloperToolsCodeProps): React.JSX.Element {
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;

    return (
      <Badge variant="outline" className="w-fit">
        <DynamicIcon name={badgeIcon} size={14} className="mr-1" />
        {badgeText}
      </Badge>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

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
  };

  const renderTerminal = () => {
    if (terminalSlot) return terminalSlot;

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
  };

  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex flex-col gap-8", contentClassName)}>
            {renderBadge()}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-lg text-muted-foreground", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {renderActions()}
          </div>
          <div className="relative">
            {renderTerminal()}
          </div>
        </div>
      </div>
    </section>
  );
}
