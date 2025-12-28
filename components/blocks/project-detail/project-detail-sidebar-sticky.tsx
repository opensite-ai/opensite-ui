"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailSidebarStickyImage {
  src?: string;
  alt: string;
}

export interface ProjectDetailSidebarStickyProps {
  className?: string;
  title?: string;
  subtitle?: string;
  category?: string;
  year?: string;
  description?: string;
  images?: ProjectDetailSidebarStickyImage[];
  relatedProjects?: Array<{
    title: string;
    category: string;
    src: string;
    alt: string;
    href?: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultImages: ProjectDetailSidebarStickyImage[] = [
  { src: imagePlaceholders[0], alt: "Project image 1" },
  { src: imagePlaceholders[1], alt: "Project image 2" },
  { src: imagePlaceholders[2], alt: "Project image 3" },
  { src: imagePlaceholders[3], alt: "Project image 4" },
];

const defaultRelatedProjects = [
  {
    title: "Portrait",
    category: "STREET",
    src: imagePlaceholders[4],
    alt: "Street Portrait",
    href: "#",
  },
  {
    title: "Architecture",
    category: "URBAN",
    src: imagePlaceholders[5],
    alt: "Urban Architecture",
    href: "#",
  },
  {
    title: "Documentary",
    category: "LIFESTYLE",
    src: imagePlaceholders[6],
    alt: "Lifestyle Documentary",
    href: "#",
  },
];

const defaultProps: ProjectDetailSidebarStickyProps = {
  title: "Urban Lens",
  subtitle: "Street Photography Collection",
  category: "PHOTOGRAPHY",
  year: "2024",
  description:
    "A captivating series of street photography that captures the essence of urban life through the lens of contemporary photographers working in monochrome.",
  images: defaultImages,
  relatedProjects: defaultRelatedProjects,
};

function ImageBlock({
  src,
  alt,
  index,
  optixFlowConfig,
}: {
  src?: string;
  alt: string;
  index: number;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative mb-8 last:mb-0"
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted">
        {src ? (
          <Img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            optixFlowConfig={optixFlowConfig}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <span className="text-sm">Image placeholder</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-muted/50 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}

function StickySection({
  title,
  subtitle,
  category,
  year,
  description,
}: {
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
}) {
  return (
    <div className="top-20 flex flex-col self-start lg:sticky lg:min-h-screen lg:justify-between">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground">{subtitle}</p>
          <div className="flex items-center gap-4">
            <span className="rounded-3xl bg-muted px-4 py-1 text-xs font-medium text-foreground">
              {category}
            </span>
            <span className="rounded-3xl border border-border px-3 text-sm text-muted-foreground">
              {year}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-5 space-y-3 md:sticky md:bottom-9"
      >
        <h3 className="text-sm font-medium tracking-wider text-foreground uppercase">
          ABOUT
        </h3>
        <p className="max-w-sm text-sm leading-relaxed tracking-wide text-muted-foreground uppercase">
          {description}
        </p>
      </motion.div>
    </div>
  );
}

function ProjectCard({
  title,
  category,
  src,
  alt,
  index,
  href,
  optixFlowConfig,
}: {
  title: string;
  category: string;
  src: string;
  alt: string;
  index: number;
  href?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
        <Img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
          optixFlowConfig={optixFlowConfig}
        />
        <div className="absolute inset-0 bg-muted/40 transition-all duration-300 group-hover:bg-muted/20" />
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <span className="self-start border border-muted bg-background text-xs font-medium text-foreground px-2 py-1 rounded">
            {category}
          </span>
          <h3 className="text-2xl font-semibold text-foreground opacity-70">
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Pressable href={href} className="block">
        {content}
      </Pressable>
    );
  }

  return content;
}

export function ProjectDetailSidebarSticky(
  props: ProjectDetailSidebarStickyProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    category = defaultProps.category,
    year = defaultProps.year,
    description = defaultProps.description,
    images = defaultProps.images,
    relatedProjects = defaultProps.relatedProjects,
    optixFlowConfig,
  } = props;

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <StickySection
            title={title!}
            subtitle={subtitle!}
            category={category!}
            year={year!}
            description={description!}
          />
          <div className="space-y-10">
            {images?.map((img, index) => (
              <ImageBlock
                key={index}
                src={img.src}
                alt={img.alt}
                index={index}
                optixFlowConfig={optixFlowConfig}
              />
            ))}
          </div>
        </div>

        {relatedProjects && relatedProjects.length > 0 && (
          <div className="mt-32">
            <h3 className="mb-6 text-sm font-medium tracking-wider text-foreground uppercase">
              MORE COLLECTIONS
            </h3>
            <div className="grid gap-6 pb-16 md:grid-cols-3">
              {relatedProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  {...project}
                  index={index}
                  optixFlowConfig={optixFlowConfig}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
