"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { FooterSocialLink } from "./types";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";
import { Img } from "@page-speed/img";

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
    placeholder: "Email Address",
    required: true,
    columnSpan: 12,
  },
];

export interface FooterAccordionSocialNavLink {
  /**
   * Link text
   */
  text: string;
  /**
   * Link URL
   */
  href: string;
  /**
   * Legacy alias for `href`. Generated shared-layout payloads (octane
   * `footer_section_items`) shipped section items keyed `{text, link}`;
   * without this fallback those footers render dead `<span>`s.
   */
  link?: string;
}

export interface FooterAccordionSocialSection {
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
  items: FooterAccordionSocialNavLink[];
}

export interface FooterAccordionSocialProps {
  /**
   * Newsletter title
   */
  newsletterTitle?: string;
  /**
   * Newsletter description
   */
  newsletterDescription?: string;
  /**
   * Footer link sections
   */
  footerLinks?: FooterAccordionSocialSection[];
  /**
   * Social media links - only href is required, platform icon is auto-detected
   */
  socialLinks?: FooterSocialLink[];
  /**
   * Logo configuration
   */
  logo?: {
    src: string;
    /** Logo link URL */
    url?: string;
    /** Brand title */
    alt?: string;
  };
  /**
   * Brand/company name for the copyright notice
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
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * Footer Accordion Social - A footer with newsletter, navigation links,
 * and social media icons.
 *
 * Layout: Newsletter section at top, links in grid, social icons.
 * Key features: Organized link sections, newsletter signup, social icons.
 * Best for: E-commerce sites, retail brands, content-heavy websites.
 *
 * The newsletter form is powered by `FormEngine` from `@page-speed/forms/integration`,
 * which handles validation, submission, error handling, and success states.
 *
 * @example
 * ```tsx
 * <FooterAccordionSocial
 *   newsletterTitle="Stay in the loop"
 *   newsletterDescription="Get updates on new products and offers."
 *   formEngineSetup={{
 *     formConfig: { endpoint: "/api/subscribe", format: "json" },
 *   }}
 *   footerLinks={[
 *     { title: "Shop", id: "shop", items: [...] },
 *   ]}
 * />
 * ```
 */
export function FooterAccordionSocial({
  sectionId = "footer-accordion-social",
  newsletterTitle,
  newsletterDescription,
  footerLinks,
  socialLinks,
  logo,
  copyright,
  className,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  formEngineSetup,
}: FooterAccordionSocialProps) {
  const renderForm = React.useMemo(() => {
    if (!formEngineSetup) return null;

    const action: ActionConfig = {
      label: "",
      variant: "default",
      icon: <DynamicIcon name="lucide/arrow-right" size={16} />,
    };

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
          formContainer: cn(DEFAULT_STYLE_RULES.formContainer),
        }}
      />
    );
  }, [formEngineSetup]);

  return (
    <Section
      id="footer-accordion-social"
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            {logo && (
              <Pressable href={logo.url || "/"} className="block mb-8 md:mb-12">
                <Img
                  src={logo.src}
                  className="h-16 object-contain w-auto max-w-full"
                  optixFlowConfig={optixFlowConfig}
                />
              </Pressable>
            )}
            {formEngineSetup && (
              <div className="space-y-2">
                {newsletterTitle || newsletterDescription ? (
                  <div className="space-y-2">
                    {newsletterTitle ? (
                      <h3 className="text-xl font-semibold">
                        {newsletterTitle}
                      </h3>
                    ) : null}
                    {newsletterDescription ? (
                      <p className="opacity-70">{newsletterDescription}</p>
                    ) : null}
                  </div>
                ) : null}
                {renderForm}
              </div>
            )}
          </div>

          {footerLinks && footerLinks.length > 0 && (
            <div className="grid grid-cols-2 gap-x-16 gap-y-8 lg:grid-cols-3">
              {footerLinks.map((section) => (
                <div key={section.id}>
                  <h3 className="mb-4 text-lg font-bold">{section.title}</h3>
                  <ul className="space-y-2 text-sm opacity-80">
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        <Pressable
                          href={item.href ?? item.link}
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
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t pt-8">
          <div className="flex flex-col gap-2 text-sm opacity-80 md:flex-row md:items-center md:gap-4">
            <FooterCopyright copyright={copyright} className="opacity-50" />
            <BrandAttribution
              internalBrandSlug="open_site_ai"
              optionIndex={1}
              variant="span"
              linkClassName="opacity-50 hover:opacity-100"
            />
          </div>
          {socialLinks && socialLinks.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {socialLinks.map((social, idx) => (
                <li key={idx}>
                  <SocialLinkIcon
                    {...social}
                    variant="ghost"
                    size="icon-lg"
                    asButton
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
