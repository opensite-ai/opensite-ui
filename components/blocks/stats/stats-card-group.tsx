"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
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
 * Avatar configuration for the avatar stack
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
 * A stat with icon, value, label, and optional avatars
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
 * Props for the StatsCardGroup component
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
  stats,
  statsSlot,
  avatars,
  avatarsSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  cardClassName,
  statsClassName,
  statValueClassName,
  statLabelClassName,
  statIconClassName,
  avatarsClassName,
  optixFlowConfig,
}: StatsCardGroupProps) {
  const renderIcon = (stat: CardGroupStat) => {
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
  };

  const renderAvatars = (stat: CardGroupStat) => {
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
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
            +{avatars.length - 4}
          </div>
        )}
      </div>
    );
  };

  const renderStats = () => {
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

        <div className={cn("mb-4 text-muted-foreground", statLabelClassName)}>
          {stat.label}
        </div>

        {renderAvatars(stat)}
      </div>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("mx-auto max-w-4xl", containerClassName)}>
        <div className={cn("rounded-xl border bg-card p-8", cardClassName)}>
          <div className={cn("grid gap-8 md:grid-cols-3", statsClassName)}>
            {renderStats()}
          </div>
        </div>
      </div>
    </Section>
  );
}
