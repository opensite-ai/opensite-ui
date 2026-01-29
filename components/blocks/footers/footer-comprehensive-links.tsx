"use client";

import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  PatternBackground,
  type PatternName,
} from "../../ui/pattern-background";
import { Section } from "../../ui/section";
import type { SectionBackground } from "../../../src/types";

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
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the footer
   */
  className?: string;
  /**
   * Section background variant
   */
  background?: SectionBackground;
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

/**
 * FooterComprehensiveLinks - A comprehensive footer with brand summary,
 * navigation columns, optional article links, contact details, social icons,
 * and a bottom legal bar with links.
 */
export function FooterComprehensiveLinks({
  logoSrc,
  logoAlt,
  logoHref,
  tagline,
  summary,
  linkColumns,
  articleLinks,
  articleSectionTitle,
  contact,
  socialLinks,
  copyright,
  companyName,
  bottomLinks,
  pattern,
  patternOpacity,
  className,
  optixFlowConfig,
  background = "white",
}: FooterComprehensiveLinksProps): React.JSX.Element {
  const year = useMemo(() => new Date().getFullYear(), []);
  const copyrightText =
    copyright || `© ${year} ${companyName || ""}. All rights reserved.`;
  return (
    <Section
      background={background}
      spacing="lg"
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName="relative z-10"
    >
        <div className="grid grid-cols-1 gap-10 lg:gap-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12">
            {(logoSrc || tagline || summary) && (
              <div className="sm:col-span-2 lg:col-span-3">
                <div className="flex flex-col gap-4">
                  {logoSrc && (
                    <Pressable href={logoHref || "/"} className="inline-flex w-fit">
                      <Img
                        src={logoSrc}
                        alt={logoAlt || "Logo"}
                        className="h-9 w-auto"
                        loading="eager"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </Pressable>
                  )}
                  {tagline && (
                    <p className="text-sm font-medium">{tagline}</p>
                  )}
                  {summary && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {summary}
                    </p>
                  )}
                </div>
              </div>
            )}

            {linkColumns && linkColumns.length > 0 && linkColumns.map((column) => (
              <div key={column.title} className="lg:col-span-2">
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold">
                    {column.title}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Pressable
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Pressable>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {contact || (socialLinks?.length ?? 0) > 0 ? (
              <div className="flex flex-col gap-6 lg:col-span-3">
                {contact ? (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-semibold">
                      Contact
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {contact.email ? (
                        <li>
                          <Pressable
                            href={contact.email}
                            className="group flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            <DynamicIcon
                              name="lucide/mail"
                              size={16}
                              className="text-muted-foreground transition-colors group-hover:text-primary"
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
                            className="group flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            <DynamicIcon
                              name="lucide/phone"
                              size={16}
                              className="text-muted-foreground transition-colors group-hover:text-primary"
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
                            className="group flex items-start gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            <DynamicIcon
                              name="lucide/map-pin"
                              size={16}
                              className="mt-0.5 text-muted-foreground transition-colors group-hover:text-primary"
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

                {(socialLinks?.length ?? 0) > 0 ? (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-semibold">
                      Follow Us
                    </h3>
                    <div className="flex items-center gap-3">
                      {socialLinks?.map((link) => (
                        <Pressable
                          key={`${link.platform}-${link.href}`}
                          href={link.href}
                          aria-label={
                            link.label || `Follow us on ${link.platform}`
                          }
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted/80 hover:text-primary",
                            getNestedCardBg(background),
                            getNestedCardTextColor(background)
                          )}
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

          {(articleLinks?.length ?? 0) > 0 ? (
            <div className="border-t pt-8">
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold">
                  {articleSectionTitle}
                </h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {articleLinks?.map((link) => (
                    <Pressable
                      key={link.href}
                      href={link.href}
                      className="truncate text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Pressable>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-10 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">{copyrightText}</p>
            {(bottomLinks?.length ?? 0) > 0 ? (
              <div className="flex items-center gap-4 sm:gap-6">
                {bottomLinks?.map((link) => (
                  <Pressable
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground underline underline-offset-2 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Pressable>
                ))}
              </div>
            ) : null}
          </div>
        </div>
    </Section>
  );
}
