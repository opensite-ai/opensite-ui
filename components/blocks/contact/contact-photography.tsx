"use client";

import * as React from "react";
import { useMemo } from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput, TextArea } from "@page-speed/forms/inputs";
import "../../styles/forms.css";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Label } from "../../ui/label";
import {
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import {
  PatternBackground,
  type PatternName,
} from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
} from "../../../src/types";

export interface DirectionConfig {
  desktop: "mediaRight" | "mediaLeft";
  mobile: "mediaTop" | "mediaBottom";
}

interface ContactPhotographyFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactPhotographyProps {
  /** Main heading text */
  heading?: React.ReactNode;
  /** Description text below heading */
  description?: React.ReactNode;
  /** Submit button text */
  buttonText?: string;
  /** Icon to display in submit button */
  buttonIcon?: React.ReactNode;
  /** Array of action configurations for custom buttons */
  actions?: ActionConfig[];
  /** Custom slot for rendering actions (overrides actions array) */
  actionsSlot?: React.ReactNode;
  /** Additional CSS classes for the section */
  className?: string;
  /** Additional CSS classes for the heading */
  headingClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the content area */
  contentClassName?: string;
  /** Additional CSS classes for the form */
  formClassName?: string;
  /** Additional CSS classes for the submit button */
  submitClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /** Pattern background key or URL */
  pattern?: PatternName | undefined;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Image source URL */
  imageSrc?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Additional CSS classes for the image */
  imageClassName?: string;
  /** Optional Optix Flow configuration for image optimization */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Direction configuration for desktop and mobile layouts
   * @default { desktop: 'mediaRight', mobile: 'mediaTop' }
   */
  directionConfig?: DirectionConfig;

  /** Form configuration for PageSpeed forms */
  formConfig?: PageSpeedFormConfig;
  /** Custom submit handler */
  onSubmit?: (values: ContactPhotographyFormValues) => void | Promise<void>;
  /** Success callback */
  onSuccess?: (data: unknown) => void;
  /** Error callback */
  onError?: (error: Error) => void;
}

/**
 * ContactPhotography - A full-width split-screen contact form section with edge-to-edge design,
 * featuring text content and a form on one side and a large full-height image on the other.
 *
 * Layout: 50/50 split layout with content/form and image sections. Fully responsive with
 * configurable media placement for desktop and mobile.
 * Key features: Pattern background support, edge-to-edge design, no card wrapping.
 * Best for: Photography studios, creative services, visual-first contact pages.
 *
 * @example
 * ```tsx
 * <ContactPhotography
 *   heading="Photography Services"
 *   description="Book a photography session with us"
 *   buttonText="Send Message"
 *   imageSrc="/studio.jpg"
 *   background="dark"
 *   pattern="grid"
 *   formConfig={{ endpoint: "/api/contact", format: "json" }}
 * />
 * ```
 */
