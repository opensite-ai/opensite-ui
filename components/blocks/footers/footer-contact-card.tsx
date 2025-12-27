"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

/**
 * Social link configuration
 */
export interface FooterContactCardSocialLink {
  /** Icon name in format: prefix/name (e.g., "simple-icons/instagram") */
  icon: string;
  /** Link URL */
  href: string;
  /** Accessible label */
  label: string;
}

/**
 * Navigation link configuration
 */
export interface FooterContactCardNavLink {
  name: string;
  href: string;
}

/**
 * Props for the FooterContactCard component
 */
export interface FooterContactCardProps {
  /** Logo configuration */
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** Main heading text */
  heading?: string;
  /** Contact email */
  email?: string;
  /** Contact phone */
  phone?: string;
  /** Contact address */
  address?: string;
  /** Social media links */
  socialLinks?: FooterContactCardSocialLink[];
  /** Navigation links */
  navLinks?: FooterContactCardNavLink[];
  /** Location text */
  location?: string;
  /** Copyright text */
  copyright?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSocialLinks: FooterContactCardSocialLink[] = [
  { icon: "simple-icons/instagram", href: "#", label: "Instagram" },
  { icon: "simple-icons/facebook", href: "#", label: "Facebook" },
  { icon: "simple-icons/x", href: "#", label: "X (Twitter)" },
  { icon: "simple-icons/linkedin", href: "#", label: "LinkedIn" },
];

const defaultNavLinks: FooterContactCardNavLink[] = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Services", href: "#" },
  { name: "Contact", href: "#" },
];

/**
 * FooterContactCard - A footer with large heading, contact information, and social links.
 *
 * Features a prominent heading, contact details (email, phone, address), social media icons,
 * and horizontal navigation. Ideal for service businesses, agencies, and professional websites
 * that want to emphasize contact information and make it easy for visitors to get in touch.
 */
export function FooterContactCard({
  logo = {
    url: "https://opensite.ai",
    src: "https://cdn.ing/assets/i/r/285975/eud79qeya11q5w6ueyhklueardyx/os-suircle-black-white.png",
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  className,
  heading = "Let's work together",
  email = "hello@opensite.ai",
  phone = "+1 (555) 123-4567",
  address = "123 Main Street, San Francisco, CA 94102",
  socialLinks = defaultSocialLinks,
  navLinks = defaultNavLinks,
  location = "San Francisco",
  copyright = `© ${new Date().getFullYear()} Opensite AI. All rights reserved.`,
  optixFlowConfig,
}: FooterContactCardProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column - Heading and Contact */}
            <div>
              <Pressable
                href={logo.url}
                className="mb-8 flex items-center gap-2"
              >
                <Img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10"
                  optixFlowConfig={optixFlowConfig}
                />
                <span className="text-xl font-semibold">{logo.title}</span>
              </Pressable>
              <h2 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {heading}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <Pressable
                    href={`mailto:${email}`}
                    className="hover:text-primary"
                  >
                    {email}
                  </Pressable>
                </p>
                <p>
                  <Pressable
                    href={`tel:${phone}`}
                    className="hover:text-primary"
                  >
                    {phone}
                  </Pressable>
                </p>
                <p>{address}</p>
              </div>
            </div>

            {/* Right Column - Social and Navigation */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="mb-4 font-medium">Follow Us</p>
                <ul className="flex items-center gap-4">
                  {socialLinks.map((social, idx) => (
                    <li key={idx}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <DynamicIcon name={social.icon} size={20} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <nav className="mt-8">
                <ul className="flex flex-wrap gap-6">
                  {navLinks.map((link, idx) => (
                    <li key={idx}>
                      <Pressable
                        href={link.href}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {link.name}
                      </Pressable>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <p>{copyright}</p>
              <a
                href="https://opensite.ai"
                className="hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                AI Website and Automation Platform by Opensite
              </a>
            </div>
            <p>
              Designed in <strong>{location}</strong>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
