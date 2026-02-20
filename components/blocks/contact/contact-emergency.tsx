"use client";

import * as React from "react";
import { useMemo } from "react";
import { Form } from "@page-speed/forms";
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
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Configuration for a contact info item in the emergency contact grid.
 */
export interface ContactInfoItem {
  /**
   * Icon name for DynamicIcon (e.g., "lucide/phone")
   */
  icon: string;
  /**
   * Icon size in pixels
   * @default 28
   */
  iconSize?: number;
  /**
   * Primary label/title for the item
   */
  title: string;
  /**
   * Secondary text (e.g., phone number, email)
   */
  subtitle: string;
  /**
   * Link URL (e.g., "tel:+15551234567", "mailto:support@example.com")
   */
  href: string;
  /**
   * Additional CSS classes for the item container
   */
  className?: string;
}

/**
 * Default emergency contact items
 */
const DEFAULT_CONTACT_ITEMS: ContactInfoItem[] = [
  {
    icon: "lucide/phone",
    title: "Critical Hotline",
    subtitle: "+1 (555) 911-0000",
    href: "tel:+15559110000",
  },
  {
    icon: "lucide/mail",
    title: "Email Support",
    subtitle: "emergency@support.com",
    href: "mailto:emergency@support.com",
  },
  {
    icon: "lucide/message-circle",
    title: "Live Chat",
    subtitle: "24/7 Available",
    href: "#chat",
  },
  {
    icon: "lucide/map-pin",
    title: "Visit Us",
    subtitle: "123 Support Lane",
    href: "#location",
  },
];

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
   * Array of emergency contact info items to display in the grid
   */
  contactItems?: ContactInfoItem[];
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
  contactItems = DEFAULT_CONTACT_ITEMS,
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
  formClassName,
  submitClassName,
  successMessageClassName,
  errorMessageClassName,
  spacing = "py-8 md:py-32",
  containerClassName = "w-full max-w-full relative z-10 px-6 sm:px-6 md:px-8 lg:px-8",
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

  const otherFields = formFields.filter((f) => f.name !== "priority");

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
          <div className="flex">
            <div className={cn("p-0 md:p-12")}>
              <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                <div className="border-b border-border/60 p-6 md:border-b-0 md:border-r md:border-border/60">
                  <div className="flex flex-col items-start gap-8 md:gap-12">
                    <div
                      className={cn(
                        "flex flex-col items-start gap-4 text-left",
                        headerClassName,
                      )}
                    >
                      {heading &&
                        (typeof heading === "string" ? (
                          <h2
                            className={cn(
                              "text-4xl lg:text-5xl xl:text-6xl font-bold",
                              headingClassName,
                            )}
                          >
                            {heading}
                          </h2>
                        ) : (
                          heading
                        ))}
                      {description &&
                        (typeof description === "string" ? (
                          <p
                            className={cn(
                              "leading-relaxed",
                              descriptionClassName,
                            )}
                          >
                            {description}
                          </p>
                        ) : (
                          description
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {contactItems && contactItems.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                  {contactItems.map((item, index) => (
                    <Pressable
                      key={index}
                      href={item.href}
                      className={cn(
                        "rounded-md border bg-muted ring-2",
                        "text-muted-foreground px-4 py-3 flex",
                        "justify-start items-start transition-shadow",
                        "duration-500 hover:shadow-xl",
                        item.className,
                      )}
                    >
                      <div className="flex items-center gap-1">
                        {item.icon ? (
                          <div className="flex items-center justify-center p-2 rounded-xl border bg-primary text-primary-foreground">
                            <DynamicIcon
                              name={item.icon}
                              size={item.iconSize ?? 24}
                            />
                          </div>
                        ) : null}
                        <div>
                          <p className="font-bold text-xs uppercase opacity-70">
                            {item.title}
                          </p>
                          <p className="text-md font-semibold">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </Pressable>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
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
        </Form>
      </div>
    </Section>
  );
}
