"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type {
  OptixFlowConfig,
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface ArticleTocSection {
  id: string;
  title: string;
}

export interface ArticleTocSidebarProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the article content
   */
  articleClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the header section
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the author info
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the TOC
   */
  tocClassName?: string;
  /**
   * Additional CSS classes for the CTA section
   */
  ctaClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  heroImageClassName?: string;
  /**
   * Article title
   */
  title?: React.ReactNode;
  /**
   * Article description
   */
  description?: React.ReactNode;
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
   * Read time string
   */
  readTime?: React.ReactNode;
  /**
   * Custom slot for author info (overrides author props)
   */
  authorSlot?: React.ReactNode;
  /**
   * Category badge text
   */
  category?: React.ReactNode;
  /**
   * Custom slot for category badge (overrides category)
   */
  categorySlot?: React.ReactNode;
  /**
   * TOC sections array
   */
  sections?: ArticleTocSection[];
  /**
   * Custom slot for TOC (overrides sections array)
   */
  tocSlot?: React.ReactNode;
  /**
   * Render callback for section links (overrides default rendering)
   */
  renderSectionLink?: (
    section: ArticleTocSection,
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
   * CTA section title
   */
  ctaTitle?: React.ReactNode;
  /**
   * CTA section description
   */
  ctaDescription?: React.ReactNode;
  /**
   * CTA actions
   */
  ctaActions?: ActionConfig[];
  /**
   * Custom slot for CTA section (overrides CTA props)
   */
  ctaSlot?: React.ReactNode;
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

export function ArticleTocSidebarComponent({
  className,
  articleClassName,
  sidebarClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  authorClassName,
  tocClassName,
  ctaClassName,
  heroImageClassName,
  title,
  description,
  authorName,
  authorImage,
  authorHref,
  publishDate,
  readTime,
  authorSlot,
  category,
  categorySlot,
  sections,
  tocSlot,
  renderSectionLink,
  heroImageSrc,
  heroImageAlt,
  heroMediaSlot,
  ctaTitle,
  ctaDescription,
  ctaActions,
  ctaSlot,
  children,
  enableTocTracking = true,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "hero",
  pattern,
  patternOpacity,
  patternClassName,
}: ArticleTocSidebarProps) {
  const [activeSection, setActiveSection] = React.useState<string>(
    sections?.[0]?.id || "",
  );

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

  const categoryContent = React.useMemo(() => {
    if (categorySlot) return categorySlot;
    if (!category) return null;

    return <Badge>{category}</Badge>;
  }, [categorySlot, category]);

  const authorContent = React.useMemo(() => {
    if (authorSlot) return authorSlot;
    if (!authorName) return null;

    return (
      <div className={cn("mt-6 flex items-center gap-4", authorClassName)}>
        <Avatar className="h-10 w-10">
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
          <p className="text-xs">
            {publishDate}
            {readTime && <> · {readTime}</>}
          </p>
        </div>
      </div>
    );
  }, [
    authorSlot,
    authorName,
    authorImage,
    authorHref,
    publishDate,
    readTime,
    authorClassName,
  ]);

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

  const tocContent = React.useMemo(() => {
    if (tocSlot) return tocSlot;
    if (!sections || sections.length === 0) return null;

    return (
      <div className={cn("rounded-lg border p-4", tocClassName)}>
        <h3 className="mb-4 text-sm font-semibold">Table of Contents</h3>
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
                  isActive ? "font-medium" : "",
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

  const ctaContent = React.useMemo(() => {
    if (ctaSlot) return ctaSlot;
    if (
      !ctaTitle &&
      !ctaDescription &&
      (!ctaActions || ctaActions.length === 0)
    )
      return null;

    return (
      <div className={cn("rounded-lg border p-4", ctaClassName)}>
        {ctaTitle &&
          (typeof ctaTitle === "string" ? (
            <h3 className="mb-2 text-sm font-semibold">{ctaTitle}</h3>
          ) : (
            ctaTitle
          ))}
        {ctaDescription &&
          (typeof ctaDescription === "string" ? (
            <p className="mb-4 text-sm">{ctaDescription}</p>
          ) : (
            <div className="mb-4">{ctaDescription}</div>
          ))}
        {ctaActions && ctaActions.length > 0 && (
          <div className="flex flex-col gap-2">
            {ctaActions.map((action, index) => {
              const {
                label,
                icon,
                iconAfter,
                children: actionChildren,
                className: actionClassName,
                ...pressableProps
              } = action;
              return (
                <Pressable
                  key={index}
                  asButton
                  className={actionClassName}
                  {...pressableProps}
                >
                  {actionChildren ?? (
                    <>
                      {icon}
                      {label}
                      {iconAfter}
                    </>
                  )}
                </Pressable>
              );
            })}
          </div>
        )}
      </div>
    );
  }, [ctaSlot, ctaTitle, ctaDescription, ctaActions, ctaClassName]);

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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className={cn("prose max-w-none", articleClassName)}>
            <div className={cn("mb-8 not-prose", headerClassName)}>
              {categoryContent}
              {title &&
                (typeof title === "string" ? (
                  <h1
                    className={cn(
                      "mt-4 text-2xl font-bold tracking-tight md:text-4xl",
                      titleClassName,
                    )}
                  >
                    {title}
                  </h1>
                ) : (
                  title
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p className={cn("mt-4 text-lg", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  description
                ))}
              {authorContent}
            </div>

            {heroMediaContent}

            {children}
          </article>

          <aside className={cn("hidden lg:block", sidebarClassName)}>
            <div className="sticky top-8 space-y-6">
              {tocContent}
              {ctaContent}
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}

export { ArticleTocSidebarComponent as ArticleTocSidebar };
