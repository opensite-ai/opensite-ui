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
import { Card } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "space-y-6",
};

export interface ContactDarkOption {
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

export interface ContactDarkSocialLink {
  /**
   * Icon name for the social platform
   */
  icon: string;
  /**
   * Link href
   */
  href: string;
  /**
   * Accessible label for the link
   */
  label: string;
}

export interface ContactDarkProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below the heading
   */
  description?: React.ReactNode;
  /**
   * Contact information heading
   */
  contactHeading?: React.ReactNode;
  /**
   * Contact information description
   */
  contactDescription?: React.ReactNode;
  /**
   * Contact options to display
   */
  contactOptions?: ContactDarkOption[];
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
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the form panel
   */
  formPanelClassName?: string;
  /**
   * Additional CSS classes for the info panel
   */
  infoPanelClassName?: string;
  /**
   * Additional CSS classes for the contact options container
   */
  contactOptionsClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
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

// Default form fields
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    placeholder: "First name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    placeholder: "Last name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "your@email.com",
    required: true,
    columnSpan: 12,
  },
  {
    name: "message",
    type: "textarea",
    label: "Message",
    placeholder: "Your message...",
    required: true,
    rows: 4,
    columnSpan: 12,
  },
];

/**
 * ContactDark - A dark-themed contact form with split layout featuring a form
 * on one side and contact information with social links on a dark background.
 * Perfect for modern, high-contrast designs.
 *
 * @example
 * ```tsx
 * <ContactDark
 *   heading="Contact Us"
 *   description="Any questions or remarks? Just write us a message!"
 *   formEngineSetup={{ formConfig: { endpoint: "/api/contact", format: "json" } }}
 * />
 * ```
 */
export function ContactDark({
  heading,
  description,
  contactHeading = "Contact Information",
  contactDescription = "Fill up the form and our team will get back to you within 24 hours.",
  contactOptions,
  contactOptionsSlot,
  socialLinks,
  socialLinksSlot,
  formEngineSetup,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  formPanelClassName,
  infoPanelClassName,
  contactOptionsClassName,
  socialLinksClassName,
  background,
  spacing = "py-8 md:py-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
}: ContactDarkProps): React.JSX.Element {
  const contactOptionsContent = React.useMemo(() => {
    if (contactOptionsSlot) return contactOptionsSlot;
    if (contactOptions && contactOptions.length > 0) {
      return contactOptions.map((option, key) => (
        <div key={key} className="flex items-center gap-3">
          <DynamicIcon
            name={option.icon}
            size={16}
            className="text-primary-foreground/70"
          />
          {option.href ? (
            <Pressable
              href={option.href}
              className="text-sm text-primary-foreground"
            >
              {option.info}
            </Pressable>
          ) : (
            <span className="text-sm">{option.info}</span>
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
            "rounded-xl border-2 transition-shadow duration-1000",
            "bg-primary text-primary-foreground border-primary-foreground",
            "shadow-sm hover:shadow-xl",
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
        <Card
          className={cn(
            "grid gap-0 overflow-hidden grid-cols-1 lg:grid-cols-2 pt-0 pb-0",
            cardClassName,
          )}
        >
          <div className={cn("p-6 lg:p-12", formPanelClassName)}>
            {formEngineSetup ? (
              <FormEngine
                formEngineSetup={formEngineSetup}
                defaultFields={DEFAULT_FORM_FIELDS}
                defaultStyleRules={DEFAULT_STYLE_RULES}
              />
            ) : null}
          </div>

          <div
            className={cn(
              "flex flex-col justify-between bg-primary p-6 text-primary-foreground lg:p-8",
              infoPanelClassName,
            )}
          >
            <div>
              <div
                className={cn(
                  "pb-6 md:pb-8 border-b-2 border-border/50 mb-6 md:mb-8 text-left",
                  headerClassName,
                )}
              >
                {heading &&
                  (typeof heading === "string" ? (
                    <h2
                      className={cn(
                        "text-3xl font-bold tracking-tight text-pretty md:text-5xl",
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
                        "leading-relaxed text-balance",
                        descriptionClassName,
                      )}
                    >
                      {description}
                    </p>
                  ) : (
                    description
                  ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              {contactHeading &&
                (typeof contactHeading === "string" ? (
                  <h3 className="text-xl font-semibold">{contactHeading}</h3>
                ) : (
                  contactHeading
                ))}
              {contactDescription &&
                (typeof contactDescription === "string" ? (
                  <p className="text-sm text-primary-foreground/80">
                    {contactDescription}
                  </p>
                ) : (
                  contactDescription
                ))}
              <div
                className={cn(
                  "pt-6 md:pt-8 space-y-4",
                  contactOptionsClassName,
                )}
              >
                {contactOptionsContent}
              </div>
            </div>
            <div
              className={cn(
                "mt-8 flex items-center gap-4",
                socialLinksClassName,
              )}
            >
              {socialLinksContent}
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
