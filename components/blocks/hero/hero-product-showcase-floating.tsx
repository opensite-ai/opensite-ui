"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor, getAccentColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
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
}

export function HeroProductShowcaseFloating({
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
  spacing = "xl",
  contentClassName,
  headingClassName,
  descriptionClassName,
  showcaseClassName,
  optixFlowConfig,
}: HeroProductShowcaseFloatingProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;

    return (
      <div
        className={cn(
          "inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
          `${getAccentColor(background)}/10`,
          getAccentColor(background),
        )}
      >
        {badgeIcon && <DynamicIcon name={badgeIcon} size={16} />}
        {badgeText && <span>{badgeText}</span>}
      </div>
    );
  }, [badgeSlot, badgeIcon, badgeText]);

  const renderFloatingStat = useMemo(() => {
    if (floatingStatSlot) return floatingStatSlot;
    if (!floatingStat) return null;

    return (
      <div className="absolute -top-4 -right-4 rounded-xl bg-background p-4 shadow-lg">
        <div className="flex items-center gap-2">
          {floatingStat.icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
              <DynamicIcon
                name={floatingStat.icon}
                size={20}
                className="text-success"
              />
            </div>
          )}
          <div>
            <div className="text-2xl font-bold ">{floatingStat.value}</div>
            <div className={cn("text-xs", getTextColor(background, "muted"))}>
              {floatingStat.label}
            </div>
          </div>
        </div>
      </div>
    );
  }, [floatingStatSlot, floatingStat]);

  const renderUserCount = useMemo(() => {
    if (userCountSlot) return userCountSlot;
    if (!userCount) return null;

    return (
      <div className="absolute -bottom-4 -left-4 rounded-xl bg-background p-4 shadow-lg">
        <div className="flex items-center gap-3">
          {userCount.avatars && userCount.avatars.length > 0 && (
            <div className="flex -space-x-2">
              {userCount.avatars.map((avatar, idx) => (
                <Img
                  key={idx}
                  src={avatar.src}
                  alt={avatar.alt}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 border-background object-cover",
                    avatar.className,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
              ))}
            </div>
          )}
          <div className="text-sm">
            <div className="font-semibold ">{userCount.count}</div>
            <div className={getTextColor(background, "muted")}>
              {userCount.label}
            </div>
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
          <div className="aspect-4/3 overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 to-purple-500/20 p-8">
            <Img
              src={productImage.src}
              alt={productImage.alt}
              className={cn(
                "h-full w-full rounded-lg object-cover shadow-2xl",
                productImage.className,
              )}
              optixFlowConfig={optixFlowConfig}
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

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className="pt-10 md:pt-0">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {renderProductShowcase}
          <div className={cn("flex flex-col gap-8 order-2", contentClassName)}>
            {renderBadge}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <h1
                  className={cn(
                    "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "text-lg",
                    getTextColor(background, "muted"),
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
      </div>
    </Section>
  );
}
