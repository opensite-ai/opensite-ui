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
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Img } from "@page-speed/img";

// Default form fields
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "first_name",
    type: "text",
    label: "First Name",
    placeholder: "John",
    required: true,
    columnSpan: 6,
  },
  {
    name: "last_name",
    type: "text",
    label: "Last Name",
    placeholder: "Doe",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "john@example.com",
    required: true,
    columnSpan: 12,
  },
  {
    name: "phone",
    type: "tel",
    label: "Phone",
    placeholder: "+1 (555) 000-0000",
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

export interface ContactImageProps {
  /** Main heading text */
  heading?: React.ReactNode;
  /** Description text below heading */
  description?: React.ReactNode;
  /** Submit button text */
  buttonText?: string;
  /** Icon to display in submit button */
  buttonIcon?: React.ReactNode;
  /** Array of action configurations for custom buttons */
  actions?: ActionConfig[];
  /** Custom slot for rendering actions (overrides actions array) */
  actionsSlot?: React.ReactNode;
  /**
   * Array of form field configurations
   * If not provided, defaults to: first_name, last_name, email, phone, message
   */
  formFields?: FormFieldConfig[];
  /**
   * Success message to display after form submission
   * @default "Thank you! Your message has been sent successfully."
   */
  successMessage?: React.ReactNode;
  /** Additional CSS classes for the section */
  className?: string;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Additional CSS classes for the header */
  headerClassName?: string;
  /** Additional CSS classes for the heading */
  headingClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the card */
  cardClassName?: string;
  /** Additional CSS classes for the card content */
  cardContentClassName?: string;
  /** Additional CSS classes for the form */
  formClassName?: string;
  /** Additional CSS classes for the submit button */
  submitClassName?: string;
  /** Additional CSS classes for the success message */
  successMessageClassName?: string;
  /** Additional CSS classes for the error message */
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

  /** Form configuration for PageSpeed forms */
  formConfig?: PageSpeedFormConfig;
  /** Custom submit handler */
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  /** Success callback */
  onSuccess?: (data: unknown) => void;
  /** Error callback */
  onError?: (error: Error) => void;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * ContactImage - Contact form with flexible field configuration
 *
 * @example
 * ```tsx
 * <ContactImage
 *   heading="Get in Touch"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
export function ContactImage({
  heading,
  description,
  buttonText = "Submit",
  buttonIcon,
  actions,
  actionsSlot,
  formFields = DEFAULT_FORM_FIELDS,
  successMessage = "Thank you! Your message has been sent successfully.",
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  formClassName,
  submitClassName,
  successMessageClassName,
  errorMessageClassName,
  backgroundImage,
  background,
  optixFlowConfig,
  spacing = "none",
  className,
  containerClassName = "px-0 sm:px-0 lg:px-0 max-w-full relative z-10 h-screen w-screen flex justify-center items-center",
  contentClassName = "",
  pattern,
  patternOpacity = 0.1,

  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactImageProps): React.JSX.Element {
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

  const renderBackground = useMemo(() => {
    if (!backgroundImage) return null;

    return (
      <div className="absolute inset-0">
        <Img
          src={backgroundImage}
          alt="Full screen background image"
          className="h-full w-full object-cover"
          loading="eager"
          optixFlowConfig={optixFlowConfig}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/65 to-black/20" />
      </div>
    );
  }, [backgroundImage, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(
        "relative flex h-full min-h-screen w-screen items-center justify-center overflow-hidden bg-black pb-0 pt-0 md:pt-0 px-0",
        className,
      )}
      containerClassName={containerClassName}
    >
      {renderBackground}
      <div
        className={cn(
          "flex flex-col gap-4 md:gap-6 px-6 pt-28 pb-6 md:pt-0 md:pb-0",
          "relative z-30 m-auto max-w-full md:max-w-md flex-col items-center justify-center text-center",
          contentClassName,
        )}
      >
        <Card className={cn("mx-auto max-w-xl", cardClassName)}>
          <CardContent className={cn("p-6 lg:p-8", cardContentClassName)}>
            {heading &&
              (typeof heading === "string" ? (
                <h2
                  className={cn(
                    "text-5xl md:text-6xl lg:text-7xl text-card-foreground text-shadow-2xl font-semibold",
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
                    "text-center text-base text-balance text-card-foreground text-shadow-2xl",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                description
              ))}

            <Form
              form={form}
              notificationConfig={{
                submissionError,
                successMessage,
              }}
              styleConfig={{
                formClassName: cn("space-y-4", formClassName),
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
              <div className="grid grid-cols-12 gap-6">
                {formFields.map((field) => (
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
            </Form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
