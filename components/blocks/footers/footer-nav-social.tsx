"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { OptixFlowConfig } from "../../../src/types/blocks";

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
 * Social link configuration
 */
export interface FooterNavSocialLink {
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
  socialLinks?: FooterNavSocialLink[];
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
  /** Additional CSS classes for the logo title */
  logoTitleClassName?: string;
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
  pattern?: string;
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
  logo = {
    url: "https://opensite.ai",
    src: "https://cdn.ing/assets/i/r/285975/eud79qeya11q5w6ueyhklueardyx/os-suircle-black-white.png",
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  sections,
  socialLinks,
  newsletterHeading,
  newsletterDescription,
  newsletterPlaceholder = "Enter your email",
  newsletterButtonText,
  socialTitle,
  copyright,
  attributionText,
  attributionHref = "https://opensite.ai",
  legalLinks,
  className,
  contentClassName,
  gridClassName,
  leftColumnClassName,
  logoWrapperClassName,
  logoClassName,
  logoTitleClassName,
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
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterNavSocialProps): React.JSX.Element {
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright ?? `© ${currentYear} Opensite AI. All rights reserved.`;

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
              <Pressable
                href={logo.url}
                className={cn("mb-8 flex items-center gap-2", logoWrapperClassName)}
              >
                <Img
                  src={logo.src}
                  alt={logo.alt}
                  className={cn("h-10", logoClassName)}
                  optixFlowConfig={optixFlowConfig}
                />
                <span className={cn("text-xl font-semibold", logoTitleClassName)}>{logo.title}</span>
              </Pressable>
              <div className={cn("grid gap-8 sm:grid-cols-3", navGridClassName)}>
                {sections?.map((section, sectionIdx) => (
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
                ))}
              </div>
            </div>

            <div className={cn("flex flex-col justify-between", rightColumnClassName)}>
              <div className={cn("mb-8", newsletterClassName)}>
                <h3 className={cn("mb-2 text-lg font-semibold", newsletterHeadingClassName)}>
                  {newsletterHeading}
                </h3>
                <p className={cn("mb-4 text-sm text-muted-foreground", newsletterDescriptionClassName)}>
                  {newsletterDescription}
                </p>
                <div className={cn("flex max-w-md gap-2", newsletterFormClassName)}>
                  <input
                    type="email"
                    placeholder={newsletterPlaceholder}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    {newsletterButtonText}
                  </button>
                </div>
              </div>
              <div className={cn(socialSectionClassName)}>
                <p className={cn("mb-4 font-medium", socialTitleClassName)}>{socialTitle}</p>
                <ul className={cn("flex items-center gap-4", socialLinksClassName)}>
                  {socialLinks?.map((social, idx) => (
                    <li key={idx}>
                      <Pressable
                        href={social.href}
                        aria-label={social.label}
                        className={cn("text-muted-foreground transition-colors hover:text-primary", socialLinkClassName)}
                      >
                        <DynamicIcon name={social.icon} size={20} />
                      </Pressable>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={cn("mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row md:items-center", bottomClassName)}>
            <div className={cn("flex flex-col gap-2 md:flex-row md:items-center md:gap-4", copyrightClassName)}>
              <p>{copyrightText}</p>
              <Pressable
                href={attributionHref}
                className="hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {attributionText}
              </Pressable>
            </div>
            <ul className={cn("flex gap-4", legalLinksClassName)}>
              {legalLinks?.map((link, idx) => (
                <li key={idx} className={cn(legalLinkClassName)}>
                  <Pressable href={link.href} className="hover:text-primary">
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
