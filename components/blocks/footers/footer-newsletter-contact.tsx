"use client";

import * as React from "react";
import { useMemo } from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

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
  /** Section background variant */
  background?: SectionBackground;
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
   * Optional form submission configuration for newsletter signup.
   */
  formConfig?: PageSpeedFormConfig;
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
}

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
  newsletterTitle,
  newsletterDescription,
  newsletterPlaceholder,
  newsletterButtonText,
  footerLinks,
  contactDetails,
  socialLinks,
  logo,
  copyright,
  className,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: FooterNewsletterContactProps) {
  const linkSectionsContent = useMemo(() => {
    if (!footerLinks || footerLinks.length === 0) return null;

    return footerLinks.map((section, idx) => (
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
    ));
  }, [footerLinks]);

  const contactDetailsContent = useMemo(() => {
    if (!contactDetails || contactDetails.length === 0) return null;

    return contactDetails.map((item, idx) => (
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
    ));
  }, [contactDetails]);

  const socialLinksContent = useMemo(() => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((social, idx) => (
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
    ));
  }, [socialLinks]);
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
        if (
          error instanceof PageSpeedFormSubmissionError &&
          error.formErrors
        ) {
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
      className={cn(className)}
    >
      <div className="space-y-10">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2 xl:grid-cols-4">
          {(newsletterTitle || newsletterDescription || newsletterButtonText) && (
            <div className="space-y-6">
              {newsletterTitle && (
                <h3 className="text-3xl font-medium font-serif leading-none">
                  {newsletterTitle}
                </h3>
              )}
              {newsletterDescription && (
                <p className="font-light leading-normal">{newsletterDescription}</p>
              )}
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              className="space-y-4"
            >
              <Field name="email">
                {({ field, meta }) => (
                  <TextInput
                    {...field}
                    type="email"
                    placeholder={newsletterPlaceholder}
                    error={meta.touched && !!meta.error}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={newsletterPlaceholder || "Email address"}
                  />
                )}
              </Field>
              <Pressable
                componentType="button"
                type="submit"
                variant="default"
                asButton
                className="w-full"
                disabled={form.isSubmitting}
              >
                {newsletterButtonText}
              </Pressable>
            </Form>
          </div>
          )}

          {linkSectionsContent}

          {(contactDetailsContent || socialLinksContent) && (
            <div>
              <h2 className="mb-6 text-sm font-medium uppercase leading-tight text-muted-foreground">
                Contact
              </h2>
              <div className="space-y-6">
                {contactDetailsContent && (
                  <ul className="space-y-3">
                    {contactDetailsContent}
                  </ul>
                )}
                {socialLinksContent && (
                  <ul className="flex flex-wrap gap-3">
                    {socialLinksContent}
                  </ul>
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
                <Pressable href={logo.url}>
                  {logo.light && (
                    <Img
                      src={logo.light}
                      alt="Logo"
                      className="block dark:hidden"
                      optixFlowConfig={optixFlowConfig}
                    />
                  )}
                  {logo.dark && (
                    <Img
                      src={logo.dark}
                      alt="Logo"
                      className="hidden dark:block"
                      optixFlowConfig={optixFlowConfig}
                    />
                  )}
                </Pressable>
              </div>
              <Separator className="flex-1" />
            </div>
          </div>
        )}

        {copyright && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <p className="text-muted-foreground max-md:text-xs">{copyright}</p>
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
        )}
      </div>
    </Section>
  );
}
