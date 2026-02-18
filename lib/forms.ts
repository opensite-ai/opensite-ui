/**
 * @deprecated Form orchestration is now owned by @page-speed/forms/integration.
 *
 * This module remains as a compatibility shim so existing imports in
 * @opensite/ui blocks do not need immediate changes.
 */

export {
  submitPageSpeedForm,
  isValidEmail,
  PageSpeedFormSubmissionError,
  useFileUpload,
  useContactForm,
  type PageSpeedFormConfig,
  type PageSpeedFormMethod,
  type PageSpeedFormSubmissionConfig,
  type PageSpeedFormSubmissionFormat,
  type PageSpeedFormSubmissionResult,
  type FileUploadProgress,
  type UseFileUploadReturn,
  type UseContactFormOptions,
  type UseContactFormReturn,
} from "@page-speed/forms/integration";
