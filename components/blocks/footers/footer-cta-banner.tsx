"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { OptixFlowConfig } from "../../../src/types/blocks";
import type { PatternName } from "../../ui/pattern-background";

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
 * Social link configuration
 */
export interface FooterCtaBannerSocialLink {
  /** Icon name in format: prefix/name (e.g., "simple-icons/instagram") */
  icon: string;
  /** Link URL */
  href: string;
  /** Accessible label */
  label: string;
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
  socialLinks?: FooterCtaBannerSocialLink[];
  /** Newsletter label */
  newsletterLabel?: React.ReactNode;
  /** Newsletter placeholder */
  newsletterPlaceholder?: string;
  /** Newsletter button text */
  newsletterButtonText?: React.ReactNode;
  /** Copyright text */
  copyright?: React.ReactNode;
  /** Attribution text */
  attributionText?: React.ReactNode;
  /** Attribution link URL */
  attributionHref?: string;
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
  /** Additional CSS classes for the logo title */
  logoTitleClassName?: string;
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
  logo = {
    url: "https://opensite.ai",
    src: "https://cdn.ing/assets/i/r/285975/eud79qeya11q5w6ueyhklueardyx/os-suircle-black-white.png",
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  ctaHeading,
  ctaDescription,
  ctaButtonText,
  ctaButtonUrl = "#",
  sections,
  socialLinks,
  newsletterLabel,
  newsletterPlaceholder = "Enter your email",
  newsletterButtonText,
  copyright,
  attributionText,
  attributionHref = "https://opensite.ai",
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
  logoTitleClassName,
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
  background = "dark",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterCtaBannerProps): React.JSX.Element {
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright ?? `© ${currentYear} Opensite AI. All rights reserved.`;

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
          <div className={cn("mb-16 rounded-lg bg-primary/10 p-8 text-center md:p-12", ctaBannerClassName)}>
            <h2 className={cn("mb-4 text-3xl font-bold md:text-4xl", ctaHeadingClassName)}>
              {ctaHeading}
            </h2>
            <p className={cn("mx-auto mb-6 max-w-2xl text-muted-foreground", ctaDescriptionClassName)}>
              {ctaDescription}
            </p>
            <Pressable
              href={ctaButtonUrl}
              className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8", ctaButtonClassName)}
            >
              {ctaButtonText}
            </Pressable>
          </div>

          {/* Main Footer Content */}
          <div className={cn("grid gap-10 lg:grid-cols-5", gridClassName)}>
            {/* Brand Section */}
            <div className={cn("lg:col-span-2", brandClassName)}>
              <Pressable
                href={logo.url}
                className={cn("mb-6 flex items-center gap-2", logoWrapperClassName)}
              >
                <Img
                  src={logo.src}
                  alt={logo.alt}
                  className={cn("h-8 invert", logoClassName)}
                  optixFlowConfig={optixFlowConfig}
                />
                <span className={cn("text-xl font-semibold", logoTitleClassName)}>{logo.title}</span>
              </Pressable>
              <div className={cn("mb-6", newsletterClassName)}>
                <p className="mb-2 text-sm font-medium">{newsletterLabel}</p>
                <div className="flex max-w-sm gap-2">
                  <input
                    type="email"
                    placeholder={newsletterPlaceholder}
                    className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", newsletterInputClassName)}
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
                    <Pressable
                      href={social.href}
                      aria-label={social.label}
                      className={cn("text-muted-foreground transition-colors hover:text-foreground", socialLinkClassName)}
                    >
                      <DynamicIcon name={social.icon} size={20} />
                    </Pressable>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Sections */}
            {sections?.map((section, sectionIdx) => (
              <div key={sectionIdx} className={cn(navSectionClassName)}>
                <h3 className={cn("mb-4 font-semibold", navTitleClassName)}>{section.title}</h3>
                <ul className={cn("space-y-3 text-sm text-muted-foreground", navLinksClassName)}>
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Pressable
                        href={link.href}
                        className={cn("hover:text-foreground", navLinkClassName)}
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
          <div className={cn("mt-16 flex flex-col justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center", bottomClassName)}>
            <div className={cn("flex flex-col gap-2 md:flex-row md:items-center md:gap-4", copyrightClassName)}>
              <p>{copyrightText}</p>
              <Pressable
                href={attributionHref}
                className="hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                {attributionText}
              </Pressable>
            </div>
            <ul className={cn("flex gap-4", legalLinksClassName)}>
              {legalLinks?.map((link, idx) => (
                <li key={idx}>
                  <Pressable href={link.href} className={cn("hover:text-foreground", legalLinkClassName)}>
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
