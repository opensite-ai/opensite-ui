"use client";

import * as React from "react";
import { cn, getProseClassName } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import type {
  OptixFlowConfig,
  SocialLinkItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface ArticleCompactTocSection {
  id: string;
  title: string;
}

export interface BreadcrumbItemConfig {
  label: string;
  href: string;
}

export interface ArticleCompactTocProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the breadcrumb
   */
  breadcrumbClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the meta info
   */
  metaClassName?: string;
  /**
   * Additional CSS classes for the share section
   */
  shareClassName?: string;
  /**
   * Additional CSS classes for the TOC
   */
  tocClassName?: string;
  /**
   * Additional CSS classes for the article content
   */
  articleClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  heroImageClassName?: string;
  /**
   * Breadcrumb navigation items
   */
  breadcrumbs?: BreadcrumbItemConfig[];
  /**
   * Custom slot for rendering breadcrumbs (overrides breadcrumbs array)
   */
  breadcrumbsSlot?: React.ReactNode;
  /**
   * Current page name in breadcrumb
   */
  currentPage?: React.ReactNode;
  /**
   * Article title
   */
  title?: React.ReactNode;
  /**
   * Author name
   */
  authorName?: React.ReactNode;
  /**
   * Author profile href
   */
  authorHref?: string;
  /**
   * Publish date string
   */
  publishDate?: React.ReactNode;
  /**
   * Read time string
   */
  readTime?: React.ReactNode;
  /**
   * TOC sections array
   */
  sections?: ArticleCompactTocSection[];
  /**
   * Custom slot for TOC (overrides sections array)
   */
  tocSlot?: React.ReactNode;
  /**
   * Render callback for section links (overrides default rendering)
   */
  renderSectionLink?: (
    section: ArticleCompactTocSection,
    isActive: boolean,
  ) => React.ReactNode;
  /**
   * Social share links
   */
  socialLinks?: SocialLinkItem[];
  /**
   * Custom slot for share buttons (overrides socialLinks)
   */
  shareSlot?: React.ReactNode;
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
   * Enable scroll-based section tracking
   * @default true
   */
  enableTocTracking?: boolean;
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
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
}

