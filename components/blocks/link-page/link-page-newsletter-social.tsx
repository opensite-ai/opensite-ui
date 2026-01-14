"use client";

import * as React from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "../../ui/form-inputs";
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
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  SocialLinkItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Link item for the newsletter social link page
 */
export interface NewsletterSocialLink extends ActionConfig {
  id?: string;
  iconName?: string;
}

/**
 * Social link for the newsletter social link page
 */
export interface NewsletterSocialSocialLink extends SocialLinkItem {
  id?: string;
  iconName?: string;
}

/**
 * Props for the LinkPageNewsletterSocial component
 */
export interface LinkPageNewsletterSocialProps {
  /**
   * Profile name displayed at the top
   */
  name?: React.ReactNode;
  /**
   * Optional bio or description
   */
  bio?: React.ReactNode;
  /**
   * Avatar image configuration
   */
  avatar?: ImageItem;
  /**
   * Avatar image URL (legacy)
   */
  avatarUrl?: string;
  /**
   * Custom slot for profile header content
   */
  profileSlot?: React.ReactNode;
  /**
   * Newsletter section heading
   */
  newsletterHeading?: React.ReactNode;
  /**
   * Newsletter section description
   */
  newsletterDescription?: React.ReactNode;
  /**
   * Email input placeholder text
   */
  emailPlaceholder?: string;
  /**
   * Submit button text (used when submitAction is not provided)
   */
  buttonText?: React.ReactNode;
  /**
   * Submit action configuration
   */
  submitAction?: ActionConfig;
  /**
   * Custom slot for rendering the newsletter card
   */
  newsletterSlot?: React.ReactNode;
  /**
   * Custom slot for rendering form fields inside the newsletter card
   */
  formSlot?: React.ReactNode;
  /**
   * Label to show while submitting
   */
  submittingLabel?: React.ReactNode;
  /**
   * Icon to show while submitting
   */
  submittingIcon?: React.ReactNode;
  /**
   * Array of links to display below the newsletter
   */
  links?: NewsletterSocialLink[];
  /**
   * Custom slot for rendering links (overrides links array)
   */
  linksSlot?: React.ReactNode;
  /**
   * Chevron icon displayed on link items
   */
  linkChevronIcon?: React.ReactNode;
  /**
   * Array of social media links
   */
  socialLinks?: NewsletterSocialSocialLink[];
  /**
   * Custom slot for rendering social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Footer action configuration
   */
  footerAction?: ActionConfig;
  /**
   * Custom slot for rendering footer content
   */
  footerSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the outer wrapper
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the inner content container
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the profile header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the avatar wrapper
   */
  avatarClassName?: string;
  /**
   * Additional CSS classes for the name
   */
  nameClassName?: string;
  /**
   * Additional CSS classes for the bio
   */
  bioClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Additional CSS classes for each social link
   */
  socialLinkClassName?: string;
  /**
   * Additional CSS classes for social icons
   */
  socialIconClassName?: string;
  /**
   * Additional CSS classes for the newsletter card
   */
  newsletterCardClassName?: string;
  /**
   * Additional CSS classes for the newsletter heading
   */
  newsletterHeadingClassName?: string;
  /**
   * Additional CSS classes for the newsletter description
   */
  newsletterDescriptionClassName?: string;
  /**
   * Additional CSS classes for the form container
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the input field
   */
  inputClassName?: string;
  /**
   * Additional CSS classes for the submit button
   */
  submitButtonClassName?: string;
  /**
   * Additional CSS classes for the links container
   */
  linksClassName?: string;
  /**
   * Additional CSS classes for each link item
   */
  linkClassName?: string;
  /**
   * Additional CSS classes for link icons
   */
  linkIconClassName?: string;
  /**
   * Additional CSS classes for link labels
   */
  linkLabelClassName?: string;
  /**
   * Additional CSS classes for the link chevron
   */
  linkChevronClassName?: string;
  /**
   * Additional CSS classes for the footer
   */
  footerClassName?: string;
  /**
   * Theme variation: "light" or "dark"
   */
  theme?: "light" | "dark";
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
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
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

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
  name,
  bio,
  avatar,
  avatarUrl = blockBrandedIconsAndPlaceholders.avatar3,
  profileSlot,
  newsletterHeading = "Join my newsletter",
  newsletterDescription =
    "Get exclusive content, tips, and updates delivered to your inbox.",
  emailPlaceholder = "Enter your email",
  buttonText = "Subscribe",
  submitAction,
  newsletterSlot,
  formSlot,
  submittingLabel = "Subscribing...",
  submittingIcon = (
    <DynamicIcon name="lucide/loader-2" size={16} className="animate-spin" />
  ),
  links,
  linksSlot,
  linkChevronIcon,
  socialLinks,
  socialLinksSlot,
  footerAction,
  footerSlot,
  className,
  containerClassName,
  contentClassName,
  headerClassName,
  avatarClassName,
  nameClassName,
  bioClassName,
  socialLinksClassName,
  socialLinkClassName,
  socialIconClassName,
  newsletterCardClassName,
  newsletterHeadingClassName,
  newsletterDescriptionClassName,
  formClassName,
  inputClassName,
  submitButtonClassName,
  linksClassName,
  linkClassName,
  linkIconClassName,
  linkLabelClassName,
  linkChevronClassName,
  footerClassName,
  theme = "light",
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  patternClassName,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
  optixFlowConfig,
}: LinkPageNewsletterSocialProps): React.JSX.Element {
  const isDark = theme === "dark";
  const resolvedBackground = background ?? (isDark ? "dark" : "white");

  const resolvedAvatar: ImageItem | undefined =
    avatar ||
    (avatarUrl
      ? {
          src: avatarUrl,
          alt: typeof name === "string" ? name : "Profile avatar",
        }
      : undefined);

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

  const resolvedSubmitAction = submitAction ?? {
    label: buttonText,
    variant: "default" as const,
    size: "lg" as const,
  };

  const resolvedChevronIcon =
    linkChevronIcon ?? (
      <DynamicIcon name="lucide/chevron-right" size={16} />
    );

  const renderProfile = () => {
    if (profileSlot) return profileSlot;

    return (
      <div
        className={cn(
          "flex flex-col items-center space-y-4 text-center",
          headerClassName
        )}
      >
        {resolvedAvatar && (
          <div
            className={cn(
              "h-24 w-24 overflow-hidden rounded-full bg-muted ring-4 ring-background shadow-lg",
              avatarClassName
            )}
          >
            <Img
              src={resolvedAvatar.src}
              alt={resolvedAvatar.alt}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}

        <div className="space-y-1">
          {name &&
            (typeof name === "string" ? (
              <h1
                className={cn(
                  "text-2xl font-bold",
                  isDark ? "text-white" : "text-foreground",
                  nameClassName
                )}
              >
                {name}
              </h1>
            ) : (
              <div className={nameClassName}>{name}</div>
            ))}
          {bio &&
            (typeof bio === "string" ? (
              <p
                className={cn(
                  "max-w-xs text-sm",
                  isDark ? "text-neutral-400" : "text-muted-foreground",
                  bioClassName
                )}
              >
                {bio}
              </p>
            ) : (
              <div className={bioClassName}>{bio}</div>
            ))}
        </div>
      </div>
    );
  };

  const renderSocialLinks = () => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div
        className={cn(
          "flex items-center justify-center gap-3",
          socialLinksClassName
        )}
      >
        {socialLinks.map((social, index) => {
          const icon =
            social.icon ||
            (social.iconName ? (
              <DynamicIcon
                name={social.iconName}
                size={20}
                className={socialIconClassName}
              />
            ) : null);
          const ariaLabel =
            social["aria-label"] ||
            (typeof social.label === "string" ? social.label : undefined) ||
            social.platform;

          return (
            <Pressable
              key={social.id ?? index}
              href={social.href}
              aria-label={ariaLabel}
              className={cn(
                "rounded-full p-2.5 transition-all duration-200",
                "hover:scale-110 active:scale-95",
                isDark
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-neutral-100 text-foreground hover:bg-neutral-200",
                socialLinkClassName,
                social.className
              )}
            >
              {icon}
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderFormFields = () => {
    if (formSlot) return formSlot;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = resolvedSubmitAction;

    return (
      <>
        <Field name="email">
          {({ field, meta }) => (
            <TextInput
              {...field}
              type="email"
              placeholder={emailPlaceholder}
              error={meta.touched && !!meta.error}
              className={cn(
                "w-full",
                isDark &&
                  "border-white/20 bg-white/10 text-white placeholder:text-white/50",
                inputClassName
              )}
              aria-label={emailPlaceholder || "Email address"}
            />
          )}
        </Field>
        <Pressable
          componentType="button"
          type="submit"
          variant={resolvedSubmitAction.variant ?? "default"}
          size={resolvedSubmitAction.size ?? "lg"}
          className={cn("w-full", submitButtonClassName, actionClassName)}
          asButton
          disabled={form.isSubmitting}
          {...pressableProps}
        >
          {form.isSubmitting ? (
            <>
              {submittingIcon}
              <span>{submittingLabel}</span>
            </>
          ) : (
            children ?? (
              <>
                {icon}
                {label}
                {iconAfter}
              </>
            )
          )}
        </Pressable>
      </>
    );
  };

  const renderNewsletter = () => {
    if (newsletterSlot) return newsletterSlot;

    return (
      <div
        className={cn(
          "space-y-4 rounded-2xl p-6",
          isDark
            ? "border border-white/10 bg-white/5"
            : "border border-neutral-200 bg-white shadow-sm",
          newsletterCardClassName
        )}
      >
        <div className="space-y-1 text-center">
          {newsletterHeading &&
            (typeof newsletterHeading === "string" ? (
              <h2
                className={cn(
                  "text-lg font-semibold",
                  isDark ? "text-white" : "text-foreground",
                  newsletterHeadingClassName
                )}
              >
                {newsletterHeading}
              </h2>
            ) : (
              <div className={newsletterHeadingClassName}>
                {newsletterHeading}
              </div>
            ))}
          {newsletterDescription &&
            (typeof newsletterDescription === "string" ? (
              <p
                className={cn(
                  "text-sm",
                  isDark ? "text-neutral-400" : "text-muted-foreground",
                  newsletterDescriptionClassName
                )}
              >
                {newsletterDescription}
              </p>
            ) : (
              <div className={newsletterDescriptionClassName}>
                {newsletterDescription}
              </div>
            ))}
        </div>

        <Form
          form={form}
          action={formConfig?.endpoint}
          method={formMethod}
          className={cn("space-y-3", formClassName)}
        >
          {renderFormFields()}
        </Form>
      </div>
    );
  };

  const renderLinks = () => {
    if (linksSlot) return linksSlot;
    if (!links || links.length === 0) return null;

    return (
      <div className={cn("space-y-2", linksClassName)}>
        {links.map((link, index) => {
          const {
            label,
            icon,
            children,
            className: linkItemClassName,
            ...pressableProps
          } = link;
          const iconElement =
            icon ||
            (link.iconName ? (
              <DynamicIcon
                name={link.iconName}
                size={18}
                className={linkIconClassName}
              />
            ) : null);

          if (children) {
            return (
              <Pressable
                key={link.id ?? index}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  isDark
                    ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    : "border border-neutral-200 bg-white text-foreground hover:bg-neutral-50",
                  linkClassName,
                  linkItemClassName
                )}
                {...pressableProps}
              >
                {children}
              </Pressable>
            );
          }

          return (
            <Pressable
              key={link.id ?? index}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                "hover:scale-[1.02] active:scale-[0.98]",
                isDark
                  ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  : "border border-neutral-200 bg-white text-foreground hover:bg-neutral-50",
                linkClassName,
                linkItemClassName
              )}
              {...pressableProps}
            >
              {iconElement}
              {label &&
                (typeof label === "string" ? (
                  <span
                    className={cn(
                      "flex-1 text-sm font-medium",
                      linkLabelClassName
                    )}
                  >
                    {label}
                  </span>
                ) : (
                  <div className={cn("flex-1", linkLabelClassName)}>{label}</div>
                ))}
              <span
                className={cn(
                  isDark ? "text-neutral-600" : "text-muted-foreground",
                  linkChevronClassName
                )}
              >
                {resolvedChevronIcon}
              </span>
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderFooter = () => {
    if (footerSlot) return footerSlot;

    if (!footerAction) return null;
    const resolvedFooterAction = footerAction;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = resolvedFooterAction;

    const defaultIcon =
      footerAction === undefined ? (
        <DynamicIcon name="lucide/link" size={12} />
      ) : null;

    return (
      <Pressable
        className={cn(
          "flex items-center justify-center gap-1.5 text-xs transition-opacity hover:opacity-80",
          isDark ? "text-neutral-600" : "text-muted-foreground/50",
          footerClassName,
          actionClassName
        )}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon ?? defaultIcon}
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  return (
    <Section
      background={resolvedBackground}
      spacing={spacing}
      className={cn(
        isDark
          ? "bg-neutral-950"
          : "bg-linear-to-b from-white to-neutral-50",
        className
      )}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
    >
      <div
        className={cn(
          "flex min-h-screen w-full items-start justify-center py-12",
          containerClassName
        )}
      >
        <div className={cn("w-full max-w-md space-y-8", contentClassName)}>
          {renderProfile()}
          {renderSocialLinks()}
          {renderNewsletter()}
          {renderLinks()}
          <div className="pt-4">{renderFooter()}</div>
        </div>
      </div>
    </Section>
  );
}
