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
import { PatternName } from "@/components/ui/pattern-background";
import type { FooterSocialLink } from "./types";

/**
 * Logo configuration for the footer
 */
export interface FooterBrandDescriptionLogo {
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
export interface FooterBrandDescriptionLink {
  /** Link name/label */
  name: string;
  /** Link URL */
  href: string;
}

/**
 * Navigation section configuration
 */
export interface FooterBrandDescriptionSection {
  /** Section title */
  title: string;
  /** Links in this section */
  links: FooterBrandDescriptionLink[];
}

/**
 * Props for the FooterBrandDescription component
 */
export interface FooterBrandDescriptionProps {
  /** Logo configuration */
  logo?: FooterBrandDescriptionLogo;
  /** Navigation sections */
  sections?: FooterBrandDescriptionSection[];
  /** Brand description text */
  description?: React.ReactNode;
  /** Social media links */
  socialLinks?: FooterSocialLink[];
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Legal links (terms, privacy, etc.) */
  legalLinks?: FooterBrandDescriptionLink[];
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
  /** Additional CSS classes for the main layout */
  layoutClassName?: string;
  /** Additional CSS classes for the brand column */
  brandColumnClassName?: string;
  /** Additional CSS classes for the logo wrapper */
  logoWrapperClassName?: string;
  /** Additional CSS classes for the logo image */
  logoClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the social links list */
  socialLinksClassName?: string;
  /** Additional CSS classes for social link items */
  socialLinkClassName?: string;
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
  /** Optional background pattern name */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * FooterBrandDescription - A footer with logo, description, social icons, and navigation.
 *
 * Features a prominent brand section with logo, description, and social links on the left,
 * with multi-column navigation on the right. Ideal for brand-focused websites, startups,
 * and businesses that want to emphasize their identity and social presence in the footer.
 */
export function FooterBrandDescription({
  logo,
  sections,
  description,
  socialLinks,
  copyright,
  legalLinks,
  className,
  contentClassName,
  layoutClassName,
  brandColumnClassName,
  logoWrapperClassName,
  logoClassName,
  descriptionClassName,
  socialLinksClassName,
  socialLinkClassName,
  navGridClassName,
  navSectionClassName,
  navTitleClassName,
  navLinksClassName,
  navLinkClassName,
  bottomClassName,
  copyrightClassName,
  legalLinksClassName,
  legalLinkClassName,
  background,
  pattern,
  patternOpacity,
  optixFlowConfig,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
}: FooterBrandDescriptionProps): React.JSX.Element {
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
        <div
          className={cn(
            "flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left",
            layoutClassName,
          )}
        >
          {(logo || description || (socialLinks && socialLinks.length > 0)) && (
            <div
              className={cn(
                "flex w-full flex-col justify-between gap-6 lg:items-start",
                brandColumnClassName,
              )}
            >
              {logo && (
                <div
                  className={cn(
                    "flex items-center gap-2 lg:justify-start",
                    logoWrapperClassName,
                  )}
                >
                  <FooterLogo
                    logo={logo}
                    logoImageClassName={logoClassName}
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              )}
              {description && (
                <p
                  className={cn(
                    "max-w-[70%] text-sm opacity-80",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              )}
              {socialLinks && socialLinks.length > 0 && (
                <ul
                  className={cn(
                    "flex items-center space-x-6 opacity-80",
                    socialLinksClassName,
                  )}
                >
                  {socialLinks.map((social, idx) => (
                    <li key={idx}>
                      <SocialLinkIcon
                        href={social.href}
                        label={social.label}
                        iconNameOverride={social.iconNameOverride}
                        className={cn(
                          "font-medium hover:opacity-100",
                          socialLinkClassName,
                        )}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {sections && sections.length > 0 && (
            <div
              className={cn(
                "grid w-full gap-6 md:grid-cols-3 lg:gap-20",
                navGridClassName,
              )}
            >
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className={cn(navSectionClassName)}>
                  <h3 className={cn("mb-4 font-bold", navTitleClassName)}>
                    {section.title}
                  </h3>
                  <ul
                    className={cn(
                      "space-y-3 text-sm opacity-80",
                      navLinksClassName,
                    )}
                  >
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className={cn(
                          "font-medium hover:opacity-100",
                          navLinkClassName,
                        )}
                      >
                        <Pressable href={link.href}>{link.name}</Pressable>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className={cn(
            "mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium opacity-70 md:flex-row md:items-center md:text-left",
            bottomClassName,
          )}
        >
          <div
            className={cn(
              "order-2 flex flex-col gap-2 lg:order-1 lg:flex-row lg:items-center lg:gap-4",
              copyrightClassName,
            )}
          >
            <FooterCopyright copyright={copyright} />
            <BrandAttribution
              internalBrandSlug="open_site_ai"
              optionIndex={4}
              variant="span"
              linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
            />
          </div>
          {legalLinks && legalLinks.length > 0 && (
            <ul
              className={cn(
                "order-1 flex flex-col gap-2 md:order-2 md:flex-row",
                legalLinksClassName,
              )}
            >
              {legalLinks.map((link, idx) => (
                <li
                  key={idx}
                  className={cn("hover:opacity-100", legalLinkClassName)}
                >
                  <Pressable href={link.href}>{link.name}</Pressable>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
