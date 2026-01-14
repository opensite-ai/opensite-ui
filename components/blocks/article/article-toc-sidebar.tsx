"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { OptixFlowConfig, ActionConfig } from "../../../src/types";

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
  renderSectionLink?: (section: ArticleTocSection, isActive: boolean) => React.ReactNode;
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
   * @deprecated Use ctaActions instead
   * CTA button text (backward compatibility)
   */
  ctaButtonText?: string;
  /**
   * @deprecated Use ctaActions instead
   * CTA button href (backward compatibility)
   */
  ctaButtonHref?: string;
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
}

const defaultArticleContent = (optixFlowConfig?: OptixFlowConfig) => (
  <>
    <section id="introduction">
      <h2>Introduction</h2>
      <p>
        Building scalable applications requires careful consideration of
        architecture, design patterns, and infrastructure. In this
        guide, we&apos;ll explore the key principles that enable
        applications to grow gracefully with increasing demand.
      </p>
      <Alert>
        <DynamicIcon name="lucide/lightbulb" size={16} />
        <AlertTitle>Pro Tip</AlertTitle>
        <AlertDescription>
          Start with a simple architecture and evolve it as your needs
          grow. Premature optimization can lead to unnecessary
          complexity.
        </AlertDescription>
      </Alert>
    </section>

    <section id="getting-started">
      <h2>Getting Started</h2>
      <p>
        Before diving into complex architectural patterns, ensure you
        have a solid understanding of your application&apos;s
        requirements. Consider factors like expected traffic, data
        volume, and team expertise.
      </p>
      <p>
        A well-designed system starts with clear requirements and
        constraints. Document your assumptions and validate them with
        stakeholders before making architectural decisions.
      </p>
    </section>

    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <p>
        Scalability encompasses both horizontal and vertical scaling
        strategies. Horizontal scaling adds more machines to handle
        load, while vertical scaling increases the capacity of existing
        machines.
      </p>
      <Img
        src={imagePlaceholders[5]}
        alt="Architecture diagram"
        className="my-8 aspect-video w-full rounded-lg object-cover"
        optixFlowConfig={optixFlowConfig}
      />
      <p>
        Key concepts include load balancing, caching, database sharding,
        and microservices architecture. Each approach has trade-offs
        that must be carefully evaluated.
      </p>
    </section>

    <section id="best-practices">
      <h2>Best Practices</h2>
      <p>
        Follow these best practices to ensure your application scales
        effectively:
      </p>
      <ul>
        <li>Design for failure and implement graceful degradation</li>
        <li>Use caching strategically at multiple levels</li>
        <li>Implement proper monitoring and alerting</li>
        <li>Automate deployment and scaling processes</li>
      </ul>
    </section>

    <section id="conclusion">
      <h2>Conclusion</h2>
      <p>
        Building scalable applications is both an art and a science. By
        understanding the fundamental principles and applying them
        thoughtfully, you can create systems that grow with your
        business needs.
      </p>
    </section>
  </>
);

export function ArticleTocSidebarComponent({
  className,
  containerClassName,
  articleClassName,
  sidebarClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  authorClassName,
  tocClassName,
  ctaClassName,
  heroImageClassName,
  title = "Building Scalable Applications with Modern Architecture",
  description = "Learn how to design and implement scalable applications using modern architectural patterns and best practices.",
  authorName = "Alex Chen",
  authorImage = imagePlaceholders[10],
  authorHref,
  publishDate = "January 5, 2025",
  readTime = "12 min read",
  authorSlot,
  category = "Architecture",
  categorySlot,
  sections,
  tocSlot,
  renderSectionLink,
  heroImageSrc = imagePlaceholders[4],
  heroImageAlt = "Article hero",
  heroMediaSlot,
  ctaTitle = "Ready to build?",
  ctaDescription = "Start building scalable applications today with our comprehensive toolkit.",
  ctaActions: ctaActionsProp,
  ctaButtonText,
  ctaButtonHref,
  ctaSlot,
  children,
  enableTocTracking = true,
  optixFlowConfig,
}: ArticleTocSidebarProps) {
  const ctaActions = ctaActionsProp ?? (ctaButtonText ? [{ label: ctaButtonText, href: ctaButtonHref || "#", variant: "default" as const, className: "w-full" }] : []);

  const [activeSection, setActiveSection] = React.useState<string>(
    sections?.[0]?.id || ""
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
      { rootMargin: "-20% 0px -80% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections, enableTocTracking]);

  const renderCategory = () => {
    if (categorySlot) return categorySlot;
    if (!category) return null;

    return <Badge variant="secondary">{category}</Badge>;
  };

  const renderAuthor = () => {
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
            <Pressable href={authorHref} className="text-sm font-medium hover:underline">
              {authorName}
            </Pressable>
          ) : (
            <p className="text-sm font-medium">{authorName}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {publishDate}{readTime && <> · {readTime}</>}
          </p>
        </div>
      </div>
    );
  };

  const renderHeroMedia = () => {
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
  };

  const renderToc = () => {
    if (tocSlot) return tocSlot;
    if (!sections || sections.length === 0) return null;

    return (
      <div className={cn("rounded-lg border p-4", tocClassName)}>
        <h3 className="mb-4 text-sm font-semibold">Table of Contents</h3>
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

  const renderCta = () => {
    if (ctaSlot) return ctaSlot;
    if (!ctaTitle && !ctaDescription && (!ctaActions || ctaActions.length === 0)) return null;

    return (
      <div className={cn("rounded-lg border bg-muted/50 p-4", ctaClassName)}>
        {ctaTitle && (
          typeof ctaTitle === "string" ? (
            <h3 className="mb-2 text-sm font-semibold">{ctaTitle}</h3>
          ) : (
            ctaTitle
          )
        )}
        {ctaDescription && (
          typeof ctaDescription === "string" ? (
            <p className="mb-4 text-sm text-muted-foreground">{ctaDescription}</p>
          ) : (
            <div className="mb-4">{ctaDescription}</div>
          )
        )}
        {ctaActions && ctaActions.length > 0 && (
          <div className="flex flex-col gap-2">
            {ctaActions.map((action, index) => {
              const { label, icon, iconAfter, children: actionChildren, className: actionClassName, ...pressableProps } = action;
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
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className={cn("prose max-w-none dark:prose-invert", articleClassName)}>
            <div className={cn("mb-8 not-prose", headerClassName)}>
              {renderCategory()}
              {title && (
                typeof title === "string" ? (
                  <h1 className={cn("mt-4 text-4xl font-bold tracking-tight md:text-5xl", titleClassName)}>
                    {title}
                  </h1>
                ) : (
                  <div className={cn("mt-4", titleClassName)}>{title}</div>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("mt-4 text-lg text-muted-foreground", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={cn("mt-4", descriptionClassName)}>{description}</div>
                )
              )}
              {renderAuthor()}
            </div>

            {renderHeroMedia()}

            {children || defaultArticleContent(optixFlowConfig)}
          </article>

          <aside className={cn("hidden lg:block", sidebarClassName)}>
            <div className="sticky top-8 space-y-6">
              {renderToc()}
              {renderCta()}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export { ArticleTocSidebarComponent as ArticleTocSidebar };
