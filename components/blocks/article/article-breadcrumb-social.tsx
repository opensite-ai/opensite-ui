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
import { Section } from "../../ui/section";
import type { SocialLinkItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

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
}

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
  enableTocTracking,
  enableBackToTop,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ArticleBreadcrumbSocialProps) {
  const author = authorProp ?? (authorName ? { name: authorName, image: authorImage, role: authorRole } : undefined);

  const platformLabels: Record<string, string> = {
    twitter: "Twitter",
    x: "X",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    github: "GitHub",
  };

  // Map platform names to simple-icons (brand icons) - lucide doesn't have social brand icons
  const socialIconMap: Record<string, string> = {
    twitter: "simple-icons/x", // Twitter is now X
    x: "simple-icons/x",
    facebook: "simple-icons/facebook",
    linkedin: "simple-icons/linkedin",
    instagram: "simple-icons/instagram",
    github: "simple-icons/github",
  };

  const socialLinks = socialLinksProp ?? (shareUrls ? Object.entries(shareUrls).filter(([, href]) => href).map(([platform, href]) => ({
    platform,
    href: href!,
    icon: <DynamicIcon name={socialIconMap[platform] || `simple-icons/${platform}`} size={16} />,
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
      <div className={cn("mt-6 flex items-center gap-4 not-prose", authorClassName)}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.image} />
          <AvatarFallback>{author.name?.charAt(0) || "A"}</AvatarFallback>
        </Avatar>
        <div>
          {author.name && <p className="font-medium">{author.name}</p>}
          {(author.role || publishDate || readTime) && (
            <p className="text-sm text-muted-foreground">
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
        className={cn("my-8 aspect-video w-full rounded-lg object-cover", heroImageClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [heroMediaSlot, heroImageSrc, heroImageAlt, heroImageClassName, optixFlowConfig]);

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
  }, [tocSlot, sections, activeSection, renderSectionLink, tocClassName]);

  const shareButtonsContent = React.useMemo(() => {
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
  }, [shareSlot, socialLinks, shareClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("container", containerClassName)}>
        {breadcrumbsContent}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {children && (
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

              {authorContent}

              <Separator className="my-8" />

              {heroMediaContent}

              {children}

              {/* Mobile share section - hidden on desktop where sidebar shows */}
              {shareButtonsContent && (
                <div className="not-prose mt-8 lg:hidden">
                  {shareButtonsContent}
                </div>
              )}
            </article>
          )}

          <aside className={cn("hidden lg:block", sidebarClassName)}>
            <div className="sticky top-8 space-y-6">
              {tocContent}
              {shareButtonsContent}
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
    </Section>
  );
}

export { ArticleBreadcrumbSocialComponent as ArticleBreadcrumbSocial };
