"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import type { FooterSocialLink } from "./types";

/**
 * Props for the FooterCtaSocial component
 */
export interface FooterCtaSocialProps {
  /** Pre-heading text */
  preHeading?: React.ReactNode;
  /** Main heading text */
  heading?: React.ReactNode;
  /** Description text */
  description?: React.ReactNode;
  /** CTA button text */
  buttonText?: React.ReactNode;
  /** CTA button URL */
  buttonUrl?: string;
  /** Contact email */
  email?: string;
  /** Social links */
  socialLinks?: FooterSocialLink[];
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
  /** Additional CSS classes for the main content container */
  containerClassName?: string;
  /** Additional CSS classes for the pre-heading wrapper */
  preHeadingWrapperClassName?: string;
  /** Additional CSS classes for the decorative lines */
  decorativeLineClassName?: string;
  /** Additional CSS classes for the pre-heading text */
  preHeadingClassName?: string;
  /** Additional CSS classes for the heading */
  headingClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the CTA button */
  buttonClassName?: string;
  /** Additional CSS classes for the social links section */
  socialLinksClassName?: string;
  /** Additional CSS classes for social link items */
  socialLinkClassName?: string;
  /** Additional CSS classes for the email section */
  emailClassName?: string;
  /** Additional CSS classes for the bottom section */
  bottomClassName?: string;
  /** Additional CSS classes for the copyright */
  copyrightClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * FooterCtaSocial - A centered CTA footer with decorative lines and social icons.
 *
 * Features a centered layout with decorative gradient lines, pre-heading text,
 * large heading, description, prominent CTA button, social media icons, and
 * contact email. Ideal for landing pages, marketing sites, and businesses
 * that want a conversion-focused footer with strong visual appeal.
 */
export function FooterCtaSocial({
  sectionId = "footer-cta-social",
  preHeading,
  heading,
  description,
  buttonText,
  buttonUrl = "#",
  email,
  socialLinks,
  copyright,
  className,
  contentClassName,
  containerClassName,
  preHeadingWrapperClassName,
  decorativeLineClassName,
  preHeadingClassName,
  headingClassName,
  descriptionClassName,
  buttonClassName,
  socialLinksClassName,
  socialLinkClassName,
  emailClassName,
  bottomClassName,
  copyrightClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: FooterCtaSocialProps): React.JSX.Element {
  const socialLinksContent = useMemo(() => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((link) => (
      <SocialLinkIcon
        key={link.href}
        href={link.href}
        label={link.label}
        iconNameOverride={link.iconNameOverride}
        asButton
        variant="outline"
        size="icon"
        className={cn("h-12 w-12 rounded-full", socialLinkClassName)}
      />
    ));
  }, [socialLinks, socialLinkClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative", className)}
    >
      <div className={cn("relative z-10", contentClassName)}>
        <div className={cn("mx-auto flex max-w-3xl flex-col items-center gap-2 text-center", containerClassName)}>
          <div className={cn("flex w-full items-center gap-4", preHeadingWrapperClassName)}>
            <div className={cn("h-px flex-1 bg-[linear-gradient(270deg,hsl(var(--primary,0_0%_100%))_0%,hsl(var(--secondary,0_0%_0%))_100%)] opacity-50", decorativeLineClassName)} />
            <p className={cn("text-sm opacity-70 italic md:text-base", preHeadingClassName)}>
              {preHeading}
            </p>
            <div className={cn("h-px flex-1 bg-[linear-gradient(270deg,hsl(var(--secondary,0_0%_0%))_0%,hsl(var(--primary,0_0%_100%))_100%)] opacity-50", decorativeLineClassName)} />
          </div>

          <h2 className={cn("py-6 text-5xl font-bold md:text-6xl", headingClassName)}>{heading}</h2>

          <p className={cn("max-w-2xl text-base opacity-80 md:text-lg", descriptionClassName)}>
            {description}
          </p>

          <Pressable
            href={buttonUrl}
            className={cn("group relative mt-4 inline-flex items-center gap-2 rounded-lg border px-8 py-4 text-base font-medium transition-all hover:opacity-80", buttonClassName)}
          >
            <span>{buttonText}</span>
            <DynamicIcon
              name="lucide/arrow-up-right"
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Pressable>

          {socialLinks && socialLinks.length > 0 && (
            <div className={cn("flex items-center gap-6 pt-8", socialLinksClassName)}>
              {socialLinksContent}
            </div>
          )}

          {email && (
            <p className={cn("pt-2 text-sm opacity-80 md:text-base", emailClassName)}>
              <Pressable
                href={`mailto:${email}`}
                className="transition-colors hover:opacity-100"
              >
                {email}
              </Pressable>
            </p>
          )}

          <div className={cn("mt-8 border-t pt-8 text-sm opacity-70", bottomClassName)}>
            <div className={cn("flex flex-col gap-2", copyrightClassName)}>
              <FooterCopyright copyright={copyright} />
              <BrandAttribution
                internalBrandSlug="open_site_ai"
                optionIndex={9}
                variant="span"
                linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
