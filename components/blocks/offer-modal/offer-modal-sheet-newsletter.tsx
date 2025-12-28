"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "@page-speed/forms/inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { AspectRatio } from "../../ui/aspect-ratio";
import {
  logoPlaceholders,
  imagePlaceholders,
} from "../../../lib/mediaPlaceholders";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";

export interface OfferModalSheetNewsletterProps {
  /**
   * Logo configuration
   */
  logo?: {
    src: string;
    alt: string;
  };
  /**
   * Main title text for the offer
   */
  title?: string;
  /**
   * Description text below the title
   */
  description?: string;
  /**
   * Image configuration for the bottom section
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
   * Terms of use link URL
   */
  termsUrl?: string;
  /**
   * Privacy policy link URL
   */
  privacyUrl?: string;
  /**
   * Whether the sheet is open by default
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
   *     body: JSON.stringify({ email, source: "offer-modal" })
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
   * Additional CSS classes for the sheet content
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

const defaultProps: Partial<OfferModalSheetNewsletterProps> = {
  logo: {
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
  },
  title: "Join Now & Enjoy 20% Off",
  description:
    "Join our mailing list for updates and offers. You can unsubscribe at any time.",
  image: {
    src: imagePlaceholders[1],
    alt: "Newsletter promotional image",
  },
  emailPlaceholder: "Email Address",
  buttonText: "Join",
  termsUrl: "#",
  privacyUrl: "#",
  defaultOpen: true,
};

/**
 * OfferModalSheetNewsletter - A side-sheet style newsletter signup modal that slides in from
 * the right. Features a logo, compelling headline, description, email signup form with rounded
 * inputs, legal consent links, and a square aspect ratio promotional image. The sheet design
 * provides a more immersive experience while maintaining easy dismissal. Perfect for premium
 * brands, lifestyle products, or any site wanting a sophisticated newsletter capture experience.
 *
 * @example
 * ```tsx
 * <OfferModalSheetNewsletter
 *   logo={{ src: "/logo.png", alt: "Brand Logo" }}
 *   title="Join Now & Enjoy 20% Off"
 *   description="Join our mailing list for updates and offers."
 *   image={{ src: "/promo.jpg", alt: "Promotional image" }}
 *   termsUrl="/terms"
 *   privacyUrl="/privacy"
 *   onSubmit={(email) => console.log('Subscribed:', email)}
 * />
 * ```
 */
export function OfferModalSheetNewsletter({
  logo = defaultProps.logo,
  title = defaultProps.title,
  description = defaultProps.description,
  image = defaultProps.image,
  emailPlaceholder = defaultProps.emailPlaceholder,
  buttonText = defaultProps.buttonText,
  termsUrl = defaultProps.termsUrl,
  privacyUrl = defaultProps.privacyUrl,
  defaultOpen = defaultProps.defaultOpen,
  onSubmit,
  formConfig,
  onSuccess,
  onError,
  className,
  optixFlowConfig,
}: OfferModalSheetNewsletterProps): React.JSX.Element {
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

  return (
    <Sheet defaultOpen={defaultOpen}>
      <SheetContent
        className={cn(
          "md:max-w-[600px] w-full max-md:max-w-[calc(100dvw-2.5rem)]! [&>button:hover>svg]:rotate-180 [&>button>svg]:size-5 [&>button>svg]:transition-all",
          className
        )}
      >
        <div className="max-h-full overflow-y-auto">
          <div className="space-y-4 p-6 md:p-16">
            <div className="basis-1/2 space-y-8">
              <SheetHeader className="gap-8 p-0">
                {logo && (
                  <Img
                    src={logo.src}
                    alt={logo.alt}
                    className="size-11 lg:size-16 dark:invert"
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
                <div className="space-y-4">
                  <SheetTitle className="text-2xl font-medium leading-tight md:text-3xl lg:text-4xl">
                    {title}
                  </SheetTitle>
                  <SheetDescription className="text-xl leading-tight">
                    {description}
                  </SheetDescription>
                </div>
              </SheetHeader>
              <Form
                form={form}
                action={formConfig?.endpoint}
                method={formMethod}
              >
                <div className="flex items-start gap-3 max-sm:flex-col">
                  <Field
                    name="email"
                    className="w-full flex-1"
                  >
                    {({ field, meta }) => (
                      <div className="w-full">
                        <TextInput
                          {...field}
                          type="email"
                          className="h-10 w-full rounded-full px-6"
                          placeholder={emailPlaceholder}
                          error={(meta.touched || form.status === 'error') && !!meta.error}
                          aria-label={emailPlaceholder || "Email address"}
                        />
                        {(meta.touched || form.status === 'error') && meta.error && (
                          <div className="text-destructive mt-1 text-xs">
                            {meta.error}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                  <Pressable
                    size="lg"
                    variant="default"
                    className="sm:basis-30 rounded-full max-sm:w-full"
                    asButton
                    componentType="button"
                    type="submit"
                    disabled={form.isSubmitting}
                  >
                    {buttonText}
                  </Pressable>
                </div>
              </Form>
            </div>
            <p className="text-muted-foreground text-xs">
              By signing up, you consent to our{" "}
              <Pressable href={termsUrl} className="underline-offset-3 underline">
                Terms of Use
              </Pressable>{" "}
              and{" "}
              <Pressable href={privacyUrl} className="underline-offset-3 underline">
                Privacy Policy
              </Pressable>
              .
            </p>
          </div>
          {image && (
            <div className="h-1/2 basis-1/2">
              <AspectRatio ratio={1} className="overflow-hidden">
                <Img
                  src={image.src}
                  alt={image.alt}
                  className="block size-full object-cover object-center"
                  optixFlowConfig={optixFlowConfig}
                />
              </AspectRatio>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
