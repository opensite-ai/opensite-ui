"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface LogosPartnerNetworkLogoItem {
  /**
   * Partner/company name
   */
  name: string;
  /**
   * Logo image URL
   */
  logo: string;
  /**
   * Additional CSS classes for the logo wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the logo image
   */
  imgClassName?: string;
}

export interface LogosPartnerNetworkProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Badge/eyebrow content above heading
   */
  badge?: React.ReactNode;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Main title/heading
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Description text below the title
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the header container
   */
  headerClassName?: string;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Array of logo configurations
   */
  logos?: LogosPartnerNetworkLogoItem[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logos grid container
   */
  logosClassName?: string;
  /**
   * Additional CSS classes for each logo wrapper
   */
  logoWrapperClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * LogosPartnerNetwork - A partner network showcase with badge, heading, and logo grid.
 * Features a centered header with CTA button and responsive logo grid below.
 */
export function LogosPartnerNetwork({
  className,
  badge,
  badgeClassName,
  title,
  titleClassName,
  description,
  descriptionClassName,
  headerClassName,
  actions,
  actionsSlot,
  actionsClassName,
  logos,
  logosSlot,
  logosClassName,
  logoWrapperClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosPartnerNetworkProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => (
      <Pressable
        key={index}
        href={action.href}
        onClick={action.onClick}
        variant={action.variant || "default"}
        asButton
        className={action.className}
      >
        {action.icon}
        {action.label}
        {action.iconAfter}
      </Pressable>
    ));
  };

  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return logos.map((partner, index) => (
      <div
        key={index}
        className={cn(
          "flex items-center justify-center p-4 grayscale transition-all hover:grayscale-0",
          logoWrapperClassName,
          partner.className
        )}
      >
        <Img
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={120}
          height={48}
          className={cn("h-12 w-auto object-contain", partner.imgClassName)}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("flex flex-col items-center text-center", headerClassName)}>
        {badge && (
          typeof badge === "string" ? (
            <Badge variant="outline" className={cn("mb-4", badgeClassName)}>
              {badge}
            </Badge>
          ) : (
            <div className={badgeClassName}>{badge}</div>
          )
        )}
        {title && (
          typeof title === "string" ? (
            <h2 className={cn("mb-4 max-w-2xl text-3xl font-bold md:text-4xl", titleClassName)}>
              {title}
            </h2>
          ) : (
            <div className={titleClassName}>{title}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mb-8 max-w-xl text-lg text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        <div className={actionsClassName}>
          {renderActions()}
        </div>
      </div>
      <div className={cn("mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4", logosClassName)}>
        {renderLogos()}
      </div>
    </Section>
  );
}
