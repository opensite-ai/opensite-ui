"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface ArticleSidebarStickyProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the article content
   */
  articleClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the author info
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  heroImageClassName?: string;
  /**
   * Additional CSS classes for the back link
   */
  backLinkClassName?: string;
  /**
   * Back link href
   */
  backHref?: string;
  /**
   * Back link text
   */
  backText?: React.ReactNode;
  /**
   * Back link icon (defaults to chevron-left)
   */
  backIcon?: React.ReactNode;
  /**
   * Custom slot for back link (overrides backHref, backText, backIcon)
   */
  backLinkSlot?: React.ReactNode;
  /**
   * Article title
   */
  title?: React.ReactNode;
  /**
   * Author name
   */
  authorName?: string;
  /**
   * Author image URL
   */
  authorImage?: string;
  /**
   * Author profile href
   */
  authorHref?: string;
  /**
   * Publish date string
   */
  publishDate?: React.ReactNode;
  /**
   * Custom slot for author info (overrides author props)
   */
  authorSlot?: React.ReactNode;
  /**
   * Hero image source URL
   */
  heroImageSrc?: string;
  /**
   * Hero image alt text
   */
  heroImageAlt?: string;
  /**
   * Custom slot for hero media (overrides heroImageSrc)
   */
  heroMediaSlot?: React.ReactNode;
  /**
   * Article body content (replaces hardcoded prose)
   */
  children?: React.ReactNode;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
}

export function ArticleSidebarStickyComponent({
  className,
  containerClassName,
  sidebarClassName,
  articleClassName,
  titleClassName,
  authorClassName,
  heroImageClassName,
  backLinkClassName,
  backHref,
  backText,
  backIcon,
  backLinkSlot,
  title,
  authorName,
  authorImage,
  authorHref,
  publishDate,
  authorSlot,
  heroImageSrc,
  heroImageAlt,
  heroMediaSlot,
  children,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ArticleSidebarStickyProps) {
  const backLinkContent = React.useMemo(() => {
    if (backLinkSlot) return backLinkSlot;
    if (!backHref && !backText) return null;

    return (
      <Pressable
        href={backHref}
        className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground", backLinkClassName)}
      >
        {backIcon ?? <DynamicIcon name="lucide/chevron-left" size={16} />}
        {backText}
      </Pressable>
    );
  }, [backLinkSlot, backHref, backText, backIcon, backLinkClassName]);

  const renderAuthor = React.useCallback((isMobile = false) => {
    if (authorSlot) return authorSlot;
    if (!authorName) return null;

    const avatarSize = isMobile ? "h-8 w-8" : "h-10 w-10";

    return (
      <div className={cn("flex items-center gap-3", authorClassName)}>
        <Avatar className={avatarSize}>
          <AvatarImage src={authorImage} />
          <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          {authorHref ? (
            <Pressable href={authorHref} className="text-sm font-medium hover:underline">
              {authorName}
            </Pressable>
          ) : (
            <p className="text-sm font-medium">{authorName}</p>
          )}
          {publishDate && (
            <p className="text-xs text-muted-foreground">{publishDate}</p>
          )}
        </div>
      </div>
    );
  }, [authorSlot, authorName, authorImage, authorHref, publishDate, authorClassName]);

  const heroMediaContent = React.useMemo(() => {
    if (heroMediaSlot) return heroMediaSlot;
    if (!heroImageSrc) return null;

    return (
      <Img
        src={heroImageSrc}
        alt={heroImageAlt}
        className={cn("my-8 aspect-video w-full rounded-lg object-cover", heroImageClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [heroMediaSlot, heroImageSrc, heroImageAlt, heroImageClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("container", containerClassName)}>
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,2fr)]">
          <aside className={cn("hidden lg:block", sidebarClassName)}>
            <div className="sticky top-8 space-y-6">
              {backLinkContent}
              <div className="space-y-4">
                {renderAuthor(false)}
              </div>
            </div>
          </aside>
          <article className={cn("prose max-w-none dark:prose-invert", articleClassName)}>
            <div className="mb-8 lg:hidden">
              {backLinkContent}
            </div>
            {title && (
              typeof title === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl", titleClassName)}>
                  {title}
                </h1>
              ) : (
                <div className={titleClassName}>{title}</div>
              )
            )}
            <div className="not-prose mt-4 lg:hidden">
              {renderAuthor(true)}
            </div>
            {heroMediaContent}
            {children}
          </article>
        </div>
      </div>
    </Section>
  );
}

export { ArticleSidebarStickyComponent as ArticleSidebarSticky };
