"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { LogoConfig } from "../navbars/types";

export interface HeroAnnouncementBadgeProps {
  /**
   * Badge/announcement content
   */
  badge?: React.ReactNode;
  /**
   * Badge icon
   */
  badgeIcon?: React.ReactNode | string;
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
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
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
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroAnnouncementBadge({
  sectionId = "hero-announcement-badge",
  badge,
  badgeIcon,
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  background,
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "pt-32 pb-16 md:pt-32 md:pb-32",
  badgeClassName,
  headingClassName,
  descriptionClassName,
  logo,
  logoSlot,
  logoClassName,
}: HeroAnnouncementBadgeProps): React.JSX.Element {
  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative flex flex-col gap-4 md:gap-6 lg:gap-8">
        {badge && (
          <Badge className={cn("gap-2", badgeClassName)}>
            {badgeIcon && (
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full",
                )}
              >
                <DynamicIcon name={badgeIcon} />
              </span>
            )}
            {typeof badge === "string" ? (
              <p className="truncate whitespace-nowrap pr-2">{badge}</p>
            ) : (
              badge
            )}
          </Badge>
        )}
        {(logo || logoSlot) && (

          <div className={cn("mb-4 flex justify-center", logoClassName)}>

            <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />

          </div>

        )}

        
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "text-4xl leading-none font-bold tracking-tighter md:text-[7vw] lg:text-8xl",
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
                "max-w-2xl md:text-[2vw] lg:text-xl text-balance",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          ))}
        <BlockActions
          actions={actions}
          actionsSlot={actionsSlot}
          actionsClassName={actionsClassName}
        />
      </div>
    </Section>
  );
}
