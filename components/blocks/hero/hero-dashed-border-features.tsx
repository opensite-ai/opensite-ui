"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { BrandLogo } from "../../ui/brand-logo";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  FeatureItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { LogoConfig } from "../navbars/types";

export interface HeroDashedBorderFeaturesProps {
  /**
   * Brand logo configuration — renders above the announcement badge.
   * LOGO MEDIA ONLY. Do not use photos, hero images, or video assets.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroDashedBorderFeatures({
  sectionId = "hero-dashed-border-features",
  logo,
  logoSlot,
  logoClassName,
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
  spacing = "hero",
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
                  {icon === "" ? null : <DynamicIcon name={icon} />}
                  {label}
                  {iconAfter === "" ? null : (
                    <DynamicIcon name={iconAfter} />
                  )}
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
          "flex items-center gap-4 border-t border-dashed p-4 md:justify-center lg:p-10 ",
          feature.href
            ? "cursor-pointer bg-transparent transition-colors duration-300 hover:bg-card hover:text-card-foreground"
            : "",
          index === 1 && "md:border-x",
          index === 2 ? "border-b" : "md:border-b",
        )}
        href={feature.href}
      >
        {feature.icon || feature.iconName ? (
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md text-sm lg:size-12 lg:text-base bg-card text-card-foreground ring-1 ring-border">
            <DynamicIcon name={feature.icon || feature.iconName} size={20} />
          </span>
        ) : null}

        {feature.title || feature.description ? (
          <div className="text-left flex flex-col gap-1">
            {feature.title ? (
              <div className="font-medium text-base md:text-lg line-clamp-2">
                {feature.title}
              </div>
            ) : null}
            {feature.description ? (
              typeof feature.description === "string" &&
              feature.description?.length > 0 ? (
                <div className="text-sm opacity-70 text-balance line-clamp-2 leading-tight">
                  {feature.description}
                </div>
              ) : (
                feature.description
              )
            ) : null}
          </div>
        ) : null}
      </Pressable>
    ));
  }, [featuresSlot, features]);

  return (
    <Section
      id={sectionId}
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
            {(logo || logoSlot) && (
              <div
                className={cn(
                  "mt-8 md:mt-16 mb-0 flex justify-center",
                  logoClassName,
                )}
              >
                <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />
              </div>
            )}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "my-4 mb-6 text-center text-3xl font-semibold lg:text-8xl text-balance",
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
                <p
                  className={cn(
                    "mx-auto mb-8 max-w-2xl text-center lg:text-xl text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                description
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
