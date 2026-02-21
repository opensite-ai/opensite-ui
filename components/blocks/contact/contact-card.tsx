"use client";

import * as React from "react";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { ContactDarkSocialLink } from "./contact-dark";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "space-y-6",
};

// Default form fields for contact card
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full Name",
    placeholder: "Full Name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "your@email.com",
    required: true,
    columnSpan: 6,
  },
  {
    name: "phone",
    type: "tel",
    label: "Phone",
    placeholder: "+1 (555) 000-0000",
    columnSpan: 12,
  },
  {
    name: "message",
    type: "textarea",
    label: "Your Message",
    placeholder: "How can we help you today?",
    required: true,
    rows: 4,
    columnSpan: 12,
  },
];

export interface ContactOption {
  /**
   * Icon name for the contact option
   */
  icon: string;
  /**
   * Contact information text
   */
  info: string;
  /**
   * Optional href for the contact option
   */
  href?: string;
}

export interface ContactCardProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below the heading
   */
  description?: React.ReactNode;
  /**
   * Submit button text
   */
  buttonText?: string;
  /**
   * Submit button icon (displayed before text)
   */
  buttonIcon?: React.ReactNode;
  /**
   * Contact options to display with icons
   */
  contactOptions?: ContactOption[];
  /**
   * Custom slot for rendering contact options (overrides contactOptions array)
   */
  contactOptionsSlot?: React.ReactNode;
  /**
   * Social media links to display
   */
  socialLinks?: ContactDarkSocialLink[];
  /**
   * Custom slot for rendering social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   * @default "px-6 sm:px-6 md:px-8 lg:px-8"
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the card content
   */
  cardContentClassName?: string;
  /**
   * Additional CSS classes for the info panel
   */
  infoPanelClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the contact options container
   */
  contactOptionsClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Additional CSS classes for the two-column grid wrapper
   */
  gridClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   * @default "py-16 md:py-32"
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

/**
 * ContactCard - A split-layout contact form with a card-wrapped form on one side
 * and heading, description, and icon-based contact details on the other.
 *
 * @example
 * ```tsx
 * <ContactCard
 *   heading="Get In Touch"
 *   description="We'd love to hear from you."
 *   contactOptions={[
 *     { icon: "Phone", info: "+1 (555) 987-6543", href: "tel:+15559876543" },
 *     { icon: "Mail", info: "support@example.com", href: "mailto:support@example.com" },
 *   ]}
 *   formEngineSetup={{ formConfig: { endpoint: "/api/contact", format: "json" } }}
 * />
 * ```
 */
