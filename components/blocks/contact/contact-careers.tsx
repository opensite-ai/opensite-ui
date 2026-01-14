"use client";

import * as React from "react";
import { useState } from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { useFileUpload } from "@page-speed/forms/upload";
import { TextInput, Select, TextArea, Radio } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardContent } from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import {
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import type { ActionConfig } from "../../../src/types";

const POSITIONS = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "fullstack", label: "Full Stack Developer" },
  { value: "designer", label: "Product Designer" },
  { value: "pm", label: "Product Manager" },
  { value: "marketing", label: "Marketing Manager" },
  { value: "other", label: "Other" },
];

const AVAILABILITY = [
  { value: "immediately", label: "Immediately" },
  { value: "2-weeks", label: "2 weeks notice" },
  { value: "1-month", label: "1 month notice" },
  { value: "flexible", label: "Flexible" },
];

interface CareersFormValues {
  position: string;
  linkedin: string;
  portfolio: string;
  availability: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  contact_form_upload_tokens: string[];
}

export interface ContactCareersProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below the heading
   */
  description?: React.ReactNode;
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
   * Additional CSS classes for the card content
   */
  cardContentClassName?: string;
  /**
   * Additional CSS classes for the submit button
   */
  submitClassName?: string;
  /**
   * Optional form submission configuration.
   *
   * **Universal Usage**: Works with ANY REST API endpoint. Simply provide an `endpoint` URL
   * and the form will submit to it in JSON format.
   *
   * @example
   * // Works with any API
   * formConfig={{ endpoint: "https://api.mysite.com/careers", format: "json" }}
   *
   * @example
   * // With custom headers (e.g., authentication)
   * formConfig={{
   *   endpoint: "/api/careers",
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
   *   await fetch("/api/careers", {
   *     method: "POST",
   *     body: JSON.stringify(values)
   *   });
   * }}
   */
  onSubmit?: (values: CareersFormValues) => void | Promise<void>;
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

/**
 * ContactCareers - A comprehensive job application form with position selection,
 * resume upload, and availability options. Perfect for career pages and job applications.
 *
 * @example
 * ```tsx
 * <ContactCareers
 *   heading="Join Our Team"
 *   description="We're always looking for talented people to join us."
 *   buttonText="Submit Application"
 *   formConfig={{ endpoint: "/api/careers", format: "json" }}
 * />
 * ```
 */
