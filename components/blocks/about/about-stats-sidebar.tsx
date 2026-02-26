"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  FeatureItem,
  StatItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

interface ExtendedStatItem extends StatItem {
  description?: React.ReactNode;
}

export interface AboutStatsSidebarProps {
  /**
   * Main heading/title
   */
  title?: React.ReactNode;
  /**
   * Main description text
   */
  description?: React.ReactNode;
  /**
   * Array of stat configurations
   */
  stats?: ExtendedStatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Array of feature configurations
   */
  features?: FeatureItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for the features container
   */
  featuresClassName?: string;
  /**
   * Section background variant
   */
  background?: SectionBackground;
  /**
   * Section spacing variant
   */
  spacing?: SectionSpacing;
  /**
   * Pattern background key or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
}

export function AboutStatsSidebar({
  title,
  description,
  stats,
  statsSlot,
  features,
  featuresSlot,
  className,
  sidebarClassName,
  titleClassName,
  descriptionClassName,
  statsClassName,
  featuresClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
}: AboutStatsSidebarProps): React.JSX.Element {
  const statsContent = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2",
          statsClassName,
        )}
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={cn(
              "p-6 flex flex-col items-between gap-12",
              "bg-card text-card-foreground",
              "rounded-xl ring-2",
            )}
          >
            {stat.icon}
            <div className="flex flex-col items-start gap-0">
              {typeof stat.value === "string" ? (
                <h3 className="mb-2 text-3xl md:text-4xl font-bold">
                  {stat.value}
                </h3>
              ) : (
                stat.value
              )}
              {typeof stat.label === "string" ? (
                <p className="font-semibold">{stat.label}</p>
              ) : (
                stat.label
              )}
              {stat.description &&
                (typeof stat.description === "string" ? (
                  <p className={cn("text-sm opacity-75")}>{stat.description}</p>
                ) : (
                  stat.description
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }, [statsSlot, stats, statsClassName]);

  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-8 space-y-6 p-6 bg-card text-card-foreground rounded-xl shadow-xl",
          featuresClassName,
        )}
      >
        {features.map((feature, idx) => (
          <div key={idx} className="flex gap-4">
            <div
              className={cn(
                "flex size-12 shrink-0 items-center justify-center",
                "bg-primary text-primary-foreground",
                "shadow-lg rounded-lg",
                feature.iconBgClass,
              )}
            >
              {feature.icon}
            </div>
            <div>
              {feature.title &&
                (typeof feature.title === "string" ? (
                  <h3 className="font-semibold">{feature.title}</h3>
                ) : (
                  feature.title
                ))}
              {feature.description &&
                (typeof feature.description === "string" ? (
                  <p className="opacity-75">{feature.description}</p>
                ) : (
                  feature.description
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }, [featuresSlot, features, featuresClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(pattern && "overflow-visible", className)}
      containerClassName={containerClassName}
    >
      <div className="grid gap-12 lg:grid-cols-3">
        <div
          className={cn("lg:sticky lg:top-24 lg:self-start", sidebarClassName)}
        >
          {title &&
            (typeof title === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight md:text-4xl",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            ) : (
              <div className={titleClassName}>{title}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("mt-4 text-lg", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={cn("mt-4", descriptionClassName)}>
                {description}
              </div>
            ))}
        </div>

        <div className="lg:col-span-2">
          {(statsSlot || (stats && stats.length > 0)) && statsContent}
          {(featuresSlot || (features && features.length > 0)) &&
            featuresContent}
        </div>
      </div>
    </Section>
  );
}
