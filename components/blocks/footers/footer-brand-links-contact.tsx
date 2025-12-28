"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface FooterBrandLinksContactLink {
  label: string;
  href: string;
}

export interface FooterBrandLinksContactGroup {
  title: string;
  links: FooterBrandLinksContactLink[];
}

export interface FooterBrandLinksContactItem {
  icon: string;
  label: string;
  href: string;
}

export interface FooterBrandLinksContactSocialLink {
  icon: string;
  href: string;
  label: string;
}

export interface FooterBrandLinksContactProps {
  /**
   * Logo source URL
   */
  logoSrc?: string;
  /**
   * Logo alt text
   */
  logoAlt?: string;
  /**
   * Brand tagline text
   */
  tagline?: string;
  /**
   * Brand description text
   */
  description?: string;
  /**
   * Link groups for the footer columns
   */
  linkGroups?: FooterBrandLinksContactGroup[];
  /**
   * Contact items for the contact column
   */
  contactItems?: FooterBrandLinksContactItem[];
  /**
   * Social media links
   */
  socialLinks?: FooterBrandLinksContactSocialLink[];
  /**
   * Bottom bar links
   */
  legalLinks?: FooterBrandLinksContactLink[];
  /**
   * Attribution label in the bottom bar
   */
  attributionText?: string;
  /**
   * Attribution link URL
   */
  attributionHref?: string;
  /**
   * Additional CSS classes for the footer wrapper
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultLinkGroups: FooterBrandLinksContactGroup[] = [
  {
    title: "Solutions",
    links: [
      { href: "/solutions", label: "Coverage Plans" },
      { href: "/industries", label: "Industries" },
      { href: "/partners", label: "Partner Network" },
      { href: "/resources", label: "Resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About OpenSite AI" },
      { href: "/team", label: "Meet the Team" },
      { href: "/service-center", label: "Service Center" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const defaultContactItems: FooterBrandLinksContactItem[] = [
  {
    icon: "lucide/mail",
    label: "hello@opensite.ai",
    href: "mailto:hello@opensite.ai",
  },
  {
    icon: "lucide/phone",
    label: "+1 (415) 555-0192",
    href: "tel:+14155550192",
  },
  {
    icon: "lucide/map-pin",
    label: "975 Mission St, San Francisco, CA",
    href: "https://maps.google.com",
  },
];

const defaultSocialLinks: FooterBrandLinksContactSocialLink[] = [
  {
    icon: "simple-icons/linkedin",
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: "simple-icons/facebook",
    href: "https://facebook.com",
    label: "Facebook",
  },
];

const defaultLegalLinks: FooterBrandLinksContactLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

/**
 * FooterBrandLinksContact - Multi-column footer with brand summary,
 * link groups, contact details, and social icons plus a legal bar.
 */
export function FooterBrandLinksContact({
  logoSrc = logoPlaceholders.lightHorizontalLogo,
  logoAlt = "OpenSite AI logo",
  tagline = "Modern coverage guidance powered by OpenSite AI.",
  description = "Independent advisors, AI-driven insights, and proactive reviews for teams that value clarity.",
  linkGroups = defaultLinkGroups,
  contactItems = defaultContactItems,
  socialLinks = defaultSocialLinks,
  legalLinks = defaultLegalLinks,
  attributionText = "Built with OpenSite AI",
  attributionHref = "https://opensite.ai",
  className,
  optixFlowConfig,
}: FooterBrandLinksContactProps): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-foreground text-background", className)}>
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Img
              src={logoSrc}
              alt={logoAlt}
              className="mb-4 h-10 w-auto"
              loading="eager"
              optixFlowConfig={optixFlowConfig}
            />
            <p className="mb-4 text-base text-white/80">{tagline}</p>
            <p className="text-sm text-white/60">{description}</p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Pressable
                      href={link.href}
                      className="transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Pressable>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <Pressable
                    href={item.href}
                    className="flex items-start gap-3 transition-colors hover:text-primary"
                  >
                    <DynamicIcon name={item.icon} size={18} className="mt-0.5" />
                    <span>{item.label}</span>
                  </Pressable>
                </li>
              ))}
            </ul>

            {socialLinks.length > 0 ? (
              <div className="mt-8">
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                  Follow
                </h4>
                <div className="mt-3 flex gap-4">
                  {socialLinks.map((link) => (
                    <Pressable
                      key={link.href}
                      href={link.href}
                      aria-label={link.label}
                      className="text-white/70 transition-colors hover:text-primary"
                    >
                      <DynamicIcon name={link.icon} size={20} />
                    </Pressable>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-sm text-white/60">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>© {currentYear} OpenSite AI. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Pressable
                href={attributionHref}
                className="underline transition-colors hover:text-primary"
              >
                {attributionText}
              </Pressable>
              {legalLinks.map((link) => (
                <Pressable
                  key={link.href}
                  href={link.href}
                  className="underline transition-colors hover:text-primary"
                >
                  {link.label}
                </Pressable>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
