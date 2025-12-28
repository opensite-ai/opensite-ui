"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "@page-speed/forms/inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";

export interface CtaNewsletterFeature {
  /**
   * Icon name for the feature
   */
  icon?: string;
  /**
   * Feature text
   */
  text?: string;
}

export interface CtaNewsletterFeaturesProps {
  /**
   * Badge text above the heading
   */
  badgeText?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Email input placeholder
   */
  emailPlaceholder?: string;
  /**
   * Submit button text
   */
  buttonText?: string;
  /**
   * Array of features to display
   */
  features?: CtaNewsletterFeature[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
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
   *     body: JSON.stringify({ email, campaign: "cta-features" })
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
}

const defaultFeatures: CtaNewsletterFeature[] = [
  { icon: "lucide/check", text: "Weekly insights and tips" },
  { icon: "lucide/check", text: "Exclusive content and offers" },
  { icon: "lucide/check", text: "Early access to new features" },
  { icon: "lucide/check", text: "Unsubscribe anytime" },
];

/**
 * CtaNewsletterFeatures - A newsletter subscription CTA with badge, heading,
 * email form, and a list of subscription benefits. Encourages sign-ups by
 * highlighting value.
 *
 * @example
 * ```tsx
 * <CtaNewsletterFeatures
 *   badgeText="Newsletter"
 *   heading="Stay in the loop"
 *   description="Get the latest updates delivered to your inbox."
 *   buttonText="Subscribe"
 *   features={[
 *     { icon: "lucide/check", text: "Weekly insights" },
 *     { icon: "lucide/check", text: "Exclusive content" }
 *   ]}
 * />
 * ```
 */
export function CtaNewsletterFeatures({
  badgeText = "Newsletter",
  heading = "Stay in the loop",
  description = "Get the latest updates, tips, and exclusive content delivered straight to your inbox. Join thousands of subscribers.",
  emailPlaceholder = "Enter your email",
  buttonText = "Subscribe",
  features = defaultFeatures,
  className,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: CtaNewsletterFeaturesProps): React.JSX.Element {
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
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            {badgeText}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mb-8 text-lg text-muted-foreground">{description}</p>
          <Form
            form={form}
            action={formConfig?.endpoint}
            method={formMethod}
            className="mx-auto mb-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Field name="email" className="flex-1">
              {({ field, meta }) => (
                <TextInput
                  {...field}
                  type="email"
                  placeholder={emailPlaceholder}
                  error={meta.touched && !!meta.error}
                  className="w-full"
                  aria-label={emailPlaceholder || "Email address"}
                />
              )}
            </Field>
            <Pressable
              componentType="button"
              type="submit"
              variant="default"
              className="shrink-0"
              asButton
              disabled={form.isSubmitting}
            >
              {buttonText}
              <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
            </Pressable>
          </Form>
          <ul className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                {feature.icon && (
                  <DynamicIcon
                    name={feature.icon}
                    size={16}
                    className="text-primary"
                  />
                )}
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
