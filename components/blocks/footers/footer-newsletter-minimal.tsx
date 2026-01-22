"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "../../ui/form-inputs";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { OptixFlowConfig, NavLinkItem } from "../../../src/types/blocks";
import type { PatternName } from "../../ui/pattern-background";

/**
 * Social link configuration
 */
export interface FooterNewsletterMinimalSocialLink {
  /** Link label */
  label: string;
  /** Link URL */
  href: string;
}

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
  socialLinks?: FooterNewsletterMinimalSocialLink[];
  /** Footer links (privacy, terms) */
  footerLinks?: FooterNewsletterMinimalFooterLink[];
  /** Newsletter label */
  newsletterLabel?: React.ReactNode;
  /** Newsletter placeholder */
  newsletterPlaceholder?: string;
  /** Brand text displayed at the bottom */
  brandText?: React.ReactNode;
  /** Copyright text */
  copyright?: React.ReactNode;
  /** Attribution text */
  attributionText?: React.ReactNode;
  /** Attribution link URL */
  attributionHref?: string;
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
  /** Additional CSS classes for the newsletter form */
  newsletterFormClassName?: string;
  /** Additional CSS classes for the newsletter input */
  newsletterInputClassName?: string;
  /** Additional CSS classes for the newsletter submit button */
  newsletterButtonClassName?: string;
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
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /**
   * Optional form submission configuration.
   *
   * **Universal Usage**: Works with ANY REST API endpoint. Simply provide an `endpoint` URL
   * and the form will submit to it in JSON format.
   *
   * @example
   * // Works with any API
   * formConfig={{ endpoint: "https://api.mysite.com/subscribe", format: "json" }}
   *
   * @example
   * // With custom headers (e.g., authentication)
   * formConfig={{
   *   endpoint: "/api/newsletter",
   *   headers: { "Authorization": "Bearer token123" }
   * }}
   *
   * **Note**: The `apiKey`, `contactCategoryToken`, and other platform-specific fields
   * are OPTIONAL and only needed when integrating with DashTrack's Rails backend.
   * For generic REST APIs, just use `endpoint`, `method`, `format`, and `headers`.
   *
   * See `FORMS_INTEGRATION_GUIDE.md` for complete examples with Next.js, React, and more.
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Optional custom submission handler for maximum flexibility.
   *
   * Use this when you need complete control over the submission logic,
   * such as custom API calls, analytics tracking, or multi-step workflows.
   *
   * Can be used alone or in combination with `formConfig` for hybrid approaches.
   *
   * @example
   * onSubmit={async (email) => {
   *   await fetch("/api/subscribe", {
   *     method: "POST",
   *     body: JSON.stringify({ email, source: "footer" })
   *   });
   * }}
   */
  onSubmit?: (email: string) => void | Promise<void>;
  /**
   * Optional success callback invoked after successful submission.
   *
   * Called after `formConfig` submission and/or `onSubmit` completes successfully.
   * Use for showing success messages, redirecting, analytics tracking, etc.
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Optional error callback invoked if submission fails.
   *
   * Receives the error object for custom error handling, logging, or user notifications.
   */
  onError?: (error: Error) => void;
  /** Optional Optix Flow configuration for image optimization */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * FooterNewsletterMinimal - A dark-themed minimal footer with newsletter and animated logo.
 *
 * Features a clean layout with main heading, support email, navigation columns,
 * newsletter signup form, and a large animated brand logo. Ideal for modern SaaS products,
 * creative agencies, and businesses that want a sophisticated, dark-themed footer
 * with strong visual branding.
 */
