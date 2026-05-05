"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types/blocks";
import type { PatternName } from "../../ui/pattern-background";
import type { FooterSocialLink } from "./types";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";
import { DynamicIcon } from "@/src";
import { Img } from "@page-speed/img";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "flex justify-center md:justify-end w-full",
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

/**
 * Logo configuration for the footer
 */
export interface FooterSocialNewsletterLogo {
  /** Logo link URL */
  url: string;
  /** Logo image source */
  src: string;
  /** Logo alt text */
  alt: string;
  /** Logo title/brand name */
  title: string;
}

/**
 * Navigation link configuration
 */
export interface FooterSocialNewsletterLink {
  /** Link name/label */
  name: string;
  /** Link URL */
  href: string;
}

/**
 * Navigation section configuration
 */
export interface FooterSocialNewsletterSection {
  /** Section title */
  title: string;
  /** Links in this section */
  links: FooterSocialNewsletterLink[];
}

/**
 * Props for the FooterSocialNewsletter component
 */
export interface FooterSocialNewsletterProps {
  /**
   * Logo configuration
   */
  logo?: {
    src: string;
    /** Logo link URL */
    url?: string;
    /** Brand title */
    alt?: string;
    /** img tag class name */
    className?: string;
  };
  /** Navigation sections */
  sections?: FooterSocialNewsletterSection[];
  /** Social media links */
  socialLinks?: FooterSocialLink[];
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
  /** Additional CSS classes for the logo wrapper */
  logoWrapperClassName?: string;
  /** Additional CSS classes for the main grid */
  gridClassName?: string;
  /** Additional CSS classes for navigation sections */
  navSectionClassName?: string;
  /** Additional CSS classes for navigation section titles */
  navTitleClassName?: string;
  /** Additional CSS classes for navigation link lists */
  navLinksClassName?: string;
  /** Additional CSS classes for navigation link items */
  navLinkClassName?: string;
  /** Additional CSS classes for the social/newsletter column */
  socialColumnClassName?: string;
  /** Additional CSS classes for the social links list */
  socialLinksClassName?: string;
  /** Additional CSS classes for social link items */
  socialLinkClassName?: string;
  /** Additional CSS classes for the privacy text */
  privacyClassName?: string;
  /** Additional CSS classes for the bottom section */
  bottomClassName?: string;
  /** Additional CSS classes for the copyright section */
  copyrightClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
}

/**
 * FooterSocialNewsletter - A footer with social icons, navigation links, and newsletter signup.
 *
 * Features logo with social icons below, multi-column navigation grid,
 * and a newsletter subscription form in the bottom bar. Ideal for community-focused products,
 * SaaS platforms, and businesses that prioritize social engagement and email marketing.
 */
export function FooterSocialNewsletter({
  logo,
  sections,
  socialLinks,
  copyright,
  className,
  contentClassName,
  logoWrapperClassName,
  gridClassName,
  navSectionClassName,
  navTitleClassName,
  navLinksClassName,
  navLinkClassName,
  socialColumnClassName,
  socialLinksClassName,
  socialLinkClassName,
  formEngineSetup,
  bottomClassName,
  copyrightClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-16 md:py-32",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterSocialNewsletterProps): React.JSX.Element {
  const renderForm = React.useMemo(() => {
    if (!formEngineSetup) return null;

    const action: ActionConfig = {
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
      id="footer-social-newsletter"
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className={cn(contentClassName)}>
        <footer>
          {/* Logo and Social Icons Section */}
          <div className="mb-20">
            {logo && (
              <Pressable
                href={logo.url || "/"}
                className={cn("block mb-8 md:mb-12", logoWrapperClassName)}
              >
                <Img
                  src={logo.src}
                  className={cn(
                    "h-16 object-contain w-auto max-w-full",
                    logo.className,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
              </Pressable>
            )}

            {/* Social icons directly below logo */}
            {socialLinks && socialLinks.length > 0 && (
              <div className={cn("mt-6", socialColumnClassName)}>
                <ul
                  className={cn(
                    "flex items-center gap-4",
                    socialLinksClassName,
                  )}
                >
                  {socialLinks.map((social, idx) => (
                    <li key={idx}>
                      <SocialLinkIcon
                        size="icon-lg"
                        variant="outline"
                        {...social}
                        className={cn(socialLinkClassName)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation Grid - 4 columns on desktop, 2 on mobile */}
          {sections && sections.length > 0 && (
            <div
              className={cn(
                "space-y-12 space-x-4 md:space-y-6 md:space-x-6 grid grid-cols-2 lg:grid-cols-4",
                gridClassName,
              )}
            >
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className={cn(navSectionClassName)}>
                  <h3 className={cn("mb-4 font-bold", navTitleClassName)}>
                    {section.title}
                  </h3>
                  <ul className={cn("space-y-4", navLinksClassName)}>
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className={cn("text-sm font-medium", navLinkClassName)}
                      >
                        <Pressable href={link.href}>{link.name}</Pressable>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Bar - Copyright left, Newsletter right */}
          <div
            className={cn(
              "gap-14 md:gap-4 mt-8 md:mt-16 flex flex-col-reverse border-t-0 md:border-t pt-4 md:pt-10 md:flex-row md:items-start md:justify-between w-full",
              bottomClassName,
            )}
          >
            {/* Copyright and Attribution - Left side */}
            <div
              className={cn(
                "flex shrink-0 w-full md:w-fit flex-col gap-2 text-sm",
                "font-medium opacity-70 md:flex-row md:items-center md:gap-4",
                "text-center md:text-left",
                copyrightClassName,
              )}
            >
              <FooterCopyright copyright={copyright} />
              <BrandAttribution
                internalBrandSlug="open_site_ai"
                optionIndex={7}
                variant="span"
                linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
              />
            </div>

            {renderForm}
          </div>
        </footer>
      </div>
    </Section>
  );
}
