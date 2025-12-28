"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailLargeHeroFeaturedDetail {
  label: string;
  value: string;
}

export interface ProjectDetailLargeHeroFeaturedSection {
  title: string;
  content: string;
}

export interface ProjectDetailLargeHeroFeaturedProps {
  className?: string;
  title?: string;
  subtitle?: string;
  heroImage?: {
    src?: string;
    alt?: string;
  };
  details?: ProjectDetailLargeHeroFeaturedDetail[];
  sections?: ProjectDetailLargeHeroFeaturedSection[];
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

const defaultDetails: ProjectDetailLargeHeroFeaturedDetail[] = [
  { label: "Client", value: "Acme Corporation" },
  { label: "Industry", value: "Technology" },
  { label: "Services", value: "Brand Strategy, Visual Identity" },
  { label: "Year", value: "2024" },
];

const defaultSections: ProjectDetailLargeHeroFeaturedSection[] = [
  {
    title: "The Challenge",
    content:
      "Acme Corporation needed to reposition their brand for the modern market while maintaining the trust and recognition they had built over decades. The challenge was to create a visual identity that felt both innovative and established.",
  },
  {
    title: "Our Approach",
    content:
      "We conducted extensive research into the competitive landscape and stakeholder expectations. Through collaborative workshops, we identified the core values that would drive the new brand direction.",
  },
  {
    title: "The Solution",
    content:
      "The resulting brand system balances heritage with innovation, using a refined color palette and contemporary typography to signal evolution while maintaining brand equity.",
  },
];

const defaultGalleryImages = [
  { src: imagePlaceholders[69], alt: "Case study image 1" },
  { src: imagePlaceholders[70], alt: "Case study image 2" },
];

const defaultProps: ProjectDetailLargeHeroFeaturedProps = {
  title: "Transforming Acme's Digital Presence",
  subtitle:
    "A comprehensive brand refresh that positioned Acme Corporation as a leader in innovation while honoring their established legacy.",
  heroImage: {
    src: imagePlaceholders[71],
    alt: "Acme Corporation brand showcase",
  },
  details: defaultDetails,
  sections: defaultSections,
  galleryImages: defaultGalleryImages,
  backHref: "/projects",
  backLabel: "Back to Projects",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailLargeHeroFeatured(
  props: ProjectDetailLargeHeroFeaturedProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    heroImage = defaultProps.heroImage,
    details = defaultProps.details,
    sections = defaultProps.sections,
    galleryImages = defaultProps.galleryImages,
    backHref = defaultProps.backHref,
    backLabel = defaultProps.backLabel,
    optixFlowConfig,
  } = props;

  return (
    <article className={cn(className)}>
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Img
            src={heroImage?.src || imagePlaceholders[71]}
            alt={heroImage?.alt || "Project hero image"}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="container relative z-10 flex min-h-[70vh] flex-col justify-end py-16">
          {backHref && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute top-8 left-0"
            >
              <Pressable
                href={backHref}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                <DynamicIcon name="lucide/arrow-left" size={16} />
                {backLabel}
              </Pressable>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-xl text-foreground/80">{subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container">
          {details && details.length > 0 && (
            <motion.div
              {...fadeInUp}
              className="mb-16 grid gap-6 border-b border-border pb-16 sm:grid-cols-2 lg:grid-cols-4"
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
            <div className="space-y-16 max-w-3xl">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h2 className="mb-6 text-2xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {galleryImages && galleryImages.length > 0 && (
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 grid gap-6 md:grid-cols-2"
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
                    src={image.src || imagePlaceholders[69 + index]}
                    alt={image.alt}
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
  );
}
