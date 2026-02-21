"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "space-y-4",
};

// Default form fields
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "first_name",
    type: "text",
    label: "First Name",
    placeholder: "John",
    required: true,
    columnSpan: 6,
  },
  {
    name: "last_name",
    type: "text",
    label: "Last Name",
    placeholder: "Doe",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "john@example.com",
    required: true,
    columnSpan: 12,
  },
  {
    name: "phone",
    type: "tel",
    label: "Phone",
    placeholder: "+1 (555) 000-0000",
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
 * Configuration for a contact overlay item displayed over the image.
 */
export interface ContactOverlayItem {
  /**
   * Icon name for DynamicIcon (e.g., "lucide/phone")
   */
  icon: string;
  /**
   * Eyebrow label above the title (e.g., "PHONE", "EMAIL")
   */
  label: string;
  /**
   * Main title text (e.g., phone number, email address)
   */
  title: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Optional link URL (e.g., "tel:+15551234567", "mailto:support@example.com")
   */
  href?: string;
  /**
   * Additional CSS classes for the item container
   */
  className?: string;
}

export interface ContactImageProps {
  /**
   * Eyebrow label above the heading
   */
  eyebrow?: React.ReactNode;
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Submit button text
   */
  buttonText?: string;
  /**
   * Icon to display in submit button
   */
  buttonIcon?: React.ReactNode;
  /**
   * Image configuration for the left panel
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Contact overlay items displayed over the image
   */
  contactOverlays?: ContactOverlayItem[];
  /**
   * Custom slot for rendering contact overlays (overrides contactOverlays array)
   */
  contactOverlaysSlot?: React.ReactNode;
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
   * Additional CSS classes for the content grid
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the eyebrow text
   */
  eyebrowClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the contact overlays container
   */
  contactOverlaysClassName?: string;
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
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ContactImage - Split-layout contact form with image panel and overlay contact items.
 * Features a large image on the left with contact info overlays and form on the right.
 *
 * @example
 * ```tsx
 * <ContactImage
 *   eyebrow="Get in Touch"
 *   heading="Contact Us"
 *   description="We'd love to hear from you."
 *   image={{ src: "/office.jpg", alt: "Our office" }}
 *   contactOverlays={[
 *     { icon: "lucide/phone", label: "Phone", title: "+1 (555) 987-6543" },
 *     { icon: "lucide/mail", label: "Email", title: "support@example.com" },
 *   ]}
 *   formEngineSetup={{ formConfig: { endpoint: "/api/contact", format: "json" } }}
 * />
 * ```
 */
export function ContactImage({
  eyebrow,
  heading,
  description,
  buttonText = "Send Message",
  buttonIcon,
  image,
  contactOverlays,
  contactOverlaysSlot,
  formEngineSetup,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  eyebrowClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  contactOverlaysClassName,
  background,
  spacing = "py-16 md:py-32",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ContactImageProps): React.JSX.Element {
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

  const contactOverlaysContent = React.useMemo(() => {
    if (contactOverlaysSlot) return contactOverlaysSlot;
    if (!contactOverlays || contactOverlays.length === 0) return null;

    return (
      <div className={cn("flex flex-col gap-3", contactOverlaysClassName)}>
        {contactOverlays.map((item, index) => {
          const content = (
            <div
              className={cn(
                "rounded-2xl border border-white/10 bg-foreground/80 p-4 backdrop-blur-sm",
                item.className,
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-fit p-2 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <DynamicIcon name={item.icon} size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-background/70">
                    {item.label}
                  </p>
                  <p className="font-semibold text-background">{item.title}</p>
                </div>
              </div>
              {item.description && (
                <p className="mt-2 text-sm text-background/80">
                  {item.description}
                </p>
              )}
            </div>
          );

          if (item.href) {
            return (
              <a
                key={index}
                href={item.href}
                className="block transition-transform hover:scale-[1.02]"
              >
                {content}
              </a>
            );
          }

          return <div key={index}>{content}</div>;
        })}
      </div>
    );
  }, [contactOverlaysSlot, contactOverlays, contactOverlaysClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      containerClassName={containerClassName}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div
        className={cn(
          "grid grid-cols-1 items-center gap-12 lg:grid-cols-2",
          contentClassName,
        )}
      >
        {/* Image Panel with Contact Overlays */}
        {image && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Img
                src={image.src}
                alt={image.alt}
                className={cn("h-full w-full object-cover", imageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute inset-0 bg-linear-to-tr from-black/70 via-transparent to-transparent" />
              {contactOverlaysContent && (
                <div className="absolute bottom-6 left-6 right-6">
                  {contactOverlaysContent}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Content Panel with Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="order-1 lg:order-2"
        >
          {eyebrow &&
            (typeof eyebrow === "string" ? (
              <p
                className={cn(
                  "text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground",
                  eyebrowClassName,
                )}
              >
                {eyebrow}
              </p>
            ) : (
              <div className={eyebrowClassName}>{eyebrow}</div>
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mt-2 text-3xl font-bold md:text-4xl lg:text-5xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={cn("mt-2", headingClassName)}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mt-4 text-lg text-muted-foreground",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={cn("mt-4", descriptionClassName)}>
                {description}
              </div>
            ))}

          {/* Form */}
          <div className="mt-8">
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
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
