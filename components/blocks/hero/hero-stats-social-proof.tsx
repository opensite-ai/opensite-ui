"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type {ActionConfig, StatItem, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

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
  statusCardSlot?: React.ReactNode;  /**
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
  imageAlt = "Platform dashboard",
  statusCard,
  statusCardSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  statsClassName,
  imageClassName,
  optixFlowConfig,
}: HeroStatsSocialProofProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={actionClassName}
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      );
    });
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <div key={index} className={stat.className}>
        <div className="text-3xl font-bold text-foreground">{stat.value}</div>
        {stat.label && <div className="text-sm text-muted-foreground">{stat.label}</div>}
      </div>
    ));
  };

  const renderStatusCard = () => {
    if (statusCardSlot) return statusCardSlot;
    if (!statusCard) return null;

    return (
      <div className="absolute -bottom-6 -left-6 rounded-xl bg-background p-4 shadow-lg">
        <div className="flex items-center gap-3">
          {statusCard.icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
              {statusCard.icon}
            </div>
          )}
          <div>
            {statusCard.title && <div className="font-semibold text-foreground">{statusCard.title}</div>}
            {statusCard.subtitle && <div className="text-sm text-muted-foreground">{statusCard.subtitle}</div>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex flex-col gap-8", contentClassName)}>
            {badge && (
              <div className={cn("inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary", badgeClassName)}>
                {badgeIcon}
                {typeof badge === "string" ? <span>{badge}</span> : badge}
              </div>
            )}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-lg text-muted-foreground", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {(actionsSlot || (actions && actions.length > 0)) && (
              <div className={cn("flex flex-col gap-4 sm:flex-row", actionsClassName)}>
                {renderActions()}
              </div>
            )}
            {(statsSlot || (stats && stats.length > 0)) && (
              <div className={cn("grid grid-cols-3 gap-8 pt-8 border-t border-border", statsClassName)}>
                {renderStats()}
              </div>
            )}
          </div>
          <div className="relative">
            {imageSrc && (
              <div className={cn("aspect-square overflow-hidden rounded-2xl bg-muted", imageClassName)}>
                <Img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {renderStatusCard()}
          </div>
        </div>
      </div>
    </Section>
  );
}
