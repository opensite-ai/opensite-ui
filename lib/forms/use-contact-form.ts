import { useState, useMemo } from "react";
import { useForm as usePageSpeedForm } from "@page-speed/forms";
import type { FormFieldConfig } from "../form-field-types";
import {
  generateInitialValues,
  generateValidationSchema,
} from "../form-field-types";
import {
  submitPageSpeedForm,
  PageSpeedFormSubmissionError,
  type PageSpeedFormConfig,
} from "../forms";

export interface UseContactFormOptions {
  /**
   * Form field configurations
   */
  formFields: FormFieldConfig[];
  /**
   * PageSpeed form configuration for API submission
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
   * Reset form on successful submission
   * @default true
   */
  resetOnSuccess?: boolean;
  /**
   * File upload tokens to include in submission
   */
  uploadTokens?: string[];
}

export interface UseContactFormReturn {
  form: ReturnType<typeof usePageSpeedForm>;
  isSubmitted: boolean;
  submissionError: string | null;
  formMethod: "get" | "post";
}

/**
 * Hook for managing contact form state and submission
 *
 * Handles:
 * - Form initialization with dynamic fields
 * - Validation schema generation
 * - Form submission to PageSpeed API
 * - Success/error state management
 * - File upload token integration
 *
 * @example
 * ```tsx
 * const { form, isSubmitted, submissionError, formMethod } = useContactForm({
 *   formFields: myFormFields,
 *   formConfig: demoFormConfig,
 *   uploadTokens: fileUploadTokens,
 *   onSuccess: () => console.log('Success!'),
 * });
 * ```
 */
export function useContactForm(
  options: UseContactFormOptions
): UseContactFormReturn {
  const {
    formFields,
    formConfig,
    onSubmit,
    onSuccess,
    onError,
    resetOnSuccess = true,
    uploadTokens = [],
  } = options;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const form = usePageSpeedForm({
    initialValues: useMemo(
      () => generateInitialValues(formFields),
      [formFields]
    ),
    validationSchema: useMemo(
      () => generateValidationSchema(formFields),
      [formFields]
    ),
    onSubmit: async (values, helpers) => {
      setSubmissionError(null);
      const shouldAutoSubmit = Boolean(formConfig?.endpoint);

      if (!shouldAutoSubmit && !onSubmit) {
        return;
      }

      try {
        let result: unknown;

        // Add file upload tokens to submission
        const submissionValues = {
          ...values,
          ...(uploadTokens.length > 0 && {
            contact_form_upload_tokens: uploadTokens,
          }),
        };

        if (shouldAutoSubmit) {
          result = await submitPageSpeedForm(submissionValues, formConfig);
        }

        if (onSubmit) {
          await onSubmit(submissionValues);
        }

        if (shouldAutoSubmit || onSubmit) {
          setIsSubmitted(true);
          if (resetOnSuccess) {
            helpers.resetForm();
          }
          onSuccess?.(result);
          // Auto-hide success message after 5 seconds
          setTimeout(() => setIsSubmitted(false), 5000);
        }
      } catch (error) {
        if (error instanceof PageSpeedFormSubmissionError && error.formErrors) {
          helpers.setErrors(error.formErrors);
        }
        const errorMessage =
          error instanceof Error ? error.message : "Form submission failed";
        setSubmissionError(errorMessage);
        onError?.(error as Error);
      }
    },
  });

  const formMethod =
    formConfig?.method?.toLowerCase() === "get" ? "get" : "post";

  return {
    form,
    isSubmitted,
    submissionError,
    formMethod,
  };
}
