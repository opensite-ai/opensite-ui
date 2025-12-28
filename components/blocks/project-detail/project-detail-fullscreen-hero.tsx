"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailFullscreenHeroSection {
  title: string;
  content: string;
}

export interface ProjectDetailFullscreenHeroProps {
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
  sections?: ProjectDetailFullscreenHeroSection[];
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: ProjectDetailFullscreenHeroSection[] = [
  {
    title: "The Vision",
    content:
      "Creating a bold visual identity that captures the essence of modern luxury while remaining accessible and approachable. The design language needed to work seamlessly across digital and physical touchpoints.",
  },
  {
    title: "The Execution",
    content:
      "Through careful consideration of typography, color, and spatial relationships, we developed a comprehensive brand system that elevates every customer interaction and reinforces brand values at every touchpoint.",
  },
  {
    title: "The Impact",
    content:
      "The new brand identity has transformed how customers perceive and interact with the brand, resulting in measurable improvements in engagement, loyalty, and overall brand sentiment.",
  },
];

const defaultProps: ProjectDetailFullscreenHeroProps = {
  title: "Luxe Collective",
  subtitle: "Premium Brand Experience",
  year: "2024",
  category: "Brand Identity",
  client: "Luxe Collective",
  heroImage: {
    src: imagePlaceholders[9],
    alt: "Luxe Collective brand showcase",
  },
  sections: defaultSections,
  backHref: "/projects",
  backLabel: "Back",
};

export function ProjectDetailFullscreenHero(
  props: ProjectDetailFullscreenHeroProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    client = defaultProps.client,
    heroImage = defaultProps.heroImage,
    sections = defaultProps.sections,
    backHref = defaultProps.backHref,
    backLabel = defaultProps.backLabel,
    optixFlowConfig,
  } = props;

  return (
    <article className={cn(className)}>
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <Img
            src={heroImage?.src || imagePlaceholders[9]}
            alt={heroImage?.alt || "Project hero image"}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container relative z-10 flex min-h-screen flex-col justify-between py-8">
          {backHref && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
            className="pb-16"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-foreground/70">
              <span className="rounded-full border border-foreground/20 px-3 py-1">
                {category}
              </span>
              <span>{year}</span>
              <span>|</span>
              <span>{client}</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-xl text-foreground/80">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container max-w-4xl">
          <div className="space-y-20">
            {sections?.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
        </div>
      </section>
    </article>
  );
}
