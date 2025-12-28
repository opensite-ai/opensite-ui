"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, TextArea } from "@page-speed/forms/inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Card, CardContent } from "../../ui/card";
import { Label } from "../../ui/label";
import {
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";

interface ContactSupportFormValues {
  name: string;
  email: string;
  message: string;
}

export interface ContactSupportProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  formConfig?: PageSpeedFormConfig;
  onSubmit?: (values: ContactSupportFormValues) => void | Promise<void>;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

/**
 * ContactSupport - Support contact form with essential fields.
 * Perfect for customer support and help desk scenarios.
 *
 * @example
 * ```tsx
 * <ContactSupport
 *   heading="How can we help?"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
export function ContactSupport({
  heading = "How can we help?",
  description = "Send us a message or use one of our other support channels.",
  buttonText = "Send Message",
  className,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactSupportProps): React.JSX.Element {
  const form = useForm<ContactSupportFormValues>({
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
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">{heading}</h2>
          <p className="leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <Card className="mx-auto max-w-xl">
          <CardContent className="p-6 lg:p-8">
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
                      placeholder="Your name"
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
                      placeholder="Describe your issue..."
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
                className="w-full"
                size="lg"
                asButton
                disabled={form.isSubmitting}
              >
                {buttonText}
              </Pressable>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}


