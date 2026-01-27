"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type {ActionConfig, ImageItem, SocialLinkItem, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface ProfileInfo {
  /**
   * Profile avatar image
   */
  avatar?: ImageItem;
  /**
   * Profile name
   */
  name?: string;
  /**
   * Profile title/role
   */
  title?: string;
}

export interface HeroPortfolioCreativeProps {
  /**
   * Profile information
   */
  profile?: ProfileInfo;
  /**
   * Custom slot for profile (overrides profile prop)
   */
  profileSlot?: React.ReactNode;
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
   * Array of social link configurations
   */
  socialLinks?: Array<SocialLinkItem & { iconName?: string }>;
  /**
   * Custom slot for social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Array of portfolio images (expects 4 images)
   */
  portfolioImages?: ImageItem[];
  /**
   * Custom slot for portfolio images (overrides portfolioImages array)
   */
  portfolioImagesSlot?: React.ReactNode;  /**
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the portfolio grid
   */
  portfolioClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroPortfolioCreative({
  profile,
  profileSlot,
  heading,
  description,
  actions,
  actionsSlot,
  socialLinks,
  socialLinksSlot,
  portfolioImages,
  portfolioImagesSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  portfolioClassName,
  optixFlowConfig,
}: HeroPortfolioCreativeProps): React.JSX.Element {
  const renderProfile = useMemo(() => {
    if (profileSlot) return profileSlot;
    if (!profile) return null;

    return (
      <div className="flex items-center gap-4">
        {profile.avatar && (
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <Img
              src={profile.avatar.src}
              alt={profile.avatar.alt}
              className={cn("h-full w-full object-cover", profile.avatar.className)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}
        <div>
          {profile.name && (
            <h2 className="text-lg font-semibold text-foreground">
              {profile.name}
            </h2>
          )}
          {profile.title && (
            <p className="text-sm text-muted-foreground">
              {profile.title}
            </p>
          )}
        </div>
      </div>
    );
  }, [profileSlot, profile, optixFlowConfig]);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 sm:flex-row">
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
      </div>
    );
  }, [actionsSlot, actions]);

  const renderSocialLinks = useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div className="flex items-center gap-6 pt-4">
        {socialLinks.map((link, index) => (
          <Pressable
            key={index}
            href={link.href}
            className={cn("text-muted-foreground hover:text-foreground", link.className)}
          >
            {link.icon ?? (link.iconName && <DynamicIcon name={link.iconName} size={20} />)}
          </Pressable>
        ))}
      </div>
    );
  }, [socialLinksSlot, socialLinks]);

  const renderPortfolioImages = useMemo(() => {
    if (portfolioImagesSlot) return portfolioImagesSlot;
    if (!portfolioImages || portfolioImages.length === 0) return null;

    return (
      <div className={cn("relative", portfolioClassName)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {portfolioImages[0] && (
              <div className="overflow-hidden rounded-2xl">
                <Img
                  src={portfolioImages[0].src}
                  alt={portfolioImages[0].alt}
                  className={cn("aspect-3/4 w-full object-cover transition-transform hover:scale-105", portfolioImages[0].className)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {portfolioImages[1] && (
              <div className="overflow-hidden rounded-2xl">
                <Img
                  src={portfolioImages[1].src}
                  alt={portfolioImages[1].alt}
                  className={cn("aspect-square w-full object-cover transition-transform hover:scale-105", portfolioImages[1].className)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
          </div>
          <div className="space-y-4 pt-8">
            {portfolioImages[2] && (
              <div className="overflow-hidden rounded-2xl">
                <Img
                  src={portfolioImages[2].src}
                  alt={portfolioImages[2].alt}
                  className={cn("aspect-square w-full object-cover transition-transform hover:scale-105", portfolioImages[2].className)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {portfolioImages[3] && (
              <div className="overflow-hidden rounded-2xl">
                <Img
                  src={portfolioImages[3].src}
                  alt={portfolioImages[3].alt}
                  className={cn("aspect-3/4 w-full object-cover transition-transform hover:scale-105", portfolioImages[3].className)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }, [portfolioImagesSlot, portfolioImages, portfolioClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex flex-col gap-8", contentClassName)}>
            {renderProfile}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-lg text-muted-foreground", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {renderActions}
            {renderSocialLinks}
          </div>
          {renderPortfolioImages}
        </div>
      </div>
    </Section>
  );
}
