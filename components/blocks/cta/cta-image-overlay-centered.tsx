"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CtaImageOverlayCenteredProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Supporting description text
   */
  description?: string;
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
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Background image alt text
   */
  backgroundAlt?: string;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * CtaImageOverlayCentered - Full-width CTA banner with background image,
 * dark overlay, and centered text/CTAs. Best for final conversion sections.
 */
export function CtaImageOverlayCentered({
  heading = "Ready to unlock OpenSite AI coverage insights?",
  description = "Connect with an advisor to tailor a plan that protects what matters most today and scales for tomorrow.",
  primaryCta = { label: "Get a Free Quote", href: "/quote" },
  secondaryCta = { label: "Talk to an Advisor", href: "/contact" },
  backgroundImage = imagePlaceholders[20],
  backgroundAlt = "OpenSite AI call to action background",
  className,
  optixFlowConfig,
}: CtaImageOverlayCenteredProps): React.JSX.Element {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-border/50">
          <Img
            src={backgroundImage}
            alt={backgroundAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 bg-linear-to-r from-foreground/90 via-foreground/80 to-foreground/90" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="relative px-6 py-16 text-center text-white md:px-10"
          >
            <h2 className="text-3xl font-bold md:text-5xl">{heading}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              {description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Pressable href={primaryCta.href} size="lg" variant="default">
                {primaryCta.label}
              </Pressable>
              <Pressable href={secondaryCta.href} size="lg" variant="ghost">
                {secondaryCta.label}
              </Pressable>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
