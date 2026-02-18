"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import type {
  ActionConfig,
  ImageItem,
  StatItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";

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
  locationSlot?: React.ReactNode; /**
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
  containerClassName = "px-6 sm:px-0 md:px-0 lg:px-0",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
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
      <Badge className="px-4 py-1 gap-2">
        {badgeIcon && <DynamicIcon name={badgeIcon} size={18} />}
        {badgeText}
      </Badge>
    );
  }, [badgeSlot, badgeIcon, badgeText]);

  const renderStats = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col md:flex-row items-center gap-4 md:gap-6 pt-8 md:pt-12 w-full md:w-fit",
          statsClassName,
        )}
      >
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className="h-12 w-px bg-border hidden md:flex"></div>
            )}
            <div className="flex items-center gap-2 justify-between flex-row md:flex-col text-left md:text-center w-full md:w-fit border md:border-none rounded-xl md:rounded-none p-4 md:p-0">
              <div
                className={cn(
                  "flex items-center gap-2 w-fit md:w-full",
                  stat.icon ? "justify-between" : "justify-center",
                )}
              >
                {stat.icon}
                <div
                  className={cn(
                    "font-bold ",
                    stat.icon ? "text-xl" : "text-2xl",
                  )}
                >
                  {stat.value}
                </div>
              </div>
              <div className={cn("text-sm")}>{stat.label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }, [statsSlot, stats, statsClassName]);

  const renderLocation = useMemo(() => {
    if (locationSlot) return locationSlot;
    if (!locationLabel && !locationSublabel) return null;

    return (
      <div className="absolute -bottom-4 -left-4 rounded-xl bg-card text-card-foreground p-4 shadow-lg ring-4 ring-primary">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full text-card-foreground",
            )}
          >
            <DynamicIcon name="lucide/map-pin" size={24} />
          </div>
          <div>
            {locationLabel &&
              (typeof locationLabel === "string" ? (
                <div className="font-semibold text-card-foreground">
                  {locationLabel}
                </div>
              ) : (
                locationLabel
              ))}
            {locationSublabel &&
              (typeof locationSublabel === "string" ? (
                <div className={cn("text-sm text-card-foreground")}>
                  {locationSublabel}
                </div>
              ) : (
                locationSublabel
              ))}
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
      containerClassName={containerClassName}
    >
      <div className="pt-8 md:pt-0">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div
            className={cn(
              "flex flex-col items-start gap-4 md:gap-6",
              contentClassName,
            )}
          >
            {renderBadge}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-pretty",
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
                <p className={cn("text-lg text-balance", descriptionClassName)}>
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
            {renderStats}
          </div>
          {renderImage}
        </div>
      </div>
    </Section>
  );
}