export function ContactCareers({
  heading,
  description,
  buttonText,
  buttonIcon,
  actions,
  actionsSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  submitClassName,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactCareersProps): React.JSX.Element {
  const [resume, setResume] = useState<File | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const form = useForm<CareersFormValues>({
    initialValues: {
      position: "",
      linkedin: "",
      portfolio: "",
      availability: "2-weeks",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      coverLetter: "",
      contact_form_upload_tokens: [],
    },
    validationSchema: {
      position: (value) => (!value ? "Position is required" : undefined),
      firstName: (value) => (!value ? "First name is required" : undefined),
      lastName: (value) => (!value ? "Last name is required" : undefined),
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return undefined;
      },
      phone: (value) => (!value ? "Phone number is required" : undefined),
    },
    onSubmit: async (values, helpers) => {
      const shouldAutoSubmit = Boolean(formConfig?.endpoint);

      if (!shouldAutoSubmit && !onSubmit) {
        return;
      }

      try {
        let result: unknown;

        if (shouldAutoSubmit) {
          result = await submitPageSpeedForm(values, formConfig);
        }

        if (onSubmit) {
          await onSubmit(values);
        }

        if (shouldAutoSubmit || onSubmit) {
          if (formConfig?.resetOnSuccess !== false) {
            helpers.resetForm();
            setResume(null);
          }
          onSuccess?.(result);
        }
      } catch (error) {
        if (
          error instanceof PageSpeedFormSubmissionError &&
          error.formErrors
        ) {
          helpers.setErrors(error.formErrors);
        }
        onError?.(error as Error);
        throw error;
      }
    },
  });

  // File upload hook - integrates with @page-speed/forms
  const { upload, state: uploadState } = useFileUpload({
    endpoint: formConfig?.endpoint
      ? `${new URL(formConfig.endpoint, typeof window !== "undefined" ? window.location.origin : "http://localhost").origin}/contacts/_/contact_form_uploads`
      : "https://api.toastability.com/contacts/_/contact_form_uploads",
    format: "legacy",
    onComplete: (token) => {
      const tokens = Array.isArray(token) ? token : [token];
      form.setFieldValue(
        "contact_form_upload_tokens",
        tokens.map((value) => `upload_${value}`)
      );
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResume(file);

      // Upload the file immediately
      try {
        await upload(file);
      } catch (error) {
        console.error("File upload failed:", error);
        setResume(null);
        onError?.(error as Error);
      }
    }
  };

  const handleRemoveFile = () => {
    setResume(null);
    form.setFieldValue("contact_form_upload_tokens", []);
  };

  const formMethod =
    formConfig?.method?.toLowerCase() === "get" ? "get" : "post";

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (actions && actions.length > 0) {
      return actions.map((action, index) => {
        const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
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
  };

  return (
    <section className={cn("py-12", className)}>
      <div className={cn("mx-auto w-full max-w-4xl px-4", containerClassName)}>
        <div className={cn("mb-10 text-center", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("mb-3 text-3xl font-bold tracking-tight", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("leading-relaxed text-muted-foreground", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>

        <Card className={cardClassName}>
          <CardContent className={cn("p-0", cardContentClassName)}>
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
            >
              <div className="grid md:grid-cols-2">
                {/* Left: Position & Resume */}
                <div className="border-b p-6 md:border-b-0 md:border-r">
                  <div className="mb-6 flex items-center gap-2">
                    <DynamicIcon
                      name="lucide/briefcase"
                      size={20}
                      className="text-muted-foreground"
                    />
                    <h3 className="font-semibold">Position Details</h3>
                  </div>

                  <div className="space-y-4">
                  <Field name="position">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Select
                          {...field}
                          id="position"
                          error={meta.touched && !!meta.error}
                          aria-label="Position"
                        >
                          <option value="">Select a position</option>
                          {POSITIONS.map((pos) => (
                            <option key={pos.value} value={pos.value}>
                              {pos.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                    )}
                  </Field>

                  <div className="space-y-2">
                    <Label>Resume / CV</Label>
                    {!resume ? (
                      <label
                        htmlFor="resume-upload"
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-colors hover:border-foreground",
                          uploadState === "uploading" &&
                            "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <DynamicIcon
                          name={
                            uploadState === "uploading"
                              ? "lucide/loader-2"
                              : "lucide/upload"
                          }
                          size={24}
                          className={cn(
                            "mb-2 text-muted-foreground",
                            uploadState === "uploading" && "animate-spin"
                          )}
                        />
                        <p className="text-sm">
                          {uploadState === "uploading"
                            ? "Uploading..."
                            : "Upload your resume"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF or DOCX up to 5MB
                        </p>
                        <Input
                          id="resume-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          disabled={uploadState === "uploading"}
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <DynamicIcon
                            name={
                              uploadState === "completed"
                                ? "lucide/check-circle"
                                : "lucide/file"
                            }
                            size={20}
                            className={cn(
                              "text-muted-foreground",
                              uploadState === "completed" && "text-success"
                            )}
                          />
                          <div>
                            <p className="text-sm font-medium">{resume.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {uploadState === "completed"
                                ? "Uploaded successfully"
                                : formatFileSize(resume.size)}
                            </p>
                          </div>
                        </div>
                        <Pressable
                          componentType="button"
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveFile}
                          asButton
                        >
                          <DynamicIcon name="lucide/x" size={16} />
                        </Pressable>
                      </div>
                    )}
                  </div>

                  <Field name="linkedin">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">
                          LinkedIn Profile (Optional)
                        </Label>
                        <TextInput
                          {...field}
                          id="linkedin"
                          type="url"
                          placeholder="https://linkedin.com/in/yourprofile"
                          error={meta.touched && !!meta.error}
                          aria-label="LinkedIn Profile"
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="portfolio">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="portfolio">
                          Portfolio / Website (Optional)
                        </Label>
                        <TextInput
                          {...field}
                          id="portfolio"
                          type="url"
                          placeholder="https://yourportfolio.com"
                          error={meta.touched && !!meta.error}
                          aria-label="Portfolio / Website"
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="availability">
                    {({ field }) => (
                      <Radio
                        name="availability"
                        label="Availability"
                        value={field.value}
                        onChange={field.onChange}
                        options={AVAILABILITY}
                        layout="stacked"
                        className="space-y-2"
                      />
                    )}
                  </Field>
                </div>
              </div>

              {/* Right: Personal Info */}
              <div className="p-6">
                <div className="mb-6 flex items-center gap-2">
                  <DynamicIcon
                    name="lucide/user"
                    size={20}
                    className="text-muted-foreground"
                  />
                  <h3 className="font-semibold">Your Information</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field name="firstName">
                      {({ field, meta }) => (
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <TextInput
                            {...field}
                            id="first-name"
                            placeholder="John"
                            error={meta.touched && !!meta.error}
                            aria-label="First Name"
                          />
                        </div>
                      )}
                    </Field>
                    <Field name="lastName">
                      {({ field, meta }) => (
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <TextInput
                            {...field}
                            id="last-name"
                            placeholder="Doe"
                            error={meta.touched && !!meta.error}
                            aria-label="Last Name"
                          />
                        </div>
                      )}
                    </Field>
                  </div>

                  <Field name="email">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <TextInput
                          {...field}
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          error={meta.touched && !!meta.error}
                          aria-label="Email"
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="phone">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <TextInput
                          {...field}
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          error={meta.touched && !!meta.error}
                          aria-label="Phone"
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="coverLetter">
                    {({ field, meta }) => (
                      <div className="space-y-2">
                        <Label htmlFor="cover-letter">
                          Cover Letter (Optional)
                        </Label>
                        <TextArea
                          {...field}
                          id="cover-letter"
                          placeholder="Tell us why you'd be a great fit for this role..."
                          rows={5}
                          error={meta.touched && !!meta.error}
                          aria-label="Cover Letter"
                        />
                      </div>
                    )}
                  </Field>

                  <Separator className="my-4" />

                  {actionsSlot || (actions && actions.length > 0) ? (
                    renderActions()
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

                  <p className="text-center text-xs text-muted-foreground">
                    We'll review your application and get back to you within 5
                    business days.
                  </p>
                </div>
              </div>
            </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
