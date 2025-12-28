"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailMinimalCenteredProps {
  className?: string;
  title?: string;
  subtitle?: string;
  year?: string;
  category?: string;
  artist?: string;
  description?: string;
  images?: Array<{
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

const defaultImages = [
  { src: imagePlaceholders[26], alt: "Project image 1" },
  { src: imagePlaceholders[27], alt: "Project image 2" },
  { src: imagePlaceholders[28], alt: "Project image 3" },
];

const defaultProps: ProjectDetailMinimalCenteredProps = {
  title: "Organic Resonance",
  subtitle: "Sculptural Installation",
  year: "2024",
  category: "Sculpture",
  artist: "Elena Vasquez",
  description:
    "A contemplative exploration of form and space, this sculptural work invites viewers to experience the subtle interplay between light, shadow, and material. The piece draws inspiration from natural phenomena and the mathematical patterns found in organic growth.",
  images: defaultImages,
  backHref: "/projects",
  backLabel: "Back",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailMinimalCentered(
  props: ProjectDetailMinimalCenteredProps
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
      <div className="container max-w-3xl">
        {backHref && (
          <motion.div {...fadeInUp} className="mb-12 text-center">
            <Pressable
              href={backHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <DynamicIcon name="lucide/arrow-left" size={16} />
              {backLabel}
            </Pressable>
          </motion.div>
        )}

        <motion.header {...fadeInUp} className="mb-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 text-sm text-muted-foreground">
            <span>{category}</span>
            <span>|</span>
            <span>{year}</span>
            <span>|</span>
            <span>{artist}</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
        </motion.header>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-center"
        >
          <p className="text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </motion.div>

        <div className="space-y-8">
          {images?.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted"
            >
              <Img
                src={image.src || imagePlaceholders[26 + index]}
                alt={image.alt}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </article>
  );
}
