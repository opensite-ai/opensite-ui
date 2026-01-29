"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, Select, TextArea, Radio } from "../../ui/form-inputs";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
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
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

const EVENT_TYPES = [
  { value: "wedding", label: "Wedding" },
  { value: "corporate", label: "Corporate Event" },
  { value: "birthday", label: "Birthday / Anniversary" },
  { value: "holiday", label: "Holiday Party" },
  { value: "gala", label: "Gala / Fundraiser" },
  { value: "private", label: "Private Dinner" },
  { value: "other", label: "Other" },
];

const SERVICE_STYLES = [
  { value: "buffet", label: "Buffet", description: "Self-serve stations" },
  { value: "plated", label: "Plated", description: "Formal sit-down service" },
  { value: "family", label: "Family Style", description: "Shared platters" },
  {
    value: "stations",
    label: "Food Stations",
    description: "Interactive cooking",
  },
  { value: "cocktail", label: "Cocktail", description: "Passed appetizers" },
];

const CUISINES = [
  { id: "american", label: "American" },
  { id: "italian", label: "Italian" },
  { id: "asian", label: "Asian Fusion" },
  { id: "mexican", label: "Mexican" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "bbq", label: "BBQ" },
];

const DIETARY_OPTIONS = [
  { id: "vegetarian", label: "Vegetarian options" },
  { id: "vegan", label: "Vegan options" },
  { id: "gluten-free", label: "Gluten-free options" },
  { id: "kosher", label: "Kosher" },
  { id: "halal", label: "Halal" },
];

const GUEST_COUNTS = [
  { value: "10-25", label: "10-25 guests" },
  { value: "26-50", label: "26-50 guests" },
  { value: "51-75", label: "51-75 guests" },
  { value: "76-100", label: "76-100 guests" },
  { value: "101-150", label: "101-150 guests" },
  { value: "151-200", label: "151-200 guests" },
  { value: "201-300", label: "201-300 guests" },
  { value: "301-500", label: "301-500 guests" },
  { value: "500+", label: "500+ guests" },
];

const BUDGET_RANGES = [
  { value: "25-50", label: "$25-50 / person" },
  { value: "50-75", label: "$50-75 / person" },
  { value: "75-100", label: "$75-100 / person" },
  { value: "100-150", label: "$100-150 / person" },
  { value: "150+", label: "$150+ / person" },
];

interface CateringFormValues {
  eventType: string;
  eventDate: string;
  guestCount: string;
  startTime: string;
  endTime: string;
  venue: string;
  serviceStyle: string;
  cuisinePreferences: string[];
  dietaryAccommodations: string[];
  budget: string;
  name: string;
  phone: string;
  email: string;
  details: string;
  tasting: boolean;
}

