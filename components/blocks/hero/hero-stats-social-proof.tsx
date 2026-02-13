"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import type {
  ActionConfig,
  StatItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { Badge } from "@/src";
import { BlockActions } from "@/components/ui/block-actions";

export interface HeroStatsSocialProofProps {
  /**
   * Badge/status indicator content
   */
  badge?: React.ReactNode;
  /**
   * Badge icon
   */
  badgeIcon?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
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
   * Array of stat items to display
   */
  stats?: StatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Hero image source URL
   */
  imageSrc?: string;
  /**
   * Hero image alt text
   */
  imageAlt?: string;
  /**
   * Status card content
   */
  statusCard?: {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    icon?: React.ReactNode;
  };
  /**
   * Custom slot for status card (overrides statusCard)
   */
  statusCardSlot?: React.ReactNode; /**
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
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
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
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroStatsSocialProof({
  badge,
  badgeIcon,
  heading,
  description,
  actions,
  actionsSlot,
  stats,
  statsSlot,
  imageSrc,
  imageAlt,
  statusCard,
  statusCardSlot,
  background,
  pattern,
  patternOpacity,
  className,
  spacing = "pt-28 pb-8 md:pt-32 md:pb-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  statsClassName,
  imageClassName,
  optixFlowConfig,
}: HeroStatsSocialProofProps): React.JSX.Element {
  const renderStats = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <div key={index} className={stat.className}>
        <div className="text-3xl font-bold ">{stat.value}</div>
        {stat.label && <div className="text-sm">{stat.label}</div>}
      </div>
    ));
  }, [statsSlot, stats]);

  const renderStatusCard = useMemo(() => {
    if (statusCardSlot) return statusCardSlot;
    if (!statusCard) return null;

    return (
      <div
        className={cn(
          "absolute bottom-4 md:-bottom-6 left-4 right-4",
          "md:right-auto md:-left-6 rounded-2xl max-w-md py-4 pl-4",
          "pr-4 md:pr-6 shadow-2xl bg-card text-card-foreground",
        )}
      >
        <div className="flex items-center gap-3">
          {statusCard.icon && (
            <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              {statusCard.icon}
            </div>
          )}
          <div className="text-balance">
            {statusCard.title && (
              <div className="font-semibold text-sm md:text-md leading-snug">
                {statusCard.title}
              </div>
            )}
            {statusCard.subtitle && (
              <div className="text-sm leading-snug tracking-tight">
                {statusCard.subtitle}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }, [statusCardSlot, statusCard]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex flex-col gap-8", contentClassName)}>
            {badge && (
              <Badge className={cn("px-4 py-2", badgeClassName)}>
                {badgeIcon}
                {typeof badge === "string" ? <span>{badge}</span> : badge}
              </Badge>
            )}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p className={cn("text-lg text-balance", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}

            <BlockActions
              actions={actions}
              actionsClassName={actionsClassName}
              actionsSlot={actionsSlot}
              mobileConfig={{ position: "left", width: "fit" }}
            />

            {(statsSlot || (stats && stats.length > 0)) && (
              <div
                className={cn(
                  "flex flex-wrap gap-4 md:gap-8 lg:gap-12 pt-8",
                  statsClassName,
                )}
              >
                {renderStats}
              </div>
            )}
          </div>
          <div className="relative">
            {imageSrc && (
              <div
                className={cn(
                  "aspect-square overflow-hidden rounded-2xl shadow-2xl",
                  imageClassName,
                )}
              >
                <Img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {renderStatusCard}
          </div>
        </div>
      </div>
    </Section>
  );
}
