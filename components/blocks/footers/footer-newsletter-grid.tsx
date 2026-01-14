"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

/**
 * Social link configuration
 */
export interface FooterNewsletterGridSocialLink {
  /** Icon name in format: prefix/name (e.g., "simple-icons/instagram") */
  icon: string;
  /** Link URL */
  href: string;
  /** Accessible label */
  label: string;
}

/**
 * Navigation section configuration
 */
export interface FooterNewsletterGridSection {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

/**
 * Props for the FooterNewsletterGrid component
 */
export interface FooterNewsletterGridProps {
  /** Logo configuration */
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** Brand description text */
  description?: string;
  /** Navigation sections */
  sections?: FooterNewsletterGridSection[];
  /** Social media links */
  socialLinks?: FooterNewsletterGridSocialLink[];
  /** Newsletter section title */
  newsletterTitle?: string;
  /** Newsletter placeholder text */
  newsletterPlaceholder?: string;
  /** Newsletter button text */
  newsletterButtonText?: string;
  /** Privacy policy text */
  privacyText?: string;
  /** Privacy policy link text */
  privacyLinkText?: string;
  /** Privacy policy URL */
  privacyLinkUrl?: string;
  /** Copyright text */
  copyright?: string;
  /** Attribution text */
  attribution?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * FooterNewsletterGrid - A comprehensive footer with logo, social icons, navigation, and newsletter.
 *
 * Features a full-width grid layout with brand section (logo, description, social icons),
 * multi-column navigation, and a prominent newsletter signup form. Ideal for content-heavy
 * websites, SaaS products, and businesses that prioritize email marketing and social engagement.
 */
export function FooterNewsletterGrid({
  logo = {
    url: "https://opensite.ai",
    src: "https://cdn.ing/assets/i/r/285975/eud79qeya11q5w6ueyhklueardyx/os-suircle-black-white.png",
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  className,
  description = "A collection of 100+ responsive HTML templates for your startup business or side project.",
  sections,
  socialLinks,
  newsletterTitle = "Newsletter",
  newsletterPlaceholder = "Email",
  newsletterButtonText = "Subscribe",
  privacyText = "By submitting, you agree to our",
  privacyLinkText = "Privacy Policy",
  privacyLinkUrl = "#",
  copyright = `© ${new Date().getFullYear()} Opensite AI. All rights reserved.`,
  optixFlowConfig,
}: FooterNewsletterGridProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div className="grid grid-cols-4 justify-between gap-10 lg:grid-cols-6 lg:text-left">
            <div className="col-span-4 flex w-full flex-col gap-6 lg:col-span-2">
              <div className="flex items-center gap-2 lg:justify-start">
                <Pressable href={logo.url}>
                  <Img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8"
                    optixFlowConfig={optixFlowConfig}
                  />
                </Pressable>
                <h2 className="text-xl font-semibold">{logo.title}</h2>
              </div>
              <p className="text-muted-foreground">{description}</p>
              <ul className="flex items-center space-x-6">
                {socialLinks.map((social, idx) => (
                  <li
                    key={idx}
                    className="font-medium duration-200 hover:scale-110 hover:text-muted-foreground"
                  >
                    <Pressable href={social.href} aria-label={social.label}>
                      <DynamicIcon name={social.icon} size={24} />
                    </Pressable>
                  </li>
                ))}
              </ul>
            </div>
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="col-span-2 md:col-span-1">
                <h3 className="mb-5 font-medium">{section.title}</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
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
            ))}
            <div className="col-span-4 md:col-span-2">
              <h3 className="mb-5 font-medium">{newsletterTitle}</h3>
              <div className="grid gap-1.5">
                <div className="flex w-full items-center space-x-2">
                  <input
                    type="email"
                    placeholder={newsletterPlaceholder}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    {newsletterButtonText}
                  </button>
                </div>
              </div>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                {privacyText}
                <Pressable
                  href={privacyLinkUrl}
                  className="ml-1 text-primary hover:underline"
                >
                  {privacyLinkText}
                </Pressable>
              </p>
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
              <p>
                <span className="mr-1 font-bold text-primary">Opensite AI</span>
                {copyright}
              </p>
            </div>
            <Pressable
              href="https://opensite.ai"
              className="hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              AI Website and Automation Platform by Opensite
            </Pressable>
          </div>
        </footer>
      </div>
    </section>
  );
}
