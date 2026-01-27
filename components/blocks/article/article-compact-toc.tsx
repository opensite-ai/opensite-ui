"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
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
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { OptixFlowConfig, SocialLinkItem } from "../../../src/types";

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
  renderSectionLink?: (section: ArticleCompactTocSection, isActive: boolean) => React.ReactNode;
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
}

const defaultArticleContent = () => (
  <>
    <section id="introduction">
      <h2>Introduction</h2>
      <p>
        Understanding user behavior is fundamental to creating effective
        web applications. This study examines patterns in user
        interaction and provides insights for improving user experience.
      </p>
      <p>
        Our research focuses on identifying key factors that influence
        user engagement and satisfaction in modern web applications.
      </p>
    </section>

    <section id="methodology">
      <h2>Methodology</h2>
      <p>
        We employed a mixed-methods approach combining quantitative
        analytics with qualitative user interviews. Data was collected
        from over 10,000 users across diverse demographics.
      </p>
      <p>
        Statistical analysis was performed using industry-standard tools
        to ensure reliability and validity of our findings.
      </p>
    </section>

    <section id="results">
      <h2>Results</h2>
      <p>
        Our findings reveal several key patterns in user behavior:
      </p>
      <ul>
        <li>Users prefer intuitive navigation over complex menus</li>
        <li>Page load time significantly impacts engagement</li>
        <li>Mobile-first design improves overall satisfaction</li>
        <li>Clear calls-to-action increase conversion rates</li>
      </ul>
    </section>

    <section id="discussion">
      <h2>Discussion</h2>
      <p>
        These results align with existing literature while providing new
        insights into emerging user expectations. The implications for
        web development practices are significant.
      </p>
      <blockquote>
        &ldquo;User experience is not just about usability—it&apos;s
        about creating meaningful interactions that resonate with
        users.&rdquo;
      </blockquote>
    </section>

    <section id="conclusion">
      <h2>Conclusion</h2>
      <p>
        This study provides actionable insights for developers and
        designers seeking to improve user experience. Future research
        should explore the impact of emerging technologies on user
        behavior patterns.
      </p>
    </section>
  </>
);

export function ArticleCompactTocComponent({
  className,
  containerClassName,
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
}: ArticleCompactTocProps) {
  const [activeSection, setActiveSection] = React.useState<string>(
    sections?.[0]?.id || ""
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
      { rootMargin: "-20% 0px -80% 0px" }
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
      <Breadcrumb className={cn("mb-6", breadcrumbClassName)}>
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
        <span className="text-sm text-muted-foreground">Share:</span>
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

  const tocContent = React.useMemo(() => {
    if (tocSlot) return tocSlot;
    if (!sections || sections.length === 0) return null;

    return (
      <div className="mb-8 lg:hidden">
        <button
          onClick={() => setIsTocOpen(!isTocOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border p-4",
            tocClassName
          )}
        >
          <span className="text-sm font-medium">Table of Contents</span>
          <DynamicIcon
            name={isTocOpen ? "lucide/chevron-up" : "lucide/chevron-down"}
            size={16}
          />
        </button>
        {isTocOpen && (
          <nav className="mt-2 space-y-2 rounded-lg border p-4">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              if (renderSectionLink) {
                return <React.Fragment key={section.id}>{renderSectionLink(section, isActive)}</React.Fragment>;
              }
              return (
                <Pressable
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "block text-sm transition-colors",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setIsTocOpen(false)}
                >
                  {section.title}
                </Pressable>
              );
            })}
          </nav>
        )}
      </div>
    );
  }, [tocSlot, sections, isTocOpen, activeSection, renderSectionLink, tocClassName]);

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
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {breadcrumbsContent}

        <div className={cn("mx-auto max-w-3xl", contentClassName)}>
          {title && (
            typeof title === "string" ? (
              <h1 className={cn("text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl", titleClassName)}>
                {title}
              </h1>
            ) : (
              <div className={titleClassName}>{title}</div>
            )
          )}

          {(authorName || publishDate || readTime) && (
            <div className={cn("mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground", metaClassName)}>
              {authorName && (
                authorHref ? (
                  <Pressable href={authorHref} className="hover:underline">
                    {authorName}
                  </Pressable>
                ) : (
                  <span>{authorName}</span>
                )
              )}
              {authorName && publishDate && <Separator orientation="vertical" className="h-4" />}
              {publishDate && <span>{publishDate}</span>}
              {publishDate && readTime && <Separator orientation="vertical" className="h-4" />}
              {readTime && <span>{readTime}</span>}
            </div>
          )}

          {shareContent}

          <Separator className="my-8" />

          {tocContent}

          <article className={cn("prose max-w-none dark:prose-invert", articleClassName)}>
            {heroMediaContent}
            {children ?? defaultArticleContent()}
          </article>
        </div>
      </div>
    </section>
  );
}

export { ArticleCompactTocComponent as ArticleCompactToc };
