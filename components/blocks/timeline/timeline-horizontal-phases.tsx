"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface TimelinePhase {
  id: number;
  date: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface TimelineHorizontalPhasesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Current active phase index (0-based)
   */
  currentPhase?: number;
  /**
   * Array of timeline phases
   */
  phases?: TimelinePhase[];
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
   * Additional CSS classes for the card wrapper
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the phases grid
   */
  phasesClassName?: string;
  /**
   * Additional CSS classes for individual phase items
   */
  phaseClassName?: string;
  /**
   * Additional CSS classes for phase dates
   */
  dateClassName?: string;
  /**
   * Additional CSS classes for phase titles
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for phase descriptions
   */
  descriptionClassName?: string;
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
  pattern?: PatternName | undefined;
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

export function TimelineHorizontalPhases({
  heading,
  currentPhase,
  phases,
  className,
  containerClassName,
  headingClassName,
  cardClassName,
  phasesClassName,
  phaseClassName,
  dateClassName,
  titleClassName,
  descriptionClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
}: TimelineHorizontalPhasesProps) {
  const safeCurrentPhase =
    (phases?.length ?? 0) > 0
      ? Math.max(0, Math.min(currentPhase ?? 0, (phases?.length ?? 1) - 1))
      : 0;

  if (!phases || phases.length === 0) {
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
        <div className={cn("flex flex-col items-center", containerClassName)}>
          <h1
            className={cn(
              "mb-10 text-center text-3xl font-bold tracking-tighter sm:text-6xl",
              headingClassName,
            )}
          >
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
      <div className={cn("flex flex-col items-center", containerClassName)}>
        <h1
          className={cn(
            "mb-10 text-center text-3xl font-bold tracking-tighter sm:text-6xl",
            headingClassName,
          )}
        >
          {heading}
        </h1>
        <Card
          className={cn(
            "relative w-full border-none shadow-none md:py-16",
            cardClassName,
          )}
        >
          <CardContent className="p-0">
            <div className="relative flex flex-col items-center md:mt-12">
              <Separator className="absolute -top-8 left-0 hidden md:block" />
              {safeCurrentPhase !== undefined && (
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(safeCurrentPhase / phases.length) * 104}%`,
                  }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  className={cn(
                    "absolute -top-8 left-0 hidden h-0.5 bg-foreground md:block",
                  )}
                />
              )}

              <div className={cn("grid gap-6 md:grid-cols-4", phasesClassName)}>
                {phases.map((phase, index) => (
                  <div
                    key={phase.id}
                    className={cn("relative space-y-2", phaseClassName)}
                  >
                    <Separator
                      orientation="vertical"
                      className="absolute top-6 left-0 block md:hidden"
                    />
                    {index === 0 && (
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{
                          height: safeCurrentPhase * 112,
                        }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className={cn(
                          "absolute left-0 z-10 w-0.5 bg-foreground md:hidden",
                        )}
                      />
                    )}
                    <div className="absolute top-0 -left-[9px] z-10 mb-5 flex size-5 items-center justify-center rounded-full bg-foreground p-1 md:-top-10 md:left-0">
                      <div className="size-full rounded-full bg-background" />
                    </div>

                    <div className="pl-7 md:pl-0">
                      <p
                        className={cn(
                          "text-sm text-muted-foreground",
                          dateClassName,
                        )}
                      >
                        {phase.date}
                      </p>
                      <h2
                        className={cn(
                          "text-xl font-bold tracking-tighter",
                          titleClassName,
                        )}
                      >
                        {phase.title}
                      </h2>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground",
                          descriptionClassName,
                        )}
                      >
                        {phase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
