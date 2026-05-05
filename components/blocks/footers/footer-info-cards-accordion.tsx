"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import {
  PaymentPlatformIcon,
  type PaymentPlatformName,
} from "../../ui/payment-platform-icon";
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
   * Payment platform names to display icons for
   */
  paymentPlatforms?: PaymentPlatformName[];
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
   * Additional CSS classes for the container
   */
  containerClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
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
  sectionId = "footer-info-cards-accordion",
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
  paymentPlatforms,
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
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
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
      id="footer-info-cards-accordion"
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className={cn("space-y-12 lg:space-y-14", contentClassName)}>
        {footerDetails?.image?.src &&
          (newsletterTitle || newsletterDescription || subscribeText) && (
            <div
              className={cn(
                "grid gap-6 rounded-3xl border bg-card/40 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-10 lg:p-8",
                newsletterGridClassName,
              )}
            >
              <div
                className={cn(
                  "overflow-hidden rounded-2xl bg-muted/30",
                  newsletterImageClassName,
                )}
              >
                <AspectRatio ratio={3 / 2}>
                  <Img
                    src={footerDetails.image.src}
                    alt={footerDetails.image.alt || ""}
                    className="block h-full w-full object-cover object-center"
                    optixFlowConfig={optixFlowConfig}
                  />
                </AspectRatio>
              </div>
              <div className={cn("space-y-6", newsletterContentClassName)}>
                {(newsletterTitle || newsletterDescription) && (
                  <div className="space-y-3 text-pretty">
                    {newsletterTitle && (
                      <h3
                        className={cn(
                          "text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl",
                          newsletterTitleClassName,
                        )}
                      >
                        {newsletterTitle}
                      </h3>
                    )}
                    {newsletterDescription && (
                      <p
                        className={cn(
                          "text-sm leading-relaxed text-muted-foreground sm:text-base",
                          newsletterDescriptionClassName,
                        )}
                      >
                        {newsletterDescription}
                      </p>
                    )}
                  </div>
                )}
                {subscribeText && (
                  <form
                    className={cn(
                      "flex flex-col gap-3 sm:flex-row sm:items-center",
                      newsletterFormClassName,
                    )}
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={emailPlaceholder || "Email Address"}
                      className="h-11 w-full rounded-full border border-input bg-background px-4 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:flex-1"
                    />
                    <Pressable
                      componentType="button"
                      type="submit"
                      variant="default"
                      asButton
                      className="h-11 w-full rounded-full px-6 text-sm font-semibold sm:w-auto"
                    >
                      {subscribeText}
                    </Pressable>
                  </form>
                )}
                {(termsText || termsLinkText || privacyLinkText) && (
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {termsText}{" "}
                    {termsLinkText && (
                      <Pressable
                        href={termsLinkUrl || "#"}
                        className="underline underline-offset-4 transition-colors hover:text-foreground"
                      >
                        {termsLinkText}
                      </Pressable>
                    )}{" "}
                    &{" "}
                    {privacyLinkText && (
                      <Pressable
                        href={privacyLinkUrl || "#"}
                        className="underline underline-offset-4 transition-colors hover:text-foreground"
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
              "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
              infoCardsGridClassName,
            )}
          >
            {infoItems.map((item, idx) => (
              <Card
                key={idx}
                className={cn(
                  "group rounded-2xl border-border/60 bg-card/40 px-5 py-5 shadow-none transition-all hover:border-border/80 hover:bg-card/60 hover:shadow-sm",
                  infoCardClassName,
                )}
              >
                <CardContent className="flex items-start gap-4 p-0">
                  <div className="mt-0.5 flex size-10 items-center justify-center rounded-full border bg-background/80 text-muted-foreground transition-colors group-hover:text-foreground">
                    <DynamicIcon name={item.icon} size={18} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <CardTitle className="text-sm font-semibold">
                      {item.title}
                    </CardTitle>
                    {item.link ? (
                      <Pressable
                        href={item.link}
                        className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                      >
                        {item.text}
                      </Pressable>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {item.text}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {(footerDetails?.logo || footerDetails?.description || footerLinks) && (
          <div
            className={cn(
              "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]",
              brandGridClassName,
            )}
          >
            {(footerDetails?.logo || footerDetails?.description) && (
              <div className={cn("space-y-5", brandColumnClassName)}>
                {footerDetails?.logo && (
                  <FooterLogo
                    logo={{
                      ...footerDetails.logo,
                      url: footerDetails.logoUrl || "/",
                    }}
                    logoClassName={cn(
                      "inline-block w-full max-w-64",
                      logoClassName,
                    )}
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
                {footerDetails?.description && (
                  <p
                    className={cn(
                      "max-w-md text-sm leading-relaxed text-muted-foreground",
                      brandDescriptionClassName,
                    )}
                  >
                    {footerDetails.description}
                  </p>
                )}
              </div>
            )}
            {footerLinks && footerLinks.length > 0 && (
              <div className={cn("space-y-6", accordionColumnClassName)}>
                <div className="grid gap-8 grid-cols-2 md:grid-cols-3">
                  {footerLinks.map((section) => (
                    <div key={section.id}>
                      <h3 className="mb-4 text-sm font-semibold tracking-wide">
                        {section.title}
                      </h3>
                      <ul className="space-y-2.5 text-sm text-muted-foreground">
                        {section.items.map((item, idx) => (
                          <li key={idx}>
                            <Pressable
                              href={item.link}
                              className="transition-colors hover:text-foreground"
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

        {((paymentPlatforms && paymentPlatforms.length > 0) ||
          (socialLinks && socialLinks.length > 0)) && (
          <div
            className={cn(
              "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
              paymentSocialRowClassName,
            )}
          >
            <div className="space-y-4">
              {paymentPlatforms && paymentPlatforms.length > 0 && (
                <ul
                  className={cn(
                    "flex flex-wrap items-center gap-3",
                    paymentMethodsClassName,
                  )}
                >
                  {paymentPlatforms.map((platform, idx) => (
                    <li key={idx}>
                      <PaymentPlatformIcon platform={platform} size={26} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {socialLinks && socialLinks.length > 0 && (
              <ul className={cn("flex flex-wrap gap-3", socialLinksClassName)}>
                {socialLinks.map((social, idx) => (
                  <li key={idx}>
                    <SocialLinkIcon
                      href={social.href}
                      label={social.label}
                      iconNameOverride={social.iconNameOverride}
                      variant="outline"
                      size="icon"
                      asButton
                      className="rounded-full border shadow-sm transition-shadow hover:shadow-md"
                      iconSize={18}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div
          className={cn(
            "flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between",
            bottomClassName,
          )}
        >
          <div
            className={cn(
              "flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
              copyrightClassName,
            )}
          >
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
