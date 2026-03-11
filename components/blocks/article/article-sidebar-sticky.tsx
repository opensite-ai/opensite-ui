"use client";

import * as React from "react";
import { cn, getProseClassName } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import type { MarkdownStylesMap } from "@page-speed/markdown-to-jsx";
import { Section } from "../../ui/section";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { SocialShare } from "@page-speed/social-share";
import { LongformContent } from "@/components/ui/longform-content";

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
   * Optional Summary to be placed below the title
   */
  summary?: React.ReactNode;
  /**
   * Additional CSS classes for the summary
   */
  summaryClassName?: string;
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
   * Render mode for content
   * @default "jsx"
   */
  renderMode?: "jsx" | "markdown";
  /**
   * Markdown string to render (when renderMode is "markdown")
   */
  markdownString?: string;
  /**
   * Custom className mappings for markdown elements
   * @example { h2: 'text-3xl font-bold', img: 'rounded-lg shadow-md' }
   */
  markdownStyles?: MarkdownStylesMap;
  /**
   * Sidebar content
   */
  sidebarContent?: React.ReactNode;
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
  /** Optional Section ID */
  sectionId?: string;
}

export function ArticleSidebarStickyComponent({
  sectionId = "article-sidebar-sticky",
  className,
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
  summary,
  summaryClassName,
  authorName,
  authorImage,
  authorHref,
  publishDate,
  authorSlot,
  heroImageSrc,
  heroImageAlt,
  heroMediaSlot,
  children,
  renderMode = "jsx",
  markdownString,
  markdownStyles,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "hero",
  pattern,
  patternOpacity,
  sidebarContent,
}: ArticleSidebarStickyProps) {
  const backLinkContent = React.useMemo(() => {
    if (backLinkSlot) return backLinkSlot;
    if (!backHref && !backText) return null;

    return (
      <Pressable
        href={backHref}
        className={cn(
          "inline-flex items-center gap-2 text-sm",
          backLinkClassName,
        )}
      >
        {backIcon ?? <DynamicIcon name="lucide/chevron-left" size={16} />}
        {backText}
      </Pressable>
    );
  }, [backLinkSlot, backHref, backText, backIcon, backLinkClassName]);

  const renderAuthor = React.useCallback(
    (isMobile = false) => {
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
              <Pressable
                href={authorHref}
                className="text-sm font-medium hover:underline"
              >
                {authorName}
              </Pressable>
            ) : (
              <p className="text-sm font-medium">{authorName}</p>
            )}
            {publishDate && <p className="text-xs">{publishDate}</p>}
          </div>
        </div>
      );
    },
    [
      authorSlot,
      authorName,
      authorImage,
      authorHref,
      publishDate,
      authorClassName,
    ],
  );

  const heroMediaContent = React.useMemo(() => {
    if (heroMediaSlot) return heroMediaSlot;
    if (!heroImageSrc) return null;

    return (
      <Img
        src={heroImageSrc}
        alt={heroImageAlt}
        className={cn(
          "my-8 aspect-video w-full rounded-xl object-cover shadow-lg",
          heroImageClassName,
        )}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [
    heroMediaSlot,
    heroImageSrc,
    heroImageAlt,
    heroImageClassName,
    optixFlowConfig,
  ]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(pattern && "overflow-visible", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,2fr)]">
          <aside className={cn("hidden lg:block", sidebarClassName)}>
            <div className="sticky top-8 space-y-6">
              {backLinkContent}
              <div className="space-y-4">{renderAuthor(false)}</div>
              {sidebarContent ? sidebarContent : null}
            </div>
          </aside>
          <article
            className={cn(
              getProseClassName(background, "max-w-none"),
              articleClassName,
            )}
          >
            <div className="mb-8 lg:hidden">{backLinkContent}</div>
            <div className="space-y-2 mb-4 md:mb-8">
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

              {summary &&
                (typeof summary === "string" ? (
                  <div className={cn("text-lg font-normal", summaryClassName)}>
                    {title}
                  </div>
                ) : (
                  summary
                ))}
            </div>

            <div className="not-prose mt-4 lg:hidden">{renderAuthor(true)}</div>
            {sidebarContent ? (
              <div className="not-prose mt-4 lg:hidden">{sidebarContent}</div>
            ) : null}
            {heroMediaContent}
            <LongformContent
              renderMode={renderMode}
              markdownString={markdownString}
              optixFlowConfig={optixFlowConfig}
              markdownStyles={markdownStyles}
            >
              {children}
            </LongformContent>

            <div className="flex items-center justify-center py-12">
              <SocialShare
                variant="combo"
                postTitle={title as string}
                summaryContent={summary as string}
              />
            </div>
          </article>
        </div>
      </div>
    </Section>
  );
}

export { ArticleSidebarStickyComponent as ArticleSidebarSticky };
