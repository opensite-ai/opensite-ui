"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import type {ActionConfig, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface AvatarItem {
  /**
   * Avatar image source URL
   */
  src: string;
  /**
   * Alt text for the avatar
   */
  alt: string;
}

export interface HeroGradientAvatarsRatingProps {
  /**
   * Top link text
   */
  topLinkText?: React.ReactNode;
  /**
   * Top link href
   */
  topLinkHref?: string;
  /**
   * Custom slot for top link (overrides topLink props)
   */
  topLinkSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Heading subtitle (muted text)
   */
  headingSubtitle?: React.ReactNode;
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
   * Array of avatar items for social proof
   */
  avatars?: AvatarItem[];
  /**
   * Custom slot for avatars (overrides avatars array)
   */
  avatarsSlot?: React.ReactNode;
  /**
   * Rating value (e.g., "5.0")
   */
  ratingValue?: string;
  /**
   * Rating label (e.g., "1000+ happy developers")
   */
  ratingLabel?: React.ReactNode;
  /**
   * Number of stars to display
   */
  starCount?: number;
  /**
   * Array of showcase images (expects 2 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
   */
  imagesSlot?: React.ReactNode;  /**
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroGradientAvatarsRating({
  topLinkText,
  topLinkHref,
  topLinkSlot,
  heading,
  headingSubtitle,
  description,
  actions,
  actionsSlot,
  avatars,
  avatarsSlot,
  ratingValue,
  ratingLabel,
  starCount = 5,
  images,
  imagesSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroGradientAvatarsRatingProps): React.JSX.Element {
  const renderTopLink = useMemo(() => {
    if (topLinkSlot) return topLinkSlot;
    if (!topLinkText || !topLinkHref) return null;

    return (
      <Pressable
        href={topLinkHref}
        className="my-6 text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase hover:underline"
      >
        {topLinkText}
      </Pressable>
    );
  }, [topLinkSlot, topLinkText, topLinkHref]);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start", actionsClassName)}>
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
  }, [actionsSlot, actions, actionsClassName]);

  const renderAvatars = useMemo(() => {
    if (avatarsSlot) return avatarsSlot;
    if (!avatars || avatars.length === 0) return null;

    return (
      <div className="flex -space-x-4">
        {avatars.map((avatar, index) => (
          <Avatar
            key={index}
            className="size-14 border-2 border-background shadow-sm ring-1 ring-border"
          >
            <AvatarImage src={avatar.src} alt={avatar.alt} />
          </Avatar>
        ))}
      </div>
    );
  }, [avatarsSlot, avatars]);

  const renderRating = useMemo(() => {
    if (!ratingValue && !ratingLabel) return null;

    return (
      <div className="flex flex-col items-center sm:items-start">
        <div className="flex items-center gap-1">
          {[...Array(starCount)].map((_, i) => (
            <DynamicIcon
              key={i}
              name="lucide/star"
              size={20}
              className="fill-primary"
            />
          ))}
          {ratingValue && <span className="font-semibold">{ratingValue}</span>}
        </div>
        {ratingLabel && (
          typeof ratingLabel === "string" ? (
            <p className="text-sm font-medium text-muted-foreground">{ratingLabel}</p>
          ) : (
            ratingLabel
          )
        )}
      </div>
    );
  }, [ratingValue, ratingLabel, starCount]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className={cn("relative grid gap-4 lg:grid-cols-2", imagesClassName)}>
        {images[0] && (
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg bg-muted">
            <Img
              src={images[0].src}
              alt={images[0].alt}
              className={cn("h-full w-full object-cover transition-transform duration-300 hover:scale-105", images[0].className)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}
        {images[1] && (
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg bg-muted lg:mt-8">
            <Img
              src={images[1].src}
              alt={images[1].alt}
              className={cn("h-full w-full object-cover transition-transform duration-300 hover:scale-105", images[1].className)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}
      </div>
    );
  }, [imagesSlot, images, imagesClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_15%_at_40%_55%,hsl(var(--accent))_0%,transparent_100%)] lg:bg-[radial-gradient(ellipse_12%_20%_at_60%_45%,hsl(var(--accent))_0%,transparent_100%)]"></div>
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_20%_at_70%_75%,hsl(var(--accent))_0%,transparent_80%)] lg:bg-[radial-gradient(ellipse_15%_30%_at_70%_65%,hsl(var(--accent))_0%,transparent_80%)]"></div>
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(hsl(var(--accent-foreground)/0.1)_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_60%_at_65%_50%,#000_0%,transparent_80%)] bg-size-[8px_8px]"></div>

      <div className={cn("relative z-10 container mx-auto px-4", containerClassName)}>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className={cn("flex flex-col items-center text-center lg:items-start lg:text-left", contentClassName)}>
            {renderTopLink}

            {heading && (
              <h1 className={cn("text-4xl font-semibold sm:text-5xl", headingClassName)}>
                {typeof heading === "string" ? heading : heading}
                {headingSubtitle && (
                  <>
                    <br />
                    <span className="text-muted-foreground">{headingSubtitle}</span>
                  </>
                )}
              </h1>
            )}

            {description && (
              typeof description === "string" ? (
                <p className={cn("my-8 max-w-xl text-muted-foreground lg:text-lg", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}

            {renderActions}

            {(avatars || avatarsSlot || ratingValue || ratingLabel) && (
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                {renderAvatars}
                {renderRating}
              </div>
            )}
          </div>

          {renderImages}
        </div>
      </div>
    </Section>
  );
}
