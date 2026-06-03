"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
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
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

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

export interface BrowserPreviewConfig {
  /**
   * URL displayed in browser bar
   */
  url?: string;
  /**
   * Dashboard preview image
   */
  image?: ImageItem;
}

export interface HeroSaasDashboardPreviewProps {
  /**
   * Badge text with icon
   */
  badgeText?: React.ReactNode;
  /**
   * Badge icon name
   */
  badgeIcon?: string;
  /**
   * Custom slot for badge (overrides badge props)
   */
  badgeSlot?: React.ReactNode;
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
   * Browser preview configuration
   */
  browserPreview?: BrowserPreviewConfig;
  /**
   * Custom slot for browser preview (overrides browserPreview prop)
   */
  browserPreviewSlot?: React.ReactNode; /**
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
   * Additional CSS classes for the header area
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
   * Additional CSS classes for the preview area
   */
  previewClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroSaasDashboardPreview({
  sectionId = "hero-saas-dashboard-preview",
  badgeText,
  badgeIcon,
  badgeSlot,
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
  browserPreview,
  browserPreviewSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  previewClassName,
  optixFlowConfig,
  logo,
  logoSlot,
  logoClassName,
}: HeroSaasDashboardPreviewProps): React.JSX.Element {
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

  const renderBadge = React.useMemo(() => {
    if (badgeSlot) return badgeSlot;

    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm bg-muted text-muted-foreground",
        )}
      >
        {badgeIcon && <DynamicIcon name={badgeIcon} size={16} />}
        {badgeText && <span>{badgeText}</span>}
      </div>
    );
  }, [badgeSlot, badgeIcon, badgeText]);

  const renderForm = React.useMemo(() => {
    if (formSlot) return formSlot;

    const defaultButtonAction: ActionConfig = {
      label: "Start Free Trial",
      variant: "default",
      className: "h-12",
    };

    const action = buttonAction || defaultButtonAction;

    return (
      <div className="mt-4 md:mt-6 w-full flex items-center justify-center">
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
            buttonGroupSize: "lg",
            submitLabel: action.label,
            submitVariant: action.variant || "default",
          }}
          onNewSubmission={() => {
            resetUpload();
            resetSubmissionState();
          }}
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="flex w-full max-w-md items-center gap-2">
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
              </Pressable>
            </div>
          </div>
          {helperText &&
            (typeof helperText === "string" ? (
              <p className={cn("text-sm text-center mt-4")}>{helperText}</p>
            ) : (
              helperText
            ))}
        </Form>
      </div>
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

  const renderBrowserPreview = React.useMemo(() => {
    if (browserPreviewSlot) return browserPreviewSlot;
    if (!browserPreview) return null;

    return (
      <div className={cn("relative mt-12 md:mt-20 w-full", previewClassName)}>
        <div className="absolute inset-0 z-10 pointer-events-none"></div>
        <div
          className={cn(
            "overflow-hidden rounded-xl border border-border shadow-2xl",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 border-b border-border px-4 py-3",
            )}
          >
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-destructive"></div>
              <div className="h-3 w-3 rounded-full bg-accent"></div>
              <div className="h-3 w-3 rounded-full bg-primary"></div>
            </div>
            {browserPreview.url && (
              <div className={cn("flex-1 text-center text-sm")}>
                {browserPreview.url}
              </div>
            )}
          </div>
          {browserPreview.image && (
            <Img
              src={browserPreview.image.src}
              alt={browserPreview.image.alt}
              className={cn("w-full", browserPreview.image.className)}
              optixFlowConfig={optixFlowConfig}
              loading="eager"
            />
          )}
        </div>
      </div>
    );
  }, [browserPreviewSlot, browserPreview, previewClassName, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className="pt-10 md:pt-0 flex flex-col items-center justify-center">
        <div
          className={cn(
            "mx-auto text-center flex flex-col items-center gap-4 md:gap-6 max-w-full md:max-w-md",
            headerClassName,
          )}
        >
          {renderBadge}
          {(logo || logoSlot) && (
            <div className={cn("mb-4", logoClassName)}>
              <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />
            </div>
          )}

          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              heading
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
              description
            ))}
          {renderForm}
        </div>
        {renderBrowserPreview}
      </div>
    </Section>
  );
}
