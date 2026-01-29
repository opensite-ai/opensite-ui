"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor, getTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, ImageItem, StatItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

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
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroEcommerceProductShowcase({
  badgeText,
  badgeIcon,
  badgeSlot,
  heading,
  description,
  actions,
  actionsSlot,
  stats,
  statsSlot,
  images,
  imagesSlot,
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
  imagesClassName,
  optixFlowConfig,
}: HeroEcommerceProductShowcaseProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;

    return (
      <div className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
        getNestedCardBg(background, 'accent'),
        getNestedCardTextColor(background)
      )}>
        {badgeIcon && <DynamicIcon name={badgeIcon} size={16} />}
        <span>{badgeText}</span>
      </div>
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
      <div className={cn("flex items-center gap-6 pt-4", statsClassName)}>
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className="h-12 w-px bg-border"></div>}
            <div className="text-center">
              <div className="text-2xl font-bold ">{stat.value}</div>
              <div className={cn("text-sm", getTextColor(background, "muted"))}>{stat.label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }, [statsSlot, stats, statsClassName]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className={cn("grid grid-cols-2 gap-4", imagesClassName)}>
        <div className="space-y-4">
          {images[0] && (
            <div className={cn("overflow-hidden rounded-2xl", getNestedCardBg(background, "muted"))}>
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn("aspect-3/4 w-full object-cover", images[0].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
          {images[1] && (
            <div className={cn("overflow-hidden rounded-2xl", getNestedCardBg(background, "muted"))}>
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
            <div className={cn("overflow-hidden rounded-2xl", getNestedCardBg(background, "muted"))}>
              <Img
                src={images[2].src}
                alt={images[2].alt}
                className={cn("aspect-square w-full object-cover", images[2].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
          {images[3] && (
            <div className={cn("overflow-hidden rounded-2xl", getNestedCardBg(background, "muted"))}>
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
  }, [imagesSlot, images, imagesClassName, optixFlowConfig]);

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
          <div className="order-2 lg:order-1">
            {renderImages}
          </div>
          <div className={cn("order-1 flex flex-col gap-8 lg:order-2", contentClassName)}>
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
                <p className={cn("text-lg", getTextColor(background, "muted"), descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {renderActions}
            {renderStats}
          </div>
        </div>
      </div>
    </Section>
  );
}
