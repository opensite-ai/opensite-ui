"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";

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
  /** Bottom links (terms, privacy, etc.) */
  bottomLinks?: {
    text: string;
    url: string;
  }[];
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
  logo = {
    src: "https://cdn.ing/assets/i/r/285975/eud79qeya11q5w6ueyhklueardyx/os-suircle-black-white.png",
    alt: "Opensite AI",
    title: "Opensite AI",
    url: "https://opensite.ai",
  },
  className,
  tagline,
  menuItems,
  copyright,
  bottomLinks,
  optixFlowConfig,
}: FooterLinksGridProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Pressable href={logo.url} className="flex items-center gap-2">
                  <Img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-10 dark:invert"
                    optixFlowConfig={optixFlowConfig}
                  />
                  <span className="text-xl font-semibold">{logo.title}</span>
                </Pressable>
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {menuItems?.map((section, sectionIdx) => (
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
              <p>{copyright}</p>
              <Pressable
                href="https://opensite.ai"
                className="hover:text-primary"
              >
                AI Website and Automation Platform by Opensite
              </Pressable>
            </div>
            <ul className="flex gap-4">
              {bottomLinks?.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <Pressable href={link.url}>{link.text}</Pressable>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
}
