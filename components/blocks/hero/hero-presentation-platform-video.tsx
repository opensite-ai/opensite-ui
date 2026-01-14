"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { videoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig } from "../../../src/types";

export interface HeroPresentationPlatformVideoProps {
  /**
   * Subtitle/eyebrow text above heading
   */
  subtitle?: React.ReactNode;
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
   * Video source URL
   */
  videoSrc?: string;
  /**
   * Custom slot for video (overrides videoSrc prop)
   */
  videoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
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
   * Additional CSS classes for the video container
   */
  videoClassName?: string;
}

export function HeroPresentationPlatformVideo({
  subtitle,
  heading,
  description,
  actions,
  actionsSlot,
  videoSrc = videoPlaceholders[0],
  videoSlot,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  videoClassName,
}: HeroPresentationPlatformVideoProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 font-medium md:flex-row">
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

  const renderVideo = () => {
    if (videoSlot) return videoSlot;

    return (
      <div className={cn("relative hidden h-[720px] w-[45%] overflow-hidden rounded-l-full bg-black lg:block", videoClassName)}>
        <video
          autoPlay
          loop
          muted
          playsInline
          data-wf-ignore="true"
          data-object-fit="cover"
          className="h-full w-full rounded-tl-xl object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    );
  };

  return (
    <section
      className={cn(
        "flex min-h-screen items-center justify-between bg-background py-14",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-5 px-[10%] lg:w-[50%] lg:pr-0", contentClassName)}>
        {subtitle && (
          typeof subtitle === "string" ? (
            <p className="font-light text-foreground uppercase">
              {subtitle}
            </p>
          ) : (
            subtitle
          )
        )}
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("text-5xl font-medium text-foreground md:text-6xl lg:text-7xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <h1 className={cn("text-5xl font-medium text-foreground md:text-6xl lg:text-7xl", headingClassName)}>
              {heading}
            </h1>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("my-8 text-foreground md:text-xl", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {renderActions()}
      </div>
      {renderVideo()}
    </section>
  );
}
