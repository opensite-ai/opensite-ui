"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailListRelatedImage {
  src?: string;
  alt: string;
}

export interface ProjectDetailListRelatedProject {
  title: string;
  category: string;
  year: string;
  src?: string;
  alt: string;
  href?: string;
}

export interface ProjectDetailListRelatedProps {
  className?: string;
  title?: string;
  subtitle?: string;
  category?: string;
  year?: string;
  description?: string;
  images?: ProjectDetailListRelatedImage[];
  relatedProjects?: ProjectDetailListRelatedProject[];
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultImages: ProjectDetailListRelatedImage[] = [
  { src: imagePlaceholders[42], alt: "Project image 1" },
  { src: imagePlaceholders[43], alt: "Project image 2" },
  { src: imagePlaceholders[44], alt: "Project image 3" },
  { src: imagePlaceholders[45], alt: "Project image 4" },
];

const defaultRelatedProjects: ProjectDetailListRelatedProject[] = [
  {
    title: "Night Visions",
    category: "Photography",
    year: "2024",
    src: imagePlaceholders[46],
    alt: "Night Visions project",
    href: "#",
  },
  {
    title: "Urban Fragments",
    category: "Photography",
    year: "2023",
    src: imagePlaceholders[47],
    alt: "Urban Fragments project",
    href: "#",
  },
  {
    title: "Silent Streets",
    category: "Photography",
    year: "2023",
    src: imagePlaceholders[48],
    alt: "Silent Streets project",
    href: "#",
  },
];

const defaultProps: ProjectDetailListRelatedProps = {
  title: "Urban Lens",
  subtitle: "Street Photography Collection",
  category: "Photography",
  year: "2024",
  description:
    "A compelling series of street photography capturing the essence of urban life. Through careful observation and timing, these images reveal the poetry hidden in everyday moments.",
  images: defaultImages,
  relatedProjects: defaultRelatedProjects,
  backHref: "/projects",
  backLabel: "Back to Collections",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailListRelated(
  props: ProjectDetailListRelatedProps
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
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </motion.header>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {images?.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted"
            >
              <Img
                src={image.src || imagePlaceholders[42 + index]}
                alt={image.alt}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </motion.div>
          ))}
        </motion.div>

        {relatedProjects && relatedProjects.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-24"
          >
            <h2 className="mb-8 text-sm font-medium tracking-wider text-muted-foreground uppercase">
              Related Collections
            </h2>
            <div className="space-y-4">
              {relatedProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {project.href ? (
                    <Pressable
                      href={project.href}
                      className="group flex items-center gap-6 rounded-xl border border-border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Img
                          src={project.src || imagePlaceholders[46 + index]}
                          alt={project.alt}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {project.category} | {project.year}
                        </p>
                      </div>
                      <DynamicIcon
                        name="lucide/arrow-right"
                        size={20}
                        className="text-muted-foreground transition-transform group-hover:translate-x-1"
                      />
                    </Pressable>
                  ) : (
                    <div className="flex items-center gap-6 rounded-xl border border-border p-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Img
                          src={project.src || imagePlaceholders[46 + index]}
                          alt={project.alt}
                          className="h-full w-full object-cover"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {project.category} | {project.year}
                        </p>
                      </div>
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
