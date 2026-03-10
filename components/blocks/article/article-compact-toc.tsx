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
import { SocialShare } from "@page-speed/social-share";

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
   * Article summary/description
   */
  description?: string;
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
  description,
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

  const hasDesktopToc = !tocSlot && sections && sections.length > 0;

  const desktopTocContent = React.useMemo(() => {
    if (!hasDesktopToc) return null;

    return (
      <aside className={cn("hidden lg:block w-64 shrink-0", tocClassName)}>
        <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto space-y-2 rounded-lg border p-4">
          <span className="mb-3 block text-sm font-semibold">
            Table of Contents
          </span>
          {renderTocLinks()}
        </nav>
      </aside>
    );
  }, [hasDesktopToc, tocClassName, renderTocLinks]);

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
      <div className="relative">
        {breadcrumbsContent}

        <div className={cn("relative", hasDesktopToc && "lg:flex lg:gap-8")}>
          <div className={cn(hasDesktopToc && "min-w-0 lg:flex-1")}>
            {title &&
              (typeof title === "string" ? (
                <h1
                  className={cn(
                    "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-6",
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
                  "mt-4 flex flex-wrap items-center gap-2 md:gap-4 text-sm mb-6 md:mb-12",
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

                <div className="flex items-center justify-center py-24">
                  <SocialShare
                    variant="combo"
                    postTitle={title && typeof title === "string" ? title : ""}
                    shareUrl={window?.location?.href}
                    summaryContent={
                      description && typeof description === "string"
                        ? description
                        : ""
                    }
                    disableImageAttachments
                  />
                </div>
              </article>
            )}
          </div>

          {desktopTocContent}
        </div>
      </div>
    </Section>
  );
}

export { ArticleCompactTocComponent as ArticleCompactToc };
