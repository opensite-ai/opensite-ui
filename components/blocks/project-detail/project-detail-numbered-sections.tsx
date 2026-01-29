"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectDetailNumberedSectionsSection {
  number: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
  image?: {
    src?: string;
    alt: string;
  };
}

export interface ProjectDetailNumberedSectionsProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Project year */
  year?: React.ReactNode;
  /** Category label */
  category?: React.ReactNode;
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** Description text */
  description?: React.ReactNode;
  /** Numbered content sections */
  sections?: ProjectDetailNumberedSectionsSection[];
  /** Back navigation action */
  backAction?: ActionConfig;
  /** Custom slot for back action (overrides backAction) */
  backActionSlot?: React.ReactNode;
  /** OptixFlow image optimization configuration */
  optixFlowConfig?: OptixFlowConfig;
  /** Section background variant */
  background?: SectionBackground;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Background pattern */
  pattern?: PatternName | undefined;
  /** Pattern opacity */
  patternOpacity?: number;
  /** Additional CSS classes for the section */
  className?: string;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Additional CSS classes for the header */
  headerClassName?: string;
  /** Additional CSS classes for the title */
  titleClassName?: string;
  /** Additional CSS classes for the hero image */
  heroImageClassName?: string;
  /** Additional CSS classes for the numbered sections */
  sectionsClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailNumberedSections(
  props: ProjectDetailNumberedSectionsProps,
): React.JSX.Element {
  const {
    title,
    subtitle,
    year,
    category,
    heroImage,
    description,
    sections,
    backAction,
    backActionSlot,
    optixFlowConfig,
    background,
    spacing,
    pattern,
    patternOpacity,
    className,
    containerClassName,
    headerClassName,
    titleClassName,
    heroImageClassName,
    sectionsClassName,
  } = props;

  const renderedBackAction = useMemo(() => {
    if (backActionSlot) return backActionSlot;
    if (!backAction) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = backAction;
    return (
      <Pressable
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
          actionClassName,
        )}
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
  }, [backActionSlot, backAction]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <article className={containerClassName}>
        {(backActionSlot || backAction) && (
          <motion.div {...fadeInUp} className="mb-12">
            {renderedBackAction}
          </motion.div>
        )}

        <motion.header {...fadeInUp} className={cn("mb-16", headerClassName)}>
          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1 font-medium">
              {category}
            </span>
            <span>{year}</span>
          </div>

          {typeof title === "string" ? (
            <h1
              className={cn(
                "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
                titleClassName,
              )}
            >
              {title}
            </h1>
          ) : (
            <div className={titleClassName}>{title}</div>
          )}

          {subtitle &&
            (typeof subtitle === "string" ? (
              <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
            ) : (
              <div className="mt-4">{subtitle}</div>
            ))}
        </motion.header>

        <motion.div {...fadeInUp} className="mb-16">
          <div
            className={cn(
              "relative aspect-video overflow-hidden rounded-2xl bg-muted",
              heroImageClassName,
            )}
          >
            <Img
              src={heroImage?.src}
              alt={heroImage?.alt || "Project hero image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </motion.div>

        {description && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-24 max-w-3xl"
          >
            {typeof description === "string" ? (
              <p className="text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : (
              description
            )}
          </motion.div>
        )}

        {sections && sections.length > 0 && (
          <div className={cn("space-y-32", sectionsClassName)}>
            {sections.map((section, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center"
              >
                <div className={cn(index % 2 === 1 && "lg:order-2")}>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-6xl font-bold text-muted-foreground/30 md:text-7xl">
                      {section.number}
                    </span>
                    {typeof section.title === "string" ? (
                      <h2 className="text-2xl font-semibold md:text-3xl">
                        {section.title}
                      </h2>
                    ) : (
                      section.title
                    )}
                  </div>
                  {typeof section.content === "string" ? (
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  ) : (
                    section.content
                  )}
                </div>
                {section.image && (
                  <div
                    className={cn(
                      "relative aspect-4/3 overflow-hidden rounded-2xl bg-muted",
                      index % 2 === 1 && "lg:order-1",
                    )}
                  >
                    <Img
                      src={section.image.src}
                      alt={section.image.alt}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </article>
    </Section>
  );
}
