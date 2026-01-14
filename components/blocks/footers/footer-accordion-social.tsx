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
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";

export interface FooterAccordionSocialLink {
  /**
   * Link text
   */
  text: string;
  /**
   * Link URL
   */
  link?: string;
  /**
   * Link type for special handling
   */
  type?: "default" | "email";
  /**
   * Email address (if type is email)
   */
  email?: string;
}

export interface FooterAccordionSocialSection {
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
  items: FooterAccordionSocialLink[];
}

export interface FooterAccordionSocialMediaLink {
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

export interface FooterAccordionSocialProps {
  /**
   * Newsletter title
   */
  newsletterTitle?: string;
  /**
   * Newsletter description
   */
  newsletterDescription?: string;
  /**
   * Footer link sections
   */
  footerLinks?: FooterAccordionSocialSection[];
  /**
   * Social media links
   */
  socialLinks?: FooterAccordionSocialMediaLink[];
  /**
   * Logo configuration
   */
  logo?: {
    light: string;
    dark: string;
    url: string;
  };
  /**
   * Copyright text
   */
  copyright?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
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
 * Footer Accordion Social - A footer with newsletter, accordion navigation links,
 * and social media icons with responsive accordion behavior.
 *
 * Layout: Newsletter section at top, accordion links in grid, social icons.
 * Key features: Responsive accordion (collapsed on mobile, expanded on desktop).
 * Best for: E-commerce sites, retail brands, content-heavy websites.
 *
 * @example
 * ```tsx
 * <FooterAccordionSocial
 *   newsletterTitle="Stay in the loop"
 *   newsletterDescription="Get updates on new products and offers."
 *   footerLinks={[
 *     { title: "Shop", id: "shop", items: [...] },
 *   ]}
 * />
 * ```
 */
export function FooterAccordionSocial({
  newsletterTitle = "Stay in the loop",
  newsletterDescription = "Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration delivered straight to your inbox.",
  footerLinks,
  socialLinks,
  logo = {
    light: logoPlaceholders.darkHorizontalLogo,
    dark: logoPlaceholders.lightHorizontalLogo,
    url: "/",
  },
  copyright = `© ${new Date().getFullYear()} Opensite AI. All rights reserved.`,
  className,
  optixFlowConfig,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: FooterAccordionSocialProps) {
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [accordionValue, setAccordionValue] = React.useState("");

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
    <section className={cn("py-12", className)}>
      <div className="container space-y-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <Pressable href={logo.url} className="inline-block max-w-48">
              <Img
                src={logo.light}
                alt="Logo"
                className="w-full dark:hidden"
                optixFlowConfig={optixFlowConfig}
              />
              <Img
                src={logo.dark}
                alt="Logo"
                className="hidden w-full dark:block"
                optixFlowConfig={optixFlowConfig}
              />
            </Pressable>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">{newsletterTitle}</h3>
              <p className="text-muted-foreground">{newsletterDescription}</p>
            </div>
            <Form
              form={form}
              action={formConfig?.endpoint}
              method={formMethod}
              className="flex gap-2"
            >
              <Field name="email" className="flex-1">
                {({ field, meta }) => (
                  <TextInput
                    {...field}
                    type="email"
                    placeholder="Email Address"
                    error={meta.touched && !!meta.error}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Email Address"
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
          </div>

          {isDesktop ? (
            <Accordion
              value={allAccordionIds}
              type="multiple"
              className="grid grid-cols-2 gap-x-16 gap-y-4 lg:grid-cols-3"
            >
              {footerLinks.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border-none"
                >
                  <AccordionTrigger className="cursor-auto rounded-none pb-4 pt-0 text-lg font-bold leading-none hover:no-underline [&>svg]:hidden">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="text-sm font-light leading-tight">
                          {item.type === "email" ? (
                            <>
                              <p className="mb-1.5">{item.text}</p>
                              <Pressable
                                href={`mailto:${item.email}`}
                                className="underline underline-offset-2"
                              >
                                {item.email}
                              </Pressable>
                            </>
                          ) : (
                            <Pressable href={item.link}>{item.text}</Pressable>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Accordion
              value={accordionValue}
              type="single"
              collapsible
              onValueChange={setAccordionValue}
              className="space-y-0"
            >
              {footerLinks.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border-b"
                >
                  <AccordionTrigger className="py-4 text-lg font-bold leading-none hover:no-underline [&>svg]:hidden">
                    {section.title}
                    <DynamicIcon name="lucide/plus" size={20} className="lg:hidden" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ul className="space-y-2 pl-4">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="text-sm font-light leading-tight">
                          {item.type === "email" ? (
                            <>
                              <p className="mb-1.5">{item.text}</p>
                              <Pressable
                                href={`mailto:${item.email}`}
                                className="underline underline-offset-2"
                              >
                                {item.email}
                              </Pressable>
                            </>
                          ) : (
                            <Pressable href={item.link}>{item.text}</Pressable>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t pt-8">
          <p className="text-sm text-muted-foreground">{copyright}</p>
          <ul className="flex flex-wrap gap-4">
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
      </div>
    </section>
  );
}
