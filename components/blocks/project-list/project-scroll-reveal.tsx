"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectScrollRevealItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
}

export interface ProjectScrollRevealProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of project configurations
   */
  projects?: ProjectScrollRevealItem[];
  /**
   * Custom slot for rendering projects (overrides projects array)
   */
  projectsSlot?: React.ReactNode;
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

interface ProjectItemProps {
  project: ProjectScrollRevealItem;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  mousePos: { x: number; y: number };
  setMousePos: (pos: { x: number; y: number }) => void;
  optixFlowConfig?: OptixFlowConfig;
}

const ProjectItem = ({
  project,
  index,
  containerRef,
  hoveredIndex,
  setHoveredIndex,
  mousePos,
  setMousePos,
  optixFlowConfig,
}: ProjectItemProps) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 1.05],
  );
  const scrollY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.7, 1, 1, 0.7],
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <motion.div
      key={project.id}
      className="group relative cursor-pointer"
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl"
        style={{
          scale: scrollScale,
          y: scrollY,
          opacity: scrollOpacity,
        }}
      >
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: hoveredIndex === index ? 1.15 : 1.1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <Img
            src={project.image}
            alt={project.title}
            className="h-full w-full rounded-xl object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: hoveredIndex === index ? 0.8 : 0.6 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.div
            className="flex items-center gap-2 text-sm text-white/80 lg:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: hoveredIndex === index ? -5 : 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <p className="text-lg font-medium">{project.date}</p>
            <span>|</span>
            <p>{project.category}</p>
          </motion.div>
          <motion.h2
            className="px-4 text-center text-xl font-semibold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: hoveredIndex === index ? -10 : 0,
              scale: hoveredIndex === index ? 1.05 : 1,
            }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            {project.title}
          </motion.h2>
        </div>
      </motion.div>

      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.div
            key={`icon-${project.id}`}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.3,
            }}
            style={{
              top: mousePos.y - 24,
              left: mousePos.x - 24,
              position: "absolute",
              pointerEvents: "none",
            }}
            className="z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-sm"
          >
            <motion.div
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <DynamicIcon name="lucide/plus" size={20} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * ProjectScrollReveal - Scroll-triggered project cards with parallax effects and cursor-following icon.
 *
 * Features large project cards that animate in as they enter the viewport with scale, opacity,
 * and parallax effects tied to scroll position. Each card displays a full-bleed image with
 * gradient overlay, date, category, and title centered over the image. On hover, a floating
 * plus icon follows the cursor with spring physics. The cards scale up slightly on hover
 * with enhanced overlay. Perfect for immersive portfolio presentations where scroll-based
 * storytelling and interactive hover states create an engaging browsing experience.
 */
export function ProjectScrollReveal({
  heading,
  projects,
  projectsSlot,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headingClassName,
  gridClassName,
  cardClassName,
}: ProjectScrollRevealProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const renderedProjects = useMemo(() => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project, index) => (
      <ProjectItem
        key={project.id}
        project={project}
        index={index}
        containerRef={containerRef}
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
        mousePos={mousePos}
        setMousePos={setMousePos}
        optixFlowConfig={optixFlowConfig}
      />
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
      <div className={cn("container space-y-16", containerClassName)}>
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "text-center text-4xl font-semibold md:text-6xl",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}

        <motion.div
          ref={containerRef}
          className={cn(
            "mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:gap-12",
            gridClassName,
          )}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {renderedProjects}
        </motion.div>
      </div>
    </Section>
  );
}
