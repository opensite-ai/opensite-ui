"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Social link configuration
 */
export interface FooterSocialAppsSocialLink {
  /** Icon name in format: prefix/name (e.g., "simple-icons/twitter") */
  icon: string;
  /** Link URL */
  href: string;
  /** Accessible label */
  label: string;
}

/**
 * App store link configuration
 */
export interface FooterSocialAppsAppLink {
  /** Icon name in format: prefix/name (e.g., "simple-icons/android") */
  icon: string;
  /** Link URL */
  href: string;
  /** Accessible label */
  label: string;
}

/**
 * Navigation section configuration
 */
export interface FooterSocialAppsSection {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

/**
 * Props for the FooterSocialApps component
 */
export interface FooterSocialAppsProps {
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
  sections?: FooterSocialAppsSection[];
  /** Social media links */
  socialLinks?: FooterSocialAppsSocialLink[];
  /** Mobile app store links */
  appLinks?: FooterSocialAppsAppLink[];
  /** Social section label */
  socialLabel?: string;
  /** Mobile app section label */
  appLabel?: string;
  /** Copyright text */
  copyright?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: FooterSocialAppsSection[] = [
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

const defaultSocialLinks: FooterSocialAppsSocialLink[] = [
  { icon: "simple-icons/discord", href: "#", label: "Discord" },
  { icon: "simple-icons/x", href: "#", label: "X (Twitter)" },
  { icon: "simple-icons/instagram", href: "#", label: "Instagram" },
  { icon: "simple-icons/linkedin", href: "#", label: "LinkedIn" },
];

const defaultAppLinks: FooterSocialAppsAppLink[] = [
  { icon: "mdi/android", href: "#", label: "Android" },
  { icon: "mdi/apple", href: "#", label: "iOS" },
];

/**
 * FooterSocialApps - A footer with social icons, navigation links, and mobile app download links.
 *
 * Features prominent social media icons and mobile app store links in circular buttons,
 * along with multi-column navigation. Ideal for products with mobile apps, community-focused
 * platforms, and businesses that want to highlight their cross-platform presence.
 */
export function FooterSocialApps({
  logo = {
    url: "https://opensite.ai",
    src: "https://cdn.ing/assets/i/r/285975/eud79qeya11q5w6ueyhklueardyx/os-suircle-black-white.png",
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  className,
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  appLinks = defaultAppLinks,
  socialLabel = "Follow Us",
  appLabel = "Mobile App",
  copyright = `© ${new Date().getFullYear()} Opensite AI. All rights reserved.`,
  optixFlowConfig,
}: FooterSocialAppsProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-20">
            <div className="flex flex-col gap-6">
              <a href={logo.url} className="flex items-center gap-2">
                <Img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10"
                  optixFlowConfig={optixFlowConfig}
                />
                <span className="text-xl font-semibold">{logo.title}</span>
              </a>
            </div>
            <div className="grid flex-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
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
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-3 font-bold">{socialLabel}</p>
                <ul className="flex items-center gap-2 text-muted-foreground">
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
              </div>
              <div>
                <p className="mb-3 font-bold">{appLabel}</p>
                <ul className="flex items-center gap-2 text-muted-foreground">
                  {appLinks.map((app, idx) => (
                    <li key={idx} className="font-medium">
                      <a href={app.href} aria-label={app.label}>
                        <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                          <DynamicIcon name={app.icon} size={24} />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-24 border-t pt-8">
            <div className="flex flex-col justify-between gap-4 text-center text-sm font-medium text-muted-foreground md:flex-row md:text-left">
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
