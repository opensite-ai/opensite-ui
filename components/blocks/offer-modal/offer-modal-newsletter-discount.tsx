"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import type { ActionConfig, SectionBackground } from "../../../src/types";
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

export interface OfferModalNewsletterDiscountProps {
  /**
   * Main title content for the offer
   */
  title?: React.ReactNode;
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
   * Additional CSS classes for the close button
   */
  closeClassName?: string;
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
 * OfferModalNewsletterDiscount - A compact newsletter signup modal positioned at the bottom-right
 * of the screen. Features a clean design with a close button, compelling headline, email input,
 * and subscribe CTA. Perfect for e-commerce sites offering first-purchase discounts or newsletter
 * signup incentives.
 *
 * The newsletter form is powered by `FormEngine` from `@page-speed/forms/integration`,
 * which handles validation, submission, error handling, and success states.
 *
 * @example
 * ```tsx
 * <OfferModalNewsletterDiscount
 *   title="Join our newsletter and enjoy 35% off your first order"
 *   formEngineSetup={{
 *     formConfig: { endpoint: "/api/subscribe", format: "json" },
 *   }}
 * />
 * ```
 */
export function OfferModalNewsletterDiscount({
  title,
  closeButtonText,
  closeButtonSlot,
  formSlot,
  headerSlot,
  open,
  onOpenChange,
  defaultOpen = true,
  closeOnOutsideClick = false,
  className,
  contentClassName,
  headerClassName,
  titleClassName,
  formClassName,
  closeClassName,
  background = "default",
  formEngineSetup,
  buttonAction,
}: OfferModalNewsletterDiscountProps): React.JSX.Element {
  const dialogProps =
    open !== undefined ? { open, onOpenChange } : { defaultOpen };

  const renderCloseButton = React.useMemo(() => {
    if (closeButtonSlot) return closeButtonSlot;
    if (!closeButtonText) return null;

    return (
      <div className="absolute end-1.5 top-1.5">
        <DialogClose asChild>
          <Pressable
            variant="ghost"
            className={cn(
              "text-muted-foreground text-xs uppercase",
              closeClassName,
            )}
            size="sm"
            asButton
          >
            {closeButtonText}
          </Pressable>
        </DialogClose>
      </div>
    );
  }, [closeButtonSlot, closeButtonText, closeClassName]);

  const renderHeader = React.useMemo(() => {
    if (headerSlot) return headerSlot;
    if (!title) return null;

    return (
      <DialogHeader className={headerClassName}>
        <DialogTitle
          className={cn(
            "text-start font-serif text-2xl font-normal leading-snug",
            titleClassName,
          )}
        >
          {title}
        </DialogTitle>
      </DialogHeader>
    );
  }, [headerSlot, title, headerClassName, titleClassName]);

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
          "duration-400 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full max-w-[460px] bottom-4 left-auto right-4 top-auto block h-fit max-h-dvh translate-x-0 translate-y-0 rounded-sm",
          className,
        )}
      >
        <Section background={background} spacing="none">
          <div className={cn("space-y-2.5 p-10", contentClassName)}>
            {renderCloseButton}
            {renderHeader}
            {renderForm}
          </div>
        </Section>
      </DialogContent>
    </Dialog>
  );
}
