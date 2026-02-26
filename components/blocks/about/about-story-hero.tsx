"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";

export interface AboutStoryHeroProps {
  /**
   * Main heading/title
   */
  title?: React.ReactNode;
  /**
   * Subtitle/tagline text
   */
  subtitle?: React.ReactNode;
  /**
   * Main content/body text
   */
  content?: React.ReactNode;
  /**
   * Hero image configuration
   */
  heroImage?: {
    src: string;
    alt: string;
  };
  /**
   * Team information section
   */
  teamInfo?: {
    title: React.ReactNode;
    description: React.ReactNode;
  };
  /**
   * Custom slot for rendering team info (overrides teamInfo object)
   */
  teamInfoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the body content
   */
  bodyClassName?: string;
  /**
   * Additional CSS classes for the team info section
   */
  teamInfoClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Section background variant
   */
  background?: SectionBackground;
  /**
   * Section spacing variant
   */
  spacing?: SectionSpacing;
  /**
   * Pattern background key or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
}

export function AboutStoryHero({
  title,
  subtitle,
  content,
  heroImage,
  teamInfo,
  teamInfoSlot,
  className,
  contentClassName,
  titleClassName,
  subtitleClassName,
  bodyClassName,
  teamInfoClassName,
  imageClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
}: AboutStoryHeroProps): React.JSX.Element {
  const teamInfoContent = useMemo(() => {
    if (teamInfoSlot) return teamInfoSlot;
    if (!teamInfo) return null;

    return (
      <div
        className={cn(
          "rounded-2xl bg-muted text-muted-foreground",
          "flex flex-col items-start gap-2",
          teamInfoClassName,
        )}
      >
        {teamInfo.title ? (
          typeof teamInfo.title === "string" ? (
            <h2 className="text-xl md:text-2xl font-bold">{teamInfo.title}</h2>
          ) : (
            teamInfo.title
          )
        ) : null}
        {teamInfo.description ? (
          typeof teamInfo.description === "string" ? (
            <p className="text-lg">{teamInfo.description}</p>
          ) : (
            teamInfo.description
          )
        ) : null}
      </div>
    );
  }, [teamInfoSlot, teamInfo, teamInfoClassName, background]);

  const contentItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (subtitle) {
      if (typeof subtitle === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: cn(
            "text-sm font-semibold",
            "uppercase tracking-wider opacity-65",
            subtitleClassName,
          ),
          children: subtitle,
        });
      } else {
        items.push(subtitle);
      }
    }

    if (title) {
      if (typeof title === "string") {
        items.push({
          _type: "text",
          as: "h1",
          className: cn("text-4xl font-bold tracking-tight md:text-5xl", title),
          children: title,
        });
      } else {
        items.push(title);
      }
    }

    if (content) {
      if (typeof content === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: cn("text-lg whitespace-pre-line", bodyClassName),
          children: content,
        });
      } else {
        items.push(content);
      }
    }

    return items;
  }, [
    subtitle,
    subtitleClassName,
    title,
    titleClassName,
    content,
    bodyClassName,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "grid gap-6 md:gap-12 grid-cols-1 lg:grid-cols-2 items-center",
          contentClassName,
        )}
      >
        <div className="space-y-6 md:space-y-8">
          <ContentGroup
            items={contentItems}
            className="space-y-4 md:space-y-6"
          />

          {(teamInfoSlot || teamInfo) && teamInfoContent}
        </div>
        {heroImage && (
          <Img
            src={heroImage.src}
            alt={heroImage.alt}
            className={cn(
              "w-full h-auto sm:h-full",
              "rounded-2xl object-cover shadow-xl",
              imageClassName,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        )}
      </div>
    </Section>
  );
}
