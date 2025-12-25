"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Social link configuration
 */
export interface FooterBrandDescriptionSocialLink {
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
export interface FooterBrandDescriptionSection {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

/**
 * Props for the FooterBrandDescription component
 */
export interface FooterBrandDescriptionProps {
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
  sections?: FooterBrandDescriptionSection[];
  /** Brand description text */
  description?: string;
  /** Social media links */
  socialLinks?: FooterBrandDescriptionSocialLink[];
  /** Copyright text */
  copyright?: string;
  /** Legal links (terms, privacy, etc.) */
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

const defaultSections: FooterBrandDescriptionSection[] = [
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
      { name: "Privacy", href: "#" },
    ],
  },
];

const defaultSocialLinks: FooterBrandDescriptionSocialLink[] = [
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
 * FooterBrandDescription - A footer with logo, description, social icons, and navigation.
 *
 * Features a prominent brand section with logo, description, and social links on the left,
 * with multi-column navigation on the right. Ideal for brand-focused websites, startups,
 * and businesses that want to emphasize their identity and social presence in the footer.
 */
export function FooterBrandDescription({
  logo = {
    url: "https://opensite.ai",
    src: "https://cdn.ing/assets/i/r/285975/eud79qeya11q5w6ueyhklueardyx/os-suircle-black-white.png",
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  className,
  sections = defaultSections,
  description = "A collection of components for your startup business or side project.",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} Opensite AI. All rights reserved.`,
  legalLinks = defaultLegalLinks,
  optixFlowConfig,
}: FooterBrandDescriptionProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <Img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8"
                  optixFlowConfig={optixFlowConfig}
                />
              </a>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.label}>
                    <DynamicIcon name={social.icon} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
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
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <div className="order-2 flex flex-col gap-2 lg:order-1 lg:flex-row lg:items-center lg:gap-4">
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
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
