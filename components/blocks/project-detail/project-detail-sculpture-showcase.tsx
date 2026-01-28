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

export interface ProjectDetailSculptureShowcaseProps {
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
  /** Materials used */
  materials?: React.ReactNode;
  /** Dimensions */
  dimensions?: React.ReactNode;
  /** Location */
  location?: React.ReactNode;
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
  /** Additional CSS classes for the grid layout */
  gridClassName?: string;
  /** Additional CSS classes for the hero image */
  heroImageClassName?: string;
  /** Additional CSS classes for the title */
  titleClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the metadata section */
  metadataClassName?: string;
  /** Additional CSS classes for the gallery section */
  galleryClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailSculptureShowcase(
  props: ProjectDetailSculptureShowcaseProps,
): React.JSX.Element {
  const {
    title,
    subtitle,
    year,
    category,
    artist,
    heroImage,
    description,
    materials,
    dimensions,
    location,
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
    gridClassName,
    heroImageClassName,
    titleClassName,
    descriptionClassName,
    metadataClassName,
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

        <div
          className={cn("grid gap-12 lg:grid-cols-2 lg:gap-16", gridClassName)}
        >
          <motion.div {...fadeInUp}>
            <div
              className={cn(
                "relative aspect-4/5 overflow-hidden rounded-2xl bg-muted",
                heroImageClassName,
              )}
            >
              <Img
                src={heroImage?.src}
                alt={heroImage?.alt || "Sculpture showcase"}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
                  {category}
                </span>
                <span>{year}</span>
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
                  <p className="text-xl text-muted-foreground">{subtitle}</p>
                ) : (
                  subtitle
                ))}

              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "text-lg leading-relaxed text-muted-foreground",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                ))}

              <div
                className={cn(
                  "grid gap-4 border-t border-border pt-6 sm:grid-cols-2",
                  metadataClassName,
                )}
              >
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Artist
                  </h3>
                  <p className="mt-1 text-foreground">{artist}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Materials
                  </h3>
                  <p className="mt-1 text-foreground">{materials}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Dimensions
                  </h3>
                  <p className="mt-1 text-foreground">{dimensions}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Location
                  </h3>
                  <p className="mt-1 text-foreground">{location}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {galleryImages && galleryImages.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn("mt-24", galleryClassName)}
          >
            <h2 className="mb-8 text-sm font-medium tracking-wider text-muted-foreground uppercase">
              Gallery
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {galleryImages.map((image, index) => (
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
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </Section>
  );
}
