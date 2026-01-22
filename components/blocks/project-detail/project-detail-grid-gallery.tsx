"use client";

import * as React from "react";
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

export interface ProjectDetailGridGalleryImage {
  src?: string;
  alt?: string;
  caption?: React.ReactNode;
}

export interface ProjectDetailGridGalleryProps {
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
  /** Creative process description */
  creativeProcess?: React.ReactNode;
  /** Gallery images */
  images?: ProjectDetailGridGalleryImage[];
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
  /** Additional CSS classes for the grid layout */
  gridClassName?: string;
  /** Additional CSS classes for the gallery section */
  galleryClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailGridGallery(
  props: ProjectDetailGridGalleryProps,
): React.JSX.Element {
  const {
    title,
    subtitle,
    year,
    category,
    artist,
    description,
    creativeProcess,
    images,
    backAction,
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
    gridClassName,
    galleryClassName,
  } = props;

  const renderBackAction = () => {
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
        </motion.header>

        <div className={cn("grid gap-16 lg:grid-cols-2", gridClassName)}>
          <motion.div {...fadeInUp} className="space-y-8">
            <div>
              <h2 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                About the Work
              </h2>
              {typeof description === "string" ? (
                <p className="text-lg leading-relaxed text-foreground">
                  {description}
                </p>
              ) : (
                description
              )}
            </div>

            <div>
              <h2 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Creative Process
              </h2>
              {typeof creativeProcess === "string" ? (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {creativeProcess}
                </p>
              ) : (
                creativeProcess
              )}
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {images?.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-xl bg-muted",
                  index === 0 && "sm:col-span-2 aspect-video",
                  index > 0 && "aspect-square",
                )}
              >
                <Img
                  src={image.src}
                  alt={image.alt || "Gallery image"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  optixFlowConfig={optixFlowConfig}
                />
                {image.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {typeof image.caption === "string" ? (
                      <p className="text-sm text-foreground">{image.caption}</p>
                    ) : (
                      image.caption
                    )}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {images && images.length > 4 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn("mt-16", galleryClassName)}
          >
            <h2 className="mb-8 text-sm font-medium tracking-wider text-muted-foreground uppercase">
              More Views
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {images.slice(4).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative aspect-4/3 overflow-hidden rounded-xl bg-muted"
                >
                  <Img
                    src={image.src}
                    alt={image.alt || "Gallery image"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                  {image.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {typeof image.caption === "string" ? (
                        <p className="text-sm text-foreground">
                          {image.caption}
                        </p>
                      ) : (
                        image.caption
                      )}
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
