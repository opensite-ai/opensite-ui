"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailSplitMaterialsSpec {
  label: string;
  value: string;
}

export interface ProjectDetailSplitMaterialsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  year?: string;
  category?: string;
  artist?: string;
  heroImage?: {
    src?: string;
    alt?: string;
  };
  description?: string;
  specifications?: ProjectDetailSplitMaterialsSpec[];
  materials?: string[];
  secondaryImage?: {
    src?: string;
    alt?: string;
  };
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSpecifications: ProjectDetailSplitMaterialsSpec[] = [
  { label: "Height", value: "180 cm" },
  { label: "Width", value: "90 cm" },
  { label: "Depth", value: "75 cm" },
  { label: "Weight", value: "45 kg" },
];

const defaultMaterials = [
  "Polished Bronze",
  "Brushed Stainless Steel",
  "Carrara Marble Base",
  "LED Lighting System",
];

const defaultProps: ProjectDetailSplitMaterialsProps = {
  title: "Organic Resonance",
  subtitle: "Contemporary Sculpture",
  year: "2024",
  category: "Sculpture",
  artist: "Elena Vasquez",
  heroImage: {
    src: imagePlaceholders[20],
    alt: "Organic Resonance sculpture main view",
  },
  description:
    "A sculptural exploration of organic forms rendered in bronze and steel. The piece captures the tension between natural growth patterns and industrial precision, creating a dialogue between the organic and the manufactured.",
  specifications: defaultSpecifications,
  materials: defaultMaterials,
  secondaryImage: {
    src: imagePlaceholders[21],
    alt: "Organic Resonance sculpture detail",
  },
  backHref: "/projects",
  backLabel: "Back to Gallery",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailSplitMaterials(
  props: ProjectDetailSplitMaterialsProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    artist = defaultProps.artist,
    heroImage = defaultProps.heroImage,
    description = defaultProps.description,
    specifications = defaultProps.specifications,
    materials = defaultProps.materials,
    secondaryImage = defaultProps.secondaryImage,
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
            <span>|</span>
            <span>{artist}</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
        </motion.header>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fadeInUp}>
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted">
              <Img
                src={heroImage?.src || imagePlaceholders[20]}
                alt={heroImage?.alt || "Sculpture main view"}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center space-y-8"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="space-y-6">
              <h2 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Specifications
              </h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full">
                  <tbody>
                    {specifications?.map((spec, index) => (
                      <tr
                        key={spec.label}
                        className={cn(
                          "border-b border-border last:border-b-0",
                          index % 2 === 0 ? "bg-muted/30" : "bg-background"
                        )}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-muted-foreground">
                          {spec.label}
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground text-right">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Materials
              </h2>
              <div className="flex flex-wrap gap-2">
                {materials?.map((material) => (
                  <span
                    key={material}
                    className="rounded-full border border-border px-3 py-1 text-sm text-foreground"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {secondaryImage && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
              <Img
                src={secondaryImage.src || imagePlaceholders[21]}
                alt={secondaryImage.alt || "Sculpture detail view"}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
}
