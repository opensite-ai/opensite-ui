/**
 * Form field types and utilities for dynamic form generation
 */

export type FormFieldType =
  | "text"
  | "email"
  | "search"
  | "password"
  | "tel"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "checkbox-group"
  | "number"
  | "url"
  | "date"
  | "date-picker"
  | "date-range"
  | "time"
  | "file"
  | "rich-text"
  | "multi-select";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface FormFieldConfig {
  /**
   * Unique field name (used as the key in form values)
   */
  name: string;
  /**
   * Field type
   */
  type: FormFieldType;
  /**
   * Display label for the field
   */
  label: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;
  /**
   * Column span in grid layout (1-12)
   * @default 12 (full width)
   */
  columnSpan?: number;
  /**
   * Options for select/radio/checkbox-group fields
   */
  options?: SelectOption[];
  /**
   * Number of rows for textarea
   * @default 4
   */
  rows?: number;
  /**
   * Custom validation function
   * Return undefined for valid, or an error message string for invalid
   */
  validator?: (
    value: any,
    allValues: Record<string, any>,
  ) => string | undefined;
  /**
   * Additional CSS classes for the field wrapper
   */
  className?: string;
  /**
   * Whether the field is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Accepted file types for file inputs (MIME types or extensions)
   * @example ".pdf,.doc,.docx"
   * @example "image/*,application/pdf"
   */
  accept?: string;
  /**
   * Maximum file size in bytes for file inputs
   * @default 5MB (5 * 1024 * 1024)
   */
  maxSize?: number;
  /**
   * Maximum number of files for file inputs
   * @default 1
   */
  maxFiles?: number;
  /**
   * Allow multiple file selection
   * @default false
   */
  multiple?: boolean;
  /**
   * Description text for rich-text editor
   */
  description?: string;
  /**
   * Layout for radio/checkbox groups
   * @default "stacked"
   */
  layout?: "inline" | "stacked";
}

/**
 * Generate initial values object from form field configs
 */
export function generateInitialValues(
  fields: FormFieldConfig[],
): Record<string, any> {
  return fields.reduce(
    (acc, field) => {
      // Set default values based on field type
      if (field.type === "checkbox") {
        acc[field.name] = false;
      } else if (
        field.type === "checkbox-group" ||
        field.type === "multi-select"
      ) {
        acc[field.name] = [];
      } else if (field.type === "file") {
        acc[field.name] = [];
      } else if (field.type === "date-range") {
        acc[field.name] = { start: null, end: null };
      } else {
        acc[field.name] = "";
      }
      return acc;
    },
    {} as Record<string, any>,
  );
}

/**
 * Generate validation schema from form field configs
 */
export function generateValidationSchema(
  fields: FormFieldConfig[],
): Record<
  string,
  (value: any, allValues: Record<string, any>) => string | undefined
> {
  return fields.reduce(
    (acc, field) => {
      acc[field.name] = (value: any, allValues: Record<string, any>) => {
        // Required validation
        if (field.required) {
          if (!value || (typeof value === "string" && !value.trim())) {
            return `${field.label} is required`;
          }
        }

        // Email validation
        if (field.type === "email" && value) {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Please enter a valid email address";
          }
        }

        // URL validation
        if (field.type === "url" && value) {
          try {
            new URL(value);
          } catch {
            return "Please enter a valid URL";
          }
        }

        // Custom validator
        if (field.validator) {
          return field.validator(value, allValues);
        }

        return undefined;
      };
      return acc;
    },
    {} as Record<
      string,
      (value: any, allValues: Record<string, any>) => string | undefined
    >,
  );
}

/**
 * Get grid column span class for Tailwind
 */
export function getColumnSpanClass(span?: number): string {
  if (!span || span === 12) return "col-span-12";
  return `col-span-12 sm:col-span-${Math.min(span, 12)}`;
}
