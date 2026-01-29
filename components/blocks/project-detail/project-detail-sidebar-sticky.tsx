"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Pressable } from "../../../lib/Pressable";
import type {
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectDetailSidebarStickyRelatedProject {
  title: React.ReactNode;
  category: React.ReactNode;
  src: string;
  alt: string;
  href?: string;
  className?: string;
}

export interface ProjectDetailSidebarStickyProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Category label */
  category?: React.ReactNode;
  /** Project year */
  year?: React.ReactNode;
  /** Description text */
  description?: React.ReactNode;
  /** Gallery images */
  images?: ImageItem[];
  /** Related projects */
  relatedProjects?: ProjectDetailSidebarStickyRelatedProject[];
  /** Related projects section title */
  relatedProjectsTitle?: React.ReactNode;
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
  /** Additional CSS classes for the grid layout */
  gridClassName?: string;
  /** Additional CSS classes for the sticky sidebar */
  sidebarClassName?: string;
  /** Additional CSS classes for the title */
  titleClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the images container */
  imagesClassName?: string;
  /** Additional CSS classes for the related projects section */
  relatedProjectsClassName?: string;
}

function ImageBlock({
  src,
  alt,
  index,
  optixFlowConfig,
}: {
  src?: string;
  alt: string;
  index: number;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative mb-8 last:mb-0"
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
        {src ? (
          <Img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            optixFlowConfig={optixFlowConfig}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <span className="text-sm">Image placeholder</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-muted/50 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}

function ProjectCard({
  title,
  category,
  src,
  alt,
  index,
  href,
  optixFlowConfig,
  background,
}: {
  title: React.ReactNode;
  category: React.ReactNode;
  src: string;
  alt: string;
  index: number;
  href?: string;
  optixFlowConfig?: OptixFlowConfig;
  background?: SectionBackground;
}) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
        <Img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
          optixFlowConfig={optixFlowConfig}
        />
        <div className={cn(
          "absolute inset-0 transition-all duration-300",
          `${getNestedCardBg(background)}/40 group-hover:${getNestedCardBg(background)}/20`
        )} />
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <span className={cn(
            "self-start border text-xs font-medium px-2 py-1 rounded",
            `border-${getNestedCardBg(background).replace('bg-', '')} bg-background`
          )}>
            {category}
          </span>
          <h3 className="text-2xl font-semibold opacity-70">
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Pressable href={href} className="block">
        {content}
      </Pressable>
    );
  }

  return content;
}

export function ProjectDetailSidebarSticky(
  props: ProjectDetailSidebarStickyProps,
): React.JSX.Element {
  const {
    title,
    subtitle,
    category,
    year,
    description,
    images,
    relatedProjects,
    relatedProjectsTitle,
    optixFlowConfig,
    background,
    spacing,
    pattern,
    patternOpacity,
    className,
    containerClassName,
    gridClassName,
    sidebarClassName,
    titleClassName,
    descriptionClassName,
    imagesClassName,
    relatedProjectsClassName,
  } = props;

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={containerClassName}>
        <div
          className={cn("grid gap-12 lg:grid-cols-2 lg:gap-20", gridClassName)}
        >
          <div
            className={cn(
              "top-20 flex flex-col self-start lg:sticky lg:min-h-screen lg:justify-between",
              sidebarClassName,
            )}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-3">
                {typeof title === "string" ? (
                  <h1
                    className={cn(
                      "text-5xl font-bold tracking-tight md:text-6xl",
                      titleClassName,
                    )}
                  >
                    {title}
                  </h1>
                ) : (
                  <div className={titleClassName}>{title}</div>
                )}
                {subtitle && (
                  <p className="text-xl text-muted-foreground">{subtitle}</p>
                )}
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "rounded-3xl px-4 py-1 text-xs font-medium",
                    getNestedCardBg(background),
                    getNestedCardTextColor(background)
                  )}>
                    {category}
                  </span>
                  <span className="rounded-3xl border border-border px-3 text-sm text-muted-foreground">
                    {year}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 space-y-3 md:sticky md:bottom-9"
            >
              <h3 className="text-sm font-medium tracking-wider uppercase">
                ABOUT
              </h3>
              {typeof description === "string" ? (
                <p
                  className={cn(
                    "max-w-sm text-sm leading-relaxed tracking-wide text-muted-foreground uppercase",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )}
            </motion.div>
          </div>
          <div className={cn("space-y-10", imagesClassName)}>
            {images?.map((img, index) => (
              <ImageBlock
                key={index}
                src={img.src}
                alt={img.alt}
                index={index}
                optixFlowConfig={optixFlowConfig}
              />
            ))}
          </div>
        </div>

        {relatedProjects && relatedProjects.length > 0 && (
          <div className={cn("mt-32", relatedProjectsClassName)}>
            {relatedProjectsTitle &&
              (typeof relatedProjectsTitle === "string" ? (
                <h3 className="mb-6 text-sm font-medium tracking-wider uppercase">
                  {relatedProjectsTitle}
                </h3>
              ) : (
                relatedProjectsTitle
              ))}
            <div className="grid gap-6 pb-16 md:grid-cols-3">
              {relatedProjects.map((project, index) => (
                <ProjectCard
                  key={String(project.title)}
                  title={project.title}
                  category={project.category}
                  src={project.src}
                  alt={project.alt}
                  href={project.href}
                  index={index}
                  optixFlowConfig={optixFlowConfig}
                  background={background}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