export interface ContactCateringProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below the heading
   */
  description?: React.ReactNode;
  /**
   * Submit button text
   */
  buttonText?: string;
  /**
   * Submit button icon (displayed before text)
   */
  buttonIcon?: React.ReactNode;
  /**
   * Array of action configurations for additional buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array and default submit)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the card content
   */
  cardContentClassName?: string;
  /**
   * Additional CSS classes for the form
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the submit button
   */
  submitClassName?: string;
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
  heading,
  description,
  buttonText,
  buttonIcon,
  actions,
  actionsSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  formClassName,
  submitClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity = 0.1,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactCateringProps): React.JSX.Element {
  const form = useForm<CateringFormValues>({
    initialValues: {
      eventType: "",
      eventDate: "",
      guestCount: "",
      startTime: "",
      endTime: "",
      venue: "",
      serviceStyle: "buffet",
      cuisinePreferences: [],
      dietaryAccommodations: [],
      budget: "",
      name: "",
      phone: "",
      email: "",
      details: "",
      tasting: false,
    },
    validationSchema: {
      eventType: (value) => (!value ? "Please select an event type" : undefined),
      eventDate: (value) => (!value ? "Event date is required" : undefined),
      guestCount: (value) => (!value ? "Please select guest count" : undefined),
      name: (value) => (!value ? "Name is required" : undefined),
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

  const toggleCuisinePreference = (value: string) => {
    const current = form.values.cuisinePreferences;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    form.setFieldValue("cuisinePreferences", updated);
  };

  const toggleDietaryAccommodation = (value: string) => {
    const current = form.values.dietaryAccommodations;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    form.setFieldValue("dietaryAccommodations", updated);
  };

  const actionsContent = React.useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (actions && actions.length > 0) {
      return actions.map((action, index) => {
        const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps} = action;
        return (
          <Pressable
            key={index}
            asButton
            className={actionClassName}
            {...pressableProps}
          >
            {children ?? (
              <>
                {icon}
                {label}
                {iconAfter}
              </>
            )}
          </Pressable>
        );
      });
    }
    return null;
  }, [actionsSlot, actions]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("py-12", className)}
    >
      <div className={cn("mx-auto w-full max-w-4xl px-4", containerClassName)}>
        <div className={cn("mb-10 text-center", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("mb-3 text-3xl font-bold tracking-tight", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("leading-relaxed text-muted-foreground", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>

        <Card className={cardClassName}>
          <CardContent className={cn("p-6 lg:p-8", cardContentClassName)}>
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              className={cn("space-y-8", formClassName)}
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="startTime">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <TextInput
                          {...field}
                          id="start-time"
                          type="time"
                          error={meta.touched && !!meta.error}
                          aria-label="Start Time"
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="endTime">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="end-time">End Time (Optional)</Label>
                        <TextInput
                          {...field}
                          id="end-time"
                          type="time"
                          error={meta.touched && !!meta.error}
                          aria-label="End Time"
                        />
                      </div>
                    )}
                  </Field>
                </div>

                <Field name="venue">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue / Location</Label>
                      <TextInput
                        {...field}
                        id="venue"
                        placeholder="Event venue or location"
                        error={meta.touched && !!meta.error}
                        aria-label="Venue"
                      />
                    </div>
                  )}
                </Field>
              </div>

              <Separator />

              {/* Service Style */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Service Preferences</h3>
                <Field name="serviceStyle">
                  {({ field }) => (
                    <Radio
                      name="serviceStyle"
                      label="Service Style"
                      value={field.value}
                      onChange={field.onChange}
                      options={SERVICE_STYLES}
                      layout="stacked"
                      className="space-y-2"
                    />
                  )}
                </Field>

                <div className="space-y-3">
                  <Label>Cuisine Preferences (Optional)</Label>
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {CUISINES.map((cuisine) => (
                      <div key={cuisine.id} className="flex items-center gap-2">
                        <Checkbox
                          id={cuisine.id}
                          checked={form.values.cuisinePreferences.includes(
                            cuisine.id
                          )}
                          onCheckedChange={() =>
                            toggleCuisinePreference(cuisine.id)
                          }
                        />
                        <Label
                          htmlFor={cuisine.id}
                          className="cursor-pointer font-normal"
                        >
                          {cuisine.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Dietary Accommodations (Optional)</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {DIETARY_OPTIONS.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <Checkbox
                          id={option.id}
                          checked={form.values.dietaryAccommodations.includes(
                            option.id
                          )}
                          onCheckedChange={() =>
                            toggleDietaryAccommodation(option.id)
                          }
                        />
                        <Label
                          htmlFor={option.id}
                          className="cursor-pointer font-normal"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Field name="budget">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Per Person (Optional)</Label>
                      <Select
                        {...field}
                        id="budget"
                        error={meta.touched && !!meta.error}
                        aria-label="Budget Per Person"
                      >
                        <option value="">Select budget range</option>
                        {BUDGET_RANGES.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}
                </Field>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Information</h3>
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

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="tasting"
                    checked={form.values.tasting}
                    onCheckedChange={(checked) =>
                      form.setFieldValue("tasting", checked === true)
                    }
                  />
                  <Label htmlFor="tasting" className="cursor-pointer font-normal">
                    I'm interested in scheduling a tasting
                  </Label>
                </div>
              </div>

              <div className={cn("rounded-lg border p-4", getNestedCardBg(background, "subtle"), getNestedCardTextColor(background))}>
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

              {actionsSlot || (actions && actions.length > 0) ? (
                actionsContent
              ) : (
                <Pressable
                  componentType="button"
                  type="submit"
                  className={cn("w-full", submitClassName)}
                  asButton
                  disabled={form.isSubmitting}
                >
                  {buttonIcon ?? <DynamicIcon name="lucide/utensils" size={16} className="mr-2" />}
                  {buttonText}
                </Pressable>
              )}
            </Form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
