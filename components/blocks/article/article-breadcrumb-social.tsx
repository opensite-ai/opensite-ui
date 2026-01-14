"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
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
import { Separator } from "../../ui/separator";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { SocialLinkItem, OptixFlowConfig } from "../../../src/types";

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
   * Additional CSS classes for the share buttons container
   */
  shareClassName?: string;
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
   * Author configuration
   */
  author?: ArticleAuthorConfig;
  /**
   * @deprecated Use author.name instead
   * Author name (backward compatibility)
   */
  authorName?: string;
  /**
   * @deprecated Use author.image instead
   * Author image URL (backward compatibility)
   */
  authorImage?: string;
  /**
   * @deprecated Use author.role instead
   * Author role (backward compatibility)
   */
  authorRole?: string;
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
  renderSectionLink?: (section: ArticleBreadcrumbSection, isActive: boolean) => React.ReactNode;
  /**
   * Social share links
   */
  socialLinks?: SocialLinkItem[];
  /**
   * @deprecated Use socialLinks instead
   * Share URLs object (backward compatibility)
   */
  shareUrls?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  /**
   * Custom slot for rendering share buttons (overrides socialLinks)
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
   * Enable scroll-based TOC tracking
   * @default true
   */
  enableTocTracking?: boolean;
  /**
   * Enable back to top button
   * @default true
   */
  enableBackToTop?: boolean;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultArticleContent = (optixFlowConfig?: OptixFlowConfig) => (
  <>
    <Img
      src={imagePlaceholders[6]}
      alt="Article hero"
      className="my-8 aspect-video w-full rounded-lg object-cover"
      optixFlowConfig={optixFlowConfig}
    />

    <section id="overview">
      <h2>Overview</h2>
      <p>
        Performance optimization is crucial for delivering exceptional
        user experiences. In this comprehensive guide, we&apos;ll
        explore proven strategies for improving web application
        performance.
      </p>
      <p>
        From initial page load to runtime performance, every
        millisecond counts. Users expect fast, responsive applications,
        and search engines reward sites that deliver.
      </p>
    </section>

    <section id="key-features">
      <h2>Key Features</h2>
      <p>
        Modern performance optimization encompasses several key areas:
      </p>
      <ul>
        <li>Code splitting and lazy loading</li>
        <li>Image optimization and responsive images</li>
        <li>Caching strategies and CDN utilization</li>
        <li>Bundle size optimization</li>
      </ul>
      <Img
        src={imagePlaceholders[7]}
        alt="Performance metrics"
        className="my-8 aspect-video w-full rounded-lg object-cover"
        optixFlowConfig={optixFlowConfig}
      />
    </section>

    <section id="implementation">
      <h2>Implementation</h2>
      <p>
        Implementing performance optimizations requires a systematic
        approach. Start by measuring your current performance using
        tools like Lighthouse, WebPageTest, or Chrome DevTools.
      </p>
      <blockquote>
        &ldquo;You can&apos;t improve what you don&apos;t measure.&rdquo;
        - Peter Drucker
      </blockquote>
      <p>
        Once you have baseline metrics, prioritize optimizations based
        on their potential impact and implementation effort.
      </p>
    </section>

    <section id="performance">
      <h2>Performance Metrics</h2>
      <p>
        Focus on Core Web Vitals: Largest Contentful Paint (LCP), First
        Input Delay (FID), and Cumulative Layout Shift (CLS). These
        metrics directly impact user experience and SEO rankings.
      </p>
    </section>

    <section id="summary">
      <h2>Summary</h2>
      <p>
        Performance optimization is an ongoing process, not a one-time
        task. Continuously monitor your metrics, identify bottlenecks,
        and iterate on improvements to maintain a fast, responsive
        application.
      </p>
    </section>
  </>
);

