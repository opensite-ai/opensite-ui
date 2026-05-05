"use client";

import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import { type PatternName } from "../../ui/pattern-background";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { FooterSocialLink } from "./types";

export interface FooterComprehensiveLinksLink {
  label: string;
  href: string;
}

export interface FooterComprehensiveLinksColumn {
  title: string;
  links: FooterComprehensiveLinksLink[];
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
  socialLinks?: FooterSocialLink[];
  /**
   * Brand/company name for the copyright notice
   */
  copyright?: string;
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
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Section spacing variant */
  spacing?: SectionSpacing;
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * FooterComprehensiveLinks - A comprehensive footer with brand summary,
 * navigation columns, optional article links, contact details, social icons,
 * and a bottom legal bar with links.
 */
export function FooterComprehensiveLinks({
  sectionId = "footer-comprehensive-links",
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
  bottomLinks,
  pattern,
  patternOpacity,
  className,
  optixFlowConfig,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  background,
}: FooterComprehensiveLinksProps): React.JSX.Element {
  return (
    <Section
      id="footer-comprehensive-links"
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      {(logoSrc || tagline || summary) && (
        <div className="flex items-center flex-col mb-20">
          <div className="max-w-full md:max-w-md flex flex-col gap-4 items-center text-center text-balance">
            {logoSrc && (
              <Pressable href={logoHref || "/"} className="flex w-fit">
                <Img
                  src={logoSrc}
                  alt={logoAlt || "Logo"}
                  className="h-auto md:h-24 w-40 max-w-lg md:w-auto object-contain"
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </Pressable>
            )}
            {tagline && <p className="text-xl font-medium">{tagline}</p>}
            {summary && <p className="text-sm leading-relaxed">{summary}</p>}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 lg:gap-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-12">
          {linkColumns &&
            linkColumns.length > 0 &&
            linkColumns.map((column) => (
              <div key={column.title} className="lg:col-span-2">
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold">{column.title}</h3>
                  <ul className="flex flex-col gap-2.5">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Pressable
                          href={link.href}
                          className="text-sm transition-colors "
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
            <div className="flex flex-col gap-12 col-span-2 lg:col-span-4">
              {contact ? (
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold">Contact</h3>
                  <ul className="flex flex-col gap-3">
                    {contact.email ? (
                      <li>
                        <Pressable
                          href={contact.email}
                          className="group flex items-center gap-2.5 text-sm transition-colors "
                        >
                          <DynamicIcon
                            name="lucide/mail"
                            size={16}
                            className=" "
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
                          className="group flex items-center gap-2.5 text-sm "
                        >
                          <DynamicIcon
                            name="lucide/phone"
                            size={16}
                            className=""
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
                          className="group flex items-start gap-2.5 text-sm "
                        >
                          <DynamicIcon
                            name="lucide/map-pin"
                            size={16}
                            className="mt-0.5 "
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
                  <h3 className="text-sm font-semibold">Follow Us</h3>
                  <div className="flex items-center gap-3">
                    {socialLinks?.map((link, idx) => (
                      <SocialLinkIcon
                        key={idx}
                        href={link.href}
                        label={link.label}
                        iconNameOverride={link.iconNameOverride}
                        iconSize={18}
                        className={cn(
                          "flex size-fit p-2 items-center justify-center rounded-lg transition-shadow border shadow-sm hover:shadow-lg",
                        )}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {(articleLinks?.length ?? 0) > 0 ? (
          <div className="border-t pt-14 pb-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">{articleSectionTitle}</h3>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {articleLinks?.map((link) => (
                  <Pressable
                    key={link.href}
                    href={link.href}
                    className="truncate text-sm "
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
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <FooterCopyright copyright={copyright} />
            <BrandAttribution
              internalBrandSlug="open_site_ai"
              optionIndex={6}
              variant="span"
              linkClassName="underline underline-offset-4 "
            />
          </div>
          {(bottomLinks?.length ?? 0) > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6 w-full md:w-fit mt-6 md:mt-0">
              {bottomLinks?.map((link) => (
                <Pressable
                  key={link.href}
                  href={link.href}
                  className="text-sm  underline underline-offset-2 "
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
