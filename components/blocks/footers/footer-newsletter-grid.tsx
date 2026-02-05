"use client";

import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { FooterLogo } from "../../ui/footer-logo";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { FooterSocialLink } from "./types";

/**
 * Navigation section configuration
 */
export interface FooterNewsletterGridSection {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

/**
 * Props for the FooterNewsletterGrid component
 */
export interface FooterNewsletterGridProps {
  /** Logo configuration */
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** Brand description text */
  description?: string;
  /** Navigation sections */
  sections?: FooterNewsletterGridSection[];
  /** Social media links */
  socialLinks?: FooterSocialLink[];
  /** Newsletter section title */
  newsletterTitle?: string;
  /** Newsletter placeholder text */
  newsletterPlaceholder?: string;
  /** Newsletter button text */
  newsletterButtonText?: string;
  /** Privacy policy text */
  privacyText?: string;
  /** Privacy policy link text */
  privacyLinkText?: string;
  /** Privacy policy URL */
  privacyLinkUrl?: string;
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Section background variant */
  background?: SectionBackground;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern name */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * FooterNewsletterGrid - A comprehensive footer with logo, social icons, navigation, and newsletter.
 *
 * Features a full-width grid layout with brand section (logo, description, social icons),
 * multi-column navigation, and a prominent newsletter signup form. Ideal for content-heavy
 * websites, SaaS products, and businesses that prioritize email marketing and social engagement.
 */
export function FooterNewsletterGrid({
  logo,
  className,
  description,
  sections,
  socialLinks,
  newsletterTitle,
  newsletterPlaceholder,
  newsletterButtonText,
  privacyText,
  privacyLinkText,
  privacyLinkUrl,
  copyright,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterNewsletterGridProps): React.JSX.Element {
  const sectionsContent = useMemo(() => {
    if (!sections || sections.length === 0) return null;

    return sections.map((section, sectionIdx) => (
      <div key={sectionIdx} className="col-span-2 md:col-span-1">
        <h3 className="mb-5 font-medium">{section.title}</h3>
        <ul className="space-y-4 text-sm opacity-80">
          {section.links.map((link, linkIdx) => (
            <li
              key={linkIdx}
              className="font-medium hover:opacity-100"
            >
              <Pressable href={link.href}>{link.name}</Pressable>
            </li>
          ))}
        </ul>
      </div>
    ));
  }, [sections]);

  const socialLinksContent = useMemo(() => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((social, idx) => (
      <li key={idx}>
        <SocialLinkIcon
          href={social.href}
          label={social.label}
          iconNameOverride={social.iconNameOverride}
          iconSize={24}
          className="font-medium duration-200 hover:scale-110 hover:opacity-70"
        />
      </li>
    ));
  }, [socialLinks]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div>
        <footer>
          <div className="grid grid-cols-4 justify-between gap-10 lg:grid-cols-6 lg:text-left">
            <div className="col-span-4 flex w-full flex-col gap-6 lg:col-span-2">
              {logo && (
                <div className="flex items-center gap-2 lg:justify-start">
                  <FooterLogo
                    logo={logo}
                    logoImageClassName="h-8"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              )}
              {description && (
                <p className="opacity-80">{description}</p>
              )}
              {socialLinks && socialLinks.length > 0 && (
                <ul className="flex items-center space-x-6">
                  {socialLinksContent}
                </ul>
              )}
            </div>
            {sectionsContent}
            {(newsletterTitle || newsletterButtonText) && (
              <div className="col-span-4 md:col-span-2">
                {newsletterTitle && (
                  <h3 className="mb-5 font-medium">{newsletterTitle}</h3>
                )}
                <div className="grid gap-1.5">
                  <div className="flex w-full items-center space-x-2">
                    <input
                      type="email"
                      placeholder={newsletterPlaceholder}
                      className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                {(privacyText || privacyLinkText) && (
                  <p className="mt-1 text-xs font-medium opacity-80">
                    {privacyText}
                    {privacyLinkText && privacyLinkUrl && (
                      <Pressable
                        href={privacyLinkUrl}
                        className="ml-1 hover:underline hover:opacity-100"
                      >
                        {privacyLinkText}
                      </Pressable>
                    )}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium opacity-80 lg:flex-row lg:items-center lg:text-left">
            <div className="flex flex-wrap items-center gap-4">
              <FooterCopyright copyright={copyright} />
              <BrandAttribution
                internalBrandSlug="open_site_ai"
                optionIndex={3}
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
