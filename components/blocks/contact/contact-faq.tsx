"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, TextArea } from "@page-speed/forms/inputs";
import "../../styles/forms.css";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Card, CardContent } from "../../ui/card";
import { Label } from "../../ui/label";
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

interface ContactFaqFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFaqProps {
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Form section heading
   */
  formHeading?: React.ReactNode;
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
   * Additional CSS classes for the form heading
   */
  formHeadingClassName?: string;
  /**
   * Additional CSS classes for the form
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the submit button
   */
  submitClassName?: string; /**
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
  onSubmit?: (values: ContactFaqFormValues) => void | Promise<void>;
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
 * ContactFaq - FAQ contact form for questions not answered in FAQ section.
 *
 * @example
 * ```tsx
 * <ContactFaq
 *   heading="Still need help?"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
export function ContactFaq({
  heading,
  description,
  formHeading,
  buttonText,
  buttonIcon,
  actions,
  actionsSlot,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  formHeadingClassName,
  formClassName,
  submitClassName,
  background,
  spacing = "py-8 md:py-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,

  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactFaqProps): React.JSX.Element {
  const form = useForm<ContactFaqFormValues>({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: {
      name: (value) => (!value ? "Name is required" : undefined),
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return undefined;
      },
      subject: (value) => (!value ? "Subject is required" : undefined),
      message: (value) => (!value ? "Message is required" : undefined),
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
        if (error instanceof PageSpeedFormSubmissionError && error.formErrors) {
          helpers.setErrors(error.formErrors);
        }
        onError?.(error as Error);
        throw error;
      }
    },
  });

  const formMethod =
    formConfig?.method?.toLowerCase() === "get" ? "get" : "post";

  const actionsContent = React.useMemo(() => {
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

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className={cn("mb-10 text-center", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-3 text-3xl font-bold tracking-tight text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "leading-relaxed text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>

        <Card className={cn("mx-auto max-w-xl", cardClassName)}>
          <CardContent className={cn("p-6 lg:p-8", cardContentClassName)}>
            {formHeading &&
              (typeof formHeading === "string" ? (
                <h3
                  className={cn(
                    "mb-6 text-xl font-semibold",
                    formHeadingClassName,
                  )}
                >
                  {formHeading}
                </h3>
              ) : (
                <div className={formHeadingClassName}>{formHeading}</div>
              ))}
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              className={cn("space-y-4", formClassName)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name">
                  {({ field, meta }) => (
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <TextInput
                        {...field}
                        id="name"
                        placeholder="John Doe"
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
                        placeholder="john@example.com"
                        error={meta.touched && !!meta.error}
                        aria-label="Email"
                      />
                    </div>
                  )}
                </Field>
              </div>

              <Field name="subject">
                {({ field, meta }) => (
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <TextInput
                      {...field}
                      id="subject"
                      placeholder="What is this regarding?"
                      error={meta.touched && !!meta.error}
                      aria-label="Subject"
                    />
                  </div>
                )}
              </Field>

              <Field name="message">
                {({ field, meta }) => (
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <TextArea
                      {...field}
                      id="message"
                      placeholder="Your question..."
                      rows={4}
                      error={meta.touched && !!meta.error}
                      aria-label="Message"
                    />
                  </div>
                )}
              </Field>

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
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
