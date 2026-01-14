"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../../ui/dialog";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import type { ImageItem, OptixFlowConfig } from "../../../src/types";

export interface OfferModalMembershipImageProps {
  /**
   * Overline/eyebrow content displayed above the title
   */
  overline?: React.ReactNode;
  /**
   * Main title content for the offer
   */
  title?: React.ReactNode;
  /**
   * Description content displayed below the form
   */
  description?: React.ReactNode;
  /**
   * Image configuration for the header
   */
  image?: ImageItem;
  /**
   * Custom slot for rendering the image (overrides image prop)
   */
  imageSlot?: React.ReactNode;
  /**
   * Placeholder text for the email input
   */
  emailPlaceholder?: string;
  /**
   * Text for the submit button
   */
  buttonText?: React.ReactNode;
  /**
   * Custom slot for the close button (overrides default close button)
   */
  closeButtonSlot?: React.ReactNode;
  /**
   * Custom slot for the form (overrides default form)
   */
  formSlot?: React.ReactNode;
  /**
   * Custom slot for the footer/description area (overrides description)
   */
  footerSlot?: React.ReactNode;
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
   *     body: JSON.stringify({ email, membership: "premium" })
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
   * Additional CSS classes for the image wrapper
   */
  imageWrapperClassName?: string;
  /**
   * Additional CSS classes for the image element
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the content area (below image)
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the overline text
   */
  overlineClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
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
  /**
   * Additional CSS classes for the footer
   */
  footerClassName?: string;
  /**
   * Optional configuration for OptixFlow image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * OfferModalMembershipImage - A visually rich membership offer modal featuring a header image,
 * overline text, compelling title, email signup form with icon, and descriptive footer text.
 * Includes responsive design with mobile-optimized layout and hover animations on the close button.
 * Ideal for e-commerce membership programs, exclusive offers, or premium newsletter signups.
 *
 * @example
 * ```tsx
 * <OfferModalMembershipImage
 *   overline="Treat Yourself!"
 *   title="Become a Member & Enjoy 20% Off"
 *   description="Sign up to receive our latest updates."
 *   image={{ src: "/promo.jpg", alt: "Promotional image" }}
 *   onSubmit={(email) => console.log('Subscribed:', email)}
 * />
 * ```
 */
export function OfferModalMembershipImage({
  overline = "Treat Yourself!",
  title = "Become a Member & Enjoy 20% Off",
  description = "Sign up to receive our latest updates — you can unsubscribe whenever you like.",
  image,
  imageSlot,
  emailPlaceholder = "Email Address",
  buttonText = "Get Offer",
  closeButtonSlot,
  formSlot,
  footerSlot,
  open,
  onOpenChange,
  defaultOpen = true,
  onSubmit,
  formConfig,
  onSuccess,
  onError,
  className,
  imageWrapperClassName,
  imageClassName,
  contentClassName,
  overlineClassName,
  titleClassName,
  descriptionClassName,
  formClassName,
  inputClassName,
  submitClassName,
  closeClassName,
  footerClassName,
  optixFlowConfig,
}: OfferModalMembershipImageProps): React.JSX.Element {
  const form = useForm<{ email: string }>({
    initialValues: {
      email: "",
    },
    validationSchema: {
      email: (value) => {
        if (!value) return "Please enter an email address";
        if (!isValidEmail(value)) {
          return "Please enter a valid email address";
        }
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

  const renderImage = () => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div className={cn("max-h-[290px] h-full overflow-hidden max-lg:hidden", imageWrapperClassName)}>
        <Img
          src={image.src}
          alt={image.alt}
          className={cn("block size-full object-cover object-[50%_15%]", imageClassName)}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  };

  const renderCloseButton = () => {
    if (closeButtonSlot) return closeButtonSlot;

    return (
      <div className="absolute -end-px -top-px z-10">
        <DialogClose asChild>
          <Pressable
            size="icon-sm"
            variant="default"
            className={cn(
              "origin-top-right rounded-none transition-all duration-300 lg:scale-50 lg:opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100",
              closeClassName
            )}
            asButton
          >
            <DynamicIcon name="lucide/x" size={16} />
          </Pressable>
        </DialogClose>
      </div>
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
        <div className="flex items-center gap-2.5">
          <Field
            name="email"
            className="flex-1"
          >
            {({ field, meta }) => (
              <div className="relative flex-1">
                <TextInput
                  {...field}
                  type="email"
                  placeholder={emailPlaceholder}
                  error={(meta.touched || form.status === 'error') && !!meta.error}
                  className={cn("w-full pr-10", inputClassName)}
                  aria-label={emailPlaceholder || "Email address"}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <DynamicIcon name="lucide/mail" size={16} />
                </div>
                {(meta.touched || form.status === 'error') && meta.error && (
                  <div className="text-destructive mt-1 text-xs">
                    {meta.error}
                  </div>
                )}
              </div>
            )}
          </Field>
          <Pressable
            size="icon"
            variant="default"
            className={cn("lg:hidden", submitClassName)}
            asButton
            componentType="button"
            type="submit"
            disabled={form.isSubmitting}
          >
            <DynamicIcon name="lucide/arrow-right" size={16} />
          </Pressable>
        </div>
        <Pressable
          className={cn("w-full max-lg:hidden", submitClassName)}
          variant="default"
          asButton
          componentType="button"
          type="submit"
          disabled={form.isSubmitting}
        >
          {buttonText}
        </Pressable>
      </Form>
    );
  };

  const renderFooter = () => {
    if (footerSlot) return footerSlot;
    if (!description) return null;

    return (
      <DialogFooter className={footerClassName}>
        <DialogDescription className={cn("text-muted-foreground text-center text-xs leading-relaxed", descriptionClassName)}>
          {description}
        </DialogDescription>
      </DialogFooter>
    );
  };

  return (
    <Dialog {...dialogProps}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "data-[state=closed]:slide-out-to-bottom-30 data-[state=open]:slide-in-from-bottom-30 sm:max-w-[760px] lg:max-w-[470px] group max-h-[calc(100dvh-2rem)] max-w-full gap-0 rounded-none border-none p-0 max-lg:bottom-0 max-lg:top-auto max-lg:translate-y-0",
          className
        )}
      >
        {renderCloseButton()}
        {renderImage()}
        <div className={cn("lg:px-15 space-y-5 overflow-y-auto px-9 py-5 lg:py-7", contentClassName)}>
          <div className="space-y-2.5">
            {overline && (
              typeof overline === "string" ? (
                <p className={cn("text-center text-sm font-bold uppercase leading-none", overlineClassName)}>
                  {overline}
                </p>
              ) : (
                <div className={overlineClassName}>{overline}</div>
              )
            )}
            {title && (
              <DialogTitle className={cn("text-center text-3xl font-bold", titleClassName)}>
                {title}
              </DialogTitle>
            )}
          </div>
          {renderForm()}
          {renderFooter()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
