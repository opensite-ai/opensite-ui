"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, Select, TextArea } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardContent } from "../../ui/card";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import {
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";

const SERVICES = [
  { value: "strategy", label: "Business Strategy" },
  { value: "marketing", label: "Marketing Consultation" },
  { value: "tech", label: "Technology Advisory" },
  { value: "finance", label: "Financial Planning" },
  { value: "hr", label: "HR & Talent" },
  { value: "other", label: "Other" },
];

const DURATIONS = [
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" },
];

const BUDGETS = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" },
];

interface ConsultationFormValues {
  service: string;
  duration: string;
  budget: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  details: string;
}

export interface ContactConsultationProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Submit button text
   */
  buttonText?: string;
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
   * formConfig={{ endpoint: "https://api.mysite.com/consultation", format: "json" }}
   *
   * @example
   * // With custom headers (e.g., authentication)
   * formConfig={{
   *   endpoint: "/api/consultation",
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
   *   await fetch("/api/consultation", {
   *     method: "POST",
   *     body: JSON.stringify(values)
   *   });
   * }}
   */
  onSubmit?: (values: ConsultationFormValues) => void | Promise<void>;
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
 * ContactConsultation - A consultation booking form with service selection,
 * duration, budget, and detailed information. Perfect for professional services
 * and consulting businesses.
 *
 * @example
 * ```tsx
 * <ContactConsultation
 *   heading="Book a Consultation"
 *   description="Let's discuss how we can help your business grow."
 *   buttonText="Book Consultation"
 *   formConfig={{ endpoint: "/api/consultation", format: "json" }}
 * />
 * ```
 */
export function ContactConsultation({
  heading = "Book a Consultation",
  description = "Let's discuss how we can help your business grow.",
  buttonText = "Book Consultation",
  className,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactConsultationProps): React.JSX.Element {
  const form = useForm<ConsultationFormValues>({
    initialValues: {
      service: "",
      duration: "60",
      budget: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      details: "",
    },
    validationSchema: {
      service: (value) => (!value ? "Please select a service" : undefined),
      budget: (value) => (!value ? "Please select a budget range" : undefined),
      firstName: (value) => (!value ? "First name is required" : undefined),
      lastName: (value) => (!value ? "Last name is required" : undefined),
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return undefined;
      },
      phone: (value) => (!value ? "Phone number is required" : undefined),
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
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">{heading}</h2>
          <p className="leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <Card>
          <CardContent className="p-6 lg:p-8">
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              className="space-y-8"
            >
              {/* Service Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Consultation Details</h3>
                <Field name="service">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Type</Label>
                      <Select
                        {...field}
                        id="service"
                        error={meta.touched && !!meta.error}
                        aria-label="Service Type"
                      >
                        <option value="">Select a service</option>
                        {SERVICES.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="duration">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="duration">Preferred Duration</Label>
                        <Select
                          {...field}
                          id="duration"
                          error={meta.touched && !!meta.error}
                          aria-label="Preferred Duration"
                        >
                          {DURATIONS.map((duration) => (
                            <option key={duration.value} value={duration.value}>
                              {duration.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                    )}
                  </Field>

                  <Field name="budget">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select
                          {...field}
                          id="budget"
                          error={meta.touched && !!meta.error}
                          aria-label="Budget Range"
                        >
                          <option value="">Select budget range</option>
                          {BUDGETS.map((budget) => (
                            <option key={budget.value} value={budget.value}>
                              {budget.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Information</h3>
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

                <div className="grid gap-4 sm:grid-cols-2">
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
                </div>

                <Field name="company">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <TextInput
                        {...field}
                        id="company"
                        placeholder="Acme Inc."
                        error={meta.touched && !!meta.error}
                        aria-label="Company"
                      />
                    </div>
                  )}
                </Field>

                <Field name="details">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="details">
                        Additional Details (Optional)
                      </Label>
                      <TextArea
                        {...field}
                        id="details"
                        placeholder="Tell us more about your needs..."
                        rows={4}
                        error={meta.touched && !!meta.error}
                        aria-label="Additional Details"
                      />
                    </div>
                  )}
                </Field>
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex gap-3">
                  <DynamicIcon
                    name="lucide/info"
                    size={20}
                    className="mt-0.5 text-muted-foreground"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">What happens next?</p>
                    <p className="text-sm text-muted-foreground">
                      We'll review your request and contact you within 24 hours to
                      schedule your consultation at a time that works for you.
                    </p>
                  </div>
                </div>
              </div>

              <Pressable
                componentType="button"
                type="submit"
                className="w-full"
                asButton
                disabled={form.isSubmitting}
              >
                <DynamicIcon name="lucide/calendar-check" size={16} className="mr-2" />
                {buttonText}
              </Pressable>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

