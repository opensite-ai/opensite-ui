"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface TimelinePhaseWithIcon {
  id: number;
  date: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  icon: string;
}

export interface TimelineHorizontalIconsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Current active phase index
   */
  currentPhase?: number;
  /**
   * Array of timeline phases
   */
  phases?: TimelinePhaseWithIcon[];
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
   * Additional CSS classes for phase icons
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for phase date text
   */
  dateClassName?: string;
  /**
   * Additional CSS classes for phase title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for phase description
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

export function TimelineHorizontalIcons({
  heading,
  currentPhase,
  phases,
  className,
  containerClassName,
  headingClassName,
  cardClassName,
  phasesClassName,
  phaseClassName,
  iconClassName,
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
}: TimelineHorizontalIconsProps) {
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
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            containerClassName,
          )}
        >
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
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          containerClassName,
        )}
      >
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
          <CardContent className="relative flex flex-col items-center p-0 md:mt-12">
            <Separator className="absolute -top-8 left-0 hidden md:block" />
            {safeCurrentPhase !== undefined && phases.length > 0 && (
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${(safeCurrentPhase / phases.length) * 104}%`,
                }}
                transition={{ ease: "easeOut", duration: 0.5 }}
                className={cn(
                  "absolute -top-[33px] left-0 hidden h-0.5 bg-foreground md:block",
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
                    className="absolute top-6 left-2.5 block md:hidden"
                  />
                  {index === 0 && (
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{
                        height: safeCurrentPhase * 125,
                      }}
                      transition={{ ease: "easeOut", duration: 0.5 }}
                      className={cn(
                        "absolute top-22 left-2.5 z-10 w-0.5 bg-foreground md:hidden",
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      "absolute top-4 -left-6 z-10 mb-5 flex size-18 items-center justify-center rounded-full bg-background p-1 md:-top-17 md:-left-4",
                      iconClassName,
                    )}
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
                      <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                        <DynamicIcon name={phase.icon} size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="pl-13 md:pl-0">
                    <p
                      className={cn(
                        "mt-10 text-sm text-muted-foreground",
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
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
