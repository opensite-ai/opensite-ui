"use client";

import * as React from "react";
import {
  cn,
  getNestedCardBg,
  getNestedCardTextColor,
  getProseClassName,
} from "../../../lib/utils";
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
  SocialLinkItem,
  OptixFlowConfig,
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface ArticleChapter {
  id: string;
  number: number;
  title: string;
}

export interface ArticleAuthor {
  name?: string;
  role?: string;
  image?: string;
  bio?: string;
  socialLinks?:
    | SocialLinkItem[]
    | {
        twitter?: string;
        linkedin?: string;
        github?: string;
      };
}

export type ArticleAuthorConfig = ArticleAuthor;

export interface BreadcrumbItemConfig {
  label: string;
  href: string;
}

export interface ArticleChaptersAuthorProps {
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
   * Additional CSS classes for the header section
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the article content
   */
  articleClassName?: string;
  /**
   * Additional CSS classes for the chapters nav
   */
  chaptersClassName?: string;
  /**
   * Additional CSS classes for the author card
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the conclusion section
   */
  conclusionClassName?: string;
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
   * Article subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Chapter navigation items
   */
  chapters?: ArticleChapter[];
  /**
   * Custom slot for rendering chapters nav (overrides chapters array)
   */
  chaptersSlot?: React.ReactNode;
  /**
   * Render callback for chapter links (overrides default rendering)
   */
  renderChapterLink?: (
    chapter: ArticleChapter,
    isActive: boolean,
  ) => React.ReactNode;
  /**
   * Author configuration
   */
  author?: ArticleAuthorConfig;
  /**
   * Custom slot for rendering author info (overrides author config)
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
   * Conclusion section title
   */
  conclusionTitle?: React.ReactNode;
  /**
   * Conclusion section description
   */
  conclusionDescription?: React.ReactNode;
  /**
   * Conclusion CTA actions
   */
  conclusionActions?: ActionConfig[];
  /**
   * Custom slot for conclusion section (overrides conclusion props)
   */
  conclusionSlot?: React.ReactNode;
  /**
   * Article body content (replaces hardcoded prose)
   */
  children?: React.ReactNode;
  /**
   * Enable scroll-based chapter tracking
   * @default true
   */
  enableChapterTracking?: boolean;
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

export function ArticleChaptersAuthorComponent({
  className,
  breadcrumbClassName,
  headerClassName,
  titleClassName,
  subtitleClassName,
  sidebarClassName,
  articleClassName,
  chaptersClassName,
  authorClassName,
  conclusionClassName,
  heroImageClassName,
  breadcrumbs,
  breadcrumbsSlot,
  currentPage,
  title,
  subtitle,
  chapters,
  chaptersSlot,
  renderChapterLink,
  author,
  authorSlot,
  heroImageSrc,
  heroImageAlt,
  heroMediaSlot,
  conclusionTitle,
  conclusionDescription,
  conclusionActions,
  conclusionSlot,
  children,
  enableChapterTracking = true,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "hero",
  pattern,
  patternOpacity,
}: ArticleChaptersAuthorProps) {
  const [activeChapter, setActiveChapter] = React.useState<string>(
    chapters?.[0]?.id || "",
  );

  React.useEffect(() => {
    if (!enableChapterTracking || !chapters || chapters.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" },
    );

    chapters.forEach((chapter) => {
      const element = document.getElementById(chapter.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [chapters, enableChapterTracking]);

  const breadcrumbsContent = React.useMemo(() => {
    if (breadcrumbsSlot) return breadcrumbsSlot;
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
      <Breadcrumb className={cn("mb-8 md:mb-20", breadcrumbClassName)}>
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
  }, [breadcrumbsSlot, breadcrumbs, currentPage, breadcrumbClassName]);

  const chaptersNavContent = React.useMemo(() => {
    if (chaptersSlot) return chaptersSlot;
    if (!chapters || chapters.length === 0) return null;

    return (
      <div className={cn("rounded-lg border p-4", chaptersClassName)}>
        <h3 className="mb-4 text-sm font-semibold">Chapters</h3>
        <nav className="space-y-2">
          {chapters.map((chapter) => {
            const isActive = activeChapter === chapter.id;
            if (renderChapterLink) {
              return (
                <React.Fragment key={chapter.id}>
                  {renderChapterLink(chapter, isActive)}
                </React.Fragment>
              );
            }
            return (
              <Pressable
                key={chapter.id}
                href={`#${chapter.id}`}
                className={cn(
                  "flex items-center gap-3 text-sm transition-colors",
                  isActive ? "font-medium" : "",
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                    getNestedCardBg(background),
                    getNestedCardTextColor(background),
                  )}
                >
                  {chapter.number}
                </span>
                {chapter.title}
              </Pressable>
            );
          })}
        </nav>
      </div>
    );
  }, [
    chaptersSlot,
    chapters,
    activeChapter,
    renderChapterLink,
    chaptersClassName,
  ]);

  const authorCardContent = React.useMemo(() => {
    if (authorSlot) return authorSlot;
    if (!author) return null;

    let socialLinksContent = null;
    if (author.socialLinks) {
      if (Array.isArray(author.socialLinks)) {
        if (author.socialLinks.length > 0) {
          socialLinksContent = (
            <div className="mt-4 flex gap-2">
              {author.socialLinks.map((link, index) => (
                <Pressable
                  key={index}
                  href={link.href}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-md border",
                    link.className,
                  )}
                  aria-label={link["aria-label"]}
                >
                  {link.icon ?? (
                    <DynamicIcon name={`lucide/${link.platform}`} size={14} />
                  )}
                </Pressable>
              ))}
            </div>
          );
        }
      } else {
        const links = author.socialLinks;
        const socialEntries = Object.entries(links).filter(([, href]) => href);
        if (socialEntries.length > 0) {
          const platformLabels: Record<string, string> = {
            twitter: "Twitter",
            linkedin: "LinkedIn",
            github: "GitHub",
            facebook: "Facebook",
            instagram: "Instagram",
          };
          socialLinksContent = (
            <div className="mt-4 flex gap-2">
              {socialEntries.map(([platform, href]) => (
                <Pressable
                  key={platform}
                  href={href}
                  className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                  aria-label={
                    platformLabels[platform] ||
                    platform.charAt(0).toUpperCase() + platform.slice(1)
                  }
                >
                  <DynamicIcon name={`lucide/${platform}`} size={14} />
                </Pressable>
              ))}
            </div>
          );
        }
      }
    }

    return (
      <div className={cn("rounded-lg border p-4", authorClassName)}>
        <h3 className="mb-4 text-sm font-semibold">About the Author</h3>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={author.image} />
            <AvatarFallback>{author.name?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-xs text-muted-foreground">{author.role}</p>
          </div>
        </div>
        {author.bio && (
          <p className="mt-3 text-sm text-muted-foreground">{author.bio}</p>
        )}
        {socialLinksContent}
      </div>
    );
  }, [authorSlot, author, authorClassName]);

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

  const conclusionContent = React.useMemo(() => {
    if (conclusionSlot) return conclusionSlot;
    if (
      !conclusionTitle &&
      !conclusionDescription &&
      (!conclusionActions || conclusionActions.length === 0)
    )
      return null;

    return (
      <div
        className={cn(
          "mt-12 rounded-lg border p-6 not-prose",
          getNestedCardBg(background, "subtle"),
          getNestedCardTextColor(background),
          conclusionClassName,
        )}
      >
        {conclusionTitle &&
          (typeof conclusionTitle === "string" ? (
            <h3 className="text-lg font-semibold">{conclusionTitle}</h3>
          ) : (
            conclusionTitle
          ))}
        {conclusionDescription &&
          (typeof conclusionDescription === "string" ? (
            <p className="mt-2">{conclusionDescription}</p>
          ) : (
            <div className="mt-2">{conclusionDescription}</div>
          ))}
        {conclusionActions && conclusionActions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {conclusionActions.map((action, index) => {
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
  }, [
    conclusionSlot,
    conclusionTitle,
    conclusionDescription,
    conclusionActions,
    conclusionClassName,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        {breadcrumbsContent}

        <div className={cn("mb-12 text-center px-8 md:px-0", headerClassName)}>
          {title &&
            (typeof title === "string" ? (
              <h1
                className={cn(
                  "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance",
                  titleClassName,
                )}
              >
                {title}
              </h1>
            ) : (
              title
            ))}
          {subtitle &&
            (typeof subtitle === "string" ? (
              <p
                className={cn(
                  "mt-4 text-lg md:text-xl text-balance",
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            ) : (
              subtitle
            ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className={cn("hidden lg:block", sidebarClassName)}>
            <div className="sticky top-8 space-y-6">
              {chaptersNavContent}
              {authorCardContent}
            </div>
          </aside>

          <article
            className={cn(
              getProseClassName(background, "max-w-none"),
              articleClassName,
            )}
          >
            {heroMediaContent}

            {children}

            {conclusionContent}
          </article>
        </div>
      </div>
    </Section>
  );
}

export { ArticleChaptersAuthorComponent as ArticleChaptersAuthor };
