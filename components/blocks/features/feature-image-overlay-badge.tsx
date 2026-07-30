"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface FeatureImageOverlayBadgeProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
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
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Custom slot for image (overrides imageSrc)
   */
  imageSlot?: React.ReactNode;
  /**
   * Avatar image URL
   */
  avatarSrc?: string;
  /**
   * Avatar badge text content
   */
  avatarBadgeText?: React.ReactNode;
  /**
   * Overlay title content
   */
  overlayTitle?: React.ReactNode;
  /**
   * Overlay link text content
   */
  overlayLinkText?: React.ReactNode;
  /**
   * Overlay link URL
   */
  overlayLinkUrl?: string;
  /**
   * onClick handler for overlay link
   */
  overlayLinkOnClick?: () => void;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the image wrapper
   */
  imageWrapperClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the overlay
   */
  overlayClassName?: string;
  /**
   * Additional CSS classes for the avatar badge
   */
  avatarBadgeClassName?: string;
  /**
   * Additional CSS classes for the overlay title
   */
  overlayTitleClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * Feature Image Overlay Badge - Two-column layout with content and an image
 * featuring gradient overlay with avatar badge and CTA.
 *
 * Layout: Two-column grid with content on left, image with overlay on right.
 * Key features: Gradient overlay, avatar badge, floating CTA, responsive layout.
 * Best for: Hero features, product highlights, team showcases.
 *
 * @example
 * ```tsx
 * <FeatureImageOverlayBadge
 *   badge="Modern Tactics"
 *   title="Make your site a true standout."
 *   description="Discover new web trends."
 *   actions={[{ label: "View Features", href: "#", variant: "default" }]}
 *   imageSrc="/feature.jpg"
 *   avatarSrc="/avatar.jpg"
 *   avatarBadgeText="Tailored for experts"
 *   overlayTitle="Elevate your platform"
 *   overlayLinkText="Explore all features"
 * />
 * ```
 */
export function FeatureImageOverlayBadge({
  sectionId = "feature-image-overlay-badge",
  badge,
  title,
  description,
  actions,
  actionsSlot,
  imageSrc,
  imageAlt,
  imageSlot,
  avatarSrc,
  avatarBadgeText,
  overlayTitle,
  overlayLinkText,
  overlayLinkUrl,
  overlayLinkOnClick,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  gridClassName,
  contentClassName,
  badgeClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  imageWrapperClassName,
  imageClassName,
  overlayClassName,
  avatarBadgeClassName,
  overlayTitleClassName,
  optixFlowConfig,
  background,
  spacing = "py-12 md:py-20 lg:py-24",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureImageOverlayBadgeProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      if (action.children) {
        return (
          <Pressable
            key={index}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant}
            size={action.size}
            className={cn("mt-2.5 w-fit gap-2", action.className)}
            aria-label={action["aria-label"]}
            asButton
          >
            {action.children}
          </Pressable>
        );
      }

      return (
        <Pressable
          key={index}
          href={action.href}
          onClick={action.onClick}
          variant={action.variant}
          size={action.size}
          className={cn("mt-2.5 w-fit gap-2", action.className)}
          aria-label={action["aria-label"]}
          asButton
        >
          {action.icon === "" ? null : <DynamicIcon name={action.icon} />}
          {action.label}
          {action.iconAfter === "" ? null : (
            <DynamicIcon name={action.iconAfter} />
          )}
        </Pressable>
      );
    });
  }, [actionsSlot, actions]);

  const imageContent = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (imageSrc) {
      return (
        <Img
          src={imageSrc}
          alt={imageAlt || "Feature illustration"}
          className={cn(
            "rounded-2xl object-cover md:aspect-video lg:aspect-auto w-full h-auto",
            imageClassName,
          )}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      );
    }
    return null;
  }, [imageSlot, imageSrc, imageAlt, imageClassName, optixFlowConfig]);

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
      <div
        className={cn(
          "grid place-items-center gap-10 lg:grid-cols-2",
          gridClassName,
        )}
      >
        <div className={cn("flex flex-col gap-5", contentClassName)}>
          {badge && (
            <Badge variant="outline" className={cn("", badgeClassName)}>
              {badge}
            </Badge>
          )}
          {title &&
            (typeof title === "string" ? (
              <h3
                className={cn(
                  "text-3xl font-semibold lg:text-4xl leading-snug text-balance",
                  titleClassName,
                )}
              >
                {title}
              </h3>
            ) : (
              <div
                className={cn(
                  "text-3xl font-semibold lg:text-5xl",
                  titleClassName,
                )}
              >
                {title}
              </div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "text-base leading-relaxed lg:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div
                className={cn(
                  "text-base leading-relaxed lg:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </div>
            ))}
          <div
            className={cn(
              "flex items-center gap-4 flex-wrap",
              actionsClassName,
            )}
          >
            {actionsContent}
          </div>
        </div>
        {imageContent && (
          <div className={cn("relative rounded-2xl", imageWrapperClassName)}>
            {imageContent}
            {(avatarSrc ||
              avatarBadgeText ||
              overlayTitle ||
              overlayLinkText) && (
              <>
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl bg-linear-to-t from-black/80 via-black/30 to-transparent",
                    overlayClassName,
                  )}
                />
                <div className="absolute inset-0 flex flex-col justify-between rounded-2xl p-5 md:p-7">
                  {(avatarSrc || avatarBadgeText) && (
                    <span
                      className={cn(
                        "ml-auto flex w-fit items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-semibold text-card-foreground backdrop-blur-md shadow-lg",
                        avatarBadgeClassName,
                      )}
                    >
                      {avatarSrc && (
                        <Avatar className="size-7 rounded-full ring-2 ring-white/30">
                          <AvatarImage src={avatarSrc} alt="Avatar" />
                        </Avatar>
                      )}
                      {avatarBadgeText}
                    </span>
                  )}
                  {(overlayTitle || overlayLinkText) && (
                    <div className="flex flex-col gap-4">
                      {overlayTitle &&
                        (typeof overlayTitle === "string" ? (
                          <h4
                            className={cn(
                              "text-lg font-semibold text-white lg:text-2xl xl:text-3xl",
                              overlayTitleClassName,
                            )}
                          >
                            {overlayTitle}
                          </h4>
                        ) : (
                          overlayTitle
                        ))}
                      {overlayLinkText && (
                        <Pressable
                          href={overlayLinkUrl}
                          onClick={overlayLinkOnClick}
                          className="flex w-fit items-center gap-2 font-medium text-white transition-opacity hover:opacity-80"
                        >
                          {overlayLinkText}
                          <DynamicIcon name="lucide/arrow-right" size={16} />
                        </Pressable>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