export function ArticleBreadcrumbSocialComponent({
  className,
  containerClassName,
  breadcrumbClassName,
  articleClassName,
  sidebarClassName,
  titleClassName,
  authorClassName,
  heroImageClassName,
  tocClassName,
  shareClassName,
  breadcrumbs,
  breadcrumbsSlot,
  currentPage,
  title,
  author: authorProp,
  authorName,
  authorImage,
  authorRole,
  authorSlot,
  publishDate,
  readTime,
  sections,
  tocSlot,
  renderSectionLink,
  socialLinks: socialLinksProp,
  shareUrls,
  shareSlot,
  heroImageSrc,
  heroImageAlt,
  heroMediaSlot,
  children,
  enableTocTracking = true,
  enableBackToTop = true,
  optixFlowConfig,
}: ArticleBreadcrumbSocialProps) {
  const author = authorProp ?? (authorName ? { name: authorName, image: authorImage, role: authorRole } : undefined);

  const platformLabels: Record<string, string> = {
    twitter: "Twitter",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    github: "GitHub",
  };
  const socialLinks = socialLinksProp ?? (shareUrls ? Object.entries(shareUrls).filter(([, href]) => href).map(([platform, href]) => ({
    platform,
    href: href!,
    icon: <DynamicIcon name={`lucide/${platform}`} size={16} />,
    "aria-label": `Share on ${platformLabels[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)}`,
    className: undefined,
  } as const)) : []);

  const [activeSection, setActiveSection] = React.useState<string>(
    sections?.[0]?.id || ""
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
      { rootMargin: "-20% 0px -80% 0px" }
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderBreadcrumbs = () => {
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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {typeof currentPage === "string" ? currentPage : currentPage}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  const renderAuthor = () => {
    if (authorSlot) return authorSlot;
    if (!author) return null;

    return (
      <div className={cn("mt-6 flex items-center gap-4 not-prose", authorClassName)}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.image} />
          <AvatarFallback>{author.name?.charAt(0) || "A"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{author.name}</p>
          <p className="text-sm text-muted-foreground">
            {author.role} · {publishDate} · {readTime}
          </p>
        </div>
      </div>
    );
  };

  const renderHeroMedia = () => {
    if (heroMediaSlot) return heroMediaSlot;
    if (heroImageSrc) {
      return (
        <Img
          src={heroImageSrc}
          alt={heroImageAlt}
          className={cn("my-8 aspect-video w-full rounded-lg object-cover", heroImageClassName)}
          optixFlowConfig={optixFlowConfig}
        />
      );
    }
    return null;
  };

  const renderToc = () => {
    if (tocSlot) return tocSlot;
    if (!sections || sections.length === 0) return null;

    return (
      <div className={cn("rounded-lg border p-4", tocClassName)}>
        <h3 className="mb-4 text-sm font-semibold">On this page</h3>
        <nav className="space-y-2">
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
              >
                {section.title}
              </Pressable>
            );
          })}
        </nav>
      </div>
    );
  };

  const renderShareButtons = () => {
    if (shareSlot) return shareSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div className={cn("rounded-lg border p-4", shareClassName)}>
        <h3 className="mb-4 text-sm font-semibold">Share this article</h3>
        <div className="flex gap-2">
          {socialLinks.map((link, index) => (
            <Pressable
              key={index}
              href={link.href}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted",
                link.className
              )}
              aria-label={link["aria-label"]}
            >
              {link.icon}
            </Pressable>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {renderBreadcrumbs()}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className={cn("prose max-w-none dark:prose-invert", articleClassName)}>
            {title && (
              typeof title === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl", titleClassName)}>
                  {title}
                </h1>
              ) : (
                <div className={titleClassName}>{title}</div>
              )
            )}

            {renderAuthor()}

            <Separator className="my-8" />

            {renderHeroMedia()}

            {children || defaultArticleContent(optixFlowConfig)}
          </article>

          <aside className={cn("hidden lg:block", sidebarClassName)}>
            <div className="sticky top-8 space-y-6">
              {renderToc()}
              {renderShareButtons()}
            </div>
          </aside>
        </div>
      </div>

      {enableBackToTop && showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
          aria-label="Back to top"
        >
          <DynamicIcon name="lucide/arrow-up" size={20} />
        </button>
      )}
    </section>
  );
}

export { ArticleBreadcrumbSocialComponent as ArticleBreadcrumbSocial };
