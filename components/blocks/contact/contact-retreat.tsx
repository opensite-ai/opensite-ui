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

interface ContactRetreatFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactRetreatProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  formConfig?: PageSpeedFormConfig;
  onSubmit?: (values: ContactRetreatFormValues) => void | Promise<void>;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

/**
 * ContactRetreat - Contact form with image background layout.
 *
 * @example
 * ```tsx
 * <ContactRetreat
 *   heading="Retreat Registration"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
export function ContactRetreat({
  heading = "Retreat Registration",
  description = "Register for our upcoming retreat.",
  buttonText = "Send Message",
  className,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactRetreatProps): React.JSX.Element {
  const form = useForm<ContactRetreatFormValues>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: {
      first_name: (value) => (!value ? "First name is required" : undefined),
      last_name: (value) => (!value ? "Last name is required" : undefined),
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return undefined;
      },
      phone: (value) => (!value ? "Phone is required" : undefined),
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
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="first_name">
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

                <Field name="last_name">
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
                    <Label htmlFor="email">Email</Label>
                    <TextInput
                      {...field}
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      error={meta.touched && !!meta.error}
                      aria-label="Email"
                    />
                  </div>
                )}
              </Field>

              <Field name="phone">
                {({ field, meta }) => (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <TextInput
                      {...field}
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      error={meta.touched && !!meta.error}
                      aria-label="Phone"
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
                      placeholder="Your message..."
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


