"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Social link configuration
 */
export interface FooterSocialNewsletterSocialLink {
  /** Icon name in format: prefix/name (e.g., "simple-icons/discord") */
  icon: string;
  /** Link URL */
  href: string;
  /** Accessible label */
  label: string;
}

/**
 * Navigation section configuration
 */
export interface FooterSocialNewsletterSection {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

/**
 * Props for the FooterSocialNewsletter component
 */
export interface FooterSocialNewsletterProps {
  /** Logo configuration */
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** Navigation sections */
  sections?: FooterSocialNewsletterSection[];
  /** Social media links */
  socialLinks?: FooterSocialNewsletterSocialLink[];
  /** Newsletter label text */
  newsletterLabel?: string;
  /** Newsletter placeholder text */
  newsletterPlaceholder?: string;
  /** Newsletter button text */
  newsletterButtonText?: string;
  /** Privacy policy link text */
  privacyLinkText?: string;
  /** Privacy policy URL */
  privacyLinkUrl?: string;
  /** Copyright text */
  copyright?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: FooterSocialNewsletterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
      { name: "Integrations", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
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

const defaultSocialLinks: FooterSocialNewsletterSocialLink[] = [
  { icon: "simple-icons/discord", href: "#", label: "Discord" },
  { icon: "simple-icons/reddit", href: "#", label: "Reddit" },
  { icon: "simple-icons/x", href: "#", label: "X (Twitter)" },
  { icon: "simple-icons/telegram", href: "#", label: "Telegram" },
  { icon: "simple-icons/linkedin", href: "#", label: "LinkedIn" },
];

/**
 * FooterSocialNewsletter - A footer with social icons, navigation links, and newsletter signup.
 *
 * Features prominent social media icons in circular buttons, multi-column navigation,
 * and an email newsletter subscription form. Ideal for community-focused products,
 * SaaS platforms, and businesses that prioritize social engagement and email marketing.
 */
export function FooterSocialNewsletter({
  logo = {
    url: "https://opensite.ai",
    src: "https://cdn.ing/assets/i/r/285975/eud79qeya11q5w6ueyhklueardyx/os-suircle-black-white.png",
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  className,
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  newsletterLabel = "Subscribe to our newsletter",
  newsletterPlaceholder = "Email",
  newsletterButtonText = "Subscribe",
  privacyLinkText = "Privacy Policy",
  privacyLinkUrl = "#",
  copyright = `© ${new Date().getFullYear()} Opensite AI. All rights reserved.`,
  optixFlowConfig,
}: FooterSocialNewsletterProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <a href={logo.url} className="flex items-center gap-2">
            <Img
              src={logo.src}
              alt={logo.alt}
              className="h-10"
              optixFlowConfig={optixFlowConfig}
            />
            <span className="text-xl font-semibold">{logo.title}</span>
          </a>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="lg:col-span-2 xl:col-span-1">
              <ul className="mb-10 flex items-center gap-2 text-muted-foreground">
                {socialLinks.map((social, idx) => (
                  <li key={idx} className="font-medium">
                    <a href={social.href} aria-label={social.label}>
                      <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                        <DynamicIcon name={social.icon} size={24} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="newsletter-email" className="text-sm font-medium">
                  {newsletterLabel}
                </label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <input
                    type="email"
                    id="newsletter-email"
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
                <p className="mt-1 text-xs text-muted-foreground">
                  By submitting, you agree to our
                  <a href={privacyLinkUrl} className="ml-1 text-primary hover:underline">
                    {privacyLinkText}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <p>{copyright}</p>
              <a
                href="https://opensite.ai"
                className="hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                AI Website and Automation Platform by Opensite
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
