"use client";

import * as React from "react";
import { useState } from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, Select, TextArea, Radio } from "@page-speed/forms/inputs";
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
}

export interface ContactCareersProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Submit button text
   */
  buttonText?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
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
  heading = "Join Our Team",
  description = "We're always looking for talented people to join us.",
  buttonText = "Submit Application",
  className,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactCareersProps): React.JSX.Element {
  const [resume, setResume] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setResume(null);
  };

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

  const formMethod =
    formConfig?.method?.toLowerCase() === "get" ? "get" : "post";

  return (
    <section className={cn("py-12", className)}>
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">{heading}</h2>
          <p className="leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <Card>
          <CardContent className="p-0">
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

                <Form
                  form={form}
                  action={formConfig?.endpoint}
                  method={formMethod}
                  className="space-y-4"
                >
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
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-colors hover:border-foreground"
                      >
                        <DynamicIcon
                          name="lucide/upload"
                          size={24}
                          className="mb-2 text-muted-foreground"
                        />
                        <p className="text-sm">Upload your resume</p>
                        <p className="text-xs text-muted-foreground">
                          PDF or DOCX up to 5MB
                        </p>
                        <Input
                          id="resume-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <DynamicIcon
                            name="lucide/file"
                            size={20}
                            className="text-muted-foreground"
                          />
                          <div>
                            <p className="text-sm font-medium">{resume.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(resume.size)}
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
                        layout="vertical"
                        className="space-y-2"
                      />
                    )}
                  </Field>
                </Form>
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

                  <Pressable
                    componentType="button"
                    type="submit"
                    className="w-full"
                    asButton
                    disabled={form.isSubmitting}
                  >
                    {buttonText}
                  </Pressable>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll review your application and get back to you within 5
                    business days.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

