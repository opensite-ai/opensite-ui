"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailExhibitionSidebarExhibition {
  title: string;
  venue: string;
  date: string;
  href?: string;
}

export interface ProjectDetailExhibitionSidebarProps {
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
  exhibitions?: ProjectDetailExhibitionSidebarExhibition[];
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

const defaultExhibitions: ProjectDetailExhibitionSidebarExhibition[] = [
  {
    title: "Contemporary Forms",
    venue: "Metropolitan Art Gallery",
    date: "Jan - Mar 2024",
    href: "#",
  },
  {
    title: "Organic Futures",
    venue: "Modern Art Museum",
    date: "Apr - Jun 2024",
    href: "#",
  },
  {
    title: "Sculptural Dialogues",
    venue: "International Art Center",
    date: "Jul - Sep 2024",
    href: "#",
  },
];

const defaultGalleryImages = [
  { src: imagePlaceholders[38], alt: "Gallery image 1" },
  { src: imagePlaceholders[39], alt: "Gallery image 2" },
  { src: imagePlaceholders[40], alt: "Gallery image 3" },
];

const defaultProps: ProjectDetailExhibitionSidebarProps = {
  title: "Organic Resonance",
  subtitle: "Sculptural Installation",
  year: "2024",
  category: "Sculpture",
  artist: "Elena Vasquez",
  heroImage: {
    src: imagePlaceholders[41],
    alt: "Organic Resonance sculpture",
  },
  description:
    "This sculptural work has been featured in multiple international exhibitions, exploring themes of organic growth, material transformation, and the dialogue between natural and constructed forms.",
  exhibitions: defaultExhibitions,
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

export function ProjectDetailExhibitionSidebar(
  props: ProjectDetailExhibitionSidebarProps
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
    exhibitions = defaultProps.exhibitions,
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

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <motion.div {...fadeInUp} className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
              <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
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

            <div className="mt-8 relative aspect-video overflow-hidden rounded-2xl bg-muted">
              <Img
                src={heroImage?.src || imagePlaceholders[41]}
                alt={heroImage?.alt || "Project hero image"}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>

            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </motion.div>

          <motion.aside
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h2 className="mb-6 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Exhibitions
              </h2>
              <div className="space-y-6">
                {exhibitions?.map((exhibition, index) => (
                  <div
                    key={index}
                    className="border-b border-border pb-4 last:border-b-0 last:pb-0"
                  >
                    {exhibition.href ? (
                      <Pressable
                        href={exhibition.href}
                        className="block group"
                      >
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {exhibition.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {exhibition.venue}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exhibition.date}
                        </p>
                      </Pressable>
                    ) : (
                      <div>
                        <h3 className="font-medium text-foreground">
                          {exhibition.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {exhibition.venue}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exhibition.date}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {galleryImages && galleryImages.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid gap-6 md:grid-cols-3"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-xl bg-muted"
              >
                <Img
                  src={image.src || imagePlaceholders[38 + index]}
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
