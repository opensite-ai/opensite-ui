"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import type { OptixFlowConfig } from "../../../src/types";

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
}

const defaultTeamInfo = {
  title: "50+ Team Members",
  description: "Working across 12 countries to bring you the best tools",
};

export function AboutStoryHero({
  title = "Our Story",
  subtitle = "Building the future, one line of code at a time",
  content = `We started with a bold idea: what if anyone could build professional software without years of training? This question drove us to create a platform that bridges the gap between imagination and implementation.

Our team combines decades of experience in software engineering, design, and user experience. We've worked at companies like Google, Meta, and Stripe, and we've brought that expertise to bear on solving one of technology's most persistent challenges.

The result is a platform that's powerful enough for professional developers yet accessible enough for anyone with an idea. We're not just building tools—we're democratizing software development.`,
  heroImage,
  teamInfo = defaultTeamInfo,
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
}: AboutStoryHeroProps): React.JSX.Element {
  const renderTeamInfo = () => {
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
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
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
            {(teamInfoSlot || teamInfo) && renderTeamInfo()}
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
      </div>
    </section>
  );
}
