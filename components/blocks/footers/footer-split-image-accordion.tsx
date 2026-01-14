"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "../../ui/form-inputs";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import { Separator } from "../../ui/separator";
import { logoPlaceholders, imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { OptixFlowConfig } from "../../../src/types/blocks";

export interface FooterSplitImageAccordionLink {
  /**
   * Link text
   */
  text: string;
  /**
   * Link URL
   */
  link?: string;
}

export interface FooterSplitImageAccordionSection {
  /**
   * Section title
   */
  title: string;
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Array of links in this section
   */
  items: FooterSplitImageAccordionLink[];
}

export interface FooterSplitImageAccordionSocialLink {
  /**
   * Icon name in format: prefix/name
   */
  icon: string;
  /**
   * Link URL
   */
  link: string;
  /**
   * Accessible label
   */
  label: string;
}

/**
 * Footer data configuration
 */
export interface FooterSplitImageAccordionData {
  /** Hero image configuration */
  image: {
    src: string;
    alt: string;
  };
  /** Logo configuration with light/dark variants */
  logo: {
    light: string;
    dark: string;
  };
  /** Logo link URL */
  logoUrl: string;
  /** Brand title */
  title: string;
  /** Brand description */
  description: string;
}

export interface FooterSplitImageAccordionProps {
  /**
   * Newsletter title
   */
  newsletterTitle?: React.ReactNode;
  /**
   * Email input placeholder text
   */
  emailPlaceholder?: string;
  /**
   * Footer link sections
   */
  footerLinks?: FooterSplitImageAccordionSection[];
  /**
   * Social media links
   */
  socialLinks?: FooterSplitImageAccordionSocialLink[];
  /**
   * Payment method image URLs
   */
  paymentMethods?: string[];
  /**
   * Submenu links
   */
  submenuLinks?: FooterSplitImageAccordionLink[];
  /**
   * Footer data configuration
   */
  footerData?: FooterSplitImageAccordionData;
  /**
   * Copyright text
   */
  copyright?: React.ReactNode;
  /**
   * Additional CSS classes for the footer wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the grid layout
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the image column
   */
  imageColumnClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the content column
   */
  contentColumnClassName?: string;
  /**
   * Additional CSS classes for the newsletter section
   */
  newsletterSectionClassName?: string;
  /**
   * Additional CSS classes for the newsletter title
   */
  newsletterTitleClassName?: string;
  /**
   * Additional CSS classes for the newsletter form
   */
  newsletterFormClassName?: string;
  /**
   * Additional CSS classes for the social links
   */
  socialLinksClassName?: string;
  /**
   * Additional CSS classes for the brand section
   */
  brandSectionClassName?: string;
  /**
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
  /**
   * Additional CSS classes for the brand title
   */
  brandTitleClassName?: string;
  /**
   * Additional CSS classes for the brand description
   */
  brandDescriptionClassName?: string;
  /**
   * Additional CSS classes for the accordion section
   */
  accordionClassName?: string;
  /**
   * Additional CSS classes for payment methods
   */
  paymentMethodsClassName?: string;
  /**
   * Additional CSS classes for the bottom section
   */
  bottomClassName?: string;
  /**
   * Additional CSS classes for the copyright
   */
  copyrightClassName?: string;
  /**
   * Additional CSS classes for submenu links
   */
  submenuLinksClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Optional form submission configuration for newsletter signup.
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Optional custom submission handler for newsletter signup.
   */
  onSubmit?: (email: string) => void | Promise<void>;
  /**
   * Optional success callback invoked after successful submission.
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Optional error callback invoked if submission fails.
   */
  onError?: (error: Error) => void;
}

/**
 * Footer Split Image Accordion - A split-layout footer with large image,
 * newsletter signup, accordion navigation, and payment methods.
 *
 * Layout: Two-column split with image on left, content on right.
 * Key features: Large hero image, accordion links for mobile, payment icons.
 * Best for: E-commerce sites, fashion brands, lifestyle businesses.
 *
 * @example
 * ```tsx
 * <FooterSplitImageAccordion
 *   newsletterTitle="Get updates and save 20%"
 *   footerLinks={[
 *     { title: "Collections", id: "collections", items: [...] },
 *   ]}
 *   footerData={{
 *     image: { src: "/hero.jpg", alt: "Hero" },
 *     title: "Modern Fashion",
 *     description: "Quality clothing for everyone.",
 *   }}
 * />
 * ```
 */
export function FooterSplitImageAccordion({
  newsletterTitle,
  emailPlaceholder = "Email Address",
  footerLinks,
  socialLinks,
  paymentMethods = [],
  submenuLinks,
  footerData = {
    image: {
      src: imagePlaceholders[0],
      alt: "Footer hero image",
    },
    logo: {
      light: logoPlaceholders.darkHorizontalLogo,
      dark: logoPlaceholders.lightHorizontalLogo,
    },
    logoUrl: "/",
    title: "Where Modern Fashion Meets Comfort",
    description:
      "We design clothing that empowers women to express their individuality through thoughtful details, flattering fits, and beautifully crafted essentials.",
  },
  copyright,
  className,
  gridClassName,
  imageColumnClassName,
  imageClassName,
  contentColumnClassName,
  newsletterSectionClassName,
  newsletterTitleClassName,
  newsletterFormClassName,
  socialLinksClassName,
  brandSectionClassName,
  logoClassName,
  brandTitleClassName,
  brandDescriptionClassName,
  accordionClassName,
  paymentMethodsClassName,
  bottomClassName,
  copyrightClassName,
  submenuLinksClassName,
  optixFlowConfig,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: FooterSplitImageAccordionProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright ?? `© ${currentYear} Opensite AI. All rights reserved.`;
  const [isDesktop, setIsDesktop] = React.useState(false);

  const form = useForm<{ email: string }>({
    initialValues: {
      email: "",
    },
    validationSchema: {
      email: (value) => {
        if (!value) return "Email is required";
        if (!isValidEmail(value)) return "Please enter a valid email address";
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

  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const allAccordionIds = footerLinks.map(({ id }) => id);

  return (
    <footer className={cn("bg-muted", className)}>
      <div className={cn("grid grid-cols-1 lg:grid-cols-2", gridClassName)}>
        <div className={cn("overflow-hidden max-lg:aspect-square", imageColumnClassName)}>
          <Img
            src={footerData.image.src}
            alt={footerData.image.alt}
            className={cn("h-full w-full object-cover", imageClassName)}
            optixFlowConfig={optixFlowConfig}
          />
        </div>

        <div className={cn("space-y-10 p-6 lg:p-12", contentColumnClassName)}>
          <div className={cn("space-y-6", newsletterSectionClassName)}>
            <h3 className={cn("text-2xl font-semibold lg:text-3xl", newsletterTitleClassName)}>{newsletterTitle}</h3>
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              className={cn("flex gap-2", newsletterFormClassName)}
            >
              <Field name="email" className="flex-1">
                {({ field, meta }) => (
                  <TextInput
                    {...field}
                    type="email"
                    placeholder={emailPlaceholder}
                    error={meta.touched && !!meta.error}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={emailPlaceholder}
                  />
                )}
              </Field>
              <Pressable
                componentType="button"
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                asButton={false}
                disabled={form.isSubmitting}
              >
                <DynamicIcon name="lucide/arrow-right" size={16} />
              </Pressable>
            </Form>
            <ul className={cn("flex flex-wrap gap-4", socialLinksClassName)}>
              {socialLinks.map((social, idx) => (
                <li key={idx}>
                  <Pressable
                    href={social.link}
                    variant="outline"
                    size="icon"
                    asButton
                    className="rounded-full"
                    aria-label={social.label}
                  >
                    <DynamicIcon name={social.icon} size={20} />
                  </Pressable>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div className={cn("space-y-6", brandSectionClassName)}>
            <Pressable href={footerData.logoUrl} className={cn("inline-block max-w-60", logoClassName)}>
              <Img
                src={footerData.logo.light}
                alt="Logo"
                className="w-full dark:hidden"
                optixFlowConfig={optixFlowConfig}
              />
              <Img
                src={footerData.logo.dark}
                alt="Logo"
                className="hidden w-full dark:block"
                optixFlowConfig={optixFlowConfig}
              />
            </Pressable>
            <h4 className={cn("text-xl font-semibold", brandTitleClassName)}>{footerData.title}</h4>
            <p className={cn("text-muted-foreground", brandDescriptionClassName)}>{footerData.description}</p>
          </div>

          {isDesktop ? (
            <Accordion
              value={allAccordionIds}
              type="multiple"
              className={cn("grid gap-4 lg:grid-cols-3", accordionClassName)}
            >
              {footerLinks.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border-transparent"
                >
                  <AccordionTrigger className="cursor-auto rounded-none pb-4 pt-0 text-base font-bold leading-normal hover:no-underline [&>svg]:hidden">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-1">
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="text-sm font-light leading-tight">
                          <Pressable
                            href={item.link}
                            className="hover:underline hover:underline-offset-2"
                          >
                            {item.text}
                          </Pressable>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Accordion type="single" collapsible className={cn("grid gap-4", accordionClassName)}>
              {footerLinks.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border-b"
                >
                  <AccordionTrigger className="py-4 text-base font-bold leading-normal hover:no-underline [&>svg]:hidden">
                    {section.title}
                    <DynamicIcon name="lucide/plus" size={20} />
                  </AccordionTrigger>
                  <AccordionContent className="py-4">
                    <ul className="space-y-3">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="text-sm font-light leading-tight">
                          <Pressable
                            href={item.link}
                            className="hover:underline hover:underline-offset-2"
                          >
                            {item.text}
                          </Pressable>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {paymentMethods.length > 0 && (
            <ul className={cn("flex flex-wrap items-center gap-3", paymentMethodsClassName)}>
              {paymentMethods.map((method, idx) => (
                <li key={idx}>
                  <Img
                    src={method}
                    alt="Payment method"
                    className="h-6"
                    optixFlowConfig={optixFlowConfig}
                  />
                </li>
              ))}
            </ul>
          )}

          <Separator />

          <div className={cn("flex flex-wrap items-center justify-between gap-4", bottomClassName)}>
            <p className={cn("text-sm text-muted-foreground", copyrightClassName)}>{copyrightText}</p>
            <ul className={cn("flex flex-wrap gap-x-6 gap-y-2", submenuLinksClassName)}>
              {submenuLinks.map((link, idx) => (
                <li key={idx}>
                  <Pressable
                    href={link.link}
                    className="text-sm font-light hover:underline"
                  >
                    {link.text}
                  </Pressable>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
