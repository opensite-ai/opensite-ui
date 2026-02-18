"use client";

import * as React from "react";
import { useMemo } from "react";
import { Form, Field } from "@page-speed/forms";
import {
  DynamicFormField,
  getColumnSpanClass,
  useContactForm,
  useFileUpload,
  type FormFieldConfig,
  type PageSpeedFormConfig,
} from "@page-speed/forms/integration";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

const PRIORITIES = [
  {
    value: "critical",
    label: "Critical",
    description: "System down, business stopped",
    response: "15 min",
  },
  {
    value: "high",
    label: "High",
    description: "Major impact, needs attention",
    response: "2 hours",
  },
  {
    value: "normal",
    label: "Normal",
    description: "Standard request",
    response: "24 hours",
  },
];

// Default form fields
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "priority",
    type: "radio",
    label: "Priority Level",
    required: true,
    columnSpan: 12,
    options: PRIORITIES.map((p) => ({ value: p.value, label: p.label })),
  },
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Your name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "you@company.com",
    required: true,
    columnSpan: 6,
  },
  {
    name: "phone",
    type: "tel",
    label: "Phone (Optional)",
    placeholder: "+1 (555) 000-0000",
    required: false,
    columnSpan: 12,
  },
  {
    name: "subject",
    type: "text",
    label: "Subject",
    placeholder: "Brief summary of the issue",
    required: true,
    columnSpan: 12,
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Describe the issue, what you've tried, and the impact...",
    required: true,
    rows: 4,
    columnSpan: 12,
  },
];

export interface ContactEmergencyProps {
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Submit button text
   */
  buttonText?: string;
  /**
   * Icon to display in submit button
   */
  buttonIcon?: React.ReactNode;
  /**
   * Array of action configurations for custom buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of form field configurations
   * If not provided, defaults to: priority, name, email, phone, subject, description
   */
  formFields?: FormFieldConfig[];
  /**
   * Success message to display after form submission
   * @default "Thank you! Your emergency request has been received."
   */
  successMessage?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
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
   * Form configuration for PageSpeed forms
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Custom submit handler
   */
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  /**
   * Success callback
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Error callback
   */
  onError?: (error: Error) => void;
}

/**
 * ContactEmergency - Urgent support form with priority level selection.
 * Features priority-based response time indicators and emergency contact information.
 *
 * @example
 * ```tsx
 * <ContactEmergency
 *   heading="Urgent Support"
 *   formConfig={{ endpoint: "/api/emergency", format: "json" }}
 * />
 * ```
 */
export function ContactEmergency({
  heading,
  description,
  buttonText = "Submit Emergency Request",
  buttonIcon,
  actions,
  actionsSlot,
  formFields = DEFAULT_FORM_FIELDS,
  successMessage = "Thank you! Your emergency request has been received.",
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  formClassName,
  submitClassName,
  successMessageClassName,
  errorMessageClassName,
  spacing = "py-8 md:py-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  background,
  pattern,
  patternOpacity,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactEmergencyProps): React.JSX.Element {
  // File upload hook
  const {
    uploadTokens,
    uploadProgress,
    isUploading,
    uploadFiles,
    removeFile,
    resetUpload,
  } = useFileUpload({ onError });

  // Contact form hook with file upload integration
  const { form, submissionError, formMethod, resetSubmissionState } =
    useContactForm({
      formFields,
      formConfig,
      onSubmit,
      onSuccess: (data) => {
        resetUpload();
        onSuccess?.(data);
      },
      onError,
      resetOnSuccess: formConfig?.resetOnSuccess !== false,
      uploadTokens,
    });

  // Get the priority field from formFields for custom rendering
  const priorityField = formFields.find((f) => f.name === "priority");
  const otherFields = formFields.filter((f) => f.name !== "priority");

  const selectedPriority = PRIORITIES.find(
    (p) => p.value === form.values.priority,
  );

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
              notificationConfig={{
                submissionError,
                successMessage,
              }}
              styleConfig={{
                formClassName,
                successMessageClassName,
                errorMessageClassName,
              }}
              formConfig={{
                endpoint: formConfig?.endpoint,
                method: formMethod,
                submissionConfig: formConfig?.submissionConfig,
              }}
              onNewSubmission={() => {
                resetUpload();
                resetSubmissionState();
              }}
            >
              <div className="grid md:grid-cols-2">
                {/* Left: Priority Selection */}
                <div className="border-b p-6 md:border-b-0 md:border-r">
                  <div className="mb-6 flex items-center gap-2">
                    <DynamicIcon name="lucide/alert-triangle" size={20} />
                    <h3 className="font-semibold">Priority Level</h3>
                  </div>

                  {priorityField && (
                    <Field name="priority">
                      {({ field }) => (
                        <div className="space-y-3">
                          {PRIORITIES.map((item) => (
                            <label
                              key={item.value}
                              htmlFor={`priority-${item.value}`}
                              className={cn(
                                "flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors",
                                field.value === item.value
                                  ? "border-primary"
                                  : "hover:border-foreground",
                              )}
                            >
                              <input
                                type="radio"
                                id={`priority-${item.value}`}
                                name="priority"
                                value={item.value}
                                checked={field.value === item.value}
                                onChange={field.onChange}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">
                                    {item.label}
                                  </span>
                                  <Badge variant="secondary" className="text-xs">
                                    <DynamicIcon
                                      name="lucide/clock"
                                      size={12}
                                      className="mr-1"
                                    />
                                    {item.response}
                                  </Badge>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </Field>
                  )}

                  <Separator className="my-6" />

                  {/* Phone Option for Critical */}
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <DynamicIcon name="lucide/phone" size={20} />
                      <div>
                        <p className="font-medium">Call for Critical Issues</p>
                        <p className="text-sm ">+1 (555) 911-0000</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs">
                      Available 24/7 for critical emergencies only
                    </p>
                  </div>
                </div>

                {/* Right: Contact Form */}
                <div className="p-6">
                  <div className="mb-6 flex items-center gap-2">
                    <DynamicIcon name="lucide/send" size={20} />
                    <h3 className="font-semibold">Describe Your Issue</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4">
                      {otherFields.map((field) => (
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

                    <Separator />

                    {actionsSlot || (actions && actions.length > 0) ? (
                      actionsContent
                    ) : (
                      <Pressable
                        componentType="button"
                        type="submit"
                        className={cn("w-full", submitClassName)}
                        size="lg"
                        asButton
                        disabled={form.isSubmitting}
                      >
                        {buttonIcon}
                        {buttonText}
                      </Pressable>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
