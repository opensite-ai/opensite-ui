"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailPhotographyBreadcrumbItem {
  label: string;
  href?: string;
}

export interface ProjectDetailPhotographyBreadcrumbProps {
  className?: string;
  title?: string;
  subtitle?: string;
  year?: string;
  category?: string;
  photographer?: string;
  breadcrumbs?: ProjectDetailPhotographyBreadcrumbItem[];
  heroImage?: {
    src?: string;
    alt?: string;
  };
  description?: string;
  galleryImages?: Array<{
    src?: string;
    alt: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultBreadcrumbs: ProjectDetailPhotographyBreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Photography", href: "/photography" },
  { label: "Monochrome Stories" },
];

const defaultGalleryImages = [
  { src: imagePlaceholders[62], alt: "Photography 1" },
  { src: imagePlaceholders[63], alt: "Photography 2" },
  { src: imagePlaceholders[64], alt: "Photography 3" },
  { src: imagePlaceholders[65], alt: "Photography 4" },
  { src: imagePlaceholders[66], alt: "Photography 5" },
  { src: imagePlaceholders[67], alt: "Photography 6" },
];

const defaultProps: ProjectDetailPhotographyBreadcrumbProps = {
  title: "Monochrome Stories",
  subtitle: "A Study in Light and Shadow",
  year: "2024",
  category: "Photography",
  photographer: "James Morrison",
  breadcrumbs: defaultBreadcrumbs,
  heroImage: {
    src: imagePlaceholders[68],
    alt: "Monochrome Stories hero",
  },
  description:
    "A collection of black and white photographs exploring the interplay of light and shadow in urban environments. Each image tells a story of solitude, reflection, and the quiet beauty found in everyday moments.",
  galleryImages: defaultGalleryImages,
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailPhotographyBreadcrumb(
  props: ProjectDetailPhotographyBreadcrumbProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    photographer = defaultProps.photographer,
    breadcrumbs = defaultProps.breadcrumbs,
    heroImage = defaultProps.heroImage,
    description = defaultProps.description,
    galleryImages = defaultProps.galleryImages,
    optixFlowConfig,
  } = props;

  return (
    <article className={cn("py-24 md:py-32", className)}>
      <div className="container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav {...fadeInUp} className="mb-12">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  {item.href ? (
                    <Pressable
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Pressable>
                  ) : (
                    <span className="font-medium text-foreground">
                      {item.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <DynamicIcon
                      name="lucide/chevron-right"
                      size={14}
                      className="text-muted-foreground"
                    />
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <motion.aside
            {...fadeInUp}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {title}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
              </div>

              <div className="space-y-3 border-t border-border pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">{category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Photographer</span>
                  <span className="font-medium text-foreground">
                    {photographer}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium text-foreground">{year}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground border-t border-border pt-6">
                {description}
              </p>
            </div>
          </motion.aside>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted mb-6">
              <Img
                src={heroImage?.src || imagePlaceholders[68]}
                alt={heroImage?.alt || "Project hero image"}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>

            {galleryImages && galleryImages.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
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
                      src={image.src || imagePlaceholders[62 + index]}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </article>
  );
}
