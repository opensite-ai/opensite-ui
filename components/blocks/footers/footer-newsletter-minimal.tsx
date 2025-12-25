"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Navigation link configuration
 */
export interface FooterNewsletterMinimalNavLink {
  label: string;
  href: string;
}

/**
 * Social link configuration
 */
export interface FooterNewsletterMinimalSocialLink {
  label: string;
  href: string;
}

/**
 * Footer link configuration
 */
export interface FooterNewsletterMinimalFooterLink {
  label: string;
  href: string;
}

/**
 * Props for the FooterNewsletterMinimal component
 */
export interface FooterNewsletterMinimalProps {
  /** Additional CSS classes */
  className?: string;
  /** Main heading text */
  heading?: string;
  /** Support email */
  supportEmail?: string;
  /** Navigation links */
  navLinks?: FooterNewsletterMinimalNavLink[];
  /** Social links */
  socialLinks?: FooterNewsletterMinimalSocialLink[];
  /** Footer links (privacy, terms) */
  footerLinks?: FooterNewsletterMinimalFooterLink[];
  /** Newsletter label */
  newsletterLabel?: string;
  /** Newsletter placeholder */
  newsletterPlaceholder?: string;
  /** Location text */
  location?: string;
}

const defaultNavLinks: FooterNewsletterMinimalNavLink[] = [
  { label: "Home", href: "#" },
  { label: "Collection", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Login", href: "#" },
];

const defaultSocialLinks: FooterNewsletterMinimalSocialLink[] = [
  { label: "Linkedin", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
];

const defaultFooterLinks: FooterNewsletterMinimalFooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

/**
 * FooterNewsletterMinimal - A dark-themed minimal footer with newsletter and animated logo.
 *
 * Features a clean layout with main heading, support email, navigation columns,
 * newsletter signup form, and a large animated brand logo. Ideal for modern SaaS products,
 * creative agencies, and businesses that want a sophisticated, dark-themed footer
 * with strong visual branding.
 */
export function FooterNewsletterMinimal({
  className,
  heading = "Unlock 800+ blocks now",
  supportEmail = "hi@opensite.ai",
  navLinks = defaultNavLinks,
  socialLinks = defaultSocialLinks,
  footerLinks = defaultFooterLinks,
  newsletterLabel = "Sign up for newsletter :",
  newsletterPlaceholder = "Name*",
  location = "San Francisco, CA",
}: FooterNewsletterMinimalProps): React.JSX.Element {
  return (
    <section
      className={cn("dark bg-background py-32 text-foreground", className)}
    >
      <div className="container">
        <div className="flex flex-col justify-between gap-15 lg:flex-row">
          <div className="flex flex-col gap-10">
            <p className="relative text-4xl font-medium tracking-tight lg:text-5xl">
              {heading}
            </p>
            <div className="space-y-1 text-sm font-light tracking-tight lg:text-base">
              <p>Get Support : </p>
              <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
            </div>
          </div>
          <div className="grid w-full max-w-xs grid-cols-2 gap-10 text-sm font-light lg:text-base">
            <ul className="space-y-1">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="tracking-tight text-foreground hover:text-foreground/30"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-1">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-1 tracking-tight text-foreground hover:text-foreground/30"
                  >
                    {item.label}{" "}
                    <DynamicIcon
                      name="lucide/arrow-up-right"
                      size={14}
                      className="text-foreground group-hover:text-muted-foreground/50"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col justify-between gap-15 lg:flex-row">
          <div className="flex w-full max-w-md flex-col gap-10">
            <div className="space-y-1 text-sm font-light tracking-tight lg:text-base">
              <p>{newsletterLabel}</p>
              <form className="flex w-full items-end border-b border-b-foreground/10">
                <input
                  type="text"
                  placeholder={newsletterPlaceholder}
                  className="mt-10 w-full rounded-none border-0 bg-transparent p-0 uppercase shadow-none placeholder:text-foreground/20 focus:outline-none focus:ring-0 lg:text-base"
                />
                <button type="submit" className="p-2 hover:bg-muted/20">
                  <DynamicIcon name="lucide/arrow-right" size={20} />
                </button>
              </form>
            </div>
          </div>
          <div className="grid w-full max-w-xs grid-cols-2 gap-10 text-sm font-light lg:text-base">
            <div className="w-32">{location}</div>
            <ul className="space-y-1">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-1 tracking-tight text-foreground hover:text-foreground/30"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-20 w-full lg:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-6xl font-bold tracking-tighter md:text-8xl lg:text-9xl">
              OPENSITE
            </span>
          </motion.div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Opensite AI. All rights reserved.</p>
          <a
            href="https://opensite.ai"
            className="mt-2 inline-block hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI Website and Automation Platform by Opensite
          </a>
        </div>
      </div>
    </section>
  );
}
