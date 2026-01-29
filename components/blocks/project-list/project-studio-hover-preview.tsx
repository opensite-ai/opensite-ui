"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useCallback, useRef, useState, useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectStudioHoverPreviewItem {
  title: string;
  img: string;
  year: string;
  type: string;
}

export interface ProjectStudioHoverPreviewProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of project configurations
   */
  projects?: ProjectStudioHoverPreviewItem[];
  /**
   * Custom slot for rendering projects (overrides projects array)
   */
  projectsSlot?: React.ReactNode;
  /**
   * Label for the floating tooltip (defaults to "Explore")
   */
  tooltipLabel?: React.ReactNode;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
}

/**
 * ProjectStudioHoverPreview - Studio gallery grid with floating cursor-following tooltip.
 *
 * Displays projects in a responsive 3-column grid with tall portrait images. Features
 * a sophisticated floating tooltip that follows the cursor across the entire grid,
 * showing an "Explore" call-to-action with animated arrow. Each card displays project
 * metadata (title, year, type) below the image. On hover, images scale up with
 * increased brightness. The tooltip uses spring physics for smooth, natural movement.
 * Perfect for design studios, architecture firms, or creative agencies showcasing
 * their portfolio with an interactive, premium feel.
 */
export function ProjectStudioHoverPreview({
  heading,
  projects,
  projectsSlot,
  tooltipLabel,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  gridClassName,
  cardClassName,
}: ProjectStudioHoverPreviewProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });
  const springY = useSpring(mouseY, {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });

  const handleContainerMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      mouseX.set(x - 50);
      mouseY.set(y + 30);
    },
    [mouseX, mouseY],
  );

  const handleProjectMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
    setIsHovering(true);
  }, []);

  const handleContainerMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setIsHovering(false);
  }, []);

  const renderedProjects = useMemo(() => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project, index) => (
      <div key={index} className={cn("group relative", cardClassName)}>
        <div
          className="relative cursor-pointer overflow-hidden rounded-xl"
          onMouseEnter={() => handleProjectMouseEnter(index)}
        >
          <Img
            src={project.img}
            alt={project.title}
            className="h-[400px] w-full rounded-lg object-cover transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05] group-hover:brightness-110"
            optixFlowConfig={optixFlowConfig}
          />

          <div className="absolute inset-0 rounded-lg bg-foreground/0 transition-all duration-500 group-hover:bg-foreground/10" />
        </div>

        <div className="mt-4 flex justify-between gap-0.5">
          <h3 className="text-sm leading-tight font-medium transition-colors duration-300 md:text-base">
            {project.title}
          </h3>
          <div className="flex flex-col items-end">
            <p className="text-sm text-muted-foreground">{project.year}</p>
            <p className="text-sm text-muted-foreground">{project.type}</p>
          </div>
        </div>
      </div>
    ));
  }, [projectsSlot, projects, cardClassName, optixFlowConfig, hoveredIndex]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn(
            "mb-10 flex items-end justify-between",
            headerClassName,
          )}
        >
          {heading &&
            (typeof heading === "string" ? (
              <h2 className={cn("text-2xl font-semibold", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
        </div>

        <div
          ref={containerRef}
          className={cn(
            "relative grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3",
            gridClassName,
          )}
          onMouseMove={handleContainerMouseMove}
          onMouseLeave={handleContainerMouseLeave}
        >
          {renderedProjects}

          <AnimatePresence>
            {isHovering && hoveredIndex !== null && (
              <motion.div
                style={{
                  x: springX,
                  y: springY,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.5,
                }}
                className="pointer-events-none absolute top-0 left-0 z-9999 select-none"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl border border-border/10 bg-foreground/95 shadow-2xl shadow-foreground/30 backdrop-blur-md" />

                  <div className="relative flex items-center gap-3 px-3 py-3 text-sm font-medium whitespace-nowrap text-background">
                    <span className="text-base">{tooltipLabel ?? "Explore"}</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border/30 bg-card/10">
                      <motion.span
                        animate={{ x: [0, 2, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="text-xs"
                      >
                        →
                      </motion.span>
                    </div>
                  </div>

                  <div className="absolute inset-0 scale-105 rounded-2xl bg-card/5 blur-sm" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
