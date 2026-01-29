"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, TextArea, Radio } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardContent } from "../../ui/card";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import {
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

const PRIORITIES = [
  {
    value: "critical",
    label: "Critical",
    description: "System down, business stopped",
    response: "15 min",
  },
  {
    value: "high",
    label: "High",
    description: "Major impact, needs attention",
    response: "2 hours",
  },
  {
    value: "normal",
    label: "Normal",
    description: "Standard request",
    response: "24 hours",
  },
];

interface EmergencyFormValues {
  priority: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
}

export interface ContactEmergencyProps {
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Submit button text
   */
  buttonText?: string;
  /**
   * Icon to display in submit button
   */
  buttonIcon?: React.ReactNode;
  /**
   * Array of action configurations for custom buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
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
   * Additional CSS classes for the header
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
   * Additional CSS classes for the form
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the submit button
   */
  submitClassName?: string;  /**
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

  /**
   * Form configuration for PageSpeed forms
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Custom submit handler
   */
  onSubmit?: (values: EmergencyFormValues) => void | Promise<void>;
  /**
   * Success callback
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Error callback
   */
  onError?: (error: Error) => void;
}

/**
 * ContactEmergency - Urgent support form with priority level selection.
 * Features priority-based response time indicators and emergency contact information.
 *
 * @example
 * ```tsx
 * <ContactEmergency
 *   heading="Urgent Support"
 *   formConfig={{ endpoint: "/api/emergency", format: "json" }}
 * />
 * ```
 */
export function ContactEmergency({
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
  formClassName,
  submitClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity = 0.1,

  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactEmergencyProps): React.JSX.Element {
  const form = useForm<EmergencyFormValues>({
    initialValues: {
      priority: "normal",
      name: "",
      email: "",
      phone: "",
      subject: "",
      description: "",
    },
    validationSchema: {
      priority: (value) => (!value ? "Priority is required" : undefined),
      name: (value) => (!value ? "Name is required" : undefined),
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return undefined;
      },
      subject: (value) => (!value ? "Subject is required" : undefined),
      description: (value) => (!value ? "Description is required" : undefined),
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

  const selectedPriority = PRIORITIES.find(
    (p) => p.value === form.values.priority
  );

  const actionsContent = React.useMemo(() => {
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
  }, [actionsSlot, actions]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("py-12", className)}
    >
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
              className={formClassName}
            >
              <div className="grid md:grid-cols-2">
                {/* Left: Priority Selection */}
                <div className="border-b p-6 md:border-b-0 md:border-r">
                  <div className="mb-6 flex items-center gap-2">
                    <DynamicIcon
                      name="lucide/alert-triangle"
                      size={20}
                      className="text-muted-foreground"
                    />
                    <h3 className="font-semibold">Priority Level</h3>
                  </div>

                  <Field name="priority">
                    {({ field }) => (
                      <div className="space-y-3">
                        {PRIORITIES.map((item) => (
                          <label
                            key={item.value}
                            htmlFor={`priority-${item.value}`}
                            className={cn(
                              "flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors",
                              field.value === item.value
                                ? "border-primary"
                                : "hover:border-foreground"
                            )}
                          >
                            <input
                              type="radio"
                              id={`priority-${item.value}`}
                              name="priority"
                              value={item.value}
                              checked={field.value === item.value}
                              onChange={field.onChange}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{item.label}</span>
                                <Badge variant="secondary" className="text-xs">
                                  <DynamicIcon
                                    name="lucide/clock"
                                    size={12}
                                    className="mr-1"
                                  />
                                  {item.response}
                                </Badge>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </Field>

                  <Separator className="my-6" />

                  {/* Phone Option for Critical */}
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <DynamicIcon
                        name="lucide/phone"
                        size={20}
                        className="text-muted-foreground"
                      />
                      <div>
                        <p className="font-medium">Call for Critical Issues</p>
                        <p className="text-sm text-muted-foreground">
                          +1 (555) 911-0000
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Available 24/7 for critical emergencies only
                    </p>
                  </div>
                </div>

                {/* Right: Contact Form */}
                <div className="p-6">
                  <div className="mb-6 flex items-center gap-2">
                    <DynamicIcon
                      name="lucide/send"
                      size={20}
                      className="text-muted-foreground"
                    />
                    <h3 className="font-semibold">Describe Your Issue</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field name="name">
                        {({ field, meta }) => (
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <TextInput
                              {...field}
                              id="name"
                              placeholder="Your name"
                              error={meta.touched && !!meta.error}
                              aria-label="Name"
                            />
                          </div>
                        )}
                      </Field>
                      <Field name="email">
                        {({ field, meta }) => (
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <TextInput
                              {...field}
                              id="email"
                              type="email"
                              placeholder="you@company.com"
                              error={meta.touched && !!meta.error}
                              aria-label="Email"
                            />
                          </div>
                        )}
                      </Field>
                    </div>

                    <Field name="phone">
                      {({ field, meta }) => (
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone (Optional)</Label>
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

                    <Field name="subject">
                      {({ field, meta }) => (
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <TextInput
                            {...field}
                            id="subject"
                            placeholder="Brief summary of the issue"
                            error={meta.touched && !!meta.error}
                            aria-label="Subject"
                          />
                        </div>
                      )}
                    </Field>

                    <Field name="description">
                      {({ field, meta }) => (
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <TextArea
                            {...field}
                            id="description"
                            placeholder="Describe the issue, what you've tried, and the impact..."
                            rows={4}
                            error={meta.touched && !!meta.error}
                            aria-label="Description"
                          />
                        </div>
                      )}
                    </Field>

                    <Separator />

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Expected response:</span>
                      <span className="font-medium">
                        {selectedPriority?.response}
                      </span>
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
                  </div>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}



