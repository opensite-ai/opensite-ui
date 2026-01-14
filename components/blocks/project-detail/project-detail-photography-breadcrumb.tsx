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
  BreadcrumbItem,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ProjectDetailPhotographyBreadcrumbProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Project year */
  year?: React.ReactNode;
  /** Category label */
  category?: React.ReactNode;
  /** Photographer name */
  photographer?: React.ReactNode;
  /** Breadcrumb navigation items */
  breadcrumbs?: BreadcrumbItem[];
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** Description text */
  description?: React.ReactNode;
  /** Gallery images */
  galleryImages?: ImageItem[];
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
  /** Additional CSS classes for the sidebar */
  sidebarClassName?: string;
  /** Additional CSS classes for the title */
  titleClassName?: string;
  /** Additional CSS classes for the hero image */
  heroImageClassName?: string;
  /** Additional CSS classes for the gallery */
  galleryClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailPhotographyBreadcrumb(
  props: ProjectDetailPhotographyBreadcrumbProps
): React.JSX.Element {
  const {
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    photographer = defaultProps.photographer,
    breadcrumbs = defaultProps.breadcrumbs,
    heroImage = defaultProps.heroImage,
    description = defaultProps.description,
    galleryImages = defaultProps.galleryImages,
    optixFlowConfig,
    background = "white",
    spacing = "lg",
    pattern,
    patternOpacity,
    className,
    containerClassName,
    sidebarClassName,
    titleClassName,
    heroImageClassName,
    galleryClassName,
  } = props;

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <article className={containerClassName}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav {...fadeInUp} className="mb-12">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  {item.href ? (
                    <Pressable
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Pressable>
                  ) : (
                    <span className="font-medium text-foreground">
                      {item.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <DynamicIcon
                      name="lucide/chevron-right"
                      size={14}
                      className="text-muted-foreground"
                    />
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <motion.aside
            {...fadeInUp}
            className={cn("lg:sticky lg:top-24 lg:self-start", sidebarClassName)}
          >
            <div className="space-y-6">
              <div>
                {typeof title === "string" ? (
                  <h1 className={cn("text-3xl font-bold tracking-tight text-foreground md:text-4xl", titleClassName)}>
                    {title}
                  </h1>
                ) : (
                  <div className={titleClassName}>{title}</div>
                )}
                {subtitle && (
                  typeof subtitle === "string" ? (
                    <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
                  ) : (
                    <div className="mt-2">{subtitle}</div>
                  )
                )}
              </div>

              <div className="space-y-3 border-t border-border pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">{category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Photographer</span>
                  <span className="font-medium text-foreground">
                    {photographer}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium text-foreground">{year}</span>
                </div>
              </div>

              {description && (
                typeof description === "string" ? (
                  <p className="text-sm leading-relaxed text-muted-foreground border-t border-border pt-6">
                    {description}
                  </p>
                ) : (
                  <div className="border-t border-border pt-6">{description}</div>
                )
              )}
            </div>
          </motion.aside>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className={cn("relative aspect-4/3 overflow-hidden rounded-2xl bg-muted mb-6", heroImageClassName)}>
              <Img
                src={heroImage?.src || imagePlaceholders[68]}
                alt={heroImage?.alt || "Project hero image"}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>

            {galleryImages && galleryImages.length > 0 && (
              <div className={cn("grid gap-4 sm:grid-cols-2 md:grid-cols-3", galleryClassName)}>
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
                      src={image.src || imagePlaceholders[62 + index]}
                      alt={image.alt || "Gallery image"}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </article>
    </Section>
  );
}
