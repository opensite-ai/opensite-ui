"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type {
  ActionConfig,
  SectionItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ProjectDetailCaseStudyProseProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Project year */
  year?: React.ReactNode;
  /** Category label */
  category?: React.ReactNode;
  /** Client name */
  client?: React.ReactNode;
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** Overview text */
  overview?: React.ReactNode;
  /** Content sections */
  sections?: SectionItem[];
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
  pattern?: string;
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
  /** Additional CSS classes for the subtitle */
  subtitleClassName?: string;
  /** Additional CSS classes for the hero image */
  heroImageClassName?: string;
  /** Additional CSS classes for the overview */
  overviewClassName?: string;
  /** Additional CSS classes for the sections container */
  sectionsClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailCaseStudyProse(
  props: ProjectDetailCaseStudyProseProps
): React.JSX.Element {
  const {
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    client = defaultProps.client,
    heroImage = defaultProps.heroImage,
    overview = defaultProps.overview,
    sections = defaultProps.sections,
    backAction = defaultProps.backAction,
    backActionSlot,
    optixFlowConfig,
    background = "white",
    spacing = "lg",
    pattern,
    patternOpacity,
    className,
    containerClassName,
    headerClassName,
    titleClassName,
    subtitleClassName,
    heroImageClassName,
    overviewClassName,
    sectionsClassName,
  } = props;

  const renderBackAction = () => {
    if (backActionSlot) return backActionSlot;
    if (!backAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = backAction;
    return (
      <Pressable
        className={cn("inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground", actionClassName)}
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
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <article className={cn("max-w-4xl mx-auto", containerClassName)}>
        {(backActionSlot || backAction) && (
          <motion.div {...fadeInUp} className="mb-12">
            {renderBackAction()}
          </motion.div>
        )}

        <motion.header {...fadeInUp} className={cn("mb-16 space-y-6", headerClassName)}>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1 font-medium">
              {category}
            </span>
            <span>{year}</span>
            <span className="hidden sm:inline">|</span>
            <span>{client}</span>
          </div>

          {typeof title === "string" ? (
            <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", titleClassName)}>
              {title}
            </h1>
          ) : (
            <div className={titleClassName}>{title}</div>
          )}

          {subtitle && (
            typeof subtitle === "string" ? (
              <p className={cn("text-xl text-muted-foreground", subtitleClassName)}>{subtitle}</p>
            ) : (
              <div className={subtitleClassName}>{subtitle}</div>
            )
          )}
        </motion.header>

        <motion.div {...fadeInUp} className="mb-16">
          <div className={cn("relative aspect-video overflow-hidden rounded-2xl bg-muted", heroImageClassName)}>
            <Img
              src={heroImage?.src || imagePlaceholders[7]}
              alt={heroImage?.alt || "Project hero image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </motion.div>

        {overview && (
          <motion.div {...fadeInUp} className={cn("mb-16", overviewClassName)}>
            <h2 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
              Overview
            </h2>
            {typeof overview === "string" ? (
              <p className="text-lg leading-relaxed text-foreground">{overview}</p>
            ) : (
              overview
            )}
          </motion.div>
        )}

        <div className={cn("space-y-16", sectionsClassName)}>
          {sections?.map((section, index) => (
            <motion.section
              key={section.id}
              {...fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={section.className}
            >
              {typeof section.title === "string" ? (
                <h2 className="mb-6 text-2xl font-semibold text-foreground">
                  {section.title}
                </h2>
              ) : (
                section.title
              )}
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {typeof section.content === "string" ? (
                  <p className="leading-relaxed">{section.content}</p>
                ) : (
                  section.content
                )}
              </div>
            </motion.section>
          ))}
        </div>
      </article>
    </Section>
  );
}
