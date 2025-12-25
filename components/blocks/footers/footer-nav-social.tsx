"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";

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
 * Navigation section configuration
 */
export interface FooterNavSocialSection {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

/**
 * Props for the FooterNavSocial component
 */
export interface FooterNavSocialProps {
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
  sections?: FooterNavSocialSection[];
  /** Social media links */
  socialLinks?: FooterNavSocialLink[];
  /** Newsletter heading */
  newsletterHeading?: string;
  /** Newsletter description */
  newsletterDescription?: string;
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

const defaultSections: FooterNavSocialSection[] = [
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

const defaultSocialLinks: FooterNavSocialLink[] = [
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
  className,
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  newsletterHeading = "Stay Updated",
  newsletterDescription = "Subscribe to our newsletter for the latest updates and news.",
  newsletterPlaceholder = "Enter your email",
  newsletterButtonText = "Subscribe",
  copyright = `© ${new Date().getFullYear()} Opensite AI. All rights reserved.`,
  legalLinks = defaultLegalLinks,
  optixFlowConfig,
}: FooterNavSocialProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left Column - Logo and Navigation */}
            <div>
              <a href={logo.url} className="mb-8 flex items-center gap-2">
                <Img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10"
                  optixFlowConfig={optixFlowConfig}
                />
                <span className="text-xl font-semibold">{logo.title}</span>
              </a>
              <div className="grid gap-8 sm:grid-cols-3">
                {sections.map((section, sectionIdx) => (
                  <div key={sectionIdx}>
                    <h3 className="mb-4 font-semibold">{section.title}</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {section.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <a href={link.href} className="hover:text-primary">
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Newsletter and Social */}
            <div className="flex flex-col justify-between">
              <div className="mb-8">
                <h3 className="mb-2 text-lg font-semibold">{newsletterHeading}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {newsletterDescription}
                </p>
                <div className="flex max-w-md gap-2">
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
              <div>
                <p className="mb-4 font-medium">Follow Us</p>
                <ul className="flex items-center gap-4">
                  {socialLinks.map((social, idx) => (
                    <li key={idx}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <DynamicIcon name={social.icon} size={20} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
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
            <ul className="flex gap-4">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-primary">
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
