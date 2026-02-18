"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";

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
  videoSlot?: React.ReactNode; /**
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
   * Additional CSS classes for the video container
   */
  videoClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
}

export function HeroPresentationPlatformVideo({
  subtitle,
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  videoSrc,
  videoSlot,
  background,
  spacing = "py-32 md:py-16",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  headingClassName,
  descriptionClassName,
  videoClassName,
}: HeroPresentationPlatformVideoProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 font-medium md:flex-row">
        {actions.map((action, index) => {
          const {
            label,
            icon,
            iconAfter,
            children,
            className: actionClassName,
            ...pressableProps
          } = action;
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

  const renderVideo = useMemo(() => {
    if (videoSlot) return videoSlot;

    return (
      <div
        className={cn(
          "relative hidden h-[720px] w-[45%] overflow-hidden rounded-l-full bg-foreground lg:block",
          videoClassName,
        )}
      >
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
  }, [videoSlot, videoSrc, videoClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative flex items-center justify-center", className)}
      containerClassName={containerClassName}
    >
      <div className="relative flex min-h-fit md:min-h-screen items-center justify-between">
        <div
          className={cn(
            "flex flex-col gap-5 lg:w-[50%] lg:pr-0",
            contentClassName,
          )}
        >
          {subtitle &&
            (typeof subtitle === "string" ? (
              <p className="font-light uppercase">{subtitle}</p>
            ) : (
              subtitle
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-5xl font-medium md:text-6xl lg:text-7xl",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <h1
                className={cn(
                  "text-5xl font-medium md:text-6xl lg:text-7xl",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn("my-0 md:my-8 md:text-xl", descriptionClassName)}
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
        {renderVideo}
      </div>
    </Section>
  );
}
