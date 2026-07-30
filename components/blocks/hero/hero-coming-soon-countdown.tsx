"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SocialLinkItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Badge, SocialLinkIcon } from "@/src";
import { Form } from "@page-speed/forms";
import {
  DynamicFormField,
  useContactForm,
  useFileUpload,
  type FormFieldConfig,
  type PageSpeedFormConfig,
} from "@page-speed/forms/integration";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

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

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const digitVariants = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 25 },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

function CountdownDigit({ value, label }: { value: number; label: string }) {
  const display = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center bg-card pt-2 pb-6 px-2 text-card-foreground rounded-xl md:rounded-2xl shadow-xl">
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl text-3xl font-bold md:h-24 md:w-24 md:text-5xl",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            variants={digitVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className={cn("mt-2 text-xs md:text-sm")}>{label}</span>
    </div>
  );
}

export interface HeroComingSoonCountdownProps {
  /**
   * Badge icon name (DynamicIcon format)
   */
  badgeIcon?: string;
  /**
   * Badge text content
   */
  badgeText?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Target date for the countdown. If in the past or not provided, countdown is hidden.
   */
  countdownDate?: Date;
  /**
   * Custom slot for countdown (overrides countdownDate)
   */
  countdownSlot?: React.ReactNode;
  /**
   * Form field configuration
   */
  formFields?: FormFieldConfig[];
  /**
   * Form configuration for submission
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Custom submit handler
   */
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  /**
   * Success callback
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Error callback
   */
  onError?: (error: Error) => void;
  /**
   * Success message to display
   */
  successMessage?: React.ReactNode;
  /**
   * Submit button configuration
   */
  buttonAction?: ActionConfig;
  /**
   * Helper text below form
   */
  helperText?: React.ReactNode;
  /**
   * Custom slot for the form (overrides form props)
   */
  formSlot?: React.ReactNode;
  /**
   * Social link items
   */
  socialLinks?: Array<SocialLinkItem & { iconName?: string }>;
  /**
   * Custom slot for social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the countdown container
   */
  countdownClassName?: string;
  /**
   * Additional CSS classes for the form container
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroComingSoonCountdown({
  sectionId = "hero-coming-soon-countdown",
  badgeIcon,
  badgeText,
  heading,
  description,
  countdownDate,
  countdownSlot,
  formFields = DEFAULT_FORM_FIELDS,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
  successMessage,
  buttonAction,
  helperText,
  formSlot,
  socialLinks,
  socialLinksSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  countdownClassName,
  formClassName,
  socialLinksClassName,
  logo,
  logoSlot,
  logoClassName,
}: HeroComingSoonCountdownProps): React.JSX.Element {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft | null>(null);

  const {
    uploadTokens,
    uploadProgress,
    isUploading,
    uploadFiles,
    removeFile,
    resetUpload,
  } = useFileUpload({ onError });

  const { form, submissionError, formMethod, resetSubmissionState } =
    useContactForm({
      formFields,
      formConfig,
      onSubmit,
      onSuccess: (data) => {
        resetUpload();
        onSuccess?.(data);
      },
      onError,
      uploadTokens,
    });

  const calculateTimeLeft = React.useCallback((): TimeLeft | null => {
    if (!countdownDate) return null;
    const now = Date.now();
    const target = countdownDate.getTime();
    const diff = target - now;

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }, [countdownDate]);

  React.useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    if (!countdownDate) return;

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (!remaining) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownDate, calculateTimeLeft]);

  const showCountdown = countdownSlot || timeLeft;

  const renderForm = React.useMemo(() => {
    if (formSlot) return formSlot;

    const defaultButtonAction: ActionConfig = {
      label: "Notify Me",
      variant: "default",
      className: "h-12",
    };

    const action = buttonAction || defaultButtonAction;

    return (
      <Form
        form={form}
        fields={formFields}
        notificationConfig={{
          submissionError,
          successMessage,
        }}
        formConfig={{
          endpoint: formConfig?.endpoint,
          method: formMethod,
          submissionConfig: formConfig?.submissionConfig,
          formLayout: "button-group",
          buttonGroupSize: "lg",
          submitLabel: action.label,
          submitVariant: action.variant || "default",
        }}
        onNewSubmission={() => {
          resetUpload();
          resetSubmissionState();
        }}
      >
        {formFields.map((field) => (
          <div key={field.name} className="flex-1">
            <DynamicFormField
              field={field}
              uploadProgress={uploadProgress}
              onFileUpload={uploadFiles}
              onFileRemove={removeFile}
              isUploading={isUploading}
            />
          </div>
        ))}
        <Pressable
          onClick={form.handleSubmit}
          asButton
          variant={action.variant}
          className={cn("h-12", action.className)}
          disabled={form.isSubmitting}
        >
          {action.children ?? (
            <>
              {action.label}
              {action.iconAfter === "" ? null : (
                <DynamicIcon name={action.iconAfter} />
              )}
            </>
          )}
        </Pressable>
        {helperText &&
          (typeof helperText === "string" ? (
            <p className={cn("text-sm mt-2 text-center")}>{helperText}</p>
          ) : (
            helperText
          ))}
      </Form>
    );
  }, [
    formSlot,
    formFields,
    form,
    formConfig,
    formMethod,
    buttonAction,
    uploadProgress,
    uploadFiles,
    removeFile,
    isUploading,
    submissionError,
    successMessage,
    helperText,
    resetUpload,
    resetSubmissionState,
  ]);

  const renderSocialLinks = React.useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((link, index) => (
      <SocialLinkIcon
        key={index}
        href={link.href}
        className={cn("hover:opacity-80", link.className)}
        asButton
        variant="outline"
        size="icon"
      />
    ));
  }, [socialLinksSlot, socialLinks, background]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="px-6 py-8 md:px-12 md:py-12 lg:py-16 lg:px-16 rounded-2xl flex flex-col items-center text-center bg-muted gap-4 md:gap-8">
        {(badgeText || badgeIcon) && (
          <Badge className={cn("gap-2 px-4 py-2", badgeClassName)}>
            {badgeIcon && <DynamicIcon name={badgeIcon} size={16} />}
            <span>{badgeText}</span>
          </Badge>
        )}
        {(logo || logoSlot) && (

          <div className={cn("mb-4 flex justify-center", logoClassName)}>

            <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />

          </div>

        )}

        
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "max-w-full md:max-w-lg text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl text-balance",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            heading
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "max-w-full md:max-w-md text-lg md:text-xl text-balance",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            description
          ))}
        {showCountdown && (
          <div
            className={cn(
              "py-8 grid grid-cols-4 gap-2 md:gap-4 lg:gap-8",
              countdownClassName,
            )}
          >
            {countdownSlot ?? (
              <>
                <CountdownDigit value={timeLeft!.days} label="Days" />
                <CountdownDigit value={timeLeft!.hours} label="Hours" />
                <CountdownDigit value={timeLeft!.minutes} label="Minutes" />
                <CountdownDigit value={timeLeft!.seconds} label="Seconds" />
              </>
            )}
          </div>
        )}
        <div
          className={cn(
            "flex w-full max-w-md flex-col gap-4 sm:flex-row items-center justify-center",
            formClassName,
          )}
        >
          {renderForm}
        </div>
        {(socialLinksSlot || (socialLinks && socialLinks.length > 0)) && (
          <div
            className={cn("mt-8 flex items-center gap-6", socialLinksClassName)}
          >
            {renderSocialLinks}
          </div>
        )}
      </div>
    </Section>
  );
}
