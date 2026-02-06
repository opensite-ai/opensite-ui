"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "../../ui/form-inputs";
import { Pressable } from "../../../lib/Pressable";
import { FooterLogo } from "../../ui/footer-logo";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { FooterSocialLink } from "./types";

export interface FooterAccordionSocialNavLink {
  /**
   * Link text
   */
  text: string;
  /**
   * Link URL
   */
  href: string;
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
    light: string;
    dark: string;
    url: string;
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
   * Optional form submission configuration for newsletter signup.
   * Requires `token` to render the newsletter UI.
   */
  formConfig?: PageSpeedFormConfig & { token: string };
  /**
   * Optional custom submission handler for newsletter signup.
   */
  onSubmit?: (email: string) => void | Promise<void>;
  /**
   * Optional success callback invoked after successful submission.
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Optional error callback invoked if submission fails.
   */
  onError?: (error: Error) => void;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
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
}

/**
 * Footer Accordion Social - A footer with newsletter, navigation links,
 * and social media icons.
 *
 * Layout: Newsletter section at top, links in grid, social icons.
 * Key features: Organized link sections, newsletter signup, social icons.
 * Best for: E-commerce sites, retail brands, content-heavy websites.
 *
 * @example
 * ```tsx
 * <FooterAccordionSocial
 *   newsletterTitle="Stay in the loop"
 *   newsletterDescription="Get updates on new products and offers."
 *   footerLinks={[
 *     { title: "Shop", id: "shop", items: [...] },
 *   ]}
 * />
 * ```
 */
export function FooterAccordionSocial({
  newsletterTitle,
  newsletterDescription,
  footerLinks,
  socialLinks,
  logo,
  copyright,
  className,
  optixFlowConfig,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
}: FooterAccordionSocialProps) {
  const form = useForm<{ email: string }>({
    initialValues: {
      email: "",
    },
    validationSchema: {
      email: (value) => {
        if (!value) return "Email is required";
        if (!isValidEmail(value)) return "Please enter a valid email address";
        return undefined;
      },
    },
    onSubmit: async (values, helpers) => {
      const shouldAutoSubmit = Boolean(formConfig?.endpoint);

      if (!shouldAutoSubmit && !onSubmit) {
        return;
      }

      try {
        let result: unknown;

        if (shouldAutoSubmit) {
          result = await submitPageSpeedForm(values, formConfig);
        }

        if (onSubmit) {
          await onSubmit(values.email);
        }

        if (shouldAutoSubmit || onSubmit) {
          if (formConfig?.resetOnSuccess !== false) {
            helpers.resetForm();
          }
          onSuccess?.(result);
        }
      } catch (error) {
        if (error instanceof PageSpeedFormSubmissionError && error.formErrors) {
          helpers.setErrors(error.formErrors);
        }
        onError?.(error as Error);
        throw error;
      }
    },
  });

  const formMethod =
    formConfig?.method?.toLowerCase() === "get" ? "get" : "post";

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            {logo && (
              <FooterLogo
                logo={logo}
                logoClassName="inline-block max-w-48"
                optixFlowConfig={optixFlowConfig}
              />
            )}
            {formConfig?.token && (
              <>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">{newsletterTitle}</h3>
                  <p className="opacity-80">{newsletterDescription}</p>
                </div>
                <Form
                  form={form}
                  action={formConfig?.endpoint}
                  method={formMethod}
                  className="flex gap-2"
                >
                  <Field name="email" className="flex-1">
                    {({ field, meta }) => (
                      <TextInput
                        {...field}
                        type="email"
                        placeholder="Email Address"
                        error={meta.touched && !!meta.error}
                        className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label="Email Address"
                      />
                    )}
                  </Field>
                  <Pressable
                    componentType="button"
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    asButton={false}
                    disabled={form.isSubmitting}
                  >
                    <DynamicIcon name="lucide/arrow-right" size={16} />
                  </Pressable>
                </Form>
              </>
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
                          href={item.href}
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
            <FooterCopyright copyright={copyright} />
            <BrandAttribution
              internalBrandSlug="open_site_ai"
              optionIndex={1}
              variant="span"
              linkClassName="hover:opacity-100"
            />
          </div>
          {socialLinks && socialLinks.length > 0 && (
            <ul className="flex flex-wrap gap-4">
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
      </div>
    </Section>
  );
}
