"use client";

import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { OptixFlowConfig } from "../../../src/types/blocks";
import type { PatternName } from "../../ui/pattern-background";

/**
 * Logo configuration for the footer
 */
export interface FooterBackgroundCardLogo {
  /** Logo link URL */
  url: string;
  /** Logo image source */
  src: string;
  /** Logo alt text */
  alt: string;
  /** Logo title/brand name */
  title: string;
}

/**
 * Menu link configuration
 */
export interface FooterBackgroundCardLink {
  /** Link text */
  text: string;
  /** Link URL */
  url: string;
}

/**
 * Menu item configuration
 */
export interface FooterBackgroundCardMenuItem {
  /** Menu section title */
  title: string;
  /** Links in this section */
  links: FooterBackgroundCardLink[];
}

/**
 * Contact information configuration
 */
export interface FooterBackgroundCardContact {
  /** Phone number */
  phone: string;
  /** Email address */
  email: string;
  /** Location */
  location: string;
  /** Timezone */
  timezone: string;
}

/**
 * Props for the FooterBackgroundCard component
 */
export interface FooterBackgroundCardProps {
  /** Logo configuration */
  logo?: FooterBackgroundCardLogo;
  /** Background image URL */
  backgroundImage?: string;
  /** Profile image URL */
  profileImage?: string;
  /** Tagline text */
  tagline?: React.ReactNode;
  /** Personal message text */
  personalMessage?: React.ReactNode;
  /** CTA button text */
  ctaText?: React.ReactNode;
  /** CTA button URL */
  ctaUrl?: string;
  /** Contact section title */
  contactTitle?: React.ReactNode;
  /** Contact information */
  contact?: FooterBackgroundCardContact;
  /** Menu items */
  menuItems?: FooterBackgroundCardMenuItem[];
  /** Copyright text */
  copyright?: React.ReactNode;
  /** Attribution text */
  attributionText?: React.ReactNode;
  /** Attribution link URL */
  attributionHref?: string;
  /** Bottom links */
  bottomLinks?: FooterBackgroundCardLink[];
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the card wrapper */
  cardClassName?: string;
  /** Additional CSS classes for the grid layout */
  gridClassName?: string;
  /** Additional CSS classes for the profile section */
  profileSectionClassName?: string;
  /** Additional CSS classes for the profile image */
  profileImageClassName?: string;
  /** Additional CSS classes for the tagline */
  taglineClassName?: string;
  /** Additional CSS classes for the personal message */
  messageClassName?: string;
  /** Additional CSS classes for the CTA button */
  ctaClassName?: string;
  /** Additional CSS classes for menu sections */
  menuSectionClassName?: string;
  /** Additional CSS classes for menu titles */
  menuTitleClassName?: string;
  /** Additional CSS classes for menu links */
  menuLinkClassName?: string;
  /** Additional CSS classes for the contact section */
  contactSectionClassName?: string;
  /** Additional CSS classes for the contact title */
  contactTitleClassName?: string;
  /** Additional CSS classes for contact items */
  contactItemClassName?: string;
  /** Additional CSS classes for the bottom section */
  bottomClassName?: string;
  /** Additional CSS classes for the copyright section */
  copyrightClassName?: string;
  /** Additional CSS classes for bottom links */
  bottomLinksClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * FooterBackgroundCard - A footer with background image and floating contact card.
 *
 * Features a full-width background image with a floating card containing profile image,
 * personal message, CTA button, navigation links, and contact information. Ideal for
 * creative professionals, agencies, portfolios, and businesses that want a visually
 * striking footer with a personal touch.
 */
export function FooterBackgroundCard({
  logo,
  backgroundImage,
  profileImage,
  tagline,
  personalMessage,
  ctaText,
  ctaUrl,
  contactTitle,
  contact,
  menuItems,
  copyright,
  attributionText,
  attributionHref,
  bottomLinks,
  className,
  cardClassName,
  gridClassName,
  profileSectionClassName,
  profileImageClassName,
  taglineClassName,
  messageClassName,
  ctaClassName,
  menuSectionClassName,
  menuTitleClassName,
  menuLinkClassName,
  contactSectionClassName,
  contactTitleClassName,
  contactItemClassName,
  bottomClassName,
  copyrightClassName,
  bottomLinksClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterBackgroundCardProps): React.JSX.Element {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const copyrightText = copyright ?? `© ${currentYear} Opensite AI. All rights reserved.`;

  const sectionStyle = useMemo(
    () => backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : undefined,
    [backgroundImage]
  );

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("bg-cover bg-center bg-no-repeat", className)}
      style={sectionStyle}
    >
      <div className={cn("mx-auto max-w-7xl rounded-lg bg-background p-8 shadow-lg md:p-12", cardClassName)}>
        <div className={cn("grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12", gridClassName)}>
          {(profileImage || tagline || personalMessage || ctaText) && (
            <div className={cn("lg:col-span-1", profileSectionClassName)}>
              {(profileImage || tagline) && (
                <div className="mb-4 flex items-center gap-4">
                  {profileImage && (
                    <Img
                      src={profileImage}
                      alt="Profile"
                      className={cn("h-16 w-16 rounded-full object-cover", profileImageClassName)}
                      optixFlowConfig={optixFlowConfig}
                    />
                  )}
                  {tagline && (
                    <h3 className={cn("text-2xl font-medium", taglineClassName)}>{tagline}</h3>
                  )}
                </div>
              )}
              {personalMessage && (
                <p className={cn("mb-6 text-sm leading-relaxed text-muted-foreground", messageClassName)}>
                  {personalMessage}
                </p>
              )}
              {ctaText && (
                <Pressable
                  href={ctaUrl || "#"}
                  className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2", ctaClassName)}
                >
                  {ctaText}
                </Pressable>
              )}
            </div>
          )}

          {menuItems && menuItems.length > 0 && menuItems.map((menu, idx) => (
            <div key={idx} className={cn(menuSectionClassName)}>
              <h3 className={cn("mb-4 text-sm font-medium tracking-wider text-primary uppercase", menuTitleClassName)}>
                {menu.title}
              </h3>
              <ul className="space-y-3">
                {menu.links.map((link, index) => (
                  <li key={index}>
                    <Pressable
                      href={link.url}
                      className={cn("border-b border-transparent text-muted-foreground transition-all duration-300 ease-in-out hover:border-primary hover:text-primary", menuLinkClassName)}
                    >
                      {link.text}
                    </Pressable>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {(contactTitle || contact) && (
            <div className={cn(contactSectionClassName)}>
              {contactTitle && (
                <h3 className={cn("mb-4 text-sm font-medium tracking-wider text-primary uppercase", contactTitleClassName)}>
                  {contactTitle}
                </h3>
              )}
              {contact && (
                <ul className="space-y-3">
                  {contact.phone && (
                    <li className={cn("text-muted-foreground", contactItemClassName)}>{contact.phone}</li>
                  )}
                  {contact.email && (
                    <li className={cn("text-muted-foreground", contactItemClassName)}>{contact.email}</li>
                  )}
                  {(contact.location || contact.timezone) && (
                    <li className={cn("text-muted-foreground", contactItemClassName)}>
                      {contact.location}{contact.location && contact.timezone && " • "}{contact.timezone}
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className={cn("mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row", bottomClassName)}>
          <div className={cn("flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:gap-4", copyrightClassName)}>
            <p>{copyrightText}</p>
            {attributionText && (
              <Pressable
                href={attributionHref || "https://opensite.ai"}
                className="hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {attributionText}
              </Pressable>
            )}
          </div>
          {bottomLinks && bottomLinks.length > 0 && (
            <div className={cn("flex gap-4", bottomLinksClassName)}>
              {bottomLinks.map((link, idx) => (
                <Pressable
                  key={idx}
                  href={link.url}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.text}
                </Pressable>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
