"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailHoverGalleryImage {
  src?: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface ProjectDetailHoverGalleryProps {
  className?: string;
  title?: string;
  subtitle?: string;
  year?: string;
  category?: string;
  artist?: string;
  description?: string;
  images?: ProjectDetailHoverGalleryImage[];
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultImages: ProjectDetailHoverGalleryImage[] = [
  {
    src: imagePlaceholders[29],
    alt: "Gallery image 1",
    title: "Form Study I",
    description: "Initial exploration of organic curves",
  },
  {
    src: imagePlaceholders[30],
    alt: "Gallery image 2",
    title: "Form Study II",
    description: "Material interaction with light",
  },
  {
    src: imagePlaceholders[31],
    alt: "Gallery image 3",
    title: "Form Study III",
    description: "Spatial relationships and balance",
  },
  {
    src: imagePlaceholders[32],
    alt: "Gallery image 4",
    title: "Form Study IV",
    description: "Final composition refinement",
  },
  {
    src: imagePlaceholders[33],
    alt: "Gallery image 5",
    title: "Form Study V",
    description: "Installation perspective",
  },
  {
    src: imagePlaceholders[34],
    alt: "Gallery image 6",
    title: "Form Study VI",
    description: "Detail and texture exploration",
  },
];

const defaultProps: ProjectDetailHoverGalleryProps = {
  title: "Organic Resonance",
  subtitle: "A Visual Journey",
  year: "2024",
  category: "Sculpture",
  artist: "Elena Vasquez",
  description:
    "Explore the creative process behind this sculptural work through a series of studies and explorations that led to the final form.",
  images: defaultImages,
  backHref: "/projects",
  backLabel: "Back to Gallery",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailHoverGallery(
  props: ProjectDetailHoverGalleryProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    artist = defaultProps.artist,
    description = defaultProps.description,
    images = defaultProps.images,
    backHref = defaultProps.backHref,
    backLabel = defaultProps.backLabel,
    optixFlowConfig,
  } = props;

  return (
    <article className={cn("py-24 md:py-32", className)}>
      <div className="container">
        {backHref && (
          <motion.div {...fadeInUp} className="mb-12">
            <Pressable
              href={backHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <DynamicIcon name="lucide/arrow-left" size={16} />
              {backLabel}
            </Pressable>
          </motion.div>
        )}

        <motion.header {...fadeInUp} className="mb-16 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
              {category}
            </span>
            <span>{year}</span>
            <span>|</span>
            <span>{artist}</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </motion.header>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
                src={image.src || imagePlaceholders[29 + index]}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {image.title && (
                  <h3 className="text-lg font-semibold text-foreground">
                    {image.title}
                  </h3>
                )}
                {image.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {image.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </article>
  );
}
