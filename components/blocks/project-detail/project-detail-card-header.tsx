"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailCardHeaderProps {
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
  { src: imagePlaceholders[35], alt: "Gallery image 1" },
  { src: imagePlaceholders[36], alt: "Gallery image 2" },
];

const defaultProps: ProjectDetailCardHeaderProps = {
  title: "Organic Resonance",
  subtitle: "Sculptural Installation",
  year: "2024",
  category: "Sculpture",
  artist: "Elena Vasquez",
  heroImage: {
    src: imagePlaceholders[37],
    alt: "Organic Resonance sculpture",
  },
  description:
    "A sculptural exploration of organic forms that bridges the gap between natural growth patterns and human artistic expression. The work invites contemplation of our relationship with the natural world.",
  galleryImages: defaultGalleryImages,
  backHref: "/projects",
  backLabel: "Back",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailCardHeader(
  props: ProjectDetailCardHeaderProps
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

        <motion.div
          {...fadeInUp}
          className="mb-16 rounded-3xl border border-border bg-muted/30 p-8 md:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
                <span className="rounded-full bg-background px-3 py-1 font-medium text-foreground">
                  {category}
                </span>
                <span>{year}</span>
                <span>|</span>
                <span>{artist}</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {title}
              </h1>

              <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted">
              <Img
                src={heroImage?.src || imagePlaceholders[37]}
                alt={heroImage?.alt || "Project hero image"}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        </motion.div>

        {galleryImages && galleryImages.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted"
              >
                <Img
                  src={image.src || imagePlaceholders[35 + index]}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </article>
  );
}
