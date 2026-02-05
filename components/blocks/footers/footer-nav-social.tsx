"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { FooterLogo } from "../../ui/footer-logo";
import { Section } from "../../ui/section";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { OptixFlowConfig } from "../../../src/types/blocks";
import type { PatternName } from "../../ui/pattern-background";
import type { FooterSocialLink } from "./types";

/**
 * Logo configuration for the footer
 */
export interface FooterNavSocialLogo {
  /** Logo link URL */
  url: string;
  /** Logo image source */
  src: string;
  /** Logo alt text */
  alt: string;
  /** Logo title/brand name */
  title: string;
}

/**
 * Navigation link configuration
 */
export interface FooterNavSocialNavLink {
  /** Link name/label */
  name: string;
  /** Link URL */
  href: string;
}

/**
 * Navigation section configuration
 */
export interface FooterNavSocialSection {
  /** Section title */
  title: string;
  /** Links in this section */
  links: FooterNavSocialNavLink[];
}

/**
 * Props for the FooterNavSocial component
 */
export interface FooterNavSocialProps {
  /** Logo configuration */
  logo?: FooterNavSocialLogo;
  /** Navigation sections */
  sections?: FooterNavSocialSection[];
  /** Social media links */
  socialLinks?: FooterSocialLink[];
  /** Newsletter heading */
  newsletterHeading?: React.ReactNode;
  /** Newsletter description */
  newsletterDescription?: React.ReactNode;
  /** Newsletter placeholder */
  newsletterPlaceholder?: string;
  /** Newsletter button text */
  newsletterButtonText?: React.ReactNode;
  /** Social section title */
  socialTitle?: React.ReactNode;
  /** Copyright text */
  copyright?: React.ReactNode;
  /** Attribution text */
  attributionText?: React.ReactNode;
  /** Attribution link URL */
  attributionHref?: string;
  /** Legal links */
  legalLinks?: FooterNavSocialNavLink[];
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
  /** Additional CSS classes for the main grid */
  gridClassName?: string;
  /** Additional CSS classes for the left column */
  leftColumnClassName?: string;
  /** Additional CSS classes for the logo wrapper */
  logoWrapperClassName?: string;
  /** Additional CSS classes for the logo image */
  logoClassName?: string;
  /** Additional CSS classes for the navigation grid */
  navGridClassName?: string;
  /** Additional CSS classes for navigation sections */
  navSectionClassName?: string;
  /** Additional CSS classes for navigation section titles */
  navTitleClassName?: string;
  /** Additional CSS classes for navigation link lists */
  navLinksClassName?: string;
  /** Additional CSS classes for navigation link items */
  navLinkClassName?: string;
  /** Additional CSS classes for the right column */
  rightColumnClassName?: string;
  /** Additional CSS classes for the newsletter section */
  newsletterClassName?: string;
  /** Additional CSS classes for the newsletter heading */
  newsletterHeadingClassName?: string;
  /** Additional CSS classes for the newsletter description */
  newsletterDescriptionClassName?: string;
  /** Additional CSS classes for the newsletter form */
  newsletterFormClassName?: string;
  /** Additional CSS classes for the social section */
  socialSectionClassName?: string;
  /** Additional CSS classes for the social title */
  socialTitleClassName?: string;
  /** Additional CSS classes for the social links list */
  socialLinksClassName?: string;
  /** Additional CSS classes for social link items */
  socialLinkClassName?: string;
  /** Additional CSS classes for the bottom section */
  bottomClassName?: string;
  /** Additional CSS classes for the copyright section */
  copyrightClassName?: string;
  /** Additional CSS classes for legal links */
  legalLinksClassName?: string;
  /** Additional CSS classes for legal link items */
  legalLinkClassName?: string;
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
 * FooterNavSocial - A comprehensive footer with logo, navigation, newsletter, and social links.
 *
 * Features a logo with navigation sections, a newsletter signup form with heading and
 * description, social media icons, and legal links. Ideal for SaaS products, corporate
 * websites, and businesses that want a complete footer with all essential elements
 * organized in a clean, professional layout.
 */
export function FooterNavSocial({
  logo,
  sections,
  socialLinks,
  newsletterHeading,
  newsletterDescription,
  newsletterPlaceholder,
  newsletterButtonText,
  socialTitle,
  copyright,
  attributionText,
  attributionHref,
  legalLinks,
  className,
  contentClassName,
  gridClassName,
  leftColumnClassName,
  logoWrapperClassName,
  logoClassName,
  navGridClassName,
  navSectionClassName,
  navTitleClassName,
  navLinksClassName,
  navLinkClassName,
  rightColumnClassName,
  newsletterClassName,
  newsletterHeadingClassName,
  newsletterDescriptionClassName,
  newsletterFormClassName,
  socialSectionClassName,
  socialTitleClassName,
  socialLinksClassName,
  socialLinkClassName,
  bottomClassName,
  copyrightClassName,
  legalLinksClassName,
  legalLinkClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterNavSocialProps): React.JSX.Element {
  const sectionsContent = useMemo(() => {
    if (!sections || sections.length === 0) return null;

    return sections.map((section, sectionIdx) => (
      <div key={sectionIdx} className={cn(navSectionClassName)}>
        <h3 className={cn("mb-4 font-semibold", navTitleClassName)}>{section.title}</h3>
        <ul className={cn("space-y-3 text-sm text-muted-foreground", navLinksClassName)}>
          {section.links.map((link, linkIdx) => (
            <li key={linkIdx} className={cn(navLinkClassName)}>
              <Pressable
                href={link.href}
                className="hover:text-primary"
              >
                {link.name}
              </Pressable>
            </li>
          ))}
        </ul>
      </div>
    ));
  }, [sections, navSectionClassName, navTitleClassName, navLinksClassName, navLinkClassName]);

  const socialLinksContent = useMemo(() => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((social, idx) => (
      <li key={idx}>
        <SocialLinkIcon
          href={social.href}
          label={social.label}
          iconNameOverride={social.iconNameOverride}
          className={cn("text-muted-foreground transition-colors hover:text-primary", socialLinkClassName)}
        />
      </li>
    ));
  }, [socialLinks, socialLinkClassName]);

  const legalLinksContent = useMemo(() => {
    if (!legalLinks || legalLinks.length === 0) return null;

    return legalLinks.map((link, idx) => (
      <li key={idx} className={cn(legalLinkClassName)}>
        <Pressable href={link.href} className="hover:text-primary">
          {link.name}
        </Pressable>
      </li>
    ));
  }, [legalLinks, legalLinkClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn(contentClassName)}>
        <footer>
          <div className={cn("grid gap-10 lg:grid-cols-2", gridClassName)}>
            <div className={cn(leftColumnClassName)}>
              {logo && (
                <FooterLogo
                  logo={logo}
                  logoClassName={cn("mb-8", logoWrapperClassName)}
                  logoImageClassName={logoClassName}
                  optixFlowConfig={optixFlowConfig}
                />
              )}
              <div className={cn("grid gap-8 sm:grid-cols-3", navGridClassName)}>
                {sectionsContent}
              </div>
            </div>

            <div className={cn("flex flex-col justify-between", rightColumnClassName)}>
              {(newsletterHeading || newsletterDescription) && (
                <div className={cn("mb-8", newsletterClassName)}>
                  {newsletterHeading && (
                    <h3 className={cn("mb-2 text-lg font-semibold", newsletterHeadingClassName)}>
                      {newsletterHeading}
                    </h3>
                  )}
                  {newsletterDescription && (
                    <p className={cn("mb-4 text-sm text-muted-foreground", newsletterDescriptionClassName)}>
                      {newsletterDescription}
                    </p>
                  )}
                  <div className={cn("flex max-w-md gap-2", newsletterFormClassName)}>
                    <input
                      type="email"
                      placeholder={newsletterPlaceholder}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {newsletterButtonText && (
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                      >
                        {newsletterButtonText}
                      </button>
                    )}
                  </div>
                </div>
              )}
              {(socialTitle || socialLinksContent) && (
                <div className={cn(socialSectionClassName)}>
                  {socialTitle && (
                    <p className={cn("mb-4 font-medium", socialTitleClassName)}>{socialTitle}</p>
                  )}
                  <ul className={cn("flex items-center gap-4", socialLinksClassName)}>
                    {socialLinksContent}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className={cn("mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row md:items-center", bottomClassName)}>
            <div className={cn("flex flex-col gap-2 md:flex-row md:items-center md:gap-4", copyrightClassName)}>
              {copyright && <p>{copyright}</p>}
              {attributionText && attributionHref && (
                <Pressable
                  href={attributionHref}
                  className="hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {attributionText}
                </Pressable>
              )}
            </div>
            {legalLinksContent && (
              <ul className={cn("flex gap-4", legalLinksClassName)}>
                {legalLinksContent}
              </ul>
            )}
          </div>
        </footer>
      </div>
    </Section>
  );
}
