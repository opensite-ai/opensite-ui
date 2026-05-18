"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  StatItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { Badge } from "@/src";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

export interface HeroMinimalCenteredDarkProps {
  /**
   * Badge/status indicator content
   */
  badge?: React.ReactNode;
  /**
   * Show animated status dot
   */
  showStatusDot?: boolean;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Highlighted text within heading (gradient styled)
   */
  headingHighlight?: string;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of stat/trust indicators
   */
  stats?: StatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode; /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;

  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroMinimalCenteredDark({
  sectionId = "hero-minimal-centered-dark",
  badge,
  heading,
  headingHighlight,
  description,
  actions,
  actionsSlot,
  stats,
  statsSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  statsClassName,
  logo,
  logoSlot,
  logoClassName,
}: HeroMinimalCenteredDarkProps): React.JSX.Element {
  const renderStats = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <div
        key={index}
        className={cn("flex items-center gap-2", stat.className)}
      >
        {stat.icon}
        <span>{stat.value}</span>
      </div>
    ));
  }, [statsSlot, stats]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        {badge && (
          <Badge className={cn("px-4 py-1", badgeClassName)}>
            {typeof badge === "string" ? <span>{badge}</span> : badge}
          </Badge>
        )}
        {(logo || logoSlot) && (
          <div className={cn("mb-4 flex justify-center", logoClassName)}>
            <BrandLogo logo={logo} logoSlot={logoSlot} size="xl" />
          </div>
        )}
        {(heading || headingHighlight) &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "mt-8 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl text-balance",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : heading ? (
            <div className={headingClassName}>{heading}</div>
          ) : headingHighlight ? (
            <h1
              className={cn(
                "mt-8 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl text-balance",
                headingClassName,
              )}
            >
              {headingHighlight}
            </h1>
          ) : null)}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "mt-6 max-w-2xl text-lg md:text-xl text-balance",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          ))}
        <BlockActions
          actions={actions}
          actionsSlot={actionsSlot}
          actionsClassName={actionsClassName}
        />
        {(statsSlot || (stats && stats.length > 0)) && (
          <div
            className={cn(
              "mt-16 flex items-center gap-8 text-sm",
              statsClassName,
            )}
          >
            {renderStats}
          </div>
        )}
      </div>
    </Section>
  );
}
