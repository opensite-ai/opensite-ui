"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroBadgeShadowOverlayProps {
  /**
   * Announcement badge content
   */
  announcementBadge?: React.ReactNode;
  /**
   * Announcement text
   */
  announcementText?: React.ReactNode;
  /**
   * Announcement link href
   */
  announcementHref?: string;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Background overlay image URL
   */
  backgroundImageUrl?: string;
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
   * Additional CSS classes for the announcement
   */
  announcementClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
}

export function HeroBadgeShadowOverlay({
  announcementBadge,
  announcementText,
  announcementHref = "#",
  heading,
  actions,
  actionsSlot,
  backgroundImageUrl = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/shadow-overlay.png",
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  announcementClassName,
  headingClassName,
  actionsClassName,
}: HeroBadgeShadowOverlayProps): React.JSX.Element {
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

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative", className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className="flex flex-col items-center gap-10 text-center">
          {(announcementBadge || announcementText) && (
            <Pressable
              href={announcementHref}
              className={cn("flex items-center gap-2 rounded-full px-2 py-1 text-sm transition-colors hover:bg-muted", announcementClassName)}
            >
              {announcementBadge && <Badge>{announcementBadge}</Badge>}
              {announcementText}
              <DynamicIcon name="lucide/arrow-right" size={16} />
            </Pressable>
          )}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-4xl font-semibold lg:text-8xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {(actionsSlot || (actions && actions.length > 0)) && (
            <div className={cn("flex w-full flex-col justify-center gap-2 sm:flex-row", actionsClassName)}>
              {renderActions()}
            </div>
          )}
        </div>
      </div>
      <div
        className="absolute inset-0 -z-10 bg-[50%_0] bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      />
    </Section>
  );
}
