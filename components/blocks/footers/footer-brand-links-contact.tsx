"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
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
 * Social link configuration
 */
export interface FooterBrandLinksContactSocialLink {
  /** Icon name in format: prefix/name */
  icon: string;
  /** Link URL */
  href: string;
  /** Accessible label */
  label: string;
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
  socialLinks?: FooterBrandLinksContactSocialLink[];
  /** Bottom bar links */
  legalLinks?: FooterBrandLinksContactLegalLink[];
  /** Attribution label in the bottom bar */
  attributionText?: React.ReactNode;
  /** Attribution link URL */
  attributionHref?: string;
  /** Copyright text */
  copyright?: React.ReactNode;
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
  attributionText,
  attributionHref,
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
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterBrandLinksContactProps): React.JSX.Element {
  const linkGroupsContent = useMemo(() => {
    if (!linkGroups || linkGroups.length === 0) return null;

    return linkGroups.map((group) => (
      <div key={group.title} className={cn(linkGroupClassName)}>
        <h3 className={cn("mb-6 text-sm font-semibold uppercase tracking-wider text-foreground", linkGroupTitleClassName)}>
          {group.title}
        </h3>
        <ul className={cn("space-y-3", linkListClassName)}>
          {group.links.map((link, linkIdx) => (
            <li key={linkIdx}>
              <Pressable
                href={link.href}
                className={cn("text-sm text-muted-foreground transition-colors hover:text-foreground", linkItemClassName)}
              >
                {link.label}
              </Pressable>
            </li>
          ))}
        </ul>
      </div>
    ));
  }, [linkGroups, linkGroupClassName, linkGroupTitleClassName, linkListClassName, linkItemClassName]);

  const contactItemsContent = useMemo(() => {
    if (!contactItems || contactItems.length === 0) return null;

    return contactItems.map((item, idx) => (
      <div key={idx} className={cn("flex items-start gap-4", contactItemClassName)}>
        <div className="shrink-0">
          <DynamicIcon name={item.icon} size={20} className="text-primary" />
        </div>
        <div className="space-y-1">
          {item.href ? (
            <Pressable
              href={item.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              {item.label}
            </Pressable>
          ) : (
            <p className="text-sm font-medium text-foreground">{item.label}</p>
          )}
        </div>
      </div>
    ));
  }, [contactItems, contactItemClassName]);

  const socialLinksContent = useMemo(() => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((link) => (
      <Pressable
        key={link.label}
        href={link.href}
        variant="outline"
        size="icon"
        asButton
        className={cn("rounded-full", socialLinkClassName)}
        aria-label={link.label}
      >
        <DynamicIcon name={link.icon} size={18} />
      </Pressable>
    ));
  }, [socialLinks, socialLinkClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn(contentClassName)}>
        <div
          className={cn(
            "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4",
            gridClassName,
          )}
        >
          <div className={cn(brandClassName)}>
            {logoSrc && (
              <Img
                src={logoSrc}
                alt={logoAlt}
                className={cn("mb-4 h-10 w-auto", logoClassName)}
                loading="eager"
                optixFlowConfig={optixFlowConfig}
              />
            )}
            {tagline && (
              <p className={cn("mb-4 text-base text-white/80", taglineClassName)}>
                {tagline}
              </p>
            )}
            {description && (
              <p className={cn("text-sm text-white/60", descriptionClassName)}>
                {description}
              </p>
            )}
          </div>

          {linkGroupsContent}

          <div className={cn(contactColumnClassName)}>
            {contactTitle && (
              <h3
                className={cn(
                  "text-lg font-semibold text-white",
                  linkGroupTitleClassName,
                )}
              >
                {contactTitle}
              </h3>
            )}
            {contactItemsContent && (
              <ul
                className={cn(
                  "mt-4 space-y-3 text-sm text-white/70",
                  linkListClassName,
                )}
              >
                {contactItemsContent}
              </ul>
            )}

            {socialLinks && socialLinks.length > 0 && (
              <div className={cn("mt-8", socialSectionClassName)}>
                {socialTitle && (
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                    {socialTitle}
                  </h4>
                )}
                <div className="mt-3 flex gap-4">
                  {socialLinksContent}
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={cn(
            "mt-12 border-t border-white/10 pt-8 text-sm text-white/60",
            bottomBarClassName,
          )}
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {copyright && <p className={cn(copyrightClassName)}>{copyright}</p>}
            <div
              className={cn(
                "flex flex-wrap items-center gap-4",
                legalLinksClassName,
              )}
            >
              {attributionHref && attributionText && (
                <Pressable
                  href={attributionHref}
                  className="underline transition-colors hover:text-primary"
                >
                  {attributionText}
                </Pressable>
              )}
              {legalLinks && legalLinks.length > 0 && legalLinks.map((link) => (
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
    </Section>
  );
}
