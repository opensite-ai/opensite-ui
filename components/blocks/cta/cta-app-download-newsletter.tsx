"use client";

import * as React from "react";
import { Form, useForm, Field } from "@page-speed/forms";
import { TextInput } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaAppDownloadNewsletterProps {
  /**
   * App section heading
   */
  appHeading?: React.ReactNode;
  /**
   * App section description
   */
  appDescription?: React.ReactNode;
  /**
   * Array of action configurations for app download buttons
   */
  appActions?: ActionConfig[];
  /**
   * Custom slot for rendering app actions (overrides appActions array)
   */
  appActionsSlot?: React.ReactNode;
  /**
   * Phone mockup image URL
   */
  phoneMockupImage?: string;
  /**
   * Newsletter section heading
   */
  newsletterHeading?: React.ReactNode;
  /**
   * Newsletter section description
   */
  newsletterDescription?: React.ReactNode;
  /**
   * Newsletter button text
   */
  newsletterButtonText?: string;
  /**
   * Email input placeholder
   */
  emailPlaceholder?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the app card
   */
  appCardClassName?: string;
  /**
   * Additional CSS classes for the app heading
   */
  appHeadingClassName?: string;
  /**
   * Additional CSS classes for the app description
   */
  appDescriptionClassName?: string;
  /**
   * Additional CSS classes for the app actions container
   */
  appActionsClassName?: string;
  /**
   * Additional CSS classes for the newsletter card
   */
  newsletterCardClassName?: string;
  /**
   * Additional CSS classes for the newsletter heading
   */
  newsletterHeadingClassName?: string;
  /**
   * Additional CSS classes for the newsletter description
   */
  newsletterDescriptionClassName?: string;
  /**
   * Additional CSS classes for the form
   */
  formClassName?: string;
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
  pattern?: PatternName | string;
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
   *     body: JSON.stringify({ email, source: "homepage" })
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
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultAppActions: ActionConfig[] = [
  { label: "App Store", href: "#", variant: "default" },
  { label: "Google Play", href: "#", variant: "outline" },
];

/**
 * CtaAppDownloadNewsletter - A two-column CTA grid featuring an app download
 * section with phone mockup and a newsletter subscription form. Perfect for
 * mobile app promotions.
 *
 * @example
 * ```tsx
 * <CtaAppDownloadNewsletter
 *   appHeading="Download Our App"
 *   appDescription="Get the best experience on mobile."
 *   appActions={[
 *     { label: "App Store", href: "https://apps.apple.com", variant: "default" },
 *     { label: "Google Play", href: "https://play.google.com", variant: "outline" }
 *   ]}
 *   newsletterHeading="Stay Updated"
 *   newsletterDescription="Subscribe to our newsletter."
 * />
 * ```
 */
export function CtaAppDownloadNewsletter({
  appHeading = "Download Our App",
  appDescription = "Get the best experience on mobile. Download our app and access all features on the go.",
  appActions = defaultAppActions,
  appActionsSlot,
  phoneMockupImage = imagePlaceholders[8],
  newsletterHeading = "Stay Updated",
  newsletterDescription = "Subscribe to our newsletter and never miss an update. Get the latest news, tips, and exclusive offers.",
  newsletterButtonText = "Subscribe",
  emailPlaceholder = "Enter your email",
  className,
  containerClassName,
  gridClassName,
  appCardClassName,
  appHeadingClassName,
  appDescriptionClassName,
  appActionsClassName,
  newsletterCardClassName,
  newsletterHeadingClassName,
  newsletterDescriptionClassName,
  formClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
  optixFlowConfig,
}: CtaAppDownloadNewsletterProps): React.JSX.Element {
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

  const renderAppActions = () => {
    if (appActionsSlot) return appActionsSlot;
    if (!appActions || appActions.length === 0) return null;

    return (
      <div
        className={cn("flex flex-col gap-3 sm:flex-row", appActionsClassName)}
      >
        {appActions.map((action, index) => {
          const isAppStore =
            action.label?.toString().toLowerCase().includes("app store") ||
            action.href?.includes("apple");
          const isGooglePlay =
            action.label?.toString().toLowerCase().includes("google") ||
            action.href?.includes("play.google");

          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              size={action.size}
              className={cn("gap-2", action.className)}
              aria-label={action["aria-label"]}
              asButton
            >
              {action.icon ??
                (isAppStore ? (
                  <DynamicIcon name="simple-icons/apple" size={20} />
                ) : isGooglePlay ? (
                  <DynamicIcon name="simple-icons/googleplay" size={20} />
                ) : null)}
              {action.children ?? action.label}
              {action.iconAfter}
            </Pressable>
          );
        })}
      </div>
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
        <div className={cn("grid gap-8 lg:grid-cols-2", gridClassName)}>
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 p-8 lg:p-12",
              appCardClassName
            )}
          >
            <div className="relative z-10 max-w-sm">
              <h2
                className={cn(
                  "mb-4 text-2xl font-bold md:text-3xl",
                  appHeadingClassName
                )}
              >
                {appHeading}
              </h2>
              <p
                className={cn("mb-8 text-muted-foreground", appDescriptionClassName)}
              >
                {appDescription}
              </p>
              {renderAppActions()}
            </div>
            <div className="absolute -right-16 -bottom-16 h-64 w-48 rotate-12 opacity-20 lg:h-80 lg:w-60">
              <Img
                src={phoneMockupImage}
                alt=""
                className="h-full w-full object-contain"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col justify-center rounded-2xl border bg-card p-8 lg:p-12",
              newsletterCardClassName
            )}
          >
            <h2
              className={cn(
                "mb-4 text-2xl font-bold md:text-3xl",
                newsletterHeadingClassName
              )}
            >
              {newsletterHeading}
            </h2>
            <p
              className={cn(
                "mb-8 text-muted-foreground",
                newsletterDescriptionClassName
              )}
            >
              {newsletterDescription}
            </p>
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              className={cn("flex flex-col gap-3 sm:flex-row", formClassName)}
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
                {newsletterButtonText}
                <DynamicIcon name="lucide/send" size={16} className="ml-2" />
              </Pressable>
            </Form>
          </div>
        </div>
      </div>
    </Section>
  );
}
