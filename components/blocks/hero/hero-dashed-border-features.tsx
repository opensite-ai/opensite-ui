"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, FeatureItem } from "../../../src/types";

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
   * Avatar image URL for demo button
   */
  demoAvatarSrc?: string;
  /**
   * Array of feature items
   */
  features?: Array<FeatureItem & { iconName?: string }>;
  /**
   * Custom slot for features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
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
  badgeText = "New",
  announcementText = "v2.2 is out now!",
  announcementHref = "#",
  announcementSlot,
  heading = "Fast websites for startups",
  description = "We craft powerful websites to accelerate your startup's growth.",
  actions,
  actionsSlot,
  demoAvatarSrc = imagePlaceholders[15],
  features,
  featuresSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
}: HeroDashedBorderFeaturesProps): React.JSX.Element {
  const renderAnnouncement = () => {
    if (announcementSlot) return announcementSlot;

    return (
      <Pressable
        href={announcementHref}
        className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm"
      >
        <Badge>{badgeText}</Badge>
        {announcementText}
        <DynamicIcon name="lucide/arrow-right" size={16} />
      </Pressable>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <>
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
        <Pressable
          href="#"
          asButton
          variant="outline"
          size="lg"
          className="w-full gap-2 sm:w-auto lg:mt-10"
        >
          <Avatar className="size-8 rounded-full ring-1 ring-input">
            <AvatarImage
              src={demoAvatarSrc}
              alt="placeholder"
            />
          </Avatar>
          Schedule a demo
        </Pressable>
      </>
    );
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <div
        key={index}
        className={cn(
          "flex items-center gap-6 border-t border-dashed p-4 font-medium md:justify-center lg:p-10 lg:text-lg",
          index === 1 && "border-x"
        )}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm lg:size-12 lg:text-base">
          {feature.icon ?? <DynamicIcon name={feature.iconName || "lucide/check"} size={20} />}
        </span>
        {feature.title}
      </div>
    ));
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("border-x border-t border-dashed px-4 py-20 md:px-16", contentClassName)}>
          <div className="mx-auto max-w-3xl">
            {renderAnnouncement()}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("my-4 mb-6 text-center text-3xl font-semibold lg:text-8xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mx-auto mb-6 max-w-2xl text-center text-muted-foreground lg:text-xl", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            <div className={cn("flex flex-col justify-center gap-2 sm:flex-row", actionsClassName)}>
              {renderActions()}
            </div>
          </div>
        </div>
        <div className={cn("relative grid border-x border-dashed md:grid-cols-3", featuresClassName)}>
          <DynamicIcon name="lucide/sparkle" size={20} className="absolute top-0 right-0 translate-x-2.5 -translate-y-2.5 fill-primary" />
          <DynamicIcon name="lucide/sparkle" size={20} className="absolute top-0 left-0 -translate-x-2.5 -translate-y-2.5 fill-primary" />
          {renderFeatures()}
        </div>
      </div>
    </section>
  );
}
