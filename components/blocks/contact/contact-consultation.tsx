"use client";

import * as React from "react";
import { useMemo } from "react";
import { Form } from "@page-speed/forms";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Card, CardContent } from "../../ui/card";
import { DynamicFormField } from "../../ui/dynamic-form-field";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { FormFieldConfig } from "../../../lib/form-field-types";
import { getColumnSpanClass } from "../../../lib/form-field-types";
import {
  useContactForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

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

// Default form fields for consultation booking
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "service",
    type: "select",
    label: "Service Needed",
    placeholder: "Select a service",
    required: true,
    columnSpan: 12,
    options: SERVICES,
  },
  {
    name: "duration",
    type: "select",
    label: "Preferred Duration",
    placeholder: "Select duration",
    required: false,
    columnSpan: 6,
    options: DURATIONS,
  },
  {
    name: "budget",
    type: "select",
    label: "Project Budget",
    placeholder: "Select budget range",
    required: false,
    columnSpan: 6,
    options: BUDGETS,
  },
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    placeholder: "John",
    required: true,
    columnSpan: 6,
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    placeholder: "Doe",
    required: true,
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
    name: "company",
    type: "text",
    label: "Company Name",
    placeholder: "Acme Inc.",
    required: false,
    columnSpan: 12,
  },
  {
    name: "details",
    type: "textarea",
    label: "Tell us about your needs",
    placeholder: "Describe your project, goals, and any specific challenges...",
    required: false,
    rows: 4,
    columnSpan: 12,
  },
];

export interface ContactConsultationProps {
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
   * If not provided, defaults to: service, duration, budget, firstName, lastName, email, phone, company, details
   */
  formFields?: FormFieldConfig[];
  /**
   * Success message to display after form submission
   * @default "Thank you for your consultation request! We'll be in touch within 24 hours to schedule your session."
   */
  successMessage?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   * @default "px-6 sm:px-6 md:px-8 lg:px-8"
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
   * Additional CSS classes for success message
   */
  successMessageClassName?: string;
  /**
   * Additional CSS classes for error message
   */
  errorMessageClassName?: string;
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
   * Optional form submission configuration. See FORMS_INTEGRATION_GUIDE.md for complete examples.
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Optional custom submission handler.
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
  heading,
  description,
  buttonText = "Book Consultation",
  buttonIcon,
  actions,
  actionsSlot,
  formFields,
  successMessage = "Thank you for your consultation request! We'll be in touch within 24 hours to schedule your session.",
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  formClassName,
  successMessageClassName,
  errorMessageClassName,
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
}: ContactConsultationProps): React.JSX.Element {
  // Use the provided form fields or fall back to defaults
  const fields = useMemo(
    () => formFields || DEFAULT_FORM_FIELDS,
    [formFields]
  );

  // Contact form hook
  const { form, submissionError, formMethod, resetSubmissionState } = useContactForm({
    formFields: fields,
    formConfig,
    onSubmit,
    onSuccess,
    onError,
  });

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
                  <div key={field.name} className={getColumnSpanClass(field.columnSpan)}>
                    <DynamicFormField field={field} />
                  </div>
                ))}
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
                      name="lucide/calendar-check"
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
