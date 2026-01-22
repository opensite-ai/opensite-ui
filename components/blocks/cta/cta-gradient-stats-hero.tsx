"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  StatItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaGradientStatsHeroProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
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
   * Array of stats to display
   */
  stats?: StatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the gradient card wrapper
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the stats grid
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for each stat card
   */
  statCardClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

/**
 * CtaGradientStatsHero - A hero-style CTA with gradient background, heading,
 * description, action buttons, and floating stats cards showing metrics.
 * Perfect for showcasing achievements.
 *
 * @example
 * ```tsx
 * <CtaGradientStatsHero
 *   heading="Scale with confidence"
 *   description="Built for enterprise-grade performance."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "secondary" },
 *     { label: "View Pricing", href: "/pricing", variant: "outline" }
 *   ]}
 *   stats={[
 *     { value: "99.9%", label: "Uptime" },
 *     { value: "10K+", label: "Customers" }
 *   ]}
 * />
 * ```
 */
export function CtaGradientStatsHero({
  heading,
  description,
  actions,
  actionsSlot,
  stats,
  statsSlot,
  className,
  containerClassName,
  cardClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  statsClassName,
  statCardClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: CtaGradientStatsHeroProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "mb-12 flex flex-col justify-center gap-3 sm:flex-row",
          actionsClassName,
        )}
      >
        {actions.map((action, index) => {
          const isFirstAction = index === 0;
          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              size={action.size}
              className={cn(
                !isFirstAction &&
                  "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
                action.className,
              )}
              aria-label={action["aria-label"]}
              asButton
            >
              {action.icon}
              {action.children ?? action.label}
              {action.iconAfter ??
                (isFirstAction && (
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="ml-2"
                  />
                ))}
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div
        className={cn("grid grid-cols-2 gap-4 md:grid-cols-4", statsClassName)}
      >
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={cn(
              "border-primary-foreground/20 bg-primary-foreground/10 p-4 text-center backdrop-blur-sm",
              statCardClassName,
            )}
          >
            {stat.icon && <div className="mb-2">{stat.icon}</div>}
            <div className="text-2xl font-bold text-primary-foreground md:text-3xl">
              {stat.value}
            </div>
            <div className="text-sm text-primary-foreground/80">
              {stat.label}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground md:p-12 lg:p-16",
            cardClassName,
          )}
        >
          <div
            className={cn(
              "relative z-10 mx-auto max-w-3xl text-center",
              contentClassName,
            )}
          >
            <h2
              className={cn(
                "mb-6 text-4xl font-bold md:text-5xl lg:text-6xl",
                headingClassName,
              )}
            >
              {heading}
            </h2>
            <p
              className={cn(
                "mb-8 text-lg opacity-90 md:text-xl",
                descriptionClassName,
              )}
            >
              {description}
            </p>
            {renderActions()}
            {renderStats()}
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>
    </Section>
  );
}
