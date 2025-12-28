"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface AboutStoryExpertiseArea {
  /**
   * Icon name for the expertise area
   */
  icon: string;
  /**
   * Expertise title
   */
  title: string;
  /**
   * Supporting description
   */
  description: string;
}

export interface AboutStoryExpertiseProps {
  /**
   * Eyebrow label for the story section
   */
  eyebrow?: string;
  /**
   * Main heading for the story section
   */
  heading?: string;
  /**
   * Story paragraphs displayed in order
   */
  storyParagraphs?: string[];
  /**
   * Primary CTA button config
   */
  primaryCta?: {
    label: string;
    href: string;
  };
  /**
   * Secondary CTA button config
   */
  secondaryCta?: {
    label: string;
    href: string;
  };
  /**
   * Feature image configuration
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Highlight badge content overlaid on the image
   */
  highlight?: {
    icon: string;
    label: string;
    title: string;
    description: string;
  };
  /**
   * Expertise section heading
   */
  expertiseHeading?: string;
  /**
   * Expertise section description
   */
  expertiseDescription?: string;
  /**
   * Expertise area cards
   */
  expertiseAreas?: AboutStoryExpertiseArea[];
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

const defaultStoryParagraphs = [
  "OpenSite AI began with a simple mission: make expert guidance accessible to every client, not just the largest enterprises.",
  "We built a network of independent advisors supported by real-time intelligence, so every recommendation is transparent, timely, and tailored.",
  "Today, OpenSite AI partners deliver proactive reviews, clear communication, and strategic coverage planning for teams of every size.",
];

const defaultExpertiseAreas: AboutStoryExpertiseArea[] = [
  {
    icon: "lucide/shield-check",
    title: "Independent Advocacy",
    description: "Guidance that puts your goals first, not a carrier agenda.",
  },
  {
    icon: "lucide/graduation-cap",
    title: "Client Education",
    description: "Clear explanations that help teams make confident decisions.",
  },
  {
    icon: "lucide/refresh-cw",
    title: "Proactive Reviews",
    description: "Regular check-ins that keep coverage aligned to growth.",
  },
  {
    icon: "lucide/award",
    title: "Network Backed",
    description: "Shared insights and resources from OpenSite AI partners.",
  },
];

/**
 * AboutStoryExpertise - A two-part about section featuring a founder-style story
 * with image overlay, followed by a grid of expertise highlights. Ideal for
 * trust-building pages that need narrative plus proof points.
 */
export function AboutStoryExpertise({
  eyebrow = "Our Story",
  heading = "Built on trust, powered by OpenSite AI",
  storyParagraphs = defaultStoryParagraphs,
  primaryCta = { label: "Learn More", href: "/about" },
  secondaryCta = { label: "Connect With Us", href: "/contact" },
  image = {
    src: imagePlaceholders[7],
    alt: "OpenSite AI team collaboration",
  },
  highlight = {
    icon: "lucide/award",
    label: "Since 2012",
    title: "Trusted by partner teams",
    description: "A decade of advisory excellence and partner growth.",
  },
  expertiseHeading = "Why teams choose OpenSite AI",
  expertiseDescription =
    "Experience, independence, and intelligent tooling combine to deliver better outcomes.",
  expertiseAreas = defaultExpertiseAreas,
  className,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: AboutStoryExpertiseProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="order-2 space-y-6 lg:order-1"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {eyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
                {heading}
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              {storyParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Pressable href={primaryCta.href} size="lg" variant="default">
                {primaryCta.label}
              </Pressable>
              <Pressable href={secondaryCta.href} size="lg" variant="outline">
                {secondaryCta.label}
              </Pressable>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl">
              <Img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute inset-0 bg-linear-to-tr from-foreground/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl border border-border/60 bg-background/90 p-6 shadow-xl">
                  <div className="mb-3 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <DynamicIcon name={highlight.icon} size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {highlight.label}
                      </p>
                      <h3 className="text-lg font-bold text-foreground">
                        {highlight.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 rounded-3xl bg-muted/30 p-8 md:p-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Expertise
            </p>
            <h3 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
              {expertiseHeading}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              {expertiseDescription}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {expertiseAreas.map((area, idx) => (
              <motion.div
                key={`${area.title}-${idx}`}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex items-start gap-4 rounded-2xl bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <DynamicIcon name={area.icon} size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">
                    {area.title}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </Section>
  );
}
