"use client";

import * as React from "react";
const { useMemo } = React;
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
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
import type { ImageItem, LogoItem, OptixFlowConfig, SectionBackground } from "../../../src/types";

export interface OfferModalSheetNewsletterProps {
  /**
   * Logo configuration
   */
  logo?: LogoItem;
  /**
   * Custom slot for rendering the logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Main title content for the offer
   */
  title?: React.ReactNode;
  /**
   * Description content below the title
   */
  description?: React.ReactNode;
  /**
   * Image configuration for the bottom section
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
   * Text/content for the submit button
   */
  buttonText?: React.ReactNode;
  /**
   * Terms of use link URL
   */
  termsUrl?: string;
  /**
   * Terms of use link text
   */
  termsText?: React.ReactNode;
  /**
   * Privacy policy link URL
   */
  privacyUrl?: string;
  /**
   * Privacy policy link text
   */
  privacyText?: React.ReactNode;
  /**
   * Custom slot for the legal text area (overrides terms/privacy links)
   */
  legalSlot?: React.ReactNode;
  /**
   * Custom slot for the close button (overrides default close button)
   */
  closeButtonSlot?: React.ReactNode;
  /**
   * Custom slot for the form (overrides default form)
   */
  formSlot?: React.ReactNode;
  /**
   * Custom slot for the header area (overrides logo, title, description)
   */
  headerSlot?: React.ReactNode;
  /**
   * Whether the sheet is open (controlled mode)
   */
  open?: boolean;
  /**
   * Callback when the sheet open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether the sheet is open by default (uncontrolled mode)
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
   * Additional CSS classes for the sheet content wrapper
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
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
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
   * Additional CSS classes for the legal text
   */
  legalClassName?: string;
  /**
   * Additional CSS classes for the image wrapper
   */
  imageWrapperClassName?: string;
  /**
   * Additional CSS classes for the image element
   */
  imageClassName?: string;
  /**
   * Optional configuration for OptixFlow image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Background style variant for the section
   * @default "default"
   */
  background?: SectionBackground;
}

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
  logo,
  logoSlot,
  title,
  description,
  image,
  imageSlot,
  emailPlaceholder,
  buttonText,
  termsUrl,
  termsText,
  privacyUrl,
  privacyText,
  legalSlot,
  closeButtonSlot,
  formSlot,
  headerSlot,
  open,
  onOpenChange,
  defaultOpen = true,
  onSubmit,
  formConfig,
  onSuccess,
  onError,
  className,
  contentClassName,
  headerClassName,
  logoClassName,
  titleClassName,
  descriptionClassName,
  formClassName,
  inputClassName,
  submitClassName,
  legalClassName,
  imageWrapperClassName,
  imageClassName,
  optixFlowConfig,
  background = "default",
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

  const sheetProps = open !== undefined
    ? { open, onOpenChange }
    : { defaultOpen };

  const renderLogo = useMemo(() => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;

    return (
      <Img
        src={logoSrc}
        alt={logo.alt}
        className={cn("size-11 lg:size-16 dark:invert", logoClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [logoSlot, logo, logoClassName, optixFlowConfig]);

  const renderHeader = useMemo(() => {
    if (headerSlot) return headerSlot;

    return (
      <SheetHeader className={cn("gap-8 p-0", headerClassName)}>
        {renderLogo}
        <div className="space-y-4">
          {title && (
            <SheetTitle className={cn("text-2xl font-medium leading-tight md:text-3xl lg:text-4xl", titleClassName)}>
              {title}
            </SheetTitle>
          )}
          {description && (
            <SheetDescription className={cn("text-xl leading-tight", descriptionClassName)}>
              {description}
            </SheetDescription>
          )}
        </div>
      </SheetHeader>
    );
  }, [headerSlot, renderLogo, headerClassName, title, titleClassName, description, descriptionClassName]);

  const renderForm = useMemo(() => {
    if (formSlot) return formSlot;

    return (
      <Form
        form={form}
        action={formConfig?.endpoint}
        method={formMethod}
        className={formClassName}
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
                  className={cn("h-10 w-full rounded-full px-6", inputClassName)}
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
            className={cn("sm:basis-30 rounded-full max-sm:w-full", submitClassName)}
            asButton
            componentType="button"
            type="submit"
            disabled={form.isSubmitting}
          >
            {buttonText}
          </Pressable>
        </div>
      </Form>
    );
  }, [formSlot, form, formConfig, formMethod, emailPlaceholder, inputClassName, submitClassName, buttonText, formClassName]);

  const renderLegal = useMemo(() => {
    if (legalSlot) return legalSlot;
    if (!termsUrl || !termsText || !privacyUrl || !privacyText) return null;

    return (
      <p className={cn("text-muted-foreground text-xs", legalClassName)}>
        By signing up, you consent to our{" "}
        <Pressable href={termsUrl} className="underline-offset-3 underline">
          {termsText}
        </Pressable>{" "}
        and{" "}
        <Pressable href={privacyUrl} className="underline-offset-3 underline">
          {privacyText}
        </Pressable>
        .
      </p>
    );
  }, [legalSlot, termsUrl, termsText, privacyUrl, privacyText, legalClassName]);

  const renderImage = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div className={cn("h-1/2 basis-1/2", imageWrapperClassName)}>
        <AspectRatio ratio={1} className="overflow-hidden">
          <Img
            src={image.src}
            alt={image.alt}
            className={cn("block size-full object-cover object-center", imageClassName)}
            optixFlowConfig={optixFlowConfig}
          />
        </AspectRatio>
      </div>
    );
  }, [imageSlot, image, imageWrapperClassName, imageClassName, optixFlowConfig]);

  return (
    <Sheet {...sheetProps}>
      <SheetContent
        className={cn(
          "md:max-w-[600px] w-full max-md:max-w-[calc(100dvw-2.5rem)]! [&>button:hover>svg]:rotate-180 [&>button>svg]:size-5 [&>button>svg]:transition-all",
          className
        )}
      >
        <Section background={background} spacing="none">
          <div className={cn("max-h-full overflow-y-auto", contentClassName)}>
            <div className="space-y-4 p-6 md:p-16">
              <div className="basis-1/2 space-y-8">
                {renderHeader}
                {renderForm}
              </div>
              {renderLegal}
            </div>
            {renderImage}
          </div>
        </Section>
      </SheetContent>
    </Sheet>
  );
}
