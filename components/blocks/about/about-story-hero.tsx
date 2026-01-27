"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

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
  containerClassName,
  contentClassName,
  titleClassName,
  subtitleClassName,
  bodyClassName,
  teamInfoClassName,
  imageClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: AboutStoryHeroProps): React.JSX.Element {
  const teamInfoContent = useMemo(() => {
    if (teamInfoSlot) return teamInfoSlot;
    if (!teamInfo) return null;

    return (
      <div className={cn("mt-8 rounded-xl bg-muted p-6", teamInfoClassName)}>
        {typeof teamInfo.title === "string" ? (
          <p className="text-2xl font-bold">{teamInfo.title}</p>
        ) : (
          teamInfo.title
        )}
        {typeof teamInfo.description === "string" ? (
          <p className="mt-1 text-muted-foreground">{teamInfo.description}</p>
        ) : (
          <div className="mt-1">{teamInfo.description}</div>
        )}
      </div>
    );
  }, [teamInfoSlot, teamInfo, teamInfoClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className={cn("grid gap-12 lg:grid-cols-2 lg:items-center", contentClassName)}>
          <div>
            {subtitle && (
              typeof subtitle === "string" ? (
                <p className={cn("text-sm font-semibold uppercase tracking-wider text-primary", subtitleClassName)}>
                  {subtitle}
                </p>
              ) : (
                <div className={subtitleClassName}>{subtitle}</div>
              )
            )}
            {title && (
              typeof title === "string" ? (
                <h1 className={cn("mt-4 text-4xl font-bold tracking-tight md:text-5xl", titleClassName)}>
                  {title}
                </h1>
              ) : (
                <div className={cn("mt-4", titleClassName)}>{title}</div>
              )
            )}
            {content && (
              typeof content === "string" ? (
                <p className={cn("mt-6 text-lg text-muted-foreground whitespace-pre-line", bodyClassName)}>
                  {content}
                </p>
              ) : (
                <div className={cn("mt-6", bodyClassName)}>{content}</div>
              )
            )}
            {(teamInfoSlot || teamInfo) && teamInfoContent}
          </div>
          {heroImage && (
            <Img
              src={heroImage.src}
              alt={heroImage.alt}
              className={cn("rounded-2xl object-cover", imageClassName)}
              optixFlowConfig={optixFlowConfig}
            />
          )}
      </div>
    </Section>
  );
}
