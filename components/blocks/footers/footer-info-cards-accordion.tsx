"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Card, CardContent, CardTitle } from "../../ui/card";
import { AspectRatio } from "../../ui/aspect-ratio";
import { logoPlaceholders, imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { OptixFlowConfig } from "../../../src/types/blocks";

export interface FooterInfoCardsAccordionInfoItem {
  /**
   * Icon name in format: prefix/name
   */
  icon: string;
  /**
   * Info item title
   */
  title: string;
  /**
   * Info item text
   */
  text: string;
  /**
   * Optional link URL
   */
  link?: string;
}

export interface FooterInfoCardsAccordionLink {
  /**
   * Link text
   */
  text: string;
  /**
   * Link URL
   */
  link?: string;
}

export interface FooterInfoCardsAccordionSection {
  /**
   * Section title
   */
  title: string;
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Array of links in this section
   */
  items: FooterInfoCardsAccordionLink[];
}

export interface FooterInfoCardsAccordionSocialLink {
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

/**
 * Footer details configuration
 */
export interface FooterInfoCardsAccordionDetails {
  /** Hero image configuration */
  image: {
    src: string;
    alt: string;
  };
  /** Logo configuration with light/dark variants */
  logo: {
    light: string;
    dark: string;
  };
  /** Logo link URL */
  logoUrl: string;
  /** Brand description text */
  description: string;
}

export interface FooterInfoCardsAccordionProps {
  /**
   * Newsletter title
   */
  newsletterTitle?: React.ReactNode;
  /**
   * Newsletter description
   */
  newsletterDescription?: React.ReactNode;
  /**
   * Email input placeholder text
   */
  emailPlaceholder?: string;
  /**
   * Subscribe button text
   */
  subscribeText?: React.ReactNode;
  /**
   * Terms text before links
   */
  termsText?: React.ReactNode;
  /**
   * Terms of Use link text
   */
  termsLinkText?: React.ReactNode;
  /**
   * Terms of Use link URL
   */
  termsLinkUrl?: string;
  /**
   * Privacy Policy link text
   */
  privacyLinkText?: React.ReactNode;
  /**
   * Privacy Policy link URL
   */
  privacyLinkUrl?: string;
  /**
   * Info section items (contact cards)
   */
  infoItems?: FooterInfoCardsAccordionInfoItem[];
  /**
   * Footer link sections
   */
  footerLinks?: FooterInfoCardsAccordionSection[];
  /**
   * Social media links
   */
  socialLinks?: FooterInfoCardsAccordionSocialLink[];
  /**
   * Payment method image URLs
   */
  paymentMethods?: string[];
  /**
   * Submenu links
   */
  submenuLinks?: FooterInfoCardsAccordionLink[];
  /**
   * Footer details configuration
   */
  footerDetails?: FooterInfoCardsAccordionDetails;
  /**
   * Copyright text
   */
  copyright?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the newsletter grid
   */
  newsletterGridClassName?: string;
  /**
   * Additional CSS classes for the newsletter image wrapper
   */
  newsletterImageClassName?: string;
  /**
   * Additional CSS classes for the newsletter content
   */
  newsletterContentClassName?: string;
  /**
   * Additional CSS classes for the newsletter title
   */
  newsletterTitleClassName?: string;
  /**
   * Additional CSS classes for the newsletter description
   */
  newsletterDescriptionClassName?: string;
  /**
   * Additional CSS classes for the newsletter form
   */
  newsletterFormClassName?: string;
  /**
   * Additional CSS classes for the info cards grid
   */
  infoCardsGridClassName?: string;
  /**
   * Additional CSS classes for info cards
   */
  infoCardClassName?: string;
  /**
   * Additional CSS classes for the brand/accordion grid
   */
  brandGridClassName?: string;
  /**
   * Additional CSS classes for the brand column
   */
  brandColumnClassName?: string;
  /**
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
  /**
   * Additional CSS classes for the brand description
   */
  brandDescriptionClassName?: string;
  /**
   * Additional CSS classes for the accordion column
   */
  accordionColumnClassName?: string;
  /**
   * Additional CSS classes for the payment/social row
   */
  paymentSocialRowClassName?: string;
  /**
   * Additional CSS classes for payment methods
   */
  paymentMethodsClassName?: string;
  /**
   * Additional CSS classes for social links
   */
  socialLinksClassName?: string;
  /**
   * Additional CSS classes for the bottom section
   */
  bottomClassName?: string;
  /**
   * Additional CSS classes for the copyright
   */
  copyrightClassName?: string;
  /**
   * Additional CSS classes for submenu links
   */
  submenuLinksClassName?: string;
  /**
   * Section background variant
   */
  background?: SectionBackground;
  /**
   * Section spacing variant
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern
   */
  pattern?: string;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultInfoItems: FooterInfoCardsAccordionInfoItem[] = [
  {
    icon: "lucide/message-square-more",
    title: "Customer Support",
    text: "Mon–Fri, 8am–7pm EST.",
  },
  {
    icon: "lucide/phone",
    title: "Call Us",
    text: "+1 855-987-4420 (toll-free)",
    link: "tel:+18559874420",
  },
  {
    icon: "lucide/send",
    title: "Email Us",
    text: "support@company.com",
    link: "mailto:support@company.com",
  },
  {
    icon: "lucide/map-pin",
    title: "Address",
    text: "125 Main Avenue, Suite 210, CA",
  },
];

const defaultFooterLinks: FooterInfoCardsAccordionSection[] = [
  {
    title: "Shop",
    id: "shop",
    items: [
      { text: "New Launches", link: "#" },
      { text: "Best Sellers", link: "#" },
      { text: "Collections", link: "#" },
      { text: "Gifts & Sets", link: "#" },
    ],
  },
  {
    title: "Support",
    id: "support",
    items: [
      { text: "Contact Us", link: "#" },
      { text: "FAQs", link: "#" },
      { text: "Order Tracking", link: "#" },
      { text: "Returns & Exchanges", link: "#" },
    ],
  },
  {
    title: "About",
    id: "about",
    items: [
      { text: "Our Story", link: "#" },
      { text: "Ingredients", link: "#" },
      { text: "Sustainability", link: "#" },
      { text: "Press", link: "#" },
    ],
  },
];

const defaultSocialLinks: FooterInfoCardsAccordionSocialLink[] = [
  { icon: "simple-icons/facebook", link: "#", label: "Facebook" },
  { icon: "simple-icons/x", link: "#", label: "X (Twitter)" },
  { icon: "simple-icons/instagram", link: "#", label: "Instagram" },
];

const defaultSubmenuLinks: FooterInfoCardsAccordionLink[] = [
  { text: "Shipping Policy", link: "#" },
  { text: "Returns Policy", link: "#" },
  { text: "Terms Of Service", link: "#" },
  { text: "Privacy Policy", link: "#" },
];

/**
 * Footer Info Cards Accordion - A comprehensive footer with info cards,
 * newsletter, accordion navigation, payment methods, and social links.
 *
 * Layout: Hero image with newsletter, info cards grid, accordion links.
 * Key features: Contact info cards, payment method icons, language selector.
 * Best for: E-commerce sites, service businesses, customer-focused brands.
 *
 * @example
 * ```tsx
 * <FooterInfoCardsAccordion
 *   newsletterTitle="Newsletter"
 *   newsletterDescription="Join for exclusive offers."
 *   infoItems={[
 *     { icon: "lucide/phone", title: "Call Us", text: "+1 555-1234" },
 *   ]}
 *   footerLinks={[
 *     { title: "Shop", id: "shop", items: [...] },
 *   ]}
 * />
 * ```
 */
export function FooterInfoCardsAccordion({
  newsletterTitle = "Newsletter",
  newsletterDescription = "Join our newsletter for self-care tips, exclusive offers, and early access to our latest products.",
  emailPlaceholder = "Email Address",
  subscribeText = "Subscribe",
  termsText = "By subscribing you agree to the",
  termsLinkText = "Terms of Use",
  termsLinkUrl = "#",
  privacyLinkText = "Privacy Policy",
  privacyLinkUrl = "#",
  infoItems = defaultInfoItems,
  footerLinks = defaultFooterLinks,
  socialLinks = defaultSocialLinks,
  paymentMethods = [],
  submenuLinks = defaultSubmenuLinks,
  footerDetails = {
    image: {
      src: imagePlaceholders[0],
      alt: "Footer hero image",
    },
    logo: {
      light: logoPlaceholders.darkHorizontalLogo,
      dark: logoPlaceholders.lightHorizontalLogo,
    },
    logoUrl: "/",
    description:
      "We design products that empower people to express their individuality through thoughtful details and beautifully crafted essentials.",
  },
  copyright,
  className,
  contentClassName,
  newsletterGridClassName,
  newsletterImageClassName,
  newsletterContentClassName,
  newsletterTitleClassName,
  newsletterDescriptionClassName,
  newsletterFormClassName,
  infoCardsGridClassName,
  infoCardClassName,
  brandGridClassName,
  brandColumnClassName,
  logoClassName,
  brandDescriptionClassName,
  accordionColumnClassName,
  paymentSocialRowClassName,
  paymentMethodsClassName,
  socialLinksClassName,
  bottomClassName,
  copyrightClassName,
  submenuLinksClassName,
  background = "white",
  spacing = "md",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterInfoCardsAccordionProps) {
  const [email, setEmail] = React.useState("");
  const [isDesktop, setIsDesktop] = React.useState(false);

  const currentYear = new Date().getFullYear();
  const copyrightText = copyright ?? `© ${currentYear} Made with love by Opensite AI`;

  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const allAccordionIds = footerLinks.map(({ id }) => id);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("space-y-10", contentClassName)}>
        <div className={cn("grid items-center gap-x-20 gap-y-5 lg:grid-cols-2", newsletterGridClassName)}>
          <div className={cn(newsletterImageClassName)}>
            <AspectRatio ratio={2} className="overflow-hidden rounded-2xl">
              <Img
                src={footerDetails.image.src}
                alt={footerDetails.image.alt}
                className="block h-full w-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
          <div className={cn("space-y-5", newsletterContentClassName)}>
            <div className="space-y-3">
              <h3 className={cn("text-4xl font-semibold leading-snug", newsletterTitleClassName)}>
                {newsletterTitle}
              </h3>
              <p className={cn("leading-normal", newsletterDescriptionClassName)}>{newsletterDescription}</p>
            </div>
            <form className={cn("flex items-start gap-4", newsletterFormClassName)} onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={emailPlaceholder}
                className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Pressable onClick={() => {}} variant="default" asButton>
                {subscribeText}
              </Pressable>
            </form>
            <p className="text-sm text-muted-foreground">
              {termsText}{" "}
              <Pressable href={termsLinkUrl} className="underline underline-offset-2">
                {termsLinkText}
              </Pressable>{" "}
              &{" "}
              <Pressable href={privacyLinkUrl} className="underline underline-offset-2">
                {privacyLinkText}
              </Pressable>
              .
            </p>
          </div>
        </div>

        <div className={cn("grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4", infoCardsGridClassName)}>
          {infoItems.map((item, idx) => (
            <Card key={idx} className={cn("rounded-lg px-5 py-6", infoCardClassName)}>
              <CardContent className="flex items-start gap-3 p-0">
                <div className="shrink-0 basis-7">
                  <DynamicIcon name={item.icon} size={24} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="text-sm leading-relaxed">
                    <CardTitle className="text-base font-semibold leading-relaxed">
                      {item.title}
                    </CardTitle>
                    {item.link ? (
                      <Pressable
                        href={item.link}
                        className="break-all text-muted-foreground underline"
                      >
                        {item.text}
                      </Pressable>
                    ) : (
                      <p className="text-muted-foreground">{item.text}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={cn("grid grid-cols-1 gap-8 lg:grid-cols-5 xl:grid-cols-2", brandGridClassName)}>
          <div className={cn("space-y-5 lg:col-span-2 xl:col-span-1", brandColumnClassName)}>
            <Pressable href={footerDetails.logoUrl} className={cn("inline-block w-full max-w-80", logoClassName)}>
              <Img
                src={footerDetails.logo.light}
                alt="Logo"
                className="w-full dark:hidden"
                optixFlowConfig={optixFlowConfig}
              />
              <Img
                src={footerDetails.logo.dark}
                alt="Logo"
                className="hidden w-full dark:inline-block"
                optixFlowConfig={optixFlowConfig}
              />
            </Pressable>
            <p className={cn("max-w-md text-sm leading-relaxed text-muted-foreground", brandDescriptionClassName)}>
              {footerDetails.description}
            </p>
          </div>
          <div className={cn("lg:col-span-3 xl:col-span-1", accordionColumnClassName)}>
            {isDesktop ? (
              <Accordion
                value={allAccordionIds}
                type="multiple"
                className="grid grid-cols-3 gap-4"
              >
                {footerLinks.map((section) => (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    className="border-transparent"
                  >
                    <AccordionTrigger className="cursor-auto rounded-none pb-4 pt-0 text-base font-bold leading-normal hover:no-underline [&>svg]:hidden">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-1">
                      <ul className="space-y-3">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="text-sm font-light leading-tight">
                            <Pressable
                              href={item.link}
                              className="hover:underline hover:underline-offset-2"
                            >
                              {item.text}
                            </Pressable>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Accordion type="multiple">
                {footerLinks.map((section) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger className="py-4 text-base font-bold leading-normal hover:no-underline [&>svg]:hidden">
                      {section.title}
                      <DynamicIcon name="lucide/plus" size={20} className="lg:hidden" />
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <ul className="space-y-3">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="text-sm font-light leading-tight">
                            <Pressable
                              href={item.link}
                              className="hover:underline hover:underline-offset-2"
                            >
                              {item.text}
                            </Pressable>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>

        <div className={cn("flex flex-wrap justify-between gap-6", paymentSocialRowClassName)}>
          <div className="space-y-5">
            {paymentMethods.length > 0 && (
              <ul className={cn("flex flex-wrap items-center gap-3", paymentMethodsClassName)}>
                {paymentMethods.map((method, idx) => (
                  <li key={idx}>
                    <Img
                      src={method}
                      alt="Payment method"
                      className="w-10"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul className={cn("flex flex-wrap gap-4", socialLinksClassName)}>
            {socialLinks.map((social, idx) => (
              <li key={idx}>
                <Pressable
                  href={social.link}
                  variant="default"
                  size="icon"
                  asButton
                  className="rounded-full"
                  aria-label={social.label}
                >
                  <DynamicIcon name={social.icon} size={20} />
                </Pressable>
              </li>
            ))}
          </ul>
        </div>

        <div className={cn("flex flex-wrap justify-between gap-6 border-t pt-8", bottomClassName)}>
          <p className={cn("text-sm", copyrightClassName)}>{copyrightText}</p>
          <ul className={cn("flex flex-wrap gap-x-6 gap-y-4", submenuLinksClassName)}>
            {submenuLinks.map((link, idx) => (
              <li key={idx}>
                <Pressable href={link.link} className="text-sm font-light">
                  {link.text}
                </Pressable>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
