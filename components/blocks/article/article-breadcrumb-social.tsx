"use client";

import * as React from "react";
import { cn, getProseClassName } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";

import { Section } from "../../ui/section";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { SocialShare } from "@page-speed/social-share";

export interface ArticleBreadcrumbSection {
  id: string;
  title: string;
}

export interface BreadcrumbItemConfig {
  label: string;
  href: string;
}

export interface ArticleAuthorConfig {
  name?: string;
  image?: string;
  role?: string;
}

export interface ArticleBreadcrumbSocialProps {
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
   * Additional CSS classes for the article content area
   */
  articleClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the author section
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  heroImageClassName?: string;
  /**
   * Additional CSS classes for the TOC container
   */
  tocClassName?: string;
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
   * Author configuration
   */
  author?: ArticleAuthorConfig;
  /**
   * Custom slot for rendering author info (overrides author config)
   */
  authorSlot?: React.ReactNode;
  /**
   * Publish date text
   */
  publishDate?: React.ReactNode;
  /**
   * Read time text
   */
  readTime?: React.ReactNode;
  /**
   * Table of contents sections
   */
  sections?: ArticleBreadcrumbSection[];
  /**
   * Custom slot for rendering TOC (overrides sections array)
   */
  tocSlot?: React.ReactNode;
  /**
   * Render callback for section links (overrides default rendering)
   */
  renderSectionLink?: (
    section: ArticleBreadcrumbSection,
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
   * Enable scroll-based TOC tracking
   */
  enableTocTracking?: boolean;
  /**
   * Enable back to top button
   */
  enableBackToTop?: boolean;
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

export function ArticleBreadcrumbSocialComponent({
  className,
  breadcrumbClassName,
  articleClassName,
  sidebarClassName,
  titleClassName,
  authorClassName,
  heroImageClassName,
  tocClassName,
  breadcrumbs,
  breadcrumbsSlot,
  currentPage,
  title,
  description,
  author,
  authorSlot,
  publishDate,
  readTime,
  sections,
  tocSlot,
  renderSectionLink,
  heroImageSrc,
  heroImageAlt,
  heroMediaSlot,
  children,
  enableTocTracking,
  enableBackToTop,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "hero",
  pattern,
  patternOpacity,
  patternClassName,
}: ArticleBreadcrumbSocialProps) {
  const [activeSection, setActiveSection] = React.useState<string>(
    sections?.[0]?.id || "",
  );
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    if (!enableTocTracking || !sections || sections.length === 0) return;

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

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections, enableTocTracking]);

  React.useEffect(() => {
    if (!enableBackToTop) return;

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableBackToTop]);

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const breadcrumbsContent = React.useMemo(() => {
    if (breadcrumbsSlot) return breadcrumbsSlot;
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
      <Breadcrumb className={cn("mb-8", breadcrumbClassName)}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Pressable href="#">
                <DynamicIcon name="lucide/home" size={16} />
              </Pressable>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Pressable href={crumb.href}>{crumb.label}</Pressable>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
          {currentPage && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {typeof currentPage === "string" ? currentPage : currentPage}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }, [breadcrumbsSlot, breadcrumbs, currentPage, breadcrumbClassName]);

  const authorContent = React.useMemo(() => {
    if (authorSlot) return authorSlot;
    if (!author) return null;

    return (
      <div
        className={cn(
          "mt-6 flex items-center gap-4 not-prose",
          authorClassName,
        )}
      >
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.image} />
          <AvatarFallback>{author.name?.charAt(0) || "A"}</AvatarFallback>
        </Avatar>
        <div>
          {author.name && <p className="font-medium">{author.name}</p>}
          {(author.role || publishDate || readTime) && (
            <p className="text-sm">
              {[author.role, publishDate, readTime].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>
    );
  }, [authorSlot, author, publishDate, readTime, authorClassName]);

  const heroMediaContent = React.useMemo(() => {
    if (heroMediaSlot) return heroMediaSlot;
    if (!heroImageSrc) return null;

    return (
      <Img
        src={heroImageSrc}
        alt={heroImageAlt}
        className={cn(
          "my-8 aspect-video w-full rounded-2xl shadow-xl object-cover",
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

  const tocContent = React.useMemo(() => {
    if (tocSlot) return tocSlot;
    if (!sections || sections.length === 0) return null;

    return (
      <div className={cn("rounded-lg border p-4", tocClassName)}>
        <h3 className="mb-4 text-sm font-semibold">On this page</h3>
        <nav className="space-y-2">
          {sections.map((section) => {
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
              >
                {section.title}
              </Pressable>
            );
          })}
        </nav>
      </div>
    );
  }, [tocSlot, sections, activeSection, renderSectionLink, tocClassName]);

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

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {children && (
            <article
              className={cn(
                getProseClassName(background, "max-w-none"),
                articleClassName,
              )}
            >
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

              {authorContent}

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

          <aside className={cn("hidden lg:block", sidebarClassName)}>
            <div className="sticky top-8 space-y-6">{tocContent}</div>
          </aside>
        </div>
      </div>

      {enableBackToTop && showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-opacity hover:opacity-90"
          aria-label="Back to top"
        >
          <DynamicIcon name="lucide/arrow-up" size={20} />
        </button>
      )}
    </Section>
  );
}

export { ArticleBreadcrumbSocialComponent as ArticleBreadcrumbSocial };
