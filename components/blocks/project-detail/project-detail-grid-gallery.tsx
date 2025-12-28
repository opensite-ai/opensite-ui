"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailGridGalleryImage {
  src?: string;
  alt: string;
  caption?: string;
}

export interface ProjectDetailGridGalleryProps {
  className?: string;
  title?: string;
  subtitle?: string;
  year?: string;
  category?: string;
  artist?: string;
  description?: string;
  creativeProcess?: string;
  images?: ProjectDetailGridGalleryImage[];
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultImages: ProjectDetailGridGalleryImage[] = [
  { src: imagePlaceholders[14], alt: "Gallery image 1", caption: "Initial concept exploration" },
  { src: imagePlaceholders[15], alt: "Gallery image 2", caption: "Material studies" },
  { src: imagePlaceholders[16], alt: "Gallery image 3", caption: "Form development" },
  { src: imagePlaceholders[17], alt: "Gallery image 4", caption: "Detail refinement" },
  { src: imagePlaceholders[18], alt: "Gallery image 5", caption: "Final composition" },
  { src: imagePlaceholders[19], alt: "Gallery image 6", caption: "Installation view" },
];

const defaultProps: ProjectDetailGridGalleryProps = {
  title: "Organic Resonance",
  subtitle: "Sculptural Installation",
  year: "2024",
  category: "Installation Art",
  artist: "Elena Vasquez",
  description:
    "An immersive sculptural installation that explores the relationship between organic forms and architectural space. The work invites viewers to experience the interplay of light, shadow, and form.",
  creativeProcess:
    "The creative process began with extensive research into natural growth patterns and biomimicry. Through iterative prototyping and material experimentation, the final form emerged as a dialogue between nature and human intervention.",
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

export function ProjectDetailGridGallery(
  props: ProjectDetailGridGalleryProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    artist = defaultProps.artist,
    description = defaultProps.description,
    creativeProcess = defaultProps.creativeProcess,
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
        </motion.header>

        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div {...fadeInUp} className="space-y-8">
            <div>
              <h2 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                About the Work
              </h2>
              <p className="text-lg leading-relaxed text-foreground">
                {description}
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Creative Process
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {creativeProcess}
              </p>
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
                  index > 0 && "aspect-square"
                )}
              >
                <Img
                  src={image.src || imagePlaceholders[14 + index]}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  optixFlowConfig={optixFlowConfig}
                />
                {image.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm text-foreground">{image.caption}</p>
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
            className="mt-16"
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
                    src={image.src || imagePlaceholders[18 + index]}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                  {image.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-sm text-foreground">{image.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
}
