"use client";

import * as React from "react";
import { useMemo } from "react";
import { Form } from "@page-speed/forms";
import "../../styles/forms.css";
import {
  cn,
  getNestedCardBg,
  getNestedCardTextColor,
} from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { DynamicFormField } from "../../ui/dynamic-form-field";
import type { FormFieldConfig } from "../../../lib/form-field-types";
import { getColumnSpanClass } from "../../../lib/form-field-types";
import {
  useContactForm,
  useFileUpload,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import {
  PatternBackground,
  type PatternName,
} from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
} from "../../../src/types";
import FormFeedback from "../../ui/form-feedback";

export interface DirectionConfig {
  desktop: "mediaRight" | "mediaLeft";
  mobile: "mediaTop" | "mediaBottom";
}

export interface ContactPhotographyProps {
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
  /** Additional CSS classes for the heading */
  headingClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the content area */
  contentClassName?: string;
  /** Additional CSS classes for the form */
  formClassName?: string;
  /** Additional CSS classes for the submit button */
  submitClassName?: string;
  /** Additional CSS classes for the success message */
  successMessageClassName?: string;
  /** Additional CSS classes for the error message */
  errorMessageClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /** Pattern background key or URL */
  pattern?: PatternName | undefined;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Image source URL */
  imageSrc?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Additional CSS classes for the image */
  imageClassName?: string;
  /** Optional Optix Flow configuration for image optimization */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Direction configuration for desktop and mobile layouts
   * @default { desktop: 'mediaRight', mobile: 'mediaTop' }
   */
  directionConfig?: DirectionConfig;

  /** Form configuration for PageSpeed forms */
  formConfig?: PageSpeedFormConfig;
  /** Custom submit handler */
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  /** Success callback */
  onSuccess?: (data: unknown) => void;
  /** Error callback */
  onError?: (error: Error) => void;
}

// Default form fields
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "first_name",
    type: "text",
    label: "First Name",
    placeholder: "First name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "last_name",
    type: "text",
    label: "Last Name",
    placeholder: "Last name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "your@email.com",
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

/**
 * ContactPhotography - A full-width split-screen contact form section with edge-to-edge design,
 * featuring text content and a form on one side and a large full-height image on the other.
 *
 * Layout: 50/50 split layout with content/form and image sections. Fully responsive with
 * configurable media placement for desktop and mobile.
 * Key features: Pattern background support, edge-to-edge design, no card wrapping.
 * Best for: Photography studios, creative services, visual-first contact pages.
 *
 * @example
 * ```tsx
 * <ContactPhotography
 *   heading="Photography Services"
 *   description="Book a photography session with us"
 *   buttonText="Send Message"
 *   imageSrc="/studio.jpg"
 *   background="dark"
 *   pattern="grid"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
export function ContactPhotography({
  heading,
  description,
  buttonText = "Submit",
  buttonIcon,
  actions,
  actionsSlot,
  formFields = DEFAULT_FORM_FIELDS,
  successMessage = "Thank you! Your message has been sent successfully.",
  className,
  headingClassName,
  descriptionClassName,
  contentClassName,
  formClassName,
  submitClassName,
  successMessageClassName,
  errorMessageClassName,
  background,
  pattern,
  patternOpacity,
  imageSrc,
  imageAlt,
  imageClassName,
  optixFlowConfig,
  directionConfig = { desktop: "mediaRight", mobile: "mediaTop" },

  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactPhotographyProps): React.JSX.Element {
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
  const { form, isSubmitted, submissionError, formMethod } = useContactForm({
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

  // Determine background color based on background variant
  const bgColorClass = useMemo(() => {
    switch (background) {
      case "dark":
        return "bg-foreground text-background";
      case "gray":
        return cn(
          getNestedCardBg(background),
          getNestedCardTextColor(background),
        );
      case "white":
        return "bg-background";
      default:
        return "bg-background";
    }
  }, [background]);

  // Determine flex direction based on directionConfig
  const desktopOrder =
    directionConfig.desktop === "mediaRight"
      ? "lg:flex-row"
      : "lg:flex-row-reverse";
  const mobileOrder =
    directionConfig.mobile === "mediaTop" ? "flex-col" : "flex-col-reverse";

  const contentArea = (
    <div
      className={cn(
        "relative flex w-full items-center lg:w-1/2",
        bgColorClass,
        contentClassName,
      )}
    >
      {/* Pattern Background */}
      {pattern && (
        <div className="absolute inset-0 overflow-hidden">
          <PatternBackground pattern={pattern} opacity={patternOpacity} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
        <div className="mx-auto max-w-xl space-y-8">
          {/* Heading */}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}

          {/* Description */}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "text-base leading-relaxed opacity-90 sm:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}

          <FormFeedback
            isSubmitted={isSubmitted}
            successMessageClassName={successMessageClassName}
            successMessage={successMessage}
            submissionError={submissionError}
            errorMessageClassName={errorMessageClassName}
          />
          {/* Form */}
          <Form
            form={form}
            action={formConfig?.endpoint}
            method={formMethod}
            className={cn("space-y-4", formClassName)}
          >
            <div className="grid grid-cols-12 gap-4">
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
        </div>
      </div>
    </div>
  );

  const imageArea = imageSrc ? (
    <div className="relative h-64 w-full sm:h-96 lg:h-auto lg:w-1/2">
      <Img
        src={imageSrc}
        alt={imageAlt || ""}
        className={cn("h-full w-full object-cover", imageClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    </div>
  ) : null;

  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      <div className={cn("flex min-h-screen", mobileOrder, desktopOrder)}>
        {contentArea}
        {imageArea}
      </div>
    </section>
  );
}
