"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import {
  cn,
  getNestedCardBg,
  getNestedCardTextColor,
} from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * Avatar configuration for the avatar stack.
 * Used to display user avatars in a stacked layout.
 */
export interface AvatarItem {
  /**
   * Avatar image source URL
   */
  src: string;
  /**
   * Alt text for the avatar
   */
  alt: string;
  /**
   * Additional CSS classes for the avatar
   */
  className?: string;
}

/**
 * A stat with icon, value, label, and optional avatars.
 * Used to display individual metrics in a card group layout.
 */
export interface CardGroupStat {
  /**
   * Icon name in format: prefix/name (e.g., "lucide/users")
   */
  icon?: string;
  /**
   * Custom icon element (overrides icon name)
   */
  iconSlot?: React.ReactNode;
  /**
   * The stat value (e.g., "2,000+", "4.9/5", "99.9%")
   */
  value: React.ReactNode;
  /**
   * The label for the stat
   */
  label: React.ReactNode;
  /**
   * Whether to show avatar stack
   */
  showAvatars?: boolean;
  /**
   * Additional CSS classes for the stat
   */
  className?: string;
}

/**
 * Props for the StatsCardGroup component.
 * A compact stats display featuring metrics in a bordered card with icons and optional avatar stacks.
 */
export interface StatsCardGroupProps {
  /**
   * Array of stats to display
   */
  stats?: CardGroupStat[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Avatar images to display in the stack
   */
  avatars?: AvatarItem[];
  /**
   * Custom slot for rendering avatars (overrides avatars array)
   */
  avatarsSlot?: React.ReactNode;
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
   * Additional CSS classes for the pattern
   */
  patternClassName?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the card wrapper
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the stats grid
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for stat values
   */
  statValueClassName?: string;
  /**
   * Additional CSS classes for stat labels
   */
  statLabelClassName?: string;
  /**
   * Additional CSS classes for stat icons
   */
  statIconClassName?: string;
  /**
   * Additional CSS classes for the avatar stack
   */
  avatarsClassName?: string;
  /**
   * Optional configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * StatsCardGroup - A compact stats display featuring three metrics in a bordered
 * card with icons and optional avatar stacks. Each stat shows an icon, large value,
 * and label. The first stat can include a stacked avatar group to represent users
 * or customers. Ideal for social proof sections, trust indicators, or compact
 * dashboard summaries.
 *
 * @example
 * ```tsx
 * <StatsCardGroup
 *   stats={[
 *     { icon: "lucide/users", value: "2,000+", label: "Happy Customers", showAvatars: true },
 *     { icon: "lucide/star", value: "4.9/5", label: "Average Rating" },
 *   ]}
 * />
 * ```
 */
export function StatsCardGroup({
  sectionId = "stats-card-group",
  stats,
  statsSlot,
  avatars,
  avatarsSlot,
  background,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  cardClassName,
  statsClassName,
  statValueClassName,
  statLabelClassName,
  statIconClassName,
  avatarsClassName,
  optixFlowConfig,
}: StatsCardGroupProps) {
  // Memoized icon rendering
  const renderIcon = useCallback(
    (stat: CardGroupStat) => {
      if (stat.iconSlot) return stat.iconSlot;
      if (!stat.icon) return null;
      return (
        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10",
            statIconClassName,
          )}
        >
          <DynamicIcon name={stat.icon} size={24} className="text-primary" />
        </div>
      );
    },
    [statIconClassName],
  );

  // Memoized avatars rendering
  const renderAvatars = useCallback(
    (stat: CardGroupStat) => {
      if (!stat.showAvatars) return null;
      if (avatarsSlot) return avatarsSlot;
      if (!avatars || avatars.length === 0) return null;

      return (
        <div className={cn("flex -space-x-2", avatarsClassName)}>
          {avatars.slice(0, 4).map((avatar, avatarIndex) => (
            <Img
              key={avatarIndex}
              src={avatar.src}
              alt={avatar.alt}
              className={cn(
                "h-8 w-8 rounded-full border-2 border-background object-cover",
                avatar.className,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          ))}
          {avatars.length > 4 && (
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-xs font-medium",
                getNestedCardBg(background, "muted"),
                getNestedCardTextColor(background),
              )}
            >
              +{avatars.length - 4}
            </div>
          )}
        </div>
      );
    },
    [avatarsSlot, avatars, background, avatarsClassName, optixFlowConfig],
  );

  // Memoized stats rendering
  const statsContent = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <div
        key={index}
        className={cn(
          "flex flex-col items-center text-center",
          index !== stats.length - 1 && "md:border-r md:pr-8",
          stat.className,
        )}
      >
        {renderIcon(stat)}

        <div
          className={cn(
            "mb-2 text-3xl font-bold md:text-4xl",
            statValueClassName,
          )}
        >
          {stat.value}
        </div>

        {stat.label && (
          <div className={cn("mb-4 text-muted-foreground", statLabelClassName)}>
            {stat.label}
          </div>
        )}

        {renderAvatars(stat)}
      </div>
    ));
  }, [
    statsSlot,
    stats,
    statValueClassName,
    statLabelClassName,
    renderIcon,
    renderAvatars,
  ]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        {(statsSlot || (stats && stats.length > 0)) && (
          <div
            className={cn(
              "rounded-xl border p-8",
              getNestedCardBg(background, "card"),
              getNestedCardTextColor(background),
              cardClassName,
            )}
          >
            <div className={cn("grid gap-8 md:grid-cols-3", statsClassName)}>
              {statsContent}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
