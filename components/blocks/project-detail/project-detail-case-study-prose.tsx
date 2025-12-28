"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailCaseStudyProseSection {
  title: string;
  content: string;
}

export interface ProjectDetailCaseStudyProseProps {
  className?: string;
  title?: string;
  subtitle?: string;
  year?: string;
  category?: string;
  client?: string;
  heroImage?: {
    src?: string;
    alt?: string;
  };
  overview?: string;
  sections?: ProjectDetailCaseStudyProseSection[];
  challenge?: string;
  process?: string;
  outcome?: string;
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: ProjectDetailCaseStudyProseSection[] = [
  {
    title: "The Challenge",
    content:
      "The client needed a complete brand overhaul that would resonate with modern consumers while maintaining their heritage. We approached this challenge by conducting extensive market research and stakeholder interviews to understand the core values that needed to be preserved.",
  },
  {
    title: "The Process",
    content:
      "Our design process involved multiple iterations of concept development, from initial sketches to refined digital mockups. We collaborated closely with the client team to ensure every element aligned with their vision and business objectives.",
  },
  {
    title: "The Outcome",
    content:
      "The final brand identity successfully bridges tradition and innovation, resulting in a 40% increase in brand recognition and positive customer feedback. The new visual system has been implemented across all touchpoints.",
  },
];

const defaultProps: ProjectDetailCaseStudyProseProps = {
  title: "Pure Pressed",
  subtitle: "Brand Identity & Packaging Design",
  year: "2024",
  category: "Branding",
  client: "Pure Pressed Juicery",
  heroImage: {
    src: imagePlaceholders[7],
    alt: "Pure Pressed brand identity showcase",
  },
  overview:
    "A comprehensive brand identity project for an organic cold-pressed juice company, focusing on sustainability and wellness.",
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

export function ProjectDetailCaseStudyProse(
  props: ProjectDetailCaseStudyProseProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    client = defaultProps.client,
    heroImage = defaultProps.heroImage,
    overview = defaultProps.overview,
    sections = defaultProps.sections,
    backHref = defaultProps.backHref,
    backLabel = defaultProps.backLabel,
    optixFlowConfig,
  } = props;

  return (
    <article className={cn("py-24 md:py-32", className)}>
      <div className="container max-w-4xl">
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

        <motion.header {...fadeInUp} className="mb-16 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1 font-medium">
              {category}
            </span>
            <span>{year}</span>
            <span className="hidden sm:inline">|</span>
            <span>{client}</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="text-xl text-muted-foreground">{subtitle}</p>
        </motion.header>

        <motion.div {...fadeInUp} className="mb-16">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
            <Img
              src={heroImage?.src || imagePlaceholders[7]}
              alt={heroImage?.alt || "Project hero image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </motion.div>

        {overview && (
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
              Overview
            </h2>
            <p className="text-lg leading-relaxed text-foreground">
              {overview}
            </p>
          </motion.div>
        )}

        <div className="space-y-16">
          {sections?.map((section, index) => (
            <motion.section
              key={section.title}
              {...fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h2 className="mb-6 text-2xl font-semibold text-foreground">
                {section.title}
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="leading-relaxed">{section.content}</p>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </article>
  );
}
