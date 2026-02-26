"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../../ui/dialog";
import type {
  ActionConfig,
  ImageItem,
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
 * OfferModalMembershipImage - A visually rich membership offer modal featuring a header image,
 * overline text, compelling title, email signup form with icon, and descriptive footer text.
 * Includes responsive design with mobile-optimized layout and hover animations on the close button.
 * Ideal for e-commerce membership programs, exclusive offers, or premium newsletter signups.
 *
 * The newsletter form is powered by `FormEngine` from `@page-speed/forms/integration`,
 * which handles validation, submission, error handling, and success states.
 *
 * @example
 * ```tsx
 * <OfferModalMembershipImage
 *   overline="Treat Yourself!"
 *   title="Become a Member & Enjoy 20% Off"
 *   description="Sign up to receive our latest updates."
 *   image={{ src: "/promo.jpg", alt: "Promotional image" }}
 *   formEngineSetup={{
 *     formConfig: { endpoint: "/api/subscribe", format: "json" },
 *   }}
 * />
 * ```
 */
export function OfferModalMembershipImage({
  overline,
  title,
  description,
  image,
  imageSlot,
  closeButtonSlot,
  formSlot,
  footerSlot,
  open,
  onOpenChange,
  defaultOpen = true,
  className,
  imageWrapperClassName,
  imageClassName,
  contentClassName,
  overlineClassName,
  titleClassName,
  descriptionClassName,
  formClassName,
  closeClassName,
  footerClassName,
  optixFlowConfig,
  background = "default",
  formEngineSetup,
  buttonAction,
}: OfferModalMembershipImageProps): React.JSX.Element {
  const dialogProps =
    open !== undefined ? { open, onOpenChange } : { defaultOpen };

  const renderImage = React.useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div
        className={cn(
          "max-h-[290px] h-full overflow-hidden max-lg:hidden",
          imageWrapperClassName,
        )}
      >
        <Img
          src={image.src}
          alt={image.alt}
          className={cn(
            "block size-full object-cover object-[50%_15%]",
            imageClassName,
          )}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  }, [
    imageSlot,
    image,
    imageWrapperClassName,
    imageClassName,
    optixFlowConfig,
  ]);

  const renderCloseButton = React.useMemo(() => {
    if (closeButtonSlot) return closeButtonSlot;

    return (
      <div className="absolute -end-px -top-px z-10">
        <DialogClose asChild>
          <Pressable
            size="icon-sm"
            variant="default"
            className={cn(
              "origin-top-right rounded-none transition-all duration-300 lg:scale-50 lg:opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100",
              closeClassName,
            )}
            asButton
          >
            <DynamicIcon name="lucide/x" size={16} />
          </Pressable>
        </DialogClose>
      </div>
    );
  }, [closeButtonSlot, closeClassName]);

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

  const renderFooter = React.useMemo(() => {
    if (footerSlot) return footerSlot;
    if (!description) return null;

    return (
      <DialogFooter className={footerClassName}>
        <DialogDescription
          className={cn(
            "text-muted-foreground text-center text-xs leading-relaxed",
            descriptionClassName,
          )}
        >
          {description}
        </DialogDescription>
      </DialogFooter>
    );
  }, [footerSlot, description, footerClassName, descriptionClassName]);

  return (
    <Dialog {...dialogProps}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "data-[state=closed]:slide-out-to-bottom-30 data-[state=open]:slide-in-from-bottom-30 sm:max-w-[760px] lg:max-w-[470px] group max-h-[calc(100dvh-2rem)] max-w-full gap-0 rounded-none border-none p-0 max-lg:bottom-0 max-lg:top-auto max-lg:translate-y-0",
          className,
        )}
      >
        {renderCloseButton}
        {renderImage}
        <Section background={background} spacing="none">
          <div
            className={cn(
              "lg:px-15 space-y-5 overflow-y-auto px-9 py-5 lg:py-7",
              contentClassName,
            )}
          >
            <div className="space-y-2.5">
              {overline &&
                (typeof overline === "string" ? (
                  <p
                    className={cn(
                      "text-center text-sm font-bold uppercase leading-none",
                      overlineClassName,
                    )}
                  >
                    {overline}
                  </p>
                ) : (
                  <div className={overlineClassName}>{overline}</div>
                ))}
              {title && (
                <DialogTitle
                  className={cn(
                    "text-center text-3xl font-bold",
                    titleClassName,
                  )}
                >
                  {title}
                </DialogTitle>
              )}
            </div>
            {renderForm}
            {renderFooter}
          </div>
        </Section>
      </DialogContent>
    </Dialog>
  );
}
