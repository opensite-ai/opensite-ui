"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { Badge } from "@/src";
import { BlockActions } from "@/components/ui/block-actions";

export interface HeroStartupLaunchCtaProps {
  /**
   * Badge/status indicator content
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
   * Social proof avatars
   */
  avatars?: ImageItem[];
  /**
   * Custom slot for avatars (overrides avatars array)
   */
  avatarsSlot?: React.ReactNode;
  /**
   * Social proof text (e.g., "500+ startups launched")
   */
  socialProofText?: React.ReactNode;
  /**
   * Hero image source URL
   */
  imageSrc?: string;
  /**
   * Hero image alt text
   */
  imageAlt?: string;
  /**
   * Badge card content (floating card on image)
   */
  badgeCard?: {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    logoSrc?: string;
  };
  /**
   * Custom slot for badge card (overrides badgeCard)
   */
  badgeCardSlot?: React.ReactNode;
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
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
   * Additional CSS classes for the social proof section
   */
  socialProofClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroStartupLaunchCta({
  sectionId = "hero-startup-launch-cta",
  badge,
  badgeIcon,
  badgeCard,
  badgeCardSlot,
  badgeClassName,
  heading,
  description,
  actions,
  actionsSlot,
  avatars,
  avatarsSlot,
  socialProofText,
  imageSrc,
  imageAlt,
  background,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  socialProofClassName,
  imageClassName,
  optixFlowConfig,
}: HeroStartupLaunchCtaProps): React.JSX.Element {
  const renderAvatars = useMemo(() => {
    if (avatarsSlot) return avatarsSlot;
    if (!avatars || avatars.length === 0) return null;

    return (
      <div className="flex -space-x-2">
        {avatars.map((avatar, index) => (
          <Img
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            className={cn(
              "h-10 w-10 rounded-full border-2 border-background object-cover",
              avatar.className,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </div>
    );
  }, [avatarsSlot, avatars, optixFlowConfig]);

  const renderBadgeCard = useMemo(() => {
    if (badgeCardSlot) return badgeCardSlot;
    if (!badgeCard) return null;

    return (
      <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-xl bg-card text-card-foreground p-4 shadow-lg">
        {badgeCard.logoSrc && (
          <Img
            src={badgeCard.logoSrc}
            alt=""
            className="h-10 w-10"
            optixFlowConfig={optixFlowConfig}
          />
        )}
        <div>
          {badgeCard.title && (
            <div className="font-semibold">{badgeCard.title}</div>
          )}
          {badgeCard.subtitle && (
            <div className="text-sm">{badgeCard.subtitle}</div>
          )}
        </div>
      </div>
    );
  }, [badgeCardSlot, badgeCard, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="pt-8 md:pt-0">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex flex-col gap-8", contentClassName)}>
            {badge && (
              <Badge className={cn("px-4", badgeClassName)}>
                {badgeIcon}
                {typeof badge === "string" ? <span>{badge}</span> : badge}
              </Badge>
            )}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-normal text-balance md:text-7xl",
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
                    "max-w-full md:max-w-[70%] text-lg md:text-xl font-normal text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                description
              ))}
            <BlockActions
              actions={actions}
              actionsSlot={actionsSlot}
              actionsClassName={actionsClassName}
            />
            {(avatarsSlot || avatars || socialProofText) && (
              <div
                className={cn(
                  "flex items-center gap-4 pt-4",
                  socialProofClassName,
                )}
              >
                {renderAvatars}
                {socialProofText && (
                  <div className="text-sm">{socialProofText}</div>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            {imageSrc && (
              <div
                className={cn(
                  "overflow-hidden rounded-2xl bg-linear-to-br from-green-50 to-blue-50 p-8",
                  imageClassName,
                )}
              >
                <Img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full rounded-lg shadow-xl"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {renderBadgeCard}
          </div>
        </div>
      </div>
    </Section>
  );
}
