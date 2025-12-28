"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card } from "../../ui/card";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface ServicesListFeatureSpotlightItem {
  /**
   * Unique identifier for the feature
   */
  id: string;
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature description
   */
  description: string;
  /**
   * Eyebrow label for the feature
   */
  eyebrow?: string;
  /**
   * Badge labels for the feature
   */
  badges?: [string, string];
  /**
   * Icon name for the feature
   */
  icon: string;
  /**
   * Feature image
   */
  image: {
    src: string;
    alt: string;
  };
}

export interface ServicesListFeatureSpotlightProps {
  /**
   * Section heading
   */
  heading?: string;
  /**
   * Section subheading
   */
  subheading?: string;
  /**
   * Features list
   */
  features?: ServicesListFeatureSpotlightItem[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultFeatures: ServicesListFeatureSpotlightItem[] = [
  {
    id: "independent-strategy",
    title: "Independent Strategy",
    description:
      "Unbiased recommendations supported by OpenSite AI coverage intelligence.",
    eyebrow: "Independent Choice",
    badges: ["Transparent advice", "Carrier flexibility"],
    icon: "lucide/shield-check",
    image: {
      src: imagePlaceholders[10],
      alt: "Independent strategy",
    },
  },
  {
    id: "personal-guidance",
    title: "Personal Guidance",
    description:
      "Dedicated advisors that translate complex policies into clear actions.",
    eyebrow: "Personal Guidance",
    badges: ["Real experts", "Tailored support"],
    icon: "lucide/users",
    image: {
      src: imagePlaceholders[11],
      alt: "Personal guidance",
    },
  },
  {
    id: "coverage-intelligence",
    title: "Coverage Intelligence",
    description:
      "AI-assisted insights that surface gaps, opportunities, and next steps.",
    eyebrow: "AI Advantage",
    badges: ["Smart reviews", "Growth-ready"],
    icon: "lucide/brain",
    image: {
      src: imagePlaceholders[12],
      alt: "Coverage intelligence",
    },
  },
  {
    id: "network-resources",
    title: "Network Resources",
    description:
      "Partner resources and playbooks shared across the OpenSite AI ecosystem.",
    eyebrow: "Network Strength",
    badges: ["Shared expertise", "Trusted partners"],
    icon: "lucide/network",
    image: {
      src: imagePlaceholders[13],
      alt: "Network resources",
    },
  },
];

/**
 * ServicesListFeatureSpotlight - Alternating image and card layout that
 * highlights key service differentiators with badges and icons. Works well
 * for service pages needing rich storytelling and visual variety.
 */
export function ServicesListFeatureSpotlight({
  heading = "Service advantages built for modern teams",
  subheading = "The OpenSite AI approach",
  features = defaultFeatures,
  className,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServicesListFeatureSpotlightProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {subheading}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            {heading}
          </h2>
        </div>

        <div className="space-y-12">
          {features.map((feature, idx) => {
            const imageFirst = idx % 2 === 0;
            return (
              <motion.div
                key={feature.id}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <div className={imageFirst ? "order-1" : "order-2 lg:order-1"}>
                  <div className="relative overflow-hidden rounded-3xl border border-border/30 shadow-xl">
                    <Img
                      src={feature.image.src}
                      alt={feature.image.alt}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                    <div className="absolute inset-0 bg-linear-to-tr from-foreground/40 via-transparent to-transparent" />
                  </div>
                </div>

                <Card
                  className={cn(
                    "border-border/60 shadow-lg",
                    imageFirst ? "order-2" : "order-1 lg:order-2",
                  )}
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <DynamicIcon name={feature.icon} size={24} />
                      </div>
                      <div>
                        {feature.eyebrow ? (
                          <p className="text-xs uppercase tracking-[0.2em] text-primary">
                            {feature.eyebrow}
                          </p>
                        ) : null}
                        <h3 className="mt-1 text-2xl font-bold text-foreground">
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                    {feature.badges ? (
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-muted/60 px-3 py-1 text-xs text-foreground">
                          {feature.badges[0]}
                        </span>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                          {feature.badges[1]}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
    </Section>
  );
}
