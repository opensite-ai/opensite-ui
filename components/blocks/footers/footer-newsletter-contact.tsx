"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Separator } from "../../ui/separator";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface FooterNewsletterContactLink {
  /**
   * Link text
   */
  text: string;
  /**
   * Link URL
   */
  link: string;
}

export interface FooterNewsletterContactSection {
  /**
   * Section title
   */
  title: string;
  /**
   * Array of links in this section
   */
  items: FooterNewsletterContactLink[];
}

export interface FooterNewsletterContactDetail {
  /**
   * Icon name in format: prefix/name
   */
  icon: string;
  /**
   * Display text
   */
  text: string;
  /**
   * Link type: "none" | "email" | "phone"
   */
  type: "none" | "email" | "phone";
  /**
   * Link value (email address or phone number)
   */
  link?: string;
}

export interface FooterNewsletterContactSocialLink {
  /**
   * Icon name in format: prefix/name
   */
  icon: string;
  /**
   * Link URL
   */
  link: string;
  /**
   * Accessible label
   */
  label: string;
}

export interface FooterNewsletterContactProps {
  /**
   * Newsletter section title
   */
  newsletterTitle?: string;
  /**
   * Newsletter description
   */
  newsletterDescription?: string;
  /**
   * Newsletter placeholder text
   */
  newsletterPlaceholder?: string;
  /**
   * Newsletter button text
   */
  newsletterButtonText?: string;
  /**
   * Footer link sections
   */
  footerLinks?: FooterNewsletterContactSection[];
  /**
   * Contact details
   */
  contactDetails?: FooterNewsletterContactDetail[];
  /**
   * Social media links
   */
  socialLinks?: FooterNewsletterContactSocialLink[];
  /**
   * Logo configuration
   */
  logo?: {
    light: string;
    dark: string;
    url: string;
  };
  /**
   * Copyright text
   */
  copyright?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultFooterLinks: FooterNewsletterContactSection[] = [
  {
    title: "Information",
    items: [
      { text: "Terms and Conditions", link: "#" },
      { text: "Privacy Policy", link: "#" },
      { text: "Warranty Policy", link: "#" },
      { text: "Terms of Service", link: "#" },
    ],
  },
  {
    title: "Collections",
    items: [
      { text: "New Arrivals", link: "#" },
      { text: "Best Sellers", link: "#" },
      { text: "Seasonal Edits", link: "#" },
      { text: "Wardrobe Essentials", link: "#" },
    ],
  },
];

const defaultContactDetails: FooterNewsletterContactDetail[] = [
  {
    icon: "lucide/mail",
    text: "support@store.com",
    link: "support@store.com",
    type: "email",
  },
  {
    icon: "lucide/phone",
    text: "+1 234 567 8910",
    link: "+12345678910",
    type: "phone",
  },
  {
    icon: "lucide/clock",
    text: "Monday - Friday, 9 am - 9 pm",
    type: "none",
  },
];

const defaultSocialLinks: FooterNewsletterContactSocialLink[] = [
  { icon: "simple-icons/facebook", link: "#", label: "Facebook" },
  { icon: "simple-icons/x", link: "#", label: "X (Twitter)" },
  { icon: "simple-icons/instagram", link: "#", label: "Instagram" },
];

/**
 * Footer Newsletter Contact - A comprehensive footer with newsletter signup,
 * navigation links, contact details, and social media icons.
 *
 * Layout: Four-column grid with newsletter, link sections, and contact info.
 * Key features: Newsletter form, contact details with icons, social links.
 * Best for: E-commerce sites, business websites, service-based companies.
 *
 * @example
 * ```tsx
 * <FooterNewsletterContact
 *   newsletterTitle="Newsletter"
 *   newsletterDescription="Join our newsletter for exclusive deals."
 *   footerLinks={[
 *     { title: "Information", items: [...] },
 *   ]}
 *   contactDetails={[
 *     { icon: "lucide/mail", text: "support@store.com", type: "email" },
 *   ]}
 * />
 * ```
 */
export function FooterNewsletterContact({
  newsletterTitle = "Newsletter",
  newsletterDescription = "Join our newsletter to receive exclusive deals, tech tips, product launches, and early access to the latest electronics.",
  newsletterPlaceholder = "Email Address",
  newsletterButtonText = "Subscribe",
  footerLinks = defaultFooterLinks,
  contactDetails = defaultContactDetails,
  socialLinks = defaultSocialLinks,
  logo = {
    light: logoPlaceholders.darkHorizontalLogo,
    dark: logoPlaceholders.lightHorizontalLogo,
    url: "/",
  },
  copyright = `Copyright © ${new Date().getFullYear()}`,
  className,
  optixFlowConfig,
}: FooterNewsletterContactProps) {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className={cn("pb-8 pt-8 xl:pt-12", className)}>
      <div className="container space-y-10">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-6">
            <h3 className="text-3xl font-medium font-serif leading-none">
              {newsletterTitle}
            </h3>
            <p className="font-light leading-normal">{newsletterDescription}</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterPlaceholder}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Pressable
                onClick={() => {}}
                variant="default"
                asButton
                className="w-full"
              >
                {newsletterButtonText}
              </Pressable>
            </form>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h2 className="mb-6 text-sm font-medium uppercase leading-tight text-muted-foreground">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Pressable
                      href={item.link}
                      className="underline-offset-4 hover:underline"
                    >
                      {item.text}
                    </Pressable>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-6 text-sm font-medium uppercase leading-tight text-muted-foreground">
              Contact
            </h2>
            <div className="space-y-6">
              <ul className="space-y-3">
                {contactDetails.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <DynamicIcon name={item.icon} size={16} className="shrink-0" />
                    <div className="flex-1">
                      {item.type === "none" ? (
                        <p>{item.text}</p>
                      ) : (
                        <Pressable
                          href={
                            item.type === "email"
                              ? `mailto:${item.link}`
                              : `tel:${item.link}`
                          }
                          className="underline-offset-4 hover:underline"
                        >
                          {item.text}
                        </Pressable>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-3">
                {socialLinks.map((social, idx) => (
                  <li key={idx}>
                    <Pressable
                      href={social.link}
                      variant="outline"
                      size="icon"
                      asButton
                      aria-label={social.label}
                    >
                      <DynamicIcon name={social.icon} size={20} />
                    </Pressable>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4 md:gap-12">
            <Separator className="flex-1" />
            <div className="basis-30 md:basis-40">
              <Pressable href={logo.url}>
                <Img
                  src={logo.light}
                  alt="Logo"
                  className="block dark:hidden"
                  optixFlowConfig={optixFlowConfig}
                />
                <Img
                  src={logo.dark}
                  alt="Logo"
                  className="hidden dark:block"
                  optixFlowConfig={optixFlowConfig}
                />
              </Pressable>
            </div>
            <Separator className="flex-1" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <p className="text-muted-foreground max-md:text-xs">{copyright}</p>
          <Separator
            orientation="vertical"
            className="h-4 bg-foreground/60 max-sm:hidden"
          />
          <p className="max-md:text-xs">Powered by Opensite AI</p>
          <Pressable
            href="#top"
            variant="outline"
            size="icon"
            asButton
            aria-label="Back to top"
          >
            <DynamicIcon name="lucide/chevron-up" size={16} />
          </Pressable>
        </div>
      </div>
    </section>
  );
}
