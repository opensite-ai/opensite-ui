"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Container } from "../../ui/container";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type {
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

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
  badgeText?: React.ReactNode;
  /**
   * Icon name for the badge
   */
  badgeIcon?: string;
  /**
   * Custom slot for badge (overrides badge props)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Supporting description text
   */
  description?: React.ReactNode;
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
   * Custom slot for actions (overrides primaryCta and secondaryCta)
   */
  actionsSlot?: React.ReactNode;
  /**
   * CTA cards displayed beneath the hero copy
   */
  cards?: HeroOverlayCtaGridCard[];
  /**
   * Custom slot for cards (overrides cards array)
   */
  cardsSlot?: React.ReactNode;
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Background image alt text
   */
  backgroundAlt?: string;
  /**
   * Custom slot for background (overrides backgroundImage)
   */
  backgroundSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * HeroOverlayCtaGrid - A hero layout with background image overlay, headline, dual CTAs,
 * and a supporting grid of icon cards. Ideal for service-focused landing pages that
 * need a strong hero statement plus quick navigation to top offerings.
 */
export function HeroOverlayCtaGrid({
  badgeText,
  badgeIcon,
  badgeSlot,
  heading,
  description,
  primaryCta,
  secondaryCta,
  actionsSlot,
  cards,
  cardsSlot,
  backgroundImage,
  backgroundAlt = "OpenSite AI coverage advisory hero background",
  backgroundSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroOverlayCtaGridProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badgeText) return null;

    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/15 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em]">
        {badgeIcon ? <DynamicIcon name={badgeIcon} size={18} /> : null}
        {badgeText}
      </div>
    );
  }, [badgeSlot, badgeText, badgeIcon]);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!primaryCta && !secondaryCta) return null;

    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {primaryCta && (
          <Pressable href={primaryCta.href} size="lg" variant="default">
            {primaryCta.label}
          </Pressable>
        )}
        {secondaryCta && (
          <Pressable href={secondaryCta.href} size="lg" variant="secondary">
            {secondaryCta.label}
          </Pressable>
        )}
      </div>
    );
  }, [actionsSlot, primaryCta, secondaryCta]);

  const renderCards = useMemo(() => {
    if (cardsSlot) return cardsSlot;
    if (!cards || cards.length === 0) return null;

    return (
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
                <p className="text-base font-semibold ">
                  {card.label}
                </p>
                <p className="text-sm text-muted-foreground">{card.subtitle}</p>
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
    );
  }, [cardsSlot, cards]);

  const renderBackground = useMemo(() => {
    if (backgroundSlot) return backgroundSlot;

    return (
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
    );
  }, [backgroundSlot, backgroundImage, backgroundAlt, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(
        "relative flex min-h-dvh items-center justify-center overflow-hidden bg-background pb-20 pt-32 md:pt-36",
        className
      )}
    >
      {renderBackground}

      <Container
        className={cn("relative flex flex-col gap-12", containerClassName)}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center text-balance text-background"
        >
          {renderBadge}
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl",
                  headingClassName
                )}
              >
                {heading}
              </h1>
            ) : (
              <h1
                className={cn(
                  "mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl",
                  headingClassName
                )}
              >
                {heading}
              </h1>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mt-5 text-lg text-background/80 md:text-xl",
                  descriptionClassName
                )}
              >
                {description}
              </p>
            ) : (
              <div
                className={cn(
                  "mt-5 text-lg text-background/80 md:text-xl",
                  descriptionClassName
                )}
              >
                {description}
              </div>
            ))}
          {renderActions}
        </motion.div>

        {renderCards}
      </Container>
    </Section>
  );
}
