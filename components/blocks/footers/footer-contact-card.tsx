"use client";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { FooterLogo } from "../../ui/footer-logo";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { Section } from "../../ui/section";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { OptixFlowConfig } from "../../../src/types/blocks";
import type { FooterSocialLink } from "./types";

/**
 * Logo configuration for the footer
 */
export interface FooterContactCardLogo {
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
export interface FooterContactCardNavLink {
  /** Link name/label */
  name: string;
  /** Link URL */
  href: string;
}

/**
 * Props for the FooterContactCard component
 */
export interface FooterContactCardProps {
  /** Logo configuration */
  logo?: FooterContactCardLogo;
  /** Main heading text */
  heading?: React.ReactNode;
  /** Contact email */
  email?: string;
  /** Contact phone */
  phone?: string;
  /** Contact address */
  address?: React.ReactNode;
  /** Social media links */
  socialLinks?: FooterSocialLink[];
  /** Navigation links */
  navLinks?: FooterContactCardNavLink[];
  /** Social section title */
  socialTitle?: React.ReactNode;
  /** Location text */
  location?: React.ReactNode;
  /** Location label */
  locationLabel?: React.ReactNode;
  /** Brand/company name for the copyright notice */
  copyright?: string;
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
  /** Additional CSS classes for the heading */
  headingClassName?: string;
  /** Additional CSS classes for the contact section */
  contactClassName?: string;
  /** Additional CSS classes for the right column */
  rightColumnClassName?: string;
  /** Additional CSS classes for the social section */
  socialSectionClassName?: string;
  /** Additional CSS classes for the social title */
  socialTitleClassName?: string;
  /** Additional CSS classes for the social links list */
  socialLinksClassName?: string;
  /** Additional CSS classes for social link items */
  socialLinkClassName?: string;
  /** Additional CSS classes for the navigation */
  navClassName?: string;
  /** Additional CSS classes for navigation link items */
  navLinkClassName?: string;
  /** Additional CSS classes for the bottom section */
  bottomClassName?: string;
  /** Additional CSS classes for the copyright section */
  copyrightClassName?: string;
  /** Additional CSS classes for the location section */
  locationClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern name */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * FooterContactCard - A footer with large heading, contact information, and social links.
 *
 * Features a prominent heading, contact details (email, phone, address), social media icons,
 * and horizontal navigation. Ideal for service businesses, agencies, and professional websites
 * that want to emphasize contact information and make it easy for visitors to get in touch.
 */
export function FooterContactCard({
  sectionId = "footer-contact-card",
  logo,
  heading,
  email,
  phone,
  address,
  socialLinks,
  navLinks,
  socialTitle,
  location,
  locationLabel,
  copyright,
  className,
  contentClassName,
  gridClassName,
  leftColumnClassName,
  logoWrapperClassName,
  logoClassName,
  headingClassName,
  contactClassName,
  rightColumnClassName,
  socialSectionClassName,
  socialTitleClassName,
  socialLinksClassName,
  socialLinkClassName,
  navClassName,
  navLinkClassName,
  bottomClassName,
  copyrightClassName,
  locationClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterContactCardProps): React.JSX.Element {
  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className={cn(contentClassName)}>
        <footer>
          <div className={cn("grid gap-12 lg:grid-cols-2", gridClassName)}>
            {/* Left Column - Heading and Contact */}
            <div className={cn(leftColumnClassName)}>
              {logo && (
                <FooterLogo
                  logo={logo}
                  logoClassName={cn("mb-8", logoWrapperClassName)}
                  logoImageClassName={logoClassName}
                  optixFlowConfig={optixFlowConfig}
                />
              )}
              {heading && (
                <h2
                  className={cn(
                    "mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              )}
              {(email || phone || address) && (
                <div className={cn("space-y-4 opacity-80", contactClassName)}>
                  {email && (
                    <p>
                      <Pressable
                        href={`mailto:${email}`}
                        className="hover:opacity-100"
                      >
                        {email}
                      </Pressable>
                    </p>
                  )}
                  {phone && (
                    <p>
                      <Pressable
                        href={`tel:${phone}`}
                        className="hover:opacity-100"
                      >
                        {phone}
                      </Pressable>
                    </p>
                  )}
                  {address && <p>{address}</p>}
                </div>
              )}
            </div>

            {/* Right Column - Social and Navigation */}
            <div
              className={cn(
                "flex flex-col justify-between",
                rightColumnClassName,
              )}
            >
              {(socialTitle || (socialLinks && socialLinks.length > 0)) && (
                <div className={cn(socialSectionClassName)}>
                  {socialTitle && (
                    <p className={cn("mb-4 font-medium", socialTitleClassName)}>
                      {socialTitle}
                    </p>
                  )}
                  {socialLinks && socialLinks.length > 0 && (
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
                            className={cn(
                              "flex size-12 items-center justify-center rounded-full border transition-colors hover:opacity-80",
                              socialLinkClassName,
                            )}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {navLinks && navLinks.length > 0 && (
                <nav className={cn("mt-18 md:mt-8", navClassName)}>
                  <ul className="flex flex-wrap gap-6">
                    {navLinks.map((link, idx) => (
                      <li key={idx}>
                        <Pressable
                          href={link.href}
                          className={cn(
                            "opacity-80 hover:opacity-100",
                            navLinkClassName,
                          )}
                        >
                          {link.name}
                        </Pressable>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className={cn(
              "mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-sm opacity-80 md:flex-row md:items-center",
              bottomClassName,
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-2 md:flex-row md:items-center md:gap-4",
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
            {(locationLabel || location) && (
              <p className={cn(locationClassName)}>
                {locationLabel} {location && <strong>{location}</strong>}
              </p>
            )}
          </div>
        </footer>
      </div>
    </Section>
  );
}
