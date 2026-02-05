"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { FooterLogo } from "../../ui/footer-logo";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { OptixFlowConfig, NavLinkItem } from "../../../src/types/blocks";
import type { PatternName } from "../../ui/pattern-background";

/**
 * Sitemap section configuration
 */
export interface FooterSimpleCenteredSection {
  /** Section title */
  title: string;
  /** Links in this section */
  links: NavLinkItem[];
}

/**
 * Logo configuration for the footer
 */
export interface FooterSimpleCenteredLogo {
  /** Logo link URL */
  url?: string;
  /** Logo image source */
  src?: string;
  /** Logo alt text */
  alt?: string;
  /** Logo title/brand name */
  title?: string;
}

/**
 * Bottom link configuration
 */
export interface FooterSimpleCenteredBottomLink {
  /** Link text */
  text: string;
  /** Link URL */
  href: string;
}

/**
 * Props for the FooterSimpleCentered component
 */
export interface FooterSimpleCenteredProps {
  /** Logo configuration */
  logo?: FooterSimpleCenteredLogo;
  /** Tagline displayed below the logo */
  tagline?: React.ReactNode;
  /** Sitemap sections */
  sitemap?: FooterSimpleCenteredSection[];
  /** Copyright text */
  copyright?: React.ReactNode;
  /** Bottom links (terms, privacy, etc.) */
  bottomLinks?: FooterSimpleCenteredBottomLink[];
  /** Attribution text */
  attributionText?: React.ReactNode;
  /** Attribution link URL */
  attributionHref?: string;
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the footer element */
  footerClassName?: string;
  /** Additional CSS classes for the main content wrapper */
  contentClassName?: string;
  /** Additional CSS classes for the brand section */
  brandClassName?: string;
  /** Additional CSS classes for the logo wrapper */
  logoWrapperClassName?: string;
  /** Additional CSS classes for the logo image */
  logoClassName?: string;
  /** Additional CSS classes for the tagline */
  taglineClassName?: string;
  /** Additional CSS classes for the sitemap wrapper */
  sitemapWrapperClassName?: string;
  /** Additional CSS classes for each sitemap section */
  sitemapSectionClassName?: string;
  /** Additional CSS classes for sitemap section titles */
  sitemapTitleClassName?: string;
  /** Additional CSS classes for sitemap link lists */
  sitemapLinksClassName?: string;
  /** Additional CSS classes for sitemap link items */
  sitemapLinkClassName?: string;
  /** Additional CSS classes for the bottom bar */
  bottomBarClassName?: string;
  /** Additional CSS classes for the copyright section */
  copyrightClassName?: string;
  /** Additional CSS classes for the bottom links wrapper */
  bottomLinksClassName?: string;
  /** Additional CSS classes for bottom link items */
  bottomLinkClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * FooterSimpleCentered - A clean, minimal footer with logo, sitemap, and legal links.
 *
 * Features a simple two-column sitemap layout with company branding and bottom legal links.
 * Ideal for corporate websites, landing pages, and products that prefer a clean,
 * uncluttered footer design without social media or newsletter elements.
 */
export function FooterSimpleCentered({
  logo,
  tagline,
  sitemap,
  copyright,
  bottomLinks,
  attributionText,
  attributionHref = "https://opensite.ai",
  className,
  footerClassName,
  contentClassName,
  brandClassName,
  logoWrapperClassName,
  logoClassName,
  taglineClassName,
  sitemapWrapperClassName,
  sitemapSectionClassName,
  sitemapTitleClassName,
  sitemapLinksClassName,
  sitemapLinkClassName,
  bottomBarClassName,
  copyrightClassName,
  bottomLinksClassName,
  bottomLinkClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterSimpleCenteredProps): React.JSX.Element {
  const sitemapContent = useMemo(() => {
    if (!sitemap || sitemap.length === 0) return null;

    return sitemap.map((section) => (
      <div key={section.title} className={cn(sitemapSectionClassName)}>
        <h3 className={cn("mb-4 text-sm font-semibold", sitemapTitleClassName)}>
          {section.title}
        </h3>
        <ul className={cn("space-y-2", sitemapLinksClassName)}>
          {section.links.map((link) => (
            <li key={link.href}>
              <Pressable
                href={link.href}
                className={cn(
                  "text-sm text-muted-foreground transition-colors hover:text-primary",
                  sitemapLinkClassName
                )}
              >
                {link.label}
              </Pressable>
            </li>
          ))}
        </ul>
      </div>
    ));
  }, [sitemap, sitemapSectionClassName, sitemapTitleClassName, sitemapLinksClassName, sitemapLinkClassName]);

  const bottomLinksContent = useMemo(() => {
    if (!bottomLinks || bottomLinks.length === 0) return null;

    return bottomLinks.map((link, idx) => (
      <React.Fragment key={link.href}>
        {idx > 0 && <span className="text-muted-foreground">•</span>}
        <Pressable
          href={link.href}
          className={cn(
            "text-sm text-muted-foreground transition-colors hover:text-primary",
            bottomLinkClassName
          )}
        >
          {link.text}
        </Pressable>
      </React.Fragment>
    ));
  }, [bottomLinks, bottomLinkClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <footer className={cn(footerClassName)}>
        <div
          className={cn(
            "relative mb-8 flex w-full flex-col gap-x-28 gap-y-8 md:flex-row md:justify-between md:gap-y-0",
            contentClassName
          )}
        >
          <div className={cn("max-w-96", brandClassName)}>
            {(logo?.src || logo?.title) && (
              <div
                className={cn(
                  "mb-6 flex items-center gap-3",
                  logoWrapperClassName
                )}
              >
                <FooterLogo
                  logo={logo}
                  logoClassName={logoClassName}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {tagline && (
              <p
                className={cn(
                  "text-base font-medium text-muted-foreground",
                  taglineClassName
                )}
              >
                {tagline}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex flex-col items-start gap-x-20 gap-y-14 xl:flex-row",
              sitemapWrapperClassName
            )}
          >
            <div className="inline-grid w-fit grid-cols-1 gap-x-20 gap-y-14 sm:grid-cols-2">
              {sitemapContent}
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col items-baseline justify-between gap-8 border-t border-border pt-8 md:flex-row md:gap-16",
            bottomBarClassName
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:gap-4 sm:text-sm",
              copyrightClassName
            )}
          >
            {copyright && <span>{copyright}</span>}
            {attributionHref && attributionText && (
              <Pressable
                href={attributionHref}
                className="hover:text-accent-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                {attributionText}
              </Pressable>
            )}
          </div>
          <div
            className={cn(
              "flex flex-col items-start gap-4 text-xs text-muted-foreground sm:text-sm md:flex-row lg:items-center",
              bottomLinksClassName
            )}
          >
            {bottomLinksContent}
          </div>
        </div>
      </footer>
    </Section>
  );
}
