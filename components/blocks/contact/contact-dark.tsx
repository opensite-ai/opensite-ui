"use client";

import * as React from "react";
import { Form } from "@page-speed/forms";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card } from "../../ui/card";
import { DynamicFormField } from "../../ui/dynamic-form-field";
import type { FormFieldConfig } from "../../../lib/form-field-types";
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

export interface ContactDarkOption {
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

export interface ContactDarkSocialLink {
  /**
   * Icon name for the social platform
   */
  icon: string;
  /**
   * Link href
   */
  href: string;
  /**
   * Accessible label for the link
   */
  label: string;
}

export interface ContactDarkProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below the heading
   */
  description?: React.ReactNode;
  /**
   * Contact information heading
   */
  contactHeading?: React.ReactNode;
  /**
   * Contact information description
   */
  contactDescription?: React.ReactNode;
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
  contactOptions?: ContactDarkOption[];
  /**
   * Custom slot for rendering contact options (overrides contactOptions array)
   */
  contactOptionsSlot?: React.ReactNode;
  /**
   * Social media links to display
   */
  socialLinks?: ContactDarkSocialLink[];
  /**
   * Custom slot for rendering social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Array of form field configurations
   * If not provided, defaults to: firstName, lastName, email, message
   */
  formFields?: FormFieldConfig[];
  /**
   * Success message to display after form submission
   * @default "Thank you! Your message has been sent successfully."
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
   * Additional CSS classes for the form panel
   */
  formPanelClassName?: string;
  /**
   * Additional CSS classes for the form
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the submit button
   */
  submitClassName?: string;
  /**
   * Additional CSS classes for the info panel
   */
  infoPanelClassName?: string;
  /**
   * Additional CSS classes for the contact options container
   */
  contactOptionsClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
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
   * Optional form submission configuration.
   *
   * **Universal Usage**: Works with ANY REST API endpoint. Simply provide an `endpoint` URL
   * and the form will submit to it in JSON format.
   *
   * @example
   * // Works with any API
   * formConfig={{ endpoint: "https://api.mysite.com/contact", format: "json" }}
   *
   * @example
   * // With custom headers (e.g., authentication)
   * formConfig={{
   *   endpoint: "/api/contact",
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
   *   await fetch("/api/contact", {
   *     method: "POST",
   *     body: JSON.stringify(values)
   *   });
   * }}
   */
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
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

// Default form fields
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    placeholder: "First name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    placeholder: "Last name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "your@email.com",
    required: true,
    columnSpan: 12,
  },
  {
    name: "message",
    type: "textarea",
    label: "Message",
    placeholder: "Your message...",
    required: true,
    rows: 4,
    columnSpan: 12,
  },
];

