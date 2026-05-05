"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";
import { ActionConfig } from "@page-speed/maps/components/geo-map";

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
   * Array of action configurations
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
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
   * Additional CSS classes for the content
   */
  contentClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

function CardArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/**
 * HeroOverlayCtaGrid - A hero layout with background image overlay, headline, dual CTAs,
 * and a supporting grid of icon cards. Ideal for service-focused landing pages that
 * need a strong hero statement plus quick navigation to top offerings.
 */
export function HeroOverlayCtaGrid({
  sectionId = "hero-overlay-cta-grid",
  badgeText,
  badgeIcon,
  badgeSlot,
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  cards,
  cardsSlot,
  backgroundImage,
  backgroundAlt,
  backgroundSlot,
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-0 sm:px-0 lg:px-0 max-w-full relative z-10 h-screen w-screen flex justify-center items-center",
  contentClassName = "relative flex flex-col gap-12 px-6 pt-28 pb-6 md:pt-0 md:pb-0",
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroOverlayCtaGridProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badgeText) return null;

    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary text-primary-foreground px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em]">
        {badgeIcon ? <DynamicIcon name={badgeIcon} size={18} /> : null}
        {badgeText}
      </div>
    );
  }, [badgeSlot, badgeText, badgeIcon]);

  const renderCards = useMemo(() => {
    if (cardsSlot) return cardsSlot;
    if (!cards || cards.length === 0) return null;

    return (
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl px-0">
        <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {cards.map((card) => (
            <Pressable
              key={card.label}
              href={card.href}
              className="group flex items-center gap-4 px-6 py-6 transition-colors"
            >
              {card.icon ? (
                <div
                  className={cn(
                    "relative flex h-12 w-12 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground",
                  )}
                >
                  <DynamicIcon name={card.icon} size={22} />
                </div>
              ) : null}
              <div className="min-w-0">
                <p className="text-base font-semibold text-card-foreground">
                  {card.label}
                </p>
                <p className={cn("text-sm text-card-foreground")}>
                  {card.subtitle}
                </p>
              </div>
              {card.href ? (
                <DynamicIcon
                  name={
                    <CardArrowIcon className="ml-auto size-[18px] flex-none text-card-foreground" />
                  }
                />
              ) : null}
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
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/65 to-black/20" />
      </div>
    );
  }, [backgroundSlot, backgroundImage, backgroundAlt, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(
        "relative flex h-full min-h-screen w-screen items-center justify-center overflow-hidden bg-black pb-0 pt-0 md:pt-0 px-0",
        className,
      )}
      containerClassName={containerClassName}
    >
      {renderBackground}

      <div className={contentClassName}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center text-balance text-white px-0 flex flex-col items-center justify-center"
        >
          {renderBadge}
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              heading
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mt-5 text-lg md:text-xl text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}

          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </motion.div>

        {renderCards}
      </div>
    </Section>
  );
}
