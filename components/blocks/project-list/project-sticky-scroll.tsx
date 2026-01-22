"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";

import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectStickyScrollItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export interface ProjectStickyScrollProps {
  /**
   * Array of content sections (required)
   */
  content: ProjectStickyScrollItem[];
  /**
   * Custom slot for rendering content (overrides content array)
   */
  contentSlot?: React.ReactNode;
  /**
   * Background colors to cycle through
   */
  backgroundColors?: string[];
  /**
   * Linear gradients for the sticky panel
   */
  linearGradients?: string[];
  /**
   * Section background style
   */
  background?: SectionBackground;
  /**
   * Section spacing
   */
  spacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the scroll container
   */
  scrollContainerClassName?: string;
  /**
   * Additional CSS classes for the text content area
   */
  textContentClassName?: string;
  /**
   * Additional CSS classes for the sticky panel
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for each title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for each description
   */
  descriptionClassName?: string;
}

/**
 * ProjectStickyScroll - Scroll-driven content reveal with sticky gradient sidebar.
 *
 * Features a scrollable container with text content on the left and a sticky gradient
 * panel on the right that changes color as you scroll. Each content section has a title
 * and description that fade in/out based on scroll position. The background color of
 * the entire container also transitions between dark themes. The sticky panel can display
 * custom React content for each section. Perfect for storytelling, case study walkthroughs,
 * or any narrative content where visual context should remain visible while scrolling.
 */
export function ProjectStickyScroll({
  content,
  contentSlot,
  backgroundColors,
  linearGradients,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  scrollContainerClassName,
  textContentClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
}: ProjectStickyScrollProps) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients?.[0] ?? "",
  );

  useEffect(() => {
    setBackgroundGradient(
      linearGradients?.[activeCard % (linearGradients?.length ?? 1)] ?? "",
    );
  }, [activeCard, linearGradients]);

  const renderContent = () => {
    if (contentSlot) return contentSlot;

    return content.map((item, index) => (
      <div key={item.title + index} className="my-20">
        <motion.h2
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: activeCard === index ? 1 : 0.3,
          }}
          className={cn("text-2xl font-bold text-slate-100", titleClassName)}
        >
          {item.title}
        </motion.h2>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: activeCard === index ? 1 : 0.3,
          }}
          className={cn(
            "text-kg text-slate-300 max-w-sm mt-10",
            descriptionClassName,
          )}
        >
          {item.description}
        </motion.p>
      </div>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <motion.div
        animate={{
          backgroundColor:
            backgroundColors?.[activeCard % (backgroundColors?.length ?? 1)] ??
            "",
        }}
        className={cn(
          "h-120 overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10",
          scrollContainerClassName,
        )}
        ref={ref}
      >
        <div className="div relative flex items-start px-4">
          <div className={cn("max-w-2xl", textContentClassName)}>
            {renderContent()}
            <div className="h-40" />
          </div>
        </div>
        <div
          style={{ background: backgroundGradient }}
          className={cn(
            "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
            contentClassName,
          )}
        >
          {content[activeCard]?.content ?? null}
        </div>
      </motion.div>
    </Section>
  );
}
