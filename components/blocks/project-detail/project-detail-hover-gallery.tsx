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

export interface ProjectDetailHoverGalleryImage {
  src?: string;
  alt?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export interface ProjectDetailHoverGalleryProps {
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
  /** Description text */
  description?: React.ReactNode;
  /** Gallery images with hover info */
  images?: ProjectDetailHoverGalleryImage[];
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
  /** Additional CSS classes for the gallery grid */
  galleryClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailHoverGallery(
  props: ProjectDetailHoverGalleryProps,
): React.JSX.Element {
  const {
    title,
    subtitle,
    year,
    category,
    artist,
    description,
    images,
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

        <motion.header
          {...fadeInUp}
          className={cn("mb-16 max-w-3xl", headerClassName)}
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
                "text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl",
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

          {description &&
            (typeof description === "string" ? (
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : (
              <div className="mt-6">{description}</div>
            ))}
        </motion.header>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
            galleryClassName,
          )}
        >
          {images?.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
            >
              <Img
                src={image.src}
                alt={image.alt || "Gallery image"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {image.title &&
                  (typeof image.title === "string" ? (
                    <h3 className="text-lg font-semibold text-foreground">
                      {image.title}
                    </h3>
                  ) : (
                    image.title
                  ))}
                {image.description &&
                  (typeof image.description === "string" ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {image.description}
                    </p>
                  ) : (
                    <div className="mt-1">{image.description}</div>
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </article>
    </Section>
  );
}
