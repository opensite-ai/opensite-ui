"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailFashionEditorialCredit {
  role: string;
  name: string;
}

export interface ProjectDetailFashionEditorialProps {
  className?: string;
  title?: string;
  subtitle?: string;
  year?: string;
  category?: string;
  heroImage?: {
    src?: string;
    alt?: string;
  };
  description?: string;
  credits?: ProjectDetailFashionEditorialCredit[];
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

const defaultCredits: ProjectDetailFashionEditorialCredit[] = [
  { role: "Photography", name: "Marcus Chen" },
  { role: "Styling", name: "Isabella Torres" },
  { role: "Hair & Makeup", name: "Yuki Tanaka" },
  { role: "Model", name: "Aria Williams" },
  { role: "Creative Direction", name: "David Park" },
];

const defaultGalleryImages = [
  { src: imagePlaceholders[57], alt: "Fashion image 1" },
  { src: imagePlaceholders[58], alt: "Fashion image 2" },
  { src: imagePlaceholders[59], alt: "Fashion image 3" },
  { src: imagePlaceholders[60], alt: "Fashion image 4" },
];

const defaultProps: ProjectDetailFashionEditorialProps = {
  title: "TYRELL FASHION",
  subtitle: "Fall/Winter Collection",
  year: "2024",
  category: "Fashion",
  heroImage: {
    src: imagePlaceholders[61],
    alt: "TYRELL FASHION editorial",
  },
  description:
    "A neo-noir inspired editorial showcasing the Fall/Winter collection. The series explores themes of urban sophistication and contemporary elegance through dramatic lighting and bold compositions.",
  credits: defaultCredits,
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

export function ProjectDetailFashionEditorial(
  props: ProjectDetailFashionEditorialProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    heroImage = defaultProps.heroImage,
    description = defaultProps.description,
    credits = defaultProps.credits,
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

        <motion.header {...fadeInUp} className="mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
              {category}
            </span>
            <span>{year}</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl uppercase">
            {title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
        </motion.header>

        <motion.div {...fadeInUp} className="mb-16">
          <div className="relative aspect-3/4 md:aspect-video overflow-hidden rounded-2xl bg-muted">
            <Img
              src={heroImage?.src || imagePlaceholders[61]}
              alt={heroImage?.alt || "Fashion editorial hero"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-3">
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
            <h2 className="mb-6 text-sm font-medium tracking-wider text-muted-foreground uppercase">
              Credits
            </h2>
            <div className="space-y-4">
              {credits?.map((credit, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-border pb-3 last:border-b-0"
                >
                  <span className="text-sm text-muted-foreground">
                    {credit.role}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {credit.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

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
                className="relative aspect-3/4 overflow-hidden rounded-xl bg-muted"
              >
                <Img
                  src={image.src || imagePlaceholders[57 + index]}
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