export function ContactCard({
  heading = "Get In Touch",
  description = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  buttonText = "Send Message",
  buttonIcon,
  contactOptions,
  contactOptionsSlot,
  socialLinks,
  socialLinksSlot,
  formEngineSetup,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  cardClassName,
  cardContentClassName,
  infoPanelClassName,
  headingClassName,
  descriptionClassName,
  contactOptionsClassName,
  socialLinksClassName,
  gridClassName,
  background,
  spacing = "py-16 md:py-32",
  pattern,
  patternOpacity,
}: ContactCardProps): React.JSX.Element {
  const formStyleRules: FormEngineStyleRules = React.useMemo(() => {
    return {
      formContainer:
        formEngineSetup?.formLayoutSettings?.styleRules?.formContainer ??
        DEFAULT_STYLE_RULES.formContainer,
      fieldsContainer:
        formEngineSetup?.formLayoutSettings?.styleRules?.fieldsContainer ??
        DEFAULT_STYLE_RULES.fieldsContainer,
      fieldClassName:
        formEngineSetup?.formLayoutSettings?.styleRules?.fieldClassName ??
        DEFAULT_STYLE_RULES.fieldClassName,
      formClassName:
        formEngineSetup?.formLayoutSettings?.styleRules?.formClassName ??
        DEFAULT_STYLE_RULES.formClassName,
      successMessageClassName:
        formEngineSetup?.formLayoutSettings?.styleRules
          ?.successMessageClassName ??
        DEFAULT_STYLE_RULES.successMessageClassName,
      errorMessageClassName:
        formEngineSetup?.formLayoutSettings?.styleRules
          ?.errorMessageClassName ?? DEFAULT_STYLE_RULES.errorMessageClassName,
    };
  }, [formEngineSetup?.formLayoutSettings?.styleRules]);

  const formFields = React.useMemo(() => {
    if (formEngineSetup?.fields && formEngineSetup.fields.length > 0) {
      return formEngineSetup.fields;
    }
    return DEFAULT_FORM_FIELDS;
  }, [formEngineSetup?.fields]);

  const contactOptionsContent = React.useMemo(() => {
    if (contactOptionsSlot) return contactOptionsSlot;
    if (contactOptions && contactOptions.length > 0) {
      return contactOptions.map((option, key) => (
        <div key={key} className="flex items-center gap-4">
          <DynamicIcon
            name={option.icon}
            size={20}
            className="shrink-0 text-muted-foreground"
          />
          {option.href ? (
            <Pressable
              href={option.href}
              className="text-sm font-medium text-muted-foreground"
            >
              {option.info}
            </Pressable>
          ) : (
            <span className="text-sm font-medium text-muted-foreground">
              {option.info}
            </span>
          )}
        </div>
      ));
    }
    return null;
  }, [contactOptionsSlot, contactOptions]);

  const socialLinksContent = React.useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (socialLinks && socialLinks.length > 0) {
      return socialLinks.map((social, key) => (
        <Pressable
          key={key}
          href={social.href}
          className={cn(
            "flex h-9 w-9 items-center justify-center",
            "rounded-full transition-colors",
            "text-muted-foreground hover:text-foreground",
          )}
          aria-label={social.label}
        >
          <DynamicIcon name={social.icon} size={18} />
        </Pressable>
      ));
    }
    return null;
  }, [socialLinksSlot, socialLinks]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div
          className={cn(
            "grid items-start gap-10 md:gap-12 grid-cols-1 lg:grid-cols-2",
            gridClassName,
          )}
        >
          {/* Form Card — left on desktop, bottom on mobile */}
          <Card className={cn("order-2 lg:order-1 pt-0 pb-0", cardClassName)}>
            <CardContent className={cn("p-6 lg:p-8", cardContentClassName)}>
              {formEngineSetup ? (
                <FormEngine
                  {...formEngineSetup}
                  formLayoutSettings={{
                    ...formEngineSetup.formLayoutSettings,
                    formLayout: "standard",
                    submitButtonSetup: {
                      ...formEngineSetup.formLayoutSettings?.submitButtonSetup,
                      submitLabel: (
                        <>
                          {buttonIcon}
                          {buttonText}
                        </>
                      ),
                    },
                    styleRules: formStyleRules,
                  }}
                  fields={formFields}
                />
              ) : null}
            </CardContent>
          </Card>

          {/* Info Panel — right on desktop, top on mobile */}
          <div
            className={cn(
              "flex flex-col items-start gap-2 md:gap-4 order-1 lg:order-2",
              infoPanelClassName,
            )}
          >
            {heading &&
              (typeof heading === "string" ? (
                <h2
                  className={cn(
                    "text-4xl lg:text-6xl font-bold tracking-tight text-pretty",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : (
                heading
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "leading-relaxed text-pretty text-lg text-muted-foreground",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                description
              ))}

            {contactOptionsContent && (
              <div
                className={cn(
                  "mt-4 w-full rounded-xl bg-muted px-6 py-6 md:px-8 md:py-8 space-y-6",
                  contactOptionsClassName,
                )}
              >
                {contactOptionsContent}
              </div>
            )}

            {socialLinksContent && (
              <div
                className={cn(
                  "mt-2 flex items-center gap-2",
                  socialLinksClassName,
                )}
              >
                {socialLinksContent}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
