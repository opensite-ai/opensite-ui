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
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ProjectDetailListRelatedProject {
  title: React.ReactNode;
  category: React.ReactNode;
  year: React.ReactNode;
  src?: string;
  alt?: string;
  href?: string;
}

export interface ProjectDetailListRelatedProps {
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
  /** Project images */
  images?: ImageItem[];
  /** Related projects list */
  relatedProjects?: ProjectDetailListRelatedProject[];
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
  /** Additional CSS classes for the images grid */
  imagesClassName?: string;
  /** Additional CSS classes for the related projects section */
  relatedClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailListRelated(
  props: ProjectDetailListRelatedProps
): React.JSX.Element {
  const {
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    category = defaultProps.category,
    year = defaultProps.year,
    description = defaultProps.description,
    images = defaultProps.images,
    relatedProjects = defaultProps.relatedProjects,
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
    imagesClassName,
    relatedClassName,
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
      <article className={containerClassName}>
        {(backActionSlot || backAction) && (
          <motion.div {...fadeInUp} className="mb-12">
            {renderBackAction()}
          </motion.div>
        )}

        <motion.header {...fadeInUp} className={cn("mb-16 max-w-3xl", headerClassName)}>
          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
              {category}
            </span>
            <span>{year}</span>
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
              <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
            ) : (
              <div className="mt-4">{subtitle}</div>
            )
          )}

          {description && (
            typeof description === "string" ? (
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : (
              <div className="mt-6">{description}</div>
            )
          )}
        </motion.header>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn("grid gap-6 md:grid-cols-2", imagesClassName)}
        >
          {images?.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted"
            >
              <Img
                src={image.src || imagePlaceholders[42 + index]}
                alt={image.alt || "Project image"}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </motion.div>
          ))}
        </motion.div>

        {relatedProjects && relatedProjects.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn("mt-24", relatedClassName)}
          >
            <h2 className="mb-8 text-sm font-medium tracking-wider text-muted-foreground uppercase">
              Related Collections
            </h2>
            <div className="space-y-4">
              {relatedProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {project.href ? (
                    <Pressable
                      href={project.href}
                      className="group flex items-center gap-6 rounded-xl border border-border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Img
                          src={project.src || imagePlaceholders[46 + index]}
                          alt={project.alt || "Related project"}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {project.category} | {project.year}
                        </p>
                      </div>
                      <DynamicIcon
                        name="lucide/arrow-right"
                        size={20}
                        className="text-muted-foreground transition-transform group-hover:translate-x-1"
                      />
                    </Pressable>
                  ) : (
                    <div className="flex items-center gap-6 rounded-xl border border-border p-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Img
                          src={project.src || imagePlaceholders[46 + index]}
                          alt={project.alt || "Related project"}
                          className="h-full w-full object-cover"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {project.category} | {project.year}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </Section>
  );
}
