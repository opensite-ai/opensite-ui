"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn, getNestedCardBg } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectDetailHeroMetadataProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle/role text */
  subtitle?: React.ReactNode;
  /** Description text */
  description?: React.ReactNode;
  /** Project year */
  year?: React.ReactNode;
  /** Project category */
  category?: React.ReactNode;
  /** Client name */
  client?: React.ReactNode;
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** CTA action configuration */
  action?: ActionConfig;
  /** Custom slot for action (overrides action prop) */
  actionSlot?: React.ReactNode;
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
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the metadata section */
  metadataClassName?: string;
  /** Additional CSS classes for the hero image container */
  heroImageClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ProjectDetailHeroMetadata(
  props: ProjectDetailHeroMetadataProps,
): React.JSX.Element {
  const {
    sectionId: sectionIdProp,
    title,
    subtitle,
    description,
    year,
    category,
    client,
    heroImage,
    action,
    actionSlot,
    optixFlowConfig,
    background,
    spacing,
    pattern,
    patternOpacity,
    className,
    containerClassName,
    headerClassName,
    titleClassName,
    descriptionClassName,
    metadataClassName,
    heroImageClassName,
  } = props;
  const sectionId = sectionIdProp ?? "project-detail-hero-metadata";

  const renderedAction = useMemo(() => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = action;
    return (
      <Pressable
        className={cn(
          "h-auto p-0 font-medium text-foreground hover:text-primary",
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
  }, [actionSlot, action]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("space-y-8", containerClassName)}>
        <motion.header
          className={cn("pb-8 md:pb-12", headerClassName)}
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="flex flex-col gap-y-12 lg:flex-row lg:items-start lg:justify-between">
            <motion.div variants={fadeInUp} className="flex-1">
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
              {description && (
                <motion.div variants={fadeInUp}>
                  {typeof description === "string" ? (
                    <p
                      className={cn(
                        "mt-6 max-w-xl text-lg leading-relaxed font-medium text-muted-foreground",
                        descriptionClassName,
                      )}
                    >
                      {description}
                    </p>
                  ) : (
                    <div className={cn("mt-6", descriptionClassName)}>
                      {description}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className={cn("w-full max-w-md space-y-4", metadataClassName)}
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-medium text-muted-foreground">
                  CATEGORY
                </span>
                <span className="font-medium">{category}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-medium text-muted-foreground">
                  CLIENT
                </span>
                <span className="font-medium">{client}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-medium text-muted-foreground">YEAR</span>
                <span className="font-medium">{year}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-muted-foreground">
                  {subtitle}
                </span>
                {renderedAction}
              </div>
            </motion.div>
          </div>
        </motion.header>

        <motion.main
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className={cn(
              "relative aspect-video overflow-hidden rounded-lg",
              heroImageClassName,
            )}
          >
            <Img
              src={heroImage?.src}
              alt={heroImage?.alt || "Project hero image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute inset-0 bg-background/5" />
          </motion.div>
        </motion.main>
      </div>
    </Section>
  );
}
