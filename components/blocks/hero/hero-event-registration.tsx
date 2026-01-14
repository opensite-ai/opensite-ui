"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, StatItem, OptixFlowConfig } from "../../../src/types";

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
   * Location label (e.g., city)
   */
  locationLabel?: React.ReactNode;
  /**
   * Location sublabel (e.g., venue name)
   */
  locationSublabel?: React.ReactNode;
  /**
   * Custom slot for location card (overrides location props)
   */
  locationSlot?: React.ReactNode;
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
  badgeText = "March 15-17, 2025",
  badgeIcon = "lucide/calendar",
  badgeSlot,
  heading = "The Future of Tech Conference 2025",
  description = "Join 5,000+ developers, designers, and entrepreneurs for three days of inspiring talks, hands-on workshops, and networking opportunities.",
  actions,
  actionsSlot,
  stats,
  statsSlot,
  image,
  imageSlot,
  locationLabel = "San Francisco, CA",
  locationSublabel = "Moscone Center",
  locationSlot,
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
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;

    return (
      <Badge variant="outline" className="w-fit">
        <DynamicIcon name={badgeIcon} size={14} className="mr-1" />
        {badgeText}
      </Badge>
    );
  };

  const renderActions = () => {
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
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className={cn("grid grid-cols-3 gap-4 pt-4", statsClassName)}>
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderImage = () => {
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
        {renderLocation()}
      </div>
    );
  };

  const renderLocation = () => {
    if (locationSlot) return locationSlot;

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
            {typeof locationLabel === "string" ? (
              <div className="font-semibold text-foreground">{locationLabel}</div>
            ) : (
              locationLabel
            )}
            {typeof locationSublabel === "string" ? (
              <div className="text-sm text-muted-foreground">{locationSublabel}</div>
            ) : (
              locationSublabel
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex flex-col gap-8", contentClassName)}>
            {renderBadge()}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
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
            {renderActions()}
            {renderStats()}
          </div>
          {renderImage()}
        </div>
      </div>
    </section>
  );
}
