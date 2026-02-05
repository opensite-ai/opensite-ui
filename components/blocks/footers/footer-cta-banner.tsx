"use client";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { FooterLogo } from "../../ui/footer-logo";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { Section } from "../../ui/section";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { OptixFlowConfig } from "../../../src/types/blocks";
import type { PatternName } from "../../ui/pattern-background";
import type { FooterSocialLink } from "./types";

/**
 * Logo configuration for the footer
 */
export interface FooterCtaBannerLogo {
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
export interface FooterCtaBannerLink {
  /** Link name/label */
  name: string;
  /** Link URL */
  href: string;
}

/**
 * Navigation section configuration
 */
export interface FooterCtaBannerSection {
  /** Section title */
  title: string;
  /** Links in this section */
  links: FooterCtaBannerLink[];
}

/**
 * Props for the FooterCtaBanner component
 */
export interface FooterCtaBannerProps {
  /** Logo configuration */
  logo?: FooterCtaBannerLogo;
  /** CTA banner heading */
  ctaHeading?: React.ReactNode;
  /** CTA banner description */
  ctaDescription?: React.ReactNode;
  /** CTA button text */
  ctaButtonText?: React.ReactNode;
  /** CTA button URL */
  ctaButtonUrl?: string;
  /** Navigation sections */
  sections?: FooterCtaBannerSection[];
  /** Social media links */
  socialLinks?: FooterSocialLink[];
  /** Newsletter label */
  newsletterLabel?: React.ReactNode;
  /** Newsletter placeholder */
  newsletterPlaceholder?: string;
  /** Newsletter button text */
  newsletterButtonText?: React.ReactNode;
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Legal links */
  legalLinks?: FooterCtaBannerLink[];
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
  /** Additional CSS classes for the CTA banner */
  ctaBannerClassName?: string;
  /** Additional CSS classes for the CTA heading */
  ctaHeadingClassName?: string;
  /** Additional CSS classes for the CTA description */
  ctaDescriptionClassName?: string;
  /** Additional CSS classes for the CTA button */
  ctaButtonClassName?: string;
  /** Additional CSS classes for the main grid */
  gridClassName?: string;
  /** Additional CSS classes for the brand section */
  brandClassName?: string;
  /** Additional CSS classes for the logo wrapper */
  logoWrapperClassName?: string;
  /** Additional CSS classes for the logo image */
  logoClassName?: string;
  /** Additional CSS classes for the newsletter section */
  newsletterClassName?: string;
  /** Additional CSS classes for the newsletter input */
  newsletterInputClassName?: string;
  /** Additional CSS classes for the newsletter button */
  newsletterButtonClassName?: string;
  /** Additional CSS classes for the social links */
  socialLinksClassName?: string;
  /** Additional CSS classes for social link items */
  socialLinkClassName?: string;
  /** Additional CSS classes for navigation sections */
  navSectionClassName?: string;
  /** Additional CSS classes for navigation section titles */
  navTitleClassName?: string;
  /** Additional CSS classes for navigation link lists */
  navLinksClassName?: string;
  /** Additional CSS classes for navigation link items */
  navLinkClassName?: string;
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
 * FooterCtaBanner - A dark-themed footer with prominent CTA banner, navigation, and newsletter.
 *
 * Features a full-width call-to-action banner at the top with heading, description, and button,
 * followed by multi-column navigation, newsletter signup, and social links. Ideal for SaaS products,
 * marketing sites, and businesses that want to drive conversions directly from the footer.
 */
export function FooterCtaBanner({
  logo,
  ctaHeading,
  ctaDescription,
  ctaButtonText,
  ctaButtonUrl,
  sections,
  socialLinks,
  newsletterLabel,
  newsletterPlaceholder,
  newsletterButtonText,
  copyright,
  legalLinks,
  className,
  contentClassName,
  ctaBannerClassName,
  ctaHeadingClassName,
  ctaDescriptionClassName,
  ctaButtonClassName,
  gridClassName,
  brandClassName,
  logoWrapperClassName,
  logoClassName,
  newsletterClassName,
  newsletterInputClassName,
  newsletterButtonClassName,
  socialLinksClassName,
  socialLinkClassName,
  navSectionClassName,
  navTitleClassName,
  navLinksClassName,
  navLinkClassName,
  bottomClassName,
  copyrightClassName,
  legalLinksClassName,
  legalLinkClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterCtaBannerProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("dark", className)}
    >
      <div className={cn(contentClassName)}>
        <footer>
          {/* CTA Banner */}
          <div className={cn("mb-16 rounded-lg border p-8 text-center md:p-12", ctaBannerClassName)}>
            <h2 className={cn("mb-4 text-3xl font-bold md:text-4xl", ctaHeadingClassName)}>
              {ctaHeading}
            </h2>
            <p className={cn("mx-auto mb-6 max-w-2xl opacity-80", ctaDescriptionClassName)}>
              {ctaDescription}
            </p>
            <Pressable
              href={ctaButtonUrl}
              className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md border text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:opacity-80 h-11 px-8", ctaButtonClassName)}
            >
              {ctaButtonText}
            </Pressable>
          </div>

          {/* Main Footer Content */}
          <div className={cn("grid gap-10 lg:grid-cols-5", gridClassName)}>
            {/* Brand Section */}
            <div className={cn("lg:col-span-2", brandClassName)}>
              {logo && (
                <FooterLogo
                  logo={logo}
                  logoClassName={cn("mb-6", logoWrapperClassName)}
                  logoImageClassName={logoClassName}
                  optixFlowConfig={optixFlowConfig}
                />
              )}
              <div className={cn("mb-6", newsletterClassName)}>
                <p className="mb-2 text-sm font-medium">{newsletterLabel}</p>
                <div className="flex max-w-sm gap-2">
                  <input
                    type="email"
                    placeholder={newsletterPlaceholder}
                    className={cn("flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", newsletterInputClassName)}
                  />
                  <button
                    type="submit"
                    className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2", newsletterButtonClassName)}
                  >
                    {newsletterButtonText}
                  </button>
                </div>
              </div>
              <ul className={cn("flex items-center gap-4", socialLinksClassName)}>
                {socialLinks?.map((social, idx) => (
                  <li key={idx}>
                    <SocialLinkIcon
                      href={social.href}
                      label={social.label}
                      iconNameOverride={social.iconNameOverride}
                      className={cn("opacity-80 transition-colors hover:opacity-100", socialLinkClassName)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Sections */}
            {sections?.map((section, sectionIdx) => (
              <div key={sectionIdx} className={cn(navSectionClassName)}>
                <h3 className={cn("mb-4 font-semibold", navTitleClassName)}>{section.title}</h3>
                <ul className={cn("space-y-3 text-sm opacity-80", navLinksClassName)}>
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Pressable
                        href={link.href}
                        className={cn("hover:opacity-100", navLinkClassName)}
                      >
                        {link.name}
                      </Pressable>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className={cn("mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-sm opacity-80 md:flex-row md:items-center", bottomClassName)}>
            <div className={cn("flex flex-col gap-2 md:flex-row md:items-center md:gap-4", copyrightClassName)}>
              <FooterCopyright copyright={copyright} />
              <BrandAttribution
                internalBrandSlug="open_site_ai"
                optionIndex={8}
                variant="span"
                linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
              />
            </div>
            <ul className={cn("flex gap-4", legalLinksClassName)}>
              {legalLinks?.map((link, idx) => (
                <li key={idx}>
                  <Pressable href={link.href} className={cn("hover:opacity-100", legalLinkClassName)}>
                    {link.name}
                  </Pressable>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </Section>
  );
}
