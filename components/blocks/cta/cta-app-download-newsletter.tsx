"use client";

import * as React from "react";
import { Form, useForm, Field } from "@page-speed/forms";
import { TextInput } from "@page-speed/forms/inputs";
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

export interface CtaAppDownloadNewsletterProps {
  /**
   * App section heading
   */
  appHeading?: string;
  /**
   * App section description
   */
  appDescription?: string;
  /**
   * App Store button URL
   */
  appStoreUrl?: string;
  /**
   * Google Play button URL
   */
  googlePlayUrl?: string;
  /**
   * Phone mockup image URL
   */
  phoneMockupImage?: string;
  /**
   * Newsletter section heading
   */
  newsletterHeading?: string;
  /**
   * Newsletter section description
   */
  newsletterDescription?: string;
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
   * Form submission configuration for @page-speed/forms
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Optional submit callback
   */
  onSubmit?: (email: string) => void | Promise<void>;
  /**
   * Optional success callback
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Optional error callback
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
 *   appStoreUrl="https://apps.apple.com"
 *   googlePlayUrl="https://play.google.com"
 *   newsletterHeading="Stay Updated"
 *   newsletterDescription="Subscribe to our newsletter."
 * />
 * ```
 */
export function CtaAppDownloadNewsletter({
  appHeading = "Download Our App",
  appDescription = "Get the best experience on mobile. Download our app and access all features on the go.",
  appStoreUrl = "#",
  googlePlayUrl = "#",
  phoneMockupImage = imagePlaceholders[8],
  newsletterHeading = "Stay Updated",
  newsletterDescription = "Subscribe to our newsletter and never miss an update. Get the latest news, tips, and exclusive offers.",
  newsletterButtonText = "Subscribe",
  emailPlaceholder = "Enter your email",
  className,
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

  const formMethod = formConfig?.method === "get" ? "get" : "post";

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 p-8 lg:p-12">
            <div className="relative z-10 max-w-sm">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                {appHeading}
              </h2>
              <p className="mb-8 text-muted-foreground">{appDescription}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Pressable
                  href={appStoreUrl}
                  variant="default"
                  className="gap-2"
                  asButton
                >
                  <DynamicIcon name="simple-icons/apple" size={20} />
                  App Store
                </Pressable>
                <Pressable
                  href={googlePlayUrl}
                  variant="outline"
                  className="gap-2"
                  asButton
                >
                  <DynamicIcon name="simple-icons/googleplay" size={20} />
                  Google Play
                </Pressable>
              </div>
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

          <div className="flex flex-col justify-center rounded-2xl border bg-card p-8 lg:p-12">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              {newsletterHeading}
            </h2>
            <p className="mb-8 text-muted-foreground">
              {newsletterDescription}
            </p>
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              className="flex flex-col gap-3 sm:flex-row"
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
    </section>
  );
}
