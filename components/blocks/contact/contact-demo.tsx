"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, Select } from "../../ui/form-inputs";
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
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

const USE_CASES = [
  { value: "automation", label: "Workflow Automation", icon: "lucide/zap" },
  {
    value: "analytics",
    label: "Analytics & Reporting",
    icon: "lucide/bar-chart-3",
  },
  { value: "collaboration", label: "Team Collaboration", icon: "lucide/users" },
];

const TEAM_SIZES = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201-500", label: "201-500" },
  { value: "500+", label: "500+" },
];

const TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This month" },
  { value: "exploring", label: "Just exploring" },
];

interface DemoFormValues {
  useCase: string;
  teamSize: string;
  timeline: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  updates: boolean;
}

export interface ContactDemoProps {
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
  submitClassName?: string; /**
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
   * formConfig={{ endpoint: "https://api.mysite.com/demo", format: "json" }}
   *
   * @example
   * // With custom headers (e.g., authentication)
   * formConfig={{
   *   endpoint: "/api/demo",
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
   *   await fetch("/api/demo", {
   *     method: "POST",
   *     body: JSON.stringify(values)
   *   });
   * }}
   */
  onSubmit?: (values: DemoFormValues) => void | Promise<void>;
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
 * ContactDemo - A demo request form with use case selection, team size,
 * and timeline information. Perfect for SaaS products and B2B services.
 *
 * @example
 * ```tsx
 * <ContactDemo
 *   heading="Request a Demo"
 *   description="See how we can help your team work smarter."
 *   buttonText="Request Demo"
 *   formConfig={{ endpoint: "/api/demo", format: "json" }}
 * />
 * ```
 */
export function ContactDemo({
  heading,
  description,
  buttonText,
  buttonIcon,
  actions,
  actionsSlot,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  formClassName,
  submitClassName,
  spacing = "py-8 md:py-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  background,
  pattern,
  patternOpacity,

  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactDemoProps): React.JSX.Element {
  const form = useForm<DemoFormValues>({
    initialValues: {
      useCase: "",
      teamSize: "",
      timeline: "",
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      jobTitle: "",
      updates: false,
    },
    validationSchema: {
      useCase: (value) => (!value ? "Please select a use case" : undefined),
      teamSize: (value) => (!value ? "Please select team size" : undefined),
      timeline: (value) => (!value ? "Please select a timeline" : undefined),
      firstName: (value) => (!value ? "First name is required" : undefined),
      lastName: (value) => (!value ? "Last name is required" : undefined),
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return undefined;
      },
      company: (value) => (!value ? "Company is required" : undefined),
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

  const actionsContent = React.useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (actions && actions.length > 0) {
      return actions.map((action, index) => {
        const {
          label,
          icon,
          iconAfter,
          children,
          className: actionClassName,
          ...pressableProps
        } = action;
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
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className={cn("mb-10 text-center", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-3 text-3xl font-bold tracking-tight text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "leading-relaxed text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>

        <Card className={cardClassName}>
          <CardContent className={cn("p-6 lg:p-8", cardContentClassName)}>
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              className={cn("space-y-8", formClassName)}
            >
              {/* Use Case Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  What's your primary use case?
                </h3>
                <Field name="useCase">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Select
                        {...field}
                        id="use-case"
                        error={meta.touched && !!meta.error}
                        aria-label="Use Case"
                      >
                        <option value="">Select a use case</option>
                        {USE_CASES.map((useCase) => (
                          <option key={useCase.value} value={useCase.value}>
                            {useCase.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}
                </Field>
              </div>

              <Separator />

              {/* Team & Timeline */}
              <div className="grid gap-6 sm:grid-cols-2">
                <Field name="teamSize">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="team-size">Team Size</Label>
                      <Select
                        {...field}
                        id="team-size"
                        error={meta.touched && !!meta.error}
                        aria-label="Team Size"
                      >
                        <option value="">Select team size</option>
                        {TEAM_SIZES.map((size) => (
                          <option key={size.value} value={size.value}>
                            {size.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}
                </Field>

                <Field name="timeline">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="timeline">When do you need this?</Label>
                      <Select
                        {...field}
                        id="timeline"
                        error={meta.touched && !!meta.error}
                        aria-label="Timeline"
                      >
                        <option value="">Select timeline</option>
                        {TIMELINES.map((time) => (
                          <option key={time.value} value={time.value}>
                            {time.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}
                </Field>
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

                <Field name="email">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <TextInput
                        {...field}
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        error={meta.touched && !!meta.error}
                        aria-label="Work Email"
                      />
                    </div>
                  )}
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
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
                  <Field name="jobTitle">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="job-title">Job Title (Optional)</Label>
                        <TextInput
                          {...field}
                          id="job-title"
                          placeholder="Product Manager"
                          error={meta.touched && !!meta.error}
                          aria-label="Job Title"
                        />
                      </div>
                    )}
                  </Field>
                </div>

                <Field name="updates">
                  {({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="updates"
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                      />
                      <Label
                        htmlFor="updates"
                        className="cursor-pointer text-sm font-normal"
                      >
                        Send me product updates and announcements
                      </Label>
                    </div>
                  )}
                </Field>
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
                  {buttonIcon ?? (
                    <DynamicIcon
                      name="lucide/calendar"
                      size={16}
                      className="mr-2"
                    />
                  )}
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
