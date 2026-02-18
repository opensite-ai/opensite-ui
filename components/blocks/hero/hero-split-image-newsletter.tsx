"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { Form } from "@page-speed/forms";
import {
  DynamicFormField,
  useContactForm,
  useFileUpload,
  type FormFieldConfig,
  type PageSpeedFormConfig,
} from "@page-speed/forms/integration";

const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
    columnSpan: 12,
  },
];

export interface HeroSplitImageNewsletterProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Form field configuration
   */
  formFields?: FormFieldConfig[];
  /**
   * Form configuration for submission
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
  /**
   * Success message to display
   */
  successMessage?: React.ReactNode;
  /**
   * Submit button configuration
   */
  buttonAction?: ActionConfig;
  /**
   * Helper text below form
   */
  helperText?: React.ReactNode;
  /**
   * Custom slot for form (overrides form props)
   */
  formSlot?: React.ReactNode;
  /**
   * Feature image on the right side
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
   */
  imageSlot?: React.ReactNode; /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;

  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroSplitImageNewsletter({
  heading,
  description,
  formFields = DEFAULT_FORM_FIELDS,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
  successMessage,
  buttonAction,
  helperText,
  formSlot,
  image,
  imageSlot,
  background,
  spacing = "xl",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroSplitImageNewsletterProps): React.JSX.Element {
  const {
    uploadTokens,
    uploadProgress,
    isUploading,
    uploadFiles,
    removeFile,
    resetUpload,
  } = useFileUpload({ onError });

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
      uploadTokens,
    });

  const renderForm = React.useMemo(() => {
    if (formSlot) return formSlot;

    const defaultButtonAction: ActionConfig = {
      label: "Subscribe",
      variant: "default",
      className: "h-12",
    };

    const action = buttonAction || defaultButtonAction;

    return (
      <Form
        form={form}
        fields={formFields}
        notificationConfig={{
          submissionError,
          successMessage,
        }}
        formConfig={{
          endpoint: formConfig?.endpoint,
          method: formMethod,
          submissionConfig: formConfig?.submissionConfig,
          formLayout: "button-group",
          buttonGroupSize: "default",
          submitLabel: action.label,
          submitVariant: action.variant || "default",
        }}
        onNewSubmission={() => {
          resetUpload();
          resetSubmissionState();
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          {formFields.map((field) => (
            <div key={field.name} className="flex-1">
              <DynamicFormField
                field={field}
                uploadProgress={uploadProgress}
                onFileUpload={uploadFiles}
                onFileRemove={removeFile}
                isUploading={isUploading}
              />
            </div>
          ))}
          <Pressable
            onClick={form.handleSubmit}
            asButton
            variant={action.variant}
            className={cn("h-12", action.className)}
            disabled={form.isSubmitting}
          >
            {action.label}
            {action.iconAfter}
          </Pressable>
        </div>
        {helperText &&
          (typeof helperText === "string" ? (
            <p className={cn("text-sm mt-2")}>{helperText}</p>
          ) : (
            helperText
          ))}
      </Form>
    );
  }, [
    formSlot,
    formFields,
    form,
    formConfig,
    formMethod,
    buttonAction,
    uploadProgress,
    uploadFiles,
    removeFile,
    isUploading,
    submissionError,
    successMessage,
    helperText,
    resetUpload,
    resetSubmissionState,
  ]);

  const renderImage = React.useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div className="relative lg:w-1/2">
        <Img
          src={image.src}
          alt={image.alt}
          className={cn(
            "w-full rounded-2xl object-cover shadow-2xl",
            imageClassName,
            image.className,
          )}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  }, [imageSlot, image, imageClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative flex items-center justify-center", className)}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-20">
        <div
          className={cn(
            "flex flex-col gap-8 lg:w-1/2 pt-8 md:pt-0",
            contentClassName,
          )}
        >
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-5xl font-bold md:text-6xl lg:text-7xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <h1
                className={cn(
                  "text-5xl font-bold md:text-6xl lg:text-7xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "text-lg md:text-xl text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          {renderForm}
        </div>
        {renderImage}
      </div>
    </Section>
  );
}
