"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";

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
 * Navigation section configuration
 */
export interface FooterCtaBannerSection {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

/**
 * Props for the FooterCtaBanner component
 */
export interface FooterCtaBannerProps {
  /** Logo configuration */
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** CTA banner heading */
  ctaHeading?: string;
  /** CTA banner description */
  ctaDescription?: string;
  /** CTA button text */
  ctaButtonText?: string;
  /** CTA button URL */
  ctaButtonUrl?: string;
  /** Navigation sections */
  sections?: FooterCtaBannerSection[];
  /** Social media links */
  socialLinks?: FooterCtaBannerSocialLink[];
  /** Newsletter label */
  newsletterLabel?: string;
  /** Newsletter placeholder */
  newsletterPlaceholder?: string;
  /** Newsletter button text */
  newsletterButtonText?: string;
  /** Copyright text */
  copyright?: string;
  /** Legal links */
  legalLinks?: {
    name: string;
    href: string;
  }[];
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: FooterCtaBannerSection[] = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
    ],
  },
];

const defaultSocialLinks: FooterCtaBannerSocialLink[] = [
  { icon: "simple-icons/instagram", href: "#", label: "Instagram" },
  { icon: "simple-icons/facebook", href: "#", label: "Facebook" },
  { icon: "simple-icons/x", href: "#", label: "X (Twitter)" },
  { icon: "simple-icons/linkedin", href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

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
  className,
  ctaHeading = "Ready to get started?",
  ctaDescription = "Join thousands of satisfied customers using our platform to build amazing websites.",
  ctaButtonText = "Get Started",
  ctaButtonUrl = "#",
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  newsletterLabel = "Subscribe to our newsletter",
  newsletterPlaceholder = "Enter your email",
  newsletterButtonText = "Subscribe",
  copyright = `© ${new Date().getFullYear()} Opensite AI. All rights reserved.`,
  legalLinks = defaultLegalLinks,
  optixFlowConfig,
}: FooterCtaBannerProps): React.JSX.Element {
  return (
    <section className={cn("dark bg-background py-16 text-foreground", className)}>
      <div className="container">
        <footer>
          {/* CTA Banner */}
          <div className="mb-16 rounded-lg bg-primary/10 p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{ctaHeading}</h2>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              {ctaDescription}
            </p>
            <a
              href={ctaButtonUrl}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              {ctaButtonText}
            </a>
          </div>

          {/* Main Footer Content */}
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <a href={logo.url} className="mb-6 flex items-center gap-2">
                <Img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 invert"
                  optixFlowConfig={optixFlowConfig}
                />
                <span className="text-xl font-semibold">{logo.title}</span>
              </a>
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium">{newsletterLabel}</p>
                <div className="flex max-w-sm gap-2">
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
              <ul className="flex items-center gap-4">
                {socialLinks.map((social, idx) => (
                  <li key={idx}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <DynamicIcon name={social.icon} size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Sections */}
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-semibold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href={link.href} className="hover:text-foreground">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <p>{copyright}</p>
              <a
                href="https://opensite.ai"
                className="hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                AI Website and Automation Platform by Opensite
              </a>
            </div>
            <ul className="flex gap-4">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-foreground">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
}
