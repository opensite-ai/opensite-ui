"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
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

export interface ProjectDetailFashionEditorialCredit {
  role: React.ReactNode;
  name: React.ReactNode;
}

export interface ProjectDetailFashionEditorialProps {
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
  /** Credits list */
  credits?: ProjectDetailFashionEditorialCredit[];
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
  /** Additional CSS classes for the header */
  headerClassName?: string;
  /** Additional CSS classes for the title */
  titleClassName?: string;
  /** Additional CSS classes for the hero image */
  heroImageClassName?: string;
  /** Additional CSS classes for the credits section */
  creditsClassName?: string;
  /** Additional CSS classes for the gallery */
  galleryClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailFashionEditorial(
  props: ProjectDetailFashionEditorialProps,
): React.JSX.Element {
  const {
    sectionId: sectionIdProp,
    title,
    subtitle,
    year,
    category,
    heroImage,
    description,
    credits,
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
    headerClassName,
    titleClassName,
    heroImageClassName,
    creditsClassName,
    galleryClassName,
  } = props;
  const sectionId = sectionIdProp ?? "project-detail-fashion-editorial";

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
      id={sectionId}
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
            <span className={cn(
              "rounded-full px-3 py-1 font-medium",
              getNestedCardBg(background),
              getNestedCardTextColor(background)
            )}>
              {category}
            </span>
            <span>{year}</span>
          </div>

          {typeof title === "string" ? (
            <h1
              className={cn(
                "text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl uppercase",
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
              "relative aspect-3/4 md:aspect-video overflow-hidden rounded-2xl",
              heroImageClassName,
            )}
          >
            <Img
              src={heroImage?.src}
              alt={heroImage?.alt || "Fashion editorial hero"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-3">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {description &&
              (typeof description === "string" ? (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {description}
                </p>
              ) : (
                description
              ))}
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={creditsClassName}
          >
            <h2 className="mb-6 text-sm font-medium tracking-wider text-muted-foreground uppercase">
              Credits
            </h2>
            <div className="space-y-4">
              {credits?.map((credit, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-border pb-3 last:border-b-0"
                >
                  <span className="text-sm text-muted-foreground">
                    {credit.role}
                  </span>
                  <span className="text-sm font-medium">
                    {credit.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {galleryImages && galleryImages.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn("mt-16 grid gap-6 md:grid-cols-2", galleryClassName)}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-3/4 overflow-hidden rounded-xl"
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
