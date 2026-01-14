"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, TextArea } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card } from "../../ui/card";
import { Label } from "../../ui/label";
import {
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import type { ActionConfig } from "../../../src/types";

interface ContactDarkFormValues {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface ContactDarkOption {
  /**
   * Icon name for the contact option
   */
  icon: string;
  /**
   * Contact information text
   */
  info: string;
  /**
   * Optional href for the contact option
   */
  href?: string;
}

export interface ContactDarkSocialLink {
  /**
   * Icon name for the social platform
   */
  icon: string;
  /**
   * Link href
   */
  href: string;
  /**
   * Accessible label for the link
   */
  label: string;
}

export interface ContactDarkProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below the heading
   */
  description?: React.ReactNode;
  /**
   * Contact information heading
   */
  contactHeading?: React.ReactNode;
  /**
   * Contact information description
   */
  contactDescription?: React.ReactNode;
  /**
   * Submit button text
   */
  buttonText?: string;
  /**
   * Submit button icon (displayed before text)
   */
  buttonIcon?: React.ReactNode;
  /**
   * Array of action configurations for additional buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array and default submit)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Contact options to display
   */
  contactOptions?: ContactDarkOption[];
  /**
   * Custom slot for rendering contact options (overrides contactOptions array)
   */
  contactOptionsSlot?: React.ReactNode;
  /**
   * Social media links to display
   */
  socialLinks?: ContactDarkSocialLink[];
  /**
   * Custom slot for rendering social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the form panel
   */
  formPanelClassName?: string;
  /**
   * Additional CSS classes for the form
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the submit button
   */
  submitClassName?: string;
  /**
   * Additional CSS classes for the info panel
   */
  infoPanelClassName?: string;
  /**
   * Additional CSS classes for the contact options container
   */
  contactOptionsClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Optional form submission configuration.
   *
   * **Universal Usage**: Works with ANY REST API endpoint. Simply provide an `endpoint` URL
   * and the form will submit to it in JSON format.
   *
   * @example
   * // Works with any API
   * formConfig={{ endpoint: "https://api.mysite.com/contact", format: "json" }}
   *
   * @example
   * // With custom headers (e.g., authentication)
   * formConfig={{
   *   endpoint: "/api/contact",
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
   * onSubmit={async (values) => {
   *   await fetch("/api/contact", {
   *     method: "POST",
   *     body: JSON.stringify(values)
   *   });
   * }}
   */
  onSubmit?: (values: ContactDarkFormValues) => void | Promise<void>;
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
}

/**
 * ContactDark - A dark-themed contact form with split layout featuring a form
 * on one side and contact information with social links on a dark background.
 * Perfect for modern, high-contrast designs.
 *
 * @example
 * ```tsx
 * <ContactDark
 *   heading="Contact Us"
 *   description="Any questions or remarks? Just write us a message!"
 *   buttonText="Send Message"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
export function ContactDark({
  heading,
  description,
  contactHeading = "Contact Information",
  contactDescription = "Fill up the form and our team will get back to you within 24 hours.",
  buttonText,
  buttonIcon,
  actions,
  actionsSlot,
  contactOptions,
  contactOptionsSlot,
  socialLinks,
  socialLinksSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  formPanelClassName,
  formClassName,
  submitClassName,
  infoPanelClassName,
  contactOptionsClassName,
  socialLinksClassName,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactDarkProps): React.JSX.Element {
  const form = useForm<ContactDarkFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    validationSchema: {
      firstName: (value) => (!value ? "First name is required" : undefined),
      lastName: (value) => (!value ? "Last name is required" : undefined),
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return undefined;
      },
      message: (value) => (!value ? "Message is required" : undefined),
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
          await onSubmit(values);
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

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (actions && actions.length > 0) {
      return actions.map((action, index) => {
        const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
        return (
          <Pressable
            key={index}
            asButton
            className={actionClassName}
            {...pressableProps}
          >
            {children ?? (
              <>
                {icon}
                {label}
                {iconAfter}
              </>
            )}
          </Pressable>
        );
      });
    }
    return null;
  };

  const renderContactOptions = () => {
    if (contactOptionsSlot) return contactOptionsSlot;
    if (contactOptions && contactOptions.length > 0) {
      return contactOptions.map((option, key) => (
        <div key={key} className="flex items-center gap-3">
          <DynamicIcon
            name={option.icon}
            size={16}
            className="text-primary-foreground/70"
          />
          {option.href ? (
            <Pressable
              href={option.href}
              className="text-sm text-primary-foreground"
            >
              {option.info}
            </Pressable>
          ) : (
            <span className="text-sm">{option.info}</span>
          )}
        </div>
      ));
    }
    return null;
  };

  const renderSocialLinks = () => {
    if (socialLinksSlot) return socialLinksSlot;
    if (socialLinks && socialLinks.length > 0) {
      return socialLinks.map((social, key) => (
        <Pressable
          key={key}
          href={social.href}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
          aria-label={social.label}
        >
          <DynamicIcon name={social.icon} size={16} />
        </Pressable>
      ));
    }
    return null;
  };

  return (
    <section className={cn("py-12", className)}>
      <div className={cn("mx-auto w-full max-w-4xl px-4", containerClassName)}>
        <div className={cn("mb-10 text-center", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("mb-3 text-3xl font-bold tracking-tight", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("leading-relaxed text-muted-foreground", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>

        <Card className={cn("grid gap-0 overflow-hidden lg:grid-cols-2", cardClassName)}>
          <div className={cn("p-6 lg:p-8", formPanelClassName)}>
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              className={cn("space-y-6", formClassName)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="firstName">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <TextInput
                        {...field}
                        id="first-name"
                        placeholder="John"
                        error={meta.touched && !!meta.error}
                        aria-label="First Name"
                      />
                    </div>
                  )}
                </Field>
                <Field name="lastName">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <TextInput
                        {...field}
                        id="last-name"
                        placeholder="Doe"
                        error={meta.touched && !!meta.error}
                        aria-label="Last Name"
                      />
                    </div>
                  )}
                </Field>
              </div>
              <Field name="email">
                {({ field, meta }) => (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <TextInput
                      {...field}
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      error={meta.touched && !!meta.error}
                      aria-label="Email Address"
                    />
                  </div>
                )}
              </Field>
              <Field name="message">
                {({ field, meta }) => (
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <TextArea
                      {...field}
                      id="message"
                      placeholder="Tell us how we can help..."
                      rows={4}
                      error={meta.touched && !!meta.error}
                      aria-label="Message"
                    />
                  </div>
                )}
              </Field>
              {actionsSlot || (actions && actions.length > 0) ? (
                renderActions()
              ) : (
                <Pressable
                  componentType="button"
                  type="submit"
                  className={cn("w-full", submitClassName)}
                  asButton
                  disabled={form.isSubmitting}
                >
                  {buttonIcon}
                  {buttonText}
                </Pressable>
              )}
            </Form>
          </div>

          <div className={cn("flex flex-col justify-between bg-primary p-6 text-primary-foreground lg:p-8", infoPanelClassName)}>
            <div>
              {contactHeading && (
                typeof contactHeading === "string" ? (
                  <h3 className="mb-3 text-xl font-semibold">{contactHeading}</h3>
                ) : (
                  <div className="mb-3">{contactHeading}</div>
                )
              )}
              {contactDescription && (
                typeof contactDescription === "string" ? (
                  <p className="mb-8 text-sm text-primary-foreground/80">
                    {contactDescription}
                  </p>
                ) : (
                  <div className="mb-8">{contactDescription}</div>
                )
              )}
              <div className={cn("space-y-4", contactOptionsClassName)}>
                {renderContactOptions()}
              </div>
            </div>
            <div className={cn("mt-8 flex items-center gap-4", socialLinksClassName)}>
              {renderSocialLinks()}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

