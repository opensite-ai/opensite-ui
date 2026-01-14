"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig, StatItem, LogoItem, OptixFlowConfig } from "../../../src/types";

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
}

export function AboutDeveloperStory({
  className,
  containerClassName,
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
}: AboutDeveloperStoryProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-wrap justify-center gap-4", actionsClassName)}>
        {actions.map((action, idx) => (
          <Pressable
            key={idx}
            href={action.href}
            onClick={action.onClick}
            size={action.size || "lg"}
            variant={action.variant || "default"}
            asButton
          >
            {action.label}
            {idx === 1 && <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />}
          </Pressable>
        ))}
      </div>
    );
  };

  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <div className={cn("mt-20 flex flex-wrap items-center justify-center gap-8 opacity-60", logosClassName)}>
        {logos.map((logo, idx) => {
          const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;
          return (
            <Img
              key={idx}
              src={logoSrc}
              alt={logo.alt}
              className="h-8 w-auto grayscale"
              optixFlowConfig={optixFlowConfig}
            />
          );
        })}
      </div>
    );
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className={cn("mt-20 grid grid-cols-1 gap-8 border-y py-12 md:grid-cols-3", statsClassName)}>
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            {stat.value && (
              typeof stat.value === "string" ? (
                <p className="text-4xl font-bold">{stat.value}</p>
              ) : (
                stat.value
              )
            )}
            {stat.label && (
              typeof stat.label === "string" ? (
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              ) : (
                <div className="mt-2">{stat.label}</div>
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          {title && (
            typeof title === "string" ? (
              <h1 className={cn("text-4xl font-bold tracking-tight md:text-6xl", titleClassName)}>
                {title}
              </h1>
            ) : (
              <div className={titleClassName}>{title}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("max-w-2xl text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderActions()}
        </div>

        {renderLogos()}
        {renderStats()}

        <div className="mt-20 grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            {storyTitle && (
              typeof storyTitle === "string" ? (
                <h2 className={cn("text-3xl font-bold md:text-4xl", storyTitleClassName)}>{storyTitle}</h2>
              ) : (
                <div className={storyTitleClassName}>{storyTitle}</div>
              )
            )}
            {storyContent && (
              typeof storyContent === "string" ? (
                <p className={cn("mt-6 text-lg text-muted-foreground whitespace-pre-line", storyContentClassName)}>
                  {storyContent}
                </p>
              ) : (
                <div className={cn("mt-6", storyContentClassName)}>{storyContent}</div>
              )
            )}
          </div>
          {storyImage && (
            <Img
              src={storyImage.src}
              alt={storyImage.alt}
              className={cn("rounded-2xl object-cover", storyImageClassName)}
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>
      </div>
    </section>
  );
}
