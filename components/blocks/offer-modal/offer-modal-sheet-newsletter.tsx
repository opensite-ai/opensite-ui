"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { AspectRatio } from "../../ui/aspect-ratio";
import type {
  ActionConfig,
  ImageItem,
  LogoItem,
  OptixFlowConfig,
  SectionBackground,
} from "../../../src/types";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "flex items-stretch w-full",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "",
};

const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
    columnSpan: 12,
  },
];

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
  /**
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
  /**
   * Submit button configuration
   */
  buttonAction?: ActionConfig;
}

/**
 * OfferModalSheetNewsletter - A side-sheet style newsletter signup modal that slides in from
 * the right. Features a logo, compelling headline, description, email signup form with rounded
 * inputs, legal consent links, and a square aspect ratio promotional image. The sheet design
 * provides a more immersive experience while maintaining easy dismissal. Perfect for premium
 * brands, lifestyle products, or any site wanting a sophisticated newsletter capture experience.
 *
 * The newsletter form is powered by `FormEngine` from `@page-speed/forms/integration`,
 * which handles validation, submission, error handling, and success states.
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
 *   formEngineSetup={{
 *     formConfig: { endpoint: "/api/subscribe", format: "json" },
 *   }}
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
  className,
  contentClassName,
  headerClassName,
  logoClassName,
  titleClassName,
  descriptionClassName,
  formClassName,
  legalClassName,
  imageWrapperClassName,
  imageClassName,
  optixFlowConfig,
  background = "default",
  formEngineSetup,
  buttonAction,
}: OfferModalSheetNewsletterProps): React.JSX.Element {
  const sheetProps =
    open !== undefined ? { open, onOpenChange } : { defaultOpen };

  const renderLogo = React.useMemo(() => {
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

  const renderHeader = React.useMemo(() => {
    if (headerSlot) return headerSlot;

    return (
      <SheetHeader className={cn("gap-8 p-0", headerClassName)}>
        {renderLogo}
        <div className="space-y-4">
          {title && (
            <SheetTitle
              className={cn(
                "text-2xl font-medium leading-tight md:text-3xl lg:text-4xl",
                titleClassName,
              )}
            >
              {title}
            </SheetTitle>
          )}
          {description && (
            <SheetDescription
              className={cn("text-xl leading-tight", descriptionClassName)}
            >
              {description}
            </SheetDescription>
          )}
        </div>
      </SheetHeader>
    );
  }, [
    headerSlot,
    renderLogo,
    headerClassName,
    title,
    titleClassName,
    description,
    descriptionClassName,
  ]);

  const renderForm = React.useMemo(() => {
    if (formSlot) return formSlot;
    if (!formEngineSetup) return null;

    const defaultButtonAction: ActionConfig = {
      label: "",
      variant: "default",
      icon: <DynamicIcon name="lucide/arrow-right" size={16} />,
    };

    const action = buttonAction || defaultButtonAction;

    return (
      <FormEngine
        formEngineSetup={{
          ...formEngineSetup,
          formLayoutSettings: {
            ...formEngineSetup.formLayoutSettings,
            formLayout: "button-group",
            buttonGroupSetup: {
              ...formEngineSetup.formLayoutSettings?.buttonGroupSetup,
              size: "default",
              submitLabel: action.icon || action.label,
              submitVariant: action.variant || "default",
            },
          },
        }}
        defaultFields={DEFAULT_FORM_FIELDS}
        defaultStyleRules={{
          ...DEFAULT_STYLE_RULES,
          formContainer: cn(DEFAULT_STYLE_RULES.formContainer, formClassName),
        }}
      />
    );
  }, [formSlot, formEngineSetup, buttonAction, formClassName]);

  const renderLegal = React.useMemo(() => {
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

  const renderImage = React.useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div className={cn("h-1/2 basis-1/2", imageWrapperClassName)}>
        <AspectRatio ratio={1} className="overflow-hidden">
          <Img
            src={image.src}
            alt={image.alt}
            className={cn(
              "block size-full object-cover object-center",
              imageClassName,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        </AspectRatio>
      </div>
    );
  }, [
    imageSlot,
    image,
    imageWrapperClassName,
    imageClassName,
    optixFlowConfig,
  ]);

  return (
    <Sheet {...sheetProps}>
      <SheetContent
        className={cn(
          "md:max-w-[600px] w-full max-md:max-w-[calc(100dvw-2.5rem)]! [&>button:hover>svg]:rotate-180 [&>button>svg]:size-5 [&>button>svg]:transition-all",
          className,
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
