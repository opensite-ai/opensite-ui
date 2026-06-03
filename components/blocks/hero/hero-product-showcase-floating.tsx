"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
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
import { BlockActions } from "@/components/ui/block-actions";
import { Badge } from "@/src";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

export interface FloatingStatItem {
  /**
   * Stat value (e.g., "+127%")
   */
  value: string;
  /**
   * Stat label (e.g., "Growth")
   */
  label: string;
  /**
   * Icon name for the stat
   */
  icon?: string;
  /**
   * Position of the floating stat
   */
  position?: "top-right" | "bottom-left";
}

export interface UserCountItem {
  /**
   * User count value (e.g., "2.5K+")
   */
  count: string;
  /**
   * User count label (e.g., "Active users")
   */
  label: string;
  /**
   * Array of user avatar images
   */
  avatars?: ImageItem[];
}

export interface HeroProductShowcaseFloatingProps {
  /**
   * Badge text with icon
   */
  badgeText?: React.ReactNode;
  /**
   * Badge icon name
   */
  badgeIcon?: string;
  /**
   * Custom slot for badge (overrides badge props)
   */
  badgeSlot?: React.ReactNode;
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
   * Main product image
   */
  productImage?: ImageItem;
  /**
   * Custom slot for product image (overrides productImage prop)
   */
  productImageSlot?: React.ReactNode;
  /**
   * Floating stat configuration
   */
  floatingStat?: FloatingStatItem;
  /**
   * Custom slot for floating stat (overrides floatingStat prop)
   */
  floatingStatSlot?: React.ReactNode;
  /**
   * User count configuration
   */
  userCount?: UserCountItem;
  /**
   * Custom slot for user count (overrides userCount prop)
   */
  userCountSlot?: React.ReactNode; /**
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
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the product showcase
   */
  showcaseClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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

export function HeroProductShowcaseFloating({
  sectionId = "hero-product-showcase-floating",
  badgeText,
  badgeIcon,
  badgeSlot,
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  productImage,
  productImageSlot,
  floatingStat,
  floatingStatSlot,
  userCount,
  userCountSlot,
  background,
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "hero",
  contentClassName,
  headingClassName,
  headerClassName,
  descriptionClassName,
  showcaseClassName,
  optixFlowConfig,
  logo,
  logoSlot,
  logoClassName,
}: HeroProductShowcaseFloatingProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;

    return (
      <Badge className="px-3 py-1">
        {badgeIcon && <DynamicIcon name={badgeIcon} size={16} />}
        {badgeText && <span>{badgeText}</span>}
      </Badge>
    );
  }, [badgeSlot, badgeIcon, badgeText]);

  const renderFloatingStat = useMemo(() => {
    if (floatingStatSlot) return floatingStatSlot;
    if (!floatingStat) return null;

    return (
      <div className="absolute -top-4 -right-4 rounded-xl bg-card text-card-foreground p-4 shadow-lg border">
        <div className="flex items-center gap-3">
          {floatingStat.icon && (
            <div className="flex shrink-0 size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <DynamicIcon name={floatingStat.icon} size={16} />
            </div>
          )}
          <div className="text-sm">
            <div className="font-semibold">{floatingStat.value}</div>
            <div className="font-normal opacity-70">{floatingStat.label}</div>
          </div>
        </div>
      </div>
    );
  }, [floatingStatSlot, floatingStat]);

  const renderUserCount = useMemo(() => {
    if (userCountSlot) return userCountSlot;
    if (!userCount) return null;

    return (
      <div className="absolute -bottom-4 -left-4 rounded-xl bg-card text-card-foreground p-4 shadow-lg border">
        <div className="flex items-center gap-3">
          {userCount.avatars && userCount.avatars.length > 0 && (
            <div className="flex -space-x-2">
              {userCount.avatars.map((avatar, idx) => (
                <Img
                  key={idx}
                  src={avatar.src}
                  alt={avatar.alt}
                  className={cn(
                    "size-8 rounded-full border-2 border-background object-cover",
                    avatar.className,
                  )}
                  optixFlowConfig={optixFlowConfig}
                  loading="eager"
                />
              ))}
            </div>
          )}
          <div className="text-sm">
            <div className="font-semibold">{userCount.count}</div>
            <div className="font-normal opacity-70">{userCount.label}</div>
          </div>
        </div>
      </div>
    );
  }, [userCountSlot, userCount, optixFlowConfig]);

  const renderProductShowcase = useMemo(() => {
    if (productImageSlot) return productImageSlot;
    if (!productImage) return null;

    return (
      <div className={cn("order-1", showcaseClassName)}>
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 to-primary/80 p-8">
            <Img
              src={productImage.src}
              alt={productImage.alt}
              className={cn(
                "h-full w-full rounded-lg object-cover shadow-2xl",
                productImage.className,
              )}
              optixFlowConfig={optixFlowConfig}
              loading="eager"
            />
          </div>
          {renderFloatingStat}
          {renderUserCount}
        </div>
      </div>
    );
  }, [
    productImageSlot,
    productImage,
    showcaseClassName,
    optixFlowConfig,
    renderFloatingStat,
    renderUserCount,
  ]);

  const contentItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h2",
          className: cn(
            "text-3xl md:text-4xl lg:text-5xl",
            "font-semibold text-balance",
            headingClassName,
          ),
          children: heading,
        });
      } else {
        items.push(heading);
      }
    }

    if (description) {
      if (typeof description === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: cn(
            "text-lg opacity-70 text-pretty md:text-balance",
            descriptionClassName,
          ),
          children: description,
        });
      } else {
        items.push(description);
      }
    }

    return items;
  }, [heading, headingClassName, description, descriptionClassName]);

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
      <div className="relative">
        <div className="grid items-center gap-12 grid-cols-1 md:grid-cols-2 lg:gap-20">
          {renderProductShowcase}
          <div
            className={cn(
              "flex flex-col gap-8 order-2 mt-8 md:mt-0",
              contentClassName,
            )}
          >
            {renderBadge}

            {(logo || logoSlot) && (
              <div className={cn("mb-4", logoClassName)}>
                <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />
              </div>
            )}
            <ContentGroup
              items={contentItems}
              className={cn("text-left space-y-2", headerClassName)}
            />

            <BlockActions
              actions={actions}
              actionsSlot={actionsSlot}
              actionsClassName={actionsClassName}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
