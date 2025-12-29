"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "../../ui/form-inputs";
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
   * Main title content for the offer
   */
  title?: React.ReactNode;
  /**
   * Placeholder text for the email input
   */
  emailPlaceholder?: string;
  /**
   * Text/content for the subscribe button
   */
  buttonText?: React.ReactNode;
  /**
   * Text/content for the close button
   */
  closeButtonText?: React.ReactNode;
  /**
   * Custom slot for the close button (overrides default close button)
   */
  closeButtonSlot?: React.ReactNode;
  /**
   * Custom slot for the form (overrides default form)
   */
  formSlot?: React.ReactNode;
  /**
   * Custom slot for the header area (overrides title)
   */
  headerSlot?: React.ReactNode;
  /**
   * Whether the dialog is open (controlled mode)
   */
  open?: boolean;
  /**
   * Callback when the dialog open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether the dialog is open by default (uncontrolled mode)
   */
  defaultOpen?: boolean;
  /**
   * Whether clicking outside closes the dialog
   */
  closeOnOutsideClick?: boolean;
  /**
   * Optional custom submission handler for maximum flexibility.
   *
   * Use this when you need complete control over the submission logic,
   * such as custom API calls, analytics tracking, or multi-step workflows.
   *
   * Can be used alone or in combination with `formConfig` for hybrid approaches.
   *
   * @example
   * onSubmit={async (email) => {
   *   await fetch("/api/subscribe", {
   *     method: "POST",
   *     body: JSON.stringify({ email, discount: "35OFF" })
   *   });
   * }}
   */
  onSubmit?: (email: string) => void | Promise<void>;
  /**
   * Optional form submission configuration.
   *
   * **Universal Usage**: Works with ANY REST API endpoint. Simply provide an `endpoint` URL
   * and the form will submit to it in JSON format.
   *
   * @example
   * // Works with any API
   * formConfig={{ endpoint: "https://api.mysite.com/subscribe", format: "json" }}
   *
   * @example
   * // With custom headers (e.g., authentication)
   * formConfig={{
   *   endpoint: "/api/newsletter",
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
  /**
   * Additional CSS classes for the dialog content wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the form
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the email input
   */
  inputClassName?: string;
  /**
   * Additional CSS classes for the submit button
   */
  submitClassName?: string;
  /**
   * Additional CSS classes for the close button
   */
  closeClassName?: string;
}

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
  title = "Join our newsletter and enjoy 35% off your first order",
  emailPlaceholder = "Email",
  buttonText = "Subscribe",
  closeButtonText = "Close",
  closeButtonSlot,
  formSlot,
  headerSlot,
  open,
  onOpenChange,
  defaultOpen = true,
  closeOnOutsideClick = false,
  onSubmit,
  formConfig,
  onSuccess,
  onError,
  className,
  contentClassName,
  headerClassName,
  titleClassName,
  formClassName,
  inputClassName,
  submitClassName,
  closeClassName,
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

  const dialogProps = open !== undefined
    ? { open, onOpenChange }
    : { defaultOpen };

  const renderCloseButton = () => {
    if (closeButtonSlot) return closeButtonSlot;

    return (
      <div className="absolute end-1.5 top-1.5">
        <DialogClose asChild>
          <Pressable
            variant="ghost"
            className={cn("text-muted-foreground text-xs uppercase", closeClassName)}
            size="sm"
            asButton
          >
            {closeButtonText}
          </Pressable>
        </DialogClose>
      </div>
    );
  };

  const renderHeader = () => {
    if (headerSlot) return headerSlot;
    if (!title) return null;

    return (
      <DialogHeader className={headerClassName}>
        {typeof title === "string" ? (
          <DialogTitle className={cn("text-start font-serif text-2xl font-normal leading-snug", titleClassName)}>
            {title}
          </DialogTitle>
        ) : (
          <DialogTitle className={cn("text-start font-serif text-2xl font-normal leading-snug", titleClassName)}>
            {title}
          </DialogTitle>
        )}
      </DialogHeader>
    );
  };

  const renderForm = () => {
    if (formSlot) return formSlot;

    return (
      <Form
        form={form}
        action={formConfig?.endpoint}
        method={formMethod}
        className={cn("space-y-2.5", formClassName)}
      >
        <Field name="email">
          {({ field, meta }) => (
            <div>
              <TextInput
                {...field}
                type="email"
                placeholder={emailPlaceholder}
                error={meta.touched && !!meta.error}
                className={cn("w-full", inputClassName)}
                aria-label={emailPlaceholder || "Email address"}
                required
              />
              {meta.touched && meta.error && (
                <div className="text-destructive text-xs mt-1">
                  {meta.error}
                </div>
              )}
            </div>
          )}
        </Field>
        <Pressable
          componentType="button"
          type="submit"
          className={cn("w-full text-xs uppercase", submitClassName)}
          variant="default"
          asButton
          disabled={form.isSubmitting}
        >
          {buttonText}
        </Pressable>
      </Form>
    );
  };

  return (
    <Dialog {...dialogProps} modal={false}>
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
        <div className={contentClassName}>
          {renderCloseButton()}
          {renderHeader()}
          {renderForm()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
