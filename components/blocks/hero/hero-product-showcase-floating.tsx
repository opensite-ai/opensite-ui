"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

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
  userCountSlot?: React.ReactNode;
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
}

export function HeroProductShowcaseFloating({
  badgeText,
  badgeIcon,
  badgeSlot,
  heading,
  description,
  actions,
  actionsSlot,
  productImage,
  productImageSlot,
  floatingStat,
  floatingStatSlot,
  userCount,
  userCountSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  showcaseClassName,
  optixFlowConfig,
}: HeroProductShowcaseFloatingProps): React.JSX.Element {
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;

    return (
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        {badgeIcon && <DynamicIcon name={badgeIcon} size={16} />}
        {badgeText && <span>{badgeText}</span>}
      </div>
    );
  };

  const renderActions = () => {
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
  };

  const renderFloatingStat = () => {
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
            <div className="text-2xl font-bold text-foreground">
              {floatingStat.value}
            </div>
            <div className="text-xs text-muted-foreground">{floatingStat.label}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderUserCount = () => {
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
                  className={cn("h-8 w-8 rounded-full border-2 border-background object-cover", avatar.className)}
                  optixFlowConfig={optixFlowConfig}
                />
              ))}
            </div>
          )}
          <div className="text-sm">
            <div className="font-semibold text-foreground">{userCount.count}</div>
            <div className="text-muted-foreground">{userCount.label}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderProductShowcase = () => {
    if (productImageSlot) return productImageSlot;
    if (!productImage) return null;

    return (
      <div className={cn("order-2 lg:order-1", showcaseClassName)}>
        <div className="relative">
          <div className="aspect-4/3 overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 to-purple-500/20 p-8">
            <Img
              src={productImage.src}
              alt={productImage.alt}
              className={cn("h-full w-full rounded-lg object-cover shadow-2xl", productImage.className)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          {renderFloatingStat()}
          {renderUserCount()}
        </div>
      </div>
    );
  };

  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {renderProductShowcase()}
          <div className={cn("order-1 flex flex-col gap-8 lg:order-2", contentClassName)}>
            {renderBadge()}
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
            {renderActions()}
          </div>
        </div>
      </div>
    </section>
  );
}
