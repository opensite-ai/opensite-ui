"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

/**
 * A stat with icon, value, label, and optional avatars
 */
export interface CardGroupStat {
  /**
   * Icon name in format: prefix/name (e.g., "lucide/users")
   */
  icon: string;
  /**
   * The stat value (e.g., "2,000+", "4.9/5", "99.9%")
   */
  value: string;
  /**
   * The label for the stat
   */
  label: string;
  /**
   * Whether to show avatar stack
   */
  showAvatars?: boolean;
}

/**
 * Props for the StatsCardGroup component
 */
export interface StatsCardGroupProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Array of stats to display
   */
  stats?: CardGroupStat[];
  /**
   * Avatar images to display in the stack
   */
  avatars?: Array<{
    src: string;
    alt: string;
  }>;
  /**
   * Optional configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultStats: CardGroupStat[] = [
  {
    icon: "lucide/users",
    value: "2,000+",
    label: "Happy Customers",
    showAvatars: true,
  },
  {
    icon: "lucide/star",
    value: "4.9/5",
    label: "Average Rating",
    showAvatars: false,
  },
  {
    icon: "lucide/shield-check",
    value: "99.9%",
    label: "Uptime Guarantee",
    showAvatars: false,
  },
];

const defaultAvatars = [
  { src: imagePlaceholders[0], alt: "Customer 1" },
  { src: imagePlaceholders[1], alt: "Customer 2" },
  { src: imagePlaceholders[2], alt: "Customer 3" },
  { src: imagePlaceholders[3], alt: "Customer 4" },
];

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
  className,
  stats = defaultStats,
  avatars = defaultAvatars,
  optixFlowConfig,
}: StatsCardGroupProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]",
        className
      )}
    >
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl border bg-card p-8">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center text-center",
                  index !== stats.length - 1 && "md:border-r md:pr-8"
                )}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <DynamicIcon
                    name={stat.icon}
                    size={24}
                    className="text-primary"
                  />
                </div>

                <div className="mb-2 text-3xl font-bold md:text-4xl">
                  {stat.value}
                </div>

                <div className="mb-4 text-muted-foreground">{stat.label}</div>

                {stat.showAvatars && avatars.length > 0 && (
                  <div className="flex -space-x-2">
                    {avatars.slice(0, 4).map((avatar, avatarIndex) => (
                      <Img
                        key={avatarIndex}
                        src={avatar.src}
                        alt={avatar.alt}
                        className="h-8 w-8 rounded-full border-2 border-background object-cover"
                        optixFlowConfig={optixFlowConfig}
                      />
                    ))}
                    {avatars.length > 4 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                        +{avatars.length - 4}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
