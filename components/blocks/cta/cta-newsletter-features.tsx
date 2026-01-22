"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "../../ui/form-inputs";
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
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface CtaNewsletterFeature {
  /**
   * Icon name for the feature
   */
  iconName?: string;
  /**
   * Custom icon element
   */
  icon?: React.ReactNode;
  /**
   * Feature text
   */
  text?: React.ReactNode;
  /**
   * Additional CSS classes for the feature
   */
  className?: string;
}

export interface CtaNewsletterFeaturesProps {
  /**
   * Badge content above the heading
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Email input placeholder
   */
  emailPlaceholder?: string;
  /**
   * Submit button text
   */
  buttonText?: React.ReactNode;
  /**
   * Array of features to display
   */
  features?: CtaNewsletterFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the form (overrides default form)
   */
  formSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the form
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the features list
   */
  featuresClassName?: string;
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

/**
 * CtaNewsletterFeatures - A newsletter subscription CTA with badge, heading,
 * email form, and a list of subscription benefits. Encourages sign-ups by
 * highlighting value.
 *
 * @example
 * ```tsx
 * <CtaNewsletterFeatures
 *   badge="Newsletter"
 *   heading="Stay in the loop"
 *   description="Get the latest updates delivered to your inbox."
 *   buttonText="Subscribe"
 *   features={[
 *     { iconName: "lucide/check", text: "Weekly insights" },
 *     { iconName: "lucide/check", text: "Exclusive content" }
 *   ]}
 * />
 * ```
 */
export function CtaNewsletterFeatures({
  badge,
  heading,
  description,
  emailPlaceholder,
  buttonText,
  features,
  featuresSlot,
  formSlot,
  className,
  containerClassName,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  formClassName,
  featuresClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
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

  const renderForm = () => {
    if (formSlot) return formSlot;

    return (
      <Form
        form={form}
        action={formConfig?.endpoint}
        method={formMethod}
        className={cn(
          "mx-auto mb-8 flex max-w-md flex-col gap-3 sm:flex-row",
          formClassName,
        )}
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
    );
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <ul
        className={cn(
          "flex flex-wrap justify-center gap-4 text-sm text-muted-foreground",
          featuresClassName,
        )}
      >
        {features.map((feature, index) => (
          <li
            key={index}
            className={cn("flex items-center gap-2", feature.className)}
          >
            {feature.icon ??
              (feature.iconName && (
                <DynamicIcon
                  name={feature.iconName}
                  size={16}
                  className="text-primary"
                />
              ))}
            {feature.text}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-2xl text-center", contentClassName)}>
          <Badge variant="secondary" className={cn("mb-4", badgeClassName)}>
            {badge}
          </Badge>
          <h2
            className={cn(
              "mb-4 text-3xl font-bold md:text-4xl",
              headingClassName,
            )}
          >
            {heading}
          </h2>
          <p
            className={cn(
              "mb-8 text-lg text-muted-foreground",
              descriptionClassName,
            )}
          >
            {description}
          </p>
          {renderForm()}
          {renderFeatures()}
        </div>
      </div>
    </Section>
  );
}
