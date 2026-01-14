"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, TextArea } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Card, CardContent } from "../../ui/card";
import { Label } from "../../ui/label";
import {
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import { type ActionConfig } from "../../../src/types/blocks";

interface ContactSupportFormValues {
  name: string;
  email: string;
  message: string;
}

export interface ContactSupportProps {
  /** Main heading text */
  heading?: React.ReactNode;
  /** Description text below heading */
  description?: React.ReactNode;
  /** Submit button text */
  buttonText?: string;
  /** Icon to display in submit button */
  buttonIcon?: React.ReactNode;
  /** Array of action configurations for custom buttons */
  actions?: ActionConfig[];
  /** Custom slot for rendering actions (overrides actions array) */
  actionsSlot?: React.ReactNode;
  /** Additional CSS classes for the section */
  className?: string;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Additional CSS classes for the header */
  headerClassName?: string;
  /** Additional CSS classes for the heading */
  headingClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the card */
  cardClassName?: string;
  /** Additional CSS classes for the card content */
  cardContentClassName?: string;
  /** Additional CSS classes for the form */
  formClassName?: string;
  /** Additional CSS classes for the submit button */
  submitClassName?: string;
  /** Form configuration for PageSpeed forms */
  formConfig?: PageSpeedFormConfig;
  /** Custom submit handler */
  onSubmit?: (values: ContactSupportFormValues) => void | Promise<void>;
  /** Success callback */
  onSuccess?: (data: unknown) => void;
  /** Error callback */
  onError?: (error: Error) => void;
}

/**
 * ContactSupport - Support contact form with essential fields.
 * Perfect for customer support and help desk scenarios.
 *
 * @example
 * ```tsx
 * <ContactSupport
 *   heading="How can we help?"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
export function ContactSupport({
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
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactSupportProps): React.JSX.Element {
  const form = useForm<ContactSupportFormValues>({
    initialValues: {
      name: "",
      email: "",
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

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (actions && actions.length > 0) {
      return actions.map((action, index) => {
        const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
        return (
          <Pressable key={index} asButton className={actionClassName} {...pressableProps}>
            {children ?? (<>{icon}{label}{iconAfter}</>)}
          </Pressable>
        );
      });
    }
    return null;
  };

  return (
    <section className={cn("py-12", className)}>
      <div className={cn("mx-auto max-w-4xl px-4", containerClassName)}>
        <div className={cn("mb-10 text-center", headerClassName)}>
          <h2 className={cn("mb-3 text-3xl font-bold tracking-tight", headingClassName)}>{heading}</h2>
          <p className={cn("leading-relaxed text-muted-foreground", descriptionClassName)}>{description}</p>
        </div>

        <Card className={cn("mx-auto max-w-xl", cardClassName)}>
          <CardContent className={cn("p-6 lg:p-8", cardContentClassName)}>
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              className={cn("space-y-4", formClassName)}
            >
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
                      placeholder="your@email.com"
                      error={meta.touched && !!meta.error}
                      aria-label="Email"
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
                      placeholder="Describe your issue..."
                      rows={4}
                      error={meta.touched && !!meta.error}
                      aria-label="Message"
                    />
                  </div>
                )}
              </Field>

              {actionsSlot || (actions && actions.length > 0) ? (
                renderActions()
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
    </section>
  );
}


