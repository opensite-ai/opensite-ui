"use client";

import * as React from "react";
import { useMemo } from "react";
import { Video } from "@page-speed/video";
import { cn } from "../../../lib/utils";
import type {
  ActionConfig,
  MediaItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";
import {
  ContentGroup,
  type ContentGroupItem,
} from "@/components/ui/content-group";

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
   * Background video configuration
   */
  backgroundVideo?: MediaItem;
  /**
   * Custom slot for video (overrides backgroundVideo prop)
   */
  videoSlot?: React.ReactNode;
  /**
   * @deprecated Use backgroundVideo instead
   */
  videoSrc?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroPresentationPlatformVideo({
  sectionId = "hero-presentation-platform-video",
  subtitle,
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  backgroundVideo,
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
  const contentItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (subtitle) {
      if (typeof subtitle === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: "font-light uppercase",
          children: subtitle,
        });
      } else {
        items.push(subtitle);
      }
    }

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h1",
          className: cn(
            "text-5xl font-medium md:text-6xl lg:text-7xl text-pretty",
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
            "my-0 md:my-8 md:text-xl text-balance",
            descriptionClassName,
          ),
          children: description,
        });
      } else {
        items.push(description);
      }
    }

    return items;
  }, [subtitle, heading, headingClassName, description, descriptionClassName]);

  const renderVideo = useMemo(() => {
    if (videoSlot) return videoSlot;

    return (
      <div
        className={cn(
          "relative hidden h-[720px] w-[45%] overflow-hidden rounded-l-full bg-foreground lg:block",
          videoClassName,
        )}
      >
        <Video
          src={backgroundVideo?.video?.src || videoSrc}
          masterPlaylistUrl={backgroundVideo?.video?.masterPlaylistUrl}
          fallbackSrc={backgroundVideo?.video?.fallbackSrc}
          poster={backgroundVideo?.video?.poster || backgroundVideo?.image?.src}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          data-wf-ignore="true"
          data-object-fit="cover"
          className="h-full w-full rounded-tl-xl object-cover"
          {...backgroundVideo?.video}
        />
      </div>
    );
  }, [videoSlot, backgroundVideo, videoSrc, videoClassName]);

  return (
    <Section
      id={sectionId}
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
          <ContentGroup items={contentItems} />

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
