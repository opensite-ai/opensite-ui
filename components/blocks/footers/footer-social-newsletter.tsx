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
 * Features prominent social media icons in circular buttons, multi-column navigation,
 * and an email newsletter subscription form. Ideal for community-focused products,
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
          {sections && sections.length > 0 ? (
            <div
              className={cn(
                "mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4",
                gridClassName,
              )}
            >
              {sections &&
                sections.length > 0 &&
                sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className={cn(navSectionClassName)}>
                    <h3 className={cn("mb-4 font-bold", navTitleClassName)}>
                      {section.title}
                    </h3>
                    <ul className={cn("space-y-4", navLinksClassName)}>
                      {section.links.map((link, linkIdx) => (
                        <li
                          key={linkIdx}
                          className={cn("font-medium", navLinkClassName)}
                        >
                          <Pressable href={link.href}>{link.name}</Pressable>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          ) : null}

          {((socialLinks && socialLinks.length > 0) ||
            newsletterLabel ||
            newsletterButtonText) && (
            <div className={cn("lg:col-span-2 xl:col-span-1")}>
              {(newsletterLabel || newsletterButtonText) && (
                <div
                  className={cn(
                    "grid w-full max-w-sm items-center gap-1.5",
                    newsletterClassName,
                  )}
                >
                  {newsletterLabel && (
                    <label
                      htmlFor="newsletter-email"
                      className="text-sm font-medium"
                    >
                      {newsletterLabel}
                    </label>
                  )}
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <input
                      type="email"
                      id="newsletter-email"
                      placeholder={newsletterPlaceholder || "Email"}
                      className={cn(
                        "flex h-10 w-full rounded-md border border-input  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        newsletterInputClassName,
                      )}
                    />
                    {newsletterButtonText && (
                      <Pressable
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        variant="default"
                        size="default"
                        asButton
                        className={cn(newsletterButtonClassName)}
                      >
                        {newsletterButtonText}
                      </Pressable>
                    )}
                  </div>
                  {(privacyConsentText || privacyLinkText) && (
                    <p className={cn("mt-1 text-xs ", privacyClassName)}>
                      {privacyConsentText}
                      {privacyLinkText && (
                        <Pressable
                          href={privacyLinkUrl || "#"}
                          className="ml-1  hover:underline"
                        >
                          {privacyLinkText}
                        </Pressable>
                      )}
                    </p>
                  )}
                </div>
              )}

              {socialLinks && socialLinks.length > 0 && (
                <div className={cn("", socialColumnClassName)}>
                  <ul
                    className={cn(
                      "mb-10 flex items-center gap-2",
                      socialLinksClassName,
                    )}
                  >
                    {socialLinks.map((social, idx) => (
                      <li key={idx} className="font-medium">
                        <SocialLinkIcon
                          href={social.href}
                          label={social.label}
                          iconNameOverride={social.iconNameOverride}
                          iconSize={24}
                          className={cn(
                            "flex size-12 items-center justify-center rounded-full transition-colors",
                            socialLinkClassName,
                          )}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div
            className={cn(
              "mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium  md:flex-row md:items-center",
              bottomClassName,
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-2 opacity-80 md:flex-row md:items-center md:gap-4",
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
          </div>
        </footer>
      </div>
    </Section>
  );
}
