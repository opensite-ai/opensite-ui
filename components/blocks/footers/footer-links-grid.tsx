"use client";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { FooterLogo } from "../../ui/footer-logo";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Menu item structure for footer navigation sections
 */
export interface FooterLinksGridMenuItem {
  /** Section title */
  title: string;
  /** Links within the section */
  links: {
    text: string;
    url: string;
  }[];
}

/**
 * Props for the FooterLinksGrid component
 */
export interface FooterLinksGridProps {
  /** Logo configuration */
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** Tagline displayed below the logo */
  tagline?: string;
  /** Navigation menu sections */
  menuItems?: FooterLinksGridMenuItem[];
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Bottom links (terms, privacy, etc.) */
  bottomLinks?: {
    text: string;
    url: string;
  }[];
  /** Section background variant */
  background?: SectionBackground;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern name */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * FooterLinksGrid - A multi-column footer with logo, navigation links, and legal information.
 *
 * Features a responsive grid layout with customizable navigation sections,
 * company branding, and bottom legal links. Ideal for corporate websites,
 * SaaS products, and marketing sites that need organized footer navigation.
 */
export function FooterLinksGrid({
  logo,
  className,
  tagline,
  menuItems,
  copyright,
  bottomLinks,
  background,
  pattern,
  patternOpacity,
  optixFlowConfig,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
}: FooterLinksGridProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <footer>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {(logo || tagline) && (
            <div className="flex space-y-2 col-span-2 flex-col mb-6 md:mb-0 pr-0 md:pr-6">
              {logo && (
                <FooterLogo
                  logo={logo}
                  logoClassName="flex items-center gap-2 lg:justify-start"
                  optixFlowConfig={optixFlowConfig}
                />
              )}
              {tagline && <p className="mt-4">{tagline}</p>}
            </div>
          )}
          {menuItems &&
            menuItems.length > 0 &&
            menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="text-sm font-medium">
                      <Pressable href={link.url}>{link.text}</Pressable>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
        <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <FooterCopyright copyright={copyright} />
            <BrandAttribution
              internalBrandSlug="open_site_ai"
              optionIndex={0}
              variant="span"
              linkClassName="hover:opacity-100"
            />
          </div>
          {bottomLinks && bottomLinks.length > 0 && (
            <ul className="pt-4 md:pt-0 gap-4 grid md:flex grid-cols-2 items-center">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline">
                  <Pressable href={link.url}>{link.text}</Pressable>
                </li>
              ))}
            </ul>
          )}
        </div>
      </footer>
    </Section>
  );
}
