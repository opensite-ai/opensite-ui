"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, StatItem, OptixFlowConfig } from "../../../src/types";

export interface HeroEcommerceProductShowcaseProps {
  /**
   * Badge text content
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
   * Array of product images (expects 4 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
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
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroEcommerceProductShowcase({
  badgeText = "New Collection",
  badgeIcon = "lucide/sparkles",
  badgeSlot,
  heading = "Discover our latest arrivals",
  description = "Explore our curated collection of premium products designed to elevate your everyday experience. Quality craftsmanship meets modern design.",
  actions,
  actionsSlot,
  stats,
  statsSlot,
  images,
  imagesSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  statsClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroEcommerceProductShowcaseProps): React.JSX.Element {
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;

    return (
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
        <DynamicIcon name={badgeIcon} size={16} />
        <span>{badgeText}</span>
      </div>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

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
      <div className={cn("flex items-center gap-6 pt-4", statsClassName)}>
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className="h-12 w-px bg-border"></div>}
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;

    return (
      <div className={cn("grid grid-cols-2 gap-4", imagesClassName)}>
        <div className="space-y-4">
          {images[0] && (
            <div className="overflow-hidden rounded-2xl bg-muted">
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn("aspect-3/4 w-full object-cover", images[0].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
          {images[1] && (
            <div className="overflow-hidden rounded-2xl bg-muted">
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn("aspect-square w-full object-cover", images[1].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
        </div>
        <div className="space-y-4 pt-8">
          {images[2] && (
            <div className="overflow-hidden rounded-2xl bg-muted">
              <Img
                src={images[2].src}
                alt={images[2].alt}
                className={cn("aspect-square w-full object-cover", images[2].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
          {images[3] && (
            <div className="overflow-hidden rounded-2xl bg-muted">
              <Img
                src={images[3].src}
                alt={images[3].alt}
                className={cn("aspect-3/4 w-full object-cover", images[3].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            {renderImages()}
          </div>
          <div className={cn("order-1 flex flex-col gap-8 lg:order-2", contentClassName)}>
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
        </div>
      </div>
    </section>
  );
}
