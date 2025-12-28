"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailHeroMetadataProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  year?: string;
  category?: string;
  client?: string;
  heroImage?: {
    src?: string;
    alt?: string;
  };
  ctaText?: string;
  ctaHref?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: ProjectDetailHeroMetadataProps = {
  title: "Project Title",
  subtitle: "Creative Direction",
  description:
    "A comprehensive exploration of design principles and creative execution that pushes the boundaries of visual storytelling.",
  year: "2024",
  category: "Brand Identity",
  client: "Client Name",
  heroImage: {
    src: imagePlaceholders[0],
    alt: "Project hero image",
  },
  ctaText: "View Project",
  ctaHref: "#",
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ProjectDetailHeroMetadata(
  props: ProjectDetailHeroMetadataProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    description = defaultProps.description,
    year = defaultProps.year,
    category = defaultProps.category,
    client = defaultProps.client,
    heroImage = defaultProps.heroImage,
    ctaText = defaultProps.ctaText,
    ctaHref = defaultProps.ctaHref,
    optixFlowConfig,
  } = props;

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container space-y-8">
        <motion.header
          className="pb-8 md:pb-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="flex flex-col gap-y-12 lg:flex-row lg:items-start lg:justify-between">
            <motion.div variants={fadeInUp} className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {title}
              </h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-xl text-lg leading-relaxed font-medium text-muted-foreground"
              >
                {description}
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="w-full max-w-md space-y-4"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-medium text-muted-foreground">
                  CATEGORY
                </span>
                <span className="font-medium text-foreground">{category}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-medium text-muted-foreground">
                  CLIENT
                </span>
                <span className="font-medium text-foreground">{client}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-medium text-muted-foreground">YEAR</span>
                <span className="font-medium text-foreground">{year}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-muted-foreground">
                  {subtitle}
                </span>
                {ctaHref && ctaText && (
                  <Pressable
                    href={ctaHref}
                    className="h-auto p-0 font-medium text-foreground hover:text-primary"
                  >
                    {ctaText}
                  </Pressable>
                )}
              </div>
            </motion.div>
          </div>
        </motion.header>

        <motion.main
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="relative aspect-video overflow-hidden rounded-lg bg-muted/30"
          >
            <Img
              src={heroImage?.src || imagePlaceholders[0]}
              alt={heroImage?.alt || "Project hero image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute inset-0 bg-background/5" />
          </motion.div>
        </motion.main>
      </div>
    </section>
  );
}
