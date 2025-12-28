"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "@page-speed/forms/inputs";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";

/**
 * Link item for the newsletter social link page
 */
export interface NewsletterSocialLink {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

/**
 * Social link for the newsletter social link page
 */
export interface NewsletterSocialSocialLink {
  id: string;
  platform: string;
  href: string;
  icon: string;
}

/**
 * Props for the LinkPageNewsletterSocial component
 */
export interface LinkPageNewsletterSocialProps {
  /**
   * Profile name displayed at the top
   */
  name: string;
  /**
   * Optional bio or description
   */
  bio?: string;
  /**
   * Avatar image URL
   */
  avatarUrl?: string;
  /**
   * Newsletter section heading
   */
  newsletterHeading?: string;
  /**
   * Newsletter section description
   */
  newsletterDescription?: string;
  /**
   * Email input placeholder text
   */
  emailPlaceholder?: string;
  /**
   * Submit button text
   */
  buttonText?: string;
  /**
   * Array of links to display below the newsletter
   */
  links?: NewsletterSocialLink[];
  /**
   * Array of social media links
   */
  socialLinks?: NewsletterSocialSocialLink[];
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Theme variation: "light" or "dark"
   */
  theme?: "light" | "dark";
  /**
   * Optional form submission configuration.
   *
   * **Universal Usage**: Works with ANY REST API endpoint. Simply provide an `endpoint` URL
   * and the form will submit to it in JSON format.
   *
   * @example
   * // Works with any API
   * formConfig={{ endpoint: "https://api.mysite.com/subscribe", format: "json" }}
   *
   * @example
   * // With custom headers (e.g., authentication)
   * formConfig={{
   *   endpoint: "/api/newsletter",
   *   headers: { "Authorization": "Bearer token123" }
   * }}
   *
   * **Note**: The `apiKey`, `contactCategoryToken`, and other platform-specific fields
   * are OPTIONAL and only needed when integrating with DashTrack's Rails backend.
   * For generic REST APIs, just use `endpoint`, `method`, `format`, and `headers`.
   *
   * See `FORMS_INTEGRATION_GUIDE.md` for complete examples with Next.js, React, and more.
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Optional custom submission handler for maximum flexibility.
   *
   * Use this when you need complete control over the submission logic,
   * such as custom API calls, analytics tracking, or multi-step workflows.
   *
   * Can be used alone or in combination with `formConfig` for hybrid approaches.
   *
   * @example
   * onSubmit={async (email) => {
   *   await fetch("/api/subscribe", {
   *     method: "POST",
   *     body: JSON.stringify({ email, campaign: "link-page" })
   *   });
   * }}
   */
  onSubmit?: (email: string) => void | Promise<void>;
  /**
   * Optional success callback invoked after successful submission.
   *
   * Called after `formConfig` submission and/or `onSubmit` completes successfully.
   * Use for showing success messages, redirecting, analytics tracking, etc.
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Optional error callback invoked if submission fails.
   *
   * Receives the error object for custom error handling, logging, or user notifications.
   */
  onError?: (error: Error) => void;
}

const defaultLinks: NewsletterSocialLink[] = [
  { id: "1", label: "My Website", href: "https://example.com", icon: "lucide/globe" },
  { id: "2", label: "Latest Blog Post", href: "https://example.com/blog", icon: "lucide/file-text" },
  { id: "3", label: "Free Resources", href: "https://example.com/resources", icon: "lucide/download" },
];

const defaultSocialLinks: NewsletterSocialSocialLink[] = [
  { id: "s1", platform: "Twitter", href: "https://twitter.com", icon: "simple-icons/x" },
  { id: "s2", platform: "Instagram", href: "https://instagram.com", icon: "simple-icons/instagram" },
  { id: "s3", platform: "YouTube", href: "https://youtube.com", icon: "simple-icons/youtube" },
  { id: "s4", platform: "TikTok", href: "https://tiktok.com", icon: "simple-icons/tiktok" },
];

/**
 * LinkPageNewsletterSocial - A link page with integrated newsletter signup form.
 *
 * This component provides a link page with:
 * - Profile section with avatar, name, and bio
 * - Newsletter signup form with email validation
 * - Form integration with @page-speed/forms library
 * - Links section below the newsletter
 * - Social media links
 * - Light and dark theme support
 *
 * The newsletter form supports:
 * - Universal REST API integration via formConfig
 * - Custom submission handlers via onSubmit
 * - Success and error callbacks
 * - DashTrack Rails backend integration
 *
 * @example
 * ```tsx
 * // Basic usage
 * <LinkPageNewsletterSocial
 *   name="Content Creator"
 *   bio="Weekly tips on growing your audience"
 *   newsletterHeading="Join my newsletter"
 *   formConfig={{ endpoint: "/api/subscribe" }}
 * />
 *
 * // With custom submission handler
 * <LinkPageNewsletterSocial
 *   name="Content Creator"
 *   onSubmit={async (email) => {
 *     await myCustomApi.subscribe(email);
 *   }}
 *   onSuccess={() => toast.success("Subscribed!")}
 * />
 * ```
 */
export function LinkPageNewsletterSocial({
  name = "Content Creator",
  bio = "Sharing weekly tips on growing your audience and building your brand",
  avatarUrl = blockBrandedIconsAndPlaceholders.avatar3,
  newsletterHeading = "Join my newsletter",
  newsletterDescription = "Get exclusive content, tips, and updates delivered to your inbox.",
  emailPlaceholder = "Enter your email",
  buttonText = "Subscribe",
  links = defaultLinks,
  socialLinks = defaultSocialLinks,
  className,
  theme = "light",
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: LinkPageNewsletterSocialProps): React.JSX.Element {
  const isDark = theme === "dark";

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

  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-start justify-center py-12 px-4",
        isDark ? "bg-neutral-950" : "bg-gradient-to-b from-white to-neutral-50",
        className
      )}
    >
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-muted ring-4 ring-background shadow-lg">
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <h1
              className={cn(
                "text-2xl font-bold",
                isDark ? "text-white" : "text-foreground"
              )}
            >
              {name}
            </h1>
            {bio && (
              <p
                className={cn(
                  "text-sm max-w-xs",
                  isDark ? "text-neutral-400" : "text-muted-foreground"
                )}
              >
                {bio}
              </p>
            )}
          </div>
        </div>

