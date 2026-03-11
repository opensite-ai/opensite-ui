"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { FooterLogo } from "../../ui/footer-logo";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { FooterSocialLink } from "./types";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "space-y-4",
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
  label: React.ReactNode;
  /**
   * Link type: "none" | "email" | "phone"
   */
  type?: "none" | "email" | "phone";
  /**
   * Link value (email address or phone number)
   */
  link?: string;
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
  socialLinks?: FooterSocialLink[];
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
  /** Section background variant */
  background?: SectionBackground;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern name */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
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
  /**
   * Additional CSS classes for the newsletter form
   */
  newsletterFormClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * Footer Newsletter Contact - A comprehensive footer with newsletter signup,
 * navigation links, contact details, and social media icons.
 *
 * Layout: Four-column grid with newsletter, link sections, and contact info.
 * Key features: Newsletter form, contact details with icons, social links.
 * Best for: E-commerce sites, business websites, service-based companies.
 *
 * The newsletter form is powered by `FormEngine` from `@page-speed/forms/integration`,
 * which handles validation, submission, error handling, and success states.
 *
 * @example
 * ```tsx
 * <FooterNewsletterContact
 *   newsletterTitle="Newsletter"
 *   newsletterDescription="Join our newsletter for exclusive deals."
 *   formEngineSetup={{
 *     formConfig: { endpoint: "/api/subscribe", format: "json" },
 *   }}
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
  sectionId = "footer-newsletter-contact",
  newsletterTitle,
  newsletterDescription,
  footerLinks,
  contactDetails,
  socialLinks,
  logo,
  copyright,
  className,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  optixFlowConfig,
  formEngineSetup,
  buttonAction,
  formSlot,
  newsletterFormClassName,
}: FooterNewsletterContactProps) {
  const linkSectionsContent = React.useMemo(() => {
    if (!footerLinks || footerLinks.length === 0) return null;

    return footerLinks.map((section, idx) => (
      <div key={idx}>
        <h2 className="mb-6 text-sm font-medium uppercase leading-tight opacity-70">
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
    ));
  }, [footerLinks]);

  const contactDetailsContent = React.useMemo(() => {
    if (!contactDetails || contactDetails.length === 0) return null;

    return contactDetails.map((item, idx) => (
      <li key={idx} className="flex items-start gap-3">
        <div className="flex items-center justify-center shrink-0 mt-1">
          <DynamicIcon name={item.icon} size={16} />
        </div>
        <div className="flex-1">
          <Pressable
            href={item.link}
            className="underline-offset-4 hover:underline"
          >
            {item.label}
          </Pressable>
        </div>
      </li>
    ));
  }, [contactDetails]);

  const socialLinksContent = React.useMemo(() => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((social, idx) => (
      <li key={idx}>
        <SocialLinkIcon
          href={social.href}
          label={social.label}
          iconNameOverride={social.iconNameOverride}
          variant="outline"
          size="icon"
          asButton
        />
      </li>
    ));
  }, [socialLinks]);

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
      <div className="space-y-10">
        <div className="grid grid-cols-1 gap-x-6 md:gap-x-8 lg:gap-x-12 xl:gap-x-16 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {formEngineSetup && (
            <div className="space-y-4 md:space-y-6 col-span-2 md:col-span-1">
              {newsletterTitle && (
                <h3 className="text-2xl md:text-3xl font-medium leading-none">
                  {newsletterTitle}
                </h3>
              )}
              {newsletterDescription && (
                <p className="font-light leading-normal">
                  {newsletterDescription}
                </p>
              )}
              {renderForm}
            </div>
          )}

          {linkSectionsContent}

          {(contactDetailsContent || socialLinksContent) && (
            <div className="col-span-2 md:col-span-1">
              <h2 className="mb-6 text-sm font-medium uppercase leading-tight opacity-70">
                Contact
              </h2>
              <div className="space-y-6">
                {contactDetailsContent && (
                  <ul className="space-y-3">{contactDetailsContent}</ul>
                )}
                {socialLinksContent && (
                  <ul className="flex flex-wrap gap-3">{socialLinksContent}</ul>
                )}
              </div>
            </div>
          )}
        </div>

        {logo && (
          <div>
            <div className="flex items-center justify-between gap-4 md:gap-12">
              <Separator className="flex-1" />
              <div className="basis-30 md:basis-40">
                <FooterLogo logo={logo} optixFlowConfig={optixFlowConfig} />
              </div>
              <Separator className="flex-1" />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 opacity-80 max-md:text-xs">
          <FooterCopyright copyright={copyright} />
          <BrandAttribution
            internalBrandSlug="open_site_ai"
            optionIndex={2}
            variant="span"
            linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
          />
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
    </Section>
  );
}
