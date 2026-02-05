"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import { Section } from "../../ui/section";
import type { FooterSocialLink } from "./types";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { OptixFlowConfig, NavLinkItem } from "../../../src/types/blocks";
import { PatternName } from "@/components/ui/pattern-background";

/**
 * Link group configuration for footer columns
 */
export interface FooterBrandLinksContactGroup {
  /** Group title */
  title: string;
  /** Links in this group */
  links: NavLinkItem[];
}

/**
 * Contact item configuration
 */
export interface FooterBrandLinksContactItem {
  /** Icon name in format: prefix/name */
  icon: string;
  /** Contact label/text */
  label: string;
  /** Contact link URL */
  href: string;
}

/**
 * Legal link configuration
 */
export interface FooterBrandLinksContactLegalLink {
  /** Link label */
  label: string;
  /** Link URL */
  href: string;
}

/**
 * Props for the FooterBrandLinksContact component
 */
export interface FooterBrandLinksContactProps {
  /** Logo source URL */
  logoSrc?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Brand tagline text */
  tagline?: React.ReactNode;
  /** Brand description text */
  description?: React.ReactNode;
  /** Link groups for the footer columns */
  linkGroups?: FooterBrandLinksContactGroup[];
  /** Contact items for the contact column */
  contactItems?: FooterBrandLinksContactItem[];
  /** Social media links */
  socialLinks?: FooterSocialLink[];
  /** Bottom bar links */
  legalLinks?: FooterBrandLinksContactLegalLink[];
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Contact section title */
  contactTitle?: React.ReactNode;
  /** Social section title */
  socialTitle?: React.ReactNode;
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the footer content */
  contentClassName?: string;
  /** Additional CSS classes for the grid layout */
  gridClassName?: string;
  /** Additional CSS classes for the brand column */
  brandClassName?: string;
  /** Additional CSS classes for the logo */
  logoClassName?: string;
  /** Additional CSS classes for the tagline */
  taglineClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for link group columns */
  linkGroupClassName?: string;
  /** Additional CSS classes for link group titles */
  linkGroupTitleClassName?: string;
  /** Additional CSS classes for link lists */
  linkListClassName?: string;
  /** Additional CSS classes for link items */
  linkItemClassName?: string;
  /** Additional CSS classes for the contact column */
  contactColumnClassName?: string;
  /** Additional CSS classes for contact items */
  contactItemClassName?: string;
  /** Additional CSS classes for the social section */
  socialSectionClassName?: string;
  /** Additional CSS classes for social links */
  socialLinkClassName?: string;
  /** Additional CSS classes for the bottom bar */
  bottomBarClassName?: string;
  /** Additional CSS classes for the copyright section */
  copyrightClassName?: string;
  /** Additional CSS classes for legal links */
  legalLinksClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern */
  pattern?: PatternName | undefined;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Optional Optix Flow configuration for image optimization */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * FooterBrandLinksContact - Multi-column footer with brand summary,
 * link groups, contact details, and social icons plus a legal bar.
 */
export function FooterBrandLinksContact({
  logoSrc,
  logoAlt = "Logo",
  tagline,
  description,
  linkGroups,
  contactItems,
  socialLinks,
  legalLinks,
  copyright,
  contactTitle,
  socialTitle,
  className,
  contentClassName,
  gridClassName,
  brandClassName,
  logoClassName,
  taglineClassName,
  descriptionClassName,
  linkGroupClassName,
  linkGroupTitleClassName,
  linkListClassName,
  linkItemClassName,
  contactColumnClassName,
  contactItemClassName,
  socialSectionClassName,
  socialLinkClassName,
  bottomBarClassName,
  copyrightClassName,
  legalLinksClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterBrandLinksContactProps): React.JSX.Element {
  const linkGroupsContent = useMemo(() => {
    if (!linkGroups || linkGroups.length === 0) return null;

    return linkGroups.map((group) => (
      <div key={group.title} className={cn("mt-8 md:mt-0", linkGroupClassName)}>
        <h3
          className={cn(
            "mb-6 text-sm font-semibold uppercase tracking-wider",
            linkGroupTitleClassName,
          )}
        >
          {group.title}
        </h3>
        <ul className={cn("space-y-3", linkListClassName)}>
          {group.links.map((link, linkIdx) => (
            <li key={linkIdx}>
              <Pressable
                href={link.href}
                className={cn(
                  "text-sm opacity-80 transition-colors hover:opacity-100",
                  linkItemClassName,
                )}
              >
                {link.label}
              </Pressable>
            </li>
          ))}
        </ul>
      </div>
    ));
  }, [
    linkGroups,
    linkGroupClassName,
    linkGroupTitleClassName,
    linkListClassName,
    linkItemClassName,
  ]);

  const contactItemsContent = React.useMemo(() => {
    if (!contactItems || contactItems.length === 0) return null;

    return contactItems.map((item, idx) => (
      <div
        key={idx}
        className={cn("flex items-start gap-4", contactItemClassName)}
      >
        <div className="shrink-0">
          <DynamicIcon name={item.icon} size={20} />
        </div>
        <div className="space-y-1">
          {item.href ? (
            <Pressable
              href={item.href}
              className="text-sm font-medium transition-colors hover:opacity-70"
            >
              {item.label}
            </Pressable>
          ) : (
            <p className="text-sm font-medium">{item.label}</p>
          )}
        </div>
      </div>
    ));
  }, [contactItems, contactItemClassName]);

  const socialLinksContent = useMemo(() => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((social, idx) => (
      <SocialLinkIcon
        key={idx}
        href={social.href}
        label={social.label}
        iconNameOverride={social.iconNameOverride}
        variant="outline"
        size="icon"
        asButton
        className={cn("rounded-full", socialLinkClassName)}
        iconSize={18}
      />
    ));
  }, [socialLinks, socialLinkClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      {(logoSrc || tagline || description) && (
        <div className="flex items-center flex-col mb-20">
          <div className="max-w-full md:max-w-md flex flex-col gap-4 items-center text-center text-balance">
            {logoSrc && (
              <Pressable href={"/"} className="flex w-fit">
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
            {description && (
              <p className="text-sm leading-relaxed">{description}</p>
            )}
          </div>
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-2 gap-6 md:gap-10 md:grid-cols-2 lg:grid-cols-4",
          gridClassName,
        )}
      >
        {linkGroupsContent}

        <div
          className={cn(
            "w-full md:w-fit col-span-2 md:col-span-1 mt-8 md:mt-0",
            contactColumnClassName,
          )}
        >
          {contactTitle && (
            <h3
              className={cn("text-lg font-semibold", linkGroupTitleClassName)}
            >
              {contactTitle}
            </h3>
          )}
          {contactItemsContent && (
            <ul
              className={cn(
                "mt-4 space-y-3 text-sm opacity-80",
                linkListClassName,
              )}
            >
              {contactItemsContent}
            </ul>
          )}

          {socialLinks && socialLinks.length > 0 && (
            <div className={cn("mt-8", socialSectionClassName)}>
              {socialTitle && (
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-70">
                  {socialTitle}
                </h4>
              )}
              <div className="mt-3 flex gap-4">{socialLinksContent}</div>
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "mt-12 border-t pt-8 text-sm opacity-80",
          bottomBarClassName,
        )}
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div
            className={cn(
              "flex flex-wrap items-center gap-4",
              copyrightClassName,
            )}
          >
            <FooterCopyright copyright={copyright} />
            <BrandAttribution
              internalBrandSlug="open_site_ai"
              optionIndex={5}
              variant="span"
              linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
            />
          </div>
          <div
            className={cn(
              "flex flex-wrap items-center gap-4",
              legalLinksClassName,
            )}
          >
            {legalLinks &&
              legalLinks.length > 0 &&
              legalLinks.map((link, idx: number) => (
                <Pressable
                  key={idx}
                  href={link.href}
                  className="underline transition-colors hover:opacity-100"
                >
                  {link.label}
                </Pressable>
              ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
