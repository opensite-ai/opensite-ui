"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Img } from "@page-speed/img";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

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
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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

export function HeroBadgeShadowOverlay({
  sectionId = "hero-badge-shadow-overlay",
  announcementBadge,
  announcementText,
  announcementHref,
  description,
  descriptionClassName,
  heading,
  actions,
  actionsSlot,
  backgroundImageUrl,
  optixFlowConfig,
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  className,
  containerClassName = "mx-0 w-screen px-0 sm:px-0 lg:px-0 max-w-screen relative z-10 min-h-screen h-full",
  announcementClassName,
  headingClassName,
  actionsClassName,
  logo,
  logoSlot,
  logoClassName,
}: HeroBadgeShadowOverlayProps): React.JSX.Element {
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
      <div className="flex flex-col min-h-screen h-full justify-center items-center">
        <div className="flex flex-col items-center gap-4 text-center px-6 max-full md:max-w-lg">
          {(announcementBadge || announcementText) && (
            <Pressable
              href={announcementHref}
              className={cn(
                "flex items-center gap-2 rounded-full px-2 py-1 text-sm bg-card text-card-foreground shadow-md hover:shadow-xl transition-shadow duration-500",
                announcementClassName,
              )}
            >
              {announcementBadge && <Badge>{announcementBadge}</Badge>}
              {announcementText}
              <DynamicIcon name="lucide/arrow-up-right" size={16} />
            </Pressable>
          )}
          {(logo || logoSlot) && (

            <div className={cn("mb-4 flex justify-center", logoClassName)}>

              <BrandLogo logo={logo} logoSlot={logoSlot} size="xl" />

            </div>

          )}

          
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-4xl font-semibold lg:text-8xl text-white text-balance text-shadow-lg text-center",
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
                  "text-lg text-white text-balance text-shadow-lg text-center",
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
      </div>
      {backgroundImageUrl && (
        <Img
          src={backgroundImageUrl}
          alt="Background Image"
          className="absolute inset-0 -z-10 h-full w-full object-cover brightness-50"
          optixFlowConfig={optixFlowConfig}
        />
      )}
    </Section>
  );
}
