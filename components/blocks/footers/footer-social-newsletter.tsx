"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { FooterLogo } from "../../ui/footer-logo";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types/blocks";
import type { PatternName } from "../../ui/pattern-background";
import type { FooterSocialLink } from "./types";
import { Form } from "@page-speed/forms";
import {
  DynamicFormField,
  useContactForm,
  useFileUpload,
  type FormFieldConfig,
  type PageSpeedFormConfig,
} from "@page-speed/forms/integration";
import { Icon } from "@page-speed/icon";
import { DynamicIcon } from "@/src";

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

/**
 * Logo configuration for the footer
 */
export interface FooterSocialNewsletterLogo {
  /** Logo link URL */
  url: string;
  /** Logo image source */
  src: string;
  /** Logo alt text */
  alt: string;
  /** Logo title/brand name */
  title: string;
}

/**
 * Navigation link configuration
 */
export interface FooterSocialNewsletterLink {
  /** Link name/label */
  name: string;
  /** Link URL */
  href: string;
}

/**
 * Navigation section configuration
 */
export interface FooterSocialNewsletterSection {
  /** Section title */
  title: string;
  /** Links in this section */
  links: FooterSocialNewsletterLink[];
}

/**
 * Props for the FooterSocialNewsletter component
 */
export interface FooterSocialNewsletterProps {
  /** Logo configuration */
  logo?: FooterSocialNewsletterLogo;
  /** Navigation sections */
  sections?: FooterSocialNewsletterSection[];
  /** Social media links */
  socialLinks?: FooterSocialLink[];
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
  /** Additional CSS classes for the logo wrapper */
  logoWrapperClassName?: string;
  /** Additional CSS classes for the logo image */
  logoClassName?: string;
  /** Additional CSS classes for the main grid */
  gridClassName?: string;
  /** Additional CSS classes for navigation sections */
  navSectionClassName?: string;
  /** Additional CSS classes for navigation section titles */
  navTitleClassName?: string;
  /** Additional CSS classes for navigation link lists */
  navLinksClassName?: string;
  /** Additional CSS classes for navigation link items */
  navLinkClassName?: string;
  /** Additional CSS classes for the social/newsletter column */
  socialColumnClassName?: string;
  /** Additional CSS classes for the social links list */
  socialLinksClassName?: string;
  /** Additional CSS classes for social link items */
  socialLinkClassName?: string;
  /** Additional CSS classes for the privacy text */
  privacyClassName?: string;
  /** Additional CSS classes for the bottom section */
  bottomClassName?: string;
  /** Additional CSS classes for the copyright section */
  copyrightClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: OptixFlowConfig;

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
   * Custom slot for form (overrides form props)
   */
  formSlot?: React.ReactNode;
}

/**
 * FooterSocialNewsletter - A footer with social icons, navigation links, and newsletter signup.
 *
 * Features logo with social icons below, multi-column navigation grid,
 * and a newsletter subscription form in the bottom bar. Ideal for community-focused products,
 * SaaS platforms, and businesses that prioritize social engagement and email marketing.
 */
export function FooterSocialNewsletter({
  logo,
  sections,
  socialLinks,
  copyright,
  className,
  contentClassName,
  logoWrapperClassName,
  logoClassName,
  gridClassName,
  navSectionClassName,
  navTitleClassName,
  navLinksClassName,
  navLinkClassName,
  socialColumnClassName,
  socialLinksClassName,
  socialLinkClassName,
  formFields = DEFAULT_FORM_FIELDS,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
  successMessage,
  buttonAction,
  helperText,
  formSlot,
  privacyClassName,
  bottomClassName,
  copyrightClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: FooterSocialNewsletterProps): React.JSX.Element {
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

  const renderForm = React.useMemo(() => {
    if (formSlot) return formSlot;

    const defaultButtonAction: ActionConfig = {
      label: "Subscribe",
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
          buttonGroupSize: "sm",
          submitLabel: action.label,
          submitVariant: action.variant || "default",
          submitIconComponent: action.icon || (
            <DynamicIcon name="lucide/send" />
          ),
        }}
        onNewSubmission={() => {
          resetUpload();
          resetSubmissionState();
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row">
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
            {action.label}
            {action.iconAfter}
          </Pressable>
        </div>
        {helperText &&
          (typeof helperText === "string" ? (
            <p className={cn("text-sm mt-2")}>{helperText}</p>
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

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className={cn(contentClassName)}>
        <footer>
          {/* Logo and Social Icons Section */}
          <div className="mb-20">
            {logo && (
              <FooterLogo
                logo={logo}
                logoClassName={cn(
                  "flex items-center gap-2",
                  logoWrapperClassName,
                )}
                logoImageClassName={cn("h-10", logoClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}

            {/* Social icons directly below logo */}
            {socialLinks && socialLinks.length > 0 && (
              <div className={cn("mt-6", socialColumnClassName)}>
                <ul
                  className={cn(
                    "flex items-center gap-4",
                    socialLinksClassName,
                  )}
                >
                  {socialLinks.map((social, idx) => (
                    <li key={idx}>
                      <SocialLinkIcon
                        href={social.href}
                        label={social.label}
                        iconNameOverride={social.iconNameOverride}
                        iconSize={20}
                        className={cn(
                          "opacity-80 transition-colors hover:opacity-100",
                          socialLinkClassName,
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation Grid - 4 columns on desktop, 2 on mobile */}
          {sections && sections.length > 0 && (
            <div
              className={cn(
                "space-y-12 space-x-4 md:space-y-6 md:space-x-6 grid grid-cols-2 lg:grid-cols-4",
                gridClassName,
              )}
            >
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className={cn(navSectionClassName)}>
                  <h3 className={cn("mb-4 font-bold", navTitleClassName)}>
                    {section.title}
                  </h3>
                  <ul className={cn("space-y-4", navLinksClassName)}>
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className={cn("text-sm font-medium", navLinkClassName)}
                      >
                        <Pressable href={link.href}>{link.name}</Pressable>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Bar - Copyright left, Newsletter right */}
          <div
            className={cn(
              "gap-14 md:gap-4 mt-16 flex flex-col-reverse border-t-0 md:border-t pt-4 md:pt-10 lg:flex-row lg:items-start lg:justify-between",
              bottomClassName,
            )}
          >
            {/* Copyright and Attribution - Left side */}
            <div
              className={cn(
                "flex flex-col gap-2 text-sm font-medium opacity-80 md:flex-row md:items-center md:gap-4",
                copyrightClassName,
              )}
            >
              <FooterCopyright copyright={copyright} />
              <BrandAttribution
                internalBrandSlug="open_site_ai"
                optionIndex={7}
                variant="span"
                linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
              />
            </div>

            {renderForm}
          </div>
        </footer>
      </div>
    </Section>
  );
}
