"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";

/**
 * Menu item configuration
 */
export interface FooterBackgroundCardMenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

/**
 * Contact information configuration
 */
export interface FooterBackgroundCardContact {
  phone: string;
  email: string;
  location: string;
  timezone: string;
}

/**
 * Props for the FooterBackgroundCard component
 */
export interface FooterBackgroundCardProps {
  /** Logo configuration */
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** Background image URL */
  backgroundImage?: string;
  /** Profile image URL */
  profileImage?: string;
  /** Tagline text */
  tagline?: string;
  /** Personal message text */
  personalMessage?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button URL */
  ctaUrl?: string;
  /** Contact information */
  contact?: FooterBackgroundCardContact;
  /** Menu items */
  menuItems?: FooterBackgroundCardMenuItem[];
  /** Copyright text */
  copyright?: string;
  /** Bottom links */
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

const defaultMenuItems: FooterBackgroundCardMenuItem[] = [
  {
    title: "Portfolio",
    links: [
      { text: "Overview", url: "#" },
      { text: "Projects", url: "#" },
      { text: "Pricing", url: "#" },
      { text: "About", url: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { text: "Twitter", url: "#" },
      { text: "Instagram", url: "#" },
      { text: "LinkedIn", url: "#" },
    ],
  },
];

const defaultContact: FooterBackgroundCardContact = {
  phone: "+1 (555) 123-4567",
  email: "hello@opensite.ai",
  location: "NYC",
  timezone: "EST",
};

const defaultBottomLinks = [
  { text: "Terms and Conditions", url: "#" },
  { text: "Privacy Policy", url: "#" },
];

/**
 * FooterBackgroundCard - A footer with background image and floating contact card.
 *
 * Features a full-width background image with a floating card containing profile image,
 * personal message, CTA button, navigation links, and contact information. Ideal for
 * creative professionals, agencies, portfolios, and businesses that want a visually
 * striking footer with a personal touch.
 */
export function FooterBackgroundCard({
  logo = {
    url: "https://opensite.ai",
    src: "https://cdn.ing/assets/i/r/285975/eud79qeya11q5w6ueyhklueardyx/os-suircle-black-white.png",
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  className,
  backgroundImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  profileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  tagline = "Let's Connect",
  personalMessage = "I'm passionate about creating beautiful, functional components that make your projects shine. Let's work together to bring your vision to life.",
  ctaText = "Schedule a call",
  ctaUrl = "#",
  contact = defaultContact,
  menuItems = defaultMenuItems,
  copyright = `© ${new Date().getFullYear()} Opensite AI. All rights reserved.`,
  bottomLinks = defaultBottomLinks,
  optixFlowConfig,
}: FooterBackgroundCardProps): React.JSX.Element {
  return (
    <section
      className={cn("bg-cover bg-center bg-no-repeat py-32", className)}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div className="container">
        <div className="mx-auto max-w-7xl rounded-lg bg-background p-8 shadow-lg md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Profile and CTA Section */}
            <div className="lg:col-span-1">
              <div className="mb-4 flex items-center gap-4">
                <Img
                  src={profileImage}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
                <h3 className="text-2xl font-medium">{tagline}</h3>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {personalMessage}
              </p>
              <a
                href={ctaUrl}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                {ctaText}
              </Pressable>
            </div>

            {/* Menu Sections */}
            {menuItems.map((menu, idx) => (
              <div key={idx}>
                <h3 className="mb-4 text-sm font-medium tracking-wider text-primary uppercase">
                  {menu.title}
                </h3>
                <ul className="space-y-3">
                  {menu.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        className="border-b border-transparent text-muted-foreground transition-all duration-300 ease-in-out hover:border-primary hover:text-primary"
                      >
                        {link.text}
                      </Pressable>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            <div>
              <h3 className="mb-4 text-sm font-medium tracking-wider text-primary uppercase">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="text-muted-foreground">{contact.phone}</li>
                <li className="text-muted-foreground">{contact.email}</li>
                <li className="text-muted-foreground">
                  {contact.location} • {contact.timezone}
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:gap-4">
              <p>{copyright}</p>
              <a
                href="https://opensite.ai"
                className="hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                AI Website and Automation Platform by Opensite
              </Pressable>
            </div>
            <div className="flex gap-4">
              {bottomLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.text}
                </Pressable>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
