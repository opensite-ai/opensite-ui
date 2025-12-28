"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, Select, TextArea } from "@page-speed/forms/inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardContent } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import {
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";

const EVENT_TYPES = [
  { value: "wedding", label: "Wedding", icon: "lucide/heart" },
  { value: "corporate", label: "Corporate Event", icon: "lucide/briefcase" },
  { value: "birthday", label: "Birthday Party", icon: "lucide/cake" },
  { value: "other", label: "Other", icon: "lucide/calendar" },
];

const GUEST_COUNTS = [
  { value: "1-25", label: "1-25 guests" },
  { value: "26-50", label: "26-50 guests" },
  { value: "51-100", label: "51-100 guests" },
  { value: "101-200", label: "101-200 guests" },
  { value: "200+", label: "200+ guests" },
];

const DIETARY_OPTIONS = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
];

interface CateringFormValues {
  eventType: string;
  guestCount: string;
  eventDate: string;
  dietaryRestrictions: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  venue: string;
  details: string;
}

export interface ContactCateringProps {
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
   * formConfig={{ endpoint: "https://api.mysite.com/catering", format: "json" }}
   *
   * @example
   * // With custom headers (e.g., authentication)
   * formConfig={{
   *   endpoint: "/api/catering",
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
   *   await fetch("/api/catering", {
   *     method: "POST",
   *     body: JSON.stringify(values)
   *   });
   * }}
   */
  onSubmit?: (values: CateringFormValues) => void | Promise<void>;
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
 * ContactCatering - A comprehensive catering inquiry form with event type selection,
 * guest count, dietary restrictions, and event details. Perfect for catering services
 * and event planning businesses.
 *
 * @example
 * ```tsx
 * <ContactCatering
 *   heading="Catering Inquiry"
 *   description="Let us make your event unforgettable with our catering services."
 *   buttonText="Request Quote"
 *   formConfig={{ endpoint: "/api/catering", format: "json" }}
 * />
 * ```
 */
export function ContactCatering({
  heading = "Catering Inquiry",
  description = "Let us make your event unforgettable with our catering services.",
  buttonText = "Request Quote",
  className,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactCateringProps): React.JSX.Element {
  const form = useForm<CateringFormValues>({
    initialValues: {
      eventType: "",
      guestCount: "",
      eventDate: "",
      dietaryRestrictions: [],
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      venue: "",
      details: "",
    },
    validationSchema: {
      eventType: (value) => (!value ? "Please select an event type" : undefined),
      guestCount: (value) => (!value ? "Please select guest count" : undefined),
      eventDate: (value) => (!value ? "Event date is required" : undefined),
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

  const toggleDietaryRestriction = (value: string) => {
    const current = form.values.dietaryRestrictions;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    form.setFieldValue("dietaryRestrictions", updated);
  };

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
              {/* Event Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Event Details</h3>
                <Field name="eventType">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="event-type">Event Type</Label>
                      <Select
                        {...field}
                        id="event-type"
                        error={meta.touched && !!meta.error}
                        aria-label="Event Type"
                      >
                        <option value="">Select event type</option>
                        {EVENT_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="guestCount">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="guest-count">Number of Guests</Label>
                        <Select
                          {...field}
                          id="guest-count"
                          error={meta.touched && !!meta.error}
                          aria-label="Number of Guests"
                        >
                          <option value="">Select guest count</option>
                          {GUEST_COUNTS.map((count) => (
                            <option key={count.value} value={count.value}>
                              {count.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                    )}
                  </Field>

                  <Field name="eventDate">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="event-date">Event Date</Label>
                        <TextInput
                          {...field}
                          id="event-date"
                          type="date"
                          error={meta.touched && !!meta.error}
                          aria-label="Event Date"
                        />
                      </div>
                    )}
                  </Field>
                </div>

                <div className="space-y-3">
                  <Label>Dietary Restrictions (Optional)</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {DIETARY_OPTIONS.map((option) => (
                      <div key={option.value} className="flex items-center gap-2">
                        <Checkbox
                          id={option.value}
                          checked={form.values.dietaryRestrictions.includes(
                            option.value
                          )}
                          onCheckedChange={() =>
                            toggleDietaryRestriction(option.value)
                          }
                        />
                        <Label
                          htmlFor={option.value}
                          className="cursor-pointer font-normal"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
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

                <Field name="venue">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue / Location (Optional)</Label>
                      <TextInput
                        {...field}
                        id="venue"
                        placeholder="Grand Ballroom, 123 Main St"
                        error={meta.touched && !!meta.error}
                        aria-label="Venue / Location"
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
                        placeholder="Tell us about your menu preferences, budget, or any special requirements..."
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
                    name="lucide/chef-hat"
                    size={20}
                    className="mt-0.5 text-muted-foreground"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Custom Menus Available</p>
                    <p className="text-sm text-muted-foreground">
                      We'll work with you to create a custom menu that perfectly
                      fits your event and budget. Our team will contact you within
                      24 hours to discuss options.
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
                <DynamicIcon name="lucide/utensils" size={16} className="mr-2" />
                {buttonText}
              </Pressable>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

