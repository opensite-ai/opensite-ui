"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  StatItem,
  LogoItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";

export interface AboutDeveloperStoryProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Main title
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Main description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Array of action configurations
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Array of logo items
   */
  logos?: LogoItem[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * Array of stat items
   */
  stats?: StatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Story section title
   */
  storyTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the story title
   */
  storyTitleClassName?: string;
  /**
   * Story section content
   */
  storyContent?: React.ReactNode;
  /**
   * Additional CSS classes for the story content
   */
  storyContentClassName?: string;
  /**
   * Story image configuration
   */
  storyImage?: {
    src: string;
    alt: string;
  };
  /**
   * Additional CSS classes for the story image
   */
  storyImageClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
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

export function AboutDeveloperStory({
  sectionId = "about-developer-story",
  className,
  title,
  titleClassName,
  description,
  descriptionClassName,
  actions,
  actionsSlot,
  actionsClassName,
  logos,
  logosSlot,
  logosClassName,
  stats,
  statsSlot,
  statsClassName,
  storyTitle,
  storyTitleClassName,
  storyContent,
  storyContentClassName,
  storyImage,
  storyImageClassName,
  optixFlowConfig,
  background,
  spacing = "xl",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
}: AboutDeveloperStoryProps): React.JSX.Element {
  const logosContent = useMemo(() => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-20 flex flex-wrap items-center justify-center gap-8 opacity-60",
          logosClassName,
        )}
      >
        {logos.map((logo, idx) => {
          if (typeof logo.src === "string") {
            return (
              <Img
                key={idx}
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto grayscale"
                optixFlowConfig={optixFlowConfig}
              />
            );
          }
          return (
            <div key={idx} className="h-8">
              <Img
                src={logo.src.light}
                alt={logo.alt}
                className="h-42 w-auto object-contain grayscale dark:hidden"
                optixFlowConfig={optixFlowConfig}
              />
              {logo.src.dark && (
                <Img
                  src={logo.src.dark}
                  alt={logo.alt}
                  className="hidden h-42 w-auto object-contain grayscale dark:block"
                  optixFlowConfig={optixFlowConfig}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }, [logosSlot, logos, logosClassName, optixFlowConfig]);

  const statsContent = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-20 grid grid-cols-1 gap-8 border-y py-12 md:grid-cols-3",
          statsClassName,
        )}
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            {stat.value &&
              (typeof stat.value === "string" ? (
                <p className="text-4xl font-bold">{stat.value}</p>
              ) : (
                stat.value
              ))}
            {stat.label &&
              (typeof stat.label === "string" ? (
                <p className="mt-2">{stat.label}</p>
              ) : (
                stat.label
              ))}
          </div>
        ))}
      </div>
    );
  }, [statsSlot, stats, statsClassName]);

  const contentItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (title) {
      if (typeof title === "string") {
        items.push({
          _type: "text",
          as: "h1",
          className: cn(
            "text-4xl font-bold tracking-tight md:text-6xl text-balance",
            titleClassName,
          ),
          children: title,
        });
      } else {
        items.push(title);
      }
    }

    if (description) {
      if (typeof description === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: cn(
            "max-w-2xl text-lg md:text-xl text-balance",
            descriptionClassName,
          ),
          children: description,
        });
      } else {
        items.push(description);
      }
    }

    return items;
  }, [title, titleClassName, description, descriptionClassName]);

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
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <ContentGroup items={contentItems} />

        <BlockActions
          actions={actions}
          actionsSlot={actionsSlot}
          actionsClassName={actionsClassName}
        />
      </div>

      {logosContent}
      {statsContent}

      <div className="mt-20 grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          {storyTitle &&
            (typeof storyTitle === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold md:text-4xl",
                  storyTitleClassName,
                )}
              >
                {storyTitle}
              </h2>
            ) : (
              storyTitle
            ))}
          {storyContent &&
            (typeof storyContent === "string" ? (
              <p
                className={cn(
                  "mt-6 text-lg whitespace-pre-line",
                  storyContentClassName,
                )}
              >
                {storyContent}
              </p>
            ) : (
              storyContent
            ))}
        </div>
        {storyImage && (
          <Img
            src={storyImage.src}
            alt={storyImage.alt}
            className={cn(
              "rounded-2xl object-cover w-full h-auto",
              storyImageClassName,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        )}
      </div>
    </Section>
  );
}
