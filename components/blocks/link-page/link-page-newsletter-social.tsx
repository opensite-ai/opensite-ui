"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  SocialLinkItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "w-full flex flex-col gap-3 justify-center items-center",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "",
};

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
   * Optional LogoConfig for BrandLogo rendering (takes priority over avatar)
   */
  logo?: LogoConfig;
  /**
   * Custom slot for the logo/avatar (takes priority over logo and avatar)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo image
   */
  logoClassName?: string;
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
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
  /**
   * Submit button configuration
   */
  buttonAction?: ActionConfig;
  /**
   * Helper text below form
   */
  helperText?: React.ReactNode;
  /**
   * Custom slot for rendering the newsletter card
   */
  newsletterSlot?: React.ReactNode;
  /**
   * Custom slot for rendering form fields inside the newsletter card
   */
  formSlot?: React.ReactNode;
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * LinkPageNewsletterSocial - A link page with integrated newsletter signup form.
 *
 * This component provides a link page with:
 * - Profile section with avatar, name, and bio
 * - Newsletter signup form powered by FormEngine
 * - Links section below the newsletter
 * - Social media links
 * - Light and dark theme support
 *
 * The newsletter form is powered by `FormEngine` from `@page-speed/forms/integration`,
 * which handles validation, submission, error handling, and success states.
 *
 * @example
 * ```tsx
 * // Basic usage with FormEngine
 * <LinkPageNewsletterSocial
 *   name="Content Creator"
 *   bio="Weekly tips on growing your audience"
 *   newsletterHeading="Join my newsletter"
 *   formEngineSetup={{
 *     formConfig: { endpoint: "/api/subscribe", format: "json" },
 *   }}
 * />
 *
 * // With custom button action
 * <LinkPageNewsletterSocial
 *   name="Content Creator"
 *   formEngineSetup={{
 *     formConfig: { endpoint: "/api/subscribe" },
 *   }}
 *   buttonAction={{ label: "Subscribe Now", variant: "default" }}
 * />
 * ```
 */
