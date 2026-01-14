"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { videoPlaceholders } from "../../../lib/mediaPlaceholders";

/**
 * Configuration for the primary action button
 */
export interface ActionButtonConfig {
  /**
   * Button label text
   */
  label: string;
  /**
   * Button href destination
   */
  href: string;
  /**
   * Icon name to display after the label
   */
  icon?: string;
}

/**
 * Configuration for the trust/rating section
 */
export interface TrustConfig {
  /**
   * Number of stars to display
   */
  starCount?: number;
  /**
   * Trust message text
   */
  message?: string;
}

export interface HeroVideoOverlayStarsProps {
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Primary action button configuration
   */
  action?: ActionButtonConfig;
  /**
   * Custom slot for action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Trust/rating section configuration
   */
  trust?: TrustConfig;
  /**
   * Custom slot for trust section (overrides trust prop)
   */
  trustSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Video source URL
   */
  videoSrc?: string;
  /**
   * Custom slot for video background (overrides videoSrc)
   */
  videoSlot?: React.ReactNode;
}

/**
 * HeroVideoOverlayStars - A full-screen hero with video background, gradient text heading,
 * prominent CTA button, and star rating trust indicator. Ideal for product launches.
 */
export function HeroVideoOverlayStars({
  heading = "Liberate yourself from phone interruptions",
  action,
  actionSlot,
  trust,
  trustSlot,
  className,
  headingClassName,
  videoSrc = videoPlaceholders[0],
  videoSlot,
}: HeroVideoOverlayStarsProps): React.JSX.Element {
  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    return (
      <Pressable
        href={action.href}
        asButton
        variant="default"
        className="flex h-fit w-fit items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium shadow-[0_0_5px_5px_rgba(255,255,255,.3)] transition-all duration-500 hover:bg-neutral-200 hover:shadow-[0_0_10px_5px_rgba(255,255,255,.5)]"
      >
        <p>{action.label}</p>
        {action.icon && <DynamicIcon name={action.icon} size={20} />}
      </Pressable>
    );
  };

  const renderTrust = () => {
    if (trustSlot) return trustSlot;
    if (!trust) return null;

    const starCount = trust.starCount ?? 5;

    return (
      <div>
        <div className="flex items-center justify-center gap-0.5">
          {[...Array(starCount)].map((_, i) => (
            <DynamicIcon
              key={i}
              name="lucide/star"
              size={12}
              className="fill-muted2-foreground"
            />
          ))}
        </div>
        {trust.message && (
          <p className="mt-1.5 max-w-40 text-center text-xs leading-snug font-medium text-foreground/60">
            {trust.message}
          </p>
        )}
      </div>
    );
  };

  const renderVideo = () => {
    if (videoSlot) return videoSlot;

    return (
      <div className="absolute inset-0 size-full before:absolute before:inset-0 before:bg-background/85 before:content-['']">
        <video
          src={videoSrc}
          muted
          autoPlay
          loop
          controls={false}
          className="size-full object-cover object-center"
        />
      </div>
    );
  };

  return (
    <section
      className={cn(
        "dark relative h-svh max-h-[1400px] min-h-[600px] w-full overflow-hidden bg-background px-5 font-sans",
        className
      )}
    >
      <div className="relative z-10 flex size-full">
        <div className="m-auto flex max-w-100 flex-col items-center gap-9 sm:max-w-125 md:max-w-200">
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("bg-linear-to-br from-neutral-100 to-neutral-600 bg-clip-text text-center text-4xl leading-tight font-semibold text-transparent sm:text-5xl md:text-[4rem]", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("bg-linear-to-br from-neutral-100 to-neutral-600 bg-clip-text text-center text-4xl leading-tight font-semibold text-transparent sm:text-5xl md:text-[4rem]", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {renderAction()}
          {renderTrust()}
        </div>
      </div>
      {renderVideo()}
    </section>
  );
}
