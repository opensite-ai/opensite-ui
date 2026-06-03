"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "../../../lib/utils";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

export interface HeroTaskTimerAnimatedProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Custom slot for heading (overrides heading prop)
   */
  headingSlot?: React.ReactNode;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Array of task labels that cycle through with animation
   */
  taskItems?: string[];
  /**
   * Starting minutes for the animated countdown display (default: 25 — Pomodoro style)
   */
  timerMinutes?: number;
  /**
   * Starting seconds for the animated countdown display (default: 0)
   */
  timerSeconds?: number;
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
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

function padTwo(n: number): string {
  return n.toString().padStart(2, "0");
}

const RING_RADIUS = 90;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function HeroTaskTimerAnimated({
  sectionId = "hero-task-timer-animated",
  heading,
  headingSlot,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  taskItems,
  timerMinutes = 25,
  timerSeconds = 0,
  background,
  pattern,
  patternOpacity,
  className,
  spacing = "hero",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  headingClassName,
  descriptionClassName,
  logo,
  logoSlot,
  logoClassName,
}: HeroTaskTimerAnimatedProps): React.JSX.Element {
  const initialTotal = timerMinutes * 60 + timerSeconds;
  const [remaining, setRemaining] = useState(initialTotal);
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => (prev <= 0 ? initialTotal : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [initialTotal]);

  const cycleTask = useCallback(() => {
    if (!taskItems || taskItems.length <= 1) return;
    setActiveTaskIndex((prev) => (prev + 1) % taskItems.length);
  }, [taskItems]);

  useEffect(() => {
    if (!taskItems || taskItems.length <= 1) return;
    const interval = setInterval(cycleTask, 3000);
    return () => clearInterval(interval);
  }, [taskItems, cycleTask]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = initialTotal > 0 ? remaining / initialTotal : 1;
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);

  const renderHeading = useMemo(() => {
    if (headingSlot) return headingSlot;
    if (!heading) return null;

    return typeof heading === "string" ? (
      <h1
        className={cn(
          "max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance",
          headingClassName,
        )}
      >
        {heading}
      </h1>
    ) : (
      heading
    );
  }, [headingSlot, heading, headingClassName]);

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
      <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Text content */}
        <div
          className={cn(
            "flex flex-col gap-5 w-full lg:w-1/2 pt-8 lg:pt-0",
            headerClassName,
          )}
        >
          {(logo || logoSlot) && (
            <div className={cn("mb-4", logoClassName)}>
              <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />
            </div>
          )}

          {renderHeading}

          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "max-w-full md:max-w-xl text-lg text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}

          {taskItems && taskItems.length > 0 && (
            <div className="mt-2 flex flex-col gap-3">
              {taskItems.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 transition-all duration-700 ease-in-out"
                  style={{
                    opacity: index === activeTaskIndex ? 1 : 0.35,
                    transform:
                      index === activeTaskIndex
                        ? "translateX(8px)"
                        : "translateX(0)",
                  }}
                >
                  <div
                    className={cn(
                      "size-2.5 shrink-0 rounded-xl transition-colors duration-700",
                      index === activeTaskIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/30",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium transition-all duration-700",
                      index === activeTaskIndex ? "opacity-100" : "opacity-50",
                    )}
                  >
                    {task}
                  </span>
                </div>
              ))}
            </div>
          )}

          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={cn("mt-2", actionsClassName)}
          />
        </div>

        {/* Animated timer display */}
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative">
              <svg
                width="240"
                height="240"
                viewBox="0 0 220 220"
                className="drop-shadow-lg"
              >
                <circle
                  cx="110"
                  cy="110"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-muted-foreground/15"
                />
                <circle
                  cx="110"
                  cy="110"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="text-primary transition-[stroke-dashoffset] duration-1000 ease-linear"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 110 110)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-5xl font-bold tabular-nums tracking-tight md:text-6xl">
                    {padTwo(minutes)}
                  </span>
                  <span className="animate-pulse text-3xl font-bold text-primary md:text-4xl">
                    :
                  </span>
                  <span className="text-5xl font-bold tabular-nums tracking-tight md:text-6xl">
                    {padTwo(seconds)}
                  </span>
                </div>
              </div>
            </div>

            {taskItems && taskItems.length > 0 && (
              <div className="relative h-8 w-full max-w-[280px] overflow-hidden">
                {taskItems.map((task, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
                    style={{
                      opacity: index === activeTaskIndex ? 1 : 0,
                      transform:
                        index === activeTaskIndex
                          ? "translateY(0)"
                          : "translateY(12px)",
                    }}
                  >
                    <span className="truncate rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                      {task}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