export function LinkPageNewsletterSocial({
  sectionId = "link-page-newsletter-social",
  name,
  bio,
  avatar,
  avatarUrl,
  logo,
  logoSlot,
  logoClassName,
  profileSlot,
  newsletterHeading,
  newsletterDescription,
  formEngineSetup,
  buttonAction,
  helperText,
  newsletterSlot,
  formSlot,
  links,
  linksSlot,
  linkChevronIcon,
  socialLinks,
  socialLinksSlot,
  footerAction,
  footerSlot,
  className,
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
  linksClassName,
  linkClassName,
  linkIconClassName,
  linkLabelClassName,
  linkChevronClassName,
  footerClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: LinkPageNewsletterSocialProps): React.JSX.Element {
  const resolvedChevronIcon = linkChevronIcon ?? (
    <DynamicIcon name="lucide/chevron-right" size={16} />
  );

  const renderProfile = useMemo(() => {
    if (profileSlot) return profileSlot;

    const resolvedAvatar: ImageItem | undefined =
      avatar ||
      (avatarUrl
        ? {
            src: avatarUrl,
            alt: typeof name === "string" ? name : "Profile avatar",
          }
        : undefined);

    return (
      <div
        className={cn(
          "flex flex-col items-center space-y-4 text-center",
          headerClassName,
        )}
      >
        <div
          className={cn(
            "flex h-24 w-full max-w-72 items-center justify-center",
            avatarClassName,
          )}
        >
          {logo ? (
            <BrandLogo
              logo={logo}
              logoSlot={logoSlot}
              size="xl"
              logoClassName={cn("mb-2", logoClassName)}
              optixFlowConfig={optixFlowConfig}
            />
          ) : logoSlot ? (
            logoSlot
          ) : resolvedAvatar ? (
            <Img
              src={resolvedAvatar.src}
              alt={resolvedAvatar.alt}
              className="h-auto max-h-24 w-auto max-w-full object-contain"
              optixFlowConfig={optixFlowConfig}
            />
          ) : null}
        </div>

        <div className="space-y-1">
          {name &&
            (typeof name === "string" ? (
              <h1 className={cn("text-2xl font-bold", nameClassName)}>
                {name}
              </h1>
            ) : (
              <div className={nameClassName}>{name}</div>
            ))}
          {bio &&
            (typeof bio === "string" ? (
              <p className={cn("max-w-xs text-sm text-balance", bioClassName)}>
                {bio}
              </p>
            ) : (
              <div className={bioClassName}>{bio}</div>
            ))}
        </div>
      </div>
    );
  }, [
    profileSlot,
    logo,
    logoSlot,
    logoClassName,
    avatar,
    avatarUrl,
    avatarClassName,
    optixFlowConfig,
    name,
    nameClassName,
    bio,
    bioClassName,
    headerClassName,
  ]);

  const renderSocialLinks = useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div
        className={cn(
          "flex items-center justify-center gap-3",
          socialLinksClassName,
        )}
      >
        {socialLinks.map((social, index) => (
          <SocialLinkIcon
            key={social.id ?? social.href ?? index}
            href={social.href}
            label={
              social["aria-label"] ||
              (typeof social.label === "string" ? social.label : undefined)
            }
            asButton
            size="icon-lg"
            className={cn(
              "rounded-full p-2.5 transition-all duration-200",
              socialLinkClassName,
              social.className,
            )}
            iconClassName={socialIconClassName}
          />
        ))}
      </div>
    );
  }, [
    socialLinksSlot,
    socialLinks,
    socialLinksClassName,
    socialIconClassName,
    socialLinkClassName,
  ]);

  const renderForm = useMemo(() => {
    if (formSlot) return formSlot;
    if (!formEngineSetup) return null;

    const defaultButtonAction: ActionConfig = {
      label: "Submit",
      variant: "default",
    };

    const action = buttonAction || defaultButtonAction;

    return (
      <>
        <FormEngine
          formEngineSetup={{
            ...formEngineSetup,
            formLayoutSettings: {
              ...formEngineSetup.formLayoutSettings,
              formLayout: "button-group",
              buttonGroupSetup: {
                ...formEngineSetup.formLayoutSettings?.buttonGroupSetup,
                size: "lg",
                submitLabel: (
                  <>
                    {action.label}
                    {action.iconAfter}
                  </>
                ),
                submitVariant: action.variant || "default",
              },
            },
          }}
          defaultFields={DEFAULT_FORM_FIELDS}
          defaultStyleRules={DEFAULT_STYLE_RULES}
        />
        {helperText &&
          (typeof helperText === "string" ? (
            <p className={cn("text-sm mt-2 text-center")}>{helperText}</p>
          ) : (
            helperText
          ))}
      </>
    );
  }, [formSlot, formEngineSetup, buttonAction, helperText]);

  const renderNewsletter = useMemo(() => {
    if (newsletterSlot) return newsletterSlot;

    return (
      <div
        className={cn(
          "space-y-4 rounded-2xl p-6",
          "border border-border bg-card text-card-foreground shadow-sm",
          newsletterCardClassName,
        )}
      >
        <div className="space-y-1 text-center">
          {newsletterHeading &&
            (typeof newsletterHeading === "string" ? (
              <h2
                className={cn(
                  "text-lg font-semibold",
                  newsletterHeadingClassName,
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
              <p className={cn("text-sm", newsletterDescriptionClassName)}>
                {newsletterDescription}
              </p>
            ) : (
              <div className={newsletterDescriptionClassName}>
                {newsletterDescription}
              </div>
            ))}
        </div>

        {renderForm}
      </div>
    );
  }, [
    newsletterSlot,
    newsletterCardClassName,
    newsletterHeading,
    newsletterHeadingClassName,
    newsletterDescription,
    newsletterDescriptionClassName,
    renderForm,
  ]);

  const renderLinks = useMemo(() => {
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
            iconName,
            ...pressableProps
          } = link;
          const iconElement =
            icon ||
            (iconName ? (
              <DynamicIcon
                name={iconName}
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
                  "border border-border bg-card hover:opacity-80",
                  linkClassName,
                  linkItemClassName,
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
                "flex w-full bg-card text-card-foreground items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                "hover:scale-[1.02] active:scale-[0.98]",
                "border border-border hover:opacity-80",
                linkClassName,
                linkItemClassName,
              )}
              {...pressableProps}
            >
              {iconElement}
              {label &&
                (typeof label === "string" ? (
                  <span
                    className={cn(
                      "flex-1 text-sm font-medium",
                      linkLabelClassName,
                    )}
                  >
                    {label}
                  </span>
                ) : (
                  <div className={cn("flex-1", linkLabelClassName)}>
                    {label}
                  </div>
                ))}
              <span className={cn(linkChevronClassName)}>
                {resolvedChevronIcon}
              </span>
            </Pressable>
          );
        })}
      </div>
    );
  }, [
    linksSlot,
    links,
    linksClassName,
    linkIconClassName,
    linkClassName,
    linkLabelClassName,
    linkChevronClassName,
    resolvedChevronIcon,
  ]);

  const renderFooter = useMemo(() => {
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
          "opacity-50",
          footerClassName,
          actionClassName,
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
  }, [footerSlot, footerAction, footerClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      containerClassName={containerClassName}
    >
      <div className="flex min-h-screen w-full items-start justify-center py-12">
        <div className={cn("w-full space-y-8", contentClassName)}>
          {renderProfile}
          {renderSocialLinks}
          {renderNewsletter}
          {renderLinks}
          <div className="pt-4">{renderFooter}</div>
        </div>
      </div>
    </Section>
  );
}
