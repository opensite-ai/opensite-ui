"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "flex items-stretch w-full",
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

export interface CtaAppDownloadNewsletterProps {
  /**
   * App section heading
   */
  appHeading?: React.ReactNode;
  /**
   * App section description
   */
  appDescription?: React.ReactNode;
  /**
   * Array of action configurations for app download buttons
   */
  appActions?: ActionConfig[];
  /**
   * Custom slot for rendering app actions (overrides appActions array)
   */
  appActionsSlot?: React.ReactNode;
  /**
   * Phone mockup image URL
   */
  phoneMockupImage?: string;
  /**
   * Newsletter section heading
   */
  newsletterHeading?: React.ReactNode;
  /**
   * Newsletter section description
   */
  newsletterDescription?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the app card
   */
  appCardClassName?: string;
  /**
   * Additional CSS classes for the app heading
   */
  appHeadingClassName?: string;
  /**
   * Additional CSS classes for the app description
   */
  appDescriptionClassName?: string;
  /**
   * Additional CSS classes for the app actions container
   */
  appActionsClassName?: string;
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
   * Additional CSS classes for the form
   */
  formClassName?: string;
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
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  /**
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
  /**
   * Submit button configuration
   */
  buttonAction?: ActionConfig;
  /**
   * Custom slot for the form (overrides form props)
   */
  formSlot?: React.ReactNode;
}

/**
 * CtaAppDownloadNewsletter - A two-column CTA grid featuring an app download
 * section with phone mockup and a newsletter subscription form. Perfect for
 * mobile app promotions.
 *
 * The newsletter form is powered by `FormEngine` from `@page-speed/forms/integration`,
 * which handles validation, submission, error handling, and success states.
 *
 * @example
 * ```tsx
 * <CtaAppDownloadNewsletter
 *   appHeading="Download Our App"
 *   appDescription="Get the best experience on mobile."
 *   appActions={[
 *     { label: "App Store", href: "https://apps.apple.com", variant: "default" },
 *     { label: "Google Play", href: "https://play.google.com", variant: "outline" }
 *   ]}
 *   newsletterHeading="Stay Updated"
 *   newsletterDescription="Subscribe to our newsletter."
 *   formEngineSetup={{
 *     formConfig: { endpoint: "/api/subscribe", format: "json" },
 *   }}
 * />
 * ```
 */
export function CtaAppDownloadNewsletter({
  appHeading,
  appDescription,
  appActions,
  appActionsSlot,
  phoneMockupImage,
  newsletterHeading,
  newsletterDescription,
  className,
  containerClassName,
  gridClassName,
  appCardClassName,
  appHeadingClassName,
  appDescriptionClassName,
  appActionsClassName,
  newsletterCardClassName,
  newsletterHeadingClassName,
  newsletterDescriptionClassName,
  formClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
  formEngineSetup,
  buttonAction,
  formSlot,
}: CtaAppDownloadNewsletterProps): React.JSX.Element {
  const renderForm = React.useMemo(() => {
    if (formSlot) return formSlot;
    if (!formEngineSetup) return null;

    const defaultButtonAction: ActionConfig = {
      label: "",
      variant: "default",
      icon: <DynamicIcon name="lucide/send" size={16} />,
    };

    const action = buttonAction || defaultButtonAction;

    return (
      <FormEngine
        formEngineSetup={{
          ...formEngineSetup,
          formLayoutSettings: {
            ...formEngineSetup.formLayoutSettings,
            formLayout: "button-group",
            buttonGroupSetup: {
              ...formEngineSetup.formLayoutSettings?.buttonGroupSetup,
              size: "default",
              submitLabel: action.icon || action.label,
              submitVariant: action.variant || "default",
            },
          },
        }}
        defaultFields={DEFAULT_FORM_FIELDS}
        defaultStyleRules={{
          ...DEFAULT_STYLE_RULES,
          formContainer: cn(DEFAULT_STYLE_RULES.formContainer, formClassName),
        }}
      />
    );
  }, [formSlot, formEngineSetup, buttonAction, formClassName]);

  const appActionsContent = React.useMemo(() => {
    if (appActionsSlot) return appActionsSlot;
    if (!appActions || appActions.length === 0) return null;

    return (
      <div
        className={cn("flex flex-col gap-3 sm:flex-row", appActionsClassName)}
      >
        {appActions.map((action, index) => {
          const isAppStore =
            action.label?.toString().toLowerCase().includes("app store") ||
            action.href?.includes("apple");
          const isGooglePlay =
            action.label?.toString().toLowerCase().includes("google") ||
            action.href?.includes("play.google");

          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              size={action.size}
              className={cn("gap-2", action.className)}
              aria-label={action["aria-label"]}
              asButton
            >
              {action.icon ??
                (isAppStore ? (
                  <DynamicIcon name="simple-icons/apple" size={20} />
                ) : isGooglePlay ? (
                  <DynamicIcon name="simple-icons/googleplay" size={20} />
                ) : null)}
              {action.children ?? action.label}
              {action.iconAfter}
            </Pressable>
          );
        })}
      </div>
    );
  }, [appActionsSlot, appActions, appActionsClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className={cn("grid gap-8 lg:grid-cols-2", gridClassName)}>
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 p-8 lg:p-12",
              appCardClassName,
            )}
          >
            <div className="relative z-10 max-w-sm">
              {appHeading &&
                (typeof appHeading === "string" ? (
                  <h2
                    className={cn(
                      "mb-4 text-2xl font-bold md:text-3xl",
                      appHeadingClassName,
                    )}
                  >
                    {appHeading}
                  </h2>
                ) : (
                  <div className={cn("mb-4", appHeadingClassName)}>
                    {appHeading}
                  </div>
                ))}
              {appDescription &&
                (typeof appDescription === "string" ? (
                  <p className={cn("mb-8", appDescriptionClassName)}>
                    {appDescription}
                  </p>
                ) : (
                  <div className={cn("mb-8", appDescriptionClassName)}>
                    {appDescription}
                  </div>
                ))}
              {appActionsContent}
            </div>
            {phoneMockupImage && (
              <div className="absolute -right-16 -bottom-16 h-64 w-48 rotate-12 opacity-20 lg:h-80 lg:w-60">
                <Img
                  src={phoneMockupImage}
                  alt=""
                  className="h-full w-full object-contain"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
          </div>

          <div
            className={cn(
              "flex flex-col justify-center rounded-2xl border p-8 lg:p-12",
              newsletterCardClassName,
            )}
          >
            {newsletterHeading &&
              (typeof newsletterHeading === "string" ? (
                <h2
                  className={cn(
                    "mb-4 text-2xl font-bold md:text-3xl",
                    newsletterHeadingClassName,
                  )}
                >
                  {newsletterHeading}
                </h2>
              ) : (
                <div className={cn("mb-4", newsletterHeadingClassName)}>
                  {newsletterHeading}
                </div>
              ))}
            {newsletterDescription &&
              (typeof newsletterDescription === "string" ? (
                <p className={cn("mb-8", newsletterDescriptionClassName)}>
                  {newsletterDescription}
                </p>
              ) : (
                <div className={cn("mb-8", newsletterDescriptionClassName)}>
                  {newsletterDescription}
                </div>
              ))}
            {renderForm}
          </div>
        </div>
      </div>
    </Section>
  );
}
