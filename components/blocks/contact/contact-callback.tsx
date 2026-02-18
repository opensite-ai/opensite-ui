"use client";

import * as React from "react";
import { useMemo } from "react";
import { Form } from "@page-speed/forms";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardContent } from "../../ui/card";
import { DynamicFormField } from "../../ui/dynamic-form-field";
import type { FormFieldConfig } from "../../../lib/form-field-types";
import { getColumnSpanClass } from "../../../lib/form-field-types";
import { useContactForm, type PageSpeedFormConfig } from "../../../lib/forms";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

// Default form fields for callback scheduling
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "name",
    type: "text",
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
    columnSpan: 6,
  },
  {
    name: "company",
    type: "text",
    label: "Company",
    placeholder: "Acme Inc.",
    required: false,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "john@example.com",
    required: true,
    columnSpan: 6,
  },
  {
    name: "phone",
    type: "tel",
    label: "Phone Number",
    placeholder: "+1 (555) 000-0000",
    required: true,
    columnSpan: 6,
  },
  {
    name: "date",
    type: "date",
    label: "Preferred Date",
    placeholder: "",
    required: true,
    columnSpan: 6,
  },
  {
    name: "time",
    type: "select",
    label: "Preferred Time",
    placeholder: "Select a time",
    required: true,
    columnSpan: 6,
    options: [
      { value: "9:00 AM", label: "9:00 AM" },
      { value: "10:00 AM", label: "10:00 AM" },
      { value: "11:00 AM", label: "11:00 AM" },
      { value: "12:00 PM", label: "12:00 PM" },
      { value: "1:00 PM", label: "1:00 PM" },
      { value: "2:00 PM", label: "2:00 PM" },
      { value: "3:00 PM", label: "3:00 PM" },
      { value: "4:00 PM", label: "4:00 PM" },
      { value: "5:00 PM", label: "5:00 PM" },
    ],
  },
  {
    name: "timezone",
    type: "select",
    label: "Timezone",
    placeholder: "",
    required: true,
    columnSpan: 12,
    options: [
      { value: "est", label: "Eastern Time (EST)" },
      { value: "cst", label: "Central Time (CST)" },
      { value: "mst", label: "Mountain Time (MST)" },
      { value: "pst", label: "Pacific Time (PST)" },
    ],
  },
  {
    name: "topic",
    type: "select",
    label: "Topic",
    placeholder: "Select a topic",
    required: true,
    columnSpan: 12,
    options: [
      { value: "product-demo", label: "Product Demo" },
      { value: "sales-inquiry", label: "Sales Inquiry" },
      { value: "technical-support", label: "Technical Support" },
      { value: "partnership", label: "Partnership" },
      { value: "general-question", label: "General Question" },
    ],
  },
  {
    name: "details",
    type: "textarea",
    label: "Additional Details (Optional)",
    placeholder:
      "Help us prepare for the call by sharing any specific questions or topics you'd like to cover...",
    required: false,
    rows: 4,
    columnSpan: 12,
  },
];

export interface ContactCallbackProps {
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
   * Array of form field configurations
   * If not provided, defaults to: name, company, email, phone, date, time, timezone, topic, details
   */
  formFields?: FormFieldConfig[];
  /**
   * Success message to display after form submission
   * @default "Thank you! Your callback request has been received."
   */
  successMessage?: React.ReactNode;
  /**
   * Label for the information section heading
   */
  infoSectionLabel?: string;
  /**
   * Label for the schedule section heading
   */
  scheduleSectionLabel?: string;
  /**
   * Label for the topic section heading
   */
  topicSectionLabel?: string;
  /**
   * Label for the callback process info box heading
   */
  callbackProcessLabel?: string;
  /**
   * Description for the callback process info box
   */
  callbackProcessDescription?: string;
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
   * Additional CSS classes for the success message
   */
  successMessageClassName?: string;
  /**
   * Additional CSS classes for the error message
   */
  errorMessageClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   * @default "py-8 md:py-32"
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
   * See `FORMS_INTEGRATION_GUIDE.md` for complete examples.
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Optional custom submission handler for maximum flexibility.
   */
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>;
  /**
   * Optional success callback invoked after successful submission.
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Optional error callback invoked if submission fails.
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
  heading,
  description,
  buttonText = "Schedule Callback",
  buttonIcon = <DynamicIcon name="lucide/phone" size={16} />,
  actions,
  actionsSlot,
  formFields,
  successMessage = "Thank you! Your callback request has been received.",
  infoSectionLabel,
  scheduleSectionLabel,
  topicSectionLabel,
  callbackProcessLabel,
  callbackProcessDescription,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  formClassName,
  submitClassName,
  successMessageClassName,
  errorMessageClassName,
  background,
  spacing = "py-8 md:py-32",
  pattern,
  patternOpacity,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactCallbackProps): React.JSX.Element {
  // Use the provided form fields or fall back to defaults
  const fields = useMemo(() => formFields || DEFAULT_FORM_FIELDS, [formFields]);

  // Initialize form with contact form hook
  const { form, submissionError, formMethod, resetSubmissionState } =
    useContactForm({
      formFields: fields,
      formConfig,
      onSubmit,
      onSuccess,
      onError,
    });

  // Render actions
  const actionsContent = useMemo(() => {
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
        {/* Header */}
        {(heading || description) && (
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
        )}

        {/* Form Card */}
        <Card className={cardClassName}>
          <CardContent className={cn("p-6 lg:p-8", cardContentClassName)}>
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              submissionError={submissionError}
              successMessage={successMessage}
              successMessageClassName={successMessageClassName}
              errorMessageClassName={errorMessageClassName}
              submissionConfig={formConfig?.submissionConfig}
              onNewSubmission={resetSubmissionState}
              className={cn("space-y-6", formClassName)}
            >
              <div className="grid grid-cols-12 gap-6">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={getColumnSpanClass(field.columnSpan)}
                  >
                    <DynamicFormField field={field} />
                  </div>
                ))}
              </div>

              {/* Optional Info Box */}
              {(callbackProcessLabel || callbackProcessDescription) && (
                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <DynamicIcon
                      name="lucide/clock"
                      size={20}
                      className="mt-1 shrink-0"
                    />
                    <div className="text-sm">
                      {callbackProcessLabel && (
                        <p className="font-medium">{callbackProcessLabel}</p>
                      )}
                      {callbackProcessDescription && (
                        <p className="mt-1 leading-relaxed">
                          {callbackProcessDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              {actionsSlot || (actions && actions.length > 0) ? (
                actionsContent
              ) : (
                <Pressable
                  componentType="button"
                  type="submit"
                  className={cn("w-full gap-2", submitClassName)}
                  size="lg"
                  asButton
                  disabled={form.isSubmitting}
                >
                  {buttonIcon}
                  {buttonText || "Schedule Callback"}
                </Pressable>
              )}
            </Form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
