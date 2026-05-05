"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { FooterLogo } from "../../ui/footer-logo";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
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
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Bottom links (terms, privacy, etc.) */
  bottomLinks?: FooterSimpleCenteredBottomLink[];
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the footer element */
  footerClassName?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * FooterSimpleCentered - A clean, minimal footer with logo, sitemap, and legal links.
 *
 * Features a simple two-column sitemap layout with company branding and bottom legal links.
 * Ideal for corporate websites, landing pages, and products that prefer a clean,
 * uncluttered footer design without social media or newsletter elements.
 */
export function FooterSimpleCentered({
  sectionId = "footer-simple-centered",
  logo,
  tagline,
  sitemap,
  copyright,
  bottomLinks,
  className,
  footerClassName,
  contentClassName,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
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
                  "text-sm opacity-80 transition-colors hover:opacity-100",
                  sitemapLinkClassName,
                )}
              >
                {link.label}
              </Pressable>
            </li>
          ))}
        </ul>
      </div>
    ));
  }, [
    sitemap,
    sitemapSectionClassName,
    sitemapTitleClassName,
    sitemapLinksClassName,
    sitemapLinkClassName,
  ]);

  const bottomLinksContent = useMemo(() => {
    if (!bottomLinks || bottomLinks.length === 0) return null;

    return bottomLinks.map((link, idx) => (
      <React.Fragment key={link.href}>
        <Pressable
          href={link.href}
          className={cn(
            "text-sm opacity-80 transition-colors hover:opacity-100",
            bottomLinkClassName,
          )}
        >
          {link.text}
        </Pressable>
      </React.Fragment>
    ));
  }, [bottomLinks, bottomLinkClassName]);

  return (
    <Section
      id="footer-simple-centered"
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <footer className={cn(footerClassName)}>
        <div
          className={cn(
            "relative mb-8 flex w-full flex-col gap-x-28 gap-y-8 md:flex-row md:justify-between md:gap-y-0",
            contentClassName,
          )}
        >
          <div className={cn("max-w-96", brandClassName)}>
            {(logo?.src || logo?.title) && (
              <div
                className={cn(
                  "mb-6 flex items-center gap-3",
                  logoWrapperClassName,
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
              <p className={cn("text-base font-mediumd", taglineClassName)}>
                {tagline}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex flex-col items-start gap-x-20 gap-y-14 xl:flex-row w-full",
              sitemapWrapperClassName,
            )}
          >
            <div className="grid md:flex w-full gap-8 md:gap-6 lg:gap-12 md:flex-wrap md:justify-between grid-cols-2">
              {sitemapContent}
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col items-baseline justify-between gap-8 border-t pt-8 md:flex-row md:gap-16",
            bottomBarClassName,
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-2 text-xs opacity-80 sm:flex-row sm:items-center sm:gap-4 sm:text-sm",
              copyrightClassName,
            )}
          >
            <FooterCopyright copyright={copyright} />
            <BrandAttribution
              internalBrandSlug="open_site_ai"
              optionIndex={5}
              variant="span"
              linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
            />
          </div>
          <div
            className={cn(
              "pt-4 md:pt-0 gap-4 grid md:flex grid-cols-2 items-center w-full md:w-fit",
              bottomLinksClassName,
            )}
          >
            {bottomLinksContent}
          </div>
        </div>
      </footer>
    </Section>
  );
}
