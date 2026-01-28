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

export interface ProjectDetailExhibitionSidebarExhibition {
  title: React.ReactNode;
  venue: React.ReactNode;
  date: React.ReactNode;
  href?: string;
}

export interface ProjectDetailExhibitionSidebarProps {
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
  /** Exhibitions list */
  exhibitions?: ProjectDetailExhibitionSidebarExhibition[];
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
  /** Additional CSS classes for the sidebar */
  sidebarClassName?: string;
  /** Additional CSS classes for the gallery section */
  galleryClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailExhibitionSidebar(
  props: ProjectDetailExhibitionSidebarProps,
): React.JSX.Element {
  const {
    title,
    subtitle,
    year,
    category,
    artist,
    heroImage,
    description,
    exhibitions,
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
    sidebarClassName,
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

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <motion.div
            {...fadeInUp}
            className={cn("lg:col-span-2", headerClassName)}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
              <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
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
                <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
              ) : (
                <div className="mt-4">{subtitle}</div>
              ))}

            <div
              className={cn(
                "mt-8 relative aspect-video overflow-hidden rounded-2xl bg-muted",
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

            {description &&
              (typeof description === "string" ? (
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  {description}
                </p>
              ) : (
                <div className="mt-8">{description}</div>
              ))}
          </motion.div>

          <motion.aside
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div
              className={cn(
                "rounded-xl border border-border bg-muted/30 p-6",
                sidebarClassName,
              )}
            >
              <h2 className="mb-6 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Exhibitions
              </h2>
              <div className="space-y-6">
                {exhibitions?.map((exhibition, index) => (
                  <div
                    key={index}
                    className="border-b border-border pb-4 last:border-b-0 last:pb-0"
                  >
                    {exhibition.href ? (
                      <Pressable href={exhibition.href} className="block group">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {exhibition.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {exhibition.venue}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exhibition.date}
                        </p>
                      </Pressable>
                    ) : (
                      <div>
                        <h3 className="font-medium text-foreground">
                          {exhibition.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {exhibition.venue}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exhibition.date}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {galleryImages && galleryImages.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn("mt-16 grid gap-6 md:grid-cols-3", galleryClassName)}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-xl bg-muted"
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
