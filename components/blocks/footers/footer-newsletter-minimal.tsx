"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { Pressable } from "../../../lib/Pressable";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { OptixFlowConfig, NavLinkItem } from "../../../src/types/blocks";
import type { PatternName } from "../../ui/pattern-background";
import type { FooterSocialLink } from "./types";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "flex w-full items-end border-b border-b-foreground/10",
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

/**
 * Footer link configuration
 */
export interface FooterNewsletterMinimalFooterLink {
  /** Link label */
  label: string;
  /** Link URL */
  href: string;
}

/**
 * Props for the FooterNewsletterMinimal component
 */
export interface FooterNewsletterMinimalProps {
  /** Main heading text */
  heading?: React.ReactNode;
  /** Support label text */
  supportLabel?: React.ReactNode;
  /** Support email */
  supportEmail?: string;
  /** Navigation links */
  navLinks?: NavLinkItem[];
  /** Social links */
  socialLinks?: FooterSocialLink[];
  /** Footer links (privacy, terms) */
  footerLinks?: FooterNewsletterMinimalFooterLink[];
  /** Newsletter label */
  newsletterLabel?: React.ReactNode;
  /** Brand text displayed at the bottom */
  brandText?: React.ReactNode;
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Location text */
  location?: React.ReactNode;
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
  /** Additional CSS classes for the top section */
  topSectionClassName?: string;
  /** Additional CSS classes for the heading */
  headingClassName?: string;
  /** Additional CSS classes for the support section */
  supportClassName?: string;
  /** Additional CSS classes for the nav/social grid */
  navGridClassName?: string;
  /** Additional CSS classes for the nav links list */
  navLinksClassName?: string;
  /** Additional CSS classes for nav link items */
  navLinkClassName?: string;
  /** Additional CSS classes for the social links list */
  socialLinksClassName?: string;
  /** Additional CSS classes for social link items */
  socialLinkClassName?: string;
  /** Additional CSS classes for the newsletter section */
  newsletterSectionClassName?: string;
  /** Additional CSS classes for the newsletter heading styles */
  newsletterLabelClassName?: string;
  /** Additional CSS classes for the newsletter form */
  newsletterFormClassName?: string;
  /** Additional CSS classes for the location/footer links section */
  bottomGridClassName?: string;
  /** Additional CSS classes for the location text */
  locationClassName?: string;
  /** Additional CSS classes for the footer links list */
  footerLinksClassName?: string;
  /** Additional CSS classes for footer link items */
  footerLinkClassName?: string;
  /** Additional CSS classes for the brand section */
  brandSectionClassName?: string;
  /** Additional CSS classes for the brand text */
  brandTextClassName?: string;
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
  /** Optional Optix Flow configuration for image optimization */
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
 * FooterNewsletterMinimal - A dark-themed minimal footer with newsletter and animated logo.
 *
 * Features a clean layout with main heading, support email, navigation columns,
 * newsletter signup form, and a large animated brand logo. Ideal for modern SaaS products,
 * creative agencies, and businesses that want a sophisticated, dark-themed footer
 * with strong visual branding.
 *
 * The newsletter form is powered by `FormEngine` from `@page-speed/forms/integration`,
 * which handles validation, submission, error handling, and success states.
 *
 * @example
 * ```tsx
 * <FooterNewsletterMinimal
 *   heading="Let's Build Together"
 *   formEngineSetup={{
 *     formConfig: { endpoint: "/api/subscribe", format: "json" },
 *   }}
 *   navLinks={[
 *     { label: "About", href: "/about" },
 *   ]}
 * />
 * ```
 */
export function FooterNewsletterMinimal({
  sectionId = "footer-newsletter-minimal",
  heading,
  supportLabel,
  supportEmail,
  navLinks,
  socialLinks,
  footerLinks,
  newsletterLabel,
  brandText,
  copyright,
  location,
  className,
  contentClassName,
  topSectionClassName,
  headingClassName,
  supportClassName,
  navGridClassName,
  navLinksClassName,
  navLinkClassName,
  socialLinksClassName,
  socialLinkClassName,
  newsletterSectionClassName,
  newsletterLabelClassName,
  newsletterFormClassName,
  bottomGridClassName,
  locationClassName,
  footerLinksClassName,
  footerLinkClassName,
  brandSectionClassName,
  brandTextClassName,
  copyrightClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  formEngineSetup,
  buttonAction,
  formSlot,
}: FooterNewsletterMinimalProps): React.JSX.Element {
  const navLinksContent = React.useMemo(() => {
    if (!navLinks || navLinks.length === 0) return null;

    return navLinks.map((item, idx) => (
      <li key={idx}>
        <Pressable
          href={item.href}
          className={cn("tracking-tight hover:opacity-70", navLinkClassName)}
        >
          {item.label}
        </Pressable>
      </li>
    ));
  }, [navLinks, navLinkClassName]);

  const socialLinksContent = React.useMemo(() => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((item, idx) => (
      <li key={idx}>
        <SocialLinkIcon
          href={item.href}
          label={item.label}
          iconNameOverride={item.iconNameOverride}
          iconSize={24}
          className={cn(
            "group flex items-center gap-1 tracking-tight hover:opacity-70",
            socialLinkClassName,
          )}
        />
      </li>
    ));
  }, [socialLinks, socialLinkClassName]);

