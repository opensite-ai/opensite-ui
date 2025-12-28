"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { patternSvgs } from "../../../lib/patternSvgs";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

export type PatternName = keyof typeof patternSvgs;

export interface FooterComprehensiveLinksLink {
  label: string;
  href: string;
}

export interface FooterComprehensiveLinksColumn {
  title: string;
  links: FooterComprehensiveLinksLink[];
}

export interface FooterComprehensiveLinksSocial {
  platform: "facebook" | "x" | "instagram" | "linkedin" | "youtube";
  href: string;
  label?: string;
}

export interface FooterComprehensiveLinksContact {
  email?: string;
  phone?: string;
  address?: string;
}

export interface FooterComprehensiveLinksProps {
  /**
   * Logo source URL
   */
  logoSrc?: string;
  /**
   * Logo alt text
   */
  logoAlt?: string;
  /**
   * Optional logo link
   */
  logoHref?: string;
  /**
   * Brand tagline
   */
  tagline?: string;
  /**
   * Brand summary paragraph
   */
  summary?: string;
  /**
   * Link columns
   */
  linkColumns?: FooterComprehensiveLinksColumn[];
  /**
   * Article links list
   */
  articleLinks?: FooterComprehensiveLinksLink[];
  /**
   * Article section title
   */
  articleSectionTitle?: string;
  /**
   * Contact information
   */
  contact?: FooterComprehensiveLinksContact;
  /**
   * Social links
   */
  socialLinks?: FooterComprehensiveLinksSocial[];
  /**
   * Copyright text
   */
  copyright?: string;
  /**
   * Company name for fallback copyright text
   */
  companyName?: string;
  /**
   * Bottom bar links
   */
  bottomLinks?: FooterComprehensiveLinksLink[];
  /**
   * Pattern background key or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the footer
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

const socialIconMap: Record<
  FooterComprehensiveLinksSocial["platform"],
  string
> = {
  facebook: "simple-icons/facebook",
  x: "simple-icons/x",
  instagram: "simple-icons/instagram",
  linkedin: "simple-icons/linkedin",
  youtube: "simple-icons/youtube",
};

const defaultLinkColumns: FooterComprehensiveLinksColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "Coverage Plans", href: "/solutions" },
      { label: "Partner Network", href: "/partners" },
      { label: "Industry Guides", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About OpenSite AI", href: "/about" },
      { label: "Leadership", href: "/team" },
      { label: "Service Center", href: "/service-center" },
    ],
  },
];

const defaultArticleLinks: FooterComprehensiveLinksLink[] = [
  { label: "Coverage Strategy Updates", href: "/resources/coverage-strategy" },
  { label: "Policy Review Checklist", href: "/resources/policy-review" },
  { label: "Risk Planning for Growth", href: "/resources/risk-planning" },
  { label: "Claims Readiness Guide", href: "/resources/claims-readiness" },
];

const defaultContact: FooterComprehensiveLinksContact = {
  email: "hello@opensite.ai",
  phone: "+1 (415) 555-0192",
  address: "975 Mission St, San Francisco, CA",
};

const defaultSocialLinks: FooterComprehensiveLinksSocial[] = [
  { platform: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
  { platform: "x", href: "https://x.com", label: "X" },
  { platform: "youtube", href: "https://youtube.com", label: "YouTube" },
];

const defaultBottomLinks: FooterComprehensiveLinksLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

/**
 * FooterComprehensiveLinks - A comprehensive footer with brand summary,
 * navigation columns, optional article links, contact details, social icons,
 * and a bottom legal bar with links.
 */
export function FooterComprehensiveLinks({
  logoSrc = logoPlaceholders.lightHorizontalLogo,
  logoAlt = "OpenSite AI logo",
  logoHref = "/",
  tagline = "Modern coverage guidance powered by OpenSite AI.",
  summary = "Independent advisors backed by OpenSite AI insights and a partner network built for clarity.",
  linkColumns = defaultLinkColumns,
  articleLinks = defaultArticleLinks,
  articleSectionTitle = "Recent Articles",
  contact = defaultContact,
  socialLinks = defaultSocialLinks,
  copyright,
  companyName = "OpenSite AI",
  bottomLinks = defaultBottomLinks,
  pattern,
  patternOpacity = 0.05,
  className,
  optixFlowConfig,
}: FooterComprehensiveLinksProps): React.JSX.Element {
  const year = new Date().getFullYear();
  const copyrightText =
    copyright || `© ${year} ${companyName}. All rights reserved.`;
  const patternUrl = pattern
    ? pattern in patternSvgs
      ? patternSvgs[pattern as PatternName]
      : pattern
    : undefined;

  return (
    <footer className={cn("relative overflow-hidden bg-zinc-950 text-white", className)}>
      {patternUrl ? (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${patternUrl})`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            opacity: patternOpacity,
          }}
          aria-hidden="true"
        />
      ) : null}

      <div className="container relative z-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:gap-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12">
            <div className="sm:col-span-2 lg:col-span-3">
              <div className="flex flex-col gap-4">
                <Pressable href={logoHref} className="inline-flex w-fit">
                  <Img
                    src={logoSrc}
                    alt={logoAlt}
                    className="h-9 w-auto"
                    loading="eager"
                    optixFlowConfig={optixFlowConfig}
                  />
                </Pressable>
                {tagline ? (
                  <p className="text-sm font-medium text-white">{tagline}</p>
                ) : null}
                {summary ? (
                  <p className="text-sm leading-relaxed text-white/70">
                    {summary}
                  </p>
                ) : null}
              </div>
            </div>

            {linkColumns.map((column) => (
              <div key={column.title} className="lg:col-span-2">
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold text-white">
                    {column.title}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Pressable
                          href={link.href}
                          className="text-sm text-white/60 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Pressable>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {(contact || socialLinks.length > 0) ? (
              <div className="flex flex-col gap-6 lg:col-span-3">
                {contact ? (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-semibold text-white">
                      Contact
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {contact.email ? (
                        <li>
                          <Pressable
                            href={contact.email}
                            className="group flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                          >
                            <DynamicIcon
                              name="lucide/mail"
                              size={16}
                              className="text-white/50 transition-colors group-hover:text-white/80"
                            />
                            <span className="underline underline-offset-2">
                              {contact.email}
                            </span>
                          </Pressable>
                        </li>
                      ) : null}
                      {contact.phone ? (
                        <li>
                          <Pressable
                            href={contact.phone}
                            className="group flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                          >
                            <DynamicIcon
                              name="lucide/phone"
                              size={16}
                              className="text-white/50 transition-colors group-hover:text-white/80"
                            />
                            <span className="underline underline-offset-2">
                              {contact.phone}
                            </span>
                          </Pressable>
                        </li>
                      ) : null}
                      {contact.address ? (
                        <li>
                          <Pressable
                            href={`https://maps.google.com/?q=${encodeURIComponent(
                              contact.address,
                            )}`}
                            className="group flex items-start gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                          >
                            <DynamicIcon
                              name="lucide/map-pin"
                              size={16}
                              className="mt-0.5 text-white/50 transition-colors group-hover:text-white/80"
                            />
                            <span className="underline underline-offset-2">
                              {contact.address}
                            </span>
                          </Pressable>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                ) : null}

                {socialLinks.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-semibold text-white">
                      Follow Us
                    </h3>
                    <div className="flex items-center gap-3">
                      {socialLinks.map((link) => (
                        <Pressable
                          key={`${link.platform}-${link.href}`}
                          href={link.href}
                          aria-label={
                            link.label || `Follow us on ${link.platform}`
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          <DynamicIcon
                            name={socialIconMap[link.platform]}
                            size={16}
                          />
                        </Pressable>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {articleLinks.length > 0 ? (
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-white">
                  {articleSectionTitle}
                </h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {articleLinks.map((link) => (
                    <Pressable
                      key={link.href}
                      href={link.href}
                      className="truncate text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Pressable>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/50">{copyrightText}</p>
            {bottomLinks.length > 0 ? (
              <div className="flex items-center gap-4 sm:gap-6">
                {bottomLinks.map((link) => (
                  <Pressable
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/50 underline underline-offset-2 transition-colors hover:text-white/80"
                  >
                    {link.label}
                  </Pressable>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