export function ArticleCompactTocComponent({
  className,
  breadcrumbClassName,
  contentClassName,
  titleClassName,
  metaClassName,
  shareClassName,
  tocClassName,
  articleClassName,
  heroImageClassName,
  breadcrumbs,
  breadcrumbsSlot,
  currentPage,
  title,
  authorName,
  authorHref,
  publishDate,
  readTime,
  sections,
  tocSlot,
  renderSectionLink,
  socialLinks,
  shareSlot,
  heroImageSrc,
  heroImageAlt,
  heroMediaSlot,
  children,
  enableTocTracking = true,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "hero",
  pattern,
  patternOpacity,
  patternClassName,
}: ArticleCompactTocProps) {
  const [activeSection, setActiveSection] = React.useState<string>(
    sections?.[0]?.id || "",
  );
  const [isTocOpen, setIsTocOpen] = React.useState(false);

  React.useEffect(() => {
    if (!enableTocTracking) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" },
    );

    sections?.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections, enableTocTracking]);

  const breadcrumbsContent = React.useMemo(() => {
    if (breadcrumbsSlot) return breadcrumbsSlot;
    if (!breadcrumbs && !currentPage) return null;

    return (
      <Breadcrumb className={cn("mb-6 md:mb-20", breadcrumbClassName)}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Pressable href="#">
                <DynamicIcon name="lucide/home" size={16} />
              </Pressable>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs?.map((crumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Pressable href={crumb.href}>{crumb.label}</Pressable>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }, [breadcrumbsSlot, breadcrumbs, currentPage, breadcrumbClassName]);

  const shareContent = React.useMemo(() => {
    if (shareSlot) return shareSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div className={cn("mt-6 flex items-center gap-2", shareClassName)}>
        <span className="text-sm">Share:</span>
        {socialLinks.map((link, index) => (
          <Pressable
            key={index}
            href={link.href}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
            aria-label={link["aria-label"] || `Share on ${link.platform}`}
          >
            <DynamicIcon name={`lucide/${link.platform}`} size={16} />
          </Pressable>
        ))}
      </div>
    );
  }, [shareSlot, socialLinks, shareClassName]);

  const renderTocLinks = React.useCallback(
    (onLinkClick?: () => void) => {
      if (!sections) return null;
      return sections.map((section) => {
        const isActive = activeSection === section.id;
        if (renderSectionLink) {
          return (
            <React.Fragment key={section.id}>
              {renderSectionLink(section, isActive)}
            </React.Fragment>
          );
        }
        return (
          <Pressable
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "block text-sm transition-colors",
              isActive ? "underline" : "",
            )}
            onClick={onLinkClick}
          >
            {section.title}
          </Pressable>
        );
      });
    },
    [sections, activeSection, renderSectionLink],
  );

  const tocContent = React.useMemo(() => {
    if (tocSlot) return tocSlot;
    if (!sections || sections.length === 0) return null;

    return (
      <div className="mb-8 lg:hidden">
        <Popover open={isTocOpen} onOpenChange={setIsTocOpen}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center justify-between rounded-lg border p-4",
                tocClassName,
              )}
            >
              <span className="text-sm font-medium">Table of Contents</span>
              <DynamicIcon
                name={isTocOpen ? "lucide/chevron-up" : "lucide/chevron-down"}
                size={16}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-(--radix-popover-trigger-width) space-y-2 p-4"
          >
            {renderTocLinks(() => setIsTocOpen(false))}
          </PopoverContent>
        </Popover>
      </div>
    );
  }, [tocSlot, sections, isTocOpen, tocClassName, renderTocLinks]);

  const desktopTocContent = React.useMemo(() => {
    if (tocSlot) return null;
    if (!sections || sections.length === 0) return null;

    return (
      <aside
        className={cn(
          "hidden lg:block fixed top-24 right-8 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto",
          tocClassName,
        )}
      >
        <nav className="space-y-2 rounded-lg border p-4">
          <span className="mb-3 block text-sm font-semibold">
            Table of Contents
          </span>
          {renderTocLinks()}
        </nav>
      </aside>
    );
  }, [tocSlot, sections, tocClassName, renderTocLinks]);

  const heroMediaContent = React.useMemo(() => {
    if (heroMediaSlot) return heroMediaSlot;
    if (!heroImageSrc) return null;

    return (
      <Img
        src={heroImageSrc}
        alt={heroImageAlt}
        className={cn(
          "my-8 aspect-video w-full rounded-lg object-cover",
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
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={cn(pattern && "overflow-visible", className)}
      containerClassName={containerClassName}
    >
      {desktopTocContent}
      <div className="relative">
        {breadcrumbsContent}

        <div className="relative">
          {title &&
            (typeof title === "string" ? (
              <h1
                className={cn(
                  "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
                  titleClassName,
                )}
              >
                {title}
              </h1>
            ) : (
              title
            ))}

          {(authorName || publishDate || readTime) && (
            <div
              className={cn(
                "mt-4 flex flex-wrap items-center gap-4 text-sm",
                metaClassName,
              )}
            >
              {authorName && (
                <Pressable href={authorHref}>{authorName}</Pressable>
              )}
              {authorName && publishDate && (
                <Separator orientation="vertical" className="h-4" />
              )}
              {publishDate && <span>{publishDate}</span>}
              {publishDate && readTime && (
                <Separator orientation="vertical" className="h-4" />
              )}
              {readTime && <span>{readTime}</span>}
            </div>
          )}

          {shareContent}

          {tocContent}

          {children && (
            <article
              className={cn(
                getProseClassName(background, "max-w-none"),
                articleClassName,
              )}
            >
              {heroMediaContent}
              {children}
            </article>
          )}
        </div>
      </div>
    </Section>
  );
}

export { ArticleCompactTocComponent as ArticleCompactToc };
