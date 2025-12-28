"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "@page-speed/forms/inputs";
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

export interface OfferModalMembershipImageProps {
  /**
   * Overline text displayed above the title
   */
  overline?: string;
  /**
   * Main title text for the offer
   */
  title?: string;
  /**
   * Description text displayed below the form
   */
  description?: string;
  /**
   * Image configuration for the header
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Placeholder text for the email input
   */
  emailPlaceholder?: string;
  /**
   * Text for the submit button
   */
  buttonText?: string;
  /**
   * Whether the dialog is open by default
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
   * Additional CSS classes for the dialog content
   */
  className?: string;
  /**
   * Optional configuration for OptixFlow image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: Partial<OfferModalMembershipImageProps> = {
  overline: "Treat Yourself!",
  title: "Become a Member & Enjoy 20% Off",
  description:
    "Sign up to receive our latest updates — you can unsubscribe whenever you like.",
  image: {
    src: imagePlaceholders[0],
    alt: "Promotional offer image",
  },
  emailPlaceholder: "Email Address",
  buttonText: "Get Offer",
  defaultOpen: true,
};

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
  overline = defaultProps.overline,
  title = defaultProps.title,
  description = defaultProps.description,
  image = defaultProps.image,
  emailPlaceholder = defaultProps.emailPlaceholder,
  buttonText = defaultProps.buttonText,
  defaultOpen = defaultProps.defaultOpen,
  onSubmit,
  formConfig,
  onSuccess,
  onError,
  className,
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

      // Allow form submission even without handlers to enable validation
      if (!shouldAutoSubmit && !onSubmit) {
        // Validation has already run, just return without doing anything
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
    <Dialog defaultOpen={defaultOpen}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "data-[state=closed]:slide-out-to-bottom-30 data-[state=open]:slide-in-from-bottom-30 sm:max-w-[760px] lg:max-w-[470px] group max-h-[calc(100dvh-2rem)] max-w-full gap-0 rounded-none border-none p-0 max-lg:bottom-0 max-lg:top-auto max-lg:translate-y-0",
          className
        )}
      >
        <div className="absolute -end-px -top-px z-10">
          <DialogClose asChild>
            <Pressable
              size="icon-sm"
              variant="default"
              className="origin-top-right rounded-none transition-all duration-300 lg:scale-50 lg:opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100"
              asButton
            >
              <DynamicIcon name="lucide/x" size={16} />
            </Pressable>
          </DialogClose>
        </div>
        {image && (
          <div className="max-h-[290px] h-full overflow-hidden max-lg:hidden">
            <Img
              src={image.src}
              alt={image.alt}
              className="block size-full object-cover object-[50%_15%]"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}
        <div className="lg:px-15 space-y-5 overflow-y-auto px-9 py-5 lg:py-7">
          <div className="space-y-2.5">
            <p className="text-center text-sm font-bold uppercase leading-none">
              {overline}
            </p>
            <DialogTitle className="text-center text-3xl font-bold">
              {title}
            </DialogTitle>
          </div>
          <Form
            form={form}
            action={formConfig?.endpoint}
            method={formMethod}
            className="space-y-2.5"
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
                      className="w-full pr-10"
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
                className="lg:hidden"
                asButton
                componentType="button"
                type="submit"
                disabled={form.isSubmitting}
              >
                <DynamicIcon name="lucide/arrow-right" size={16} />
              </Pressable>
            </div>
            <Pressable
              className="w-full max-lg:hidden"
              variant="default"
              asButton
              componentType="button"
              type="submit"
              disabled={form.isSubmitting}
            >
              {buttonText}
            </Pressable>
          </Form>
          <DialogFooter>
            <DialogDescription className="text-muted-foreground text-center text-xs leading-relaxed">
              {description}
            </DialogDescription>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
