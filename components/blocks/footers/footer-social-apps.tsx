"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

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
  /** Section background variant */
  background?: SectionBackground;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern */
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
 * FooterSocialApps - A footer with social icons, navigation links, and mobile app download links.
 *
 * Features prominent social media icons and mobile app store links in circular buttons,
 * along with multi-column navigation. Ideal for products with mobile apps, community-focused
 * platforms, and businesses that want to highlight their cross-platform presence.
 */
export function FooterSocialApps({
  logo,
  className,
  sections,
  socialLinks,
  appLinks,
  socialLabel,
  appLabel,
  copyright,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterSocialAppsProps): React.JSX.Element {
  const sectionsContent = useMemo(() => {
    if (!sections || sections.length === 0) return null;

    return sections.map((section, sectionIdx) => (
      <div key={sectionIdx}>
        <h3 className="mb-4 font-bold">{section.title}</h3>
        <ul className="space-y-4 text-muted-foreground">
          {section.links.map((link, linkIdx) => (
            <li
              key={linkIdx}
              className="font-medium hover:text-primary"
            >
              <Pressable href={link.href}>{link.name}</Pressable>
            </li>
          ))}
        </ul>
      </div>
    ));
  }, [sections]);

  const socialLinksContent = useMemo(() => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((social, idx) => (
      <li key={idx} className="font-medium">
        <Pressable href={social.href} aria-label={social.label}>
          <span className={cn(
            "flex size-12 items-center justify-center rounded-full transition-colors hover:text-primary",
            getNestedCardBg(background),
            getNestedCardTextColor(background)
          )}>
            <DynamicIcon name={social.icon} size={24} />
          </span>
        </Pressable>
      </li>
    ));
  }, [socialLinks]);

  const appLinksContent = useMemo(() => {
    if (!appLinks || appLinks.length === 0) return null;

    return appLinks.map((app, idx) => (
      <li key={idx} className="font-medium">
        <Pressable href={app.href} aria-label={app.label}>
          <span className={cn(
            "flex size-12 items-center justify-center rounded-full transition-colors hover:text-primary",
            getNestedCardBg(background),
            getNestedCardTextColor(background)
          )}>
            <DynamicIcon name={app.icon} size={24} />
          </span>
        </Pressable>
      </li>
    ));
  }, [appLinks]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div>
        <footer>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-20">
            {logo && (
              <div className="flex flex-col gap-6">
                <Pressable href={logo.url} className="flex items-center gap-2">
                  {logo.src && (
                    <Img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-10"
                      optixFlowConfig={optixFlowConfig}
                    />
                  )}
                  {logo.title && (
                    <span className="text-xl font-semibold">{logo.title}</span>
                  )}
                </Pressable>
              </div>
            )}
            {sections && sections.length > 0 && (
              <div className="grid flex-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                {sectionsContent}
              </div>
            )}
            {((socialLinks && socialLinks.length > 0) || (appLinks && appLinks.length > 0)) && (
              <div className="flex flex-col gap-6">
                {socialLinks && socialLinks.length > 0 && (
                  <div>
                    {socialLabel && (
                      <p className="mb-3 font-bold">{socialLabel}</p>
                    )}
                    <ul className="flex items-center gap-2 text-muted-foreground">
                      {socialLinksContent}
                    </ul>
                  </div>
                )}
                {appLinks && appLinks.length > 0 && (
                  <div>
                    {appLabel && (
                      <p className="mb-3 font-bold">{appLabel}</p>
                    )}
                    <ul className="flex items-center gap-2 text-muted-foreground">
                      {appLinksContent}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          {copyright && (
            <div className="mt-24 border-t pt-8">
              <div className="flex flex-col justify-between gap-4 text-center text-sm font-medium text-muted-foreground md:flex-row md:text-left">
                <p>{copyright}</p>
              </div>
            </div>
          )}
        </footer>
      </div>
    </Section>
  );
}
