"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailSculptureShowcaseProps {
  className?: string;
  title?: string;
  subtitle?: string;
  year?: string;
  category?: string;
  artist?: string;
  heroImage?: {
    src?: string;
    alt?: string;
  };
  description?: string;
  materials?: string;
  dimensions?: string;
  location?: string;
  galleryImages?: Array<{
    src?: string;
    alt: string;
  }>;
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultGalleryImages = [
  { src: imagePlaceholders[10], alt: "Sculpture detail 1" },
  { src: imagePlaceholders[11], alt: "Sculpture detail 2" },
  { src: imagePlaceholders[12], alt: "Sculpture detail 3" },
];

const defaultProps: ProjectDetailSculptureShowcaseProps = {
  title: "Organic Resonance",
  subtitle: "A Study in Form and Movement",
  year: "2024",
  category: "Sculpture",
  artist: "Elena Vasquez",
  heroImage: {
    src: imagePlaceholders[13],
    alt: "Organic Resonance sculpture",
  },
  description:
    "This sculptural work explores the intersection of organic forms and geometric precision. Inspired by natural growth patterns and the mathematical principles underlying biological structures, the piece invites viewers to contemplate the harmony between chaos and order.",
  materials: "Bronze, Stainless Steel, Marble Base",
  dimensions: "180cm x 90cm x 75cm",
  location: "Metropolitan Art Gallery",
  galleryImages: defaultGalleryImages,
  backHref: "/projects",
  backLabel: "Back to Gallery",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailSculptureShowcase(
  props: ProjectDetailSculptureShowcaseProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    artist = defaultProps.artist,
    heroImage = defaultProps.heroImage,
    description = defaultProps.description,
    materials = defaultProps.materials,
    dimensions = defaultProps.dimensions,
    location = defaultProps.location,
    galleryImages = defaultProps.galleryImages,
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

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fadeInUp}>
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted">
              <Img
                src={heroImage?.src || imagePlaceholders[13]}
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

              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {title}
              </h1>

              <p className="text-xl text-muted-foreground">{subtitle}</p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>

              <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
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
            className="mt-24"
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
                    src={image.src || imagePlaceholders[10 + index]}
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
