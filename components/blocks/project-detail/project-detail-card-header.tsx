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
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectDetailCardHeaderProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Project year */
  year?: React.ReactNode;
  /** Category label */
  category?: React.ReactNode;
  /** Artist name */
  artist?: React.ReactNode;
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** Description text */
  description?: React.ReactNode;
  /** Gallery images */
  galleryImages?: ImageItem[];
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
  /** Additional CSS classes for the card */
  cardClassName?: string;
  /** Additional CSS classes for the header */
  headerClassName?: string;
  /** Additional CSS classes for the title */
  titleClassName?: string;
  /** Additional CSS classes for the hero image */
  heroImageClassName?: string;
  /** Additional CSS classes for the gallery section */
  galleryClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailCardHeader(
  props: ProjectDetailCardHeaderProps,
): React.JSX.Element {
  const {
    title,
    subtitle,
    year,
    category,
    artist,
    heroImage,
    description,
    galleryImages,
    backAction,
    backActionSlot,
    optixFlowConfig,
    background,
    spacing,
    pattern,
    patternOpacity,
    className,
    containerClassName,
    cardClassName,
    headerClassName,
    titleClassName,
    heroImageClassName,
    galleryClassName,
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

        <motion.div
          {...fadeInUp}
          className={cn(
            "mb-16 rounded-3xl border border-border bg-muted/30 p-8 md:p-12",
            cardClassName,
          )}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div
              className={cn("flex flex-col justify-center", headerClassName)}
            >
              <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
                <span className="rounded-full bg-background px-3 py-1 font-medium text-foreground">
                  {category}
                </span>
                <span>{year}</span>
                <span>|</span>
                <span>{artist}</span>
              </div>

              {typeof title === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold tracking-tight text-foreground md:text-5xl",
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
                  <p className="mt-4 text-xl text-muted-foreground">
                    {subtitle}
                  </p>
                ) : (
                  <div className="mt-4">{subtitle}</div>
                ))}

              {description &&
                (typeof description === "string" ? (
                  <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                ) : (
                  <div className="mt-6">{description}</div>
                ))}
            </div>

            <div
              className={cn(
                "relative aspect-4/3 overflow-hidden rounded-2xl bg-muted",
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
          </div>
        </motion.div>

        {galleryImages && galleryImages.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn("grid gap-6 md:grid-cols-2", galleryClassName)}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted"
              >
                <Img
                  src={image.src}
                  alt={image.alt || "Gallery image"}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </article>
    </Section>
  );
}
