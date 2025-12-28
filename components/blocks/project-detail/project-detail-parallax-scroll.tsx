"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailParallaxScrollSection {
  title: string;
  content: string;
  image?: {
    src?: string;
    alt: string;
  };
}

export interface ProjectDetailParallaxScrollProps {
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
  sections?: ProjectDetailParallaxScrollSection[];
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: ProjectDetailParallaxScrollSection[] = [
  {
    title: "Concept Development",
    content:
      "The initial phase focused on exploring the emotional resonance of different color combinations. Through extensive research and experimentation, we identified key color relationships that evoke specific psychological responses.",
    image: {
      src: imagePlaceholders[85],
      alt: "Concept development",
    },
  },
  {
    title: "Visual Language",
    content:
      "Building on our research, we developed a comprehensive visual language that translates emotional concepts into tangible design elements. This system provides a framework for consistent, impactful visual communication.",
    image: {
      src: imagePlaceholders[86],
      alt: "Visual language",
    },
  },
  {
    title: "Application",
    content:
      "The final phase involved applying our findings across various media and contexts. From digital interfaces to physical installations, the color system proved versatile and effective in evoking intended emotional responses.",
    image: {
      src: imagePlaceholders[87],
      alt: "Application",
    },
  },
];

const defaultProps: ProjectDetailParallaxScrollProps = {
  title: "Chromatic Emotions",
  subtitle: "The Psychology of Color in Design",
  year: "2024",
  category: "Research & Design",
  heroImage: {
    src: imagePlaceholders[88],
    alt: "Chromatic Emotions hero",
  },
  description:
    "An in-depth exploration of how color influences human emotion and behavior. This project combines scientific research with creative experimentation to develop a practical framework for emotionally intelligent design.",
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

function ParallaxSection({
  title,
  content,
  image,
  index,
  optixFlowConfig,
}: {
  title: string;
  content: string;
  image?: {
    src?: string;
    alt: string;
  };
  index: number;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "grid gap-12 lg:grid-cols-2 lg:gap-16 items-center",
        index % 2 === 1 && "lg:flex-row-reverse"
      )}
    >
      <motion.div
        style={{ opacity }}
        className={cn(index % 2 === 1 && "lg:order-2")}
      >
        <h2 className="mb-6 text-2xl font-semibold text-foreground md:text-3xl">
          {title}
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {content}
        </p>
      </motion.div>
      {image && (
        <motion.div
          style={{ y }}
          className={cn(
            "relative aspect-4/3 overflow-hidden rounded-2xl bg-muted",
            index % 2 === 1 && "lg:order-1"
          )}
        >
          <Img
            src={image.src || imagePlaceholders[85 + index]}
            alt={image.alt}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

export function ProjectDetailParallaxScroll(
  props: ProjectDetailParallaxScrollProps
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

  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <article className={cn(className)}>
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Img
            src={heroImage?.src || imagePlaceholders[88]}
            alt={heroImage?.alt || "Project hero image"}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
        </motion.div>

        <div className="container relative z-10 flex min-h-screen flex-col justify-end py-16">
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

          <motion.div style={{ opacity: heroOpacity }} className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-foreground/70">
              <span className="rounded-full border border-foreground/20 px-3 py-1">
                {category}
              </span>
              <span>{year}</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {title}
            </h1>

            <p className="mt-6 text-xl text-foreground/80">{subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div {...fadeInUp} className="mb-24 max-w-3xl">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </motion.div>

          {sections && sections.length > 0 && (
            <div className="space-y-48">
              {sections.map((section, index) => (
                <ParallaxSection
                  key={index}
                  title={section.title}
                  content={section.content}
                  image={section.image}
                  index={index}
                  optixFlowConfig={optixFlowConfig}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
