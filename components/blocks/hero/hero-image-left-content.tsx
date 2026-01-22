"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type {ActionConfig, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface HeroImageLeftContentProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Badge icon
   */
  badgeIcon?: React.ReactNode;
  /**
   * Badge variant
   */
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
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
   * Additional CSS classes for the image container
   */
  imageContainerClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroImageLeftContent({
  badge,
  badgeIcon,
  badgeVariant = "secondary",
  heading,
  description,
  actions,
  actionsSlot,
  imageSrc,
  imageAlt = "placeholder hero",
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageContainerClassName,
  imageClassName,
  optixFlowConfig,
}: HeroImageLeftContentProps): React.JSX.Element {
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
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex justify-end bg-muted", imageContainerClassName)}>
            {imageSrc && (
              <Img
                src={imageSrc}
                alt={imageAlt}
                className={cn("max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px]", imageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
          <div className={cn("flex flex-col items-center text-center lg:max-w-3xl lg:items-start lg:text-left", contentClassName)}>
            {badge && (
              <Badge variant={badgeVariant} className={badgeClassName}>
                {badge}
                {badgeIcon}
              </Badge>
            )}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("my-6 text-4xl font-bold text-pretty md:text-5xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mb-8 max-w-xl text-muted-foreground lg:text-xl", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {(actionsSlot || (actions && actions.length > 0)) && (
              <div className={cn("flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start", actionsClassName)}>
                {renderActions()}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
