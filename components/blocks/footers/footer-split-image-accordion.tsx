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
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig } from "../../../src/types/blocks";
import type { FooterSocialLink } from "./types";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "flex items-stretch w-full",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "",
};

const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
    columnSpan: 12,
  },
];

export interface FooterSplitImageAccordionLink {
  /**
   * Link text
   */
  text: string;
  /**
   * Link URL
   */
  link?: string;
}

export interface FooterSplitImageAccordionSection {
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
  items: FooterSplitImageAccordionLink[];
}

/**
 * Footer data configuration
 */
export interface FooterSplitImageAccordionData {
  /** Hero image configuration */
  image: {
    src: string;
    alt?: string;
  };
  /** Logo configuration with light/dark variants */
  logo?: {
    src: string;
    /** Logo link URL */
    url?: string;
    /** Brand title */
    alt?: string;
  };
  /** Footer heading */
  heading?: string;
  /** Brand description */
  description?: string;
}

export interface FooterSplitImageAccordionProps {
  /**
   * Newsletter title
   */
  newsletterTitle?: React.ReactNode;
  /**
   * Footer link sections
   */
  footerLinks?: FooterSplitImageAccordionSection[];
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
  submenuLinks?: FooterSplitImageAccordionLink[];
  /**
   * Footer data configuration
   */
  footerData?: FooterSplitImageAccordionData;
  /**
   * Brand/company name for the copyright notice
   */
  copyright?: string;
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
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the footer wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the grid layout
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the image column
   */
  imageColumnClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the content column
   */
  contentColumnClassName?: string;
  /**
   * Additional CSS classes for the newsletter section
   */
  newsletterSectionClassName?: string;
  /**
   * Additional CSS classes for the newsletter title
   */
  newsletterTitleClassName?: string;
  /**
   * Additional CSS classes for the newsletter form
   */
  newsletterFormClassName?: string;
  /**
   * Additional CSS classes for the social links
   */
  socialLinksClassName?: string;
  /**
   * Additional CSS classes for the brand section
   */
  brandSectionClassName?: string;
  /**
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
  /**
   * Additional CSS classes for the brand title
   */
  brandTitleClassName?: string;
  /**
   * Additional CSS classes for the brand description
   */
  brandDescriptionClassName?: string;
  /**
   * Additional CSS classes for the links grid section
   */
  linksGridClassName?: string;
  /**
   * Additional CSS classes for payment methods
   */
  paymentMethodsClassName?: string;
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
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
  /**
   * Submit button configuration
   */
  buttonAction?: ActionConfig;
  /**
   * Custom slot for the form (overrides form props)
   */
  formSlot?: React.ReactNode;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * Footer Split Image Accordion - A split-layout footer with large image,
 * newsletter signup, navigation links, and payment methods.
 *
 * Layout: Two-column split with image on left, content on right.
 * Key features: Large hero image, organized link sections, payment icons.
 * Best for: E-commerce sites, fashion brands, lifestyle businesses.
 *
 * The newsletter form is powered by `FormEngine` from `@page-speed/forms/integration`,
 * which handles validation, submission, error handling, and success states.
 *
 * @example
 * ```tsx
 * <FooterSplitImageAccordion
 *   newsletterTitle="Get updates and save 20%"
 *   formEngineSetup={{
 *     formConfig: { endpoint: "/api/subscribe", format: "json" },
 *   }}
 *   footerLinks={[
 *     { title: "Collections", id: "collections", items: [...] },
 *   ]}
 *   footerData={{
 *     image: { src: "/hero.jpg", alt: "Hero" },
 *     title: "Modern Fashion",
 *     description: "Quality clothing for everyone.",
 *   }}
 * />
 * ```
 */
export function FooterSplitImageAccordion({
  sectionId = "footer-split-image-accordion",
  newsletterTitle,
  footerLinks,
  socialLinks,
  paymentPlatforms,
  submenuLinks,
  footerData,
  copyright,
  background,
  containerClassName = "w-screen px-0 sm:px-0 lg:px-0 max-w-screen relative z-10",
  spacing = "none",
  pattern,
  patternOpacity,
  className,
  gridClassName,
  imageColumnClassName,
  imageClassName,
  contentColumnClassName,
  newsletterSectionClassName,
  newsletterTitleClassName,
  newsletterFormClassName,
  socialLinksClassName,
  brandSectionClassName,
  logoClassName,
  brandTitleClassName,
  brandDescriptionClassName,
  linksGridClassName,
  paymentMethodsClassName,
  bottomClassName,
  copyrightClassName,
  submenuLinksClassName,
  optixFlowConfig,
  formEngineSetup,
  buttonAction,
  formSlot,
}: FooterSplitImageAccordionProps) {
  const renderForm = React.useMemo(() => {
    if (formSlot) return formSlot;
    if (!formEngineSetup) return null;

    const defaultButtonAction: ActionConfig = {
      label: "",
      variant: "default",
      icon: <DynamicIcon name="lucide/arrow-right" size={16} />,
    };

    const action = buttonAction || defaultButtonAction;

    return (
      <FormEngine
        formEngineSetup={{
          ...formEngineSetup,
          formLayoutSettings: {
            ...formEngineSetup.formLayoutSettings,
            formLayout: "button-group",
            buttonGroupSetup: {
              ...formEngineSetup.formLayoutSettings?.buttonGroupSetup,
              size: "default",
              submitLabel: action.icon || action.label,
              submitVariant: action.variant || "default",
            },
          },
        }}
        defaultFields={DEFAULT_FORM_FIELDS}
        defaultStyleRules={{
          ...DEFAULT_STYLE_RULES,
          formContainer: cn(
            DEFAULT_STYLE_RULES.formContainer,
            newsletterFormClassName,
          ),
        }}
      />
    );
  }, [formSlot, formEngineSetup, buttonAction, newsletterFormClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className={cn("grid grid-cols-1 lg:grid-cols-2", gridClassName)}>
        {footerData?.image?.src && (
          <div
            className={cn(
              "overflow-hidden max-lg:aspect-square",
              imageColumnClassName,
            )}
          >
            <Img
              src={footerData.image.src}
              alt={footerData.image.alt}
              className={cn("h-full w-full object-cover", imageClassName)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}

        <div
          className={cn(
            "flex flex-col items-start justify-start md:justify-between",
            "p-6 md:p-12 lg:p-18",
            "space-y-16",
            contentColumnClassName,
          )}
        >
          <div className="space-y-16">
            <div className="space-y-12">
              <div className={cn("space-y-6", newsletterSectionClassName)}>
                {newsletterTitle && (
                  <h3
                    className={cn(
                      "text-2xl font-semibold lg:text-3xl",
                      newsletterTitleClassName,
                    )}
                  >
                    {newsletterTitle}
                  </h3>
                )}
                {renderForm}
              </div>
              {socialLinks && socialLinks.length > 0 && (
                <ul
                  className={cn("flex flex-wrap gap-4", socialLinksClassName)}
                >
                  {socialLinks.map((social, idx) => (
                    <li key={idx}>
                      <SocialLinkIcon
                        href={social.href}
                        label={social.label}
                        iconNameOverride={social.iconNameOverride}
                        variant="outline"
                        size="icon"
                        asButton
                        className="rounded-full"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {footerData && (
              <div className={cn("space-y-6", brandSectionClassName)}>
                {footerData.logo && (
                  <FooterLogo
                    logo={{
                      ...footerData.logo,
                      url: footerData.logo.url || "/",
                    }}
                    logoClassName={cn("inline-block max-w-60", logoClassName)}
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
                {footerData.heading && (
                  <h4
                    className={cn(
                      "text-xl font-semibold text-pretty",
                      brandTitleClassName,
                    )}
                  >
                    {footerData.heading}
                  </h4>
                )}
                {footerData.description && (
                  <p
                    className={cn(
                      "opacity-80 text-balance",
                      brandDescriptionClassName,
                    )}
                  >
                    {footerData.description}
                  </p>
                )}
              </div>
            )}

            {footerLinks && footerLinks.length > 0 && (
              <div
                className={cn(
                  "grid gap-8 grid-cols-2 lg:grid-cols-3",
                  linksGridClassName,
                )}
              >
                {footerLinks.map((section) => (
                  <div key={section.id}>
                    <h3 className="mb-4 text-base font-bold">
                      {section.title}
                    </h3>
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
            )}

            {paymentPlatforms && paymentPlatforms.length > 0 && (
              <ul
                className={cn(
                  "flex flex-wrap items-center gap-3",
                  paymentMethodsClassName,
                )}
              >
                {paymentPlatforms.map((platform, idx) => (
                  <li key={idx}>
                    <PaymentPlatformIcon platform={platform} size={30} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={cn(
              "flex flex-wrap items-center justify-between gap-4",
              bottomClassName,
            )}
          >
            <div
              className={cn(
                "flex flex-wrap items-center gap-4 text-sm opacity-80",
                copyrightClassName,
              )}
            >
              <FooterCopyright copyright={copyright} />
              <BrandAttribution
                internalBrandSlug="open_site_ai"
                optionIndex={8}
                variant="span"
                linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
              />
            </div>
            {submenuLinks && submenuLinks.length > 0 && (
              <ul
                className={cn(
                  "flex flex-wrap gap-x-6 gap-y-2",
                  submenuLinksClassName,
                )}
              >
                {submenuLinks.map((link, idx) => (
                  <li key={idx}>
                    <Pressable
                      href={link.link}
                      className="text-sm font-light hover:underline"
                    >
                      {link.text}
                    </Pressable>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
