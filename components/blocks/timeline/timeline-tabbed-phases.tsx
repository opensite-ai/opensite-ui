"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardContent } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { ActionConfig } from "../../../src/types/blocks";

export interface TimelineTabbedPhase {
  id: string;
  phase: string;
  title: React.ReactNode;
  date: React.ReactNode;
  heading: React.ReactNode;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
}

export interface TimelineTabbedPhasesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of timeline phases
   */
  phases?: TimelineTabbedPhase[];
  /**
   * Download action configuration
   */
  downloadAction?: ActionConfig;
  /**
   * Custom slot to override the default download button rendering
   */
  downloadSlot?: React.ReactNode;
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
   * Additional CSS classes for the tabs list
   */
  tabsListClassName?: string;
  /**
   * Additional CSS classes for tab triggers
   */
  tabTriggerClassName?: string;
  /**
   * Additional CSS classes for tab content
   */
  tabContentClassName?: string;
  /**
   * Additional CSS classes for phase dates
   */
  dateClassName?: string;
  /**
   * Additional CSS classes for phase headings
   */
  phaseHeadingClassName?: string;
  /**
   * Additional CSS classes for phase descriptions
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for phase images
   */
  imageClassName?: string;
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

export function TimelineTabbedPhases({
  heading,
  phases,
  downloadAction,
  downloadSlot,
  className,
  containerClassName,
  headingClassName,
  tabsListClassName,
  tabTriggerClassName,
  tabContentClassName,
  dateClassName,
  phaseHeadingClassName,
  descriptionClassName,
  imageClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
  optixFlowConfig,
}: TimelineTabbedPhasesProps) {
  const renderDownloadButton = React.useMemo(() => {
    if (downloadSlot) {
      return downloadSlot;
    }
    if (downloadAction) {
      return (
        <Pressable
          href={downloadAction.href}
          onClick={downloadAction.onClick}
          variant={downloadAction.variant || "outline"}
          size={downloadAction.size}
          asButton
          className={cn(
            "mt-8 flex w-fit items-center gap-2 rounded-full border border-border px-4! py-2",
            downloadAction.className,
          )}
          aria-label={downloadAction["aria-label"]}
        >
          <DynamicIcon name="lucide/download" size={16} />
          <p className="text-md font-medium text-foreground">
            Click to{" "}
            <span className="text-foreground/80">
              {downloadAction.children || downloadAction.label}
            </span>
          </p>
        </Pressable>
      );
    }
    return null;
  }, [downloadSlot, downloadAction]);

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
              "mb-12 text-5xl font-semibold tracking-tighter lg:mb-25 lg:text-7xl",
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
            "mb-12 text-5xl font-semibold tracking-tighter lg:mb-25 lg:text-7xl",
            headingClassName,
          )}
        >
          {heading}
        </h1>
        <Tabs defaultValue={phases[0]?.id || "phase1"} className="w-full">
          <TabsList
            className={cn(
              "grid w-full bg-transparent p-0",
              `grid-cols-${phases.length}`,
              tabsListClassName,
            )}
          >
            {phases.map((phase) => (
              <TabsTrigger
                key={phase.id}
                className={cn(
                  "text-md rounded-none border-b-2 pb-6 shadow-none! data-[state=active]:border-b-foreground",
                  tabTriggerClassName,
                )}
                value={phase.id}
              >
                <span className="hidden font-mono text-foreground/40 md:inline">
                  {phase.phase}
                </span>
                {phase.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {phases.map((phase) => (
            <TabsContent
              key={phase.id}
              value={phase.id}
              className={cn(
                "mt-12 grid items-start gap-12 lg:grid-cols-2",
                tabContentClassName,
              )}
            >
              <div className="col-span-1 flex flex-col gap-2 lg:max-w-lg lg:gap-4">
                <p
                  className={cn(
                    "font-mono text-sm font-semibold tracking-tight text-muted-foreground",
                    dateClassName,
                  )}
                >
                  {phase.date}
                </p>
                <h2
                  className={cn(
                    "text-3xl font-medium tracking-tighter text-foreground md:text-5xl",
                    phaseHeadingClassName,
                  )}
                >
                  {phase.heading}
                </h2>
                <p
                  className={cn(
                    "text-lg font-normal tracking-tighter text-muted-foreground",
                    descriptionClassName,
                  )}
                >
                  {phase.description}
                </p>
                {renderDownloadButton}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 100, y: 0 }}
                transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.8 }}
                className="relative z-20 col-span-1"
              >
                <Card className="group h-110 w-full rounded-3xl border border-border bg-background p-2 shadow-none">
                  <CardContent className="size-full rounded-2xl border-2 border-background bg-muted">
                    <Img
                      src={phase.imageSrc}
                      alt={phase.imageAlt}
                      className={cn(
                        "size-full transition-all ease-in-out group-hover:scale-95",
                        imageClassName,
                      )}
                      optixFlowConfig={optixFlowConfig}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Section>
  );
}
