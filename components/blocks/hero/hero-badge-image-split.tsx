"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroBadgeImageSplitProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Badge icon
   */
  badgeIcon?: React.ReactNode;
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
   * Hero image source URL
   */
  imageSrc?: string;
  /**
   * Hero image alt text
   */
  imageAlt?: string;
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
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
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
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroBadgeImageSplit({
  badge,
  badgeIcon,
  heading,
  description,
  actions,
  actionsSlot,
  imageSrc,
  imageAlt = "Hero section demo image showing interface components",
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  optixFlowConfig,
}: HeroBadgeImageSplitProps): React.JSX.Element {
  const renderActions = useMemo(() => {
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
  }, [actionsSlot, actions]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className={cn("flex flex-col items-center text-center lg:items-start lg:text-left", contentClassName)}>
            {badge && (
              <Badge variant="outline" className={badgeClassName}>
                {badge}
                {badgeIcon}
              </Badge>
            )}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("my-6 text-4xl font-bold text-pretty lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mb-8 max-w-xl lg:text-xl", getTextColor(background, "muted"), descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {(actionsSlot || (actions && actions.length > 0)) && (
              <div className={cn("flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start", actionsClassName)}>
                {renderActions}
              </div>
            )}
          </div>
          {imageSrc && (
            <Img
              src={imageSrc}
              alt={imageAlt}
              className={cn("max-h-96 w-full rounded-md object-cover", imageClassName)}
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>
      </div>
    </Section>
  );
}
