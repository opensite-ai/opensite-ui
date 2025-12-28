"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, Select, TextArea } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardContent } from "../../ui/card";
import { Label } from "../../ui/label";
import {
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const TOPICS = [
  "Product Demo",
  "Sales Inquiry",
  "Technical Support",
  "Partnership",
  "General Question",
];

const TIMEZONES = [
  { value: "est", label: "Eastern Time (EST)" },
  { value: "cst", label: "Central Time (CST)" },
  { value: "mst", label: "Mountain Time (MST)" },
  { value: "pst", label: "Pacific Time (PST)" },
];

interface CallbackFormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  timezone: string;
  topic: string;
  details: string;
}

export interface ContactCallbackProps {
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
   * formConfig={{ endpoint: "https://api.mysite.com/callback", format: "json" }}
   *
   * @example
   * // With custom headers (e.g., authentication)
   * formConfig={{
   *   endpoint: "/api/callback",
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
   *   await fetch("/api/callback", {
   *     method: "POST",
   *     body: JSON.stringify(values)
   *   });
   * }}
   */
  onSubmit?: (values: CallbackFormValues) => void | Promise<void>;
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
 * ContactCallback - A comprehensive callback scheduling form with date/time selection,
 * timezone support, and topic categorization. Perfect for scheduling sales calls,
 * support callbacks, or consultation bookings.
 *
 * @example
 * ```tsx
 * <ContactCallback
 *   heading="Request a Callback"
 *   description="Schedule a time that works for you"
 *   buttonText="Schedule Callback"
 *   formConfig={{ endpoint: "/api/callback", format: "json" }}
 * />
 * ```
 */
export function ContactCallback({
  heading = "Request a Callback",
  description = "Schedule a time that works for you and we'll call you to discuss your needs.",
  buttonText = "Schedule Callback",
  className,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactCallbackProps): React.JSX.Element {
  const form = useForm<CallbackFormValues>({
    initialValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      timezone: "est",
      topic: "",
      details: "",
    },
    validationSchema: {
      name: (value) => (!value ? "Name is required" : undefined),
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return undefined;
      },
      phone: (value) => (!value ? "Phone number is required" : undefined),
      date: (value) => (!value ? "Date is required" : undefined),
      time: (value) => (!value ? "Time is required" : undefined),
      topic: (value) => (!value ? "Topic is required" : undefined),
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
    <section className={cn("pb-12", className)}>
      <div className="mx-auto max-w-4xl px-4">
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
              className="space-y-6"
            >
              {/* Contact Information */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Your Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field name="name">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <TextInput
                          {...field}
                          id="name"
                          placeholder="John Doe"
                          error={meta.touched && !!meta.error}
                          aria-label="Full Name"
                        />
                      </div>
                    )}
                  </Field>
                  <Field name="company">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
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
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                <Field name="phone">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <TextInput
                        {...field}
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        error={meta.touched && !!meta.error}
                        aria-label="Phone Number"
                      />
                    </div>
                  )}
                </Field>
              </div>

              {/* Schedule */}
              <div className="border-t pt-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Preferred Callback Time
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field name="date">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date</Label>
                        <div className="relative">
                          <TextInput
                            {...field}
                            id="date"
                            type="date"
                            className="pl-10"
                            error={meta.touched && !!meta.error}
                            aria-label="Preferred Date"
                          />
                          <DynamicIcon
                            name="lucide/calendar"
                            size={20}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                  <Field name="time">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="time">Preferred Time</Label>
                        <Select
                          {...field}
                          id="time"
                          error={meta.touched && !!meta.error}
                          aria-label="Preferred Time"
                        >
                          <option value="">Select a time</option>
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </Select>
                      </div>
                    )}
                  </Field>
                </div>

                <div className="mt-4">
                  <Field name="timezone">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          {...field}
                          id="timezone"
                          error={meta.touched && !!meta.error}
                          aria-label="Timezone"
                        >
                          {TIMEZONES.map((tz) => (
                            <option key={tz.value} value={tz.value}>
                              {tz.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              {/* Topic */}
              <div className="border-t pt-6">
                <h3 className="mb-4 text-lg font-semibold">
                  What would you like to discuss?
                </h3>
                <div className="space-y-4">
                  <Field name="topic">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="topic">Topic</Label>
                        <Select
                          {...field}
                          id="topic"
                          error={meta.touched && !!meta.error}
                          aria-label="Topic"
                        >
                          <option value="">Select a topic</option>
                          {TOPICS.map((topic) => (
                            <option key={topic} value={topic.toLowerCase()}>
                              {topic}
                            </option>
                          ))}
                        </Select>
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
                          placeholder="Help us prepare for the call by sharing any specific questions or topics you'd like to cover..."
                          rows={4}
                          error={meta.touched && !!meta.error}
                          aria-label="Additional Details"
                        />
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <DynamicIcon
                    name="lucide/clock"
                    size={20}
                    className="mt-1 shrink-0 text-primary"
                  />
                  <div className="text-sm">
                    <p className="font-medium">Callback Process</p>
                    <p className="mt-1 leading-relaxed text-muted-foreground">
                      We'll call you at the scheduled time at the phone number
                      you provided. Please ensure you're available to answer. If
                      you miss the call, we'll send you a follow-up email.
                    </p>
                  </div>
                </div>
              </div>

              <Pressable
                componentType="button"
                type="submit"
                className="w-full gap-2"
                size="lg"
                asButton
                disabled={form.isSubmitting}
              >
                <DynamicIcon name="lucide/phone" size={16} />
                {buttonText}
              </Pressable>
            </Form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Need immediate assistance?{" "}
          <Pressable href="#" className="text-primary hover:underline">
            Start a live chat
          </Pressable>{" "}
          or call us at{" "}
          <Pressable
            href="tel:+15551234567"
            className="text-primary hover:underline"
          >
            +1 (555) 123-4567
          </Pressable>
        </p>
      </div>
    </section>
  );
}

