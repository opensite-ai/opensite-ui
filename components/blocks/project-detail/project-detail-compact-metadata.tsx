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
  DetailItem,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ProjectDetailCompactMetadataProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** Description text */
  description?: React.ReactNode;
  /** Metadata items */
  metadata?: DetailItem[];
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
  /** Additional CSS classes for the hero image */
  heroImageClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the metadata section */
  metadataClassName?: string;
  /** Additional CSS classes for the gallery section */
  galleryClassName?: string;
}

const defaultMetadata: DetailItem[] = [
  { label: "Year", value: "2024" },
  { label: "Category", value: "Sculpture" },
  { label: "Artist", value: "Elena Vasquez" },
  { label: "Materials", value: "Bronze, Steel" },
  { label: "Dimensions", value: "180 x 90 x 75 cm" },
  { label: "Location", value: "Metropolitan Gallery" },
];

const defaultGalleryImages: ImageItem[] = [
  { src: imagePlaceholders[22], alt: "Gallery image 1" },
  { src: imagePlaceholders[23], alt: "Gallery image 2" },
  { src: imagePlaceholders[24], alt: "Gallery image 3" },
];

const defaultProps: ProjectDetailCompactMetadataProps = {
  title: "Organic Resonance",
  subtitle: "A Study in Form and Movement",
  heroImage: {
    src: imagePlaceholders[25],
    alt: "Organic Resonance sculpture",
  },
  description:
    "This sculptural work explores the intersection of organic forms and geometric precision. Inspired by natural growth patterns and the mathematical principles underlying biological structures.",
  metadata: defaultMetadata,
  galleryImages: defaultGalleryImages,
  backAction: { label: "Back", href: "/projects", icon: <DynamicIcon name="lucide/arrow-left" size={16} /> },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailCompactMetadata(
  props: ProjectDetailCompactMetadataProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    heroImage = defaultProps.heroImage,
    description = defaultProps.description,
    metadata = defaultProps.metadata,
    galleryImages = defaultProps.galleryImages,
    backHref = defaultProps.backHref,
    backLabel = defaultProps.backLabel,
    optixFlowConfig,
  } = props;

  return (
    <article className={cn("py-24 md:py-32", className)}>
      <div className="container max-w-5xl">
        {backHref && (
          <motion.div {...fadeInUp} className="mb-8">
            <Pressable
              href={backHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <DynamicIcon name="lucide/arrow-left" size={16} />
              {backLabel}
            </Pressable>
          </motion.div>
        )}

        <motion.header {...fadeInUp} className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
        </motion.header>

        <motion.div {...fadeInUp} className="mb-12">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
            <Img
              src={heroImage?.src || imagePlaceholders[25]}
              alt={heroImage?.alt || "Project hero image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-3">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h2 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Details
              </h2>
              <div className="space-y-3">
                {metadata?.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {galleryImages && galleryImages.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <div className="grid gap-4 md:grid-cols-3">
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
                    src={image.src || imagePlaceholders[22 + index]}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
}
