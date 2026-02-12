"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  FeatureItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface HeroDashedBorderFeaturesProps {
  /**
   * Badge text content
   */
  badgeText?: React.ReactNode;
  /**
   * Announcement text next to badge
   */
  announcementText?: React.ReactNode;
  /**
   * Announcement link href
   */
  announcementHref?: string;
  /**
   * Custom slot for announcement (overrides badge and announcement props)
   */
  announcementSlot?: React.ReactNode;
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
   * Array of feature items
   */
  features?: Array<FeatureItem & { iconName?: string }>;
  /**
   * Custom slot for features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
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
   * Additional CSS classes for the content area
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
   * Additional CSS classes for the features container
   */
  featuresClassName?: string;
}

export function HeroDashedBorderFeatures({
  badgeText,
  announcementText,
  announcementHref,
  announcementSlot,
  heading,
  description,
  actions,
  actionsSlot,
  features,
  featuresSlot,
  background,
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
}: HeroDashedBorderFeaturesProps): React.JSX.Element {
  const renderAnnouncement = useMemo(() => {
    if (announcementSlot) return announcementSlot;
    if (!announcementText || !badgeText) return null;

    return (
      <div className="flex justify-center">
        <Pressable
          href={announcementHref}
          className={cn(
            "flex items-center gap-2 rounded-full px-2 py-1 text-sm bg-card text-card-foreground shadow-md hover:shadow-xl transition-shadow duration-500 w-fit",
          )}
        >
          {badgeText && <Badge>{badgeText}</Badge>}
          {announcementText}
          <DynamicIcon name="lucide/arrow-up-right" size={16} />
        </Pressable>
      </div>
    );
  }, [announcementSlot, announcementHref, badgeText, announcementText]);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center mt-4 md:flex-row gap-4",
          actionsClassName,
        )}
      >
        {actions.map((action, index) => {
          const {
            label,
            icon,
            iconAfter,
            children,
            className: actionClassName,
            ...pressableProps
          } = action;
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

  const renderFeatures = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <Pressable
        key={index}
        className={cn(
          "flex items-center gap-6 border-t border-dashed p-4 font-medium md:justify-center lg:p-10 lg:text-lg",
          index === 1 && "md:border-x",
          index === 2 ? "border-b" : "md:border-b",
        )}
        href={feature.href}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md text-sm lg:size-12 lg:text-base bg-card text-card-foreground">
          {feature.icon ? (
            feature.icon
          ) : feature.iconName ? (
            <DynamicIcon name={feature.iconName || "lucide/check"} size={20} />
          ) : null}
        </span>
        {feature.title}
      </Pressable>
    ));
  }, [featuresSlot, features]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative flex items-center justify-center", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div
          className={cn(
            "border-x border-t border-dashed px-4 py-6 md:py-20 md:px-16",
            contentClassName,
          )}
        >
          <div className="mx-auto max-w-3xl">
            {renderAnnouncement}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "my-4 mb-6 text-center text-3xl font-semibold lg:text-8xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "mx-auto mb-8 max-w-2xl text-center lg:text-xl text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
            {renderActions}
          </div>
        </div>
        <div
          className={cn(
            "relative grid border-x border-dashed md:grid-cols-3",
            featuresClassName,
          )}
        >
          <DynamicIcon
            name="lucide/sparkle"
            size={20}
            className="absolute top-0 right-0 translate-x-2.5 -translate-y-2.5 fill-primary"
          />
          <DynamicIcon
            name="lucide/sparkle"
            size={20}
            className="absolute top-0 left-0 -translate-x-2.5 -translate-y-2.5 fill-primary"
          />
          {renderFeatures}
        </div>
      </div>
    </Section>
  );
}