/**
 * ContactDark - A dark-themed contact form with split layout featuring a form
 * on one side and contact information with social links on a dark background.
 * Perfect for modern, high-contrast designs.
 *
 * @example
 * ```tsx
 * <ContactDark
 *   heading="Contact Us"
 *   description="Any questions or remarks? Just write us a message!"
 *   buttonText="Send Message"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
export function ContactDark({
  heading,
  description,
  contactHeading = "Contact Information",
  contactDescription = "Fill up the form and our team will get back to you within 24 hours.",
  buttonText = "Submit",
  buttonIcon,
  actions,
  actionsSlot,
  contactOptions,
  contactOptionsSlot,
  socialLinks,
  socialLinksSlot,
  formFields = DEFAULT_FORM_FIELDS,
  successMessage = "Thank you! Your message has been sent successfully.",
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  formPanelClassName,
  formClassName,
  submitClassName,
  infoPanelClassName,
  contactOptionsClassName,
  socialLinksClassName,
  successMessageClassName,
  errorMessageClassName,
  background,
  spacing = "py-8 md:py-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,

  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactDarkProps): React.JSX.Element {
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

  const contactOptionsContent = React.useMemo(() => {
    if (contactOptionsSlot) return contactOptionsSlot;
    if (contactOptions && contactOptions.length > 0) {
      return contactOptions.map((option, key) => (
        <div key={key} className="flex items-center gap-3">
          <DynamicIcon
            name={option.icon}
            size={16}
            className="text-primary-foreground/70"
          />
          {option.href ? (
            <Pressable
              href={option.href}
              className="text-sm text-primary-foreground"
            >
              {option.info}
            </Pressable>
          ) : (
            <span className="text-sm">{option.info}</span>
          )}
        </div>
      ));
    }
    return null;
  }, [contactOptionsSlot, contactOptions]);

  const socialLinksContent = React.useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (socialLinks && socialLinks.length > 0) {
      return socialLinks.map((social, key) => (
        <Pressable
          key={key}
          href={social.href}
          className={cn(
            "flex h-9 w-9 items-center justify-center",
            "rounded-xl border-2 transition-shadow duration-1000",
            "bg-primary text-primary-foreground border-primary-foreground",
            "shadow-sm hover:shadow-xl",
          )}
          aria-label={social.label}
        >
          <DynamicIcon name={social.icon} size={18} />
        </Pressable>
      ));
    }
    return null;
  }, [socialLinksSlot, socialLinks]);

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

        <Card
          className={cn(
            "grid gap-0 overflow-hidden grid-cols-1 lg:grid-cols-2 pt-0 pb-0",
            cardClassName,
          )}
        >
          <div className={cn("p-6 lg:p-12", formPanelClassName)}>
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
              className={formClassName}
            >
              {(() => {
                const fieldElements: React.ReactNode[] = [];
                let skip = false;

                formFields.forEach((field, index) => {
                  if (skip) {
                    skip = false;
                    return;
                  }

                  const nextField =
                    index < formFields.length - 1
                      ? formFields[index + 1]
                      : null;
                  const shouldGroupWithNext =
                    field.columnSpan &&
                    field.columnSpan <= 6 &&
                    nextField?.columnSpan &&
                    nextField.columnSpan <= 6 &&
                    field.columnSpan + nextField.columnSpan <= 12;

                  if (shouldGroupWithNext && nextField) {
                    fieldElements.push(
                      <div
                        key={field.name}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <DynamicFormField
                          field={field}
                          uploadProgress={uploadProgress}
                          onFileUpload={uploadFiles}
                          onFileRemove={removeFile}
                          isUploading={isUploading}
                        />
                        <DynamicFormField
                          field={nextField}
                          uploadProgress={uploadProgress}
                          onFileUpload={uploadFiles}
                          onFileRemove={removeFile}
                          isUploading={isUploading}
                        />
                      </div>,
                    );
                    skip = true;
                  } else {
                    fieldElements.push(
                      <DynamicFormField
                        key={field.name}
                        field={field}
                        uploadProgress={uploadProgress}
                        onFileUpload={uploadFiles}
                        onFileRemove={removeFile}
                        isUploading={isUploading}
                      />,
                    );
                  }
                });

                return fieldElements;
              })()}
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
          </div>

          <div
            className={cn(
              "flex flex-col justify-between bg-primary p-6 text-primary-foreground lg:p-8",
              infoPanelClassName,
            )}
          >
            <div>
              {contactHeading &&
                (typeof contactHeading === "string" ? (
                  <h3 className="mb-3 text-xl font-semibold">
                    {contactHeading}
                  </h3>
                ) : (
                  <div className="mb-3">{contactHeading}</div>
                ))}
              {contactDescription &&
                (typeof contactDescription === "string" ? (
                  <p className="mb-8 text-sm text-primary-foreground/80">
                    {contactDescription}
                  </p>
                ) : (
                  <div className="mb-8">{contactDescription}</div>
                ))}
              <div className={cn("space-y-4", contactOptionsClassName)}>
                {contactOptionsContent}
              </div>
            </div>
            <div
              className={cn(
                "mt-8 flex items-center gap-4",
                socialLinksClassName,
              )}
            >
              {socialLinksContent}
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
