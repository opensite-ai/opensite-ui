"use client";

import { cn } from "../../../lib/utils";
import { FooterLogo } from "../../ui/footer-logo";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { OptixFlowConfig } from "../../../src/types/blocks";
import type { PatternName } from "../../ui/pattern-background";
import type { FooterSocialLink } from "./types";
import { DynamicIcon } from "@/src";

/**
 * Logo configuration for the footer
 */
export interface FooterSocialNewsletterLogo {
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
export interface FooterSocialNewsletterLink {
  /** Link name/label */
  name: string;
  /** Link URL */
  href: string;
}

/**
 * Navigation section configuration
 */
export interface FooterSocialNewsletterSection {
  /** Section title */
  title: string;
  /** Links in this section */
  links: FooterSocialNewsletterLink[];
}

/**
 * Props for the FooterSocialNewsletter component
 */
export interface FooterSocialNewsletterProps {
  /** Logo configuration */
  logo?: FooterSocialNewsletterLogo;
  /** Navigation sections */
  sections?: FooterSocialNewsletterSection[];
  /** Social media links */
  socialLinks?: FooterSocialLink[];
  /** Newsletter label text */
  newsletterLabel?: React.ReactNode;
  /** Newsletter placeholder text */
  newsletterPlaceholder?: string;
  /** Newsletter button text */
  newsletterButtonText?: React.ReactNode;
  /** Privacy policy link text */
  privacyLinkText?: React.ReactNode;
  /** Privacy policy URL */
  privacyLinkUrl?: string;
  /** Privacy consent text */
  privacyConsentText?: React.ReactNode;
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
  /** Additional CSS classes for the logo wrapper */
  logoWrapperClassName?: string;
  /** Additional CSS classes for the logo image */
  logoClassName?: string;
  /** Additional CSS classes for the main grid */
  gridClassName?: string;
  /** Additional CSS classes for navigation sections */
  navSectionClassName?: string;
  /** Additional CSS classes for navigation section titles */
  navTitleClassName?: string;
  /** Additional CSS classes for navigation link lists */
  navLinksClassName?: string;
  /** Additional CSS classes for navigation link items */
  navLinkClassName?: string;
  /** Additional CSS classes for the social/newsletter column */
  socialColumnClassName?: string;
  /** Additional CSS classes for the social links list */
  socialLinksClassName?: string;
  /** Additional CSS classes for social link items */
  socialLinkClassName?: string;
  /** Additional CSS classes for the newsletter section */
  newsletterClassName?: string;
  /** Additional CSS classes for the newsletter input */
  newsletterInputClassName?: string;
  /** Additional CSS classes for the newsletter button */
  newsletterButtonClassName?: string;
  /** Additional CSS classes for the privacy text */
  privacyClassName?: string;
  /** Additional CSS classes for the bottom section */
  bottomClassName?: string;
  /** Additional CSS classes for the copyright section */
  copyrightClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
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
 * FooterSocialNewsletter - A footer with social icons, navigation links, and newsletter signup.
 *
 * Features logo with social icons below, multi-column navigation grid,
 * and a newsletter subscription form in the bottom bar. Ideal for community-focused products,
 * SaaS platforms, and businesses that prioritize social engagement and email marketing.
 */
export function FooterSocialNewsletter({
  logo,
  sections,
  socialLinks,
  newsletterLabel,
  newsletterPlaceholder,
  newsletterButtonText,
  privacyLinkText,
  privacyLinkUrl,
  privacyConsentText,
  copyright,
  className,
  contentClassName,
  logoWrapperClassName,
  logoClassName,
  gridClassName,
  navSectionClassName,
  navTitleClassName,
  navLinksClassName,
  navLinkClassName,
  socialColumnClassName,
  socialLinksClassName,
  socialLinkClassName,
  newsletterClassName,
  newsletterInputClassName,
  newsletterButtonClassName,
  privacyClassName,
  bottomClassName,
  copyrightClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterSocialNewsletterProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className={cn(contentClassName)}>
        <footer>
          {/* Logo and Social Icons Section */}
          <div className="mb-20">
            {logo && (
              <FooterLogo
                logo={logo}
                logoClassName={cn(
                  "flex items-center gap-2",
                  logoWrapperClassName,
                )}
                logoImageClassName={cn("h-10", logoClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}

            {/* Social icons directly below logo */}
            {socialLinks && socialLinks.length > 0 && (
              <div className={cn("mt-6", socialColumnClassName)}>
                <ul
                  className={cn(
                    "flex items-center gap-4",
                    socialLinksClassName,
                  )}
                >
                  {socialLinks.map((social, idx) => (
                    <li key={idx}>
                      <SocialLinkIcon
                        href={social.href}
                        label={social.label}
                        iconNameOverride={social.iconNameOverride}
                        iconSize={20}
                        className={cn(
                          "opacity-80 transition-colors hover:opacity-100",
                          socialLinkClassName,
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation Grid - 4 columns on desktop, 2 on mobile */}
          {sections && sections.length > 0 && (
            <div
              className={cn(
                "space-y-12 space-x-4 md:space-y-6 md:space-x-6 grid grid-cols-2 lg:grid-cols-4",
                gridClassName,
              )}
            >
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className={cn(navSectionClassName)}>
                  <h3 className={cn("mb-4 font-bold", navTitleClassName)}>
                    {section.title}
                  </h3>
                  <ul className={cn("space-y-4", navLinksClassName)}>
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className={cn("text-sm font-medium", navLinkClassName)}
                      >
                        <Pressable href={link.href}>{link.name}</Pressable>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Bar - Copyright left, Newsletter right */}
          <div
            className={cn(
              "gap-14 md:gap-4 mt-16 flex flex-col-reverse border-none md:border-t pt-4 md:pt-8 lg:flex-row lg:items-start lg:justify-between",
              bottomClassName,
            )}
          >
            {/* Copyright and Attribution - Left side */}
            <div
              className={cn(
                "flex flex-col gap-2 text-sm font-medium opacity-80 md:flex-row md:items-center md:gap-4",
                copyrightClassName,
              )}
            >
              <FooterCopyright copyright={copyright} />
              <BrandAttribution
                internalBrandSlug="open_site_ai"
                optionIndex={7}
                variant="span"
                linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
              />
            </div>

            {/* Newsletter Form - Right side */}
            {(newsletterLabel || newsletterButtonText) && (
              <div
                className={cn(
                  "flex w-full flex-col gap-2 lg:w-auto lg:max-w-md",
                  newsletterClassName,
                )}
              >
                <div className="flex w-full flex-row items-stretch">
                  <input
                    type="email"
                    id="newsletter-email"
                    placeholder={newsletterPlaceholder || "Enter your email"}
                    className={cn(
                      "flex h-10 w-full rounded-l-md rounded-r-none border border-r-0 border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-64",
                      newsletterInputClassName,
                    )}
                  />
                  {newsletterButtonText && (
                    <Pressable
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      variant="default"
                      size="icon"
                      asButton
                      className={cn(
                        "rounded-l-none rounded-r-md shrink-0 h-10",
                        newsletterButtonClassName,
                      )}
                    >
                      <DynamicIcon name="feather/send" />
                    </Pressable>
                  )}
                </div>
                {(privacyConsentText || privacyLinkText) && (
                  <p className={cn("text-xs opacity-70", privacyClassName)}>
                    {privacyConsentText}
                    {privacyLinkText && (
                      <Pressable
                        href={privacyLinkUrl || "#"}
                        className="ml-1 underline hover:opacity-100"
                      >
                        {privacyLinkText}
                      </Pressable>
                    )}
                  </p>
                )}
              </div>
            )}
          </div>
        </footer>
      </div>
    </Section>
  );
}
