"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailNumberedSectionsSection {
  number: string;
  title: string;
  content: string;
  image?: {
    src?: string;
    alt: string;
  };
}

export interface ProjectDetailNumberedSectionsProps {
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
  sections?: ProjectDetailNumberedSectionsSection[];
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: ProjectDetailNumberedSectionsSection[] = [
  {
    number: "01",
    title: "The Urban Canvas",
    content:
      "Cities are living, breathing entities that constantly evolve. Through the lens, we capture moments that reveal the hidden poetry of urban landscapes - the interplay of light and shadow, the geometry of architecture, and the human stories unfolding in public spaces.",
    image: {
      src: imagePlaceholders[77],
      alt: "Urban photography 1",
    },
  },
  {
    number: "02",
    title: "Moments in Time",
    content:
      "Street photography is about patience and presence. It's about being in the right place at the right moment, ready to capture the fleeting instances that tell a larger story about our shared human experience.",
    image: {
      src: imagePlaceholders[78],
      alt: "Urban photography 2",
    },
  },
  {
    number: "03",
    title: "Light & Shadow",
    content:
      "The quality of light transforms ordinary scenes into extraordinary compositions. Early morning and late afternoon offer the most dramatic opportunities, casting long shadows and creating depth that brings images to life.",
    image: {
      src: imagePlaceholders[79],
      alt: "Urban photography 3",
    },
  },
];

const defaultProps: ProjectDetailNumberedSectionsProps = {
  title: "Urban Perspectives",
  subtitle: "A Street Photography Series",
  year: "2024",
  category: "Photography",
  heroImage: {
    src: imagePlaceholders[80],
    alt: "Urban Perspectives hero",
  },
  description:
    "This series explores the visual poetry of urban environments through a collection of street photographs captured across major cities. Each image tells a story of human connection, architectural beauty, and the rhythm of city life.",
  sections: defaultSections,
  backHref: "/projects",
  backLabel: "Back to Projects",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailNumberedSections(
  props: ProjectDetailNumberedSectionsProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    heroImage = defaultProps.heroImage,
    description = defaultProps.description,
    sections = defaultProps.sections,
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

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
        </motion.header>

        <motion.div {...fadeInUp} className="mb-16">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
            <Img
              src={heroImage?.src || imagePlaceholders[80]}
              alt={heroImage?.alt || "Project hero image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-24 max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </motion.div>

        {sections && sections.length > 0 && (
          <div className="space-y-32">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center"
              >
                <div className={cn(index % 2 === 1 && "lg:order-2")}>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-6xl font-bold text-muted-foreground/30 md:text-7xl">
                      {section.number}
                    </span>
                    <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                </div>
                {section.image && (
                  <div
                    className={cn(
                      "relative aspect-4/3 overflow-hidden rounded-2xl bg-muted",
                      index % 2 === 1 && "lg:order-1"
                    )}
                  >
                    <Img
                      src={section.image.src || imagePlaceholders[77 + index]}
                      alt={section.image.alt}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
