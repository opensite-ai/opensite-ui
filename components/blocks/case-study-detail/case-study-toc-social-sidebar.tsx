"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { Avatar, AvatarImage } from "../../ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbItemUI,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { Separator } from "../../ui/separator";
import type {
  BreadcrumbItem,
  DetailItem,
  AuthorInfo,
  SectionItem,
  OutcomeItem,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Social link configuration for sharing buttons.
 */
export interface SocialLinkItem {
  /**
   * Icon name for dynamic icon loading
   */
  icon: string;
  /**
   * Link URL
   */
  href: string;
  /**
   * Accessible label for the link
   */
  label: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface CaseStudyTocSocialSidebarProps {
  /**
   * Array of breadcrumb items for navigation
   */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * Custom slot for breadcrumbs (overrides breadcrumbs array)
   */
  breadcrumbsSlot?: React.ReactNode;
  /**
   * Main title/heading content
   */
  title?: React.ReactNode;
  /**
   * Hero image URL
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
   * Author information
   */
  author?: AuthorInfo;
  /**
   * Custom slot for author section (overrides author prop)
   */
  authorSlot?: React.ReactNode;
  /**
   * Label text above author section
   */
  authorLabel?: React.ReactNode;
  /**
   * Company logo URL
   */
  companyLogoSrc?: string;
  /**
   * Company logo alt text
   */
  companyLogoAlt?: string;
  /**
   * Custom slot for company logo (overrides companyLogoSrc)
   */
  companyLogoSlot?: React.ReactNode;
  /**
   * Array of detail items for the sidebar (replaces individual company props)
   */
  details?: DetailItem[];
  /**
   * Problem description text
   */
  problem?: React.ReactNode;
  /**
   * Approach description text
   */
  approach?: React.ReactNode;
  /**
   * Array of outcome items
   */
  outcomes?: OutcomeItem[];
  /**
   * Custom slot for summary section (problem/approach/outcomes)
   */
  summarySlot?: React.ReactNode;
  /**
   * Array of content sections
   */
  sections?: SectionItem[];
  /**
   * Custom slot for content sections (overrides sections array)
   */
  contentSlot?: React.ReactNode;
  /**
   * Array of social link items
   */
  socialLinks?: SocialLinkItem[];
  /**
   * Custom slot for social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Label text above social links
   */
  socialLinksLabel?: React.ReactNode;
  /**
   * Custom slot for entire left sidebar (overrides all sidebar props)
   */
  sidebarSlot?: React.ReactNode;
  /**
   * Custom slot for TOC navigation (overrides default TOC)
   */
  tocSlot?: React.ReactNode;
  /**
   * Label text for TOC section
   */
  tocLabel?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the breadcrumbs
   */
  breadcrumbsClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  heroImageClassName?: string;
  /**
   * Additional CSS classes for the author section
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the layout wrapper
   */
  layoutClassName?: string;
  /**
   * Additional CSS classes for the left sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the company logo
   */
  companyLogoClassName?: string;
  /**
   * Additional CSS classes for detail items
   */
  detailItemClassName?: string;
  /**
   * Additional CSS classes for the main content area
   */
  mainClassName?: string;
  /**
   * Additional CSS classes for the summary section
   */
  summaryClassName?: string;
  /**
   * Additional CSS classes for the prose content
   */
  proseClassName?: string;
  /**
   * Additional CSS classes for the TOC navigation
   */
  tocClassName?: string;
  /**
   * Additional CSS classes for social links
   */
  socialLinksClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * CaseStudyTocSocialSidebar displays a comprehensive case study with breadcrumb
 * navigation, featured author, sticky sidebar with company details, table of
 * contents navigation, and social sharing links.
 *
 * Features a three-column layout on large screens: left sidebar with company info
 * and social links, center content area with problem/approach/outcomes summary
 * followed by prose sections, and right sidebar with sticky table of contents.
 * The header includes breadcrumbs, large title, and author attribution with avatar.
 * Each content section is tracked via IntersectionObserver for active TOC highlighting.
 *
 * Ideal for in-depth case studies, customer success stories, or detailed articles
 * that benefit from structured navigation and comprehensive company context.
 *
 * @example
 * ```tsx
 * <CaseStudyTocSocialSidebar
 *   title="How this tool helps teams achieve efficient workflows"
 *   author={{ name: "Jane Doe", role: "Senior Product Manager", avatarSrc: "/avatars/jane.jpg" }}
 *   companyLogoSrc="/logos/company.svg"
 *   details={[
 *     { label: "Overview", value: "A modern platform designed to simplify workflows" },
 *     { label: "Sector", value: "Technology; Automation" }
 *   ]}
 *   sections={[
 *     { id: "intro", title: "Introduction", content: <p>...</p> }
 *   ]}
 * />
 * ```
 */
export function CaseStudyTocSocialSidebar({
  breadcrumbs,
  breadcrumbsSlot,
  title,
  heroImageSrc,
  heroImageAlt,
  heroMediaSlot,
  author,
  authorSlot,
  authorLabel,
  companyLogoSrc,
  companyLogoAlt,
  companyLogoSlot,
  details,
  problem,
  approach,
  outcomes,
  summarySlot,
  sections,
  contentSlot,
  socialLinks,
  socialLinksSlot,
  socialLinksLabel,
  sidebarSlot,
  tocSlot,
  tocLabel,
  className,
  containerClassName,
  headerClassName,
  breadcrumbsClassName,
  titleClassName,
  heroImageClassName,
  authorClassName,
  layoutClassName,
  sidebarClassName,
  companyLogoClassName,
  detailItemClassName,
  mainClassName,
  summaryClassName,
  proseClassName,
  tocClassName,
  socialLinksClassName,
  optixFlowConfig,
}: CaseStudyTocSocialSidebarProps): React.JSX.Element {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sectionIds = Object.keys(sectionRefs.current);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      },
    );

    sectionIds.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, [sections]);

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  const renderBreadcrumbs = () => {
    if (breadcrumbsSlot) return breadcrumbsSlot;
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
      <Breadcrumb className={breadcrumbsClassName}>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItemUI key={index} className={crumb.className}>
              {crumb.href ? (
                <>
                  <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  )}
                </>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItemUI>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  const renderHeroMedia = () => {
    if (heroMediaSlot) return heroMediaSlot;

    return (
      <Img
        src={heroImageSrc}
        alt={heroImageAlt}
        className={cn("max-h-[524px] w-full rounded-xl object-cover lg:w-auto", heroImageClassName)}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderAuthor = () => {
    if (authorSlot) return authorSlot;
    if (!author) return null;

    const avatarContent = author.avatarSlot ?? (
      author.avatarSrc && (
        <Avatar className="size-16 rounded-xl border">
          <AvatarImage src={author.avatarSrc} alt={typeof author.name === "string" ? author.name : "Author"} />
        </Avatar>
      )
    );

    return (
      <div className={cn("mt-16", authorClassName)}>
        {authorLabel && (
          typeof authorLabel === "string" ? (
            <p className="font-medium">{authorLabel}</p>
          ) : (
            authorLabel
          )
        )}
        <div className={cn("mt-4 flex items-center gap-4", author.className)}>
          {avatarContent}
          <div className="flex flex-col">
            {author.name && (
              typeof author.name === "string" ? (
                <p className="font-semibold">{author.name}</p>
              ) : (
                author.name
              )
            )}
            {author.role && (
              typeof author.role === "string" ? (
                <p className="text-muted-foreground">{author.role}</p>
              ) : (
                author.role
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCompanyLogo = () => {
    if (companyLogoSlot) return companyLogoSlot;

    return (
      <Img
        src={companyLogoSrc}
        alt={companyLogoAlt}
        className={cn("h-6 dark:invert", companyLogoClassName)}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderDetails = () => {
    if (!details || details.length === 0) return null;

    return (
      <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-1">
        {details.map((detail, index) => (
          <div
            key={index}
            className={cn(
              index === 0 ? "col-span-2 lg:col-span-1" : "",
              detail.className,
              detailItemClassName
            )}
          >
            <h2 className="font-semibold">{detail.label}</h2>
            {detail.href ? (
              <Pressable href={detail.href} className="mt-1 text-sm text-muted-foreground underline hover:text-foreground">
                {detail.value}
              </Pressable>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">{detail.value}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSocialLinks = () => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div className={cn("mt-10 flex flex-col", socialLinksClassName)}>
        {socialLinksLabel && (
          typeof socialLinksLabel === "string" ? (
            <span className="mb-2 text-sm text-muted-foreground">{socialLinksLabel}</span>
          ) : (
            socialLinksLabel
          )
        )}
        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <Pressable
              key={index}
              href={social.href}
              className={cn("text-muted-foreground hover:text-primary", social.className)}
              aria-label={social.label}
            >
              <DynamicIcon name={social.icon} size={20} className="size-5" />
            </Pressable>
          ))}
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    if (sidebarSlot) return sidebarSlot;

    return (
      <aside className={cn("mx-auto h-fit max-w-prose lg:sticky lg:top-10 lg:mx-0 lg:w-64 lg:max-w-none", sidebarClassName)}>
        {renderCompanyLogo()}
        {renderDetails()}
        {renderSocialLinks()}
      </aside>
    );
  };

  const renderSummary = () => {
    if (summarySlot) return summarySlot;

    return (
      <div className={cn("grid gap-x-10 gap-y-7 rounded-3xl border p-6 lg:grid-cols-2 lg:gap-y-10 lg:border-none lg:p-0", summaryClassName)}>
        <div>
          <h2 className="text-xl font-semibold">Problem</h2>
          {typeof problem === "string" ? (
            <p className="mt-3 text-muted-foreground">{problem}</p>
          ) : (
            <div className="mt-3 text-muted-foreground">{problem}</div>
          )}
        </div>
        <Separator className="w-full lg:hidden" />
        <div>
          <h2 className="text-xl font-semibold">Approach</h2>
          {typeof approach === "string" ? (
            <p className="mt-3 text-muted-foreground">{approach}</p>
          ) : (
            <div className="mt-3 text-muted-foreground">{approach}</div>
          )}
        </div>
        {outcomes && outcomes.length > 0 && (
          <div className="border-t pt-10 lg:col-span-2">
            <h2 className="text-xl font-semibold">Outcomes</h2>
            <ul className="mt-3 grid gap-x-10 gap-y-3 lg:grid-cols-2">
              {outcomes.map((outcome, index) => (
                <li key={index} className={cn("flex gap-3", outcome.className)}>
                  {outcome.icon ?? (
                    <DynamicIcon name={outcome.iconName ?? "lucide/check-circle-2"} size={20} className="mt-0.5 size-5 shrink-0" />
                  )}
                  {typeof outcome.text === "string" ? (
                    <p className="font-semibold">{outcome.text}</p>
                  ) : (
                    outcome.text
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (contentSlot) return contentSlot;
    if (!sections || sections.length === 0) return null;

    return (
      <div className="mt-20">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            ref={(ref) => addSectionRef(section.id, ref)}
            className={cn("prose mb-8 dark:prose-invert", section.className, proseClassName)}
          >
            <h2>{section.title}</h2>
            {section.content}
          </section>
        ))}
      </div>
    );
  };

  const renderToc = () => {
    if (tocSlot) return tocSlot;
    if (!sections || sections.length === 0) return null;

    return (
      <div className={cn("sticky top-8 hidden h-fit shrink-0 lg:block", tocClassName)}>
        <span className="flex items-center gap-2 text-sm">
          <DynamicIcon name="lucide/align-left" size={16} className="h-4 w-4" />
          {tocLabel}
        </span>
        <nav className="mt-2 text-sm">
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <Pressable
                  href={`#${section.id}`}
                  className={cn(
                    "block py-1 transition-colors duration-200",
                    activeSection === section.id
                      ? "font-medium text-primary"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {section.title}
                </Pressable>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto flex max-w-prose flex-col items-center justify-between gap-10 lg:max-w-none lg:flex-row", headerClassName)}>
          <div>
            {renderBreadcrumbs()}
            {title && (
              typeof title === "string" ? (
                <h1 className={cn("mt-10 text-5xl font-semibold text-balance lg:text-7xl", titleClassName)}>
                  {title}
                </h1>
              ) : (
                <div className={cn("mt-10", titleClassName)}>{title}</div>
              )
            )}
            {renderAuthor()}
          </div>
          {renderHeroMedia()}
        </div>
        <div className={cn("relative mt-20 flex flex-col gap-x-6 gap-y-16 lg:flex-row", layoutClassName)}>
          {renderSidebar()}
          <div className={cn("flex", mainClassName)}>
            <div className="mx-auto max-w-prose lg:max-w-4xl lg:px-20">
              {renderSummary()}
              {renderContent()}
            </div>
            {renderToc()}
          </div>
        </div>
      </div>
    </section>
  );
}
