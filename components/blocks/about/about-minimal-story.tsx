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

export interface AboutMinimalStoryProps {
  /**
   * Main heading/title
   */
  title?: React.ReactNode;
  /**
   * Story content/body text
   */
  content?: React.ReactNode;
  /**
   * Author information
   */
  author?: {
    name: string;
    role: string;
    avatar?: {
      src: string;
      alt: string;
    };
  };
  /**
   * Custom slot for rendering author (overrides author object)
   */
  authorSlot?: React.ReactNode;
  /**
   * Featured image configuration
   */
  featuredImage?: {
    src: string;
    alt: string;
  };
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
   * Additional CSS classes for the body content
   */
  bodyClassName?: string;
  /**
   * Additional CSS classes for the author section
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the featured image
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
  /** Optional Section ID */
  sectionId?: string;
}

export function AboutMinimalStory({
  sectionId = "about-minimal-story",
  title,
  content,
  author,
  authorSlot,
  featuredImage,
  className,
  contentClassName,
  titleClassName,
  bodyClassName,
  authorClassName,
  imageClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
}: AboutMinimalStoryProps): React.JSX.Element {
  const authorContent = useMemo(() => {
    if (authorSlot) return authorSlot;
    if (!author) return null;

    return (
      <div className={cn("mb-12 flex items-center gap-4", authorClassName)}>
        {author.avatar ? (
          <Img
            src={author.avatar.src}
            alt={author.avatar.alt}
            className="h-16 w-16 rounded-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        ) : null}
        <div>
          <p className="font-semibold">{author.name}</p>
          <p className="text-sm">{author.role}</p>
        </div>
      </div>
    );
  }, [authorSlot, author, authorClassName, optixFlowConfig, background]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className={cn("mx-auto max-w-3xl", contentClassName)}>
        {(authorSlot || author) && authorContent}

        {title &&
          (typeof title === "string" ? (
            <h1
              className={cn(
                "text-4xl font-bold tracking-tight md:text-5xl",
                titleClassName,
              )}
            >
              {title}
            </h1>
          ) : (
            title
          ))}

        {content &&
          (typeof content === "string" ? (
            <p
              className={cn(
                "mt-8 text-lg leading-relaxed whitespace-pre-line",
                bodyClassName,
              )}
            >
              {content}
            </p>
          ) : (
            content
          ))}

        {featuredImage && (
          <Img
            src={featuredImage.src}
            alt={featuredImage.alt}
            className={cn(
              "mt-6 md:mt-12 w-full",
              "shadow-xl rounded-2xl object-cover",
              imageClassName,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        )}
      </div>
    </Section>
  );
}
