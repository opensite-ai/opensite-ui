"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import type {ActionConfig, ImageItem, StatItem, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface HeroEventRegistrationProps {
  /**
   * Badge text content (e.g., event date)
   */
  badgeText?: React.ReactNode;
  /**
   * Badge icon name
   */
  badgeIcon?: string;
  /**
   * Custom slot for badge (overrides badge props)
   */
  badgeSlot?: React.ReactNode;
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
   * Array of stat items
   */
  stats?: StatItem[];
  /**
   * Custom slot for stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Event image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
   */
  imageSlot?: React.ReactNode;
  /**
   * Location label content
   */
  locationLabel?: React.ReactNode;
  /**
   * Location sublabel content
   */
  locationSublabel?: React.ReactNode;
  /**
   * Custom slot for location card (overrides location props)
   */
  locationSlot?: React.ReactNode;  /**
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

export function HeroEventRegistration({
  badgeText,
  badgeIcon,
  badgeSlot,
  heading,
  description,
  actions,
  actionsSlot,
  stats,
  statsSlot,
  image,
  imageSlot,
  locationLabel,
  locationSublabel,
  locationSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  statsClassName,
  imageClassName,
  optixFlowConfig,
}: HeroEventRegistrationProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;

    return (
      <Badge variant="outline" className="w-fit">
        {badgeIcon && <DynamicIcon name={badgeIcon} size={14} className="mr-1" />}
        {badgeText}
      </Badge>
    );
  }, [badgeSlot, badgeIcon, badgeText]);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-col gap-4 sm:flex-row", actionsClassName)}>
        {actions.map((action, index) => {
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
        })}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  const renderStats = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className={cn("grid grid-cols-3 gap-4 pt-4", statsClassName)}>
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold ">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  }, [statsSlot, stats, statsClassName]);

  const renderLocation = useMemo(() => {
    if (locationSlot) return locationSlot;
    if (!locationLabel && !locationSublabel) return null;

    return (
      <div className="absolute -bottom-4 -left-4 rounded-xl bg-background p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <DynamicIcon
              name="lucide/map-pin"
              size={24}
              className="text-primary"
            />
          </div>
          <div>
            {locationLabel && (
              typeof locationLabel === "string" ? (
                <div className="font-semibold ">{locationLabel}</div>
              ) : (
                locationLabel
              )
            )}
            {locationSublabel && (
              typeof locationSublabel === "string" ? (
                <div className="text-sm text-muted-foreground">{locationSublabel}</div>
              ) : (
                locationSublabel
              )
            )}
          </div>
        </div>
      </div>
    );
  }, [locationSlot, locationLabel, locationSublabel]);

  const renderImage = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div className="relative">
        <div className={cn("overflow-hidden rounded-2xl", imageClassName)}>
          <Img
            src={image.src}
            alt={image.alt}
            className={cn("aspect-4/3 w-full object-cover", image.className)}
            optixFlowConfig={optixFlowConfig}
          />
        </div>
        {renderLocation}
      </div>
    );
  }, [imageSlot, image, imageClassName, optixFlowConfig, renderLocation]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex flex-col gap-8", contentClassName)}>
            {renderBadge}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
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
            {renderActions}
            {renderStats}
          </div>
          {renderImage}
        </div>
      </div>
    </Section>
  );
}
