"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  AuthorInfo,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ResourceDetailArticleHeroNavigation {
  /**
   * Back link text
   */
  backText?: React.ReactNode;
  /**
   * Back link URL
   */
  backHref?: string;
  /**
   * Custom back icon (defaults to arrow-left)
   */
  backIcon?: React.ReactNode;
}

export interface ResourceDetailArticleHeroBlog {
  /**
   * Article title
   */
  title?: React.ReactNode;
  /**
   * Author name
   */
  author?: React.ReactNode;
  /**
   * Author role/title
   */
  role?: React.ReactNode;
  /**
   * Publication date
   */
  date?: React.ReactNode;
  /**
   * Read time estimate
   */
  readTime?: React.ReactNode;
  /**
   * Author avatar image URL
   */
  imageSrc?: string;
  /**
   * Article content (prose)
   */
  content?: React.ReactNode;
}

export interface ResourceDetailArticleHeroIllustration {
  /**
   * Featured image URL
   */
  imageSrc?: string;
  /**
   * Featured image alt text
   */
  imageAlt?: string;
}

export interface ResourceDetailArticleHeroProps {
  /**
   * Navigation configuration
   */
  navigation?: ResourceDetailArticleHeroNavigation;
  /**
   * Custom slot for navigation (overrides navigation config)
   */
  navigationSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the navigation
   */
  navigationClassName?: string;
  /**
   * Blog/article configuration
   */
  blog?: ResourceDetailArticleHeroBlog;
  /**
   * Custom slot for blog meta (overrides blog title/author/date)
   */
  blogMetaSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the blog meta section
   */
  blogMetaClassName?: string;
  /**
   * Additional CSS classes for the article title
   */
  titleClassName?: string;
  /**
   * Share actions configuration
   */
  shareActions?: ActionConfig[];
  /**
   * Custom slot for share actions (overrides shareActions array)
   */
  shareActionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the share actions container
   */
  shareActionsClassName?: string;
  /**
   * Share section heading
   */
  shareHeading?: React.ReactNode;
  /**
   * Illustration/featured image configuration
   */
  illustration?: ResourceDetailArticleHeroIllustration;
  /**
   * Custom slot for illustration (overrides illustration config)
   */
  illustrationSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the illustration
   */
  illustrationClassName?: string;
  /**
   * Author info for the bottom bio section
   */
  author?: AuthorInfo;
  /**
   * Custom slot for author bio (overrides author config)
   */
  authorSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the author bio section
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the prose content
   */
  contentClassName?: string;
  /**
   * Custom slot for article content (overrides blog.content)
   */
  contentSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the outer wrapper
   */
  className?: string;
  /**
   * Hero section background style
   */
  heroBackground?: SectionBackground;
  /**
   * Hero section spacing
   */
  heroSpacing?: SectionSpacing;
  /**
   * Hero section pattern
   */
  heropattern?: PatternName | undefined;
  /**
   * Hero section pattern opacity
   */
  heroPatternOpacity?: number;
  /**
   * Additional CSS classes for the hero section
   */
  heroClassName?: string;
  /**
   * Content section background style
   */
  contentBackground?: SectionBackground;
  /**
   * Content section spacing
   */
  contentSpacing?: SectionSpacing;
  /**
   * Content section pattern
   */
  contentpattern?: PatternName | undefined;
  /**
   * Content section pattern opacity
   */
  contentPatternOpacity?: number;
  /**
   * Additional CSS classes for the content section
   */
  contentSectionClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ResourceDetailArticleHero - A full-width article hero with dark background,
 * navigation back link, title, author info, social sharing, and featured image.
 * Below is prose content with author bio section. Ideal for blog posts, articles,
 * case studies, and long-form content.
 *
 * @example
 * ```tsx
 * <ResourceDetailArticleHero
 *   navigation={{ backText: "All Articles", backHref: "/blog" }}
 *   blog={{
 *     title: "Building Sustainable Web Applications",
 *     author: "Sarah Chen",
 *     date: "December 15, 2024",
 *     readTime: "8 min read",
 *     role: "Senior Developer",
 *     imageSrc: "/avatars/sarah.jpg",
 *     content: <div>Your article content here...</div>,
 *   }}
 *   shareActions={[
 *     { icon: <LinkedInIcon />, href: "#", "aria-label": "Share on LinkedIn" },
 *   ]}
 *   illustration={{
 *     imageSrc: "/images/hero.jpg",
 *     imageAlt: "Article hero image",
 *   }}
 *   heroBackground="primary"
 *   contentBackground="white"
 * />
 * ```
 */
export function ResourceDetailArticleHero({
  className,
  navigation,
  navigationSlot,
  navigationClassName,
  blog,
  blogMetaSlot,
  blogMetaClassName,
  titleClassName,
  shareActions,
  shareActionsSlot,
  shareActionsClassName,
  shareHeading,
  illustration,
  illustrationSlot,
  illustrationClassName,
  author,
  authorSlot,
  authorClassName,
  contentClassName,
  contentSlot,
  heroBackground,
  heroSpacing,
  heroPattern,
  heroPatternOpacity,
  heroClassName,
  contentBackground,
  contentSpacing,
  contentPattern,
  contentPatternOpacity,
  contentSectionClassName,
  optixFlowConfig,
}: ResourceDetailArticleHeroProps) {
  const renderedNavigation = useMemo(() => {
    if (navigationSlot) return navigationSlot;

    return (
      <div
        className={cn(
          "flex items-center gap-2 text-muted-foreground",
          navigationClassName,
        )}
      >
        <Pressable
          href={navigation?.backHref}
          className="group/nav flex items-center gap-2 transition-all duration-200 hover:gap-4"
        >
          <span className="group-hover/nav:text-primary-foreground">
            {navigation?.backIcon}
          </span>
          {navigation?.backText &&
            (typeof navigation.backText === "string" ? (
              <span className="transition-colors group-hover/nav:text-primary-foreground group-hover/nav:underline">
                {navigation.backText}
              </span>
            ) : (
              navigation.backText
            ))}
        </Pressable>
      </div>
    );
  }, [navigationSlot, navigationClassName, navigation?.backHref, navigation?.backIcon, navigation?.backText]);

  const renderedBlogMeta = useMemo(() => {
    if (blogMetaSlot) return blogMetaSlot;

    return (
      <div className={cn("space-y-2", blogMetaClassName)}>
        {blog?.author &&
          (typeof blog.author === "string" ? (
            <p className="text-lg text-muted-foreground">{blog.author}</p>
          ) : (
            blog.author
          ))}
        <p className="text-muted-foreground">
          {blog?.date &&
            (typeof blog.date === "string" ? blog.date : blog.date)}
          {blog?.date && blog?.readTime && " • "}
          {blog?.readTime &&
            (typeof blog.readTime === "string" ? blog.readTime : blog.readTime)}
        </p>
      </div>
    );
  }, [blogMetaSlot, blogMetaClassName, blog?.author, blog?.date, blog?.readTime]);

  const renderShareActions = useCallback((variant: "hero" | "content") => {
    if (shareActionsSlot) return shareActionsSlot;
    if (!shareActions || shareActions.length === 0) return null;

    const isHero = variant === "hero";
    const baseClassName = isHero
      ? "group/btn h-12 w-12 rounded-full border-border/10 bg-muted/20 transition-colors hover:bg-transparent hover:text-muted"
      : "group/btn h-12 w-12 rounded-full border-border bg-muted transition-colors hover:bg-transparent hover:text-muted";

    return (
      <div className={cn("flex gap-3", shareActionsClassName)}>
        {shareActions.map((action, index) => {
          const {
            icon,
            iconAfter,
            children,
            className: actionClassName,
            label,
            ...pressableProps
          } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={cn(baseClassName, actionClassName)}
              {...pressableProps}
            >
              {children ?? (
                <>
                  {icon}
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  }, [shareActionsSlot, shareActions, shareActionsClassName]);

  const renderedIllustration = useMemo(() => {
    if (illustrationSlot) return illustrationSlot;

    return (
      <div
        className={cn("aspect-video min-h-96 w-full", illustrationClassName)}
      >
        {illustration?.imageSrc && (
          <Img
            src={illustration.imageSrc}
            alt={illustration.imageAlt || ""}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        )}
      </div>
    );
  }, [illustrationSlot, illustrationClassName, illustration?.imageSrc, illustration?.imageAlt, optixFlowConfig]);

  const renderedAuthor = useMemo(() => {
    if (authorSlot) return authorSlot;

    return (
      <div className={cn("flex items-center gap-3", authorClassName)}>
        <Avatar className="size-12 border xl:size-16">
          {author?.avatarSrc && <AvatarImage src={author.avatarSrc} />}
          <AvatarFallback>
            {typeof author?.name === "string" ? author.name : ""}
          </AvatarFallback>
        </Avatar>
        <div>
          {author?.name &&
            (typeof author.name === "string" ? (
              <p className="font-medium">{author.name}</p>
            ) : (
              author.name
            ))}
          {author?.role &&
            (typeof author.role === "string" ? (
              <p className="text-sm text-muted-foreground">{author.role}</p>
            ) : (
              author.role
            ))}
        </div>
      </div>
    );
  }, [authorSlot, authorClassName, author?.avatarSrc, author?.name, author?.role]);

  const renderedContent = useMemo(() => {
    if (contentSlot) return contentSlot;
    return blog?.content;
  }, [contentSlot, blog?.content]);

  return (
    <div className={cn(className)}>
      <Section
        background={heroBackground}
        spacing={heroSpacing}
        pattern={heroPattern}
        patternOpacity={heroPatternOpacity}
        className={cn("text-primary-foreground", heroClassName)}
      >
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <div className="flex h-full max-w-md flex-col justify-between gap-8">
            <div className="space-y-6">
              {renderedNavigation}
              {blog?.title &&
                (typeof blog.title === "string" ? (
                  <h1
                    className={cn(
                      "text-3xl leading-tight font-medium",
                      titleClassName,
                    )}
                  >
                    {blog.title}
                  </h1>
                ) : (
                  <div className={titleClassName}>{blog.title}</div>
                ))}
            </div>
            <div className="flex flex-col gap-8">
              {renderedBlogMeta}
              <div className="space-y-4">
                {shareHeading &&
                  (typeof shareHeading === "string" ? (
                    <h3>{shareHeading}</h3>
                  ) : (
                    shareHeading
                  ))}
                {renderShareActions("hero")}
              </div>
            </div>
          </div>

          <div className="col-span-2 h-full w-full">{renderedIllustration}</div>
        </div>
      </Section>

      <Section
        background={contentBackground}
        spacing={contentSpacing}
        pattern={contentPattern}
        patternOpacity={contentPatternOpacity}
        className={contentSectionClassName}
      >
        <div className="mx-auto md:max-w-2xl xl:max-w-5xl">
          <div
            className={cn(
              "prose max-w-none pb-16 prose-headings:text-foreground prose-p:text-muted-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-strong:text-foreground prose-em:text-foreground prose-ol:text-muted-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground",
              contentClassName,
            )}
          >
            {renderedContent}
          </div>
          <div className="flex flex-col justify-between gap-8 border-t border-border py-8 md:flex-row">
            {renderedAuthor}
            <div className="space-y-4">
              {shareHeading &&
                (typeof shareHeading === "string" ? (
                  <h3>{shareHeading}</h3>
                ) : (
                  shareHeading
                ))}
              {renderShareActions("content")}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
