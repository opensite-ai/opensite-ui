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
  SectionItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectDetailFullscreenHeroProps {
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
  /** Content sections */
  sections?: SectionItem[];
  /** Back navigation action */
  backAction?: ActionConfig;
  /** Custom slot for back action (overrides backAction) */
  backActionSlot?: React.ReactNode;
  /** OptixFlow image optimization configuration */
  optixFlowConfig?: OptixFlowConfig;
  /** Content section background variant */
  background?: SectionBackground;
  /** Content section spacing variant */
  spacing?: SectionSpacing;
  /** Background pattern for content section */
  pattern?: PatternName | undefined;
  /** Pattern opacity */
  patternOpacity?: number;
  /** Additional CSS classes for the article */
  className?: string;
  /** Additional CSS classes for the hero section */
  heroClassName?: string;
  /** Additional CSS classes for the hero image */
  heroImageClassName?: string;
  /** Additional CSS classes for the title */
  titleClassName?: string;
  /** Additional CSS classes for the subtitle */
  subtitleClassName?: string;
  /** Additional CSS classes for the content section */
  contentClassName?: string;
  /** Additional CSS classes for the sections container */
  sectionsClassName?: string;
}

export function ProjectDetailFullscreenHero(
  props: ProjectDetailFullscreenHeroProps,
): React.JSX.Element {
  const {
    title,
    subtitle,
    year,
    category,
    client,
    heroImage,
    sections,
    backAction,
    backActionSlot,
    optixFlowConfig,
    background,
    spacing,
    pattern,
    patternOpacity,
    className,
    heroClassName,
    heroImageClassName,
    titleClassName,
    subtitleClassName,
    contentClassName,
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
          "inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground",
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
    <article className={className}>
      <section className={cn("relative min-h-screen", heroClassName)}>
        <div className="absolute inset-0">
          <Img
            src={heroImage?.src}
            alt={heroImage?.alt || "Project hero image"}
            className={cn("h-full w-full object-cover", heroImageClassName)}
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container relative z-10 flex min-h-screen flex-col justify-between py-8">
          {(backActionSlot || backAction) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {renderedBackAction}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pb-16"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <span className="rounded-full border border-border px-3 py-1">
                {category}
              </span>
              <span>{year}</span>
              <span>|</span>
              <span>{client}</span>
            </div>

            {typeof title === "string" ? (
              <h1
                className={cn(
                  "text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl",
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
                <p
                  className={cn(
                    "mt-4 max-w-xl text-xl text-muted-foreground",
                    subtitleClassName,
                  )}
                >
                  {subtitle}
                </p>
              ) : (
                <div className={cn("mt-4", subtitleClassName)}>{subtitle}</div>
              ))}
          </motion.div>
        </div>
      </section>

      <Section
        background={background}
        spacing={spacing}
        pattern={pattern}
        patternOpacity={patternOpacity}
        className={contentClassName}
      >
        <div className={cn("max-w-4xl mx-auto space-y-20", sectionsClassName)}>
          {sections?.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={section.className}
            >
              {typeof section.title === "string" ? (
                <h2 className="mb-6 text-2xl font-semibold">
                  {section.title}
                </h2>
              ) : (
                section.title
              )}
              {typeof section.content === "string" ? (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {section.content}
                </p>
              ) : (
                section.content
              )}
            </motion.div>
          ))}
        </div>
      </Section>
    </article>
  );
}
