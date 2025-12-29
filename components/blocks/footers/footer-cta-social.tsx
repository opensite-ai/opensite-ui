"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Social link configuration with icon
 */
export interface FooterCtaSocialLink {
  /** Icon name in format: prefix/name (e.g., "lucide/twitter") */
  icon: string;
  /** Link URL */
  url: string;
  /** Accessible label */
  label: string;
}

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
  socialLinks?: FooterCtaSocialLink[];
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
  pattern?: string;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
}

const defaultSocialLinks: FooterCtaSocialLink[] = [
  { icon: "lucide/twitter", url: "#", label: "Twitter" },
  { icon: "lucide/instagram", url: "#", label: "Instagram" },
  { icon: "lucide/facebook", url: "#", label: "Facebook" },
];

/**
 * FooterCtaSocial - A centered CTA footer with decorative lines and social icons.
 *
 * Features a centered layout with decorative gradient lines, pre-heading text,
 * large heading, description, prominent CTA button, social media icons, and
 * contact email. Ideal for landing pages, marketing sites, and businesses
 * that want a conversion-focused footer with strong visual appeal.
 */
export function FooterCtaSocial({
  preHeading = "Let's connect",
  heading = "You want to scale faster? Try Opensite today.",
  description = "Join thousands of companies already using our platform to scale their operations",
  buttonText = "Get Started Now",
  buttonUrl = "#",
  email = "hello@opensite.ai",
  socialLinks = defaultSocialLinks,
  copyright,
  attributionText = "AI Website and Automation Platform by Opensite",
  attributionHref = "https://opensite.ai",
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
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: FooterCtaSocialProps): React.JSX.Element {
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright ?? `© ${currentYear} Opensite AI. All rights reserved.`;

  return (
    <Section
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
            <p className={cn("text-sm text-muted-foreground italic md:text-base", preHeadingClassName)}>
              {preHeading}
            </p>
            <div className={cn("h-px flex-1 bg-[linear-gradient(270deg,hsl(var(--secondary,0_0%_0%))_0%,hsl(var(--primary,0_0%_100%))_100%)] opacity-50", decorativeLineClassName)} />
          </div>

          <h2 className={cn("py-6 text-5xl font-bold md:text-6xl", headingClassName)}>{heading}</h2>

          <p className={cn("max-w-2xl text-base text-muted-foreground md:text-lg", descriptionClassName)}>
            {description}
          </p>

          <Pressable
            href={buttonUrl}
            className={cn("group relative mt-4 inline-flex items-center gap-2 rounded-lg border bg-background px-8 py-4 text-base font-medium transition-all hover:bg-muted", buttonClassName)}
          >
            <span>{buttonText}</span>
            <DynamicIcon
              name="lucide/arrow-up-right"
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Pressable>

          <div className={cn("flex items-center gap-6 pt-8", socialLinksClassName)}>
            {socialLinks.map((link, idx) => (
              <React.Fragment key={idx}>
                <Pressable
                  href={link.url}
                  className={cn("text-muted-foreground transition-colors hover:text-foreground", socialLinkClassName)}
                  aria-label={link.label}
                >
                  <DynamicIcon name={link.icon} size={20} />
                </Pressable>
                {idx < socialLinks.length - 1 && (
                  <div className="h-4 w-px bg-border" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className={cn("pt-2 text-sm text-muted-foreground md:text-base", emailClassName)}>
            <Pressable
              href={`mailto:${email}`}
              className="transition-colors hover:text-foreground"
            >
              {email}
            </Pressable>
          </p>

          <div className={cn("mt-8 border-t pt-8 text-sm text-muted-foreground", bottomClassName)}>
            <p className={cn(copyrightClassName)}>
              {copyrightText}
            </p>
            <Pressable
              href={attributionHref}
              className="mt-2 inline-block hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              {attributionText}
            </Pressable>
          </div>
        </div>
      </div>
    </Section>
  );
}
