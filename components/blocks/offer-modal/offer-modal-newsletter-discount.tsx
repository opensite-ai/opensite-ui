"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "@page-speed/forms/inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";

export interface OfferModalNewsletterDiscountProps {
  /**
   * Main title text for the offer
   */
  title?: string;
  /**
   * Placeholder text for the email input
   */
  emailPlaceholder?: string;
  /**
   * Text for the subscribe button
   */
  buttonText?: string;
  /**
   * Text for the close button
   */
  closeButtonText?: string;
  /**
   * Whether the dialog is open by default
   */
  defaultOpen?: boolean;
  /**
   * Whether clicking outside closes the dialog
   */
  closeOnOutsideClick?: boolean;
  /**
   * Callback when form is submitted
   */
  onSubmit?: (email: string) => void | Promise<void>;
  /**
   * Form submission configuration for @page-speed/forms
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Optional success callback
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Optional error callback
   */
  onError?: (error: Error) => void;
  /**
   * Additional CSS classes for the dialog content
   */
  className?: string;
}

const defaultProps: Partial<OfferModalNewsletterDiscountProps> = {
  title: "Join our newsletter and enjoy 35% off your first order",
  emailPlaceholder: "Email",
  buttonText: "Subscribe",
  closeButtonText: "Close",
  defaultOpen: true,
  closeOnOutsideClick: false,
};

/**
 * OfferModalNewsletterDiscount - A compact newsletter signup modal positioned at the bottom-right
 * of the screen. Features a clean design with a close button, compelling headline, email input,
 * and subscribe CTA. Perfect for e-commerce sites offering first-purchase discounts or newsletter
 * signup incentives.
 *
 * @example
 * ```tsx
 * <OfferModalNewsletterDiscount
 *   title="Join our newsletter and enjoy 35% off your first order"
 *   buttonText="Subscribe"
 *   onSubmit={(email) => console.log('Subscribed:', email)}
 * />
 * ```
 */
export function OfferModalNewsletterDiscount({
  title = defaultProps.title,
  emailPlaceholder = defaultProps.emailPlaceholder,
  buttonText = defaultProps.buttonText,
  closeButtonText = defaultProps.closeButtonText,
  defaultOpen = defaultProps.defaultOpen,
  closeOnOutsideClick = defaultProps.closeOnOutsideClick,
  onSubmit,
  formConfig,
  onSuccess,
  onError,
  className,
}: OfferModalNewsletterDiscountProps): React.JSX.Element {
  const form = useForm<{ email: string }>({
    initialValues: {
      email: "",
    },
    validationSchema: {
      email: (value) => {
        if (!value) return "Email is required";
        if (!isValidEmail(value)) return "Please enter a valid email address";
        return undefined;
      },
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
          await onSubmit(values.email);
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
    <Dialog defaultOpen={defaultOpen} modal={false}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(event) => {
          if (!closeOnOutsideClick) {
            event.preventDefault();
          }
        }}
        className={cn(
          "duration-400 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full max-w-[460px] bottom-4 left-auto right-4 top-auto block h-fit max-h-dvh translate-x-0 translate-y-0 space-y-2.5 rounded-sm p-10",
          className
        )}
      >
        <div className="absolute end-1.5 top-1.5">
          <DialogClose asChild>
            <Pressable
              variant="ghost"
              className="text-muted-foreground text-xs uppercase"
              size="sm"
              asButton
            >
              {closeButtonText}
            </Pressable>
          </DialogClose>
        </div>
        <DialogHeader>
          <DialogTitle className="text-start font-serif text-2xl font-normal leading-snug">
            {title}
          </DialogTitle>
        </DialogHeader>
        <Form
          form={form}
          action={formConfig?.endpoint}
          method={formMethod}
          className="space-y-2.5"
        >
          <Field name="email" errorClassName="text-destructive text-xs">
            {({ field, meta }) => (
              <TextInput
                {...field}
                type="email"
                placeholder={emailPlaceholder}
                error={meta.touched && !!meta.error}
                className="w-full"
                aria-label={emailPlaceholder || "Email address"}
              />
            )}
          </Field>
          <Pressable
            componentType="button"
            type="submit"
            className="w-full text-xs uppercase"
            variant="default"
            asButton
            disabled={form.isSubmitting}
          >
            {buttonText}
          </Pressable>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
