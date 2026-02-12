"use client";

import * as React from "react";
import { Field } from "@page-speed/forms";
import {
  TextInput,
  TextArea,
  Select,
  Radio,
  Checkbox,
  CheckboxGroup,
  FileInput,
  DatePicker,
  TimePicker,
  DateRangePicker,
  RichTextEditor,
} from "@page-speed/forms/inputs";
import { Label } from "./label";
import { cn } from "../../lib/utils";
import type { FormFieldConfig } from "../../lib/form-field-types";

export interface DynamicFormFieldProps {
  field: FormFieldConfig;
  /**
   * Additional CSS classes for the field container
   */
  className?: string;
  /**
   * Upload progress for file inputs (0-100)
   */
  uploadProgress?: { [fileName: string]: number };
  /**
   * Handler for file upload
   */
  onFileUpload?: (files: File[]) => Promise<void>;
  /**
   * Handler for file removal
   */
  onFileRemove?: (file: File, index: number) => void;
  /**
   * Whether file upload is in progress
   */
  isUploading?: boolean;
}

/**
 * DynamicFormField - Renders a form field based on configuration
 *
 * Supports all @page-speed/forms input types:
 * - text, email, tel, number, url
 * - textarea
 * - select, multi-select
 * - radio, checkbox, checkbox-group
 * - date, date-picker, date-range, time
 * - file (with upload support)
 * - rich-text
 */
export function DynamicFormField({
  field,
  className,
  uploadProgress = {},
  onFileUpload,
  onFileRemove,
  isUploading = false,
}: DynamicFormFieldProps): React.JSX.Element {
  const fieldId = `field-${field.name}`;

  return (
    <Field name={field.name}>
      {({ field: formField, meta }) => (
        <div className={cn("space-y-2", className)}>
          {/* Label for non-checkbox fields */}
          {field.type !== "checkbox" && (
            <Label htmlFor={fieldId}>
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
          )}

          {/* Text input types */}
          {(field.type === "text" ||
            field.type === "email" ||
            field.type === "tel" ||
            field.type === "search" ||
            field.type === "password" ||
            field.type === "url") && (
            <TextInput
              {...formField}
              id={fieldId}
              type={field.type}
              placeholder={field.placeholder}
              error={meta.touched && !!meta.error}
              disabled={field.disabled}
              aria-label={field.label}
            />
          )}

          {field.type === "number" && (
            <TextInput
              {...formField}
              id={fieldId}
              type="text"
              placeholder={field.placeholder}
              error={meta.touched && !!meta.error}
              disabled={field.disabled}
              aria-label={field.label}
            />
          )}

          {/* Textarea */}
          {field.type === "textarea" && (
            <TextArea
              {...formField}
              id={fieldId}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              error={meta.touched && !!meta.error}
              disabled={field.disabled}
              aria-label={field.label}
            />
          )}

          {/* Select */}
          {field.type === "select" && field.options && (
            <Select
              {...formField}
              id={fieldId}
              options={field.options}
              placeholder={
                field.placeholder || `Select ${field.label.toLowerCase()}`
              }
              error={meta.touched && !!meta.error}
              disabled={field.disabled}
              aria-label={field.label}
            />
          )}

          {/* Multi-Select */}
          {field.type === "multi-select" && field.options && (
            <Select
              {...formField}
              id={fieldId}
              options={field.options}
              placeholder={
                field.placeholder || `Select ${field.label.toLowerCase()}`
              }
              error={meta.touched && !!meta.error}
              disabled={field.disabled}
              aria-label={field.label}
              // @ts-ignore - MultiSelect not properly typed in @page-speed/forms
              multiple
            />
          )}

          {/* Radio Group */}
          {field.type === "radio" && field.options && (
            <Radio
              {...formField}
              id={fieldId}
              options={field.options}
              disabled={field.disabled}
              layout={field.layout || "stacked"}
              error={meta.touched && !!meta.error}
              aria-label={field.label}
            />
          )}

          {/* Checkbox */}
          {field.type === "checkbox" && (
            <div className="flex items-start space-x-2">
              <Checkbox
                {...formField}
                id={fieldId}
                value={formField.value === true || formField.value === "true"}
                onChange={(checked) => formField.onChange(checked)}
                disabled={field.disabled}
                error={meta.touched && !!meta.error}
                aria-label={field.label}
              />
              <Label
                htmlFor={fieldId}
                className="font-normal cursor-pointer leading-relaxed"
              >
                {field.label}
                {field.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </Label>
            </div>
          )}

          {/* Checkbox Group */}
          {field.type === "checkbox-group" && field.options && (
            <CheckboxGroup
              {...formField}
              id={fieldId}
              options={field.options}
              disabled={field.disabled}
              layout={field.layout || "stacked"}
              error={meta.touched && !!meta.error}
              aria-label={field.label}
            />
          )}

          {/* DatePicker */}
          {(field.type === "date-picker" || field.type === "date") && (
            <DatePicker
              {...formField}
              id={fieldId}
              placeholder={field.placeholder}
              error={meta.touched && !!meta.error}
              disabled={field.disabled}
              aria-label={field.label}
            />
          )}

          {/* DateRangePicker */}
          {field.type === "date-range" && (
            <DateRangePicker
              {...formField}
              id={fieldId}
              error={meta.touched && !!meta.error}
              disabled={field.disabled}
              aria-label={field.label}
            />
          )}

          {/* TimePicker */}
          {field.type === "time" && (
            <TimePicker
              {...formField}
              id={fieldId}
              placeholder={field.placeholder}
              error={meta.touched && !!meta.error}
              disabled={field.disabled}
              aria-label={field.label}
            />
          )}

          {/* File Input */}
          {field.type === "file" && (
            <FileInput
              {...formField}
              id={fieldId}
              accept={field.accept}
              maxSize={field.maxSize || 5 * 1024 * 1024}
              maxFiles={field.maxFiles || 1}
              multiple={field.multiple || false}
              placeholder={field.placeholder || "Choose file(s)..."}
              error={meta.touched && !!meta.error}
              disabled={field.disabled || isUploading}
              showProgress
              uploadProgress={uploadProgress}
              onChange={(files) => {
                formField.onChange(files);
                if (files.length > 0 && onFileUpload) {
                  onFileUpload(files);
                }
              }}
              onFileRemove={onFileRemove}
              aria-label={field.label}
            />
          )}

          {/* Rich Text Editor */}
          {field.type === "rich-text" && (
            <RichTextEditor
              {...formField}
              id={fieldId}
              placeholder={field.placeholder}
              error={meta.touched && !!meta.error}
              disabled={field.disabled}
              aria-label={field.label}
            />
          )}

          {/* Error message */}
          {meta.touched && meta.error && (
            <p className="text-sm text-destructive">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );
}
