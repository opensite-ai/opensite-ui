"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, TextArea } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Label } from "../../ui/label";
import {
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";

interface ContactMinimalFormValues {
  name: string;
  email: string;
  message: string;
}

export interface ContactMinimalProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  formConfig?: PageSpeedFormConfig;
  onSubmit?: (values: ContactMinimalFormValues) => void | Promise<void>;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

/**
 * ContactMinimal - Simple, clean contact form with essential fields.
 * Perfect for minimal designs and quick contact forms.
 *
 * @example
 * ```tsx
 * <ContactMinimal
 *   heading="Let's Talk"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
export function ContactMinimal({
  heading = "Let's Talk",
  description = "Send us a message and we'll get back to you within 24 hours.",
  buttonText = "Send Message",
  className,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactMinimalProps): React.JSX.Element {
  const form = useForm<ContactMinimalFormValues>({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: {
      name: (value) => (!value ? "Name is required" : undefined),
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

  return (
    <section className={cn("py-12", className)}>
      <div className="mx-auto w-full max-w-md px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">{heading}</h2>
          <p className="leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <Form
          form={form}
          action={formConfig?.endpoint}
          method={formMethod}
          className="space-y-4"
        >
          <Field name="name">
            {({ field, meta }) => (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <TextInput
                  {...field}
                  id="name"
                  placeholder="Your full name"
                  error={meta.touched && !!meta.error}
                  aria-label="Name"
                />
              </div>
            )}
          </Field>

          <Field name="email">
            {({ field, meta }) => (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <TextInput
                  {...field}
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  error={meta.touched && !!meta.error}
                  aria-label="Email"
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
                  placeholder="Tell us what's on your mind..."
                  rows={4}
                  error={meta.touched && !!meta.error}
                  aria-label="Message"
                />
              </div>
            )}
          </Field>

          <Pressable
            componentType="button"
            type="submit"
            className="w-full gap-2"
            size="lg"
            asButton
            disabled={form.isSubmitting}
          >
            <DynamicIcon name="lucide/send" size={16} />
            {buttonText}
          </Pressable>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          By submitting this form, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </section>
  );
}


