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
 * Social link configuration
 */
export interface FooterContactCardSocialLink {
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
  socialLinks?: FooterContactCardSocialLink[];
  /** Navigation links */
  navLinks?: FooterContactCardNavLink[];
  /** Social section title */
  socialTitle?: React.ReactNode;
  /** Location text */
  location?: React.ReactNode;
  /** Location label */
  locationLabel?: React.ReactNode;
  /** Copyright text */
  copyright?: React.ReactNode;
  /** Attribution text */
  attributionText?: React.ReactNode;
  /** Attribution link URL */
  attributionHref?: string;
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
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern */
  pattern?: string;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultSocialLinks: FooterContactCardSocialLink[] = [
  { icon: "simple-icons/instagram", href: "#", label: "Instagram" },
  { icon: "simple-icons/facebook", href: "#", label: "Facebook" },
  { icon: "simple-icons/x", href: "#", label: "X (Twitter)" },
  { icon: "simple-icons/linkedin", href: "#", label: "LinkedIn" },
];

const defaultNavLinks: FooterContactCardNavLink[] = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Services", href: "#" },
  { name: "Contact", href: "#" },
];

/**
 * FooterContactCard - A footer with large heading, contact information, and social links.
 *
 * Features a prominent heading, contact details (email, phone, address), social media icons,
 * and horizontal navigation. Ideal for service businesses, agencies, and professional websites
 * that want to emphasize contact information and make it easy for visitors to get in touch.
 */
export function FooterContactCard({
  logo = {
    url: "https://opensite.ai",
    src: "https://cdn.ing/assets/i/r/285975/eud79qeya11q5w6ueyhklueardyx/os-suircle-black-white.png",
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  heading = "Let's work together",
  email = "hello@opensite.ai",
  phone = "+1 (555) 123-4567",
  address = "123 Main Street, San Francisco, CA 94102",
  socialLinks = defaultSocialLinks,
  navLinks = defaultNavLinks,
  socialTitle = "Follow Us",
  location = "San Francisco",
  locationLabel = "Designed in",
  copyright,
  attributionText = "AI Website and Automation Platform by Opensite",
  attributionHref = "https://opensite.ai",
  className,
  contentClassName,
  gridClassName,
  leftColumnClassName,
  logoWrapperClassName,
  logoClassName,
  logoTitleClassName,
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
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterContactCardProps): React.JSX.Element {
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
          <div className={cn("grid gap-12 lg:grid-cols-2", gridClassName)}>
            {/* Left Column - Heading and Contact */}
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
              <h2 className={cn("mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h2>
              <div className={cn("space-y-4 text-muted-foreground", contactClassName)}>
                <p>
                  <Pressable
                    href={`mailto:${email}`}
                    className="hover:text-primary"
                  >
                    {email}
                  </Pressable>
                </p>
                <p>
                  <Pressable
                    href={`tel:${phone}`}
                    className="hover:text-primary"
                  >
                    {phone}
                  </Pressable>
                </p>
                <p>{address}</p>
              </div>
            </div>

            {/* Right Column - Social and Navigation */}
            <div className={cn("flex flex-col justify-between", rightColumnClassName)}>
              <div className={cn(socialSectionClassName)}>
                <p className={cn("mb-4 font-medium", socialTitleClassName)}>{socialTitle}</p>
                <ul className={cn("flex items-center gap-4", socialLinksClassName)}>
                  {socialLinks.map((social, idx) => (
                    <li key={idx}>
                      <Pressable
                        href={social.href}
                        aria-label={social.label}
                        className={cn("flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground", socialLinkClassName)}
                      >
                        <DynamicIcon name={social.icon} size={20} />
                      </Pressable>
                    </li>
                  ))}
                </ul>
              </div>
              <nav className={cn("mt-8", navClassName)}>
                <ul className="flex flex-wrap gap-6">
                  {navLinks.map((link, idx) => (
                    <li key={idx}>
                      <Pressable
                        href={link.href}
                        className={cn("text-muted-foreground hover:text-primary", navLinkClassName)}
                      >
                        {link.name}
                      </Pressable>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Bottom Section */}
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
            <p className={cn(locationClassName)}>
              {locationLabel} <strong>{location}</strong>
            </p>
          </div>
        </footer>
      </div>
    </Section>
  );
}
