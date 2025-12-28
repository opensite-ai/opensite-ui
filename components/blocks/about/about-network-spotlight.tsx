"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface AboutNetworkSpotlightProps {
  /**
   * Eyebrow label above the heading
   */
  eyebrow?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Highlight bullet list
   */
  highlights?: string[];
  /**
   * Primary CTA config
   */
  primaryCta?: {
    label: string;
    href: string;
  };
  /**
   * Secondary CTA config
   */
  secondaryCta?: {
    label: string;
    href: string;
  };
  /**
   * Spotlight image configuration
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Spotlight card content overlaid on the image
   */
  spotlightCard?: {
    icon: string;
    label: string;
    title: string;
    description: string;
  };
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

const defaultHighlights = [
  "Maintain full independence while accessing shared expertise.",
  "Unlock partner-only resources and specialized carrier access.",
  "Deliver stronger advocacy with OpenSite AI intelligence.",
];

/**
 * AboutNetworkSpotlight - Dark spotlight section with image overlay and CTA.
 * Ideal for partner programs, network invitations, or alliance highlights.
 */
export function AboutNetworkSpotlight({
  eyebrow = "Partner Network",
  heading = "Join the OpenSite AI Partner Network",
  description =
    "A curated community of independent advisors and agencies that share resources, intelligence, and proven coverage playbooks.",
  highlights = defaultHighlights,
  primaryCta = { label: "Learn More", href: "/network" },
  secondaryCta = { label: "Visit OpenSite AI", href: "https://opensite.ai" },
  image = {
    src: imagePlaceholders[24],
    alt: "OpenSite AI partner network spotlight",
  },
  spotlightCard = {
    icon: "lucide/network",
    label: "OpenSite AI Network",
    title: "Built for independent advisors",
    description:
      "A trusted network where agencies collaborate to deliver better outcomes.",
  },
  className,
  background = "dark",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: AboutNetworkSpotlightProps): React.JSX.Element {
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
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute inset-0 bg-linear-to-tr from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl border border-primary/40 bg-black/80 p-5 backdrop-blur-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <DynamicIcon name={spotlightCard.icon} size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        {spotlightCard.label}
                      </p>
                      <h3 className="text-lg font-bold text-white">
                        {spotlightCard.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-white/80">
                    {spotlightCard.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 text-lg text-white/80">{description}</p>
            <ul className="mt-6 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/80">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <DynamicIcon name="lucide/check" size={14} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Pressable href={primaryCta.href} size="lg" variant="default">
                {primaryCta.label}
              </Pressable>
              <Pressable href={secondaryCta.href} size="lg" variant="secondary">
                {secondaryCta.label}
              </Pressable>
            </div>
          </motion.div>
        </div>
    </Section>
  );
}
