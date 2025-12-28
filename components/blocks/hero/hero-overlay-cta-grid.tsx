"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroOverlayCtaGridCard {
  /**
   * Card label text
   */
  label: string;
  /**
   * Supporting card text
   */
  subtitle: string;
  /**
   * Icon name for the card
   */
  icon: string;
  /**
   * Optional link destination
   */
  href?: string;
}

export interface HeroOverlayCtaGridProps {
  /**
   * Badge text displayed above the heading
   */
  badgeText?: string;
  /**
   * Icon name for the badge
   */
  badgeIcon?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Primary call-to-action config
   */
  primaryCta?: {
    label: string;
    href: string;
  };
  /**
   * Secondary call-to-action config
   */
  secondaryCta?: {
    label: string;
    href: string;
  };
  /**
   * CTA cards displayed beneath the hero copy
   */
  cards?: HeroOverlayCtaGridCard[];
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

const defaultCards: HeroOverlayCtaGridCard[] = [
  {
    label: "Personal Coverage",
    subtitle: "Tailored protection for families, homes, and vehicles.",
    href: "/personal-coverage",
    icon: "lucide/user",
  },
  {
    label: "Event Protection",
    subtitle: "Flexible coverage for special events and gatherings.",
    href: "/event-coverage",
    icon: "lucide/ticket-check",
  },
  {
    label: "Commercial Coverage",
    subtitle: "Business-ready policies backed by OpenSite AI insights.",
    href: "/business-coverage",
    icon: "lucide/briefcase",
  },
];

/**
 * HeroOverlayCtaGrid - A hero layout with background image overlay, headline, dual CTAs,
 * and a supporting grid of icon cards. Ideal for service-focused landing pages that
 * need a strong hero statement plus quick navigation to top offerings.
 */
export function HeroOverlayCtaGrid({
  badgeText = "OpenSite AI Certified Advisors",
  badgeIcon = "lucide/shield-check",
  heading = "Coverage guidance powered by OpenSite AI",
  description = "Independent advisors backed by OpenSite AI insights help you secure the right coverage with clarity, speed, and confidence.",
  primaryCta = { label: "Get a Free Quote", href: "/quote" },
  secondaryCta = { label: "Explore Coverage", href: "/coverage" },
  cards = defaultCards,
  backgroundImage = imagePlaceholders[0],
  backgroundAlt = "OpenSite AI coverage advisory hero background",
  className,
  optixFlowConfig,
}: HeroOverlayCtaGridProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "relative flex min-h-dvh items-center overflow-hidden bg-background pb-20 pt-32 md:pt-36",
        className,
      )}
    >
      <div className="absolute inset-0">
        <Img
          src={backgroundImage}
          alt={backgroundAlt}
          className="h-full w-full object-cover"
          loading="eager"
          optixFlowConfig={optixFlowConfig}
        />
        <div className="absolute inset-0 bg-linear-to-r from-foreground/80 via-foreground/65 to-foreground/20" />
      </div>

      <div className="container relative flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center text-balance text-white"
        >
          {badgeText ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em]">
              {badgeIcon ? <DynamicIcon name={badgeIcon} size={18} /> : null}
              {badgeText}
            </div>
          ) : null}
          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="mt-5 text-lg text-white/80 md:text-xl">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Pressable href={primaryCta.href} size="lg" variant="default">
              {primaryCta.label}
            </Pressable>
            <Pressable href={secondaryCta.href} size="lg" variant="secondary">
              {secondaryCta.label}
            </Pressable>
          </div>
        </motion.div>

        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-background/95 shadow-2xl">
          <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {cards.map((card) => (
              <Pressable
                key={card.label}
                href={card.href}
                className="group flex items-center gap-4 px-6 py-6 transition-colors hover:bg-primary/5"
              >
                <div className="relative flex h-12 w-12 flex-none items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <DynamicIcon name={card.icon} size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-foreground">
                    {card.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {card.subtitle}
                  </p>
                </div>
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={18}
                  className="ml-auto flex-none text-primary"
                />
              </Pressable>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
