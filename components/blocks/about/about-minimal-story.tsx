"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import type { OptixFlowConfig } from "../../../src/types";

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
}

export function AboutMinimalStory({
  title,
  content,
  author,
  authorSlot,
  featuredImage,
  className,
  containerClassName,
  contentClassName,
  titleClassName,
  bodyClassName,
  authorClassName,
  imageClassName,
  optixFlowConfig,
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
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            {author.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold">{author.name}</p>
          <p className="text-sm text-muted-foreground">{author.role}</p>
        </div>
      </div>
    );
  }, [authorSlot, author, authorClassName, optixFlowConfig]);

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-3xl", contentClassName)}>
          {(authorSlot || author) && authorContent}

          {title && (
            typeof title === "string" ? (
              <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl", titleClassName)}>
                {title}
              </h1>
            ) : (
              <div className={titleClassName}>{title}</div>
            )
          )}

          {content && (
            typeof content === "string" ? (
              <p className={cn("mt-8 text-lg leading-relaxed text-muted-foreground whitespace-pre-line", bodyClassName)}>
                {content}
              </p>
            ) : (
              <div className={cn("mt-8", bodyClassName)}>{content}</div>
            )
          )}

          {featuredImage && (
            <Img
              src={featuredImage.src}
              alt={featuredImage.alt}
              className={cn("mt-12 w-full rounded-2xl object-cover", imageClassName)}
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>
      </div>
    </section>
  );
}