export function ContactPhotography({
  heading,
  description,
  buttonText,
  buttonIcon,
  actions,
  actionsSlot,
  className,
  headingClassName,
  descriptionClassName,
  contentClassName,
  formClassName,
  submitClassName,
  background = "dark",
  pattern,
  patternOpacity,
  imageSrc,
  imageAlt,
  imageClassName,
  optixFlowConfig,
  directionConfig = { desktop: "mediaRight", mobile: "mediaTop" },

  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: ContactPhotographyProps): React.JSX.Element {
  const form = useForm<ContactPhotographyFormValues>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: {
      first_name: (value) => (!value ? "First name is required" : undefined),
      last_name: (value) => (!value ? "Last name is required" : undefined),
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return undefined;
      },
      phone: (value) => (!value ? "Phone is required" : undefined),
      message: (value) => (!value ? "Message is required" : undefined),
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
          await onSubmit(values);
        }

        if (shouldAutoSubmit || onSubmit) {
          if (formConfig?.resetOnSuccess !== false) {
            helpers.resetForm();
          }
          onSuccess?.(result);
        }
      } catch (error) {
        if (error instanceof PageSpeedFormSubmissionError && error.formErrors) {
          helpers.setErrors(error.formErrors);
        }
        onError?.(error as Error);
        throw error;
      }
    },
  });

  const formMethod =
    formConfig?.method?.toLowerCase() === "get" ? "get" : "post";

  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (actions && actions.length > 0) {
      return actions.map((action, index) => {
        const {
          label,
          icon,
          iconAfter,
          children,
          className: actionClassName,
          ...pressableProps
        } = action;
        return (
          <Pressable
            key={index}
            asButton
            className={actionClassName}
            {...pressableProps}
          >
            {children ?? (
              <>
                {icon}
                {label}
                {iconAfter}
              </>
            )}
          </Pressable>
        );
      });
    }
    return null;
  }, [actionsSlot, actions]);

  // Determine background color based on background variant
  const bgColorClass = useMemo(() => {
    switch (background) {
      case "dark":
        return "bg-foreground text-background";
      case "gray":
        return cn(getNestedCardBg(background), getNestedCardTextColor(background));
      case "white":
        return "bg-background";
      default:
        return "bg-background";
    }
  }, [background]);

  // Determine flex direction based on directionConfig
  const desktopOrder =
    directionConfig.desktop === "mediaRight"
      ? "lg:flex-row"
      : "lg:flex-row-reverse";
  const mobileOrder =
    directionConfig.mobile === "mediaTop" ? "flex-col" : "flex-col-reverse";

  const contentArea = (
    <div
      className={cn(
        "relative flex w-full items-center lg:w-1/2",
        bgColorClass,
        contentClassName,
      )}
    >
      {/* Pattern Background */}
      {pattern && (
        <div className="absolute inset-0 overflow-hidden">
          <PatternBackground pattern={pattern} opacity={patternOpacity} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
        <div className="mx-auto max-w-xl space-y-8">
          {/* Heading */}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}

          {/* Description */}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "text-base leading-relaxed opacity-90 sm:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}

          {/* Form */}
          <Form
            form={form}
            action={formConfig?.endpoint}
            method={formMethod}
            className={cn("space-y-4", formClassName)}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="first_name">
                {({ field, meta }) => (
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <TextInput
                      {...field}
                      id="first-name"
                      placeholder="John"
                      error={meta.touched && !!meta.error}
                      aria-label="First Name"
                    />
                  </div>
                )}
              </Field>

              <Field name="last_name">
                {({ field, meta }) => (
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <TextInput
                      {...field}
                      id="last-name"
                      placeholder="Doe"
                      error={meta.touched && !!meta.error}
                      aria-label="Last Name"
                    />
                  </div>
                )}
              </Field>
            </div>

            <Field name="email">
              {({ field, meta }) => (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <TextInput
                    {...field}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    error={meta.touched && !!meta.error}
                    aria-label="Email"
                  />
                </div>
              )}
            </Field>

            <Field name="phone">
              {({ field, meta }) => (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <TextInput
                    {...field}
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    error={meta.touched && !!meta.error}
                    aria-label="Phone"
                  />
                </div>
              )}
            </Field>

            <Field name="message">
              {({ field, meta }) => (
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <TextArea
                    {...field}
                    id="message"
                    placeholder="Your message..."
                    rows={4}
                    error={meta.touched && !!meta.error}
                    aria-label="Message"
                  />
                </div>
              )}
            </Field>

            {actionsSlot || (actions && actions.length > 0) ? (
              actionsContent
            ) : (
              <Pressable
                componentType="button"
                type="submit"
                className={cn("w-full", submitClassName)}
                size="lg"
                asButton
                disabled={form.isSubmitting}
              >
                {buttonIcon}
                {buttonText}
              </Pressable>
            )}
          </Form>
        </div>
      </div>
    </div>
  );

  const imageArea = imageSrc ? (
    <div className="relative h-64 w-full sm:h-96 lg:h-auto lg:w-1/2">
      <Img
        src={imageSrc}
        alt={imageAlt || ""}
        className={cn("h-full w-full object-cover", imageClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    </div>
  ) : null;

  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      <div className={cn("flex min-h-screen", mobileOrder, desktopOrder)}>
        {contentArea}
        {imageArea}
      </div>
    </section>
  );
}
