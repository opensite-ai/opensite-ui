"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

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
  /** Additional CSS classes */
  className?: string;
  /** Pre-heading text */
  preHeading?: string;
  /** Main heading text */
  heading?: string;
  /** Description text */
  description?: string;
  /** CTA button text */
  buttonText?: string;
  /** CTA button URL */
  buttonUrl?: string;
  /** Contact email */
  email?: string;
  /** Social links */
  socialLinks?: FooterCtaSocialLink[];
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
  className,
  preHeading = "Let's connect",
  heading = "You want to scale faster? Try Opensite today.",
  description = "Join thousands of companies already using our platform to scale their operations",
  buttonText = "Get Started Now",
  buttonUrl = "#",
  email = "hello@opensite.ai",
  socialLinks = defaultSocialLinks,
}: FooterCtaSocialProps): React.JSX.Element {
  return (
    <section className={cn("relative py-32", className)}>
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
          {/* Pre-heading with decorative lines */}
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-[linear-gradient(270deg,var(--primary,rgb(255,255,255))_0%,var(--secondary,rgb(0,0,0))_100%)] opacity-50" />
            <p className="text-sm text-muted-foreground italic md:text-base">
              {preHeading}
            </p>
            <div className="h-px flex-1 bg-[linear-gradient(270deg,var(--secondary,rgb(0,0,0))_0%,var(--primary,rgb(255,255,255))_100%)] opacity-50" />
          </div>

          {/* Main heading */}
          <h2 className="py-6 text-5xl font-bold md:text-6xl">{heading}</h2>

          {/* Description */}
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            {description}
          </p>

          {/* CTA Button */}
          <Pressable
            href={buttonUrl}
            className="group relative mt-4 inline-flex items-center gap-2 rounded-lg border bg-background px-8 py-4 text-base font-medium transition-all hover:bg-muted"
          >
            <span>{buttonText}</span>
            <DynamicIcon
              name="lucide/arrow-up-right"
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Pressable>

          {/* Social Media Links */}
          <div className="flex items-center gap-6 pt-8">
            {socialLinks.map((link, idx) => (
              <React.Fragment key={idx}>
                <Pressable
                  href={link.url}
                  className="text-muted-foreground transition-colors hover:text-foreground"
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

          {/* Support Email */}
          <p className="pt-2 text-sm text-muted-foreground md:text-base">
            <Pressable
              href={`mailto:${email}`}
              className="transition-colors hover:text-foreground"
            >
              {email}
            </Pressable>
          </p>

          {/* Attribution */}
          <div className="mt-8 border-t pt-8 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Opensite AI. All rights reserved.
            </p>
            <Pressable
              href="https://opensite.ai"
              className="mt-2 inline-block hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              AI Website and Automation Platform by Opensite
            </Pressable>
          </div>
        </div>
      </div>
    </section>
  );
}
