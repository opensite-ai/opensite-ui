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
import {
  useContactForm,
  useFileUpload,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

// Default form fields for careers application
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "position",
    type: "select",
    label: "Position Applying For",
    placeholder: "Select a position",
    required: true,
    columnSpan: 12,
    options: [
      { value: "frontend", label: "Frontend Developer" },
      { value: "backend", label: "Backend Developer" },
      { value: "fullstack", label: "Full Stack Developer" },
      { value: "designer", label: "Product Designer" },
      { value: "pm", label: "Product Manager" },
      { value: "marketing", label: "Marketing Manager" },
      { value: "other", label: "Other" },
    ],
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
    name: "linkedin",
    type: "url",
    label: "LinkedIn Profile",
    placeholder: "https://linkedin.com/in/yourprofile",
    required: false,
    columnSpan: 6,
  },
  {
    name: "portfolio",
    type: "url",
    label: "Portfolio/Website",
    placeholder: "https://yourportfolio.com",
    required: false,
    columnSpan: 6,
  },
  {
    name: "availability",
    type: "select",
    label: "Availability",
    placeholder: "Select your availability",
    required: true,
    columnSpan: 12,
    options: [
      { value: "immediately", label: "Immediately" },
      { value: "2-weeks", label: "2 weeks notice" },
      { value: "1-month", label: "1 month notice" },
      { value: "flexible", label: "Flexible" },
    ],
  },
  {
    name: "coverLetter",
    type: "textarea",
    label: "Cover Letter",
    placeholder: "Tell us why you'd be a great fit for this position...",
    required: true,
    rows: 6,
    columnSpan: 12,
  },
  {
    name: "resume",
    type: "file",
    label: "Resume/CV",
    placeholder: "Upload your resume (PDF, DOC, DOCX)",
    required: true,
    columnSpan: 12,
    accept: ".pdf,.doc,.docx",
  },
];

export interface ContactCareersProps {
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
   * If not provided, defaults to: position, firstName, lastName, email, phone, linkedin, portfolio, availability, coverLetter, resume
   */
  formFields?: FormFieldConfig[];
  /**
   * Success message to display after form submission
   * @default "Thank you for your application! We'll review it and get back to you soon."
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
   * Additional CSS classes for the submit button
   */
  submitClassName?: string;
  /**
   * Additional CSS classes for the form
   */
  formClassName?: string;
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
 * ContactCareers - A comprehensive job application form with position selection,
 * resume upload, and availability options. Perfect for career pages and job applications.
 *
 * @example
 * ```tsx
 * <ContactCareers
 *   heading="Join Our Team"
 *   description="We're always looking for talented people to join us."
 *   buttonText="Submit Application"
 *   formConfig={{ endpoint: "/api/careers", format: "json" }}
 * />
 * ```
 */
export function ContactCareers({
  heading,
  description,
  buttonText = "Submit Application",
  buttonIcon,
  actions,
  actionsSlot,
  formFields,
  successMessage = "Thank you for your application! We'll review it and get back to you soon.",
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  submitClassName,
  formClassName,
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
}: ContactCareersProps): React.JSX.Element {
  // Use the provided form fields or fall back to defaults
  const fields = useMemo(
    () => formFields || DEFAULT_FORM_FIELDS,
    [formFields]
  );

  // Initialize file upload hook
  const {
    uploadTokens,
    uploadProgress,
    isUploading,
    uploadFiles,
    removeFile,
    resetUpload,
  } = useFileUpload({ onError });

  // Initialize form with contact form hook
  const { form, submissionError, formMethod, resetSubmissionState } = useContactForm({
    formFields: fields,
    formConfig,
    onSubmit,
    onSuccess: (data) => {
      resetUpload();
      onSuccess?.(data);
    },
    onError,
    uploadTokens,
  });

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
        <div className={cn("mb-10 text-center", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-3 text-3xl font-bold tracking-tight",
                  headingClassName
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("leading-relaxed", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>

        <Card className={cardClassName}>
          <CardContent className={cn("p-0", cardContentClassName)}>
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              submissionError={submissionError}
              successMessage={successMessage}
              successMessageClassName={successMessageClassName}
              errorMessageClassName={errorMessageClassName}
              submissionConfig={formConfig?.submissionConfig}
              onNewSubmission={() => {
                resetUpload();
                resetSubmissionState();
              }}
              className={cn("p-6 space-y-6", formClassName)}
            >
              <div className="grid grid-cols-12 gap-6">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={getColumnSpanClass(field.columnSpan)}
                  >
                    <DynamicFormField
                      field={field}
                      uploadProgress={uploadProgress}
                      onFileUpload={uploadFiles}
                      onFileRemove={removeFile}
                      isUploading={isUploading}
                    />
                  </div>
                ))}
              </div>

              {/* Submit Button */}
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
                  {buttonIcon}
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
