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

/**
 * Navigation link configuration
 */
export interface FooterNewsletterMinimalNavLink {
  label: string;
  href: string;
}

/**
 * Social link configuration
 */
export interface FooterNewsletterMinimalSocialLink {
  label: string;
  href: string;
}

/**
 * Footer link configuration
 */
export interface FooterNewsletterMinimalFooterLink {
  label: string;
  href: string;
}

/**
 * Props for the FooterNewsletterMinimal component
 */
export interface FooterNewsletterMinimalProps {
  /** Additional CSS classes */
  className?: string;
  /** Main heading text */
  heading?: string;
  /** Support email */
  supportEmail?: string;
  /** Navigation links */
  navLinks?: FooterNewsletterMinimalNavLink[];
  /** Social links */
  socialLinks?: FooterNewsletterMinimalSocialLink[];
  /** Footer links (privacy, terms) */
  footerLinks?: FooterNewsletterMinimalFooterLink[];
  /** Newsletter label */
  newsletterLabel?: string;
  /** Newsletter placeholder */
  newsletterPlaceholder?: string;
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
  /** Location text */
  location?: string;
}

const defaultNavLinks: FooterNewsletterMinimalNavLink[] = [
  { label: "Home", href: "#" },
  { label: "Collection", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Login", href: "#" },
];

const defaultSocialLinks: FooterNewsletterMinimalSocialLink[] = [
  { label: "Linkedin", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
];

const defaultFooterLinks: FooterNewsletterMinimalFooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

/**
 * FooterNewsletterMinimal - A dark-themed minimal footer with newsletter and animated logo.
 *
 * Features a clean layout with main heading, support email, navigation columns,
 * newsletter signup form, and a large animated brand logo. Ideal for modern SaaS products,
 * creative agencies, and businesses that want a sophisticated, dark-themed footer
 * with strong visual branding.
 */
export function FooterNewsletterMinimal({
  className,
  heading = "Unlock 800+ blocks now",
  supportEmail = "hi@opensite.ai",
  navLinks = defaultNavLinks,
  socialLinks = defaultSocialLinks,
  footerLinks = defaultFooterLinks,
  newsletterLabel = "Sign up for newsletter :",
  newsletterPlaceholder = "Email*",
  formConfig,
  onSubmit,
  onSuccess,
  onError,
  location = "San Francisco, CA",
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

  return (
    <section
      className={cn("dark bg-background py-32 text-foreground", className)}
    >
      <div className="container">
        <div className="flex flex-col justify-between gap-15 lg:flex-row">
          <div className="flex flex-col gap-10">
            <p className="relative text-4xl font-medium tracking-tight lg:text-5xl">
              {heading}
            </p>
            <div className="space-y-1 text-sm font-light tracking-tight lg:text-base">
              <p>Get Support : </p>
              <Pressable href={`mailto:${supportEmail}`}>
                {supportEmail}
              </Pressable>
            </div>
          </div>
          <div className="grid w-full max-w-xs grid-cols-2 gap-10 text-sm font-light lg:text-base">
            <ul className="space-y-1">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Pressable
                    href={item.href}
                    className="tracking-tight text-foreground hover:text-foreground/30"
                  >
                    {item.label}
                  </Pressable>
                </li>
              ))}
            </ul>
            <ul className="space-y-1">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <Pressable
                    href={item.href}
                    className="group flex items-center gap-1 tracking-tight text-foreground hover:text-foreground/30"
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
        <div className="mt-20 flex flex-col justify-between gap-15 lg:flex-row">
          <div className="flex w-full max-w-md flex-col gap-10">
            <div className="space-y-1 text-sm font-light tracking-tight lg:text-base">
              <p>{newsletterLabel}</p>
              <Form
                form={form}
                action={formConfig?.endpoint}
                method={formMethod}
                className="flex w-full items-end border-b border-b-foreground/10"
              >
                <Field name="email" className="flex-1">
                  {({ field, meta }) => (
                    <TextInput
                      {...field}
                      type="email"
                      placeholder={newsletterPlaceholder}
                      error={meta.touched && !!meta.error}
                      className="mt-10 h-auto w-full rounded-none border-0 bg-transparent p-0 uppercase shadow-none placeholder:text-foreground/20 focus:outline-none focus:ring-0 lg:text-base"
                      aria-label={newsletterPlaceholder || "Email address"}
                    />
                  )}
                </Field>
                <Pressable
                  componentType="button"
                  type="submit"
                  className="p-2 hover:bg-muted/20"
                  asButton={false}
                  disabled={form.isSubmitting}
                >
                  <DynamicIcon name="lucide/arrow-right" size={20} />
                </Pressable>
              </Form>
            </div>
          </div>
          <div className="grid w-full max-w-xs grid-cols-2 gap-10 text-sm font-light lg:text-base">
            <div className="w-32">{location}</div>
            <ul className="space-y-1">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <Pressable
                    href={item.href}
                    className="group flex items-center gap-1 tracking-tight text-foreground hover:text-foreground/30"
                  >
                    {item.label}
                  </Pressable>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-20 w-full lg:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-6xl font-bold tracking-tighter md:text-8xl lg:text-9xl">
              OPENSITE
            </span>
          </motion.div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Opensite AI. All rights reserved.</p>
          <Pressable
            href="https://opensite.ai"
            className="mt-2 inline-block hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI Website and Automation Platform by Opensite
          </Pressable>
        </div>
      </div>
    </section>
  );
}
