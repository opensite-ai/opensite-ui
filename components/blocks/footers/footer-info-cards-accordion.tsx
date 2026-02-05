"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { FooterLogo } from "../../ui/footer-logo";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import { Card, CardContent, CardTitle } from "../../ui/card";
import type { FooterSocialLink } from "./types";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
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
  socialLinks?: FooterSocialLink[];
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
   * Brand/company name for the copyright notice
   */
  copyright?: string;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * Footer Info Cards Accordion - A comprehensive footer with info cards,
 * newsletter, navigation links, payment methods, and social links.
 *
 * Layout: Hero image with newsletter, info cards grid, organized link sections.
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
  newsletterTitle,
  newsletterDescription,
  emailPlaceholder,
  subscribeText,
  termsText,
  termsLinkText,
  termsLinkUrl,
  privacyLinkText,
  privacyLinkUrl,
  infoItems,
  footerLinks,
  socialLinks,
  paymentMethods,
  submenuLinks,
  footerDetails,
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
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterInfoCardsAccordionProps) {
  const [email, setEmail] = React.useState("");

  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("space-y-10", contentClassName)}>
        {footerDetails?.image?.src && (newsletterTitle || newsletterDescription || subscribeText) && (
          <div
            className={cn(
              "grid items-center gap-x-20 gap-y-5 lg:grid-cols-2",
              newsletterGridClassName,
            )}
          >
            <div className={cn(newsletterImageClassName)}>
              <AspectRatio ratio={2} className="overflow-hidden rounded-2xl">
                <Img
                  src={footerDetails.image.src}
                  alt={footerDetails.image.alt || ""}
                  className="block h-full w-full object-cover object-center"
                  optixFlowConfig={optixFlowConfig}
                />
              </AspectRatio>
            </div>
            <div className={cn("space-y-5", newsletterContentClassName)}>
              {(newsletterTitle || newsletterDescription) && (
                <div className="space-y-3">
                  {newsletterTitle && (
                    <h3
                      className={cn(
                        "text-4xl font-semibold leading-snug",
                        newsletterTitleClassName,
                      )}
                    >
                      {newsletterTitle}
                    </h3>
                  )}
                  {newsletterDescription && (
                    <p
                      className={cn("leading-normal", newsletterDescriptionClassName)}
                    >
                      {newsletterDescription}
                    </p>
                  )}
                </div>
              )}
              {subscribeText && (
                <form
                  className={cn("flex items-start gap-4", newsletterFormClassName)}
                  onSubmit={handleSubmit}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={emailPlaceholder || "Email Address"}
                    className="flex h-10 flex-1 rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <Pressable
                    componentType="button"
                    type="submit"
                    variant="default"
                    asButton
                  >
                    {subscribeText}
                  </Pressable>
                </form>
              )}
              {(termsText || termsLinkText || privacyLinkText) && (
                <p className="text-sm opacity-80">
                  {termsText}{" "}
                  {termsLinkText && (
                    <Pressable
                      href={termsLinkUrl || "#"}
                      className="underline underline-offset-2"
                    >
                      {termsLinkText}
                    </Pressable>
                  )}{" "}
                  &{" "}
                  {privacyLinkText && (
                    <Pressable
                      href={privacyLinkUrl || "#"}
                      className="underline underline-offset-2"
                    >
                      {privacyLinkText}
                    </Pressable>
                  )}
                  .
                </p>
              )}
            </div>
          </div>
        )}

        {infoItems && infoItems.length > 0 && (
          <div
            className={cn(
              "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4",
              infoCardsGridClassName,
            )}
          >
            {infoItems.map((item, idx) => (
            <Card
              key={idx}
              className={cn("rounded-lg px-5 py-6", infoCardClassName)}
            >
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
                        className="break-all opacity-80 underline"
                      >
                        {item.text}
                      </Pressable>
                    ) : (
                      <p className="opacity-80">{item.text}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}

        {(footerDetails?.logo || footerDetails?.description || footerLinks) && (
          <div
            className={cn(
              "grid grid-cols-1 gap-8 lg:grid-cols-5 xl:grid-cols-2",
              brandGridClassName,
            )}
          >
            {(footerDetails?.logo || footerDetails?.description) && (
              <div
                className={cn(
                  "space-y-5 lg:col-span-2 xl:col-span-1",
                  brandColumnClassName,
                )}
              >
                {footerDetails?.logo && (
                  <FooterLogo
                    logo={{ ...footerDetails.logo, url: footerDetails.logoUrl || "/" }}
                    logoClassName={cn("inline-block w-full max-w-80", logoClassName)}
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
                {footerDetails?.description && (
                  <p
                    className={cn(
                      "max-w-md text-sm leading-relaxed opacity-80",
                      brandDescriptionClassName,
                    )}
                  >
                    {footerDetails.description}
                  </p>
                )}
              </div>
            )}
          {footerLinks && footerLinks.length > 0 && (
            <div
              className={cn(
                "lg:col-span-3 xl:col-span-1",
                accordionColumnClassName,
              )}
            >
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {footerLinks.map((section) => (
                  <div key={section.id}>
                    <h3 className="mb-4 text-base font-bold">{section.title}</h3>
                    <ul className="space-y-3 text-sm opacity-80">
                      {section.items.map((item, idx) => (
                        <li key={idx}>
                          <Pressable
                            href={item.link}
                            className="hover:opacity-100"
                          >
                            {item.text}
                          </Pressable>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        )}

        {((paymentMethods && paymentMethods.length > 0) || (socialLinks && socialLinks.length > 0)) && (
          <div
            className={cn(
              "flex flex-wrap justify-between gap-6",
              paymentSocialRowClassName,
            )}
          >
            <div className="space-y-5">
              {paymentMethods && paymentMethods.length > 0 && (
                <ul
                  className={cn(
                    "flex flex-wrap items-center gap-3",
                    paymentMethodsClassName,
                  )}
                >
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
            {socialLinks && socialLinks.length > 0 && (
              <ul className={cn("flex flex-wrap gap-4", socialLinksClassName)}>
                {socialLinks.map((social, idx) => (
                  <li key={idx}>
                    <SocialLinkIcon
                      href={social.href}
                      label={social.label}
                      iconNameOverride={social.iconNameOverride}
                      variant="default"
                      size="icon"
                      asButton
                      className="rounded-full"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div
          className={cn(
            "flex flex-wrap justify-between gap-6 border-t pt-8",
            bottomClassName,
          )}
        >
          <div className={cn("flex flex-wrap items-center gap-4 text-sm opacity-80", copyrightClassName)}>
            <FooterCopyright copyright={copyright} />
            <BrandAttribution
              internalBrandSlug="open_site_ai"
              optionIndex={0}
              variant="span"
              linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
            />
          </div>
          {submenuLinks && submenuLinks.length > 0 && (
            <ul
              className={cn(
                "flex flex-wrap gap-x-6 gap-y-4",
                submenuLinksClassName,
              )}
            >
              {submenuLinks.map((link, idx) => (
                <li key={idx}>
                  <Pressable href={link.link} className="text-sm font-light">
                    {link.text}
                  </Pressable>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
