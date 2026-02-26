"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
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
  formContainer: "mx-auto mb-8 flex max-w-md items-stretch w-full",
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

export interface CtaNewsletterFeature {
  /**
   * Icon name for the feature
   */
  iconName?: string;
  /**
   * Custom icon element
   */
  icon?: React.ReactNode;
  /**
   * Feature text
   */
  text?: React.ReactNode;
  /**
   * Additional CSS classes for the feature
   */
  className?: string;
}

export interface CtaNewsletterFeaturesProps {
  /**
   * Badge content above the heading
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Array of features to display
   */
  features?: CtaNewsletterFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the form (overrides default form)
   */
  formSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the form
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the features list
   */
  featuresClassName?: string;
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
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
  /**
   * Submit button configuration
   */
  buttonAction?: ActionConfig;
}

/**
 * CtaNewsletterFeatures - A newsletter subscription CTA with badge, heading,
 * email form, and a list of subscription benefits. Encourages sign-ups by
 * highlighting value.
 *
 * The newsletter form is powered by `FormEngine` from `@page-speed/forms/integration`,
 * which handles validation, submission, error handling, and success states.
 *
 * @example
 * ```tsx
 * <CtaNewsletterFeatures
 *   badge="Newsletter"
 *   heading="Stay in the loop"
 *   description="Get the latest updates delivered to your inbox."
 *   formEngineSetup={{
 *     formConfig: { endpoint: "/api/subscribe", format: "json" },
 *   }}
 *   features={[
 *     { iconName: "lucide/check", text: "Weekly insights" },
 *     { iconName: "lucide/check", text: "Exclusive content" }
 *   ]}
 * />
 * ```
 */
export function CtaNewsletterFeatures({
  badge,
  heading,
  description,
  features,
  featuresSlot,
  formSlot,
  className,
  containerClassName,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  formClassName,
  featuresClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  formEngineSetup,
  buttonAction,
}: CtaNewsletterFeaturesProps): React.JSX.Element {
  const renderForm = React.useMemo(() => {
    if (formSlot) return formSlot;
    if (!formEngineSetup) return null;

    const defaultButtonAction: ActionConfig = {
      label: "",
      variant: "default",
      icon: <DynamicIcon name="lucide/arrow-right" size={16} />,
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

  const featuresContent = React.useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <ul
        className={cn(
          "flex flex-wrap justify-center gap-4 text-sm text-muted-foreground",
          featuresClassName,
        )}
      >
        {features.map((feature, index) => (
          <li
            key={index}
            className={cn("flex items-center gap-2", feature.className)}
          >
            {feature.icon ??
              (feature.iconName && (
                <DynamicIcon
                  name={feature.iconName}
                  size={16}
                  className="text-primary"
                />
              ))}
            {feature.text}
          </li>
        ))}
      </ul>
    );
  }, [featuresSlot, features, featuresClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-2xl text-center", contentClassName)}>
          {badge &&
            (typeof badge === "string" ? (
              <Badge variant="secondary" className={cn("mb-4", badgeClassName)}>
                {badge}
              </Badge>
            ) : (
              <div className={cn("mb-4", badgeClassName)}>{badge}</div>
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-4 text-3xl font-bold md:text-4xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={cn("mb-4", headingClassName)}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mb-8 text-lg text-muted-foreground",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={cn("mb-8", descriptionClassName)}>
                {description}
              </div>
            ))}
          {renderForm}
          {featuresContent}
        </div>
      </div>
    </Section>
  );
}
