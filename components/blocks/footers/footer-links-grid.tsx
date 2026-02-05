"use client";

import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { FooterLogo } from "../../ui/footer-logo";
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
  /** Copyright text - use {year} placeholder for dynamic year */
  copyright?: string;
  /** Attribution text */
  attributionText?: string;
  /** Attribution link URL */
  attributionHref?: string;
  /** Bottom links (terms, privacy, etc.) */
  bottomLinks?: {
    text: string;
    url: string;
  }[];
  /** Section background variant */
  background?: SectionBackground;
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
  attributionText,
  attributionHref,
  bottomLinks,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterLinksGridProps): React.JSX.Element {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const copyrightText = copyright ?? `© ${currentYear}`;

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <footer>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {(logo || tagline) && (
            <div className="col-span-2 mb-8 lg:mb-0">
              {logo && (
                <FooterLogo
                  logo={logo}
                  logoClassName="flex items-center gap-2 lg:justify-start"
                  optixFlowConfig={optixFlowConfig}
                />
              )}
              {tagline && <p className="mt-4 font-bold">{tagline}</p>}
            </div>
          )}
          {menuItems && menuItems.length > 0 && menuItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 font-bold">{section.title}</h3>
              <ul className="space-y-4 text-muted-foreground">
                {section.links.map((link, linkIdx) => (
                  <li
                    key={linkIdx}
                    className="font-medium hover:text-primary"
                  >
                    <Pressable href={link.url}>{link.text}</Pressable>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <p>{copyrightText}</p>
            {attributionText && (
              <Pressable
                href={attributionHref || "https://opensite.ai"}
                className="hover:text-primary"
              >
                {attributionText}
              </Pressable>
            )}
          </div>
          {bottomLinks && bottomLinks.length > 0 && (
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
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