export function FooterNewsletterMinimal({
  heading,
  supportLabel,
  supportEmail,
  navLinks,
  socialLinks,
  footerLinks,
  newsletterLabel,
  newsletterPlaceholder = "Email*",
  brandText,
  copyright,
  attributionText,
  attributionHref = "https://opensite.ai",
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
  newsletterFormClassName,
  newsletterInputClassName,
  newsletterButtonClassName,
  bottomGridClassName,
  locationClassName,
  footerLinksClassName,
  footerLinkClassName,
  brandSectionClassName,
  brandTextClassName,
  copyrightClassName,
  background = "dark",
  spacing = "lg",
  pattern,
  patternOpacity,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: FooterNewsletterMinimalProps): React.JSX.Element {
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
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright ?? `© ${currentYear} Opensite AI. All rights reserved.`;

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("dark", className)}
    >
      <div className={cn(contentClassName)}>
        <div className={cn("flex flex-col justify-between gap-15 lg:flex-row", topSectionClassName)}>
          <div className="flex flex-col gap-10">
            <p className={cn("relative text-4xl font-medium tracking-tight lg:text-5xl", headingClassName)}>
              {heading}
            </p>
            <div className={cn("space-y-1 text-sm font-light tracking-tight lg:text-base", supportClassName)}>
              <p>{supportLabel}</p>
              <Pressable href={`mailto:${supportEmail}`}>
                {supportEmail}
              </Pressable>
            </div>
          </div>
          <div className={cn("grid w-full max-w-xs grid-cols-2 gap-10 text-sm font-light lg:text-base", navGridClassName)}>
            <ul className={cn("space-y-1", navLinksClassName)}>
              {navLinks?.map((item, idx) => (
                <li key={idx}>
                  <Pressable
                    href={item.href}
                    className={cn("tracking-tight text-foreground hover:text-foreground/30", navLinkClassName)}
                  >
                    {item.label}
                  </Pressable>
                </li>
              ))}
            </ul>
            <ul className={cn("space-y-1", socialLinksClassName)}>
              {socialLinks?.map((item) => (
                <li key={item.label}>
                  <Pressable
                    href={item.href}
                    className={cn("group flex items-center gap-1 tracking-tight text-foreground hover:text-foreground/30", socialLinkClassName)}
                  >
                    {item.label}{" "}
                    <DynamicIcon
                      name="lucide/arrow-up-right"
                      size={14}
                      className="text-foreground group-hover:text-muted-foreground/50"
                    />
                  </Pressable>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={cn("mt-20 flex flex-col justify-between gap-15 lg:flex-row", newsletterSectionClassName)}>
          <div className="flex w-full max-w-md flex-col gap-10">
            <div className="space-y-1 text-sm font-light tracking-tight lg:text-base">
              <p>{newsletterLabel}</p>
              <Form
                form={form}
                action={formConfig?.endpoint}
                method={formMethod}
                className={cn("flex w-full items-end border-b border-b-foreground/10", newsletterFormClassName)}
              >
                <Field name="email" className="flex-1">
                  {({ field, meta }) => (
                    <TextInput
                      {...field}
                      type="email"
                      placeholder={newsletterPlaceholder}
                      error={meta.touched && !!meta.error}
                      className={cn("mt-10 h-auto w-full rounded-none border-0 bg-transparent p-0 uppercase shadow-none placeholder:text-foreground/20 focus:outline-none focus:ring-0 lg:text-base", newsletterInputClassName)}
                      aria-label={newsletterPlaceholder || "Email address"}
                    />
                  )}
                </Field>
                <Pressable
                  componentType="button"
                  type="submit"
                  className={cn("p-2 hover:bg-muted/20", newsletterButtonClassName)}
                  asButton={false}
                  disabled={form.isSubmitting}
                >
                  <DynamicIcon name="lucide/arrow-right" size={20} />
                </Pressable>
              </Form>
            </div>
          </div>
          <div className={cn("grid w-full max-w-xs grid-cols-2 gap-10 text-sm font-light lg:text-base", bottomGridClassName)}>
            <div className={cn("w-32", locationClassName)}>{location}</div>
            <ul className={cn("space-y-1", footerLinksClassName)}>
              {footerLinks?.map((item) => (
                <li key={item.label}>
                  <Pressable
                    href={item.href}
                    className={cn("group flex items-center gap-1 tracking-tight text-foreground hover:text-foreground/30", footerLinkClassName)}
                  >
                    {item.label}
                  </Pressable>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={cn("mt-20 w-full lg:mt-32", brandSectionClassName)}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className={cn("text-6xl font-bold tracking-tighter md:text-8xl lg:text-9xl", brandTextClassName)}>
              {brandText}
            </span>
          </motion.div>
        </div>
        <div className={cn("mt-8 text-center text-sm text-muted-foreground", copyrightClassName)}>
          <p>{copyrightText}</p>
          <Pressable
            href={attributionHref}
            className="mt-2 inline-block hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            {attributionText}
          </Pressable>
        </div>
      </div>
    </Section>
  );
}
