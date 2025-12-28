"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailMaskRevealProps {
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
  revealImages?: Array<{
    src?: string;
    alt: string;
    caption?: string;
  }>;
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultRevealImages = [
  {
    src: imagePlaceholders[81],
    alt: "Reveal image 1",
    caption: "Initial concept exploration",
  },
  {
    src: imagePlaceholders[82],
    alt: "Reveal image 2",
    caption: "Material studies and textures",
  },
  {
    src: imagePlaceholders[83],
    alt: "Reveal image 3",
    caption: "Final composition",
  },
];

const defaultProps: ProjectDetailMaskRevealProps = {
  title: "Color Psychology",
  subtitle: "An Exploration of Emotion Through Color",
  year: "2024",
  category: "Art Direction",
  heroImage: {
    src: imagePlaceholders[84],
    alt: "Color Psychology hero",
  },
  description:
    "This project explores the psychological impact of color in visual communication. Through a series of studies and experiments, we examined how different color combinations evoke specific emotional responses and influence perception.",
  revealImages: defaultRevealImages,
  backHref: "/projects",
  backLabel: "Back to Projects",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function RevealImage({
  src,
  alt,
  caption,
  index,
  optixFlowConfig,
}: {
  src?: string;
  alt: string;
  caption?: string;
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

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
  );

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        style={{ clipPath }}
        className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted"
      >
        <motion.div style={{ y }} className="h-full w-full">
          <Img
            src={src || imagePlaceholders[81 + index]}
            alt={alt}
            className="h-full w-full object-cover scale-110"
            optixFlowConfig={optixFlowConfig}
          />
        </motion.div>
      </motion.div>
      {caption && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-4 text-sm text-muted-foreground text-center"
        >
          {caption}
        </motion.p>
      )}
    </motion.div>
  );
}

export function ProjectDetailMaskReveal(
  props: ProjectDetailMaskRevealProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    heroImage = defaultProps.heroImage,
    description = defaultProps.description,
    revealImages = defaultProps.revealImages,
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
        </motion.header>

        <motion.div {...fadeInUp} className="mb-16">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
            <Img
              src={heroImage?.src || imagePlaceholders[84]}
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

        {revealImages && revealImages.length > 0 && (
          <div className="space-y-24">
            {revealImages.map((image, index) => (
              <RevealImage
                key={index}
                src={image.src}
                alt={image.alt}
                caption={image.caption}
                index={index}
                optixFlowConfig={optixFlowConfig}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