  const footerLinksContent = React.useMemo(() => {
    if (!footerLinks || footerLinks.length === 0) return null;

    return footerLinks.map((item) => (
      <li key={item.label}>
        <Pressable
          href={item.href}
          className={cn(
            "group flex items-center gap-1 tracking-tight hover:opacity-70",
            footerLinkClassName,
          )}
        >
          {item.label}
        </Pressable>
      </li>
    ));
  }, [footerLinks, footerLinkClassName]);

  const renderForm = React.useMemo(() => {
    if (formSlot) return formSlot;
    if (!formEngineSetup) return null;

    const defaultButtonAction: ActionConfig = {
      label: "",
      variant: "default",
      icon: <DynamicIcon name="lucide/arrow-right" size={20} />,
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
      id="footer-newsletter-minimal"
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className={cn(contentClassName)}>
        <div
          className={cn(
            "flex flex-col justify-between gap-15 lg:flex-row",
            topSectionClassName,
          )}
        >
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              {heading && (
                <h2
                  className={cn(
                    "relative text-4xl font-semibold tracking-tight lg:text-5xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              )}

              {location && (
                <div
                  className={cn(
                    "font-semibold text-lg opacity-75",
                    locationClassName,
                  )}
                >
                  {location}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {(supportLabel || supportEmail) && (
                <div
                  className={cn(
                    "space-y-1 text-sm tracking-tight lg:text-base",
                    supportClassName,
                  )}
                >
                  {supportLabel && (
                    <p className="font-light opacity-75">{supportLabel}</p>
                  )}
                  {supportEmail && (
                    <Pressable className="font-semibold" href={supportEmail}>
                      {supportEmail}
                    </Pressable>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            className={cn(
              "grid w-full max-w-xs grid-cols-2 gap-10 text-sm font-light lg:text-base",
              navGridClassName,
            )}
          >
            <ul className={cn("space-y-1", navLinksClassName)}>
              {navLinksContent}
            </ul>
            <ul className={cn("space-y-4", socialLinksClassName)}>
              {socialLinksContent}
            </ul>
          </div>
        </div>
        <div
          className={cn(
            "mt-20 flex flex-col justify-between gap-15 lg:flex-row",
            newsletterSectionClassName,
          )}
        >
          {formEngineSetup && (
            <div className="flex w-full max-w-md flex-col gap-10">
              <div className="space-y-4">
                {newsletterLabel && (
                  <p
                    className={cn(
                      "text-xl font-light tracking-tight",
                      newsletterLabelClassName,
                    )}
                  >
                    {newsletterLabel}
                  </p>
                )}
                {renderForm}
              </div>
            </div>
          )}
        </div>
        {brandText && (
          <div className={cn("mt-20 w-full lg:mt-32", brandSectionClassName)}>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span
                className={cn(
                  "text-6xl font-bold tracking-tighter md:text-8xl lg:text-9xl",
                  brandTextClassName,
                )}
              >
                {brandText}
              </span>
            </motion.div>
          </div>
        )}

        <div
          className={cn(
            "flex flex-col items-center space-y-6",
            brandText ? "mb-24" : "mt-8",
            copyrightClassName,
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center",
              bottomGridClassName,
            )}
          >
            <div
              className={cn(
                "flex gap-4 md:gap-6 text-sm font-light lg:text-base",
                "text-center items-center justify-center flex-wrap",
                footerLinksClassName,
              )}
            >
              {footerLinksContent}
            </div>
          </div>
          <div
            className={cn(
              "mt-8 text-center text-sm opacity-50",
              copyrightClassName,
            )}
          >
            <FooterCopyright copyright={copyright} />
            <BrandAttribution
              internalBrandSlug="open_site_ai"
              optionIndex={4}
              variant="div"
              containerClassName="mt-2"
              linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
