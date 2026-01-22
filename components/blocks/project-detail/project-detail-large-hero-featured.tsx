"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  DetailItem,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectDetailLargeHeroFeaturedSection {
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface ProjectDetailLargeHeroFeaturedProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** Project details */
  details?: DetailItem[];
  /** Content sections */
  sections?: ProjectDetailLargeHeroFeaturedSection[];
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
  /** Additional CSS classes for the details section */
  detailsClassName?: string;
  /** Additional CSS classes for the sections */
  sectionsClassName?: string;
  /** Additional CSS classes for the gallery */
  galleryClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailLargeHeroFeatured(
  props: ProjectDetailLargeHeroFeaturedProps,
): React.JSX.Element {
  const {
    title,
    subtitle,
    heroImage,
    details,
    sections,
    galleryImages,
    backAction,
    backActionSlot,
    optixFlowConfig,
    background = "white",
    spacing = "none",
    pattern,
    patternOpacity,
    className,
    containerClassName,
    headerClassName,
    titleClassName,
    heroImageClassName,
    detailsClassName,
    sectionsClassName,
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
          "inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground",
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
        <section className={cn("relative min-h-[70vh]", heroImageClassName)}>
          <div className="absolute inset-0">
            <Img
              src={heroImage?.src}
              alt={heroImage?.alt || "Project hero image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
          </div>

          <div className="container relative z-10 flex min-h-[70vh] flex-col justify-end py-16">
            {(backActionSlot || backAction) && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-8 left-0"
              >
                {renderBackAction()}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn("max-w-4xl", headerClassName)}
            >
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
                  <p className="mt-6 text-xl text-foreground/80">{subtitle}</p>
                ) : (
                  <div className="mt-6">{subtitle}</div>
                ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="container">
            {details && details.length > 0 && (
              <motion.div
                {...fadeInUp}
                className={cn(
                  "mb-16 grid gap-6 border-b border-border pb-16 sm:grid-cols-2 lg:grid-cols-4",
                  detailsClassName,
                )}
              >
                {details.map((detail, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      {detail.label}
                    </h3>
                    <p className="mt-2 text-lg font-medium text-foreground">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {sections && sections.length > 0 && (
              <div className={cn("space-y-16 max-w-3xl", sectionsClassName)}>
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    {...fadeInUp}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {typeof section.title === "string" ? (
                      <h2 className="mb-6 text-2xl font-semibold text-foreground">
                        {section.title}
                      </h2>
                    ) : (
                      <div className="mb-6">{section.title}</div>
                    )}
                    {typeof section.content === "string" ? (
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {section.content}
                      </p>
                    ) : (
                      section.content
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {galleryImages && galleryImages.length > 0 && (
              <motion.div
                {...fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={cn(
                  "mt-16 grid gap-6 md:grid-cols-2",
                  galleryClassName,
                )}
              >
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative aspect-video overflow-hidden rounded-2xl bg-muted"
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
          </div>
        </section>
      </article>
    </Section>
  );
}
