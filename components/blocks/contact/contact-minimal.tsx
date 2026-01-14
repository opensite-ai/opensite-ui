"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, TextArea } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Label } from "../../ui/label";
import {
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import type { ActionConfig } from "../../../src/types";

interface ContactMinimalFormValues {
  name: string;
  email: string;
  message: string;
}

export interface ContactMinimalProps {
  /**
   * Main heading content
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
   * Footer content (e.g., privacy policy text)
   */
  footer?: React.ReactNode;
  /**
   * Custom slot for footer content (overrides footer prop)
   */
  footerSlot?: React.ReactNode;
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
   * Additional CSS classes for the form
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the submit button
   */
  submitClassName?: string;
  /**
   * Additional CSS classes for the footer
   */
  footerClassName?: string;
  /**
   * Form submission configuration
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Custom submission handler
   */
  onSubmit?: (values: ContactMinimalFormValues) => void | Promise<void>;
  /**
   * Success callback after submission
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Error callback if submission fails
   */
  onError?: (error: Error) => void;
}

/**
 * ContactMinimal - Simple, clean contact form with essential fields.
 * Perfect for minimal designs and quick contact forms.
 *
 * @example
 * ```tsx
 * <ContactMinimal
 *   heading="Let's Talk"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
const defaultFooter = (
  <>
    By submitting this form, you agree to our{" "}
    <a href="#" className="text-primary hover:underline">
      Privacy Policy
    </a>
  </>
);

export function ContactMinimal({
  heading,
  description,
  buttonText,
  buttonIcon = <DynamicIcon name="lucide/send" size={16} />,
  actions,
  actionsSlot,
  footer,
  footerSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  formClassName,
  submitClassName,
  footerClassName,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactMinimalProps): React.JSX.Element {
  const form = useForm<ContactMinimalFormValues>({
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

  const renderFooter = () => {
    if (footerSlot) return footerSlot;
    if (footer) {
      return typeof footer === "string" ? (
        <p className={cn("mt-6 text-center text-sm text-muted-foreground", footerClassName)}>
          {footer}
        </p>
      ) : (
        <div className={cn("mt-6 text-center text-sm text-muted-foreground", footerClassName)}>
          {footer}
        </div>
      );
    }
    return null;
  };

  return (
    <section className={cn("py-12", className)}>
      <div className={cn("mx-auto w-full max-w-md px-4", containerClassName)}>
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
                  placeholder="Your full name"
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
                  placeholder="Tell us what's on your mind..."
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
              className={cn("w-full gap-2", submitClassName)}
              size="lg"
              asButton
              disabled={form.isSubmitting}
            >
              {buttonIcon}
              {buttonText}
            </Pressable>
          )}
        </Form>

        {renderFooter()}
      </div>
    </section>
  );
}


