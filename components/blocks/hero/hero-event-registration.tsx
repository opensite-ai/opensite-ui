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

export interface DirectionConfig {
  desktop: "mediaRight" | "mediaLeft";
  mobile: "mediaTop" | "mediaBottom";
}

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
  /**
   * Logo image configuration
   */
  logo?: {
    src: string;
    alt: string;
  };
  /**
   * Direction configuration for desktop and mobile layouts
   * @default { desktop: 'mediaRight', mobile: 'mediaTop' }
   */
  directionConfig?: DirectionConfig;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroEventRegistration({
  sectionId = "hero-event-registration",
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
  containerClassName = "mx-auto w-full max-w-full md:max-w-7xl relative z-10 px-6",
  spacing = "py-16 md:py-40",
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
  logo,
  directionConfig = { desktop: "mediaRight", mobile: "mediaTop" },
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
      <div
        className={cn(
          "bg-card text-card-foreground",
          "rounded-2xl p-2 md:p-4 shadow-lg",
          "absolute bottom-0 translate-y-1/2",
          "left-1/2 -translate-x-1/2 w-[90%]",
          "md:-left-4 md:translate-x-0 md:w-auto",
          "ring-4 ring-primary",
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center shrink-0",
              "size-12 rounded-xl bg-primary text-primary-foreground",
            )}
          >
            <DynamicIcon name="lucide/map-pin" size={24} />
          </div>
          <div
            className={cn(
              "flex flex-col items-start justify-center",
              "text-card-foreground gap-0 pr-0 md:pr-2",
            )}
          >
            {locationLabel &&
              (typeof locationLabel === "string" ? (
                <div className="text-sm md:text-base text-balance leading-tight md:leading-normal tracking-tighter md:tracking-normal font-semibold">
                  {locationLabel}
                </div>
              ) : (
                locationLabel
              ))}
            {locationSublabel &&
              (typeof locationSublabel === "string" ? (
                <div
                  className={cn(
                    "text-xs md:text-sm text-balance leading-tight md:leading-normal tracking-tighter md:tracking-normal",
                  )}
                >
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
      <div className="relative w-full md:w-[50%]">
        <div
          className={cn(
            "overflow-hidden rounded-2xl shadow-xl ring-4 ring-primary",
            imageClassName,
          )}
        >
          <Img
            src={image.src}
            alt={image.alt}
            className={cn("aspect-square w-full object-cover", image.className)}
            optixFlowConfig={optixFlowConfig}
          />
        </div>
        {renderLocation}
      </div>
    );
  }, [imageSlot, image, imageClassName, optixFlowConfig, renderLocation]);

  // Determine flex direction based on directionConfig
  const desktopOrder =
    directionConfig.desktop === "mediaRight"
      ? "md:flex-row"
      : "md:flex-row-reverse";
  const mobileOrder =
    directionConfig.mobile === "mediaTop" ? "flex-col-reverse" : "flex-col";

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
      <div className="pt-8 md:pt-0">
        <div
          className={cn(
            "flex items-center justify-start md:justify-between",
            mobileOrder,
            desktopOrder,
            directionConfig.mobile === "mediaTop" ? "gap-20" : "gap-12",
            "md:gap-24",
          )}
        >
          <div
            className={cn(
              "flex flex-col items-start gap-2 md:gap-4 w-full md:w-[50%]",
              contentClassName,
            )}
          >
            {renderBadge}
            {logo && (
              <Img
                src={logo.src}
                alt={logo.alt}
                className="w-auto max-w-full h-12 md:h-14 object-contain my-4"
                optixFlowConfig={optixFlowConfig}
              />
            )}
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
              actionsClassName={cn("w-full md:w-fit", actionsClassName)}
            />
            {renderStats}
          </div>
          {renderImage}
        </div>
      </div>
    </Section>
  );
}
