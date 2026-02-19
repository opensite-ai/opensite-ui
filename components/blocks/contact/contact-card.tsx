"use client";

import * as React from "react";
import { useMemo } from "react";
import { Form } from "@page-speed/forms";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card } from "../../ui/card";
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
import { BlockActions } from "@/components/ui/block-actions";

// Default form fields for contact card
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
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
    columnSpan: 12,
  },
  {
    name: "message",
    type: "textarea",
    label: "Message",
    placeholder: "How can we help you?",
    required: true,
    rows: 4,
    columnSpan: 12,
  },
  {
    name: "privacyPolicy",
    type: "checkbox",
    label: "I agree to the privacy policy",
    required: true,
    columnSpan: 12,
  },
];

export interface ContactOption {
  /**
   * Icon name for the contact option
   */
  icon: string;
  /**
   * Contact information text
   */
  info: string;
  /**
   * Optional href for the contact option
   */
  href?: string;
}

export interface ContactCardProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below the heading
   */
  description?: React.ReactNode;
  /**
   * Form card heading
   */
  formHeading?: React.ReactNode;
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
   * Contact options to display
   */
  contactOptions?: ContactOption[];
  /**
   * Custom slot for rendering contact options (overrides contactOptions array)
   */
  contactOptionsSlot?: React.ReactNode;
  /**
   * Array of form field configurations
   * If not provided, defaults to: firstName, lastName, email, message, privacyPolicy
   */
  formFields?: FormFieldConfig[];
  /**
   * Success message to display after form submission
   * @default "Thank you! We'll be in touch soon."
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
   * Additional CSS classes for the card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the form heading
   */
  formHeadingClassName?: string;
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
   * Additional CSS classes for the info panel
   */
  infoPanelClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the contact options container
   */
  contactOptionsClassName?: string;
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
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
}

/**
 * ContactCard - A simple contact form with card layout and contact information sidebar.
 * Perfect for basic contact pages with multiple contact methods displayed.
 *
 * @example
 * ```tsx
 * <ContactCard
 *   heading="Get in Touch"
 *   description="Have questions? We'd love to hear from you."
 *   formHeading="Contact us"
 *   buttonText="Send Message"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
export function ContactCard({
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  contactOptions,
  contactOptionsSlot,
  formFields,
  successMessage = "Thank you! We'll be in touch soon.",
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  cardClassName,
  formClassName,
  successMessageClassName,
  errorMessageClassName,
  infoPanelClassName,
  headingClassName,
  descriptionClassName,
  contactOptionsClassName,
  background,
  spacing = "py-16 md:py-32",
  pattern,
  patternOpacity,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactCardProps): React.JSX.Element {
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

  const contactOptionsContent = useMemo(() => {
    if (contactOptionsSlot) return contactOptionsSlot;
    if (contactOptions && contactOptions.length > 0) {
      return contactOptions.map((option, key) => (
        <Pressable
          variant="link"
          href={option.href}
          key={key}
          className="gap-4 font-bold"
        >
          <DynamicIcon name={option.icon} size={20} />
          {option.info}
        </Pressable>
      ));
    }
    return null;
  }, [contactOptionsSlot, contactOptions]);

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
        <div className="grid items-start gap-10 md:gap-12 lg:grid-cols-2">
          <Card className={cn("p-6 lg:p-8 order-2 md:order-1", cardClassName)}>
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
              <BlockActions
                actions={actions}
                actionsSlot={actionsSlot}
                actionsClassName={actionsClassName}
              />
            </Form>
          </Card>

          <div
            className={cn(
              "flex flex-col items-start gap-2 md:gap-4 order-1 md:order-2",
              infoPanelClassName,
            )}
          >
            {heading &&
              (typeof heading === "string" ? (
                <h2
                  className={cn(
                    "text-4xl lg:text-6xl font-bold tracking-tight text-pretty",
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
                    "leading-relaxed text-pretty text-lg opacity-70",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                description
              ))}
            <div
              className={cn(
                "mt-4 space-y-4 w-full md:w-fit px-6 py-6 md:px-12 md:py-8 bg-muted rounded-xl text-sm md:text-normal flex flex-col items-start gap-1",
                contactOptionsClassName,
              )}
            >
              {contactOptionsContent}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