        {socialLinks.length > 0 && (
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((social) => (
              <Pressable
                key={social.id}
                href={social.href}
                aria-label={social.platform}
                className={cn(
                  "p-2.5 rounded-full transition-all duration-200",
                  "hover:scale-110 active:scale-95",
                  isDark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-neutral-100 text-foreground hover:bg-neutral-200"
                )}
              >
                <DynamicIcon name={social.icon} size={20} />
              </Pressable>
            ))}
          </div>
        )}

        <div
          className={cn(
            "rounded-2xl p-6 space-y-4",
            isDark
              ? "bg-white/5 border border-white/10"
              : "bg-white border border-neutral-200 shadow-sm"
          )}
        >
          <div className="text-center space-y-1">
            <h2
              className={cn(
                "text-lg font-semibold",
                isDark ? "text-white" : "text-foreground"
              )}
            >
              {newsletterHeading}
            </h2>
            {newsletterDescription && (
              <p
                className={cn(
                  "text-sm",
                  isDark ? "text-neutral-400" : "text-muted-foreground"
                )}
              >
                {newsletterDescription}
              </p>
            )}
          </div>

          <Form
            form={form}
            action={formConfig?.endpoint}
            method={formMethod}
            className="space-y-3"
          >
            <Field name="email">
              {({ field, meta }) => (
                <TextInput
                  {...field}
                  type="email"
                  placeholder={emailPlaceholder}
                  error={meta.touched && !!meta.error}
                  className={cn(
                    "w-full",
                    isDark && "bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  )}
                  aria-label={emailPlaceholder || "Email address"}
                />
              )}
            </Field>
            <Pressable
              componentType="button"
              type="submit"
              variant="default"
              size="lg"
              className="w-full"
              asButton
              disabled={form.isSubmitting}
            >
              {form.isSubmitting ? (
                <>
                  <DynamicIcon name="lucide/loader-2" size={16} className="animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>{buttonText}</span>
                  <DynamicIcon name="lucide/arrow-right" size={16} />
                </>
              )}
            </Pressable>
          </Form>
        </div>

        {links.length > 0 && (
          <div className="space-y-2">
            {links.map((link) => (
              <Pressable
                key={link.id}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  isDark
                    ? "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    : "bg-white text-foreground hover:bg-neutral-50 border border-neutral-200"
                )}
              >
                {link.icon && (
                  <DynamicIcon
                    name={link.icon}
                    size={18}
                    className={isDark ? "text-neutral-400" : "text-muted-foreground"}
                  />
                )}
                <span className="text-sm font-medium flex-1">{link.label}</span>
                <DynamicIcon
                  name="lucide/chevron-right"
                  size={16}
                  className={isDark ? "text-neutral-600" : "text-muted-foreground"}
                />
              </Pressable>
            ))}
          </div>
        )}

        <div className="pt-4">
          <Pressable
            href="/"
            className={cn(
              "flex items-center justify-center gap-1.5 text-xs transition-opacity hover:opacity-80",
              isDark ? "text-neutral-600" : "text-muted-foreground/50"
            )}
          >
            <DynamicIcon name="lucide/link" size={12} />
            <span>Powered by OpenSite</span>
          </Pressable>
        </div>
      </div>
    </div>
  );
}
